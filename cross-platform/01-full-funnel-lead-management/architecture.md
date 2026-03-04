# Bridge Workflow: Full Funnel Lead Management

**Platforms:** Zapier → n8n → Make
**Industry:** Real Estate
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## The Business Problem

A real estate agency uses Zapier for basic automations (they have 30+ existing Zaps). They want to add AI lead qualification and automated reporting — but don't want to rebuild everything in a new platform.

**Current state:** Zapier handles Facebook Lead Ads → HubSpot sync (already working, not touched)
**Gap:** No AI qualification, no real-time agent alerts, no BI dashboard
**Goal:** Add AI layer and reporting without migrating 30+ existing Zaps

---

## Why This Architecture

| Platform | Segment | Why This Platform |
|----------|---------|-------------------|
| Zapier | Lead capture | Already connected to Facebook Lead Ads. Reliable, zero-code. Migrating would break 30+ existing Zaps. |
| n8n | AI qualification | Cheapest AI/LLM processing. OpenAI via n8n costs ~$0.0001/lead. Same task via Zapier AI = $0.01/lead. At 1,000 leads/month, that's $100 vs $10. |
| Make | BI reporting | Best scheduling + data aggregation. Google Sheets + Slack notifications at 1/10th the cost of equivalent Zapier actions. |

**Total cost at 1,000 leads/month:** ~$35/month (vs ~$200/month if all in Zapier)

---

## Data Flow

```
[Facebook Lead Ads]
         │
         ▼
[ZAPIER — Segment 1: Capture + Filter]
  • App: Facebook Lead Ads trigger
  • Filter: budget > 5,000,000 (Philippine Peso)
  • Action: Webhooks by Zapier → POST to n8n webhook
         │
         │ HTTP POST (lead JSON)
         │
         ▼
[n8n — Segment 2: AI Qualification + Enrichment]
  • Webhook trigger (receives from Zapier)
  • OpenAI GPT-4o-mini: score lead 1-10 + draft personalized email
  • IF: score >= 7 = hot lead / else = nurture
  • Hot path: HubSpot update (hot status) + HTTP POST to Make hot endpoint
  • Nurture path: HubSpot update (nurture status) + HTTP POST to Make nurture endpoint
         │
         │ HTTP POST (enriched lead data)
         │
         ▼
[MAKE — Segment 3: CRM Sync + BI Dashboard]
  • Custom webhook receives enriched lead data
  • Router: hot vs. nurture (based on `priority` field)
  • Hot route: Google Sheets "Hot Leads" sheet + Slack #hot-leads + Calendar follow-up event
  • Nurture route: Google Sheets "Nurture" sheet + Mailchimp sequence enrollment
  • Both routes: "All Leads" master sheet append
```

---

## Setup Order

**Always set up in reverse order (downstream first):**

1. **Make first** — Create the Make webhook module, run it once to get the webhook URL
2. **n8n second** — Set the Make webhook URL in n8n's HTTP Request node, then activate n8n's webhook and copy its URL
3. **Zapier last** — Set n8n's webhook URL in the "Webhooks by Zapier" action

This ensures each platform's URL is ready before the upstream platform needs it.

---

## Webhook Payload Schemas

### Zapier → n8n (sent by Zapier's "Webhooks by Zapier"):
```json
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "+63-917-XXX-XXXX",
  "budget": "8000000",
  "timeline": "3 months",
  "property_type": "3BR Condo",
  "message": "Looking for a BGC unit near transport",
  "source": "Facebook Lead Ads",
  "lead_id": "12345678"
}
```

### n8n → Make (sent by n8n's HTTP Request node):
```json
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "+63-917-XXX-XXXX",
  "budget": "8000000",
  "timeline": "3 months",
  "property_type": "3BR Condo",
  "score": 9,
  "priority": "hot",
  "reasoning": "High budget, short timeline, specific location preference",
  "recommended_action": "Call within 30 minutes",
  "draft_email": "Hi Maria, I noticed you're looking for a BGC condo...",
  "scored_at": "2026-03-04T09:15:00.000Z",
  "source": "Facebook Lead Ads"
}
```

---

## Failover Design

- **If n8n is down:** Zapier's webhook POST will fail. Set up a Zapier error handler (Zap → Settings → Error Handler) to write the raw lead to a "Fallback Leads" Google Sheet. n8n can process the backlog when it recovers.
- **If Make is down:** n8n's HTTP Request to Make fails. n8n can handle this with a try/catch in a Code node to write to a fallback sheet.
- **Each segment is independently deployable** — test and activate one at a time.

---

## Cost Analysis

| Component | Platform | Monthly Cost | Notes |
|-----------|----------|-------------|-------|
| Lead capture | Zapier Starter | $19.99 | Existing plan |
| AI qualification | n8n cloud Starter | $20.00 | All 5 n8n workflows |
| AI processing (OpenAI) | OpenAI | ~$1.00 | 1,000 leads × $0.001 |
| BI reporting | Make Core | $9.00 | |
| **Total** | | **~$50/mo** | vs ~$200 all-Zapier |

---

## Files in This Folder

| File | Description |
|------|-------------|
| `architecture.md` | This document |
| `zapier-segment.md` | Step-by-step Zapier SOP |
| `n8n-segment.json` | n8n workflow JSON (importable) |
| `make-segment.json` | Make blueprint JSON (importable) |

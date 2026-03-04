# AI Lead Scoring — Real Estate

**Platform:** n8n
**Industry:** Real Estate
**Complexity:** Complex ⚡⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

This workflow uses GPT-4o-mini to automatically score inbound real estate leads from 1–10 based on purchase intent signals, then routes hot leads (score ≥7) to immediate agent follow-up in HubSpot and Slack, while warm/cold leads enter a nurture sequence.

## Business Use Case

**Problem:** Agents manually review every lead form submission, wasting 2–3 hours/day on unqualified inquiries while hot leads go cold waiting for a call.
**Solution:** AI scores every lead in under 3 seconds. Hot leads trigger an immediate Slack alert so agents call within minutes.
**Impact:** Estimated 40% reduction in lead response time; agents focus only on high-intent leads; nurture emails keep cold leads warm automatically.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Webhook (POST) |
| Trigger App | Any lead form (website, Facebook Lead Ads via Zapier, etc.) |
| Webhook Path | `/webhook/real-estate-lead` |
| Response | JSON with score and priority |

---

## Workflow Steps

### Step 1: Webhook — Receive Lead
- **Node:** Webhook
- **Purpose:** Receives lead data from any source (web form, Facebook Lead Ads, etc.)
- **Key Configuration:**
  - Method: POST
  - Path: `real-estate-lead`
  - Response mode: responseNode (responds after full workflow)
- **Expected Payload:**
  ```json
  {
    "name": "Maria Santos",
    "email": "maria@example.com",
    "budget": "₱5,000,000",
    "timeline": "3 months",
    "property_type": "3BR condo",
    "message": "Looking for a move-in ready unit near BGC"
  }
  ```

### Step 2: OpenAI — Score Lead
- **Node:** OpenAI (LangChain)
- **Purpose:** Sends lead data to GPT-4o-mini for intent scoring
- **Key Configuration:**
  - Model: gpt-4o-mini
  - Prompt instructs AI to return JSON with score, priority, reasoning, recommended_action
- **Output:** Raw AI response text containing JSON

### Step 3: Code — Parse Score
- **Node:** Code (JavaScript)
- **Purpose:** Parses AI JSON response, handles edge cases
- **Key Configuration:** Extracts JSON from AI response even if wrapped in markdown fences
- **Output:** `{ score, priority, reasoning, recommended_action, scored_at }`

### Step 4: IF — Hot Lead?
- **Node:** IF
- **Purpose:** Routes based on AI score
- **Condition:** `score >= 7` → true branch (hot) | false branch (warm/cold)

### Step 5a: HubSpot — Create Hot Lead
- **Node:** HubSpot
- **Purpose:** Creates/updates contact with hot lead status
- **Key Configuration:** Sets `hs_lead_status: NEW`, custom score field

### Step 5b: HubSpot — Create Nurture Lead
- **Node:** HubSpot
- **Purpose:** Creates/updates contact with in-progress status
- **Key Configuration:** Sets `hs_lead_status: IN_PROGRESS`, custom score field

### Step 6: Slack — Alert Agent
- **Node:** Slack
- **Purpose:** Sends formatted hot lead alert to #hot-leads channel
- **Output:** Agent receives real-time notification with full lead context

### Step 7: Respond to Webhook
- **Node:** Respond to Webhook
- **Purpose:** Returns score/priority to the form that submitted the lead
- **Output:** `{ status: "received", score: 8, priority: "hot" }`

---

## Data Flow

```
[POST /webhook/real-estate-lead]
         │
         ▼
[OpenAI GPT-4o-mini: Score 1-10]
         │
         ▼
[Code: Parse JSON response]
         │
         ▼
[IF: score >= 7?]
    │           │
   YES          NO
    │           │
    ▼           ▼
[HubSpot:   [HubSpot:
 Hot Lead]   Nurture Lead]
    │
    ▼
[Slack: #hot-leads alert]
```

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| OpenAI API | API key | gpt-4o-mini access required |
| HubSpot | Contacts: Read + Write | API key or OAuth |
| Slack | Bot token | Bot must be invited to #hot-leads channel |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| Webhook path | URL path for incoming leads | `real-estate-lead` |
| Slack channel | Target channel for hot lead alerts | `#hot-leads` |
| Score threshold | Minimum score for "hot" routing | `7` |
| OpenAI model | GPT model to use | `gpt-4o-mini` |

---

## Setup Instructions

1. Download `workflow.json` from this folder
2. n8n → Settings → Import Workflow → select the file
3. Add credentials:
   - OpenAI API key → "OpenAI API" credential
   - HubSpot → "HubSpot API" credential
   - Slack → "Slack API" credential (bot must join #hot-leads)
4. Update Slack channel name if different from `#hot-leads`
5. Add custom fields to HubSpot (`lead_score__c`, `lead_priority__c`) or remove those lines
6. Test: Send a test POST to the webhook URL with sample lead JSON
7. Verify: Check HubSpot contact created, Slack message sent
8. Activate the workflow

## Testing Instructions

1. Copy the webhook URL from the Webhook node
2. Use Postman or curl to POST:
   ```bash
   curl -X POST https://your-n8n.com/webhook/real-estate-lead \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Lead","email":"test@example.com","budget":"5000000","timeline":"1 month","property_type":"2BR","message":"Ready to buy now"}'
   ```
3. Verify response contains score and priority
4. Check HubSpot for new contact
5. Check #hot-leads Slack channel for alert

---

## Performance Notes

| Metric | Estimate |
|--------|----------|
| Execution time | 2–4 seconds per lead |
| Monthly cost (OpenAI) | ~$0.10 per 1,000 leads (gpt-4o-mini) |
| Monthly cost (n8n cloud) | Included in Starter plan ($20/mo flat) |
| Monthly cost (n8n self-host) | ~$0 (server cost only) |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

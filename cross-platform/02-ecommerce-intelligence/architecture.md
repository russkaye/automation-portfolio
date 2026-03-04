# Bridge Workflow: E-commerce Intelligence

**Platforms:** Zapier → n8n → Make
**Industry:** E-commerce
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## The Business Problem

An e-commerce store uses Zapier to handle basic order notifications (already working with 20+ Zaps). They want to add fraud detection on high-value orders and a weekly BI report — without rebuilding their existing automation stack.

**Current state:** Zapier watches Shopify orders → sends confirmation emails (existing, not touched)
**Gap:** No fraud detection, no weekly revenue/trend reporting
**Goal:** Add AI fraud scoring and weekly BI dashboard

---

## Why This Architecture

| Platform | Segment | Why This Platform |
|----------|---------|------------------|
| Zapier | Order capture | Already monitoring Shopify. Adding a parallel webhook action to existing Zap costs zero additional setup. |
| n8n | Fraud detection | AI analysis of order patterns. Checks IP, email domain, shipping vs billing mismatch, order velocity. Self-hosted = no per-execution cost. |
| Make | Weekly BI report | Scheduled aggregation is Make's strength. Pulls from Google Sheets + formats + emails client report automatically every Monday. |

---

## Data Flow

```
[Shopify New Order]
         │
         ▼
[ZAPIER — Segment 1: Order Capture + Routing]
  • Trigger: Shopify New Order
  • Filter: Total price > $500 (high-value orders only)
  • Action: Webhooks by Zapier → POST to n8n
         │
         │ HTTP POST (order JSON)
         │
         ▼
[n8n — Segment 2: Fraud Detection]
  • Webhook trigger
  • Code node: calculate risk signals (email domain, order velocity, address mismatch)
  • OpenAI: interpret signals + assign fraud risk (LOW/MEDIUM/HIGH)
  • IF: HIGH risk → hold order + alert team
  • LOW/MEDIUM: approve + HTTP POST to Make
         │
         │ HTTP POST (order + risk data)
         │
         ▼
[MAKE — Segment 3: BI Aggregation + Weekly Report]
  • Custom webhook receives verified order data
  • Google Sheets: append to "Orders" sheet
  • Scheduled weekly (every Monday 8 AM):
    - Aggregate past 7 days from Sheets
    - Format weekly revenue, order count, avg order value
    - Gmail: send formatted weekly report to owner
```

---

## Risk Signals Checked by n8n

The Code node in n8n checks these fraud signals before calling OpenAI:

1. **Email domain mismatch** — does billing email domain match a known fraud domain list?
2. **Shipping/billing address mismatch** — different cities/countries?
3. **High-velocity pattern** — is this IP/email seen multiple times in the last hour? (checked via HTTP request to n8n's own data)
4. **Unusual order value** — is this order 5x+ the store's average order value?
5. **Guest checkout** — combined with other signals, increases risk

---

## Setup Order

1. **Make first** — Create webhook + Google Sheets sheet + set up weekly schedule
2. **n8n second** — Set Make webhook URL in HTTP Request node, copy n8n webhook URL
3. **Zapier last** — Add n8n webhook URL to existing Shopify order Zap

---

## Files in This Folder

| File | Description |
|------|-------------|
| `architecture.md` | This document |
| `zapier-segment.md` | Zapier setup instructions |
| `n8n-segment.json` | n8n fraud detection workflow (importable) |
| `make-segment.json` | Make BI reporting blueprint (importable) |
| `make-weekly-report.json` | Make weekly report scenario (importable) |

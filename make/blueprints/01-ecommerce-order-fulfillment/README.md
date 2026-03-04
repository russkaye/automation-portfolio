# E-commerce Order to Fulfillment

**Platform:** Make
**Industry:** E-commerce
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Instantly processes every new Shopify order through 3 parallel routes: logs it to Google Sheets, sends the customer a branded confirmation email, and notifies the fulfillment team in Slack — all simultaneously.

## Business Use Case

**Problem:** E-commerce teams manually track orders in spreadsheets, write confirmation emails, and ping their team — a 5-10 minute process per order that's error-prone at scale.
**Solution:** Every new Shopify order triggers 3 actions simultaneously via Make's Router module.
**Impact:** Zero manual order logging; customers receive confirmation in seconds; fulfillment team alerted immediately; estimated 2–3 hours/day saved at 30+ orders/day.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Shopify Webhook (instant) |
| Trigger App | Shopify |
| Trigger Event | Watch Orders (new order created) |
| Polling | Instant (webhook-based) |

---

## Workflow Steps

### Module 1: Shopify — Watch Orders
**Trigger** that fires instantly when a new order is created in your Shopify store.

### Module 2: Router (3 parallel routes)
Splits the flow into 3 simultaneous branches.

**Route A: Google Sheets — Log Order**
- Appends a new row with: Order ID, Customer Email, Customer Name, Total Price, Payment Status, Timestamp

**Route B: Gmail — Send Confirmation Email**
- Sends a branded HTML confirmation email to the customer with order number and total

**Route C: Slack — Notify Team**
- Posts to `#new-orders` with order details for the fulfillment team

---

## Data Flow

```
[New Shopify Order]
         │
         ▼
    [Router]
   ┌───┬───┬───┐
   │   │   │   │
   ▼   ▼   ▼
[Sheets] [Gmail] [Slack]
```

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Shopify | Orders: Read | Connect your store |
| Google Sheets | Spreadsheet: Edit | Order tracking sheet |
| Gmail | Send | Store email account |
| Slack | messages:write | Bot in #new-orders channel |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| Spreadsheet ID | Google Sheets doc ID | Your spreadsheet ID |
| Sheet ID | Specific sheet within the doc | `0` (first sheet) |
| Slack channel | Notification channel | `#new-orders` |

---

## How to Import

1. Download `blueprint.json`
2. Make → Scenarios → Create a new scenario
3. Three-dot menu → Import Blueprint → select file
4. Reconnect: Shopify, Google Sheets, Gmail, Slack
5. Set your Spreadsheet ID and Sheet ID
6. Run once manually to test
7. Turn on the scenario

---

## Performance Notes

| Metric | Estimate |
|--------|----------|
| Execution time | Under 5 seconds |
| Operations/order | 4 (trigger + 3 actions) |
| Monthly ops at 30 orders/day | ~3,600 ops/mo (Core plan: $9/mo) |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

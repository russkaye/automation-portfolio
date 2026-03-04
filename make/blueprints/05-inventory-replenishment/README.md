# Inventory Replenishment — E-commerce

**Platform:** Make
**Industry:** E-commerce
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Runs daily at 6 AM, checks every Shopify product variant for low stock (below threshold), logs low-stock items to Google Sheets, emails a purchase order request to the supplier, and alerts the team on Slack — automatically.

## Business Use Case

**Problem:** E-commerce teams manually check inventory daily, compile low-stock reports, and send PO emails to suppliers — a 30–60 minute process that's often delayed or forgotten on busy days.
**Solution:** Make runs automatically every morning, checks every product, and handles all low-stock actions without human intervention.
**Impact:** Zero stockouts due to missed replenishment; 30–60 minutes/day saved; suppliers receive structured PO requests; team has full audit trail in Sheets.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Scheduled |
| Schedule | Daily at 6:00 AM |
| Trigger App | Shopify (list all products) |

---

## Workflow Steps

### Module 1: Shopify — List Products
Retrieves all products with their variants and inventory quantities (up to 250 per run).

### Module 2: Iterator
Loops through each product variant individually.

### Module 3: Filter — Low Stock Check
Only passes variants where `inventory_quantity < 10` (configurable threshold).

### Module 4: Google Sheets — Log Low Stock
Appends low-stock items to "Low Stock Report" sheet with: Product, SKU, Current Qty, Threshold, Units to Reorder, Date.

### Module 5: Gmail — Send PO Request
Sends a formatted purchase order email to the supplier for each low-stock item.

### Module 6: Slack — Alert #inventory-alerts
Posts a Slack alert for each low-stock item found.

---

## Data Flow

```
[Daily 6 AM Schedule]
         │
         ▼
[Shopify: All Products (250 max)]
         │
         ▼
[Iterator: Each Variant]
         │
         ▼ (filter: qty < 10 only)
[Low Stock Variants]
    ┌────┴──────┬──────────┐
    ▼           ▼          ▼
[Sheets]  [Gmail PO]  [Slack]
```

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Shopify | Products: Read, Inventory: Read | Connect your store |
| Google Sheets | Edit | Low stock report spreadsheet |
| Gmail | Send | Operations email |
| Slack | messages:write | Bot in #inventory-alerts |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| Low stock threshold | Units below which to trigger | `10` |
| Suggested reorder qty | Qty to suggest in PO email | `50` |
| Supplier email | Where PO emails go | `supplier@example.com` |
| Spreadsheet ID | Google Sheets doc | Your sheet ID |
| Schedule | When to run | `0 6 * * *` (daily 6 AM) |

---

## How to Import

1. Download `blueprint.json`
2. Make → Scenarios → Create a new scenario
3. Three-dot menu → Import Blueprint → select file
4. Reconnect Shopify, Google Sheets, Gmail, Slack
5. Update Spreadsheet ID and supplier email
6. Adjust the low-stock threshold filter (Module 3) if needed
7. Run once manually to test
8. Set the schedule and turn on

---

## Performance Notes

| Metric | Estimate |
|--------|----------|
| Run time | 2–5 minutes for 100 products |
| Operations/run | ~500 ops for 100 products (iterator × modules) |
| Monthly ops at daily run | ~15,000/mo — recommend Make Pro plan |

---

## Scaling Note

For stores with 250+ products, you'll need to add pagination logic:
- Add a second Shopify "List Products" module with `page_info` cursor from the first run
- Use Make's loop/repeat module to fetch all pages
- Or run the scenario with a product ID range filter

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

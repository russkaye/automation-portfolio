# Zapier Segment — E-commerce Intelligence

**Role in bridge:** Watches high-value Shopify orders and forwards to n8n for fraud detection

---

## Setup Instructions

### Option A: Add to Existing Shopify Zap
If you already have a Shopify → email confirmation Zap:
1. Open the existing Zap
2. Add a new action step after the existing actions
3. Action: **Webhooks by Zapier** → **POST**
4. URL: `[Your n8n webhook URL]`
5. Payload: order fields (see schema below)

### Option B: Create New Zap
1. Trigger: **Shopify** → **New Order**
2. Filter: `Total Price` (number) greater than `500`
3. Action: **Webhooks by Zapier** → **POST**

---

## Webhook Payload to Send

Configure the Webhooks by Zapier action with these fields:

| Field Name | Value Source |
|------------|-------------|
| `order_id` | Order ID (Shopify) |
| `order_number` | Order Number |
| `customer_email` | Customer Email |
| `customer_name` | Customer Name |
| `total_price` | Total Price |
| `financial_status` | Financial Status |
| `billing_city` | Billing Address City |
| `billing_country` | Billing Address Country |
| `shipping_city` | Shipping Address City |
| `shipping_country` | Shipping Address Country |
| `line_items_count` | Line Items Count |
| `created_at` | Created At |
| `source` | `Shopify` (hardcoded) |

---

## Notes

- Only forward orders above your fraud-check threshold (e.g., $500)
- Low-value orders can skip fraud checking to save n8n executions
- Zapier plan required: Starter ($19.99/mo) for Webhooks action

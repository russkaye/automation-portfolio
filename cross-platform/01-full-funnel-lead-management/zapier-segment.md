# Zapier Segment — Full Funnel Lead Management

**Role in bridge:** Captures Facebook leads and forwards to n8n for AI processing

---

## Steps

### Step 1: Trigger — Facebook Lead Ads > New Lead
1. Create Zap → Facebook Lead Ads → New Lead
2. Connect Facebook account → select Page → select Lead Form
3. Test trigger → verify lead fields load

### Step 2: Filter — High-Value Leads Only
1. Add Filter by Zapier
2. Condition: `Budget` (text) contains numbers greater than `5000000`
   > Or use: `Budget` (number) is greater than `5000000`
3. Continue

### Step 3: Action — Webhooks by Zapier > POST
1. Add Webhooks by Zapier → POST
2. Setup:
   - **URL:** `[Your n8n webhook URL]` — paste after setting up n8n segment
   - **Payload Type:** `JSON`
   - **Data:**
     - `name`: `Full Name` (from Step 1)
     - `email`: `Email` (from Step 1)
     - `phone`: `Phone Number` (from Step 1)
     - `budget`: `Budget` (from Step 1)
     - `timeline`: `Timeline` (from Step 1)
     - `property_type`: `Property Type` (from Step 1)
     - `message`: `Message` (from Step 1)
     - `source`: `Facebook Lead Ads` (hardcoded)
     - `lead_id`: `Lead ID` (from Step 1)
3. Test the action to confirm n8n receives it
4. Publish Zap → toggle ON

---

## Notes
- **Zapier plan required:** Starter ($19.99/mo) — webhooks are a multi-step action
- **Webhook security:** Optionally add a shared secret header to validate requests in n8n

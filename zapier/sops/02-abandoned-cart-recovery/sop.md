# Abandoned Cart Recovery

**Platform:** Zapier
**Industry:** E-commerce
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

A 3-step abandoned cart recovery sequence: 1-hour email reminder, 24-hour "cart expiring" email with discount code, and 48-hour SMS message. Recovers an estimated 5–15% of abandoned carts automatically.

## Business Use Case

**Problem:** 70% of e-commerce carts are abandoned. Each abandoned cart is lost revenue. Manual follow-up is impossible at scale.
**Solution:** Zapier automatically detects abandoned checkouts in Shopify and runs a timed 3-touch recovery sequence.
**Impact:** Industry-standard recovery rate of 5–15%; zero manual effort; sequence runs 24/7.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger App | Shopify |
| Trigger Event | Abandoned Checkout |
| Account | Connect your Shopify store |
| Polling | Every 15 minutes (Starter plan) |

---

## Zap Steps

### Step 1: Trigger — Shopify > Abandoned Checkout

1. Click **+ Create Zap**
2. Search for: `Shopify`
3. Select **Shopify**
4. Trigger Event: **Abandoned Checkout**
5. Connect your Shopify store account
6. Click **Test Trigger** — loads a recent abandoned checkout
7. Verify you see: `email`, `first_name`, `abandoned_checkout_url`, `total_price`, line items
8. Click **Continue**

---

### Step 2: Action — Delay by Zapier > Delay For

> First email sent 1 hour after abandonment.

1. Click **+** → search `Delay`
2. Select **Delay by Zapier**
3. Action Event: **Delay For**
4. Setup:
   - **Delay For:** `1`
   - **Delay Unit:** `Hours`
5. Click **Continue**

---

### Step 3: Action — Gmail > Send Email (1-hour reminder)

1. Click **+** → search `Gmail`
2. Select **Gmail** → Action: **Send Email**
3. Connect your Gmail account
4. Map fields:
   - **To:** `Email` (from Step 1)
   - **Subject:** `You left something behind, [First Name]!`
     - Insert `First Name` from Step 1
   - **Body:**
     ```html
     Hi [First Name],

     You left some great items in your cart!

     [List of abandoned items - use line items from Step 1]

     Cart Total: $[Total Price from Step 1]

     Your cart is saved and waiting for you. Complete your purchase here:
     [Abandoned Checkout URL from Step 1]

     Don't miss out — popular items sell quickly!

     Warm regards,
     [Store Name] Team
     ```
5. Click **Test Action** → verify email structure
6. Click **Continue**

---

### Step 4: Action — Delay by Zapier > Delay For

> Second email sent 24 hours after abandonment (23 more hours after Step 2).

1. Click **+** → **Delay by Zapier** → **Delay For**
2. Setup:
   - **Delay For:** `23`
   - **Delay Unit:** `Hours`
3. Click **Continue**

---

### Step 5: Action — Gmail > Send Email (24-hour discount)

1. Click **+** → **Gmail** → **Send Email**
2. Map fields:
   - **To:** `Email` (from Step 1)
   - **Subject:** `[First Name], your cart is expiring — here's 10% off`
     - Insert `First Name` from Step 1
   - **Body:**
     ```html
     Hi [First Name],

     Your cart will expire soon. We'd love for you to come back.

     As a thank you for your interest, here's an exclusive 10% discount:

     Discount Code: SAVE10

     [Abandoned Checkout URL from Step 1]

     This offer expires in 24 hours. Use code SAVE10 at checkout.

     [Store Name] Team
     ```
   > **Note:** Create the discount code `SAVE10` in Shopify first (Admin → Discounts)
3. Click **Test Action**
4. Click **Continue**

---

### Step 6: Action — Delay by Zapier > Delay For

> SMS sent 48 hours after abandonment (24 more hours after Step 4).

1. Click **+** → **Delay by Zapier** → **Delay For**
2. Setup:
   - **Delay For:** `24`
   - **Delay Unit:** `Hours`
3. Click **Continue**

---

### Step 7: Action — Twilio > Send SMS

1. Click **+** → search `Twilio`
2. Select **Twilio** → Action: **Send SMS**
3. Connect your Twilio account (Account SID + Auth Token from twilio.com/console)
4. Map fields:
   - **From Number:** Your Twilio phone number (e.g., `+1-555-XXX-XXXX`)
   - **To Number:** `Phone` (from Step 1 — Shopify billing address phone)
   - **Message:**
     ```
     Hi [First Name], your cart at [Store Name] is about to expire! Use code SAVE10 for 10% off. Complete your order: [Abandoned Checkout URL] Reply STOP to opt out.
     ```
   - Keep SMS under 160 characters for single-message delivery
5. Click **Test Action**
6. Click **Continue**

---

## Publish the Zap

1. Click **Publish Zap**
2. Name: `Shopify Abandoned Cart Recovery Sequence`
3. Toggle **ON**

---

## Important Notes

- **GDPR/Privacy:** Only send SMS if customer provided phone AND consented to marketing. Add a phone opt-in checkbox to your checkout.
- **Discount code:** Create `SAVE10` in Shopify Admin → Discounts before activating.
- **Testing:** Use a test Shopify order and abandon the checkout. Zapier will detect it within 15 minutes.
- **Deduplication:** Zapier won't re-trigger for the same checkout URL, preventing duplicate sequences.

---

## Required Accounts

| Service | Plan Required | Notes |
|---------|--------------|-------|
| Zapier | Starter ($19.99/mo) | Multi-step + Delay |
| Shopify | Any paid plan | Must have active store |
| Gmail | Free | Store email |
| Twilio | Pay-as-you-go | ~$0.0075/SMS in Philippines |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

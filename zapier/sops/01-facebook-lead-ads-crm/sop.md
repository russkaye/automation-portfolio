# Facebook Lead Ads → CRM + Email Notification

**Platform:** Zapier
**Industry:** Real Estate
**Complexity:** Simple ⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Automatically captures every Facebook Lead Ad submission, creates or updates a contact in HubSpot, sends a personalized follow-up email, and notifies the sales team in Slack — all within seconds of form submission.

## Business Use Case

**Problem:** Facebook leads expire quickly. When a real estate agent misses a Facebook lead notification or manually copies lead data to their CRM, the lead goes cold.
**Solution:** Every Facebook lead is automatically sent to HubSpot, emailed, and Slack-notified in under 30 seconds.
**Impact:** Lead response time reduced from hours to seconds; zero manual data entry; 100% of leads captured in CRM.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger App | Facebook Lead Ads |
| Trigger Event | New Lead |
| Account | Connect your Facebook Business account |
| Page | Select your Facebook Page |
| Form | Select your lead gen form |

---

## Zap Steps

### Step 1: Trigger — Facebook Lead Ads > New Lead

1. Click **+ Create Zap**
2. In the trigger search box, type: `Facebook Lead Ads`
3. Select **Facebook Lead Ads**
4. Trigger Event: **New Lead**
5. Click **Continue**
6. Connect your Facebook account → click **Continue**
7. **Page:** Select your Facebook Business Page
8. **Ad Form:** Select your lead gen form
9. Click **Test Trigger** — Zapier loads a sample lead
10. Verify you see fields like: `full_name`, `email`, `phone_number`, `budget`, `timeline`
11. Click **Continue**

---

### Step 2: Filter — Only proceed for target country (optional)

> Skip this step if you want ALL leads to go through.

1. Click **+** to add a step → search for **Filter**
2. Select **Filter by Zapier**
3. Filter setup:
   - Field: `Country` (from Step 1)
   - Condition: **(Text) Contains**
   - Value: `Philippines`
4. Click **Continue**

---

### Step 3: Action — HubSpot > Create or Update Contact

1. Click **+** → search `HubSpot`
2. Select **HubSpot**
3. Action Event: **Create or Update Contact**
4. Click **Continue**
5. Connect your HubSpot account → **Continue**
6. Map the fields:
   - **Email:** `Email` (from Step 1)
   - **First Name:** `First Name` (from Step 1)
   - **Last Name:** `Last Name` (from Step 1)
   - **Phone Number:** `Phone Number` (from Step 1)
   - **Lead Source:** Type manually: `Facebook Lead Ads`
   - **Lead Status:** Type manually: `New`
   - **City:** `City` (from Step 1, if available)
7. Click **Test Action** → verify contact created in HubSpot
8. Click **Continue**

---

### Step 4: Action — Gmail > Send Email

1. Click **+** → search `Gmail`
2. Select **Gmail**
3. Action Event: **Send Email**
4. Click **Continue**
5. Connect your Gmail account → **Continue**
6. Map the fields:
   - **To:** `Email` (from Step 1)
   - **Subject:** Type: `Hi [First Name], we received your inquiry!`
     - Click into subject field → insert: `First Name` from Step 1
     - Full subject: `Hi ` + `[First Name]` + `, we received your real estate inquiry!`
   - **Body (HTML recommended):**
     ```
     Hi [First Name],

     Thank you for your interest! We received your inquiry about [budget] properties in your preferred area.

     Our team will reach out to you within 1 business hour.

     In the meantime, you can:
     • Browse our current listings at [your website URL]
     • Call us directly at [your phone number]

     Looking forward to helping you find your dream home!

     Best regards,
     [Your Name]
     [Agency Name]
     ```
   - Replace `[First Name]` with the dynamic field from Step 1
   - Replace `[budget]` with the budget field from Step 1
7. Click **Test Action** → verify email received
8. Click **Continue**

---

### Step 5: Action — Slack > Send Channel Message

1. Click **+** → search `Slack`
2. Select **Slack**
3. Action Event: **Send Channel Message**
4. Click **Continue**
5. Connect your Slack account → **Continue**
6. Map the fields:
   - **Channel:** Select `#new-leads` (or your leads channel)
   - **Message Text:**
     ```
     New Facebook Lead!

     Name: [Full Name from Step 1]
     Email: [Email from Step 1]
     Phone: [Phone Number from Step 1]
     Budget: [Budget from Step 1]
     Timeline: [Timeline from Step 1]

     HubSpot contact created. Welcome email sent.
     ```
   - Insert dynamic fields from Step 1 where indicated
   - **Bot Name:** `Lead Bot` (optional)
7. Click **Test Action** → verify Slack message appears
8. Click **Continue**

---

## Publish the Zap

1. Click **Publish Zap**
2. Give it a name: `Facebook Lead Ads → HubSpot + Email + Slack`
3. Toggle the Zap **ON**

---

## Testing

After publishing, submit a test lead through your Facebook Lead Ad (use Facebook's Lead Ads Testing Tool at facebook.com/ads/leadgen/test_form):
1. Verify HubSpot contact created with correct fields
2. Check inbox for welcome email
3. Check #new-leads Slack channel for notification
4. If any step fails, click the Zap → view Task History to debug

---

## Required Accounts

| Service | Plan Required | Notes |
|---------|--------------|-------|
| Zapier | Starter ($19.99/mo) | Multi-step Zap |
| Facebook Lead Ads | Free | Must have an active lead form |
| HubSpot | Free CRM | Create API connection in Zapier |
| Gmail | Free | Your agency email |
| Slack | Free | Bot must join #new-leads channel |

---

## Zapier Plan Notes

This Zap has 3 actions (Steps 3, 4, 5) so it requires the **Starter plan** ($19.99/mo) or above. The Free plan only supports single-action Zaps.

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

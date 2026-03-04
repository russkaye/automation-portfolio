# Client Review Request — Post-Project Delivery

**Platform:** Zapier
**Industry:** Agency/Marketing
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Automatically sends a review request 3 days after a project delivery task is completed in Asana. High-satisfaction responses (4–5 stars) are logged to a Testimonials sheet for use in marketing materials.

## Business Use Case

**Problem:** Agencies forget to ask for testimonials after project delivery, missing a critical marketing opportunity. Manual follow-up is inconsistent.
**Solution:** When an Asana "Project Delivery" task is marked complete, Zapier waits 3 days then sends a Typeform review request. 5-star responses auto-populate a testimonials database.
**Impact:** 3x increase in testimonial collection; automated follow-up means 100% of deliveries get a review request; social proof improves sales conversion.

---

## Zap Steps

### Step 1: Trigger — Asana > Completed Task

1. Click **+ Create Zap**
2. Search: `Asana`
3. Select **Asana** → Trigger Event: **Completed Task**
4. Connect your Asana account
5. Setup:
   - **Workspace:** Select your agency workspace
   - **Project:** Select your client project (or "Any Project")
6. Click **Test Trigger** — loads a recently completed task
7. Click **Continue**

---

### Step 2: Filter — Only "Project Delivery" Tasks

1. Click **+** → **Filter by Zapier**
2. Setup:
   - Field: `Task Name` (from Step 1)
   - Condition: **(Text) Contains**
   - Value: `Project Delivery`
3. Click **Continue**

> This prevents the Zap from firing for every completed task — only delivery milestones.

---

### Step 3: Action — Delay by Zapier > Delay For

1. Click **+** → **Delay by Zapier** → **Delay For**
2. Setup:
   - **Delay For:** `3`
   - **Delay Unit:** `Days`
3. Click **Continue**

> 3 days gives the client time to experience the delivered work before being asked for a review.

---

### Step 4: Action — Typeform > Create Prefilled Link (optional) OR skip to Step 5

> If you have Typeform, use this to pre-fill the client's name/email. Skip if you use a static Typeform URL.

1. Click **+** → **Webhooks by Zapier** → **POST** (alternative: use direct Typeform URL in email)
2. OR simply use a static Typeform link in your email (Step 5) and skip this step.

---

### Step 5: Action — Gmail > Send Email

1. Click **+** → **Gmail** → **Send Email**
2. Map fields:
   - **To:** `Assignee Email` or `Task Custom Field: Client Email` (from Step 1)
     > **Note:** You may need to add a custom field "Client Email" to your Asana tasks
   - **Subject:** `How did we do? Quick feedback on [Project Name]`
     - Insert `Task Name` from Step 1
   - **Body:**
     ```html
     Hi [Client Name],

     We're so glad to have delivered [Task Name] to you this week!

     Your feedback means the world to us and helps us continue improving.

     Could you take 2 minutes to share your experience?

     👉 [Your Typeform Review Link Here]

     Your honest feedback is appreciated — positive or constructive.

     Thank you for trusting us with your project!

     Warm regards,
     [Your Name]
     [Agency Name]

     P.S. If there's anything we can improve, just reply to this email — we always want to do better.
     ```
3. Click **Test Action**
4. Click **Continue**

---

### Step 6: Path — Route Based on Review Score

1. Click **+** → search **Paths**
2. Select **Paths by Zapier**

> **Note:** Paths requires Zapier Professional plan ($49/mo).
> **Alternative for Starter plan:** Use a second Zap triggered by Typeform response.

**Path A: 5-Star Response**
- Condition: `Score` (from Typeform — requires a connected Typeform trigger in a separate Zap) equals `5`

**Path B: All Other Responses**
- Condition: All other responses

---

### Step 7 (Path A): Action — Google Sheets > Create Spreadsheet Row

1. Click **+** inside Path A → **Google Sheets** → **Create Spreadsheet Row**
2. Connect your Google account
3. Setup:
   - **Spreadsheet:** Select or create "Agency Testimonials"
   - **Worksheet:** `Testimonials`
4. Map columns:
   - **Client Name:** `Name` (from Typeform)
   - **Project:** `Project Name` (from Typeform)
   - **Score:** `Score` (from Typeform)
   - **Testimonial:** `Feedback` (from Typeform)
   - **Date:** `Submit Date` (from Typeform)
5. Click **Test Action**
6. Click **Continue**

---

## Recommended Typeform Questions

Build a Typeform with these questions:
1. **Name** (Short text) — field ref: `client_name`
2. **Company** (Short text) — field ref: `company`
3. **Project Name** (Short text) — field ref: `project_name`
4. **How would you rate our work?** (Rating 1–5) — field ref: `score`
5. **In a few words, what did we do best?** (Long text) — field ref: `best_thing`
6. **Any suggestions for improvement?** (Long text) — field ref: `improvement`
7. **May we use your feedback as a testimonial?** (Yes/No) — field ref: `permission`

---

## Required Accounts

| Service | Plan Required | Notes |
|---------|--------------|-------|
| Zapier | Professional ($49/mo) | Paths feature required |
| Asana | Any plan | Task completion trigger |
| Gmail | Free | Agency email |
| Typeform | Free | Review form |
| Google Sheets | Free | Testimonials database |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

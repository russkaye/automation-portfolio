# Appointment Reminder — Calendly + Email + SMS

**Platform:** Zapier
**Industry:** Healthcare / Professional Services
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Automatically sends a 24-hour email reminder and 1-hour SMS reminder for every new Calendly appointment booking. Logs all appointments to Google Sheets for tracking and reporting.

## Business Use Case

**Problem:** No-show rates for appointments average 20–30%. Manual reminder calls take 1–2 hours/day for a busy clinic or consultant.
**Solution:** Every Calendly booking automatically triggers timed reminders — no staff involvement.
**Impact:** No-show rate reduction of 30–50%; zero staff time for reminders; all appointments logged automatically.

---

## Zap Steps

### Step 1: Trigger — Calendly > Invitee Created

1. Click **+ Create Zap**
2. Search: `Calendly`
3. Select **Calendly** → Trigger Event: **Invitee Created**
4. Connect your Calendly account
5. Click **Test Trigger** — loads a recent booking
6. Verify fields: `invitee_email`, `invitee_full_name`, `start_time`, `end_time`, `event_type_name`
7. Click **Continue**

---

### Step 2: Action — Google Sheets > Create Spreadsheet Row

1. Click **+** → **Google Sheets** → **Create Spreadsheet Row**
2. Connect your Google account
3. Setup:
   - **Spreadsheet:** Create or select "Appointment Tracker"
   - **Worksheet:** `Appointments`
4. Map columns:
   - **Name:** `Invitee Full Name` (from Step 1)
   - **Email:** `Invitee Email` (from Step 1)
   - **Appointment Type:** `Event Type Name` (from Step 1)
   - **Start Time:** `Start Time` (from Step 1)
   - **End Time:** `End Time` (from Step 1)
   - **Status:** Type manually: `Confirmed`
   - **Date Booked:** `Created At` (from Step 1)
5. Click **Test Action** → verify row created
6. Click **Continue**

---

### Step 3: Action — Delay by Zapier > Delay Until

> Delays until 24 hours before the appointment start time.

1. Click **+** → **Delay by Zapier** → **Delay Until**
2. Setup:
   - **Date/Time:** `Start Time` (from Step 1)
   - **Offset:** `-24` hours
     > In Zapier, click "Show options" → "Modify date" → subtract 24 hours
     > **Alternative:** Use Zapier's Formatter to calculate: `Start Time` minus 24 hours = reminder time
3. Click **Continue**

> **Tip:** If "Delay Until" isn't precise enough, use Formatter by Zapier (Step 3) to calculate the exact reminder datetime first, then use that in Delay Until.

---

### Step 4: Action — Gmail > Send Email (24h reminder)

1. Click **+** → **Gmail** → **Send Email**
2. Map fields:
   - **To:** `Invitee Email` (from Step 1)
   - **Subject:** `Reminder: Your appointment is tomorrow`
   - **Body:**
     ```html
     Hi [Invitee Full Name],

     This is a friendly reminder that your appointment is tomorrow.

     Appointment Details:
     • Type: [Event Type Name from Step 1]
     • Date & Time: [Start Time from Step 1]
     • Duration: [Duration from Step 1]

     Location/Call Link: [Location from Step 1]

     What to prepare:
     • Valid ID
     • [Any other relevant items]

     If you need to reschedule, please do so at least 24 hours in advance:
     [Reschedule Link from Step 1]

     See you tomorrow!
     [Your Name / Clinic Name]
     ```
3. Click **Test Action**
4. Click **Continue**

---

### Step 5: Action — Delay by Zapier > Delay Until

> Delays until 1 hour before the appointment.

1. Click **+** → **Delay by Zapier** → **Delay Until**
2. Setup:
   - Same as Step 3 but offset: `-1` hour from `Start Time`
3. Click **Continue**

---

### Step 6: Action — Twilio > Send SMS

1. Click **+** → **Twilio** → **Send SMS**
2. Connect your Twilio account
3. Map fields:
   - **From Number:** Your Twilio number
   - **To Number:** `Invitee Phone Number` (from Step 1)
     > **Note:** Calendly collects phone if you add a phone number question to your booking form
   - **Message:**
     ```
     Reminder: Your appointment with [Your Name] is in 1 hour at [Start Time]. Location: [Location]. Reply STOP to opt out.
     ```
   - Keep under 160 characters
4. Click **Test Action**
5. Click **Continue**

---

## Publish the Zap

1. Click **Publish Zap**
2. Name: `Calendly → Appointment Reminders (Email + SMS)`
3. Toggle **ON**

---

## Calendly Setup Notes

To collect phone numbers for SMS:
1. Calendly → Event Types → Edit your event type
2. Booking Questions → Add Question
3. Question type: **Phone Number**
4. Mark as **Required** (or optional)
5. Field name: `phone_number`

---

## Testing

1. Book a test appointment through your Calendly link
2. Check Google Sheets → new row should appear immediately
3. Wait for delay period (or test with a near-future appointment)
4. Verify email arrives 24h before
5. Verify SMS arrives 1h before

---

## Required Accounts

| Service | Plan Required | Notes |
|---------|--------------|-------|
| Zapier | Starter ($19.99/mo) | Multi-step + Delay |
| Calendly | Basic (free) or above | Webhook trigger |
| Google Sheets | Free | Appointment tracker |
| Gmail | Free | Your email |
| Twilio | Pay-as-you-go | ~$0.0075/SMS |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

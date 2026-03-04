# Monthly Analytics Report

**Platform:** Zapier
**Industry:** Agency/Marketing
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Runs automatically on the 1st of every month at 8 AM, pulls Google Analytics data for the past 30 days, formats the metrics, logs them to Google Sheets, and emails a report to the client — no manual report generation needed.

## Business Use Case

**Problem:** Account managers spend 2–4 hours/month per client pulling analytics data, formatting it, and writing the report email. At 5+ clients, this is 10–20 hours of low-value work each month.
**Solution:** Zapier automates the entire reporting pipeline. Runs on the 1st of every month without any manual action.
**Impact:** 2–4 hours saved per client per month; clients receive consistent, on-time reports; AMs focus on strategy, not data entry.

---

## Zap Steps

### Step 1: Trigger — Schedule by Zapier > Every Month

1. Click **+ Create Zap**
2. Search: `Schedule`
3. Select **Schedule by Zapier** → Trigger Event: **Every Month**
4. Setup:
   - **Day of Month:** `1` (first day of each month)
   - **Time of Day:** `8:00 AM`
   - **Time Zone:** Select your timezone (e.g., `Manila/Asia`)
5. Click **Test Trigger** — Zapier generates a sample timestamp
6. Click **Continue**

---

### Step 2: Action — Google Analytics > Run Report

1. Click **+** → search `Google Analytics`
2. Select **Google Analytics** (4) → Action Event: **Run Report**
3. Connect your Google Analytics account
4. Setup:
   - **Property:** Select your GA4 property
   - **Date Range:** Select **Last 30 days** (or `last_30_days`)
   - **Metrics to include:**
     - `Sessions`
     - `Active Users`
     - `New Users`
     - `Bounce Rate`
     - `Average Session Duration`
     - `Total Events` (or `Conversions`)
   - **Dimensions:** `Date` (optional — gives daily breakdown)
5. Click **Test Action** → verify metrics appear
6. Click **Continue**

---

### Step 3: Action — Formatter by Zapier > Numbers

> Formats raw metrics for display in the email (e.g., `12543` → `12,543`).

1. Click **+** → **Formatter by Zapier** → **Numbers**
2. Transform: **Format Number**
3. Setup for Sessions:
   - **Input:** `Sessions` (from Step 2)
   - **To Format:** `1,234.56` (thousands separator, no decimals)
4. Click **Continue**
5. **Repeat this step** for each key metric you want formatted:
   - Active Users
   - New Users
   - Total Events/Conversions

> **Alternative:** Skip Formatter and use raw numbers in the email — perfectly fine for most reports.

---

### Step 4: Action — Google Sheets > Append Row

1. Click **+** → **Google Sheets** → **Append Row**
2. Connect Google account
3. Setup:
   - **Spreadsheet:** "Monthly Analytics Reports" (create this first)
   - **Worksheet:** `Monthly Data`
4. Map columns:
   - **Month:** `Trigger Date` (from Step 1 — format: `YYYY-MM`)
   - **Sessions:** `Sessions` (from Step 2 or 3)
   - **Active Users:** `Active Users` (from Step 2 or 3)
   - **New Users:** `New Users` (from Step 2 or 3)
   - **Bounce Rate:** `Bounce Rate` (from Step 2)
   - **Avg Session Duration:** `Average Session Duration` (from Step 2)
   - **Conversions:** `Total Events` (from Step 2)
   - **Report Date:** `Trigger Date` (from Step 1)
5. Click **Test Action** → verify row appended
6. Click **Continue**

---

### Step 5: Action — Gmail > Send Email

1. Click **+** → **Gmail** → **Send Email**
2. Map fields:
   - **To:** Type your client's email address (or make it dynamic from a Sheets lookup)
   - **Subject:** `Monthly Analytics Report — [Month/Year]`
     - Use Formatter to get month name from Step 1
   - **Body (HTML):**
     ```html
     <h2>Monthly Analytics Report</h2>
     <p>Here is your website performance summary for the past 30 days.</p>

     <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%">
       <thead style="background-color:#f3f4f6">
         <tr>
           <th>Metric</th>
           <th>This Month</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Total Sessions</td>
           <td><strong>[Sessions from Step 3]</strong></td>
         </tr>
         <tr>
           <td>Active Users</td>
           <td><strong>[Active Users from Step 3]</strong></td>
         </tr>
         <tr>
           <td>New Users</td>
           <td><strong>[New Users from Step 3]</strong></td>
         </tr>
         <tr>
           <td>Bounce Rate</td>
           <td><strong>[Bounce Rate from Step 2]%</strong></td>
         </tr>
         <tr>
           <td>Avg. Session Duration</td>
           <td><strong>[Avg Session Duration from Step 2]s</strong></td>
         </tr>
         <tr>
           <td>Conversions / Events</td>
           <td><strong>[Total Events from Step 3]</strong></td>
         </tr>
       </tbody>
     </table>

     <p>Full data has been logged to your analytics dashboard.</p>
     <p>If you have any questions about these results, reply to this email or book a strategy call.</p>

     <p>Best regards,<br>[Your Name]<br>[Agency Name]</p>
     ```
   - Replace all `[...]` fields with dynamic values from previous steps
3. Click **Test Action** → verify email layout looks correct
4. Click **Continue**

---

## Publish the Zap

1. Click **Publish Zap**
2. Name: `Monthly Analytics Report — Auto Email`
3. Toggle **ON**

---

## Customizing for Multiple Clients

To run this for multiple clients, duplicate the Zap (Zap Settings → Duplicate) and:
1. Update Step 2: Change the GA4 property to the client's property
2. Update Step 4: Change the spreadsheet to the client's sheet
3. Update Step 5: Change the email To address to the client's email
4. Rename the Zap with the client's name

---

## Required Accounts

| Service | Plan Required | Notes |
|---------|--------------|-------|
| Zapier | Starter ($19.99/mo) | Multi-step Zap |
| Google Analytics | Free | GA4 property |
| Google Sheets | Free | Analytics log spreadsheet |
| Gmail | Free | Your or client's email |

---

## Google Analytics Setup Notes

- You need **Editor** or **Viewer** access to the GA4 property
- Connect GA4 in Zapier: search for "Google Analytics 4" (not the older GA3 version)
- If the client owns the GA property, they need to add your email as a viewer

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

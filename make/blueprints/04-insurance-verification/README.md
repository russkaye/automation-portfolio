# Insurance Verification — Healthcare

**Platform:** Make
**Industry:** Healthcare
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Automatically verifies patient insurance coverage via API when a new patient form is submitted, logs results to Google Sheets, then routes to either a confirmation email (if verified) or a manual review alert (if pending/denied) — all without staff intervention.

## Business Use Case

**Problem:** Front desk staff spend 15–30 minutes per patient calling insurance companies or using web portals to verify coverage. At 20 patients/day, that's 5+ hours of low-value administrative work.
**Solution:** Patient submits intake form → Make instantly calls the insurance verification API → result determines the next action automatically.
**Impact:** Verification time reduced from 20 minutes to under 10 seconds; staff focuses on patient care; 100% of verifications logged for compliance.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Custom Webhook (instant) |
| Source | Patient intake form (Typeform, JotForm, etc.) |
| Expected Fields | patient_name, patient_email, insurance_provider, member_id, date_of_birth, provider_npi |

---

## Workflow Steps

### Module 1: Custom Webhook
Receives new patient form submission instantly.

### Module 2: HTTP Request — Insurance Verification API
Calls your insurance verification API with member ID, DOB, provider, and NPI.
> **Note:** Replace the URL with your actual verification API endpoint (Availity, Change Healthcare, Waystar, etc.)

### Module 3: Google Sheets — Log Result
Appends verification result to the Insurance Log sheet for compliance records.

### Module 4: Router (2 routes)

**Route A: Verified**
- Gmail: Confirmation email with coverage details
- Slack: Notify #verified-patients

**Route B: Pending/Denied**
- Gmail: Action required email asking for updated insurance info
- Slack: Alert #insurance-review for manual follow-up

---

## Data Flow

```
[Patient Form Webhook]
         │
         ▼
[HTTP: Insurance API Call]
         │
         ▼
[Google Sheets: Log Result]
         │
         ▼
      [Router]
    ┌──────────┐
    │          │
    ▼          ▼
[Verified]  [Pending/Denied]
[Gmail+Slack] [Gmail+Slack]
```

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Insurance Verification API | API key | Availity, Change Healthcare, or similar |
| Google Sheets | Edit | Insurance log spreadsheet |
| Gmail | Send | Clinic email |
| Slack | messages:write | Bot in both channels |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| Verification API URL | Your insurance API endpoint | `https://api.availity.com/verify` |
| API Bearer Token | Authentication token | Your API key |
| Spreadsheet ID | Google Sheets log | Your spreadsheet ID |

---

## How to Import

1. Download `blueprint.json`
2. Make → Scenarios → Create a new scenario
3. Three-dot menu → Import Blueprint → select file
4. Update the HTTP Request URL and auth token
5. Reconnect Google Sheets, Gmail, Slack
6. Set your Spreadsheet ID
7. Test with a sample patient webhook payload
8. Turn on the scenario

---

## Performance Notes

| Metric | Estimate |
|--------|----------|
| Execution time | 3–8 seconds (API call dependent) |
| Operations/verification | 6 (webhook + HTTP + Sheets + 2 route actions) |
| Monthly ops at 20 patients/day | ~3,600 ops/mo (Make Core plan) |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

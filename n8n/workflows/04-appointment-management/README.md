# Appointment Management — Healthcare

**Platform:** n8n
**Industry:** Healthcare
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

End-to-end appointment management: new patient Typeform submission triggers automatic calendar creation, confirmation email, 24-hour SMS reminder, and 1-hour SMS reminder — all without manual staff intervention.

## Business Use Case

**Problem:** Medical clinics spend 2–3 staff hours/day manually booking appointments, sending confirmations, and calling patients for reminders. No-show rates average 20–30%.
**Solution:** Fully automated booking flow. Patient submits form → everything else is automatic.
**Impact:** No-show rate reduced by 30–50% with automated reminders; 2–3 staff hours/day saved; patients receive instant confirmation.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Typeform Webhook |
| Trigger App | Typeform |
| Form Fields Required | patient_name, patient_email, patient_phone, appointment_date, appointment_time, visit_reason |

---

## Workflow Steps

### Step 1: Typeform — New Patient Form
Receives new patient form submission. Required field refs: `patient_name`, `patient_email`, `patient_phone`, `appointment_date`, `appointment_time`, `visit_reason`.

### Step 2: Google Calendar — Create Appointment
Creates a 1-hour calendar event at the requested time, with patient details in the description.

### Step 3: Gmail — Confirmation Email
Sends an immediate confirmation with appointment details and what to bring.

### Step 4: Wait — 24h Before
Pauses workflow execution until exactly 24 hours before the appointment.

### Step 5: Twilio — 24h SMS Reminder
Sends first SMS reminder with time and instructions.

### Step 6: Wait — 1h Before
Pauses workflow until 1 hour before appointment.

### Step 7: Twilio — 1h SMS Reminder
Sends final reminder SMS.

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Typeform API | Webhook | Connect your patient intake form |
| Google Calendar OAuth | Calendar: Write | Clinic calendar |
| Gmail OAuth | Send | Clinic email |
| Twilio | Messages: Create | Twilio number must support SMS |

---

## Typeform Setup

Create a Typeform with these field references (set in the field settings):
- `patient_name` — Short text
- `patient_email` — Email
- `patient_phone` — Phone number
- `appointment_date` — Date
- `appointment_time` — Short text (HH:MM format)
- `visit_reason` — Long text

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

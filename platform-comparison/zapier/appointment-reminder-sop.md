# Appointment Reminder — Platform Comparison (Zapier)

**Platform:** Zapier
**Industry:** Healthcare / Professional Services
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

> This is the Zapier implementation of the Appointment Reminder workflow.
> See [appointment-reminder-comparison.md](../appointment-reminder-comparison.md) to compare this against the n8n and Make versions.

---

## Zap Steps

### Step 1: Trigger — Calendly > Invitee Created
1. Create Zap → **Calendly** → **Invitee Created**
2. Connect Calendly account
3. Select your event type (or "Any Event")
4. Test trigger — verify `invitee_full_name`, `invitee_email`, `start_time` load

### Step 2: Action — Google Sheets > Create Spreadsheet Row
1. **Google Sheets** → **Create Spreadsheet Row**
2. Spreadsheet: "Appointment Tracker"
3. Map: Name, Email, Event Type, Start Time, Status = "Confirmed"

### Step 3: Action — Delay by Zapier > Delay Until
1. **Delay by Zapier** → **Delay Until**
2. Date/Time: `Start Time` (from Step 1) minus 24 hours
   - Use Formatter (Step 2.5) to calculate: `Start Time` — then manually offset if needed

### Step 4: Action — Gmail > Send Email (24h reminder)
1. **Gmail** → **Send Email**
2. To: `Invitee Email` (Step 1)
3. Subject: `Reminder: Your appointment is tomorrow`
4. Body: Personalized with invitee name, event name, start time, reschedule link

### Step 5: Action — Delay by Zapier > Delay Until
1. **Delay by Zapier** → **Delay Until**
2. Date/Time: `Start Time` minus 1 hour

### Step 6: Action — Twilio > Send SMS
1. **Twilio** → **Send SMS**
2. To: `Invitee Phone Number` (if collected in Calendly form)
3. Message: Short reminder under 160 characters

---

## Platform-Specific Notes (Zapier)

**Limitation:** Zapier's "Delay Until" doesn't accept datetime math expressions directly. Workaround:
1. Add a **Formatter by Zapier** step between the trigger and delay
2. Formatter → Date/Time → Format: subtract 24 hours from `Start Time`
3. Use the formatted output as the Delay Until value

**Cost:** This 5-action Zap uses 5 tasks per booking. At 200 bookings/month = 1,000 tasks/month. Fits Starter plan ($19.99/mo, 750 tasks) + a small overage, or Professional plan ($49/mo, 2,000 tasks).

**Polling:** Calendly trigger checks every 15 minutes (Starter) or 2 minutes (Professional). Instant webhooks are not available for Calendly in Zapier — use Make or n8n for true real-time triggers.

---

## Comparison Summary

| Aspect | This Zapier Implementation |
|--------|--------------------------|
| Setup time | ~15 minutes |
| Delay precision | ±15 minutes (polling) |
| Datetime math | Requires extra Formatter step |
| Monthly cost at 200 bookings | ~$20–50/mo |
| Best for | Non-technical teams, quick setup |

See [full comparison →](../appointment-reminder-comparison.md)

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

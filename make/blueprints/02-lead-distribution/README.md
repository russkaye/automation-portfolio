# Lead Distribution — Real Estate

**Platform:** Make
**Industry:** Real Estate
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Automatically routes Typeform leads to either a high-priority pipeline (HubSpot + Calendar follow-up + Slack alert) or a Mailchimp nurture sequence based on budget threshold. No lead falls through the cracks.

## Business Use Case

**Problem:** Real estate agencies receive dozens of leads daily but struggle to prioritize. Senior agents waste time on low-budget inquiries while hot leads wait.
**Solution:** Make routes leads automatically based on budget. High-budget leads get immediate human follow-up; others enter an automated nurture sequence.
**Impact:** Senior agents only call qualified leads; 100% of leads enter a follow-up sequence; response time to hot leads cut from hours to minutes.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Typeform Webhook (instant) |
| Trigger App | Typeform |
| Form Fields Required | first_name, last_name, email, phone, budget, timeline, property_type |

---

## Workflow Steps

### Module 1: Typeform — Watch Responses
Instant trigger on new form submission.

### Module 2: Router (2 routes with filter)

**Route A: High Priority (budget > 5,000,000)**
- HubSpot: Create/update contact with hot lead status
- Google Calendar: Schedule follow-up call in 2 hours
- Slack: Alert #hot-leads channel

**Route B: Nurture (all other leads)**
- HubSpot: Create/update contact with in-progress status
- Mailchimp: Add to nurture sequence with lead tags

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Typeform | Webhook | Connect your lead form |
| HubSpot | Contacts: Write | API key or OAuth |
| Google Calendar | Events: Write | Agent's calendar |
| Slack | messages:write | Bot in #hot-leads |
| Mailchimp | Lists: Write | Nurture list |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| Typeform Form ID | Your form's ID | `abc123def` |
| Budget threshold | Minimum budget for "hot" route | `5000000` |
| Mailchimp List ID | Nurture sequence list | `a1b2c3d4e5` |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

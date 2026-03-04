# Zapier SOPs

5 step-by-step Standard Operating Procedures (SOPs) for building Zaps — documented exactly as they appear in the Zapier UI.

## Why Zapier?

Zapier is the best platform for:
- **Non-technical users** — easiest UI, no code required
- **App integrations** — 6,000+ apps (largest library of any platform)
- **Quick deployment** — build and activate a Zap in under 10 minutes
- **Reliability** — 99.9% uptime SLA on paid plans
- **Team-friendly** — shareable Zap links, folder organization

## SOPs

| # | Zap Name | Industry | Complexity | Apps Used |
|---|----------|----------|-----------|-----------|
| [01](./sops/01-facebook-lead-ads-crm/) | Facebook Lead Ads → CRM | Real Estate | ⚡ | Facebook Lead Ads, HubSpot, Gmail, Slack |
| [02](./sops/02-abandoned-cart-recovery/) | Abandoned Cart Recovery | E-commerce | ⚡⚡ | Shopify, Gmail, Twilio |
| [03](./sops/03-client-review-request/) | Client Review Request | Agency | ⚡⚡ | Asana, Typeform, Gmail, Google Sheets |
| [04](./sops/04-appointment-reminder/) | Appointment Reminder | Healthcare | ⚡⚡ | Calendly, Google Sheets, Gmail, Twilio |
| [05](./sops/05-monthly-analytics-report/) | Monthly Analytics Report | Agency | ⚡⚡ | Scheduler, Google Analytics, Google Sheets, Gmail |

## How to Use These SOPs

Unlike n8n and Make, Zapier doesn't support direct file import for complex Zaps. These SOPs guide you step-by-step:

1. Log in to [zapier.com](https://zapier.com)
2. Click **Create Zap** (or **Make a Zap**)
3. Open the SOP Markdown file in this folder
4. Follow each numbered step — every step names the exact **App** and **Event** as shown in Zapier's UI
5. Test your Zap → click **Publish**

## Zapier Version

These SOPs are written for the **Zapier 2025–2026 UI** (new editor). If you're using the classic editor, the options are the same but navigation may differ slightly.

## Zapier Plans Required

| SOP | Minimum Plan | Reason |
|-----|-------------|--------|
| 01 — Facebook Lead Ads | Starter ($19.99/mo) | Multi-step Zap |
| 02 — Abandoned Cart | Starter | Multi-step + Delay |
| 03 — Client Review | Professional ($49/mo) | Paths (conditional branching) |
| 04 — Appointment Reminder | Starter | Multi-step + Delay |
| 05 — Analytics Report | Starter | Multi-step |

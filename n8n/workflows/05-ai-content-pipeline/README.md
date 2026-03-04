# AI Content Pipeline — Agency

**Platform:** n8n
**Industry:** Agency/Marketing
**Complexity:** Complex ⚡⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Transforms a content brief into 3 AI-generated social media post variants, logs them to Google Sheets, and schedules each to Buffer for staggered publishing. From brief to scheduled posts in under 10 seconds.

## Business Use Case

**Problem:** Content teams spend 2–4 hours per post brainstorming, drafting, and scheduling. Agencies managing 10+ clients can't scale manually.
**Solution:** Submit a content brief → AI generates 3 variants for review → best variant auto-scheduled to social media.
**Impact:** Content production time reduced by 80%; 3 variants per brief means A/B testing at scale; all content logged in Sheets for reporting.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Webhook (POST) |
| Webhook Path | `/webhook/content-pipeline` |
| Expected Payload | `{ topic, tone, audience, platform, key_message, cta }` |

---

## Workflow Steps

### Step 1: Webhook — Content Brief
Receives a content brief with topic, brand tone, target audience, platform, key message, and CTA.

### Step 2: OpenAI — Generate Variants
GPT-4o generates 3 distinct post variants: Educational, Storytelling, and Direct CTA angles.

### Step 3: Code — Parse Variants
Safely parses AI JSON response into 3 individual items for batch processing.

### Step 4: Google Sheets — Log Content
Appends all 3 variants to a "Content Calendar" sheet for client review and tracking.

### Step 5: Split In Batches
Processes each variant one-at-a-time for the Buffer scheduling step.

### Step 6: HTTP Request — Buffer Schedule
Posts each variant to Buffer, scheduled 1–3 days apart for staggered publishing.

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| OpenAI API | API key | GPT-4o recommended for quality |
| Google Sheets OAuth | Spreadsheet: Edit | Content calendar spreadsheet |
| Buffer API | Updates: Create | Buffer profile ID required |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| Spreadsheet ID | Google Sheets doc ID | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms` |
| Buffer Profile ID | Social profile in Buffer | `4eb854340acb04e870000010` |

---

## Example Payload

```json
{
  "topic": "Why automation saves 10 hours a week",
  "tone": "professional but conversational",
  "audience": "small business owners",
  "platform": "LinkedIn",
  "key_message": "Automation is not just for big companies — any business can start today",
  "cta": "Book a free automation audit"
}
```

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

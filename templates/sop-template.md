# [Workflow Name]

**Platform:** [n8n | Make | Zapier]
**Industry:** [Real Estate | E-commerce | Agency/Marketing | Healthcare]
**Complexity:** [Simple ⚡ | Medium ⚡⚡ | Complex ⚡⚡⚡]
**Version:** 1.0
**Last Updated:** YYYY-MM-DD
**Author:** Russell Kaye M. Abregande

---

## Overview

[1-2 sentence plain-English description of what this workflow does and the business problem it solves.]

## Business Use Case

**Problem:** [What manual process or pain point does this replace?]
**Solution:** [How does this workflow solve it?]
**Impact:** [Time saved, errors reduced, revenue enabled — use estimates]

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | [Webhook / Schedule / App Event / Manual] |
| Trigger App | [App name] |
| Trigger Event | [Specific event, e.g., "New Form Submission"] |
| Polling Interval | [If schedule-based, e.g., "Every 15 minutes"] |

---

## Workflow Steps

### Step 1: [Step Name]
- **Node/Action:** [Node type or app action name]
- **Purpose:** [What this step does]
- **Key Configuration:**
  - `fieldName`: value or expression
- **Output:** [What data passes to next step]

### Step 2: [Step Name]
*(repeat for every step)*

---

## Data Flow

```
[Trigger] → [Step 1] → [Step 2] → [Step 3] → [Output]
                              ↓
                    [Branch condition if applicable]
                    ├── [Branch A] → [Result A]
                    └── [Branch B] → [Result B]
```

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| [App Name] | Read + Write | [Any setup note] |
| [App Name] | Read | [Any setup note] |

---

## Configuration Variables

Customize these values before activating:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `WEBHOOK_URL` | Inbound webhook endpoint | `https://your-n8n.com/webhook/abc` |
| `SLACK_CHANNEL` | Target Slack channel | `#sales-leads` |
| `CRM_PIPELINE_ID` | Pipeline identifier | `12345678` |

---

## Error Handling

- **On API failure:** [Retry logic / fallback / alert]
- **On missing data:** [How null/empty fields are handled]
- **On timeout:** [What happens after X seconds]

---

## Testing Instructions

1. [Step to trigger a test run]
2. [What to verify in the output]
3. [How to confirm downstream systems received data]

---

## Setup Instructions

### For n8n (JSON Import)
1. Download `workflow.json` from this folder
2. n8n → Settings → Import Workflow → select the file
3. Add credentials for each connected service (yellow badge nodes)
4. Update the Configuration Variables in each node
5. Run a manual test trigger
6. Click Activate

### For Make (Blueprint Import)
1. Download `blueprint.json` from this folder
2. Make → Scenarios → Create New → Import Blueprint
3. Reconnect each app module with your credentials
4. Update variable values in each module's configuration
5. Run once manually to test
6. Turn on the scenario

### For Zapier (SOP)
1. Log in to zapier.com → Make a Zap
2. Follow each step in this document exactly
3. Each step lists the exact app name and action as it appears in Zapier UI

---

## Performance Notes

| Metric | Estimate |
|--------|----------|
| Execution time | [e.g., 2–5 seconds per trigger] |
| Monthly operations | [e.g., ~400 ops/month at 50 leads/day] |
| Platform tier required | [e.g., Make Core or above (multi-step Zaps)] |

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| 1.0 | YYYY-MM-DD | Initial version |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

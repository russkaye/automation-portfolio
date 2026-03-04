# Make Platform Notes

## Pricing (as of 2026)

| Tier | Price | Operations/mo | Notes |
|------|-------|--------------|-------|
| Free | $0 | 1,000 | 2 active scenarios, 15-min intervals |
| Core | $9/mo | 10,000 | All apps, 5-min intervals |
| Pro | $16/mo | 10,000 | Custom variables, full execution history |
| Teams | $29/mo | 10,000 | Multi-user, team features |
| Enterprise | Custom | Custom | SSO, SLA, dedicated support |

**Operation counting:** Every module execution = 1 operation. A 5-module scenario running 100 times = 500 operations.

## What Makes Make Unique

- **Router module** — splits flow into parallel branches (all run simultaneously, free)
- **Aggregator** — collect results from multiple items into a single bundle
- **Iterator** — process array items one-by-one (like a for-loop)
- **Error handling** — resume, rollback, or ignore on error routes
- **Instant webhooks** — real-time triggers (vs polling)

## Expression Syntax Reference

```
{{1.fieldName}}          // Module 1 output field
{{1.customer.email}}     // Nested field access
{{now}}                  // Current timestamp
{{formatDate(now; "YYYY-MM-DD")}}  // Date format
{{if(1.status = "active"; "Yes"; "No")}}  // Conditional
{{length(1.items)}}      // Array length
{{parseNumber(1.price)}} // Convert string to number
```

**Note:** Module numbers (1, 2, 3...) refer to the order modules appear in the scenario.

## Blueprint Structure

Make blueprints are JSON files with this top-level structure:

```json
{
  "name": "Scenario Name",
  "flow": [...],      // Array of modules
  "metadata": {
    "instant": true,  // true = webhook trigger, false = polling
    "version": 1,
    "scenario": {
      "roundtrips": 1,
      "maxErrors": 3,
      "autoCommit": true
    }
  }
}
```

## Common Gotchas

- Module output references use the module's **position number**, not name
- Routers run all branches **in parallel** — don't assume sequential order
- **Operations are consumed** even if a run fails partway through
- Date/time formatting uses Make's own format tokens (different from moment.js)
- Webhook URLs change if you delete and recreate the webhook module

# Appointment Reminder — Platform Comparison

**Workflow:** Calendly booking → 24h email reminder → 1h SMS reminder
**Industry:** Healthcare / Professional Services
**Author:** Russell Kaye M. Abregande

---

## The Workflow (Same Logic, 3 Platforms)

```
[New Appointment Booked]
         │
         ▼
[Log to Google Sheets]
         │
         ▼
[Wait until 24h before appointment]
         │
         ▼
[Send email reminder]
         │
         ▼
[Wait until 1h before appointment]
         │
         ▼
[Send SMS reminder]
```

---

## Side-by-Side Comparison

### Setup Complexity

| Aspect | n8n | Make | Zapier |
|--------|-----|------|--------|
| Time to build | ~30 min | ~20 min | ~15 min |
| Code required | Optional | No | No |
| Visual builder | Yes | Yes (best) | Yes |
| Learning curve | Medium | Low-Medium | Low |
| Documentation quality | Good | Excellent | Excellent |

### Cost Analysis (200 appointments/month)

| Platform | Tier Needed | Cost/mo | Operations Used |
|----------|------------|---------|-----------------|
| n8n (self-host) | Community (free) | $0* | Unlimited |
| n8n (cloud) | Starter | $20/mo | ~1,200/mo (flat rate) |
| Make | Core | $9/mo | ~1,400 ops/mo |
| Zapier | Starter | $19.99/mo | ~1,600 tasks/mo |

*Self-hosting requires a server (~$5-10/mo DigitalOcean)

### Feature Comparison

| Feature | n8n | Make | Zapier |
|---------|-----|------|--------|
| Calendly trigger | ✅ Native node | ✅ Native module | ✅ Native app |
| Google Sheets | ✅ Native node | ✅ Native module | ✅ Native app |
| Gmail | ✅ Native node | ✅ Native module | ✅ Native app |
| Twilio SMS | ✅ Native node | ✅ Native module | ✅ Native app |
| Wait/Delay | ✅ Wait node | ✅ Sleep module | ✅ Delay by Zapier |
| Custom logic | ✅ Code node | ⚠️ Limited | ⚠️ Code by Zapier |
| Error retry | ✅ Built-in | ✅ Built-in | ✅ Built-in |
| Execution logs | ✅ | ✅ (30 days) | ✅ (7 days Starter) |
| AI add-on | ✅ Native LLM nodes | ⚠️ HTTP only | ⚠️ Basic AI actions |

### How Each Platform Handles the Delay

**n8n:** Uses the `Wait` node — pauses execution until a specific datetime expression. No extra cost. Supports up to 30 days wait.

```javascript
// Wait node expression
{{ $json.appointment_datetime.minus({ hours: 24 }).toISO() }}
```

**Make:** Uses the `Sleep` module — pauses scenario for a set duration. Each wake-up counts as 1 operation.

**Zapier:** Uses "Delay by Zapier" — delays can be set to hours/days but NOT to a specific datetime. Workaround: use a "Delay Until" with date math.

---

## Platform Recommendation Decision Tree

```
Does the client have existing Zaps?
├── YES → Keep Zapier for this workflow. Bridge with n8n if AI needed.
└── NO → Building from scratch?
    ├── Non-technical team? → Zapier or Make
    ├── Developer on team? → n8n (cheaper at scale, more powerful)
    └── High volume (1,000+/mo)? → Make (cheapest per-op) or n8n self-host
```

---

## Real-World Considerations

### When to Choose n8n
- You or your client's team includes a developer
- You need AI/LLM processing in the same workflow
- Volume is high and cost matters (self-host = unlimited)
- Data privacy is important (self-host keeps data on-premise)
- You need complex branching or custom JavaScript logic

### When to Choose Make
- Visual scenario builder is important for client demos
- Medium-to-high volume with cost sensitivity
- Team prefers drag-and-drop over code
- You need the Iterator/Aggregator pattern for batch processing

### When to Choose Zapier
- Non-technical client wants to manage their own automations
- You need one of Zapier's 6,000+ app integrations
- Speed of setup is the priority
- Client is already paying for Zapier

---

## Implementation Files

- **n8n:** [n8n/appointment-reminder.json](./n8n/appointment-reminder.json)
- **Make:** [make/appointment-reminder.json](./make/appointment-reminder.json)
- **Zapier:** [zapier/appointment-reminder-sop.md](./zapier/appointment-reminder-sop.md)

---

*Analysis by Russell Kaye M. Abregande — AI Automation Specialist*
*Contact: russabregande@gmail.com*

# Zapier Platform Notes

## Pricing (as of 2026)

| Tier | Price | Tasks/mo | Notes |
|------|-------|---------|-------|
| Free | $0 | 100 | Single-step Zaps only, 15-min polling |
| Starter | $19.99/mo | 750 | Multi-step, 15-min polling |
| Professional | $49/mo | 2,000 | Paths, custom logic, 2-min polling |
| Team | $69/mo | 2,000 | Shared workspace, unlimited users |
| Enterprise | Custom | Custom | SSO, audit logs, SLA |

**Task counting:** Each action step = 1 task. A 3-action Zap running 100 times = 300 tasks.

## Zapier-Unique Features

- **Paths** — conditional branching (Professional plan+)
- **Formatter by Zapier** — text/number/date transformations (built-in, free)
- **Delay by Zapier** — wait hours/days before next action (Starter+)
- **Filter by Zapier** — stop Zap if conditions aren't met (built-in)
- **Webhooks by Zapier** — send/receive raw HTTP requests
- **Code by Zapier** — run Python or JavaScript inline

## Zapier vs n8n vs Make: Key Differences

| Feature | Zapier | Make | n8n |
|---------|--------|------|-----|
| App integrations | 6,000+ | 1,500+ | 400+ |
| AI capabilities | Basic | Basic | Advanced (LangChain) |
| Custom code | Limited | Limited | Full JS + Python |
| Self-hosting | No | No | Yes |
| Pricing model | Per task | Per operation | Per execution (cloud) / Free (self-host) |
| Best for | Non-technical, quick deploys | Visual builders, batch processing | Developers, AI workflows |

## Common Zapier Gotchas

- **Task = action step**, not trigger. Triggers are always free.
- **Paths** requires Professional plan — use filters as a workaround on Starter
- **Polling delays**: Free = 15 min, Starter = 15 min, Professional = 2 min, Team = 1 min
- **Webhooks by Zapier** requires Starter plan for outbound (sending) webhooks
- Zaps **turn off automatically** after repeated errors — set up Zapier error alerts
- Test your Zap trigger **before** building actions (saves debugging time)

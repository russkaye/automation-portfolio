# n8n Platform Notes

## Pricing (as of 2026)

| Tier | Price | Executions | Notes |
|------|-------|-----------|-------|
| Community (self-host) | Free | Unlimited | Requires server, Docker setup |
| Starter (cloud) | $20/mo | 2,500/mo | Best for freelancers |
| Pro (cloud) | $50/mo | 10,000/mo | Small teams |
| Enterprise | Custom | Unlimited | SSO, audit logs |

**Self-hosting cost:** A $5/mo DigitalOcean Droplet (1 CPU, 1GB RAM) runs n8n fine for low-volume workflows.

## AI Capabilities

n8n has the strongest AI/LLM capabilities of the three platforms:
- **AI Agent node** — autonomous agents with tools and memory
- **LangChain integration** — chains, vector stores, retrievers
- **OpenAI node** — chat, embeddings, function calling
- **Claude node** — Anthropic Claude via API
- **Code node** — run any LLM via Python or JS directly

## Self-Hosting Setup (Quick Reference)

```bash
# Docker (recommended)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Access at: `http://localhost:5678`

## Expression Syntax Reference

```javascript
{{ $json.fieldName }}              // Current node input
{{ $json.body.email }}             // Webhook body field
{{ $('NodeName').item.json.id }}   // Specific node output
{{ $now.toISO() }}                 // Current timestamp
{{ $today.format('yyyy-MM-dd') }}  // Today's date
{{ $json.status === 'active' ? 'yes' : 'no' }} // Conditional
```

## Common Gotchas

- Expressions inside Code nodes DON'T work — use `$input.item.json.field` instead
- Webhook data is at `$json.body`, not `$json` directly
- Always set `"executionOrder": "v1"` in workflow settings
- Credentials are NOT stored in exported JSON — users must add their own

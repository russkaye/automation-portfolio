# Cross-Platform Bridge Workflows

These workflows connect n8n, Zapier, and Make together in a single pipeline. Each platform handles the tasks it does best.

## Why Bridge Platforms Instead of Using One?

Many businesses already have Zapier or Make for simple automations. Rather than replacing their entire stack, bridging adds AI capabilities (n8n) and advanced BI reporting (Make) without disrupting existing workflows.

**The real-world scenarios where bridging makes sense:**

1. **Client has existing Zapier Zaps** — they've already connected Facebook Lead Ads, Shopify, and HubSpot in Zapier. Migrating 50+ Zaps is risky and costly. Instead, add n8n for the AI processing layer without touching what already works.

2. **Platform-specific strengths** — Zapier has 6,000+ app integrations. n8n has the best AI nodes. Make has the best visual scenario builder and cheapest operation pricing for high-volume batch jobs.

3. **Cost optimization** — Zapier's AI features cost per task. n8n's AI is free once self-hosted. Using n8n for the AI-heavy segment of a pipeline saves $50-500/month for AI-intensive workflows.

4. **Team skill diversity** — Marketing teams comfortable with Zapier handle the trigger segment. The developer handles the n8n AI segment. Operations handles the Make reporting segment.

## Bridge Workflows

| # | Name | Platforms | Industry |
|---|------|-----------|----------|
| [01](./01-full-funnel-lead-management/) | Full Funnel Lead Management | Zapier → n8n → Make | Real Estate |
| [02](./02-ecommerce-intelligence/) | E-commerce Intelligence | Zapier → n8n → Make | E-commerce |

## How It Works (Technical)

Platforms communicate via **HTTP webhooks**:
- Zapier → n8n: Zapier's "Webhooks by Zapier" action POSTs to n8n's webhook URL
- n8n → Make: n8n's HTTP Request node POSTs to Make's custom webhook URL
- Each segment is independently deployable — if n8n goes down, Zapier still captures data

## Setup Order (Always Follow This)

1. **Make first** — Create the Make webhook module, copy the URL
2. **n8n second** — Set the Make webhook URL in n8n's HTTP Request node, then copy n8n's webhook URL
3. **Zapier last** — Set n8n's webhook URL in Zapier's "Webhooks by Zapier" action

This order ensures each platform's webhook URL is ready before the upstream platform needs it.

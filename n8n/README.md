# n8n Workflows

5 production-ready n8n workflows covering AI automation, business operations, and multi-step integrations.

## Why n8n?

n8n is the best platform for:
- **AI/LLM workflows** — native LangChain nodes, OpenAI, Claude integrations
- **Custom code** — JavaScript and Python Code nodes for complex logic
- **Self-hosting** — run on your own server for data privacy compliance
- **Complex branching** — IF nodes, Switch nodes, Merge nodes for multi-path logic
- **Developer-friendly** — expressions, HTTP Request node, webhook support

## Workflows

| # | Workflow | Industry | Complexity | Key Nodes |
|---|----------|----------|-----------|-----------|
| [01](./workflows/01-ai-lead-scoring/) | AI Lead Scoring | Real Estate | ⚡⚡⚡ | Webhook, OpenAI, HubSpot, Slack |
| [02](./workflows/02-smart-customer-support/) | Smart Customer Support | E-commerce | ⚡⚡⚡ | Email Trigger, AI Agent, Gmail, Notion |
| [03](./workflows/03-client-onboarding/) | Client Onboarding | Agency | ⚡⚡ | Webhook, Notion, Slack, Gmail, Asana |
| [04](./workflows/04-appointment-management/) | Appointment Management | Healthcare | ⚡⚡ | Typeform, Google Calendar, Gmail, Twilio |
| [05](./workflows/05-ai-content-pipeline/) | AI Content Pipeline | Agency | ⚡⚡⚡ | Webhook, OpenAI, Buffer, Google Sheets |

## How to Import

1. Download `workflow.json` from any workflow folder
2. In your n8n instance: **Settings → Import Workflow**
3. Select the JSON file and click Import
4. Add credentials (nodes with yellow badges need auth)
5. Update any hardcoded values (channel IDs, email addresses)
6. Test with manual trigger → then Activate

## n8n Version

These workflows use n8n format v1 (compatible with n8n 1.0+). `executionOrder: "v1"` is set in all workflows.

## Credentials Needed

Most workflows use some combination of:
- OpenAI API key
- HubSpot API key or OAuth
- Slack OAuth app
- Gmail OAuth
- Twilio Account SID + Auth Token
- Notion Integration Token
- Asana Personal Access Token

# Make Blueprints

5 production-ready Make (formerly Integromat) scenario blueprints covering e-commerce, marketing, real estate, and healthcare automation.

## Why Make?

Make is the best platform for:
- **Visual scenario building** — drag-and-drop flow builder, easiest to learn
- **High-volume batch processing** — process thousands of items cheaply with iterators
- **Data transformation** — built-in formatters, aggregators, and parsers
- **Cost efficiency** — cheapest per-operation pricing of the three platforms
- **Router module** — parallel branch execution without additional cost

## Blueprints

| # | Blueprint | Industry | Complexity | Key Modules |
|---|-----------|----------|-----------|-------------|
| [01](./blueprints/01-ecommerce-order-fulfillment/) | E-commerce Order Fulfillment | E-commerce | ⚡⚡ | Shopify, Google Sheets, Gmail, Slack |
| [02](./blueprints/02-lead-distribution/) | Lead Distribution | Real Estate | ⚡⚡ | Typeform, HubSpot, Google Calendar, Mailchimp |
| [03](./blueprints/03-multichannel-marketing/) | Multi-channel Marketing | Agency | ⚡⚡ | Google Sheets, Instagram, Facebook, LinkedIn |
| [04](./blueprints/04-insurance-verification/) | Insurance Verification | Healthcare | ⚡⚡ | Webhook, HTTP, Google Sheets, Gmail, Slack |
| [05](./blueprints/05-inventory-replenishment/) | Inventory Replenishment | E-commerce | ⚡⚡ | Shopify, Iterator, Google Sheets, Gmail, Slack |

## How to Import

1. Download `blueprint.json` from any blueprint folder
2. In Make: **Scenarios → Create a new scenario**
3. Click the **three-dot menu (⋮)** → **Import Blueprint**
4. Select the JSON file → click Save
5. Reconnect each app module with your credentials (click each module)
6. Update configuration values (webhooks, spreadsheet IDs, channel names)
7. Run once manually → then turn on the scenario

## Make Version

Blueprints are exported in Make schema format v1. Compatible with all Make plans (Free, Core, Pro, Teams, Enterprise).

## Credentials Needed

Most blueprints use some combination of:
- Shopify store credentials
- Google Sheets OAuth
- Gmail OAuth
- Slack OAuth app
- HubSpot API key
- Mailchimp API key
- Typeform API key

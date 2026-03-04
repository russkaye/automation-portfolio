# Russell Abregande — Automation Portfolio

AI Automation Specialist portfolio showcasing production-ready workflows for n8n, Make, and Zapier.

**15+ workflows | 4 industries | 3 platforms | 2 cross-platform bridge architectures**

📌 **Portfolio Website:** https://russkaye.github.io/automation-portfolio/
📄 **CV:** https://russkaye.github.io/russell-abregande-cv/

---

## What's Inside

| Platform | Workflows | Format | Import Method |
|----------|-----------|--------|--------------|
| [n8n](./n8n/) | 5 workflows | JSON | n8n → Settings → Import |
| [Make](./make/) | 5 blueprints | JSON | Make → Scenarios → Import Blueprint |
| [Zapier](./zapier/) | 5 SOPs | Markdown | Step-by-step guide |
| [Cross-Platform](./cross-platform/) | 2 bridge workflows | JSON + SOP | See each segment |

## Industries Covered

- 🏠 **Real Estate** — Lead scoring, property listing distribution
- 🛒 **E-commerce** — Order fulfillment, abandoned cart recovery, inventory management
- 📣 **Agency/Marketing** — Client onboarding, multi-channel publishing, reporting
- 🏥 **Healthcare** — Appointment management, insurance verification

## Quick Start

### Import an n8n Workflow
1. Download `workflow.json` from any `n8n/workflows/` folder
2. Open your n8n instance → Settings → Import Workflow
3. Select the JSON file → click Import
4. Add your credentials in each node (yellow warning badges)
5. Click Activate

### Import a Make Blueprint
1. Download `blueprint.json` from any `make/blueprints/` folder
2. Open Make → Scenarios → Create a new scenario
3. Click the three-dot menu → Import Blueprint
4. Select the JSON file
5. Reconnect each app module with your credentials
6. Turn on the scenario

### Follow a Zapier SOP
1. Open the `sop.md` file in any `zapier/sops/` folder
2. Follow the step-by-step guide to build the Zap from scratch
3. Each step matches exactly what you see in the Zapier UI

---

## Cross-Platform Bridge Workflows

These workflows connect n8n + Zapier + Make together in a single pipeline. See [`cross-platform/README.md`](./cross-platform/README.md) for why this architecture makes sense.

| Bridge | Description |
|--------|-------------|
| [Full Funnel Lead Management](./cross-platform/01-full-funnel-lead-management/) | Zapier captures leads → n8n AI-qualifies → Make reports |
| [E-commerce Intelligence](./cross-platform/02-ecommerce-intelligence/) | Zapier routes orders → n8n fraud detection → Make weekly BI |

## Platform Comparison

The [Appointment Reminder workflow](./platform-comparison/) is built on all 3 platforms so you can compare approach, complexity, cost, and capabilities side-by-side.

---

## About

**Russell Kaye M. Abregande**
AI Automation & Systems Specialist | Manila, Philippines

- 📧 russabregande@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/russabregande)
- 🌐 [Portfolio](https://russkaye.github.io/automation-portfolio/)

*Built with n8n, Make, Zapier, Python, JavaScript, and a passion for eliminating manual work.*

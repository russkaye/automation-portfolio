# Client Onboarding — Agency

**Platform:** n8n
**Industry:** Agency/Marketing
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Automates the entire client onboarding sequence triggered by a signed contract. Creates a Notion workspace, a private Slack channel, sends a welcome email, and sets up an Asana project — all within seconds of receiving the onboarding webhook.

## Business Use Case

**Problem:** Account managers manually set up 6–8 systems for every new client, taking 45–90 minutes per onboarding. Steps are often forgotten, leading to inconsistent client experiences.
**Solution:** One webhook call triggered by contract signing sets up every system automatically.
**Impact:** Onboarding time reduced from 90 minutes to under 30 seconds; 100% consistent setup every time; client receives welcome email immediately after signing.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Webhook (POST) |
| Trigger App | DocuSign, PandaDoc, or any CRM on contract sign |
| Webhook Path | `/webhook/client-onboarding` |
| Expected Payload | `{ client_name, client_email, package, start_date }` |

---

## Workflow Steps

### Step 1: Webhook — Contract Signed
Receives POST with client details from your contract platform.

### Step 2: Notion — Create Client Workspace
Creates a new page in your Clients database with all client details and "Onboarding" status.

### Step 3: Slack — Create Client Channel
Creates a private channel named `client-[client-name]` for ongoing communication.

### Step 4: Slack — Post Welcome Message
Posts a formatted welcome message in the new channel with next steps.

### Step 5a: Gmail — Send Welcome Email
Sends a personalized welcome email to the client with what's been set up.

### Step 5b: Asana — Create Project
Creates a new project in Asana named `[Client] — [Package]` with all client details in the notes.

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Notion API | Database: Insert | Create integration, share Clients database |
| Slack | channels:write, chat:write | Bot token with channel creation permission |
| Gmail OAuth | gmail.send | Agency email account |
| Asana API | Projects: Write | Personal access token |

---

## Setup Instructions

1. Import `workflow.json` into n8n
2. Add all 4 credentials
3. Replace `YOUR_CLIENTS_DATABASE_ID` with your actual Notion database ID
4. Test POST to webhook with: `{"client_name":"Test Client","client_email":"test@example.com","package":"Social Media Pro","start_date":"2026-03-15"}`
5. Verify all 4 systems populated correctly
6. Connect your contract platform to send POST on signing
7. Activate

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

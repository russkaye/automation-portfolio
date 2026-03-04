# Smart Customer Support — E-commerce

**Platform:** n8n
**Industry:** E-commerce
**Complexity:** Complex ⚡⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

An AI-powered email triage system that reads incoming support emails, categorizes them, drafts personalized replies, and either auto-sends the reply (for high-confidence cases) or creates a Notion ticket for human review.

## Business Use Case

**Problem:** E-commerce support teams spend 3–5 hours/day on repetitive emails: order status, refund requests, product questions. Response times average 4–8 hours.
**Solution:** AI handles routine inquiries automatically. Only complex cases reach human agents.
**Impact:** 60–70% of support emails auto-resolved; average response time drops from hours to seconds; support team focuses on complex cases only.

---

## Trigger

| Field | Value |
|-------|-------|
| Trigger Type | Email IMAP polling |
| Trigger App | Any IMAP-compatible email (Gmail, Outlook, etc.) |
| Polling Interval | Every 5 minutes (n8n cloud) |
| Mailbox | INBOX |

---

## Workflow Steps

### Step 1: Email Trigger (IMAP)
- **Node:** Email Read IMAP
- **Purpose:** Polls support inbox for new emails every 5 minutes
- **Output:** Email subject, from, body text

### Step 2: AI Agent — Categorize and Draft
- **Node:** AI Agent (LangChain)
- **Purpose:** Categorizes email + drafts reply if auto-resolvable
- **Categories:** ORDER_STATUS, REFUND_REQUEST, PRODUCT_QUESTION, COMPLAINT, OTHER
- **Output:** JSON with category, auto_resolve flag, confidence score, draft_reply

### Step 3: Code — Parse AI Response
- **Node:** Code (JavaScript)
- **Purpose:** Safely parses AI JSON, handles edge cases
- **Output:** Structured ticket data

### Step 4: IF — Auto-Resolve?
- **Node:** IF
- **Condition:** auto_resolve = true AND confidence >= 0.80
- **True branch:** Send auto-reply
- **False branch:** Create human review ticket

### Step 5a: Gmail — Send Auto Reply
- **Node:** Gmail
- **Purpose:** Sends the AI-drafted reply to the customer
- **Note:** Appends a footer explaining it's automated

### Step 5b: Notion — Create Review Ticket
- **Node:** Notion
- **Purpose:** Creates a database page with email content for human agents
- **Properties:** Category, From, Status (Needs Review), AI Confidence

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| IMAP Email | Read | Gmail/Outlook IMAP access |
| Gmail OAuth | Send emails | Support email account |
| OpenAI (via AI Agent) | API key | gpt-4o or gpt-4o-mini |
| Notion API | Database: Insert | Create integration in Notion settings |

---

## Configuration Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| IMAP mailbox | Folder to monitor | `INBOX` |
| Confidence threshold | Min confidence for auto-reply | `0.80` |
| Notion database ID | Target database for tickets | `your-database-id` |

---

## Setup Instructions

1. Import `workflow.json` into n8n
2. Configure IMAP credential (your support email)
3. Configure Gmail OAuth (for sending replies)
4. Configure OpenAI API key
5. Create a Notion database with fields: Category (text), From (text), Status (select), AI Confidence (number)
6. Copy the Notion database ID and paste it into the Notion node
7. Test with a real support email in your inbox
8. Activate

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

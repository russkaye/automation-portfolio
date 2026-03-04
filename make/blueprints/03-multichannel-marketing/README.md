# Multi-channel Marketing Publisher

**Platform:** Make
**Industry:** Agency/Marketing
**Complexity:** Medium ⚡⚡
**Version:** 1.0
**Last Updated:** 2026-03-04
**Author:** Russell Kaye M. Abregande

---

## Overview

Monitors a Google Sheets content calendar and automatically publishes new content rows to Instagram, Facebook, and LinkedIn simultaneously — with per-platform toggles controlled directly from the spreadsheet.

## Business Use Case

**Problem:** Social media managers manually copy-paste content to 3–4 platforms per post, wasting 30–60 minutes per content batch. Coordinating publishing times across platforms is error-prone.
**Solution:** Content team adds posts to a Google Sheet → Make publishes to all enabled platforms automatically.
**Impact:** Publishing time cut from 60 minutes to 5 minutes (adding to sheet); consistent publishing across all platforms; no missed channels.

---

## Google Sheets Content Calendar Format

Your spreadsheet needs these columns:
| Column | Description | Values |
|--------|-------------|--------|
| Caption | Post text | Any text |
| Hashtags | Hashtag string | `#tag1 #tag2` |
| Image_URL | Public image URL | `https://...` |
| Link_URL | Link to share | `https://...` |
| Post_Instagram | Enable Instagram | `Yes` or `No` |
| Post_Facebook | Enable Facebook | `Yes` or `No` |
| Post_LinkedIn | Enable LinkedIn | `Yes` or `No` |
| Status | Tracks publish state | `Draft` → `Published` |
| Published_At | Auto-filled | Auto-set by Make |

---

## Workflow Steps

### Module 1: Google Sheets — Watch New Rows
Checks for new rows in the "Content Calendar" sheet every 15 minutes (or on your schedule).

### Module 2: Router (4 parallel routes)
- **Route A:** Instagram — posts if `Post_Instagram = Yes`
- **Route B:** Facebook — posts if `Post_Facebook = Yes`
- **Route C:** LinkedIn — posts if `Post_LinkedIn = Yes`
- **Route D:** Google Sheets — updates Status to "Published" always

---

## Required Credentials

| Service | Permission Level | Notes |
|---------|-----------------|-------|
| Google Sheets | Read + Write | Content calendar spreadsheet |
| Instagram | publish_content | Business account required |
| Facebook Pages | pages_manage_posts | Page admin access |
| LinkedIn | Share: Write | Company page or personal |

---

*Built by [Russell Kaye M. Abregande](mailto:russabregande@gmail.com) — AI Automation Specialist*

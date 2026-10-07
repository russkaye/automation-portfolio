# Portfolio Rebrand — Design Document

**Date:** 2026-04-18
**Author:** Russell Abregande
**Status:** Approved — ready for implementation planning

---

## 1. Goal

Rebrand the automation portfolio at `russkaye.github.io/automation-portfolio/` from a dark, video-heavy layout into a light, minimalist, Apple + Linear.app inspired single-page site that converts first-time visitors via two CTAs: a discovery call (primary) and an audit-request form (secondary), supported by an interactive ROI calculator as the hook.

## 2. Audience (priority order)

1. **SMB owners** — solopreneurs, founders, ops leads. Buy on ROI and time saved.
2. **Marketing/agency teams** — scale client delivery. Buy on capability proof.
3. **Recruiters / hiring managers** — doubles as job-hunt asset.
4. **Technical decision-makers** — lowest priority but design still respects them.

## 3. Conversion model

- **Primary CTA:** Book a 15-min discovery call via Calendly.
- **Secondary CTA:** Submit an audit request (email + 1-liner describing a bottleneck).
- **Engagement hook:** Interactive ROI calculator that computes annual cost of manual work; email capture returns a PDF report (or Calendly link pre-filled).
- **Friction ladder:** ROI calc (lowest) → audit form (medium) → book call (highest).

## 4. Research-backed design principles

Applied across every section:

| Principle | Application |
|---|---|
| 50ms trust verdict | Clean layout, massive whitespace, premium type |
| 5-second clarity test | Hero H1 states the problem and solution in one line |
| Single dominant CTA | Primary (solid button) visually louder than secondary (text link) |
| Friction ladder | ROI calc before audit form before book-call |
| Loss framing | "Stop paying people to copy-paste" / "You're losing $X/year" |
| Concrete numbers | "15 workflows · 4 industries · 3 platforms" in proof bar |
| Early social proof | Proof bar above scroll 1 |
| Human element | Your photo + short bio in About |
| Sub-2s load | No videos, compiled Tailwind, self-hosted fonts |
| Thumb-zone mobile | Primary CTA positioned for thumb reach |

## 5. Visual system

### Palette (light theme)

```
--bg:         #FAFAF9   /* warm off-white */
--bg-alt:     #F4F4F3   /* tinted sections */
--ink:        #0A0A0A   /* near-black */
--ink-muted:  #52525B
--accent:     #0066FF   /* electric blue — sparingly */
--accent-soft:#E6F0FF
```

Gradient mesh: `#C7D2FE → #FDE68A → #FCA5A5` at 8% opacity, 120px blur.

### Typography

- Display: **Inter Display** or **Geist** — 600/700, letter-spacing `-0.03em`, line-height `0.95`
- Body: **Inter** — 16px base, 1.6 line-height
- Mono: **JetBrains Mono** — for code/JSON snippets
- Hero headline: `clamp(48px, 8vw, 128px)`

### Spacing

- 8px base grid
- Section padding: 120px desktop / 80px mobile
- Content max: 1200px | text max: 720px

### Motion

- Eases: `cubic-bezier(0.16, 1, 0.3, 1)` entries, `cubic-bezier(0.7, 0, 0.84, 0)` exits
- Durations: 200ms micro / 600ms section reveals / 1200ms hero
- Scroll-triggered fade-up (20px offset, 80ms stagger)
- `prefers-reduced-motion` fallback: instant opacity, no movement

### Signature accents

- Drifting gradient mesh (60s loop, subliminal)
- SVG workflow diagram with drawing/pulsing animation
- Magnetic CTA button (4px cursor follow)
- Cursor parallax on hero (max 3px)

## 6. Page structure (single long page)

```
NAV (sticky, glass, 64px)
  └─ wordmark · Work · Process · About · [Book call]

HERO (100vh)
  ├─ eyebrow: AI AUTOMATION SPECIALIST
  ├─ H1: "Stop paying people to copy-paste."
  ├─ sub: "I build automation systems that run your ops while you sleep…"
  ├─ primary CTA: Book a 15-min call →
  └─ secondary CTA: Calculate my ROI

PROOF BAR (80px)
  15 workflows · 4 industries · n8n · Make · Zapier · Google IT · Lean Six Sigma

ROI CALCULATOR
  ├─ 3 inputs (team size, hrs/week, $/hr)
  ├─ live animated result ("You're losing $X/year")
  └─ email capture → PDF report

HOW IT WORKS
  ├─ animated SVG diagram: Trigger → AI → Action → Report
  └─ 3 short step descriptions

WORK / CASE STUDIES
  ├─ 3 cards: real estate · e-commerce · agency
  └─ link to /workflows.html for full list

AUDIT FORM
  ├─ H2: "Got a bottleneck? I'll tear it apart, free."
  ├─ 2 fields (email + textarea)
  └─ CTA: Send my audit →

ABOUT
  ├─ photo + ~80 word bio
  └─ LinkedIn + GitHub links

FINAL CTA (80vh, full-bleed gradient mesh)
  └─ "Ready to stop copy-pasting?" + Book the call →

FOOTER (120px, minimal)
```

## 7. Hero detail

### Copy

- **Eyebrow:** `AI AUTOMATION SPECIALIST`
- **H1:** `Stop paying people to copy-paste.`
- **Sub:** `I build automation systems that run your ops while you sleep. 15 workflows live across 4 industries — real estate, e-commerce, agencies, healthcare.`
- **Primary CTA:** `Book a 15-min call →`
- **Secondary CTA:** `Calculate my ROI`

### Entry animation (1200ms total)

1. 0ms — Gradient mesh fades in (600ms)
2. 200ms — Eyebrow fades up (400ms)
3. 400ms — H1 word-by-word stagger (20ms/word)
4. 900ms — Sub fades up (500ms)
5. 1100ms — CTAs fade up together (400ms)
6. 1400ms — Scroll hint pulse loop

### Hover states

- Primary CTA: bg darken 5%, magnetic 4px follow, shadow grows `0 8px 24px rgba(0,102,255,0.15)`
- Secondary: underline draws L→R (200ms)

## 8. ROI calculator

- Layout: two-column desktop (inputs | result), stacks mobile
- Defaults: 5 people / 12 hrs / $30 → shows compelling baseline number ($18,720/yr)
- Live animation: result number rolls on input change (~400ms settle, `requestAnimationFrame`)
- Formula: `team × hours × rate × 52`, shown on hover of result
- Email capture appears below after first interaction
- On submit: opens Calendly with email prefilled + fires Formspree/Netlify Forms notification

## 9. How It Works animation

- Inline SVG with 4 nodes (Trigger · AI Agent · Action · Report)
- Scroll-triggered play once:
  - Each node fills + icon draws (stroke-dashoffset) sequentially
  - Connectors draw L→R between nodes
  - Total duration ~3s
  - After play: connectors get a 0.3-opacity pulse traveling L→R every 4s
- Hover node → scale 1.05, caption fades in below
- Reduced-motion: fully drawn instantly, no pulse

## 10. Copy direction (all sections)

See Section 6 of brainstorming transcript. Tone: short sentences, period-heavy, zero adjectives, no SEO-speak ("leverage," "seamless," "cutting-edge"). Linear-style confidence.

## 11. Tech stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Plain HTML/CSS/JS | Zero build; GH Pages native |
| Tailwind | **Compiled locally** (not CDN) | ~15KB vs 250KB |
| Fonts | Self-hosted Inter + JetBrains Mono | No Google preconnect, GDPR-clean |
| Form backend | Formspree or Netlify Forms | No server |
| Analytics | Plausible (optional) | Privacy-first, no cookie banner |
| Calendar | Calendly embed | Existing |
| Animations | CSS + vanilla JS (IntersectionObserver) | No GSAP |
| Icons | Lucide SVG inlined | Consistent, free |
| Deploy | GitHub Pages from `/docs` | Unchanged |

## 12. File structure (target)

```
/src
  index.html
  /css
    main.css           ← Tailwind source + custom
  /js
    main.js            ← nav, reveals, magnetic button
    roi-calc.js
    workflow-anim.js
  /assets
    fonts/
    img/               ← photo, certs
/docs                  ← build output (GH Pages)
/n8n, /make, /zapier   ← UNCHANGED
tailwind.config.js
package.json
```

## 13. Performance budget

- Total page weight: **< 500KB** (from ~50MB)
- LCP: **< 1.5s** on 4G
- CLS: **< 0.05**
- JS: **< 30KB** gzipped

## 14. Accessibility

- WCAG 2.2 AA
- Semantic HTML, skip-link, focus-visible rings
- `prefers-reduced-motion` everywhere
- All text ≥ 4.5:1 contrast

## 15. SEO

- One H1, proper meta/OG/Twitter
- `sitemap.xml` + `robots.txt`
- JSON-LD: `Person` + `ProfessionalService`

## 16. What's explicitly out of scope (YAGNI)

- Testimonial carousel
- Blog section on landing
- Pricing page
- Live chat widget
- Video anywhere
- Dark mode (light-only this pass)

## 17. What's preserved as-is

- `/n8n`, `/make`, `/zapier`, `/cross-platform`, `/platform-comparison`, `/templates` folders (workflow content)
- `/docs/workflows.html` (full workflow browser — gets a styling pass to match new visual system but structure unchanged)
- `/docs/contact.html`, `/docs/blog/` (styling pass only)
- Repo, remote, deployment config

## 18. Success metrics

- Time-to-first-interaction on hero: < 2s
- % of sessions that interact with ROI calculator: > 40%
- % of sessions that submit audit form OR book call: > 8%
- Mobile Lighthouse performance: ≥ 95
- Mobile Lighthouse accessibility: 100

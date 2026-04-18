# Portfolio Rebrand Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebrand `russkaye.github.io/automation-portfolio/` from dark video-heavy layout to a light, minimalist, Apple + Linear.app inspired single-page funnel with dual CTAs (book call + audit form) and an ROI calculator as the engagement hook.

**Architecture:** Plain HTML/CSS/JS static site. Local Tailwind compile (no CDN) + custom CSS layer. Three small vanilla JS modules (main, ROI calc, workflow animation). Self-hosted fonts. Formspree for form backends. GitHub Pages deploys from `/docs`. Existing workflow JSON content (`/n8n`, `/make`, `/zapier`) stays untouched.

**Tech Stack:** HTML5, Tailwind CSS 3, vanilla JavaScript (ES modules), Inter + JetBrains Mono, Formspree, Calendly, Lucide icons (inlined SVG). Node.js + npm for build only (no runtime dependency).

**Design reference:** `docs/plans/2026-04-18-rebrand-design.md`

---

## Testing philosophy

Static site — no server logic. Three kinds of verification:

1. **Unit tests** (Node's built-in `node:test`) for pure JS logic — ROI calc formula, number-roll animation math. Fast, real.
2. **Manual browser verification** for layout, hover, reveal animations. Checklist-driven in each task.
3. **Lighthouse audit** as the final acceptance gate — performance ≥95, a11y = 100.

Commit after each task. Use conventional commits (`feat:`, `chore:`, `style:`, `fix:`).

---

## Phase 0 — Project setup

### Task 0.1: Initialize npm project

**Files:**
- Create: `package.json`
- Create: `.nvmrc`
- Create: `.gitignore` (update)

**Step 1:** Check existing files.
```bash
ls package.json package-lock.json 2>/dev/null
cat .gitignore 2>/dev/null
```

**Step 2:** Delete root `package.json` and `package-lock.json` if present (they're from earlier node_modules, start fresh).
```bash
rm -f package.json package-lock.json
rm -rf node_modules
```

**Step 3:** Initialize fresh.
```bash
npm init -y
```

**Step 4:** Write `.nvmrc`:
```
20
```

**Step 5:** Append to `.gitignore`:
```
node_modules/
/src/css/compiled.css
*.log
.DS_Store
```

**Step 6:** Commit.
```bash
git add package.json .nvmrc .gitignore
git commit -m "chore: reset npm project for rebrand build"
```

### Task 0.2: Install build dependencies

**Step 1:** Install Tailwind and minifiers.
```bash
npm install -D tailwindcss@3 autoprefixer@10 postcss@8 postcss-cli@11 html-minifier-terser@7 terser@5 cpx2@7 rimraf@5
```

**Step 2:** Verify.
```bash
npx tailwindcss --help | head -3
```
Expected: prints Tailwind help.

**Step 3:** Commit.
```bash
git add package.json package-lock.json
git commit -m "chore: install Tailwind, postcss, and minifier deps"
```

### Task 0.3: Configure Tailwind

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`

**Step 1:** Write `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Display"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: { DEFAULT: '#FAFAF9', alt: '#F4F4F3' },
        ink: { DEFAULT: '#0A0A0A', muted: '#52525B' },
        accent: { DEFAULT: '#0066FF', soft: '#E6F0FF' },
      },
      letterSpacing: { tightest: '-0.03em' },
      lineHeight: { tightest: '0.95' },
      maxWidth: { prose: '720px', content: '1200px' },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
  },
  plugins: [],
}
```

**Step 2:** Write `postcss.config.js`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Step 3:** Set `"type": "module"` in `package.json`.
```bash
npm pkg set type=module
```

**Step 4:** Commit.
```bash
git add tailwind.config.js postcss.config.js package.json
git commit -m "chore: configure Tailwind with custom tokens and ESM"
```

### Task 0.4: Create source directory scaffolding

**Files:**
- Create: `src/index.html` (empty placeholder)
- Create: `src/css/main.css`
- Create: `src/js/main.js`
- Create: `src/js/roi-calc.js`
- Create: `src/js/workflow-anim.js`
- Create: `src/assets/fonts/.gitkeep`
- Create: `src/assets/img/.gitkeep`

**Step 1:** Create directories and empty files.
```bash
mkdir -p src/css src/js src/assets/fonts src/assets/img
touch src/index.html src/css/main.css src/js/main.js src/js/roi-calc.js src/js/workflow-anim.js src/assets/fonts/.gitkeep src/assets/img/.gitkeep
```

**Step 2:** Write `src/css/main.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 3:** Commit.
```bash
git add src/
git commit -m "chore: scaffold /src directory"
```

### Task 0.5: Wire build scripts

**Step 1:** Update `package.json` scripts (use `npm pkg set`):
```bash
npm pkg set scripts.build:css="postcss src/css/main.css -o src/css/compiled.css"
npm pkg set scripts.build:html="html-minifier-terser --collapse-whitespace --remove-comments --minify-css true --minify-js true src/index.html -o docs/index.html"
npm pkg set scripts.build:js="terser src/js/main.js src/js/roi-calc.js src/js/workflow-anim.js --compress --mangle -o docs/assets/js/main.min.js"
npm pkg set scripts.build:copy="cpx \"src/assets/**/*\" docs/assets && cpx src/css/compiled.css docs/assets/css/main.css"
npm pkg set scripts.clean="rimraf docs/assets/css docs/assets/js docs/assets/fonts docs/assets/img docs/index.html"
npm pkg set scripts.build="npm run clean && npm run build:css && npm run build:copy && npm run build:js && npm run build:html"
npm pkg set scripts.dev="npx tailwindcss -i src/css/main.css -o src/css/compiled.css --watch"
npm pkg set scripts.test="node --test tests/"
```

**Step 2:** Verify scripts exist.
```bash
npm run 2>&1 | head -20
```
Expected: lists `build`, `build:css`, `build:html`, `build:js`, `clean`, `dev`, `test`.

**Step 3:** Commit.
```bash
git add package.json
git commit -m "chore: add build scripts (css/js/html minify, dev watch)"
```

---

## Phase 1 — Assets

### Task 1.1: Install Inter and JetBrains Mono fonts

**Files:**
- Create: `src/assets/fonts/Inter-Regular.woff2`
- Create: `src/assets/fonts/Inter-Medium.woff2`
- Create: `src/assets/fonts/Inter-SemiBold.woff2`
- Create: `src/assets/fonts/Inter-Bold.woff2`
- Create: `src/assets/fonts/JetBrainsMono-Regular.woff2`
- Create: `src/assets/fonts/LICENSE.txt`

**Step 1:** Download via curl.
```bash
cd src/assets/fonts
curl -Lo Inter-Regular.woff2 "https://rsms.me/inter/font-files/Inter-Regular.woff2?v=4.0"
curl -Lo Inter-Medium.woff2 "https://rsms.me/inter/font-files/Inter-Medium.woff2?v=4.0"
curl -Lo Inter-SemiBold.woff2 "https://rsms.me/inter/font-files/Inter-SemiBold.woff2?v=4.0"
curl -Lo Inter-Bold.woff2 "https://rsms.me/inter/font-files/Inter-Bold.woff2?v=4.0"
curl -Lo JetBrainsMono-Regular.woff2 "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Regular.woff2"
cd ../../..
```

**Step 2:** Verify all 5 files exist and are > 10KB.
```bash
ls -la src/assets/fonts/*.woff2
```

**Step 3:** Create `src/assets/fonts/LICENSE.txt` noting both are SIL Open Font License.

**Step 4:** Commit.
```bash
git add src/assets/fonts/
git commit -m "chore: add Inter and JetBrains Mono self-hosted fonts"
```

### Task 1.2: Add @font-face declarations

**Files:**
- Modify: `src/css/main.css`

**Step 1:** Prepend to `src/css/main.css` (before the `@tailwind` lines):
```css
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('../assets/fonts/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('../assets/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

**Step 2:** Commit.
```bash
git add src/css/main.css
git commit -m "feat: self-host Inter and JetBrains Mono fonts"
```

### Task 1.3: Copy Russell's photo and cert assets

**Files:**
- Copy: existing `docs/assets/images/*` → `src/assets/img/`
- Copy: existing `docs/assets/google-it-cert.*`, `docs/assets/lean-six-sigma-cert.*` → `src/assets/img/`

**Step 1:** Inspect existing assets.
```bash
ls docs/assets/images/ 2>/dev/null
ls docs/assets/*.png docs/assets/*.pdf 2>/dev/null
```

**Step 2:** Copy any photo/cert images into `src/assets/img/`. Specific files:
```bash
cp docs/assets/google-it-cert.png src/assets/img/ 2>/dev/null || true
cp docs/assets/lean-six-sigma-cert.pdf src/assets/img/ 2>/dev/null || true
if [ -d docs/assets/images ]; then cp -r docs/assets/images/* src/assets/img/; fi
```

**Step 3:** If no personal photo exists, create placeholder. Check `C:/Users/deuces/Downloads/Projects/Remote Work/` for `1X1.jpg` or `signature.jpg` and copy:
```bash
cp "../1X1.jpg" src/assets/img/russell-portrait.jpg 2>/dev/null || true
```

**Step 4:** Commit.
```bash
git add src/assets/img/
git commit -m "chore: migrate image assets to /src"
```

### Task 1.4: Create favicon

**Files:**
- Create: `src/assets/img/favicon.svg`

**Step 1:** Write minimal SVG favicon (a small geometric mark — circle with a stroke arc).
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#0A0A0A"/>
  <path d="M10 22 L10 10 L18 10 A4 4 0 0 1 18 18 L13 18 L22 22" stroke="#FAFAF9" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**Step 2:** Commit.
```bash
git add src/assets/img/favicon.svg
git commit -m "chore: add SVG favicon"
```

---

## Phase 2 — Base styles

### Task 2.1: Write CSS custom properties and base styles

**Files:**
- Modify: `src/css/main.css`

**Step 1:** Append to `src/css/main.css` after `@tailwind utilities;`:
```css
@layer base {
  :root {
    --bg: #FAFAF9;
    --bg-alt: #F4F4F3;
    --ink: #0A0A0A;
    --ink-muted: #52525B;
    --accent: #0066FF;
    --accent-soft: #E6F0FF;
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 24px;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', system-ui, sans-serif;
    font-feature-settings: 'cv11', 'ss01', 'ss03';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3 {
    letter-spacing: -0.03em;
    line-height: 0.95;
    text-wrap: balance;
  }
  p { line-height: 1.6; }
  ::selection { background: var(--accent); color: white; }
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 4px;
  }
}
```

**Step 2:** Commit.
```bash
git add src/css/main.css
git commit -m "feat: base CSS — custom properties, typography, focus states"
```

### Task 2.2: Write reusable component styles

**Files:**
- Modify: `src/css/main.css`

**Step 1:** Append to `src/css/main.css`:
```css
@layer components {
  .container-content { max-width: 1200px; margin-inline: auto; padding-inline: 24px; }
  @media (min-width: 768px) { .container-content { padding-inline: 48px; } }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: var(--ink);
    color: var(--bg);
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-size: 15px;
    transition: transform 200ms var(--ease-out), background 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
    will-change: transform;
  }
  .btn-primary:hover { background: #1a1a1a; box-shadow: 0 8px 24px rgba(10,10,10,0.12); }
  .btn-primary:active { transform: scale(0.98); }

  .btn-accent {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: var(--accent);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-size: 15px;
    transition: background 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
  }
  .btn-accent:hover { background: #0052cc; box-shadow: 0 8px 24px rgba(0,102,255,0.18); }

  .link-underline { position: relative; font-weight: 500; }
  .link-underline::after {
    content: ''; position: absolute; left: 0; bottom: -2px;
    height: 1px; width: 0; background: currentColor;
    transition: width 200ms var(--ease-out);
  }
  .link-underline:hover::after { width: 100%; }

  .mesh-bg {
    position: absolute; inset: 0; z-index: -1; overflow: hidden;
    pointer-events: none;
  }
  .mesh-bg::before, .mesh-bg::after {
    content: ''; position: absolute;
    width: 60vmax; height: 60vmax; border-radius: 50%;
    filter: blur(120px); opacity: 0.4;
    animation: meshDrift 60s linear infinite;
  }
  .mesh-bg::before {
    background: radial-gradient(circle, #C7D2FE 0%, transparent 60%);
    top: -20%; left: -10%;
  }
  .mesh-bg::after {
    background: radial-gradient(circle, #FDE68A 0%, transparent 60%);
    bottom: -20%; right: -10%;
    animation-direction: reverse;
  }
  @keyframes meshDrift {
    from { transform: translate(0, 0) rotate(0deg); }
    to { transform: translate(40px, -40px) rotate(360deg); }
  }

  .section { padding-block: 80px; position: relative; }
  @media (min-width: 768px) { .section { padding-block: 120px; } }

  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out); }
  .reveal.is-visible { opacity: 1; transform: translateY(0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0ms !important; transition-duration: 0ms !important; }
    .reveal { opacity: 1; transform: none; }
  }
}
```

**Step 2:** Commit.
```bash
git add src/css/main.css
git commit -m "feat: component styles — buttons, mesh bg, reveal, section"
```

---

## Phase 3 — HTML shell

### Task 3.1: Write HTML skeleton with meta tags

**Files:**
- Modify: `src/index.html`

**Step 1:** Write full HTML skeleton:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Russell Abregande — AI Automation Specialist</title>
  <meta name="description" content="I build automation systems that run your ops while you sleep. 15 workflows shipped across n8n, Make, and Zapier." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://russkaye.github.io/automation-portfolio/" />
  <meta property="og:title" content="Russell Abregande — AI Automation Specialist" />
  <meta property="og:description" content="I build automation systems that run your ops while you sleep." />
  <meta property="og:image" content="https://russkaye.github.io/automation-portfolio/assets/img/og-cover.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Russell Abregande — AI Automation Specialist" />
  <meta name="twitter:description" content="I build automation systems that run your ops while you sleep." />

  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg" />
  <link rel="canonical" href="https://russkaye.github.io/automation-portfolio/" />
  <link rel="preload" href="assets/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="assets/fonts/Inter-Bold.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="assets/css/main.css" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Russell Kaye M. Abregande",
    "url": "https://russkaye.github.io/automation-portfolio/",
    "jobTitle": "AI Automation Specialist",
    "email": "russabregande@gmail.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Manila", "addressCountry": "PH" },
    "sameAs": [
      "https://github.com/russkaye",
      "https://linkedin.com/in/russabregande"
    ]
  }
  </script>
</head>
<body>
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-ink focus:text-bg focus:px-4 focus:py-2 focus:rounded">Skip to content</a>

  <nav id="nav" class="fixed top-0 inset-x-0 z-50 h-16"></nav>

  <main id="main">
    <section id="hero" class="section"></section>
    <section id="proof" class="py-6 bg-bg-alt"></section>
    <section id="roi" class="section"></section>
    <section id="process" class="section bg-bg-alt"></section>
    <section id="work" class="section"></section>
    <section id="audit" class="section bg-bg-alt"></section>
    <section id="about" class="section"></section>
    <section id="final-cta" class="section"></section>
  </main>

  <footer id="footer" class="py-12 border-t border-black/5"></footer>

  <script type="module" src="assets/js/main.min.js"></script>
</body>
</html>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: HTML skeleton with meta, OG, JSON-LD, semantic sections"
```

### Task 3.2: Implement nav

**Files:**
- Modify: `src/index.html` (replace `<nav id="nav">` line)

**Step 1:** Replace the nav line with:
```html
<nav id="nav" class="fixed top-0 inset-x-0 z-50 h-16 backdrop-blur-md bg-bg/70 border-b border-transparent transition-colors duration-300">
  <div class="container-content h-full flex items-center justify-between">
    <a href="#" class="flex items-center gap-2 font-semibold text-[15px]">
      <span class="w-6 h-6 rounded-md bg-ink text-bg inline-flex items-center justify-center text-[13px] font-bold">R</span>
      Russell Abregande
    </a>
    <div class="hidden md:flex items-center gap-8 text-[14px] text-ink-muted">
      <a href="#work" class="link-underline hover:text-ink transition-colors">Work</a>
      <a href="#process" class="link-underline hover:text-ink transition-colors">Process</a>
      <a href="#about" class="link-underline hover:text-ink transition-colors">About</a>
    </div>
    <a href="https://calendly.com/russabregande" class="btn-primary text-[14px] py-2 px-4" target="_blank" rel="noopener">Book a call</a>
  </div>
</nav>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: nav — glass, sticky, responsive"
```

### Task 3.3: Implement footer

**Files:**
- Modify: `src/index.html` (replace `<footer id="footer">`)

**Step 1:** Replace footer with:
```html
<footer id="footer" class="py-12 border-t border-black/5">
  <div class="container-content flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[14px] text-ink-muted">
    <p>&copy; 2026 Russell Abregande · Manila, PH · <a href="mailto:russabregande@gmail.com" class="link-underline text-ink">russabregande@gmail.com</a></p>
    <div class="flex items-center gap-6">
      <a href="https://linkedin.com/in/russabregande" target="_blank" rel="noopener" class="link-underline hover:text-ink">LinkedIn</a>
      <a href="https://github.com/russkaye" target="_blank" rel="noopener" class="link-underline hover:text-ink">GitHub</a>
      <a href="https://calendly.com/russabregande" target="_blank" rel="noopener" class="link-underline hover:text-ink">Calendly</a>
    </div>
  </div>
</footer>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: footer — minimal, 3 social links"
```

---

## Phase 4 — Hero

### Task 4.1: Build hero HTML

**Files:**
- Modify: `src/index.html` (replace `<section id="hero">`)

**Step 1:** Replace hero section with:
```html
<section id="hero" class="section min-h-screen flex items-center relative overflow-hidden">
  <div class="mesh-bg" aria-hidden="true"></div>
  <div class="container-content w-full pt-24 md:pt-16">
    <p class="reveal text-[13px] tracking-[0.12em] text-ink-muted uppercase font-medium mb-8" data-reveal-delay="0">AI Automation Specialist</p>
    <h1 class="reveal font-display font-bold text-ink mb-8" style="font-size: clamp(48px, 8vw, 128px); letter-spacing: -0.03em; line-height: 0.95;" data-reveal-delay="200">
      Stop paying people<br />to copy-paste.
    </h1>
    <p class="reveal text-[22px] leading-relaxed text-ink-muted max-w-prose mb-12" data-reveal-delay="700">
      I build automation systems that run your ops while you sleep. 15 workflows live across 4 industries — real estate, e-commerce, agencies, healthcare.
    </p>
    <div class="reveal flex flex-wrap items-center gap-6" data-reveal-delay="900">
      <a href="https://calendly.com/russabregande" target="_blank" rel="noopener" class="btn-primary magnetic">
        Book a 15-min call
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
      <a href="#roi" class="link-underline text-ink-muted hover:text-ink">Calculate my ROI</a>
    </div>
  </div>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted" aria-hidden="true">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-bounce"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: hero section — headline, dual CTA, gradient mesh, scroll hint"
```

### Task 4.2: Implement reveal-on-scroll JS

**Files:**
- Modify: `src/js/main.js`

**Step 1:** Write `src/js/main.js`:
```js
// Scroll reveal via IntersectionObserver
const initReveal = () => {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.revealDelay || 0);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  items.forEach((el) => io.observe(el));
};

// Sticky nav: add border when scrolled
const initNavScroll = () => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('border-black/5');
    else nav.classList.remove('border-black/5');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

// Magnetic button — subtle cursor follow
const initMagnetic = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavScroll();
  initMagnetic();
});
```

**Step 2:** Commit.
```bash
git add src/js/main.js
git commit -m "feat: main.js — reveal, nav scroll, magnetic button"
```

---

## Phase 5 — Proof bar

### Task 5.1: Build proof bar

**Files:**
- Modify: `src/index.html` (replace `<section id="proof">`)

**Step 1:** Replace proof section:
```html
<section id="proof" class="py-8 bg-bg-alt border-y border-black/5">
  <div class="container-content">
    <div class="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-[14px] text-ink-muted font-medium">
      <span><strong class="text-ink">15</strong> workflows shipped</span>
      <span aria-hidden="true" class="opacity-40">·</span>
      <span><strong class="text-ink">4</strong> industries</span>
      <span aria-hidden="true" class="opacity-40">·</span>
      <span>n8n · Make · Zapier</span>
      <span aria-hidden="true" class="opacity-40">·</span>
      <span>Google IT Certified</span>
      <span aria-hidden="true" class="opacity-40">·</span>
      <span>Lean Six Sigma</span>
    </div>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: proof bar — stats + certs row"
```

---

## Phase 6 — ROI calculator

### Task 6.1: Write ROI formula unit tests

**Files:**
- Create: `tests/roi-calc.test.js`

**Step 1:** Write tests first:
```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeAnnualWaste, formatCurrency, formatHours } from '../src/js/roi-calc.js';

test('computeAnnualWaste: baseline case', () => {
  assert.equal(computeAnnualWaste({ team: 5, hours: 12, rate: 30 }), 93600);
});

test('computeAnnualWaste: zero team returns zero', () => {
  assert.equal(computeAnnualWaste({ team: 0, hours: 12, rate: 30 }), 0);
});

test('computeAnnualWaste: single person, 1hr/wk, $1/hr = 52', () => {
  assert.equal(computeAnnualWaste({ team: 1, hours: 1, rate: 1 }), 52);
});

test('computeAnnualWaste: clamps negative inputs to 0', () => {
  assert.equal(computeAnnualWaste({ team: -5, hours: 12, rate: 30 }), 0);
  assert.equal(computeAnnualWaste({ team: 5, hours: -12, rate: 30 }), 0);
});

test('formatCurrency: adds $ and commas', () => {
  assert.equal(formatCurrency(18720), '$18,720');
  assert.equal(formatCurrency(0), '$0');
  assert.equal(formatCurrency(1500000), '$1,500,000');
});

test('formatHours: computes annual hours and days', () => {
  const r = formatHours({ team: 5, hours: 12, rate: 30 });
  assert.equal(r.hours, 3120); // 5 × 12 × 52
  assert.equal(r.days, 390);   // 3120 / 8
});
```

**Step 2:** Run tests — expect failure.
```bash
npm test
```
Expected: FAIL — `computeAnnualWaste is not a function` or module-not-found.

**Step 3:** Commit test file.
```bash
git add tests/roi-calc.test.js
git commit -m "test: ROI calculator formula tests (failing)"
```

### Task 6.2: Implement ROI calc math

**Files:**
- Modify: `src/js/roi-calc.js`

**Step 1:** Write pure math functions:
```js
export const computeAnnualWaste = ({ team, hours, rate }) => {
  const t = Math.max(0, Number(team) || 0);
  const h = Math.max(0, Number(hours) || 0);
  const r = Math.max(0, Number(rate) || 0);
  return Math.round(t * h * r * 52);
};

export const formatCurrency = (n) => {
  return '$' + Math.round(n).toLocaleString('en-US');
};

export const formatHours = ({ team, hours }) => {
  const annualHours = Math.max(0, team) * Math.max(0, hours) * 52;
  return { hours: annualHours, days: Math.round(annualHours / 8) };
};
```

**Step 2:** Run tests — expect pass.
```bash
npm test
```
Expected: PASS — all 6 tests pass.

**Step 3:** Commit.
```bash
git add src/js/roi-calc.js
git commit -m "feat: ROI calc pure math (computeAnnualWaste, formatters)"
```

### Task 6.3: Build ROI calc HTML

**Files:**
- Modify: `src/index.html` (replace `<section id="roi">`)

**Step 1:** Replace:
```html
<section id="roi" class="section">
  <div class="container-content">
    <div class="reveal max-w-prose mb-16">
      <h2 class="font-display font-bold text-ink mb-4" style="font-size: clamp(32px, 5vw, 56px);">How much is manual work costing you?</h2>
      <p class="text-[18px] text-ink-muted">Three inputs. Instant answer.</p>
    </div>
    <div class="reveal grid md:grid-cols-2 gap-8 items-stretch">
      <div class="rounded-2xl bg-white border border-black/5 p-8 space-y-6" role="group" aria-label="ROI inputs">
        <label class="block">
          <span class="block text-[13px] font-medium text-ink-muted mb-2">Team size</span>
          <input id="roi-team" type="number" min="0" max="10000" value="5" class="w-full text-[32px] font-display font-semibold bg-transparent border-0 border-b border-black/10 focus:border-accent focus:outline-none pb-2" />
        </label>
        <label class="block">
          <span class="block text-[13px] font-medium text-ink-muted mb-2">Hours / week on manual work</span>
          <input id="roi-hours" type="number" min="0" max="168" value="12" class="w-full text-[32px] font-display font-semibold bg-transparent border-0 border-b border-black/10 focus:border-accent focus:outline-none pb-2" />
        </label>
        <label class="block">
          <span class="block text-[13px] font-medium text-ink-muted mb-2">Avg hourly rate (USD)</span>
          <input id="roi-rate" type="number" min="0" max="1000" value="30" class="w-full text-[32px] font-display font-semibold bg-transparent border-0 border-b border-black/10 focus:border-accent focus:outline-none pb-2" />
        </label>
      </div>

      <div class="rounded-2xl bg-accent-soft border border-accent/20 p-8 flex flex-col justify-between" aria-live="polite">
        <div>
          <p class="text-[14px] font-medium text-accent mb-2">You're losing</p>
          <p class="font-display font-bold text-ink leading-none mb-1" style="font-size: clamp(48px, 9vw, 96px);">
            <span id="roi-amount">$93,600</span>
          </p>
          <p class="text-[16px] text-ink-muted">/ year to manual work.</p>
          <div class="mt-6 pt-6 border-t border-accent/10 grid grid-cols-2 gap-4 text-[14px] text-ink-muted">
            <p><span id="roi-hours-out" class="text-ink font-semibold">3,120</span> hours</p>
            <p><span id="roi-days-out" class="text-ink font-semibold">390</span> workdays</p>
          </div>
        </div>
        <form id="roi-form" action="https://formspree.io/f/xpwaplkv" method="POST" class="mt-8 pt-6 border-t border-accent/10">
          <label for="roi-email" class="block text-[13px] font-medium text-ink-muted mb-2">Email me the full PDF report</label>
          <div class="flex gap-2">
            <input id="roi-email" name="email" type="email" required placeholder="your@email.com" class="flex-1 px-4 py-3 rounded-md bg-white border border-black/10 focus:border-accent focus:outline-none text-[15px]" />
            <input type="hidden" name="_subject" value="ROI Calculator request" />
            <input type="hidden" id="roi-context" name="context" value="" />
            <button type="submit" class="btn-accent whitespace-nowrap">Send report</button>
          </div>
          <p id="roi-status" class="mt-3 text-[13px] text-ink-muted" aria-live="polite"></p>
        </form>
      </div>
    </div>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: ROI calculator HTML — inputs, live result, email capture"
```

### Task 6.4: Wire ROI calc interactivity

**Files:**
- Modify: `src/js/roi-calc.js`

**Step 1:** Append to `src/js/roi-calc.js`:
```js
const animateNumber = (el, from, to, duration = 400) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = formatCurrency(to);
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = from + (to - from) * eased;
    el.textContent = formatCurrency(val);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

export const initRoiCalc = () => {
  const team = document.getElementById('roi-team');
  const hours = document.getElementById('roi-hours');
  const rate = document.getElementById('roi-rate');
  const amountEl = document.getElementById('roi-amount');
  const hoursOut = document.getElementById('roi-hours-out');
  const daysOut = document.getElementById('roi-days-out');
  const context = document.getElementById('roi-context');
  const form = document.getElementById('roi-form');
  const status = document.getElementById('roi-status');

  if (!team || !amountEl) return;

  let current = computeAnnualWaste({ team: team.value, hours: hours.value, rate: rate.value });
  amountEl.textContent = formatCurrency(current);

  const update = () => {
    const next = computeAnnualWaste({ team: team.value, hours: hours.value, rate: rate.value });
    const h = formatHours({ team: Number(team.value), hours: Number(hours.value) });
    animateNumber(amountEl, current, next);
    hoursOut.textContent = h.hours.toLocaleString('en-US');
    daysOut.textContent = h.days.toLocaleString('en-US');
    current = next;
    context.value = `team=${team.value},hours=${hours.value},rate=${rate.value},annual=${next}`;
  };

  [team, hours, rate].forEach((input) => input.addEventListener('input', update));
  update();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        status.textContent = 'Sent. Check your inbox within 2 minutes.';
        form.reset();
      } else {
        status.textContent = 'Something failed. Email russabregande@gmail.com directly.';
      }
    } catch {
      status.textContent = 'Network error. Email russabregande@gmail.com directly.';
    }
  });
};
```

**Step 2:** Wire into `src/js/main.js`. Modify main.js to import and call:
```js
import { initRoiCalc } from './roi-calc.js';
// ... inside DOMContentLoaded:
initRoiCalc();
```

**Step 3:** Commit.
```bash
git add src/js/roi-calc.js src/js/main.js
git commit -m "feat: ROI calc — live updates, number animation, Formspree submit"
```

**Note:** Formspree endpoint `xpwaplkv` is a placeholder. Russell must create a real form at formspree.io and swap the ID before deploy.

---

## Phase 7 — How It Works animated diagram

### Task 7.1: Build workflow SVG HTML

**Files:**
- Modify: `src/index.html` (replace `<section id="process">`)

**Step 1:** Replace:
```html
<section id="process" class="section bg-bg-alt">
  <div class="container-content">
    <div class="reveal max-w-prose mb-16">
      <h2 class="font-display font-bold text-ink mb-4" style="font-size: clamp(32px, 5vw, 56px);">From trigger to result — no humans in the loop.</h2>
      <p class="text-[18px] text-ink-muted">Every workflow is four nodes. Same shape, infinite variations.</p>
    </div>

    <div class="reveal">
      <svg id="workflow-svg" viewBox="0 0 900 220" class="w-full max-w-5xl mx-auto" role="img" aria-label="Workflow diagram: Trigger to AI Agent to Action to Report">
        <defs>
          <style>
            .node-circle { fill: white; stroke: #0A0A0A; stroke-width: 2; }
            .node-circle.is-active { fill: #0066FF; stroke: #0066FF; }
            .node-icon { stroke: #0A0A0A; stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; }
            .node-icon.is-active { stroke: white; }
            .connector { stroke: #0A0A0A; stroke-width: 2; fill: none; stroke-dasharray: 280; stroke-dashoffset: 280; }
            .connector.is-drawn { stroke-dashoffset: 0; transition: stroke-dashoffset 400ms cubic-bezier(0.16, 1, 0.3, 1); }
            .node-label { fill: #0A0A0A; font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; }
            .node-caption { fill: #52525B; font-family: Inter, sans-serif; font-size: 12px; }
          </style>
        </defs>

        <g transform="translate(60, 110)" class="wf-node" data-node="0">
          <circle class="node-circle" r="38" />
          <path class="node-icon" d="M-10 -12 L10 -4 L-2 2 L6 14" />
          <text class="node-label" text-anchor="middle" y="62">Trigger</text>
          <text class="node-caption" text-anchor="middle" y="78">New lead arrives</text>
        </g>

        <line class="connector" x1="98" y1="110" x2="322" y2="110" data-connector="0" />

        <g transform="translate(360, 110)" class="wf-node" data-node="1">
          <circle class="node-circle" r="38" />
          <path class="node-icon" d="M-10 -6 Q 0 -16, 10 -6 Q 0 16, -10 -6 M-4 0 L4 0" />
          <text class="node-label" text-anchor="middle" y="62">AI Agent</text>
          <text class="node-caption" text-anchor="middle" y="78">Qualify &amp; score</text>
        </g>

        <line class="connector" x1="398" y1="110" x2="522" y2="110" data-connector="1" />

        <g transform="translate(560, 110)" class="wf-node" data-node="2">
          <circle class="node-circle" r="38" />
          <path class="node-icon" d="M-10 -4 L-4 -10 L10 4 L4 10 Z M-6 -4 L6 8" />
          <text class="node-label" text-anchor="middle" y="62">Action</text>
          <text class="node-caption" text-anchor="middle" y="78">Route to owner</text>
        </g>

        <line class="connector" x1="598" y1="110" x2="802" y2="110" data-connector="2" />

        <g transform="translate(840, 110)" class="wf-node" data-node="3">
          <circle class="node-circle" r="38" />
          <path class="node-icon" d="M-10 8 L-10 -4 M-4 8 L-4 -8 M2 8 L2 0 M8 8 L8 -6" />
          <text class="node-label" text-anchor="middle" y="62">Report</text>
          <text class="node-caption" text-anchor="middle" y="78">Log to dashboard</text>
        </g>
      </svg>
    </div>

    <div class="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto text-[15px] text-ink-muted">
      <p class="reveal"><strong class="text-ink">Trigger.</strong> A form, a message, an order — anything can start the flow.</p>
      <p class="reveal" data-reveal-delay="120"><strong class="text-ink">Act.</strong> AI reads the data, qualifies it, and takes the next step in milliseconds.</p>
      <p class="reveal" data-reveal-delay="240"><strong class="text-ink">Report.</strong> Every action logs so you check it once a week — or never.</p>
    </div>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: How It Works section — SVG workflow diagram + 3 captions"
```

### Task 7.2: Animate workflow diagram on scroll

**Files:**
- Modify: `src/js/workflow-anim.js`

**Step 1:** Write `src/js/workflow-anim.js`:
```js
export const initWorkflowAnim = () => {
  const svg = document.getElementById('workflow-svg');
  if (!svg) return;

  const nodes = svg.querySelectorAll('.wf-node');
  const connectors = svg.querySelectorAll('.connector');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const play = () => {
    if (reduced) {
      nodes.forEach((n) => { n.querySelector('.node-circle').classList.add('is-active'); n.querySelector('.node-icon').classList.add('is-active'); });
      connectors.forEach((c) => c.classList.add('is-drawn'));
      return;
    }
    nodes.forEach((node, i) => {
      setTimeout(() => {
        node.querySelector('.node-circle').classList.add('is-active');
        node.querySelector('.node-icon').classList.add('is-active');
        if (connectors[i]) setTimeout(() => connectors[i].classList.add('is-drawn'), 200);
      }, i * 700);
    });
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        play();
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  io.observe(svg);

  nodes.forEach((node) => {
    node.style.cursor = 'pointer';
    node.addEventListener('mouseenter', () => node.style.transform += ' scale(1.05)');
    node.addEventListener('mouseleave', () => node.style.transform = node.style.transform.replace(' scale(1.05)', ''));
  });
};
```

**Step 2:** Wire into `main.js` — add import and call in DOMContentLoaded:
```js
import { initWorkflowAnim } from './workflow-anim.js';
// ...
initWorkflowAnim();
```

**Step 3:** Commit.
```bash
git add src/js/workflow-anim.js src/js/main.js
git commit -m "feat: workflow diagram scroll-triggered draw animation"
```

---

## Phase 8 — Work / Case studies

### Task 8.1: Build case study cards

**Files:**
- Modify: `src/index.html` (replace `<section id="work">`)

**Step 1:** Replace:
```html
<section id="work" class="section">
  <div class="container-content">
    <div class="reveal max-w-prose mb-16">
      <h2 class="font-display font-bold text-ink mb-4" style="font-size: clamp(32px, 5vw, 56px);">Systems I've shipped.</h2>
      <p class="text-[18px] text-ink-muted">Each one replaces 3–8 hours a week of manual work.</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <article class="reveal group rounded-2xl bg-white border border-black/5 p-8 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,102,255,0.08)]">
        <p class="text-[13px] font-mono text-accent uppercase tracking-wider mb-6">n8n · Real estate</p>
        <h3 class="font-display font-semibold text-ink text-[24px] mb-3" style="line-height: 1.1;">AI lead scorer for a brokerage</h3>
        <p class="text-[15px] text-ink-muted mb-8">30 leads/day, slow to qualify. Now an AI reads each lead, scores it, routes to the right agent, and writes the first reply.</p>
        <div class="pt-6 border-t border-black/5">
          <p class="text-[13px] text-ink-muted">Response time</p>
          <p class="font-display font-semibold text-ink text-[28px]">4 hrs → 90 sec</p>
        </div>
      </article>

      <article class="reveal group rounded-2xl bg-white border border-black/5 p-8 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,102,255,0.08)]" data-reveal-delay="120">
        <p class="text-[13px] font-mono text-accent uppercase tracking-wider mb-6">Make · E-commerce</p>
        <h3 class="font-display font-semibold text-ink text-[24px] mb-3" style="line-height: 1.1;">Order fulfillment bridge</h3>
        <p class="text-[15px] text-ink-muted mb-8">Shopify → 3PL → accounting → customer email, all in one scenario. Fraud flags intercept bad orders before they ship.</p>
        <div class="pt-6 border-t border-black/5">
          <p class="text-[13px] text-ink-muted">Ops time per order</p>
          <p class="font-display font-semibold text-ink text-[28px]">12 min → 0</p>
        </div>
      </article>

      <article class="reveal group rounded-2xl bg-white border border-black/5 p-8 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,102,255,0.08)]" data-reveal-delay="240">
        <p class="text-[13px] font-mono text-accent uppercase tracking-wider mb-6">Zapier · Agency</p>
        <h3 class="font-display font-semibold text-ink text-[24px] mb-3" style="line-height: 1.1;">Client onboarding pipeline</h3>
        <p class="text-[15px] text-ink-muted mb-8">Signed contract triggers 17 downstream actions — Notion workspace, Slack channel, Drive folder, welcome email, kickoff calendar invite.</p>
        <div class="pt-6 border-t border-black/5">
          <p class="text-[13px] text-ink-muted">Onboarding time</p>
          <p class="font-display font-semibold text-ink text-[28px]">2 days → 10 min</p>
        </div>
      </article>
    </div>
    <div class="reveal mt-12">
      <a href="workflows.html" class="link-underline text-ink font-medium">See all 15 workflows →</a>
    </div>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: case study cards — 3 workflows with problem/system/result"
```

---

## Phase 9 — Audit form

### Task 9.1: Build audit form

**Files:**
- Modify: `src/index.html` (replace `<section id="audit">`)

**Step 1:** Replace:
```html
<section id="audit" class="section bg-bg-alt">
  <div class="container-content max-w-3xl">
    <div class="reveal mb-12">
      <h2 class="font-display font-bold text-ink mb-4" style="font-size: clamp(32px, 5vw, 56px);">Got a bottleneck? I'll tear it apart, free.</h2>
      <p class="text-[18px] text-ink-muted">Drop a one-liner. In 48 hours you get a custom teardown — the exact workflow I'd build, what it costs, what it saves.</p>
    </div>
    <form id="audit-form" action="https://formspree.io/f/xpwaplkv" method="POST" class="reveal space-y-6 rounded-2xl bg-white border border-black/5 p-8">
      <label class="block">
        <span class="block text-[13px] font-medium text-ink-muted mb-2">Email</span>
        <input type="email" name="email" required placeholder="your@email.com" class="w-full px-4 py-3 rounded-md bg-white border border-black/10 focus:border-accent focus:outline-none text-[15px]" />
      </label>
      <label class="block">
        <span class="block text-[13px] font-medium text-ink-muted mb-2">What's your biggest manual time-sink?</span>
        <textarea name="bottleneck" required rows="4" placeholder="e.g. 'We process 200 insurance verifications a week and it takes our team 20 hrs.'" class="w-full px-4 py-3 rounded-md bg-white border border-black/10 focus:border-accent focus:outline-none text-[15px] resize-y"></textarea>
      </label>
      <input type="hidden" name="_subject" value="Audit request" />
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <p id="audit-status" class="text-[13px] text-ink-muted" aria-live="polite"></p>
        <button type="submit" class="btn-accent">
          Send my audit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </button>
      </div>
    </form>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: audit form — email + textarea, Formspree-wired"
```

### Task 9.2: Wire audit form submit

**Files:**
- Modify: `src/js/main.js`

**Step 1:** Append inside `DOMContentLoaded`:
```js
const initAuditForm = () => {
  const form = document.getElementById('audit-form');
  const status = document.getElementById('audit-status');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        status.textContent = 'Got it. I\'ll reply within 48 hours.';
      } else {
        status.textContent = 'Something failed. Email russabregande@gmail.com directly.';
      }
    } catch {
      status.textContent = 'Network error. Email russabregande@gmail.com directly.';
    }
  });
};
initAuditForm();
```

**Step 2:** Commit.
```bash
git add src/js/main.js
git commit -m "feat: audit form async submit + status feedback"
```

---

## Phase 10 — About, final CTA, misc

### Task 10.1: Build About section

**Files:**
- Modify: `src/index.html` (replace `<section id="about">`)

**Step 1:** Replace:
```html
<section id="about" class="section">
  <div class="container-content max-w-4xl">
    <div class="grid md:grid-cols-[200px_1fr] gap-12 items-start">
      <div class="reveal">
        <img src="assets/img/russell-portrait.jpg" alt="Russell Abregande" width="200" height="200" loading="lazy" class="rounded-2xl w-full aspect-square object-cover border border-black/5" />
      </div>
      <div class="reveal" data-reveal-delay="120">
        <h2 class="font-display font-bold text-ink mb-6" style="font-size: clamp(32px, 5vw, 56px);">Hi, I'm Russell.</h2>
        <p class="text-[18px] text-ink-muted leading-relaxed mb-6">I'm an AI automation and systems specialist based in Manila. I've spent the last few years building workflows that replace the boring parts of running a business — lead scoring, order routing, report generation, onboarding.</p>
        <p class="text-[18px] text-ink-muted leading-relaxed mb-8">I work solo, ship fast, and don't use jargon. If your team is drowning in copy-paste, we should talk.</p>
        <div class="flex flex-wrap gap-4">
          <a href="https://linkedin.com/in/russabregande" target="_blank" rel="noopener" class="link-underline text-ink">LinkedIn</a>
          <a href="https://github.com/russkaye" target="_blank" rel="noopener" class="link-underline text-ink">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2:** If `assets/img/russell-portrait.jpg` is missing, substitute `1X1.jpg` from the Remote Work parent folder or commit a placeholder block-color image 200x200 named `russell-portrait.jpg`.

**Step 3:** Commit.
```bash
git add src/index.html src/assets/img/
git commit -m "feat: About section — photo + 80-word bio + social links"
```

### Task 10.2: Build final CTA

**Files:**
- Modify: `src/index.html` (replace `<section id="final-cta">`)

**Step 1:** Replace:
```html
<section id="final-cta" class="section relative overflow-hidden min-h-[70vh] flex items-center">
  <div class="mesh-bg" aria-hidden="true"></div>
  <div class="container-content text-center">
    <h2 class="reveal font-display font-bold text-ink mb-6" style="font-size: clamp(40px, 7vw, 96px);">Ready to stop copy-pasting?</h2>
    <p class="reveal text-[20px] text-ink-muted mb-12 max-w-prose mx-auto" data-reveal-delay="120">15-min call. No deck. No pitch. Just your workflow on a shared screen.</p>
    <a href="https://calendly.com/russabregande" target="_blank" rel="noopener" class="reveal btn-primary magnetic text-[16px] px-8 py-4" data-reveal-delay="240">
      Book the call
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>
```

**Step 2:** Commit.
```bash
git add src/index.html
git commit -m "feat: final CTA section — full-bleed mesh + Book the call"
```

---

## Phase 11 — Build and verify locally

### Task 11.1: Run full build

**Step 1:** Build.
```bash
npm run build
```
Expected: creates `docs/index.html`, `docs/assets/css/main.css`, `docs/assets/js/main.min.js`, `docs/assets/fonts/*`, `docs/assets/img/*`.

**Step 2:** Verify outputs exist.
```bash
ls -la docs/index.html docs/assets/css/ docs/assets/js/ docs/assets/fonts/ docs/assets/img/
```

**Step 3:** Check page weight.
```bash
du -sh docs/index.html docs/assets/
```
Expected: under 500KB total (minus fonts, which can be ~150KB combined).

### Task 11.2: Serve locally and test

**Step 1:** Serve.
```bash
npx http-server docs -p 8080 -c-1 &
```

**Step 2:** Open `http://localhost:8080` in a browser. Manual checklist:
- [ ] Hero loads, H1 is huge, mesh drifts in background
- [ ] Hero entry animation sequences cleanly (eyebrow → H1 → sub → CTAs)
- [ ] Primary CTA is magnetic on cursor proximity
- [ ] Scroll past hero — reveal animations fire on each section
- [ ] Proof bar displays all stats
- [ ] ROI calc: change team size → number animates
- [ ] ROI calc: submit email with test address → status flips to sent
- [ ] Workflow diagram draws node-by-node on scroll into view
- [ ] Case study cards lift on hover
- [ ] Audit form submits, status displays
- [ ] About photo loads, bio reads correctly
- [ ] Final CTA button works
- [ ] Footer links all present

**Step 3:** Test mobile (DevTools responsive → iPhone 12 Pro).
- [ ] Hero headline wraps, still readable
- [ ] Nav collapses (hides middle links, keeps Book a call button)
- [ ] ROI calc stacks vertically, inputs full-width
- [ ] Workflow SVG scales down
- [ ] Case study cards stack

**Step 4:** Test reduced-motion (DevTools → Rendering → Emulate CSS `prefers-reduced-motion: reduce`).
- [ ] No gradient mesh drift
- [ ] Reveal items appear immediately
- [ ] ROI number updates instantly
- [ ] Workflow diagram fully drawn immediately

**Step 5:** Kill local server.
```bash
pkill -f http-server
```

---

## Phase 12 — Accessibility + Lighthouse

### Task 12.1: Run Lighthouse audit

**Step 1:** Build and serve (as above).

**Step 2:** Run Lighthouse via Chrome DevTools → Lighthouse tab → Mobile → Analyze.

**Step 3:** Fix anything below targets:
- Performance: ≥ 95
- Accessibility: 100
- Best Practices: ≥ 95
- SEO: 100

**Common fixes if needed:**
- Missing alt text → add
- Low contrast → check ink-muted vs bg (if any text is < 4.5:1, darken `--ink-muted`)
- Image not sized → add explicit `width` and `height`
- Render-blocking CSS → already handled via self-host; confirm
- No `<main>` landmark → confirm present

**Step 4:** Commit any fixes.
```bash
git add src/
git commit -m "fix: address Lighthouse audit findings"
```

### Task 12.2: Manual keyboard nav test

**Step 1:** Tab through the entire page. Every interactive element must receive a visible focus ring.

**Step 2:** Test specifically:
- Skip-to-content link (Tab from page load, Enter jumps to main)
- Every CTA button activates with Enter and Space
- Form submits with Enter from email field
- Nav links jump to correct anchors

**Step 3:** If any element is skipped or has no focus style, fix in `src/css/main.css`.

**Step 4:** Commit if any fixes.
```bash
git add src/
git commit -m "a11y: keyboard nav and focus ring fixes"
```

### Task 12.3: Write sitemap.xml and robots.txt

**Files:**
- Create: `src/sitemap.xml`
- Create: `src/robots.txt`

**Step 1:** Write `src/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://russkaye.github.io/automation-portfolio/</loc>
    <lastmod>2026-04-18</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://russkaye.github.io/automation-portfolio/workflows.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://russkaye.github.io/automation-portfolio/contact.html</loc>
    <priority>0.6</priority>
  </url>
</urlset>
```

**Step 2:** Write `src/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://russkaye.github.io/automation-portfolio/sitemap.xml
```

**Step 3:** Update `build:copy` script in package.json to include them:
```bash
npm pkg set scripts.build:copy="cpx \"src/assets/**/*\" docs/assets && cpx src/css/compiled.css docs/assets/css/main.css && cpx src/sitemap.xml docs/ && cpx src/robots.txt docs/"
```

**Step 4:** Commit.
```bash
git add src/sitemap.xml src/robots.txt package.json
git commit -m "feat: sitemap.xml + robots.txt + copy into build"
```

---

## Phase 13 — Preserve existing pages and clean up

### Task 13.1: Restyle workflows.html and contact.html

**Files:**
- Modify: `docs/workflows.html`
- Modify: `docs/contact.html`

**Step 1:** Read current `docs/workflows.html`.
```bash
wc -l docs/workflows.html docs/contact.html
```

**Step 2:** In each, replace the dark theme references (`bg-[#09090b]`, `text-[#ededed]`, purple accents) with the new light palette. At minimum:
- Change `<body>` class/style to use `#FAFAF9` bg + `#0A0A0A` text
- Replace the compiled CSS link to `<link rel="stylesheet" href="assets/css/main.css" />` (remove old Tailwind CDN)
- Update nav to match the new nav in index.html
- Remove all `<video>` tags and their containers

**Step 3:** Manually open both pages in browser. Check that:
- Bg is light
- Nav matches
- No broken refs to deleted video files
- Workflow cards are readable

**Step 4:** Commit.
```bash
git add docs/workflows.html docs/contact.html
git commit -m "style: restyle workflows.html and contact.html to new light theme"
```

### Task 13.2: Delete old video files

**Files:**
- Delete: `docs/assets/cta-video.mp4`
- Delete: `docs/assets/hero-video.mp4`
- Delete: `docs/assets/how-it-works-video.mp4`
- Delete: `docs/assets/workflow-video.mp4`

**Step 1:** Confirm no surviving references.
```bash
grep -rn "video.mp4\|cta-video\|hero-video\|workflow-video\|how-it-works-video" docs/ src/
```
Expected: no matches.

**Step 2:** Delete.
```bash
rm -f docs/assets/cta-video.mp4 docs/assets/hero-video.mp4 docs/assets/how-it-works-video.mp4 docs/assets/workflow-video.mp4
```

**Step 3:** Verify storage savings.
```bash
du -sh docs/
```

**Step 4:** Commit.
```bash
git add docs/
git commit -m "chore: remove video files (replaced by SVG animations and mesh bg)"
```

### Task 13.3: Clean old CSS/JS from docs

**Step 1:** Check for old files not in the new build.
```bash
ls docs/assets/css docs/assets/js docs/assets/images 2>/dev/null
```

**Step 2:** Run clean + build one more time.
```bash
npm run build
```

**Step 3:** Remove anything orphaned — e.g. old `docs/assets/images/` if its contents are now in `docs/assets/img/` via the build. Manually inspect before deleting.

**Step 4:** Commit.
```bash
git add docs/
git commit -m "chore: clean orphaned assets after rebuild"
```

---

## Phase 14 — Deploy and verify

### Task 14.1: Final build

**Step 1:** Build.
```bash
npm run build
```

**Step 2:** Run tests once more.
```bash
npm test
```
Expected: all pass.

**Step 3:** Inspect `docs/` output one more time.
```bash
ls -la docs/
du -sh docs/index.html docs/assets/
```

**Step 4:** Commit build output.
```bash
git add docs/
git commit -m "build: final production build for rebrand"
```

### Task 14.2: Push to remote

**Step 1:** Check branch and remote.
```bash
git status
git log --oneline -10
```

**Step 2:** Push (only after Russell confirms).
```bash
git push origin main
```

**Step 3:** Wait ~2 minutes for GitHub Pages to redeploy.

**Step 4:** Open live site.
```bash
# windows
start "" "https://russkaye.github.io/automation-portfolio/"
```

### Task 14.3: Live verification

**Manual checklist on production URL:**
- [ ] Page loads under 2 seconds on throttled 4G (DevTools Network → Fast 3G)
- [ ] Hero renders as designed — mesh drifts, H1 huge, CTAs working
- [ ] Calendly link opens correctly
- [ ] ROI calc submits (test with real email, confirm receipt)
- [ ] Audit form submits (test with real email, confirm receipt)
- [ ] Workflow animation plays on scroll
- [ ] Mobile view works on a real phone (not just DevTools)
- [ ] `workflows.html` still accessible + restyled
- [ ] Favicon shows in tab

**Step 1:** If something broken, fix, build, push, re-verify.

**Step 2:** Run Lighthouse one more time on the live URL. Record scores in commit.

**Step 3:** Final commit if any post-deploy fixes.
```bash
git add .
git commit -m "fix: post-deploy tweaks — [describe]"
git push
```

---

## Phase 15 — Formspree + Calendly hookup (manual, not code)

### Task 15.1: Create Formspree forms

**Outside-the-code steps Russell must do:**

1. Go to formspree.io, sign up with russabregande@gmail.com.
2. Create form "ROI Calculator" → copy the form ID (format `xpwaplkv`).
3. Create form "Audit Request" → copy the form ID.
4. In `src/index.html`, replace the placeholder `xpwaplkv` with the real IDs on the two `<form action="...">` attributes.
5. Rebuild and push:
   ```bash
   npm run build && git add . && git commit -m "chore: wire real Formspree endpoints" && git push
   ```
6. Submit test entries on the live site; confirm email delivery.

### Task 15.2: Confirm Calendly link

**Step 1:** Verify `https://calendly.com/russabregande` resolves to a bookable page with a 15-min event. If not, create the event in Calendly and update all `href` occurrences in `src/index.html`:
```bash
grep -n "calendly.com" src/index.html
```

---

## Completion criteria

The rebrand is done when:

1. `npm test` passes all ROI calc unit tests.
2. Lighthouse scores on mobile: Performance ≥ 95, Accessibility = 100, SEO = 100.
3. Page weight under 500KB (excluding fonts ~150KB).
4. Live site at `russkaye.github.io/automation-portfolio/` renders new design.
5. Manual QA checklist (Task 11.2, 14.3) fully passes.
6. ROI calc and audit form both deliver email to Russell on submit.
7. All old videos deleted from `docs/assets/`.
8. `/n8n`, `/make`, `/zapier`, `/cross-platform`, `/platform-comparison`, `/templates` folders untouched.
9. Design doc (`docs/plans/2026-04-18-rebrand-design.md`) committed alongside implementation.

---

## Appendix — Key commands reference

```bash
npm run dev        # Tailwind watch mode while editing
npm run build      # Full production build into /docs
npm test           # Run ROI calc unit tests
npm run clean      # Wipe /docs assets (before rebuild)

# Serve locally
npx http-server docs -p 8080 -c-1

# Inspect build output
du -sh docs/
```

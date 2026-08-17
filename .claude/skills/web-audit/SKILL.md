---
name: web-audit
description: Audit and improve performance, SEO and accessibility of the Next.js portfolio. Use when measuring Core Web Vitals, running Lighthouse, checking bundle size, reviewing metadata, sitemap or robots, migrating i18n to server-rendered routes, or fixing accessibility issues. Always use before and after any change that claims to improve a metric.
---

# Web Audit

## Non-negotiable rule

**Measure before, measure after, record both.** Never claim an improvement that has not been measured. A recorded before/after is the deliverable that makes this work credible to a recruiter — the fix itself is the easy part.

Keep results in `docs/audit/` as dated markdown files. Never overwrite an old measurement; add a new one.

## Baseline procedure

Run this once, on production, before touching anything:

1. **Lighthouse** on the deployed URL, mobile profile, incognito. Record Performance, Accessibility, Best Practices, SEO. Save the JSON report.
2. **Core Web Vitals**: LCP, CLS, INP. Note which element is the LCP.
3. **Bundle size**: `pnpm build` and record the route sizes and First Load JS from the Next.js output.
4. **Accessibility**: full keyboard pass (Tab through the whole page — can you reach and activate everything? is focus always visible?), plus an automated axe scan.
5. **SEO**: view source on production and check whether the real content is in the HTML or injected client-side, per locale.

Write the baseline down before proposing a single fix.

## What to look for in this codebase

### i18n and SEO — the biggest known issue

The site uses client-side i18next with browser language detection and localStorage. Consequences to verify and quantify:

- Is translated content present in the server HTML, or does it appear only after hydration? Check with JavaScript disabled.
- Are there distinct URLs per locale (`/es`, `/en`)? Without them Google cannot index both versions.
- Are `hreflang` tags and per-locale canonical URLs present?
- Does the language switch cause a layout shift or a flash of untranslated content?

The fix — moving to App Router `[locale]` segments with server-rendered translations — is a large change. Plan it, branch it, and measure it in isolation.

### Metadata

- `metadata` export or `generateMetadata` per route: title, description, canonical.
- Open Graph and Twitter card images that actually render when the link is shared.
- `app/sitemap.ts` and `app/robots.ts`.
- Structured data (`Person` / `WebSite` JSON-LD) — cheap, and useful for a portfolio.

### Rendering and bundle

- Which components carry `"use client"` unnecessarily? Each one pushes JavaScript to the browser.
- Framer Motion is heavy. Which animations justify it and which could be CSS?
- Fonts: loaded through `next/font` with `display: swap` and preloaded, or via a blocking external stylesheet?
- Images: `next/image` everywhere, modern formats, explicit dimensions, `priority` on the LCP image only.

### Accessibility

- Heading order: exactly one `h1`, no skipped levels.
- Contrast in **both** light and dark themes — dark mode is where portfolios usually fail.
- The interactive terminal: reachable by keyboard, announced to screen readers, with a non-terminal fallback for the same information.
- Contact form: labels bound to inputs, errors announced via `aria-live` and linked with `aria-describedby`.
- Animations respect `prefers-reduced-motion`.
- Language switcher announces the change and updates the `lang` attribute on `<html>`.

## Tools

```bash
# Lighthouse locally against the production build
pnpm build && pnpm start
pnpm dlx lighthouse http://localhost:3000 --view --preset=desktop
pnpm dlx lighthouse http://localhost:3000 --view --form-factor=mobile

# Bundle analysis
pnpm add -D @next/bundle-analyzer

# Accessibility linting during development
pnpm add -D eslint-plugin-jsx-a11y

# Automated a11y scan
pnpm dlx @axe-core/cli http://localhost:3000
```

## Reporting format

For every audit iteration:

| Metric | Before | After | Change |
|---|---|---|---|

Then, for each fix: what the problem was, why it happened, what was changed, and which metric moved. That paragraph is what gets rehearsed for the interview.

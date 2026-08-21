# CLAUDE.md

Guidance for Claude Code when working in this repository.

> **Status:** verified against the source tree on 2026-08-11. Every factual section below (Structure, Stack, Known issues) now matches the code. Measurements and full evidence: [`docs/audit/baseline-2026-08-11.md`](docs/audit/baseline-2026-08-11.md).
>
> **Target vs. current state.** The *Commands*, *Conventions*, *Security rules*, *Hard rules* and *Before finishing any task* sections describe the **target** state this refactor is moving towards, not what the repo does today. Notably: the repo still uses **npm** (`package-lock.json`; the pnpm migration is task 1), and there is no `typecheck` or `test` script yet. Those sections are deliberately left as written — they are the goal.

## Project

Personal developer portfolio for Adriana Suárez. It is both a professional showcase and a code sample that technical recruiters will read. Code quality here is part of the product.

- Production: https://adriana-portfolio-blue.vercel.app
- Hosting: Vercel
- Currently undergoing an **incremental refactor**. Priorities, in order: (1) performance / SEO / accessibility, (2) testing and CI, (3) architecture and clean code, (4) design polish.

## Commands

This project uses **pnpm**. Never use `npm` or `yarn` — mixing lockfiles breaks reproducible installs.

```bash
pnpm dev        # dev server on :3000
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
pnpm test       # Vitest
```

Add dependencies with `pnpm add` / `pnpm add -D`. Run one-off binaries with `pnpm dlx`.

pnpm 10 blocks dependency lifecycle scripts by default. If a package legitimately needs to run one at install time, add it to `onlyBuiltDependencies` in `package.json` with a comment explaining why — never disable the protection globally.

## Stack

| Area | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Runtime | React 19.2.3 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Animation | ~~Framer Motion 12~~ — **declared in `package.json` but never imported.** All animation today is CSS/Tailwind transitions. Either use it or drop it; do not cite it as stack until then |
| Forms | React Hook Form + Zod 4 (`@hookform/resolvers`) |
| i18n | i18next + react-i18next + browser language detector (client-side) |
| Theming | next-themes |
| Icons | lucide-react, flag-icons |
| Email | Resend + React Email |
| Utils | clsx, tailwind-merge |

No testing framework is installed yet.

## Structure

Verified 2026-08-11. 41 files under `src/`.

```
src/
├── app/                  # layout.tsx, page.tsx, globals.css
│   └── api/contact/      # route.ts — the only API route
├── components/
│   ├── icons/            # SocialIcons.tsx (GitHub, LinkedIn, Mail — inline SVG)
│   ├── layout/           # Header, Footer, LanguageToggle, ThemeToggle, ThemeProvider
│   ├── providers/        # I18nProvider
│   ├── sections/         # one folder per section:
│   │                     #   About/, Contact/, Experience/, Skills/,
│   │                     #   Hero/ (Hero + Terminal), Projects/ (Projects + ProjectCard)
│   └── ui/               # Badge, Button, Card, Section, TypingText + index.ts barrel
├── data/                 # experience.ts, projects.ts, skills.ts
├── emails/               # ContactEmail, ConfirmationEmail.es, ConfirmationEmail.en
├── hooks/                # useExperience, useProjects, useSkills
├── i18n/                 # config.ts + locales/{es,en}.json (101 keys each, in parity)
├── lib/                  # utils.ts (cn), validations/contact.ts (Zod)
│                         #   constants.ts — dead, never imported, holds wrong URLs
│                         #   animations.ts — EMPTY FILE
└── types/                # index.ts — EMPTY FILE
```

Corrections against the previous bootstrapped version, so they are not
reintroduced:

- There is **no `Navigation` component**. Navigation lives inline inside
  `Header.tsx`. `layout/` also holds the two toggles and `ThemeProvider`.
- **`components/icons/` was missing** from the tree.
- Section components sit **one level deeper** than implied
  (`sections/About/About.tsx`, not `sections/About.tsx`).
- `lib/animations.ts` and `types/index.ts` **exist but are empty**;
  `lib/constants.ts` is **never imported**. Treat all three as dead code —
  the `types/` entry in particular contradicts the "shared types go in
  `src/types/`" convention below, which currently has nothing to point at.

## Conventions

- **Language:** all code, comments, commit messages and public-facing docs
  (`README.md`) in English. `docs/audit/` and `docs/plans/` are internal working
  documents written in **Spanish** — that is deliberate, not an oversight.
- **Server first:** components are React Server Components by default. Add `"use client"` only when the component needs state, effects, browser APIs or event handlers. Push the boundary as far down the tree as possible.
- **Styling:** Tailwind utility classes only. Merge conditional classes with the `cn()` helper (`clsx` + `tailwind-merge`); do not concatenate class strings manually. Design tokens live in the Tailwind v4 CSS config, not as hardcoded hex values in components.
- **Validation:** every form and every API route input is validated with a Zod schema from `src/lib/validations/`. Types are derived with `z.infer`, never duplicated by hand.
- **Content:** copy lives in `src/i18n/locales/*.json`, structured data in `src/data/`. Never hardcode user-facing strings in components. Any new string must be added to **both** `es.json` and `en.json`.
- **Types:** no `any`. Prefer `type` for props and unions; shared types go in `src/types/`.
- **Naming:** components `PascalCase.tsx`, hooks `useThing.ts`, utilities `camelCase.ts`.
- **Accessibility:** semantic HTML, visible focus states, keyboard-reachable interactive elements, `alt` on every image, labels tied to inputs, sufficient contrast in both themes.
- **Images:** always `next/image`. Every image must declare its intrinsic size — either `width`/`height`, or `fill` **plus a `sizes` prop**. `fill` without `sizes` makes Next serve the largest variant at every breakpoint and is not acceptable.

### Compliance as of 2026-08-11

The rules above are the target. Measured state of the code today:

| Convention | Status |
|---|---|
| Language: English | ⚠️ Code and docs are English, but many inline comments are Spanish (`data/projects.ts`, `Contact.tsx`, `validations/contact.ts`) |
| Server first | ❌ **14 of 20 components are `"use client"`.** 6 of them (About, Experience, Skills, Projects, Footer, and mostly Hero) only because they call `useTranslation` |
| `cn()` for conditional classes | ⚠️ Used in Badge, Button, Card, Section, LanguageToggle. **`Header.tsx:53-57` concatenates a template literal instead** |
| Design tokens, no hardcoded colours | ⚠️ No hex literals anywhere ✅, but `Contact.tsx` (21×) and `Terminal.tsx` (15×) bypass the tokens with raw `gray-*`/`red-*`/`white/10` utilities |
| Zod on every form and API input | ✅ Met — both use `getContactFormSchema` from `lib/validations/` |
| Types via `z.infer` | ✅ Met |
| Copy in locale files | ❌ **15 user-facing strings hardcoded** — 7 visible (6 are the contact form labels) + 8 a11y attributes, all English-only |
| Both locales updated | ✅ 101 keys each, perfect parity, 0 orphans |
| No `any` | ✅ Met — zero occurrences in `src/` |
| Naming | ✅ Met |
| Accessibility | ❌ **The contact form has no `<label>`, no `htmlFor`, no `id` on any input.** Inputs also set `focus:ring-0`, removing the focus ring |
| Images | ❌ **No `<Image>` declares `sizes`**; all three use `fill`. Two ~1 MB images load with `priority` in About |

`ProjectCard.tsx` calls `useTranslation()` without a `"use client"` directive.
It works only because its sole parent is a client component. Do not rely on
this — give it the directive or move the translation up.

## Git

- Branches: `master` (production), `develop` (integration), then `feat/*`, `fix/*`, `refactor/*`, `test/*`, `perf/*`, `docs/*`, `chore/*`.
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `perf:`, `docs:`, `chore:`.
- One coherent change per PR. Never commit directly to `master`.

## Known issues

All verified against the code on 2026-08-11 — none was already fixed. Evidence
and measurements: [`docs/audit/baseline-2026-08-11.md`](docs/audit/baseline-2026-08-11.md).
Do not reintroduce any of these. Remove the entry once fixed.

**0. The page is served with no content.** `I18nProvider` returns `null` until
a client-side `useEffect` initialises i18next
(`src/components/providers/I18nProvider.tsx:25-27`), and it wraps the whole
tree in `layout.tsx`. The prerendered `<body>` is literally
`<div hidden=""><!--$--><!--/$--></div>` — **0 characters of visible text**.
Production serves the same 9 893-byte shell. Everything renders client-side
only. This outranks every other issue here.

1. **`src/app/api/contact/route.ts` logs form data to the console.** Five
   `console.log` at lines 16-20; **line 16 dumps the entire request body**
   (name, email, full message) into the Vercel logs on every submission.
   Line 69 also logs the raw error object.
2. **The contact endpoint has no rate limiting and no origin validation.**
   Anyone can hammer it. No honeypot, no `Content-Type` check. The recipient
   and sender addresses are hardcoded rather than env vars.
3. **No security headers configured in `next.config.ts`** — the file is empty.
   Verified against production with `curl -I`: only Vercel's default `HSTS` is
   present. Missing CSP, `X-Frame-Options`, `X-Content-Type-Options`,
   `Referrer-Policy`, `Permissions-Policy`.
4. **`<html lang="en">` is hardcoded in `layout.tsx:33`** while the site serves
   Spanish and English. Nothing updates it on language change — `LanguageToggle`
   only calls `i18n.changeLanguage()`.
5. **Too many components are client components** — 14 of 20. Six of them are
   client-only because they call `useTranslation`, nothing else. See the
   per-file breakdown in the audit.
6. **No tests, no error boundaries, no analytics.** No test framework
   installed; no `error.tsx`, `global-error.tsx`, `not-found.tsx` or
   `loading.tsx` anywhere.
7. **`README.md` claims CI/CD, Lighthouse 95+ and WCAG 2.1 AA compliance that
   nothing in the repo backs up.** `.github/` does not exist at all. No
   measurement of any kind is stored in the repo. The WCAG claim is
   contradicted by the label-less contact form (issue 11).

### Found during the 2026-08-11 audit

8. **No SEO surface whatsoever.** No sitemap, robots, manifest, Open Graph,
   Twitter card, JSON-LD, `metadataBase`, canonical or hreflang. Metadata is a
   static object with only title, description and icon, so it cannot vary by
   language.
9. **`framer-motion` is declared but never imported.** It is nevertheless
   advertised as stack in `README.md:15,26`, listed as a portfolio technology
   in `data/projects.ts:25`, and claimed at 70 % proficiency in
   `data/skills.ts:30`. Recruiters read all three.
10. **`flag-icons` is imported whole** in `globals.css:2`: 271 flags, 542
    rules, **32.4 KB — 44 % of the 73.1 KB CSS bundle** — to render two flags.
11. **The contact form has no labels.** No `<label>`, `htmlFor` or `id` on any
    input in `Contact.tsx`; the visible captions are decorative `<span>`s.
    Errors render as plain `<p>` with no `role="alert"`, and submit state has
    no `aria-live` region.
12. **The contact API returns Resend's raw responses to the client**
    (`route.ts:61-67`). The client only reads `response.ok`.
13. **Images are unoptimised at the source.** No `<Image>` sets `sizes`; About
    loads two ~1 MB PNGs of the same face with `priority` for an
    `lg:`-only hover effect; `public/images/avatar.jpg` (1.2 MB) is never
    referenced.
    **Magnitude corrected by measurement** ([`network-2026-08-20.md`](docs/audit/network-2026-08-20.md)):
    `next/image` serves those PNGs as ~32 kB WebP, so the pair costs **63.6 kB
    transferred, not ~2 MB**. The defect stands; the number does not. Both still
    download below `lg`, the `hidden lg:block` one included. The missing `sizes`
    is currently **latent** — Next requests a `w=1200` variant on a 390 px phone
    and only the 768 px source width caps the waste, so **raising the source
    resolution without adding `sizes` would make things worse, not better.**
14. **Dead code.** `lib/animations.ts` and `types/index.ts` are empty files;
    `lib/constants.ts` is never imported and contains a wrong production URL
    and a LinkedIn handle that disagrees with `Footer.tsx:28`.

### Found during the Phase 0 measurements (18-20 August 2026)

Each entry links to the report that measured it. Reports live in `docs/audit/`.

15. **Colour contrast fails 39 times, and it is two design tokens, not 39 bugs**
    ([`axe-2026-08-19.md`](docs/audit/axe-2026-08-19.md)). All 39 are one axe
    rule, `color-contrast` (WCAG 1.4.3 AA), severity serious. The brand purple
    `#7209b7` fails against both backgrounds it is used on — 2.29 on `#0a0a0f`
    and 1.97 on `#271239` — including 36 px and 60 px bold headings, where the
    threshold drops to 3:1. The muted grey `#64748b` misses 4.5:1 by 0.35.
16. **Six `aria-label` values are English on Spanish buttons**
    ([`axe-2026-08-19.md`](docs/audit/axe-2026-08-19.md)). `ProjectCard.tsx:50`
    and `:62` set `View on GitHub` / `View live demo` while the visible text is
    Spanish, breaking WCAG 2.5.3 (Label in Name, level A): voice navigation
    cannot match a spoken visible label to a different accessible name. Detected
    only when axe's experimental rules are enabled; Lighthouse reports it by
    default.
17. **The favicon is downloaded twice**
    ([`network-2026-08-20.md`](docs/audit/network-2026-08-20.md)).
    `layout.tsx:21-24` declares `/web.png` as both `icon` and `shortcut`, which
    emits two `<link>` tags for one file: 24.5 kB, more than the CSS and the HTML
    together.
18. **`zod` is 24.5 % of the client bundle, and over half of that is locales**
    ([`bundle-2026-08-20.md`](docs/audit/bundle-2026-08-20.md)). 260.7 KB
    uncompressed to validate a three-field contact form, and 70 % of the largest
    chunk — the same chunk production transfers as 101 kB, the heaviest single
    asset on the page. **139.42 KB of it (53.5 % of `zod`, 13.1 % of the whole
    bundle) is `locales`: error messages in ~40 languages, where the site serves
    two.** Same defect as `flag-icons` in the CSS — the whole package imported to
    use a fraction — so treat them as one problem, not two.
    By contrast `lucide-react` is 4.3 KB: **module counts do not predict
    weight**, so do not use the module table in §1 of the baseline to prioritise
    this work.

### Checked and found NOT to be a problem

- The `400` branch in `route.ts:71` works. Verified against the installed
  zod 4.3.6 that `ZodError` satisfies
  `error instanceof Error && error.name === "ZodError"`. Do not "fix" it.
- `npx eslint .` is clean, TypeScript compiles clean, `strict: true`, and there
  is no `any` anywhere in `src/`.
- Locale files are in perfect parity (101 keys each).
- `.env.local` is gitignored and `.env.example` holds no values.

## Security rules for the contact endpoint

- Never log request bodies, emails, names or message content. Log an event and an error code, nothing else.
- Validate the body with the Zod schema before doing anything with it.
- Rate limit by IP. Return 429 with a generic message.
- Never return internal error details to the client — log server-side, respond with a generic message.
- Include a honeypot field rather than a third-party CAPTCHA: it costs nothing in bundle size or privacy, and this is a portfolio contact form, not a payment endpoint.
- Security headers go in `next.config.ts` and must be verified against the deployed site, not assumed.

## Hard rules

- Do not put unverifiable claims in `README.md`. Performance and accessibility numbers only go in after they have been measured, and the measurement method must be stated.
- Do not add a dependency without justifying the bundle cost and why the existing stack cannot cover it.
- Never commit secrets. `RESEND_API_KEY` and anything similar go in `.env.local` and Vercel env vars; `.env.example` holds keys only, never values.
- Do not introduce breaking changes to the deployed site without a stated rollback path.
- **Do not over-engineer.** This is a portfolio site with a single API route. Extracting email sending into `lib/services/contact.ts` is good. Introducing repositories, a domain layer, dependency injection or an event bus is not — unnecessary abstraction reads as inexperience just as clearly as no structure does. Every layer must be justified by a problem that actually exists in this codebase today.

## Before finishing any task

1. `pnpm lint` clean
2. `pnpm typecheck` clean
3. `pnpm test` passing (once tests exist)
4. `pnpm build` succeeds
5. New behaviour has tests
6. Both locale files updated if any copy changed
7. No `console.log` left behind

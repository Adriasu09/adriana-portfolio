# CLAUDE.md

Guidance for Claude Code when working in this repository.

> **Status:** verified against the source tree on **2026-08-31**, after Phase 1
> shipped to production. Measurements and evidence: [`docs/audit/`](docs/audit/).
>
> **Target vs. current state.** The *Conventions*, *Security rules* and *Hard
> rules* sections describe the **target** this refactor is moving towards. Phase
> 1 closed the gap on tooling and on the contact endpoint: `pnpm`, the
> `typecheck` script and the security headers are real now. There is still no
> `test` script — that is Phase 5.

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
| Animation | CSS/Tailwind transitions only. Framer Motion was declared and never imported once; removed in Phase 1. Do not reintroduce it without an actual use |
| Forms | React Hook Form + Zod 4 (`@hookform/resolvers`) |
| i18n | i18next + react-i18next + browser language detector (client-side) |
| Theming | next-themes |
| Icons | lucide-react, plus inline SVG in `components/icons/` |
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
│   ├── icons/            # SocialIcons.tsx (GitHub, LinkedIn, Mail)
│   │                     # FlagIcons.tsx (GB, ES) — all inline SVG
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
└── lib/                  # utils.ts (cn), validations/contact.ts (Zod)
```

`src/types/` no longer exists: it held a single empty file and was removed in
Phase 1. The convention below still says shared types belong there — create the
directory when there is a type to put in it, not before.

Corrections against the previous bootstrapped version, so they are not
reintroduced:

- There is **no `Navigation` component**. Navigation lives inline inside
  `Header.tsx`. `layout/` also holds the two toggles and `ThemeProvider`.
- **`components/icons/` was missing** from the tree.
- Section components sit **one level deeper** than implied
  (`sections/About/About.tsx`, not `sections/About.tsx`).

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
| Language: English | ⚠️ Spanish inline comments remain in `data/projects.ts`, `Contact.tsx` and `validations/contact.ts`. `api/contact/route.ts` was translated in Phase 1 |
| Server first | ❌ **14 of 23 `.tsx` files are `"use client"`** (re-counted 2026-08-31; 23 excludes the three `emails/` templates). 6 of them (About, Experience, Skills, Projects, Footer, and mostly Hero) only because they call `useTranslation` |
| `cn()` for conditional classes | ⚠️ Used in Badge, Button, Card, Section, LanguageToggle. **`Header.tsx:53-57` concatenates a template literal instead** |
| Design tokens, no hardcoded colours | ⚠️ No hex literals anywhere ✅, but `Contact.tsx` (21×) and `Terminal.tsx` (15×) bypass the tokens with raw `gray-*`/`red-*`/`white/10` utilities |
| Zod on every form and API input | ✅ Met — both use `getContactFormSchema` from `lib/validations/` |
| Types via `z.infer` | ✅ Met |
| Copy in locale files | ❌ **14 user-facing strings hardcoded** — 7 visible (6 are the contact form labels) + 7 a11y attributes, all English-only. One of the eight went away in Phase 1: the flags became `aria-hidden`, so their `aria-label` stopped being needed rather than being translated |
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

Re-verified against the code on **2026-08-31**, after Phase 1. Evidence and
measurements: [`docs/audit/baseline-2026-08-11.md`](docs/audit/baseline-2026-08-11.md).
Do not reintroduce any of these. Remove the entry once fixed.

**Closed by Phase 1 and verified gone — do not "fix" them again:** the PII in
the contact logs (1), the missing rate limiting, origin check and honeypot (2),
the missing security headers (3), the unused `framer-motion` (9), the whole
`flag-icons` import (10), Resend's raw response reaching the client (12), and
the dead files (14). The numbering below keeps its original gaps on purpose, so
the entries still match the audit reports.

**0. The page is served with no content.** `I18nProvider` returns `null` until
a client-side `useEffect` initialises i18next
(`src/components/providers/I18nProvider.tsx:25-27`), and it wraps the whole
tree in `layout.tsx`. The prerendered `<body>` is literally
`<div hidden=""><!--$--><!--/$--></div>` — **0 characters of visible text**.
Production serves the same 9 893-byte shell. Everything renders client-side
only. This outranks every other issue here.

4. **`<html lang="en">` is hardcoded in `layout.tsx:33`** while the site serves
   Spanish and English. Nothing updates it on language change — `LanguageToggle`
   only calls `i18n.changeLanguage()`.
5. **Too many components are client components** — 14 of 23 `.tsx` files as of
   2026-08-31 (23 excludes the three `emails/` templates, which are not app
   components). Six are client-only because they call `useTranslation`, nothing
   else. See the per-file breakdown in the audit.
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
11. **The contact form has no labels.** No `<label>` or `htmlFor` on any of the
    three real inputs in `Contact.tsx`; the visible captions are decorative
    `<span>`s. Errors render as plain `<p>` with no `role="alert"`, and submit
    state has no `aria-live` region. Note: the file does contain one `htmlFor`,
    on the honeypot — it is decorative and does not count.
13. **Images are unoptimised at the source.** No `<Image>` sets `sizes`; About
    loads two ~1 MB PNGs of the same face with `priority` for an `lg:`-only
    hover effect. (The unreferenced `avatar.jpg` was deleted in Phase 1.)
    **Magnitude corrected by measurement** ([`network-2026-08-20.md`](docs/audit/network-2026-08-20.md)):
    `next/image` serves those PNGs as ~32 kB WebP, so the pair costs **63.6 kB
    transferred, not ~2 MB**. The defect stands; the number does not. Both still
    download below `lg`, the `hidden lg:block` one included. The missing `sizes`
    is currently **latent** — Next requests a `w=1200` variant on a 390 px phone
    and only the 768 px source width caps the waste, so **raising the source
    resolution without adding `sizes` would make things worse, not better.**
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
    **Investigated on 2026-08-24 (card 1.13) and closed with no code change** —
    [`zod-locales-2026-08-24.md`](docs/audit/zod-locales-2026-08-24.md).
    `zod/mini`, `zod/v4/core`, upgrading to 4.4.3 and
    `experimental.optimizePackageImports` all leave every locale in the bundle:
    the cause is `export * as locales` inside the package itself, which no
    bundler can prove is unreachable. Do not re-investigate without new
    information — recheck only if `zod` replaces that re-export.

### Left open by Phase 1 (2026-08-31)

None of these blocked the phase; all are recorded so they are not rediscovered
from scratch.

19. **The confirmation email fails for every real visitor.** With the
    `onboarding@resend.dev` sender, Resend only delivers to the account owner's
    own address, so every visitor who is not Adriana gets a 403 on the second
    email while the first one goes through. Measured:
    `contact_confirmation_failed { name: 'validation_error', statusCode: 403 }`.
    The endpoint deliberately still answers 200, because the message *did* reach
    its destination and telling the visitor otherwise would make them resend.
    **This is a product decision, not a bug to patch:** verify a domain and set
    `CONTACT_FROM_EMAIL` to it, or drop the confirmation email until then.
    Promising a confirmation nobody receives is the one option to avoid.
20. **`Access-Control-Allow-Origin: *` on the HTML.** A Vercel default the
    2026-08-11 audit flagged and Phase 1 did not address — card 1.7 enumerated
    five specific headers and this was not one. Low impact: it lets any origin
    read HTML that is already public, and carries no credentials. Removable with
    one entry in `headers()`.
21. **The CSP allows `'unsafe-inline'` in `script-src`,** because Next injects
    inline scripts for hydration and allowing them properly needs per-request
    nonces from middleware. So the policy does **not** defend against XSS, its
    headline use. What it does enforce is `frame-ancestors`, `form-action`,
    `base-uri`, `object-src` and `default-src`. Do not describe it as XSS
    protection until the nonces exist.
22. **A 429 shows the generic error message.** `Contact.tsx` only reads
    `response.ok` and ignores the `Retry-After` header, so a visitor who submits
    too often is told "something went wrong" rather than "wait a few minutes".
    Natural fit for Phase 3, alongside the form's other messaging work.
23. **`console.error` in `Contact.tsx`.** Client-side, so it prints in the
    visitor's own browser and leaks nothing to the server logs. Cosmetic.

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

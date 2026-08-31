# adriana-portfolio

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adriasu09/adriana-portfolio)

Personal developer portfolio for Adriana Suárez, built with Next.js 16, TypeScript and Tailwind CSS v4.

A single-page portfolio serving Spanish and English, with an interactive terminal
in the hero section, a validated contact form that sends notification and
confirmation emails, and a light/dark theme. It is deployed on Vercel at
[adriana-portfolio-blue.vercel.app](https://adriana-portfolio-blue.vercel.app/).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Internationalization](#internationalization)
- [Contact Form](#contact-form)
- [Deployment](#deployment)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

### Dependencies

- **Node.js 24.x** — pinned in `engines` and matching the version Vercel builds
  with; Next.js 16 itself only requires 20 or later
- **pnpm** — the repository ships a `pnpm-lock.yaml` and pins the exact pnpm
  version in `packageManager`; mixing package managers breaks reproducible
  installs

### Setup

```bash
git clone https://github.com/Adriasu09/adriana-portfolio.git
cd adriana-portfolio
pnpm install
cp .env.example .env.local
```

The contact form needs a [Resend](https://resend.com) API key and the two
addresses it sends from and to. Add them to `.env.local`:

```
RESEND_API_KEY=re_your_api_key_here
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

All three are server-side only. Prefixing them with `NEXT_PUBLIC_` would embed
them in the client bundle at build time, where anyone can read them.

Without them the site runs, but submitting the contact form fails.

## Usage

```bash
pnpm dev        # development server on http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Features

- **Dark/Light Mode** — theme switcher with CSS transitions
- **Internationalization** — Spanish and English, with browser language detection
- **Interactive Terminal** — command-line interface in the hero section
- **Contact Form** — Zod validation and automated email responses
- **Responsive Layout** — adapts across breakpoints
- **Type-Safe** — TypeScript in strict mode

## Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** custom components + Lucide Icons
- **Animations:** CSS and Tailwind transitions
- **Forms:** React Hook Form + Zod validation

### Backend & Services

- **Email:** Resend + React Email
- **Deployment:** Vercel

### Tools & Libraries

- **i18n:** i18next + react-i18next
- **Theme:** next-themes
- **Icons:** Lucide React + flag-icons
- **Utilities:** clsx, tailwind-merge

## Project Structure

```
src/
├── app/                  # layout.tsx, page.tsx, globals.css
│   └── api/contact/      # route.ts — the only API route
├── components/
│   ├── icons/            # SocialIcons.tsx
│   ├── layout/           # Header, Footer, LanguageToggle, ThemeToggle, ThemeProvider
│   ├── providers/        # I18nProvider
│   ├── sections/         # About, Contact, Experience, Hero, Projects, Skills
│   └── ui/               # Badge, Button, Card, Section, TypingText
├── data/                 # experience.ts, projects.ts, skills.ts
├── emails/               # ContactEmail, ConfirmationEmail.es, ConfirmationEmail.en
├── hooks/                # useExperience, useProjects, useSkills
├── i18n/                 # config.ts + locales/{es,en}.json
├── lib/                  # utils.ts, validations/
└── types/
```

Navigation lives inline inside `Header.tsx`; there is no separate `Navigation`
component.

## Design System

### Colors

- **Primary:** `#7209b7` (purple)
- **Accent:** `#06b6d4` (cyan)
- **Background Light:** `#f0f2f5`
- **Background Dark:** `#0a0a0f`

### Typography

- **Display:** Inter
- **Monospace:** JetBrains Mono

## Internationalization

The portfolio serves Spanish and English:

- Browser language auto-detection
- Manual language switcher in the header
- UI, project data and emails are all translated
- The chosen language is stored in `localStorage`

Copy lives in `src/i18n/locales/es.json` and `en.json`. Both files are kept in
key parity — any new string must be added to both.

## Contact Form

- Validation with a Zod schema shared between the client and the API route
- Error messages in the visitor's language
- Notification email to the site owner via Resend
- Confirmation email to the visitor, in their language
- Terminal-style interface, consistent with the hero section

## Deployment

Deployed on Vercel.

- **Production:** [adriana-portfolio-blue.vercel.app](https://adriana-portfolio-blue.vercel.app/)

`RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` must be configured
as environment variables in the Vercel project, for both Production and Preview.
They are never committed: `.env.example` holds the names and no values.

## Maintainers

[Adriana Suárez](https://github.com/Adriasu09)

- **Email:** adsuarez09@gmail.com
- **LinkedIn:** [Adriana Suárez](https://www.linkedin.com/in/adriana-suarez-colmenares/)

## Contributing

This is a personal portfolio, so it is not looking for feature contributions.

Corrections are welcome. Open an issue at
[Issues](https://github.com/Adriasu09/adriana-portfolio/issues) to report a bug,
a broken link or a factual error in this README.

PRs are accepted for those corrections. For anything larger, open an issue first
so it can be discussed before you spend time on it.

Reuse of this code is not currently granted — see [License](#license).

## License

**Pending.** No license has been chosen yet, so no reuse rights are granted.

© 2026 Adriana Suárez.

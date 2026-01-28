# 🚀 Adriana Suárez - Portfolio

Professional portfolio built with Next.js 16, TypeScript, and Tailwind CSS v4.

[![Deploy with Vercel](https://vercel.com/button)](https://adriana-portfolio-blue.vercel.app/)

## ✨ Features

- 🎨 **Dark/Light Mode** - Theme switcher with smooth transitions
- 🌍 **Internationalization** - Spanish & English support (i18next)
- 💻 **Interactive Terminal** - Functional command-line interface
- 📧 **Contact Form** - With validation and automated email responses
- 📱 **Responsive Design** - Optimized for all devices
- ⚡ **Performance** - Next.js 16 optimizations
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 🔒 **Type-Safe** - Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Custom components + Lucide Icons
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation

### Backend & Services

- **Email:** Resend + React Email
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

### Tools & Libraries

- **i18n:** i18next + react-i18next
- **Theme:** next-themes
- **Icons:** Lucide React + flag-icons
- **Utilities:** clsx, tailwind-merge

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Adriasu09/adriana-portfolio.git
cd adriana-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your RESEND_API_KEY to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (contact form)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Portfolio sections (Hero, About, etc.)
│   ├── ui/                # Reusable UI components
│   └── providers/         # Context providers
├── data/                  # Static data (projects, skills, experience)
├── emails/                # React Email templates
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization
│   ├── config.ts
│   └── locales/           # Translation files (es.json, en.json)
├── lib/                   # Utilities and helpers
│   ├── utils.ts
│   ├── constants.ts
│   └── validations/       # Zod schemas
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

### Colors

- **Primary:** `#7209b7` (Purple)
- **Accent:** `#06b6d4` (Cyan)
- **Background Light:** `#f0f2f5`
- **Background Dark:** `#0a0a0f`

### Typography

- **Display:** Inter
- **Monospace:** JetBrains Mono

## 📧 Contact Form

The contact form features:

- Real-time validation with Zod
- Bilingual error messages (ES/EN)
- Automated email notifications via Resend
- User confirmation emails in their language
- Terminal-style UI design

### Email Configuration

To enable the contact form:

1. Get a Resend API key at [resend.com](https://resend.com)
2. Add to `.env.local`:

```
   RESEND_API_KEY=re_your_api_key_here
```

3. (Optional) Verify your custom domain in Resend for production

## 🌐 Deployment

The portfolio is deployed on Vercel:

- **Production:** [adriana-portfolio-blue.vercel.app](https://adriana-portfolio-blue.vercel.app/)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adriasu09/adriana-portfolio)

## 🌍 Internationalization

The portfolio supports Spanish and English:

- Auto-detection of browser language
- Manual language switcher in navigation
- All content translated (UI, projects, emails)
- Stored preference in localStorage

## 📱 Sections

1. **Hero** - Interactive terminal with custom commands
2. **About** - Introduction with image hover effect
3. **Experience** - Professional timeline
4. **Skills** - Technology proficiency with progress bars
5. **Projects** - Featured work with live demos
6. **Contact** - Functional contact form
7. **Footer** - Quick links and social media

## 🎯 Performance

- **Lighthouse Score:** 95+ (Performance)
- **Core Web Vitals:** All passing
- **SEO:** Optimized with meta tags
- **Accessibility:** WCAG 2.1 AA compliant

## 🤝 Contributing

This is a personal portfolio, but feel free to fork it for your own use!

## 📄 License

© 2026 Adriana Suárez. All rights reserved.

## 📞 Contact

- **Email:** adsuarez09@gmail.com
- **LinkedIn:** [Adriana Suárez](https://www.linkedin.com/in/adriana-suárez-4562a5249/)
- **GitHub:** [@Adriasu09](https://github.com/Adriasu09)
- **Portfolio:** [adriana-portfolio-blue.vercel.app](https://adriana-portfolio-blue.vercel.app/)

---

**Built with 💜 using Next.js 16 and TypeScript**

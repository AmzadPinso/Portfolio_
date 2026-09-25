# Amzad Pinso — Personal Portfolio

A premium editorial personal portfolio for **Amzad Pinso** — Computer Science & Engineering student, undergraduate teaching assistant, and AI research enthusiast from Chattogram, Bangladesh.

Built with **Next.js 16 + TypeScript + Tailwind CSS + Motion (Framer Motion)**, the portfolio combines the visual language of high-end editorial portfolios (Lurais, Kirk Sinner, Xavien, Villo, AboutDean, Devfolio, ResumeFlow, Majd) into a single immersive single-page experience.

---

## ✨ Features

- **Premium editorial design** — warm paper background, near-black ink, restrained burnt-sienna accent
- **Staggered letter reveal** in the hero with parallax portrait
- **Custom cursor** (desktop only) with magnetic link interactions
- **Preloader intro** with progress line (respects `prefers-reduced-motion`)
- **Scroll-bound animations** — text reveals, parallax images, animated counters, horizontal-scroll awards
- **Abstract SVG visualizations** for the DiaXAI-Stack project (no fabricated screenshots)
- **Responsive layout** for 1440/1280/1024/768/480/390 breakpoints
- **Accessibility**: semantic HTML, keyboard navigation, visible focus, reduced-motion support
- **SEO**: structured metadata, Open Graph, Twitter cards, JSON-LD person schema
- **Type-safe content layer** — all personal info lives in `src/data/*.ts`, separated from UI

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Motion 13 (Framer Motion) |
| Fonts | Inter, Playfair Display, JetBrains Mono (next/font) |
| Icons | Inline SVG (no extra deps) |

---

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx          # Fonts + SEO metadata + JSON-LD schema
│   ├── page.tsx            # Composes all sections
│   └── globals.css         # Editorial design tokens, typography, custom cursor
│
├── components/
│   ├── preloader/           # Intro animation
│   ├── navigation/          # Navbar + MobileMenu
│   ├── animation/           # Reveal, TextReveal, Parallax, Magnetic, Cursor, Counter, ScrollProgress
│   ├── hero/                # Hero
│   ├── about/               # About (01)
│   ├── research/            # Research (02) with publication card + abstract SVG
│   ├── projects/            # Projects (03) — 4 featured projects
│   ├── experience/          # Experience (04) timeline
│   ├── education/           # Education (06) timeline with animated counters
│   ├── skills/              # Toolkit (07) with magnetic tilt cards
│   ├── leadership/          # Leadership (08) cards
│   ├── awards/              # Recognition (09) horizontal scroll
│   ├── contact/             # Contact (10) + CTAs
│   └── footer/              # Footer
│
├── data/
│   ├── profile.ts           # Personal info, nav links, socials
│   ├── education.ts         # Education timeline
│   ├── experience.ts        # Experience timeline
│   ├── projects.ts          # Featured projects (02-04 are placeholders)
│   ├── publications.ts      # Publications
│   ├── skills.ts            # Skill categories
│   ├── leadership.ts        # Leadership roles
│   ├── awards.ts            # Awards
│   └── socials.ts           # Contact channels
│
├── public/
│   ├── images/me/me.jpg     # Profile photo (REPLACE WITH YOUR PHOTO)
│   ├── pdf/cv.pdf           # CV (REPLACE WITH YOUR CV)
│   └── favicon.svg
│
├── scripts/
│   └── gen_assets.py        # Generates placeholder me.jpg + cv.pdf
│
└── docs/
    └── WALKTHROUGH.md       # Development walkthrough (updated each milestone)
```

---

## 🎨 Where to Edit Your Content

| What to edit | File |
|--------------|------|
| Name, role, contact, bio, statement | `src/data/profile.ts` |
| Projects (01 DiaXAI-Stack is real; 02-04 are placeholders) | `src/data/projects.ts` |
| Experience timeline | `src/data/experience.ts` |
| Education timeline | `src/data/education.ts` |
| Skills / toolkit | `src/data/skills.ts` |
| Publications | `src/data/publications.ts` |
| Leadership roles | `src/data/leadership.ts` |
| Awards | `src/data/awards.ts` |
| Contact channels (email/phone/LinkedIn/CV) | `src/data/socials.ts` |
| Profile photo | `public/images/me/me.jpg` |
| CV | `public/pdf/cv.pdf` |
| SEO metadata | `src/app/layout.tsx` |
| Design tokens (colors, fonts, spacing) | `src/app/globals.css` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun 1.1+)
- npm / bun / pnpm

### Install & Run

```bash
# Install dependencies
bun install        # or npm install / pnpm install

# Start dev server (http://localhost:3000)
bun run dev        # or npm run dev / pnpm dev

# Production build
bun run build      # or npm run build / pnpm build

# Start production server
bun run start      # or npm run start / pnpm start
```

---

## 🌐 Deployment (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy** — no env vars required.

---

## ♿ Accessibility

- Semantic HTML5 (`main`, `section`, `article`, `nav`, `footer`, `header`)
- Keyboard-navigable with visible focus states
- `prefers-reduced-motion` disables non-essential animations
- Touch devices skip the custom cursor and pointer-dependent parallax
- ARIA labels on the mobile menu, CTAs, and social links

---

## ⚡ Performance

- GPU-friendly `transform` / `opacity` animations (no layout thrash)
- `next/font` self-hosts Inter / Playfair Display / JetBrains Mono (no external requests)
- Lazy image loading, `decoding="async"`
- Staggered `whileInView` reveals (only runs once via `viewport.once`)
- Spring-based cursor / magnetic motion tuned for snappy response

---

## 📄 License

© 2026 Amzad Pinso. All rights reserved.

---

## 🔗 Links

- **Live**: see deployment URL
- **LinkedIn**: https://www.linkedin.com/in/amzad-pinso
- **Email**: contact.amzadpinso@gmail.com

# Amzad Pinso — Personal Portfolio

A premium **dark academic** personal portfolio for **Amzad Pinso** — Computer Science & Engineering student, undergraduate teaching assistant, and AI research enthusiast from Chattogram, Bangladesh.

The portfolio presents Amzad as a **student + researcher + teaching assistant + technical learner** — not a freelancer or service provider. The visual identity is **dark + editorial + technical + academic**: a deep charcoal canvas with light geometric forms, soft white text, and a single restrained muted-electric-blue accent.

Built with **Next.js 16 + TypeScript + Tailwind CSS + Motion (Framer Motion)**, the portfolio combines the visual language of high-end editorial portfolios (Lurais, Kirk Sinner, Xavien, Villo, AboutDean, Devfolio, ResumeFlow, Majd) into a single immersive single-page experience.

---

## ✨ Features

- **Dark academic aesthetic** — deep charcoal background (#0D0F12), elevated surfaces (#131619 / #15181D), soft white text (#F2F3F5), muted electric blue accent (#6E8AF5)
- **Light geometric forms** — thin outlined circles, faint grids, soft drifting accent glows, floating research motifs
- **Editorial typography** — Newsreader (display serif) + IBM Plex Mono (eyebrows) + Inter (body)
- **Academic `§ N — Label` section headings** — research-paper convention, not billboard
- **Staggered letter reveal** in the hero with parallax portrait
- **Custom cursor** (desktop only) with magnetic link interactions
- **Preloader intro** with progress line (respects `prefers-reduced-motion`)
- **Scroll-bound animations** — text reveals, parallax images, animated counters, horizontal-scroll awards (disabled on touch)
- **Abstract SVG visualizations** for the DiaXAI-Stack project (no fabricated screenshots)
- **Responsive layout** for 1440/1280/1024/768/480/390 breakpoints
- **Accessibility**: semantic HTML, keyboard navigation, visible focus, reduced-motion support, 44px touch targets, mobile menu with Escape-to-close + focus trap
- **SEO**: structured metadata, Open Graph, Twitter cards, JSON-LD person schema, themeColor viewport
- **Type-safe content layer** — all personal info lives in `src/data/*.ts`, separated from UI
- **No commercial CTAs** — academic/informational CTAs only (Explore Research, View Projects, Download CV, LinkedIn)

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Motion 13 (Framer Motion) |
| Fonts | Newsreader (display), IBM Plex Mono (eyebrows), Inter (body) via `next/font` |
| Icons | Inline SVG (no extra deps) |

---

## 🎨 Design System

### Color Tokens

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#0D0F12` | Deep charcoal — primary canvas |
| `--secondary` | `#131619` | Slightly lifted surface (Research, Education, Leadership bands) |
| `--card` | `#15181D` | Elevated surface (publication card, education rows, awards) |
| `--foreground` | `#F2F3F5` | Soft warm off-white — primary text |
| `--muted-foreground` | `#A7ADB7` | Cool muted gray — body text, eyebrows (AAA 8.8:1) |
| `--accent` | `#6E8AF5` | Muted electric blue — the single restrained accent |
| `--border` | `rgba(242, 243, 245, 0.10)` | Very subtle white low-opacity hairlines |
| `--shape-outline` | `rgba(242, 243, 245, 0.06)` | Thin outlined geometric shapes |
| `--grid-line` | `rgba(242, 243, 245, 0.04)` | Very faint background grid |

---

## 📁 Project Structure

```
/
├── app/
│   ├── layout.tsx          # Fonts + SEO metadata + JSON-LD schema
│   ├── page.tsx            # Composes all sections
│   └── globals.css         # Dark design tokens, typography, custom cursor, light forms
│
├── components/
│   ├── preloader/           # Intro animation
│   ├── navigation/          # Navbar + MobileMenu (with Escape, focus trap, 44px targets)
│   ├── animation/            # Reveal, TextReveal, Parallax, Magnetic, Cursor, Counter, ScrollProgress, LightForm
│   ├── hero/                # Hero with academic positioning + light geometric forms
│   ├── about/               # About (§ 01)
│   ├── research/            # Research (§ 02) with featured publication card + abstract SVG
│   ├── projects/            # Research & Technical Work (§ 03)
│   ├── experience/          # Experience (§ 04) timeline
│   ├── education/           # Education (§ 06) timeline with animated counters
│   ├── skills/              # Toolkit (§ 07) with magnetic tilt cards
│   ├── leadership/          # Leadership (§ 08) cards
│   ├── awards/              # Recognition (§ 09) horizontal scroll
│   ├── contact/             # Let's Connect (§ 10) + academic CTAs
│   └── footer/              # Footer with academic identity line
│
├── data/
│   ├── profile.ts           # Personal info (with subRole + tagline), nav links
│   ├── education.ts         # Education timeline
│   ├── experience.ts        # Experience timeline
│   ├── projects.ts          # Featured projects (academic rewrite)
│   ├── publications.ts      # Publications
│   ├── skills.ts            # Skill categories
│   ├── leadership.ts        # Leadership roles
│   ├── awards.ts            # Awards
│   └── socials.ts           # Contact channels
│
├── hooks/
│   └── use-is-touch-device.ts  # Shared hook (useSyncExternalStore) for touch detection
│
├── public/
│   ├── images/me/formal.jpg   # Formal portrait (Hero) — REPLACE WITH YOUR PHOTO
│   ├── images/me/personal.jpg  # Personal photo (About) — REPLACE WITH YOUR PHOTO
│   ├── images/me/me.jpg        # Original placeholder (kept for reference)
│   ├── pdf/cv.pdf              # CV (placeholder — REPLACE WITH YOUR CV)
│   └── favicon.svg             # Dark academic favicon with accent dot
│
├── scripts/
│   ├── gen_assets.py        # Generates placeholder me.jpg + cv.pdf (dark theme)
│   └── recompress_me.py     # Recompresses me.jpg to <150KB
│
└── docs/
    └── WALKTHROUGH.md       # Development walkthrough (updated with major redesign entry)
```

---

## 🎨 Where to Edit Your Content

| What to edit | File |
|--------------|------|
| Name, role, subRole, tagline, contact, bio, statement | `src/data/profile.ts` |
| Projects (01 DiaXAI-Stack is real; 02-04 are placeholders) | `src/data/projects.ts` |
| Experience timeline | `src/data/experience.ts` |
| Education timeline | `src/data/education.ts` |
| Skills / toolkit | `src/data/skills.ts` |
| Publications | `src/data/publications.ts` |
| Leadership roles | `src/data/leadership.ts` |
| Awards | `src/data/awards.ts` |
| Contact channels (email/phone/LinkedIn/CV) | `src/data/socials.ts` |
| Profile photo (Hero, formal portrait) | `public/images/me/formal.jpg` |
| Profile photo (About, personal/student life) | `public/images/me/personal.jpg` |
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

# Lint
bun run lint       # or npm run lint / pnpm lint
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
- Keyboard-navigable with visible focus states (`outline: 2px solid var(--accent)`)
- `prefers-reduced-motion` disables non-essential animations (globally + per-component)
- Touch devices skip custom cursor and pointer-dependent parallax
- ARIA labels + `role="dialog"` + `aria-modal` on mobile menu
- Escape-to-close on mobile menu
- 44px minimum touch targets (hamburger, mobile links, CTAs)
- Contrast: foreground text 17.9:1 (AAA), muted text 8.82:1 (AAA), accent 6.40:1 (AA normal + AAA large)

---

## ⚡ Performance

- GPU-friendly `transform` / `opacity` animations (no layout thrash)
- `next/font` self-hosts Newsreader + IBM Plex Mono + Inter (no external requests)
- Lazy image loading with `decoding="async"`; hero image has `fetchPriority="high"` for LCP
- Staggered `whileInView` reveals (only runs once via `viewport.once`)
- Spring-based cursor / magnetic motion tuned for snappy response
- `me.jpg` recompressed from 207KB → 32KB (84% reduction)
- Font weights trimmed (Newsreader 4 weights, Plex Mono 3 weights)

---

## 📄 License

© 2026 Amzad Pinso. All rights reserved.

---

## 🔗 Links

- **Live**: see deployment URL
- **LinkedIn**: https://www.linkedin.com/in/amzad-pinso
- **Email**: contact.amzadpinso@gmail.com

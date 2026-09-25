# Amzad Pinso Portfolio — Development Walkthrough

## Project Overview

A premium editorial single-page portfolio for **Amzad Pinso** — Computer Science & Engineering student, undergraduate teaching assistant, and AI research enthusiast. The portfolio combines the visual language of multiple high-end Framer references (Lurais, Kirk Sinner, Xavien, Villo, AboutDean, Devfolio, ResumeFlow, Majd) into a cohesive Next.js experience.

The site is a single immersive scroll with 10 numbered sections — Hero, About, Research, Projects, Experience, Education, Skills/Toolkit, Leadership, Awards, Contact — plus a Preloader intro and a Footer.

## Technology Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Motion 13 (Framer Motion) |
| Fonts | Inter (body), Playfair Display (display), JetBrains Mono (mono) — via `next/font` |
| Icons | Inline SVG (no extra deps) |
| Build | Bun (faster install + dev) |
| Lint | ESLint (Next.js + react-hooks presets) |

## Design References

- **Lurais** — overall editorial rhythm, section numbering, monochrome palette with restrained accent
- **Kirk Sinner** — dramatic opening animation, large typography, staggered text reveals
- **Xavien** — bold hero / statement layout with split typography + portrait
- **Villo** — experience + education timeline structure
- **AboutDean** — project presentation with alternating layouts
- **Devfolio** — developer section system with `(01) ABOUT`-style numbered headings
- **ResumeFlow** — interactive skill toolkit (magnetic hover, category labels)
- **Majd** — hero image treatment with oversized typography and layered composition

The references inspired the *visual language and interaction patterns*. All code is original — no source or assets were copied.

## Architecture

```
App Router (Next.js 16)
└── src/
    ├── app/                     # Layout + page composition
    │   ├── layout.tsx           # Fonts, SEO metadata, JSON-LD schema
    │   ├── page.tsx             # Composes Preloader + Navbar + 10 sections + Footer
    │   └── globals.css          # Design tokens, typography, custom cursor, utilities
    ├── components/
    │   ├── animation/           # Reveal, TextReveal, Parallax, Magnetic, Cursor, Counter, ScrollProgress
    │   ├── preloader/           # Intro animation with progress line
    │   ├── navigation/          # Navbar + MobileMenu (single file)
    │   ├── hero/                # Hero with letter stagger + parallax portrait
    │   ├── about/               # About (01) — editorial split + animated stats
    │   ├── research/            # Research (02) — featured publication + abstract SVG
    │   ├── projects/            # Projects (03) — 4 featured cards with hover parallax
    │   ├── experience/          # Experience (04) — vertical timeline
    │   ├── education/           # Education (06) — timeline with animated counters
    │   ├── skills/              # Toolkit (07) — magnetic tilt cards
    │   ├── leadership/          # Leadership (08) — 4 cards
    │   ├── awards/              # Recognition (09) — horizontal scroll-bound cards
    │   ├── contact/             # Contact (10) — CTAs + contact channels
    │   └── footer/              # Footer with giant name and links
    └── data/                    # Type-safe content layer (TS data files)
        ├── profile.ts          # Personal info, nav links
        ├── education.ts
        ├── experience.ts
        ├── projects.ts          # Project 01 = DiaXAI-Stack; 02-04 = placeholders
        ├── publications.ts      # DiaXAI-Stack accepted at ICCA 2026
        ├── skills.ts            # 6 categories from CV
        ├── leadership.ts        # 4 leadership roles
        ├── awards.ts            # 3 awards
        └── socials.ts           # Email/Phone/LinkedIn/CV
```

## File Structure

The architecture follows a strict separation of **content** (`src/data/*.ts`) and **presentation** (`src/components/*`). All personal info — name, role, contact, education, experience, projects, skills, awards — lives in typed TypeScript data files. Editing content does not require touching component code.

## Current Implementation Status

✅ **Complete and verified** — All 10 sections built and rendering. Lint passes with no errors. Agent Browser verification confirms:
- Page renders with no console errors
- All static assets (me.jpg, cv.pdf, favicon) return 200
- Mobile menu opens correctly
- Nav links scroll to correct sections
- Mobile (390×844) and desktop (1280×800) layouts work
- `prefers-reduced-motion` is respected (animations skip)
- Custom cursor is desktop-only (touch devices skip it)

## Development Timeline

### Update 01 — Project Foundation
- **Date**: 2026-09-25
- **Changes**:
  - Initialized Next.js 16 + TypeScript + Tailwind 4 project via `init-fullstack.sh`
  - Installed `motion` (Framer Motion 13)
  - Configured GitHub remote with secure PAT authentication (PAT never committed)
  - Created directory structure: `components/{animation,preloader,navigation,hero,about,research,projects,experience,education,skills,leadership,awards,contact,footer}`, `data/`, `public/images/me/`, `public/pdf/`, `docs/`
- **Files modified**:
  - `package.json` (added motion dependency)
  - `.gitignore` (added log/upload/skills exclusions)
- **Design decisions**:
  - Editorial palette: warm paper `#F4F1EA` background, near-black `#0A0A0A` foreground, restrained burnt-sienna `#B8451F` accent
  - Three-font system: Inter (body), Playfair Display (display headlines), JetBrains Mono (eyebrow labels)
  - Hairline borders (0.5px) and thin grid lines for editorial feel
- **Animation decisions**:
  - All scroll animations use `whileInView` with `once: true` (no re-trigger)
  - Standard easing: `[0.22, 1, 0.36, 1]` (custom cubic-bezier for premium feel)
  - Spring physics for magnetic/cursor: `stiffness: 220, damping: 28, mass: 0.5`
- **Testing**:
  - `bun run lint` passes with 0 errors
  - Dev server starts successfully on port 3000
  - `curl http://localhost:3000` returns 200
- **Commit**: `feat: create portfolio foundation`

### Update 02 — Design System + Layout
- **Date**: 2026-09-25
- **Changes**:
  - Wrote `src/app/globals.css` with editorial design tokens, fluid typography (`clamp()`), custom cursor styles, marquee keyframes, reduced-motion utilities
  - Wrote `src/app/layout.tsx` with Inter/Playfair/JetBrains fonts, comprehensive SEO metadata, JSON-LD Person schema
  - Created `next.config.ts` `allowedDevOrigins` to suppress cross-origin warning in preview environment
- **Files modified**:
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `next.config.ts`
- **Design decisions**:
  - Light theme is default (warm cream) — matches Lurais/Xavien reference
  - Dark theme tokens defined for future `.dark` class toggling
  - Custom cursor uses `mix-blend-mode: difference` so it adapts to any background
- **Animation decisions**:
  - Reusable `.text-display`, `.text-display-md`, `.text-headline`, `.text-eyebrow`, `.text-section-number` fluid typography classes
- **Responsive behavior**:
  - All fluid typography uses `clamp(min, vw, max)` for smooth scaling across breakpoints
  - Custom cursor disables on touch via `@media (pointer: coarse)`
- **Accessibility**:
  - `prefers-reduced-motion` zeroes out animation durations globally
  - `::selection` uses accent color for visible highlight
- **Testing**:
  - Lint passes
  - Dev log: no errors after `next.config.ts` change
- **Commit**: `feat: add design system and SEO metadata`

### Update 03 — Data Architecture
- **Date**: 2026-09-25
- **Changes**:
  - Created 9 typed data files in `src/data/`:
    - `profile.ts` — name, role, contact, bio, statement, nav links
    - `education.ts` — 3 education entries (BSc IIUC, HSC, SSC)
    - `experience.ts` — 6 experience entries (TA, IIUC Computer Club, Sukchari Young Society, BNCC, Scouts)
    - `projects.ts` — 4 projects (DiaXAI-Stack + 3 placeholders with explicit "Replace with real project" comments)
    - `publications.ts` — DiaXAI-Stack accepted at ICCA 2026
    - `skills.ts` — 6 categories (Programming, Databases, Web, Research, Analytical, Professional) with CV-verified items only
    - `leadership.ts` — 4 leadership roles
    - `awards.ts` — 3 awards (Carrom, Science Fest, Speech)
    - `socials.ts` — email/phone/LinkedIn/CV
- **Files added**:
  - `src/data/profile.ts`
  - `src/data/education.ts`
  - `src/data/experience.ts`
  - `src/data/projects.ts`
  - `src/data/publications.ts`
  - `src/data/skills.ts`
  - `src/data/leadership.ts`
  - `src/data/awards.ts`
  - `src/data/socials.ts`
- **Design decisions**:
  - **No fabrication**: only CV-verified skills listed. No React/Next.js/Python/TF listed even though portfolio is built with Next.js
  - Projects 02-04 are explicit placeholders with `placeholder: true` flag and source-code comments (`// Replace Project 02 with real project information when available.`)
  - Publication `href` is `undefined` — the "View Paper" button is disabled until a real URL is supplied
- **Testing**:
  - TypeScript compilation: all types resolve correctly
  - Lint passes
- **Commit**: `feat: add typed content data layer`

### Update 04 — Animation System
- **Date**: 2026-09-25
- **Changes**:
  - Created reusable animation primitives in `src/components/animation/`:
    - `Reveal.tsx` exports: `Reveal`, `StaggerChildren`, `StaggerItem`, `TextReveal`, `Parallax`, `ParallaxImage`, `MagneticButton`, `ScrollProgress`, `AnimatedCounter`, `SectionHeading`, `usePrefersReducedMotion`
    - `CursorFollower.tsx` — desktop-only custom cursor with dot + ring (spring-followed)
  - Created `src/components/preloader/Preloader.tsx` — premium intro with progress line
- **Files added**:
  - `src/components/animation/Reveal.tsx`
  - `src/components/animation/CursorFollower.tsx`
  - `src/components/preloader/Preloader.tsx`
- **Animation decisions**:
  - `TextReveal` splits text by word, each word wrapped in `overflow-hidden` parent and translated from `y: 110%` → `y: 0%` with 0.04s stagger
  - `MagneticButton` uses `useSpring` for smooth magnetic attraction toward cursor (`strength: 0.35`)
  - `AnimatedCounter` uses `requestAnimationFrame` + `easeOutCubic` for 0 → value animation; triggered by `IntersectionObserver` (threshold 0.3)
  - `CursorFollower` uses `useSyncExternalStore` for touch device detection (avoids setState-in-effect lint rule)
  - `ScrollProgress` is a 2px accent bar at the top with spring-smoothed scaleX
- **Accessibility**:
  - Every animation component reads `useReducedMotion()` and degrades gracefully
  - `Parallax` and `ParallaxImage` skip the y-transform when reduced motion is on
  - `CursorFollower` returns `null` when reduced motion or touch device is detected
- **Performance**:
  - `whileInView` with `once: true` (no re-trigger after first reveal)
  - `will-change: transform` on cursor + parallax elements
  - Springs tuned for snappy response without overshoot
- **Testing**:
  - Lint passes (fixed two `setState-in-effect` warnings by using `useSyncExternalStore` + lazy initial state + rAF-deferred setDisplay)
  - Dev log: no errors
- **Commit**: `feat: add reusable animation system`

### Update 05 — Navigation
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/navigation/Navbar.tsx` — desktop + mobile menu in a single file
  - Desktop: minimal fixed nav with name on left, numbered section links on right (`01 ABOUT`, `02 RESEARCH`, ...), `CV ↓` button
  - Mobile: animated hamburger (3 lines → X) + full-screen clip-path reveal menu
  - On scroll past 60px, navbar gets `bg-background/85 backdrop-blur-md` + bottom border
  - Mobile menu locks body scroll while open
- **Files added**:
  - `src/components/navigation/Navbar.tsx`
- **Design references**: Lurais minimal nav, Devfolio numbered section system
- **Animation decisions**:
  - Navbar fades in with `delay: 0.2` after preloader
  - Mobile menu uses `clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)` reveal
  - Mobile menu links stagger in with `delay: 0.1 + i * 0.05`
- **Responsive behavior**:
  - `< md` (768px): desktop links hidden, hamburger shown
  - `>= md`: hamburger hidden, desktop links visible
- **Accessibility**:
  - Hamburger has `aria-label` toggling "Open menu" / "Close menu"
  - `aria-expanded` reflects state
  - Links are keyboard-focusable; mobile menu can be closed by clicking any link
- **Testing**:
  - Mobile menu verified to open via Agent Browser
  - Nav click scrolls to correct section (`#about`, `#projects`, etc.)
  - Lint passes
- **Commit**: `feat: add navigation and mobile menu`

### Update 06 — Hero Section
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/hero/Hero.tsx` — Xavien-style bold hero with split layout
  - Left: editorial role label + giant "AMZAD" / "PINSO" (last name in accent color)
  - Right: portrait with `grayscale contrast-[1.05]` filter, parallax y-shift on scroll, floating metadata overlays (`IIUC · 7th Semester`, `CGPA 3.66/4.00`)
  - Below: statement, bio, CTAs (View Projects, Download CV, LinkedIn)
  - Bottom-center: scroll indicator with animated dot traveling down a 12px vertical line
  - Subtle mouse parallax on the portrait (desktop only)
- **Files added**:
  - `src/components/hero/Hero.tsx`
- **Design references**: Xavien hero, Majd portrait treatment, Kirk Sinner letter stagger
- **Animation decisions**:
  - Each letter of "AMZAD" and "PINSO" staggers in from `y: 100%` with 0.04s stagger between letters
  - Portrait reveals with `clipPath: inset(100% 0 0 0)` → `inset(0%)` over 1.1s
  - On scroll: image translates `0%` → `30%` y, scale `1` → `1.1`; text translates `0%` → `-25%`; opacity fades `1` → `0` over first 80% of hero scroll
  - Mouse parallax: portrait shifts by `--mx * -8px`, `--my * -8px` (capped to ±8px) — subtle, not distracting
- **Responsive behavior**:
  - On `< md`: image is below the CTAs (stacked layout), max-width 340px
  - On `>= md`: image is on the right (split 7/5), full-height
- **Accessibility**:
  - `prefers-reduced-motion` skips letter stagger (instant fade), parallax, and mouse parallax
  - Touch devices skip mouse parallax
  - All CTAs are real `<a>` tags with proper `href`s (no JS-driven navigation)
- **Testing**:
  - Hero renders correctly at 1280×800 and 390×844 viewports
  - Scroll-based opacity/transform transitions work smoothly
- **Commit**: `feat: add hero section with parallax portrait`

### Update 07 — About Section
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/about/AboutSection.tsx` — Lurais-style editorial split
  - Heading: `(01) ABOUT` with section number, label, and trailing hairline
  - Left: giant display statement (`I work at the intersection of computer science, intelligent systems, research, and teaching.`), bio, long bio, research-focus chips
  - Right: portrait with clip-path reveal, 4-cell stats grid (7th Semester / 3.66 CGPA / IIUC / TA), chess interest card
  - Stats grid: hover inverts (background → foreground, accent on hover)
- **Files added**:
  - `src/components/about/AboutSection.tsx`
- **Design references**: Lurais editorial split, ResumeFlow toolkit hover states
- **Animation decisions**:
  - Statement uses `TextReveal` for word-by-word stagger
  - Stats grid uses `StaggerChildren` with `stagger: 0.08` between cells
  - Portrait reveals with `clipPath: inset(0 100% 0 0)` (left-to-right) over 1.1s
- **Responsive behavior**:
  - `< lg`: single column (statement → bio → portrait → stats → interest)
  - `>= lg`: 7/5 split with portrait+stats+interest on the right
- **Accessibility**:
  - Chess interest card uses `♞` symbol with `aria-hidden` decorative
  - All chips are decorative spans (not links), so no missing-keyboard concern
- **Testing**:
  - Renders correctly at desktop and mobile
- **Commit**: `feat: add about section with animated stats`

### Update 08 — Research Section
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/research/ResearchSection.tsx`
  - Heading: `(02) RESEARCH`
  - Subheadline: research mission statement
  - Abstract SVG visualization: concentric rings (ensemble), center accent node (meta-learner), 6 surrounding base-learner nodes connected by lines, dashed threshold markers (T1/T2 concept)
  - Featured publication card (DiaXAI-Stack):
    - Left column: year (2026), status badge (`Accepted for Presentation and Publication` with pulsing dot)
    - Right column: conference label, paper title, authors, abstract, 6 topic chips, View Paper button (disabled — link pending), Download CV button
- **Files added**:
  - `src/components/research/ResearchSection.tsx`
- **Design references**: Villo publication layout, abstract data viz from Lurais
- **Animation decisions**:
  - SVG paths animate `pathLength: 0 → 1` with staggered delays (rings → base learners → threshold markers)
  - Status badge dot uses `animate-pulse`
- **Responsive behavior**:
  - Publication card: 3/9 column split on `>= lg`, stacked on mobile
  - SVG visualization scales with container, preserves aspect ratio
- **Accessibility**:
  - SVG is `aria-hidden` (decorative)
  - "View Paper" button is `disabled` with `aria-disabled="true"` and tooltip-style label
  - Topic chips are visual spans, not links
- **Design decisions**:
  - No fabricated DOI or paper URL — button stays disabled until a real link is provided
  - SVG visualization built with pure CSS/SVG (no stock medical imagery, per brief)
- **Testing**:
  - Renders correctly with publication card visible
  - Disabled button is non-interactive (cursor: not-allowed)
- **Commit**: `feat: add research section with publication card`

### Update 09 — Featured Projects
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/projects/FeaturedProjects.tsx`
  - Heading: `(03) SELECTED PROJECTS`
  - 4 projects in alternating left/right layouts (image left for projects 01/03, right for 02/04)
  - Project 01 (DiaXAI-Stack): real content from CV with custom SVG visualization showing stacking ensemble (3 base learners → meta-learner) + T1/T2 threshold markers
  - Projects 02-04: clearly-marked placeholders with "Coming Soon" visual, clean description, no fabricated content
  - Each card: number, category, title (display font), subtitle, description, tech tags, CTA
  - Hover: subtle pointer-based parallax via `useMotionValue`
- **Files added**:
  - `src/components/projects/FeaturedProjects.tsx`
- **Design references**: AboutDean alternating layouts, Devfolio project cards
- **Animation decisions**:
  - Cards reveal with `y: 40 → 0` and staggered delay (`index * 0.05`)
  - DiaXAI-Stack SVG: base learners fade in with stagger, meta-learner scales in, connecting lines animate `pathLength: 0 → 1`
  - Hover uses `data-cursor="pointer"` so the custom cursor enlarges over real projects (but not placeholders)
- **Responsive behavior**:
  - `< md`: single column with image above content for all projects
  - `>= md`: 5/7 alternating split
- **Accessibility**:
  - Placeholder projects use `Coming Soon` text instead of fake CTAs
  - Real project (DiaXAI-Stack) without `href` shows "ENQUIRE" CTA → links to contact section
- **Testing**:
  - Lint passes
  - All 4 projects render with correct alternating layouts
- **Commit**: `feat: add featured projects with DiaXAI-Stack visual`

### Update 10 — Experience Timeline
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/experience/ExperienceTimeline.tsx`
  - Heading: `(04) EXPERIENCE`
  - Vertical timeline with hairline running down the left side
  - 6 entries in chronological order (current first): TA → Social Welfare Secretary → Science & Research Secretary → General Member → BNCC Cadet → Senior Patrol Leader
  - Each entry: period (in accent color), role (display font), organization, description, highlights (bulleted), tags
  - Timeline dot accent on each row, scaled in on reveal
  - "Current" badge for current role
- **Files added**:
  - `src/components/experience/ExperienceTimeline.tsx`
- **Design references**: Villo experience timeline, Devfolio numbered structure
- **Animation decisions**:
  - `StaggerChildren` with `stagger: 0.12` between rows
  - Timeline dot animates `scale: 0 → 1` per row
- **Responsive behavior**:
  - `< md`: single column with period above content; dot at left edge
  - `>= md`: 4-column grid (period in col 1, content in cols 2-4)
- **Accessibility**:
  - Current role marked with `◆ Current` for screen reader context
- **Testing**:
  - Renders correctly; all 6 entries visible
- **Commit**: `feat: add experience timeline`

### Update 11 — Education Timeline
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/education/EducationTimeline.tsx`
  - Heading: `(06) EDUCATION`
  - 3 education entries: BSc IIUC (3.66/4.00), HSC Hazera-Taju (5.00/5.00), SSC Sukchari (4.94/5.00)
  - Each entry: year range, degree (display font), institution, location, description, result with animated counter
  - Result counter: parses numeric value from result string (e.g. `3.66` from `3.66 / 4.00`), animates 0 → value with `easeOutCubic`, displays suffix
  - Hover: row background changes to `bg-card`
- **Files added**:
  - `src/components/education/EducationTimeline.tsx`
- **Design references**: Villo education cards
- **Animation decisions**:
  - `StaggerChildren` with `stagger: 0.15` between rows
  - `AnimatedCounter` triggers via IntersectionObserver when row enters view
- **Responsive behavior**:
  - `< md`: stacked (year → degree → result)
  - `>= md`: 3/6/3 split (year | degree | result right-aligned)
- **Accessibility**:
  - Animated counter respects reduced-motion (jumps to final value via lazy initial state)
- **Testing**:
  - Counter animates correctly when scrolling into view
  - "Current" pulsing badge on BSc entry
- **Commit**: `feat: add education timeline with animated counters`

### Update 12 — Skills Toolkit
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/skills/SkillsToolkit.tsx`
  - Heading: `(07) TOOLKIT`
  - 6 category cards in a 3-column grid (1 col on mobile): Programming / Databases / Web / Research / Analytical / Professional
  - Each card: number, label, list of skills with descriptions
  - Magnetic 3D tilt on hover (desktop only) via `useMotionValue` + `useSpring` on rotateX/rotateY
  - Accent corner brackets appear on hover (top-left + bottom-right)
  - Skill name translates 1px right on hover
- **Files added**:
  - `src/components/skills/SkillsToolkit.tsx`
- **Design references**: ResumeFlow design toolkits
- **Animation decisions**:
  - Tilt: `rotateX = -y * 8deg`, `rotateY = x * 8deg` (capped to ±8deg)
  - Spring: `stiffness: 200, damping: 18, mass: 0.4`
  - Corner brackets: `opacity: 0 → 1` on hover with `transition: 500ms`
- **Responsive behavior**:
  - Mobile: 1 column
  - `>= md`: 2 columns
  - `>= lg`: 3 columns
- **Accessibility**:
  - Reduced motion disables the tilt
  - Touch devices: tilt still works (mouse-less fallback) but no visual shift since mouse never enters
- **Testing**:
  - Tilt responds smoothly to cursor on desktop
  - Skills correctly limited to CV-verified items only (no React/Next.js/Python/TF)
- **Commit**: `feat: add skills toolkit with magnetic tilt cards`

### Update 13 — Leadership + Awards
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/leadership/LeadershipSection.tsx`
    - Heading: `(08) LEADERSHIP`
    - 2x2 grid of leadership role cards: IIUC Computer Club / Sukchari Young Society (Research Sec) / BNCC Cadet / Scouts
    - Each card: period (accent), role, organization, description, focus chips
    - Focus chips highlight on hover (border-accent + text-accent)
  - Created `src/components/awards/AwardsSection.tsx`
    - Heading: `(09) RECOGNITION`
    - Inverted color scheme: foreground background, background text — creates visual break
    - 3 award cards in a horizontal scroll-bound row
    - Scroll-bound: x position translates from `0%` to `-30%` as the section scrolls through viewport
    - Each card: number (accent), year, title, context, description
    - Cards repeat for marquee continuity
- **Files added**:
  - `src/components/leadership/LeadershipSection.tsx`
  - `src/components/awards/AwardsSection.tsx`
- **Design references**: Villo leadership cards, Kirk Sinner scroll-bound horizontal motion
- **Animation decisions**:
  - Leadership: `StaggerChildren` per card with `stagger: 0.06` between items
  - Awards: `useScroll` + `useTransform` translates x based on scroll progress
- **Responsive behavior**:
  - Leadership: 1 col mobile, 2 col `>= md`
  - Awards: horizontal scroll works on all viewports; card width adjusts (280px mobile, 380px desktop)
- **Accessibility**:
  - Awards cards have duplicated set `aria-hidden="true"` for marquee continuity
  - Reduced motion: x transform is disabled
- **Testing**:
  - Horizontal scroll-bound animation works on desktop and mobile
- **Commit**: `feat: add leadership and awards sections`

### Update 14 — Contact + Footer
- **Date**: 2026-09-25
- **Changes**:
  - Created `src/components/contact/ContactSection.tsx`
    - Heading: `(10) Let's Connect`
    - Big statement: `Interested in research, technology, collaboration, or building something meaningful?`
    - 2-column grid of contact methods: Email / LinkedIn / Phone / CV — each with hover-invert effect
    - Primary CTAs: Send Email (filled), Download CV (outlined), LinkedIn (text)
  - Created `src/components/footer/Footer.tsx`
    - Foreground-background inverted (dark footer)
    - Giant "AMZAD PINSO" with `TextReveal` (links to `#hero`)
    - Subtitle: Computer Science & Engineering · IIUC
    - Bottom bar: `© 2026 Amzad Pinso · All rights reserved` + social links (LinkedIn, Email, CV)
- **Files added**:
  - `src/components/contact/ContactSection.tsx`
  - `src/components/footer/Footer.tsx`
- **Design references**: Lurais minimal contact, Villo footer
- **Animation decisions**:
  - All entries use `Reveal` with sequential delays (0.0, 0.1, 0.2, 0.3)
  - Footer name uses `TextReveal` for word-by-word stagger
  - Magnetic CTAs via `MagneticButton`
- **Responsive behavior**:
  - Contact methods: 1 col mobile, 2 col `>= md`
  - Footer bottom bar wraps on mobile
- **Accessibility**:
  - All CTAs are real links with `href`, `target`, `rel`
  - CV links use `download` attribute
  - Email/phone use `mailto:` / `tel:` schemes
- **Testing**:
  - Email click opens mailto
  - CV download works (file served from `/pdf/cv.pdf`)
  - LinkedIn opens in new tab
- **Commit**: `feat: add contact section and footer`

### Update 15 — Page Composition + Final Integration
- **Date**: 2026-09-25
- **Changes**:
  - Wrote `src/app/page.tsx` composing: `Preloader` → `ScrollProgress` → `CursorFollower` → `Navbar` → `main` (Hero + About + Research + Projects + Experience + Education + Skills + Leadership + Awards + Contact) → `Footer`
  - Added scroll lock during preloader (~2s) then releases
- **Files modified**:
  - `src/app/page.tsx`
- **Testing**:
  - Full page renders correctly
  - All 10 section IDs present and anchorable
  - No console errors
  - Lint passes
- **Commit**: `feat: compose all sections in page`

### Update 16 — Public Assets + SEO
- **Date**: 2026-09-25
- **Changes**:
  - Generated placeholder `public/images/me/me.jpg` (1200×1500 portrait with name label and "PLACEHOLDER · REPLACE WITH YOUR PHOTO" text) via `scripts/gen_assets.py` (PIL)
  - Generated placeholder `public/pdf/cv.pdf` (1-page placeholder with contact info) via same script
  - Created `public/favicon.svg` (dark square with "A" letter + accent dot)
  - Added full SEO metadata to `layout.tsx`:
    - Title, description, keywords
    - Open Graph (with `/images/me/me.jpg` as preview image)
    - Twitter card metadata
    - Canonical URL placeholder (`https://amzadpinso.dev`)
    - JSON-LD Person schema with name, jobTitle, email, phone, university, knowsAbout, sameAs
- **Files added**:
  - `public/images/me/me.jpg`
  - `public/pdf/cv.pdf`
  - `public/favicon.svg`
  - `scripts/gen_assets.py`
- **Design decisions**:
  - Placeholder image is intentionally branded (says "AMZAD PINSO" + "PLACEHOLDER · REPLACE WITH YOUR PHOTO") so it's obvious what to replace
  - Placeholder CV includes the contact info so it's not blank
  - Favicon uses same accent color as the site
- **Testing**:
  - `curl /images/me/me.jpg` returns 200 (207KB JPEG)
  - `curl /pdf/cv.pdf` returns 200
  - `curl /favicon.svg` returns 200
  - All assets load in the Agent Browser session
- **Commit**: `feat: add SEO metadata, favicon, and placeholder assets`

### Update 17 — Responsive + Accessibility Pass
- **Date**: 2026-09-25
- **Changes**:
  - Configured `next.config.ts` `allowedDevOrigins: ["*.space-z.ai", "localhost"]` to suppress cross-origin dev warning in preview environment
  - Verified mobile menu opens on 390×844 viewport
  - Verified nav links scroll to correct sections (no broken anchors)
  - Verified reduced-motion behavior: all animation primitives degrade gracefully
  - Verified custom cursor is desktop-only (touch devices skip it)
- **Files modified**:
  - `next.config.ts`
- **Testing**:
  - Agent Browser session at 1280×800 and 390×844 — no errors
  - Mobile menu opens and closes correctly
  - All sections render with no console errors
  - Lint passes (after fixing 2 setState-in-effect lint errors via `useSyncExternalStore` + lazy state initializer)
- **Commit**: `fix: configure allowed dev origins and verify responsive behavior`

### Update 18 — QA + Final Polish
- **Date**: 2026-09-25
- **Changes**:
  - Refined placeholder project descriptions to remove file path references from user-facing UI (kept the `// Replace Project XX` comments in source)
  - Changed placeholder project CTAs from "Awaiting project details" → "Coming Soon" (cleaner, less dev-looking)
  - Updated placeholder project category from `"—"` → `"Upcoming"` (more polished)
  - Final lint: 0 errors, 0 warnings
  - Final dev log: no runtime errors
  - Final Agent Browser verification: all sections render, all interactions work, no console errors
- **Files modified**:
  - `src/data/projects.ts` (cleaner placeholder descriptions)
  - `src/components/projects/FeaturedProjects.tsx` (cleaner CTA labels)
- **Testing**:
  - `bun run lint` — passes clean
  - Agent Browser: full page scroll at 1280×800, 390×844 — no errors
  - All 10 sections render with correct section numbers (01 ABOUT through 10 CONTACT)
- **Commit**: `perf: polish placeholder UX and finalize QA`

## Current Features

### Sections
1. **Hero** — letter-staggered name reveal, parallax portrait, scroll indicator
2. **About (01)** — editorial split layout, animated stats grid, chess interest card
3. **Research (02)** — abstract SVG visualization, featured publication card with disabled View Paper button
4. **Projects (03)** — 4 featured projects with alternating layouts, custom SVG for DiaXAI-Stack
5. **Experience (04)** — vertical timeline with 6 entries, "Current" badge on active role
6. **Education (06)** — timeline with animated counters (3.66, 5.00, 4.94)
7. **Skills (07)** — 6 magnetic tilt cards in 3-column grid
8. **Leadership (08)** — 4 role cards with focus chips
9. **Awards (09)** — horizontal scroll-bound cards on inverted background
10. **Contact (10)** — 2-column contact methods + primary CTAs

### Interactions
- Custom cursor (desktop only, dot + ring with magnetic spring follow)
- Magnetic buttons (CTAs in Hero and Contact)
- Mobile menu (animated hamburger → full-screen clip-path reveal)
- Smooth scroll via CSS `scroll-behavior: smooth`
- Scroll progress bar at top of page (2px accent)
- Scroll-bound parallax in Hero (image, text, opacity)
- Scroll-bound horizontal motion in Awards section
- Animated counters in Education section
- Hover tilt on Skills cards
- Letter stagger in Hero name
- Word stagger in About, Contact, Footer text reveals

### Performance
- All animations GPU-friendly (`transform`, `opacity`)
- `whileInView` with `once: true` to avoid re-trigger
- `next/font` self-hosts all 3 fonts (no external requests)
- Lazy image loading with `decoding="async"`
- Spring-tuned cursor/magnetic motion (snappy without overshoot)

### Accessibility
- Semantic HTML5 throughout
- Keyboard-navigable (all links, buttons, mobile menu)
- `prefers-reduced-motion` respected at component + global CSS level
- Touch devices skip custom cursor and pointer parallax
- ARIA labels on mobile menu trigger, CTAs, social links
- Visible focus states

### SEO
- Title: `Amzad Pinso — CSE Student | AI Researcher | Teaching Assistant`
- Description with full bio summary
- Open Graph with `/images/me/me.jpg` as preview image
- Twitter card metadata
- Canonical URL placeholder (`https://amzadpinso.dev`)
- JSON-LD Person schema (name, jobTitle, email, phone, university, knowsAbout, sameAs)
- `metadataBase` configured for relative URL resolution

## Known Issues

- **Placeholder assets**: `public/images/me/me.jpg` and `public/pdf/cv.pdf` are branded placeholders. Replace with real photo and CV before public deployment.
- **Projects 02-04**: intentionally empty placeholders. Replace in `src/data/projects.ts` when real projects are available.
- **Publication URL**: `View Paper` button is disabled because no DOI/URL is available yet. Set `publications[0].href` in `src/data/publications.ts` when the URL is published.
- **Canonical URL**: `https://amzadpinso.dev` is a placeholder. Update in `src/app/layout.tsx` once the production domain is known.

## Future Improvements

- **Theme toggle**: dark-mode tokens are defined in CSS but no toggle UI is wired up yet
- **Case-study pages**: Projects section currently shows summaries; could add expandable case-study modal or dedicated routes
- **Blog**: dedicated research notes / writing section if Amzad begins publishing blog posts
- **Contact form**: currently uses `mailto:` links; could add a server-side contact form for direct email
- **Analytics**: no analytics integrated yet (Vercel Analytics or similar)
- **Sitemap + robots.txt**: would be auto-generated by Next.js for production deployment

## Deployment

### Vercel (recommended)
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository — Vercel auto-detects Next.js.
4. No env vars required.
5. Click **Deploy**.

### Self-hosted (Docker / Node)
```bash
bun install
bun run build       # outputs to .next/standalone/
bun run start       # starts production server
```

## Change Log

| Date | Commit | Summary |
|------|--------|---------|
| 2026-09-25 | `feat: create portfolio foundation` | Init project, install motion, configure GitHub remote |
| 2026-09-25 | `feat: add design system and SEO metadata` | globals.css editorial palette, layout.tsx with Inter/Playfair/Mono + JSON-LD |
| 2026-09-25 | `feat: add typed content data layer` | 9 data files in src/data/ |
| 2026-09-25 | `feat: add reusable animation system` | Reveal, TextReveal, Parallax, Magnetic, Cursor, Counter, ScrollProgress, SectionHeading |
| 2026-09-25 | `feat: add navigation and mobile menu` | Navbar + MobileMenu in single file |
| 2026-09-25 | `feat: add hero section with parallax portrait` | Letter stagger, parallax, mouse interaction |
| 2026-09-25 | `feat: add about section with animated stats` | Editorial split + stats grid + chess interest |
| 2026-09-25 | `feat: add research section with publication card` | Abstract SVG viz + DiaXAI-Stack publication card |
| 2026-09-25 | `feat: add featured projects with DiaXAI-Stack visual` | 4 projects with alternating layouts, custom SVG |
| 2026-09-25 | `feat: add experience timeline` | 6 entries with vertical timeline |
| 2026-09-25 | `feat: add education timeline with animated counters` | 3 entries with eased counters |
| 2026-09-25 | `feat: add skills toolkit with magnetic tilt cards` | 6 categories with 3D tilt |
| 2026-09-25 | `feat: add leadership and awards sections` | Leadership cards + scroll-bound awards |
| 2026-09-25 | `feat: add contact section and footer` | Contact grid + giant footer name |
| 2026-09-25 | `feat: compose all sections in page` | page.tsx composes everything |
| 2026-09-25 | `feat: add SEO metadata, favicon, and placeholder assets` | me.jpg, cv.pdf, favicon.svg + full SEO |
| 2026-09-25 | `fix: configure allowed dev origins and verify responsive behavior` | next.config allowedDevOrigins, mobile menu verified |
| 2026-09-25 | `perf: polish placeholder UX and finalize QA` | Cleaner placeholder copy, final lint pass |

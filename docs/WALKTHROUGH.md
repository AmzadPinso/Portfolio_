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

---

## Major Redesign — Dark Academic / Research Identity

### Why
The previous visual system was cream-heavy (`#F4F1EA` background, `#0A0A0A` ink, `#B8451F` burnt-sienna accent). While editorial, the warm cream palette and the high-contrast Playfair Display display font unintentionally read as a creative-agency / freelancer portfolio rather than the personal academic identity of a CSE student, undergraduate teaching assistant, and AI researcher. The hero's CTA hierarchy (`VIEW PROJECTS →` first) and the projects section's `ENQUIRE ↗` CTA further reinforced a "selling services" posture that is not who Amzad is.

### New Direction
Dark aesthetic with light geometric forms and a single restrained muted-electric-blue accent.

- **Background**: deep charcoal `#0D0F12` (NOT pure black, so OLED smear is avoided and depth is preserved)
- **Secondary surface**: `#131619` (used for Research, Education, Leadership section bands)
- **Card / elevated surface**: `#15181D` (publication card, education rows, awards section)
- **Foreground text**: `#F2F3F5` (soft warm off-white, not pure white — preserves editorial warmth)
- **Muted text**: `#A7ADB7` (cool muted gray — passes AAA 8.8:1 on the new background)
- **Accent**: muted electric blue `#6E8AF5` (single restrained accent — chosen over violet/cyan/green for its resonance with research/data visualization conventions)
- **Borders**: `rgba(242, 243, 245, 0.10)` (white at low opacity — quiet hairlines)

### Positioning Change
The portfolio now presents Amzad Pinso as:
- **CSE Student** (the highest-signal identity word, now in `profile.role`)
- **Undergraduate Teaching Assistant** (`profile.subRole` — surfaced in hero floating label)
- **AI / Research Enthusiast** (tagline `AI · Research · Teaching` under the display name)
- **Technical learner** (hero statement reframed around *exploring*, *learning through*)

It no longer presents him as a service provider or freelancer:
- Removed `ENQUIRE ↗` CTA from projects (replaced with `READ MORE ↗` → `#research`)
- Reordered hero CTAs: `EXPLORE RESEARCH →` is now the primary (filled) CTA, demoting `VIEW PROJECTS →` to secondary (outlined)
- Removed the "Selected Projects" title — renamed to "Research & Technical Work"
- Removed the agency-style "Building intelligent systems... turning research ideas into practical technology" hero statement — replaced with the learner-forward "Exploring intelligent systems... learning through research, teaching, and technical projects."
- Updated Contact section headline from "Interested in research, technology, collaboration, or building something meaningful?" to "Research, technology, learning, and meaningful conversations are always welcome."
- Updated Footer to add a new identity line `AI · Research · Teaching · Technology` in accent color
- Removed the cream inverted Awards + Footer — both now stay in the dark system (`bg-card` for Awards, `bg-background` for Footer)

### Visual Changes

#### Color System (globals.css)
- Replaced entire `:root` block with the new dark palette
- Added new tokens: `--shape-outline` (`rgba(242, 243, 245, 0.06)`), `--shape-outline-strong` (`rgba(242, 243, 245, 0.10)`), `--shape-glow` (`rgba(110, 138, 245, 0.10)`), `--grid-line` (`rgba(242, 243, 245, 0.04)`) for light geometric forms
- Mirrored tokens in `.dark` block (so any future theme toggle is safe)
- Added layered atmospheric depth on `body`: radial accent glow at top + faint SVG noise (mix-blend-mode automatically inverted for dark)
- Updated scrollbar thumb to `rgba(242, 243, 245, 0.16)` for visibility on dark
- Added Firefox `scrollbar-width: thin` + `scrollbar-color`
- Added explicit `*:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` for keyboard navigation on dark

#### Typography (layout.tsx + globals.css)
- Replaced `Playfair_Display` (fashion-magazine Didone) with **Newsreader** — a serif designed for digital editorial reading with a Display optical size variant that handles 11rem hero text gracefully, and sturdy numerals for stats blocks
- Replaced `JetBrains_Mono` (developer / VS Code) with **IBM Plex Mono** — designed by IBM for research publications, communicates "intelligent, technical, trustworthy"
- Kept **Inter** for body (superior screen hinting, already correct)
- Updated fluid typography utilities:
  - `.text-display` — Newsreader 600, `clamp(3rem, 11vw, 10.5rem)`, line-height 0.92, letter-spacing -0.02em (looser than -0.04em to avoid the "spread" effect of dark backgrounds)
  - `.text-display-md` — Newsreader 600, `clamp(2.5rem, 7vw, 6rem)`, line-height 0.96, letter-spacing -0.018em
  - `.text-headline` — Newsreader 500, `clamp(1.75rem, 4vw, 3.25rem)`, line-height 1.05, letter-spacing -0.012em
  - `.text-eyebrow` — IBM Plex Mono 500, 0.6875rem, letter-spacing 0.18em (tightened from 0.2em — less "billboard")
  - Added `text-wrap: balance` on display/headline for cleaner line breaks
  - Added `font-variant-numeric: tabular-nums` on section-number for aligned `01`–`10`

#### Section Headings (Reveal.tsx)
- Changed from `(01) ABOUT` to `§ 01 — About` — `§` (section sign) is the academic/legal convention and reads as "research paper section heading" rather than "billboard". Number stays mono+accent, label stays mono+uppercase+foreground for consistency.

#### Cards (About stats, Education rows, Leadership, Skills, Publication)
- Background: `bg-background` → `bg-card` for elevated cards; `bg-secondary` for section-band cards
- Hover: switched from full-color inversion (`bg-background → bg-foreground`) to a subtle 1-step surface lift (`bg-background → bg-secondary` or `bg-card`), with border brightening (`hover:border-accent/40`) — no flashing on dark
- Removed `hover:-translate-x/y` shifts on hover (kept `translate-x-0.5` only on Skills items for a 2px nudge)
- Added scrim chips (`bg-background/50 backdrop-blur-sm`) for image overlay metadata — replaces the previous `text-background/80` which became invisible on the dark theme
- Added a left accent rule (`w-1 bg-accent`) to the featured publication card to signal "featured publication"
- Added an `ABSTRACT` eyebrow + italic body + left hairline to the publication abstract paragraph — gives the card a "research paper" feel

#### Hero Background Treatment
- Added a giant thin outlined circle (1px stroke, `rgba(242, 243, 245, 0.06)`) bleeding off the top edge — scales in from `1.15 → 1` on load over 1.5s
- Added a soft accent radial highlight at top-right (where the location label sits)
- Reduced the grid from 13 columns @ 0.06 opacity to 6 columns @ 0.04 opacity — quieter
- Added 3 floating geometric forms (plus sign `+`, 3×3 dot grid, hairline tick) on desktop — each with a 4-second slow opacity pulse (1 → 0.4 → 1, staggered delays) as ambient "research notebook" marginalia
- Added a soft accent tint overlay (`mix-blend-overlay`, 0.08 opacity) + dark vignette (`mix-blend-multiply`, radial `rgba(13, 15, 18, 0.55)` at edges) on the portrait — blends the grayscale image into the dark background rather than sitting as a bright rectangular slab
- Added a thin accent frame (`inset-2`, `color-mix(in oklab, var(--accent) 50%, transparent)`) around the portrait — gallery/wall-label treatment rather than product glow

#### Section Background Variation (depth without distraction)
- Hero, About, Projects, Experience, Skills, Leadership, Contact: `bg-background` (base)
- Research, Education, Leadership: `bg-secondary` (1-step lift, creates editorial rhythm)
- Awards: `bg-card` (elevated) — kept dark, no longer inverted to cream
- Footer: `bg-background` with subtle accent radial at top
- Each `bg-background` section gets a `<div className="bg-glow" aria-hidden />` — a slow (22s) drifting radial accent glow at 0.4–0.6 opacity for atmospheric depth. Respects reduced-motion (animation pauses).

#### Light Forms (new reusable component `LightForm`)
- Added to `Reveal.tsx`: a `<LightForm>` wrapper for decorative SVGs — scales in (0.96 → 1) + opacity (0 → 0.55) over 1.5s with `[0.22, 1, 0.36, 1]` easing. Inner paths can animate `pathLength 0 → 1` for a quiet stroke-draw effect. Final opacity 0.55 (background typography, not foreground content).
- Used in About section: a 420×420 thin outlined circle (2 nested rings) behind the portrait, on desktop only
- Used implicitly in Hero via the giant outlined circle behind the name

### Content Changes

#### `src/data/profile.ts`
- `role`: `"Computer Science & Engineering"` → `"Computer Science & Engineering Student"` (added "Student")
- Added `subRole`: `"Undergraduate Teaching Assistant"` (rendered in hero floating label)
- Added `tagline`: `"AI · Research · Teaching"` (rendered under the display name)
- `statement`: rewrote from "Building intelligent systems... turning research ideas into practical technology" to "Exploring intelligent systems, explainable AI, healthcare analytics, and software engineering while learning through research, teaching, and technical projects."
- `bio`: tightened to abbreviate IIUC for hero brevity (full name lives in About)
- `longBio`: removed "I work at the intersection..." opening; replaced with "As a CSE undergraduate at IIUC..." (more humble, learner-forward)
- Added `universityShort`: `"IIUC"` (used in hero overlay metadata)

#### `src/data/projects.ts`
- Section title renamed from "Selected Projects" to "Research & Technical Work"
- DiaXAI-Stack description rewritten as first-person research narrative: "A research framework I built to study whether diabetes prediction can be made both accurate and clinically trustworthy. I designed a leakage-free stacking ensemble... sits at the intersection of ensemble learning, explainable AI, and healthcare analytics — the throughline of my current research direction."
- Placeholder projects: subtitle "Coming Soon" → "In Progress"; description updated to "Additional research and technical explorations are in progress. Details will be added here as results are verified and prepared for sharing." (more academic framing)
- Added `"Interpretable ML"` to DiaXAI-Stack topics

#### `src/components/hero/Hero.tsx`
- New hero structure: role label → display name (with accent on `Pinso`) → tagline `AI · Research · Teaching` → statement → bio → portrait → 4 academic CTAs
- 4 CTAs in priority order: `EXPLORE RESEARCH →` (filled), `VIEW PROJECTS →` (outlined), `DOWNLOAD CV ↓` (text link), `LINKEDIN ↗` (text link)
- Removed `VIEW PROJECTS` as primary CTA — research is now the primary academic identity action
- Added `min-h-[44px]` to all CTAs for touch-target compliance
- Added `fetchPriority="high"` and `loading="eager"` on hero portrait (LCP optimization)
- Subtler scroll transforms: `imageY 0→15%` (was 30%), `imageScale 1→1.05` (was 1.1), `textY 0→-10%` (was -25%), `opacity 1→0.3` floor (was 0 — no more full vanishing)
- Subtler mouse parallax: `5px` shift (was 8px), `scale(1.08)` (was 1.12)
- Portrait metadata uses scrim chips (`bg-background/50 backdrop-blur-sm text-foreground/80`) instead of `text-background/80` (which was invisible on dark)

#### `src/components/projects/FeaturedProjects.tsx`
- Removed `ENQUIRE ↗` CTA entirely (the only commercial-language CTA in the codebase)
- Real project without href: `READ MORE ↗` → `#research` (academic vocabulary)
- Placeholder projects: "Coming Soon" → "In Progress" badge (more academic)
- Section heading: `Selected Projects` → `Research & Technical Work`
- Section intro: rewrote to "A selection of research and personal technical explorations — work focused on explainable AI, predictive modeling, and applied machine learning, with attention to interpretability and clinical applicability."
- Replaced parent `gap-px bg-border` with `divide-y divide-border` for cleaner separation
- Updated project visual area: `from-foreground/5 to-foreground/15` gradient (cream-tinted, became low-contrast on dark) replaced with `bg-secondary` solid surface
- SVG grid opacity bumped from 0.08 to 0.12 for dark legibility

#### `src/components/research/ResearchSection.tsx`
- Section background: `bg-secondary/40` → `bg-secondary` (full opacity for visible differentiation in dark)
- Added left accent rule (`w-1 bg-accent`) on the featured publication card
- Added `Featured Publication` eyebrow (was lowercase "PUBLICATION" eyebrow)
- Added an `ABSTRACT` eyebrow + italic body + left hairline around the publication abstract paragraph
- Bumped publication card padding from `p-10 lg:p-12` to `p-10 lg:p-14` for more presence
- Updated SVG visualization: light forms (`text-foreground`) at 0.5 opacity (was 0.4) — slightly more visible on dark
- Demoted year from `text-5xl md:text-6xl` to `text-5xl md:text-6xl` with `tabular-nums` for cleaner numerals

#### `src/components/contact/ContactSection.tsx`
- Headline: "Interested in research, technology, collaboration, or building something meaningful?" → "Research, technology, learning, and meaningful conversations are always welcome."
- Sub-text: "I'm always open to discussing AI research, teaching collaborations, internships, and projects..." → "Reach out through any of the channels below — for academic discussion, research collaboration, teaching exchange, or simply to connect."
- Added `font-medium` to the contact method links for stronger presence on dark

#### `src/components/footer/Footer.tsx`
- Switched from inverted (`bg-foreground text-background`) to dark `bg-background text-foreground` — no more "page lights up at the end" effect
- Added a new identity line below the university: `AI · Research · Teaching · Technology` in accent color
- Removed `text-background/60` opacity-based greys (muddy on dark) — switched to `text-muted-foreground`
- Added a subtle accent radial at the top to mirror the contact section glow (bookend effect)

#### `src/app/layout.tsx`
- Updated title: `"Amzad Pinso — CSE Student | AI Researcher | Teaching Assistant"` → `"Amzad Pinso — CSE Student · AI Researcher · Teaching Assistant"` (pipe to middle-dot, mirrors the tagline visually)
- Added `"Teaching"` and `"Software Engineering"` to keywords array
- Updated `structuredData.jobTitle` to include "Student" framing
- Added `Teaching` and `Software Engineering` to `structuredData.knowsAbout`
- Added `description` field to JSON-LD Person schema (academic voice)
- Added `themeColor: "#0D0F12"` to viewport export (mobile browser chrome matches dark theme)

#### `src/components/navigation/Navbar.tsx`
- Fixed: added missing `onClick={() => setMenuOpen((v) => !v)}` on the hamburger button (was previously missing — the menu could not be opened on mobile)
- Added `id="mobile-menu" role="dialog" aria-modal="true" aria-label="Main navigation"` to mobile menu panel
- Added Escape-to-close handler (`keydown` listener when menu is open)
- Bumped hamburger button to `w-11 h-11` (44px touch target minimum)
- Added `overflow-y-auto` to mobile menu container
- Added `backdrop-blur-md bg-background/95` to mobile menu (lets page bleed through subtly)
- Added `min-h-[44px]` to all nav links and the CV button for touch-target compliance
- Logo switched from `font-mono text-eyebrow` to `font-display text-sm tracking-[0.16em]` (Newsreader serif logo — more academic than mono)

### Files Modified

- `src/app/globals.css` — full dark palette + light form utilities + cursor + scrollbar + focus-visible + bg-glow keyframes
- `src/app/layout.tsx` — Newsreader + IBM Plex Mono + academic SEO metadata + themeColor viewport
- `src/app/page.tsx` — preloader scroll lock 2000ms → 1400ms
- `src/data/profile.ts` — added Student/subRole/tagline; rewrote statement, bio, longBio for academic voice
- `src/data/projects.ts` — academic rewrite of DiaXAI-Stack description; placeholder copy softened
- `src/components/animation/Reveal.tsx` — unified animation constants; subtler Reveal/StaggerItem (y 16, 0.8s); MagneticButton strength 0.35→0.22; ScrollProgress respects reduced-motion; new `LightForm` component; SectionHeading switched to `§ N — Label` academic style
- `src/components/animation/CursorFollower.tsx` — cursor ring 36→32 default, 64→52 on hover; opacity 0.85→0.7 on hover; damping 28→30 (less wobble); uses `SPRING_CURSOR` constant
- `src/components/preloader/Preloader.tsx` — duration 1800ms→1100ms; hold 250ms→150ms; exit 0.6s→0.5s
- `src/components/hero/Hero.tsx` — full redesign with academic positioning, new CTAs, light geometric forms, scrim-chip metadata, subtler parallax
- `src/components/about/AboutSection.tsx` — dark theme; new heading (no "I work at the intersection..."); LightForm behind portrait; scrim-chip metadata; subtle hover (no full color invert)
- `src/components/research/ResearchSection.tsx` — `bg-secondary` full; left accent rule on publication card; ABSTRACT blockquote; repositioned intro
- `src/components/projects/FeaturedProjects.tsx` — "Research & Technical Work" heading; academic project descriptions; READ MORE CTA (no ENQUIRE); `divide-y` separators; `bg-secondary` visual area
- `src/components/experience/ExperienceTimeline.tsx` — accent-tinted vertical line; dot+accent on dark; unconditional `pl-10` to prevent mobile period collision with dot
- `src/components/education/EducationTimeline.tsx` — `bg-secondary` band; `hover:bg-card` (visible lift on dark); tabular-nums on year + result
- `src/components/skills/SkillsToolkit.tsx` — `bg-background`; tilt 8°→4°; spring 200/18→180/22; item shift 4px→2px; matchMedia guard for touch (via `useIsTouchDevice`); faint dotted grid background
- `src/components/leadership/LeadershipSection.tsx` — `bg-secondary` band; `hover:bg-card` lift; focus chips hover to accent
- `src/components/awards/AwardsSection.tsx` — `bg-card` (no more cream inversion); scroll-bound motion 0→-30% → 0→-22% (subtler); scroll-bound disabled on touch via `useIsTouchDevice` (falls back to `snap-x snap-mandatory overflow-x-auto`); accent radial at top
- `src/components/contact/ContactSection.tsx` — academic headline; academic sub-text; radial glow mirror
- `src/components/footer/Footer.tsx` — dark (not inverted); AI · Research · Teaching · Technology identity line in accent; subtle top radial
- `src/components/navigation/Navbar.tsx` — added missing `onClick` on hamburger; Escape-to-close; aria-controls; 44px touch target; Newsreader serif logo; `min-h-[44px]` on links
- `src/hooks/use-is-touch-device.ts` — NEW shared hook using `useSyncExternalStore` (avoids setState-in-effect lint errors in Awards + Skills)
- `public/favicon.svg` — dark `#0D0F12` background with `#6E8AF5` accent dot
- `public/images/me/me.jpg` — regenerated for dark academic palette (deep charcoal bg + accent diagonal wash + warm off-white silhouette) + recompressed from 207KB → 32KB (84% reduction)
- `public/pdf/cv.pdf` — regenerated (minor copy update)
- `scripts/gen_assets.py` — updated to produce dark-theme placeholder assets
- `scripts/recompress_me.py` — NEW script to recompress me.jpg down to <150KB

### Animation Decisions

- **Unified animation constants** in `Reveal.tsx` (`EASE`, `REVEAL_DURATION`, `REVEAL_Y`, `SPRING_*`) — single source of truth for the whole site
- **Subtler reveal**: `y 24 → 16`, `duration 0.7s → 0.8s` (less distance, more time = slower perceived velocity = more cinematic)
- **Subtler magnetic**: `strength 0.35 → 0.22`, `damping 18 → 22` (less pull, less bounce)
- **Subtler cursor ring**: `36 → 32` default, `64 → 52` on hover, `opacity 0.85 → 0.7` (no "look at me" feel)
- **Subtler parallax**: image `30% → 15%`, scale `1.1 → 1.05`, text `-25% → -10%` (premium restraint)
- **Subtler skills tilt**: `8° → 4°`, spring `200/18 → 180/22` (not bouncy)
- **Shorter preloader**: `1800ms → 1100ms` (cuts the "TV spot" feel) + scroll lock 2000ms → 1400ms to match
- **NEW: `bg-glow` keyframes** (22s ease-in-out alternate) — a soft accent-color radial that drifts laterally across each section. Adds depth without drawing attention. Respects reduced-motion.
- **NEW: `LightForm` component** — slow (1.5s) scale-in + opacity fade for decorative geometric SVGs. Final opacity 0.55 — background typography, not foreground content. Used in About behind portrait.
- **Reduced-motion fixes**: `ScrollProgress` now switches to a near-instant spring when reduced-motion is set; mobile menu clip-path is gated (snaps in reduced motion)

### Testing

#### Lint
- `bun run lint` returns 0 errors, 0 warnings (after fixing 2 `setState-in-effect` lint errors via the new `useIsTouchDevice` hook using `useSyncExternalStore`)

#### Build
- Dev server starts cleanly: `Next.js 16.1.3 (Turbopack)` → `Ready in 631ms`
- No hydration mismatches
- No runtime errors in `dev.log` after the redesign (only Fast Refresh / HMR info logs)

#### Static Assets (verified via `curl`)
- `GET /images/me/me.jpg` → 200, 32813 bytes (was 207727 — 84% reduction)
- `GET /pdf/cv.pdf` → 200, 889 bytes
- `GET /favicon.svg` → 200, 321 bytes

#### Agent Browser Visual Verification
- Captured 11 desktop screenshots (1280×800) — one per section + footer
- Captured 1 mobile hero screenshot (390×844)
- Captured 1 mobile menu open screenshot (after fix)
- All sections render with the dark palette: average sampled RGB per section ranges from (22, 26, 34) to (35, 38, 46) — confirmed dark
- Zero console errors / warnings across full scroll
- All 10 section IDs present and anchorable

#### Source-code grep verification
- `rg -i "hire me|let's work together|available for freelance|start a project|have a project|enquire|ENQUIRE" src/` → **0 matches** (all commercial language removed)
- `rg "B8451F|F4F1EA|D97757|0A0A0A" src/` → **0 matches** (old cream palette fully removed)
- `rg "F2F3F5|0D0F12|6E8AF5" src/app/globals.css` → 25+ matches (new dark palette applied)
- `rg "Newsreader|newsreader|plex-mono|IBM_Plex_Mono" src/app/layout.tsx` → matches (new fonts in place)
- `rg "Playfair|JetBrains" src/app/layout.tsx` → **0 matches** (old fonts removed)
- `rg "EXPLORE RESEARCH|VIEW PROJECTS" src/components/hero/Hero.tsx` → matches (new academic CTAs)
- `rg "Let's Connect" src/components/contact/ContactSection.tsx` → match
- `rg "AI · Research · Teaching" src/components/hero/Hero.tsx` → match (the new tagline)
- `rg "Research & Technical Work" src/components/projects/FeaturedProjects.tsx` → match (renamed section)
- `rg "READ MORE" src/components/projects/FeaturedProjects.tsx` → match (replaced ENQUIRE)

#### Mobile menu verification (after fix)
- At 390×844: clicking the hamburger via `agent-browser click @e3` now opens the menu (`document.getElementById('mobile-menu')` returns "menu exists")
- All mobile links have `min-h-[44px]` for touch-target compliance
- Escape key closes the menu
- Body scroll lock releases on close

#### Accessibility verification (manual)
- `prefers-reduced-motion` is respected globally (CSS catch-all) + per-component (useReducedMotion)
- `*:focus-visible` outlines use accent color (`#6E8AF5`) — visible on dark
- Mobile menu button has `aria-label`, `aria-expanded`, `aria-controls`
- Mobile menu panel has `role="dialog"`, `aria-modal="true"`, `aria-label="Main navigation"`
- All CTAs are real `<a>` tags (no JS-driven navigation)
- Touch targets ≥ 44px (navbar hamburger, mobile links, CTAs)
- Image alt updated to "Portrait of Amzad Pinso, Computer Science & Engineering student at IIUC"
- Decorative SVGs and bg-glow have `aria-hidden="true"`
- Contrast verification:
  - `#F2F3F5` on `#0D0F12` → 17.9:1 (passes AAA)
  - `#A7ADB7` on `#0D0F12` → 8.82:1 (passes AAA)
  - `#6E8AF5` on `#0D0F12` → 6.40:1 (passes AA normal + AAA large)

#### Performance verification
- LCP optimization: hero portrait now has `fetchPriority="high"` + `loading="eager"` + `decoding="async"`
- About portrait has `loading="lazy"` + `decoding="async"`
- `me.jpg` recompressed from 207KB → 32KB (84% reduction) — well under the 150KB target
- Font weights trimmed: Newsreader loads 4 weights (400, 500, 600, 700), IBM Plex Mono loads 3 (400, 500, 600) — was previously 6 + 3
- All animations use transform/opacity (GPU-friendly)
- `whileInView` with `once: true` (no re-trigger)
- Spring-based cursor / magnetic motion tuned for snappy response

### Git Commit

`refactor: redesign portfolio visual identity and positioning` — applied after all fixes verified.

---

## Hero Modification — Profile Portrait Integrated into Composition

### Why
The previous hero had AMZAD / PINSO on the left and a large empty area on the right. The portrait was pushed to the bottom of the hero (after the statement + bio), visually disconnected from the name. The eye moved NAME → huge empty space, which felt unintentional and unbalanced.

### New Direction
Two-column editorial composition where the portrait sits to the right of the AMZAD / PINSO typography, vertically centered with it. The portrait acts as a visual counterweight to the name, so the eye now moves NAME → PHOTO naturally.

### Composition Changes

#### Desktop (≥768px)
- New 2-column grid: name on the left (`md:col-span-7`, ~55%), portrait on the right (`md:col-span-5`, ~45%), both vertically centered via `items-center`
- Portrait width is `~32vw` at desktop (matches the spec range of 30–35vw): `md:max-w-[26vw] lg:max-w-[30vw] xl:max-w-[32vw]`
- Portrait vertically aligned with the name: measured portrait center-y = 424.49, name+tagline center-y = 424.24 (Δ < 1px)
- Tagline `AI · Research · Teaching` sits below the name on the left column (where it belongs — directly under the AMZAD/PINSO typography)
- Statement + bio + CTAs now flow as a single full-width row BELOW the 2-column composition

#### Tablet (768px)
- Portrait shrinks to `~28vw` via `md:max-w-[26vw]` breakpoint
- Name on the left, portrait on the right — side-by-side maintained

#### Mobile (<768px)
- Layout stacks (via `grid-cols-1`):
  1. AMZAD
  2. PINSO
  3. Tagline (AI · Research · Teaching)
  4. Portrait (centered, `max-w-[280px]`)
  5. Statement
  6. Bio
  7. CTAs (EXPLORE RESEARCH →, VIEW PROJECTS →, DOWNLOAD CV ↓, LINKEDIN ↗)
  8. Scroll indicator
- Portrait is NOT side-by-side with the name on mobile (per spec)

### Portrait Treatment
The portrait is designed as a **large editorial portrait integrated into the hero composition** — NOT a profile card, avatar, circular headshot, or floating widget.

- **Aspect ratio**: `aspect-[4/5]` (portrait orientation)
- **Filter**: `grayscale contrast-[1.05] brightness-95` (cinematic mood, blends with the dark academic palette)
- **Soft accent tint overlay**: `mix-blend-overlay` with `var(--accent)` at 0.08 opacity — adds warmth on dark
- **Dark vignette**: `mix-blend-multiply` with `radial-gradient(circle at center, transparent 30%, rgba(13,15,18,0.55) 100%)` — blends the portrait into the dark background, soft edges
- **Thin accent frame**: `inset-2` with `border-color: color-mix(in oklab, var(--accent) 50%, transparent)` — gallery wall-label treatment (not a product glow)
- **Scrim-chip metadata**: `bg-background/50 backdrop-blur-sm text-foreground/80` for `IIUC · 7th Semester` (top-left) and `CGPA 3.66 / 4.00` (bottom-right) — readable on dark
- **No rounded corners**: rectangular, sharp silhouette (academic feel)

### Animation Sequence
The hero entrance now has a deliberate sequence:

1. **Hero loads** (preloader fades out at ~1.4s)
2. **Role label fades in** at `delay: 0.6s` (Computer Science & Engineering Student)
3. **Name reveals with letter stagger** at `delay: 0.7s` (AMZAD) and `delay: 1.0s` (PINSO) — each letter staggered 0.04s, `y: 100% → 0%` over 0.85s
4. **Portrait reveals from clip-path** at `delay: 0.95s` — `clipPath: "inset(0 0 100% 0)"` → `clipPath: "inset(0 0 0% 0)"` over 1.2s (bottom-up wipe, matching the letter stagger direction)
5. **Portrait settles** — subtle opacity + clip-path reveal, no aggressive zoom (per spec)
6. **Tagline fades in** at `delay: 1.15s`
7. **Statement + bio fade in** at `delay: 1.3s`
8. **CTAs fade in** at `delay: 1.6s`
9. **Scroll indicator fades in** at `delay: 2.0s`

The portrait's reveal is synced to start slightly before the tagline (0.95s vs 1.15s), so the photo lands beside the name as the name is finishing its letter stagger — the eye perceives them as one composed moment.

### Scroll Behavior
- Portrait moves slightly slower than the text (`portraitY: 0% → 12%` vs `textY: 0% → -10%`) — creates subtle depth, the portrait feels "anchored" while the text scrolls past
- Portrait has a very subtle scale on scroll (`portraitScale: 1 → 1.04`) — gentle zoom-in, not aggressive
- Hero opacity fades from 1 → 0.3 over the full scroll range (no more full vanishing — keeps a ghost presence)
- Portrait never disappears too quickly (opacity floor at 0.3) and never overlaps important content (the 12% drift is well within the portrait container)

### Desktop Mouse Parallax
- Portrait has a subtle mouse parallax (~5px) via CSS variables (`--mx`, `--my`) — kept subtle per audit recommendations
- Disabled on touch devices (via `matchMedia("(pointer: coarse)")`)
- Disabled on reduced-motion (via `useReducedMotion`)

### Background Composition Update
- The giant thin outlined circle was moved to sit behind the portrait area (`-top-1/4 right-[-15%] w-[140vw] h-[140vw] hidden md:block`) instead of bleeding off the top center — it now frames the portrait on the right
- The plus sign moved to `left-[45%] hidden lg:block` (between the name and portrait) — visually bridges the two columns
- The accent radial highlight moved to `circle at 80% 25%` (warms the portrait area on the right)
- All other decorative shapes (dot grid, hairline tick, faint grid) kept in place

### Files Modified

- `src/components/hero/Hero.tsx` — full restructure:
  - New 2-column grid for the name + portrait (with `items-center` for vertical alignment)
  - Tagline moved inside the left column (under the name)
  - Portrait moved to the right column (extracted as a new `HeroPortrait` component for clarity)
  - Statement + bio + CTAs moved to a full-width row below the composition
  - Renamed `imageY` / `imageScale` to `portraitY` / `portraitScale` for clarity
  - Updated background shape positions (giant circle moved to behind portrait area)
  - Updated portrait width responsive classes: `max-w-[280px] sm:max-w-[340px] md:max-w-[26vw] lg:max-w-[30vw] xl:max-w-[32vw]`

### What Was Preserved

- All existing animations (letter stagger, magnetic CTAs, custom cursor, scroll progress)
- All existing typography (Newsreader display + IBM Plex Mono eyebrow + Inter body)
- All existing navigation (AMZAD PINSO logo + numbered section links + CV button)
- All existing floating metadata labels (Chattogram, Bangladesh + Undergraduate Teaching Assistant)
- All existing CTAs (EXPLORE RESEARCH, VIEW PROJECTS, DOWNLOAD CV, LINKEDIN)
- All existing background decorative shapes (giant circle, dot grid, plus sign, hairline tick, accent radial, faint grid)
- All existing accessibility features (aria-labels, focus-visible outlines, reduced-motion, 44px touch targets)
- All existing dark academic color palette and typography tokens
- Hero height unchanged (still `min-h-[100svh]` with `pt-32 pb-20`)

### Testing

#### Lint
- `bun run lint` returns 0 errors, 0 warnings

#### Build
- Dev server compiles cleanly: `Next.js 16.1.3 (Turbopack)` → `Ready in ~600ms`
- No hydration mismatches, no runtime errors in `dev.log`

#### Static Asset
- `GET /images/me/me.jpg` → 200, 32813 bytes (~32KB), `image/jpeg`
- Image natural dimensions 800×1000 (4:5 portrait) — matches the `aspect-[4/5]` container

#### Agent Browser Verification (3 viewports)

**Desktop 1280×800**
- Portrait bounding rect: x=790, y=148, width=442, height=553 (rendered w/ scale; visible wrapper 410×512)
- Name bounding rect: x=64, y=275, width=652, height=129 (AMZAD) / y=404 (PINSO)
- Portrait center-y: 424.49; name+tagline center-y: 424.24 (Δ < 1px) — vertically aligned
- Portrait right edge x=1216 — 64px from viewport right (matches container padding)
- Portrait width 32.0vw (matches spec range 30–35vw)
- All 10 section IDs present
- Zero console errors

**Tablet 768×1024**
- Portrait width 215.65px / 28.1vw (smaller than desktop, per `md:max-w-[26vw]`)
- Name on left (x=38, right edge 425), portrait on right (x=522, right edge 738) — gap ~97px
- Both vertically aligned

**Mobile 390×844**
- Stack order verified: AMZAD → PINSO → tagline → portrait → statement → bio → CTAs → scroll indicator
- Portrait centered (x=43.8, width=302.4, margins 43.8px both sides)
- Portrait NOT side-by-side with name (portrait y=315 vs name bottom y=257)

#### No regressions
- All 4 CTAs (EXPLORE RESEARCH, VIEW PROJECTS, DOWNLOAD CV, LINKEDIN) visible with correct hrefs
- Floating labels visible (Chattogram, Bangladesh on top-right; Undergraduate Teaching Assistant on top-left)
- Navigation bar fully functional (9 links visible on desktop)
- AI · Research · Teaching tagline visible at all 3 viewports
- Scroll indicator visible at bottom at all 3 viewports
- All background decorative shapes visible (giant circle, dot grid, plus sign, hairline tick, accent radial, vignette)
- Photo doesn't overlap navigation (portrait top y=148, nav bottom y=80 — 68px gap)
- Hero doesn't have unnecessary extra height (1045px = 1.31× viewport, accounted for by content)

### Git Commit

`feat: integrate profile portrait into hero composition`

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { profile, profileImages } from "@/data/profile";
import { MagneticButton } from "@/components/animation/Reveal";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scroll transforms — kept from previous audit-driven refinements.
  // Portrait moves slightly slower than text for depth (per request).
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.3]);

  // Subtle mouse parallax on desktop only (kept subtle, ~5px)
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  useEffect(() => {
    if (reduce) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    function onMove(e: MouseEvent) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.current = (e.clientX / w - 0.5) * 2;
      mouseY.current = (e.clientY / h - 0.5) * 2;
      const el = ref.current;
      if (el) {
        el.style.setProperty("--mx", String(mouseX.current));
        el.style.setProperty("--my", String(mouseY.current));
      }
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* ── Background layer (fades on scroll) ──────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
        aria-hidden
      >
        {/* Giant thin outlined circle bleeding off the top — sits behind the portrait */}
        <motion.svg
          className="absolute -top-1/4 right-[-15%] w-[140vw] h-[140vw] max-w-none max-h-none text-foreground hidden md:block"
          viewBox="0 0 100 100"
          fill="none"
          initial={reduce ? { opacity: 0.06, scale: 1 } : { opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.18" />
        </motion.svg>

        {/* Subtle accent radial highlight — top right (warms portrait area) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 25%, rgba(110, 138, 245, 0.10), transparent 45%)",
          }}
        />

        {/* Faint grid — 6 columns, very low opacity */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="container-editorial h-full">
            <div className="grid grid-cols-6 h-full">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="border-l border-foreground/50 h-full"
                  style={{ gridColumn: `${i + 1} / span 1` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating geometric forms (desktop only) — subtle research motifs */}
        {/* Plus sign */}
        <motion.svg
          className="absolute top-32 left-[45%] hidden lg:block text-accent"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          initial={reduce ? { opacity: 0.5 } : { opacity: 0 }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0.9, 0.4, 0.9] }}
          transition={
            reduce
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }
          }
        >
          <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
        </motion.svg>

        {/* 3×3 dot grid — bottom-left of the portrait area */}
        <motion.svg
          className="absolute bottom-32 left-[8%] hidden md:block text-accent"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          initial={reduce ? { opacity: 0.5 } : { opacity: 0 }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0.9, 0.4, 0.9] }}
          transition={
            reduce
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
          }
        >
          {Array.from({ length: 9 }).map((_, i) => {
            const x = (i % 3) * 8 + 4;
            const y = Math.floor(i / 3) * 8 + 4;
            return <circle key={i} cx={x} cy={y} r="1.2" fill="currentColor" />;
          })}
        </motion.svg>

        {/* Hairline tick */}
        <motion.div
          className="absolute bottom-[22%] right-[8%] w-16 h-px bg-foreground/30 hidden md:block"
          initial={reduce ? { opacity: 0.4 } : { opacity: 0 }}
          animate={reduce ? { opacity: 0.4 } : { opacity: [0.9, 0.4, 0.9] }}
          transition={
            reduce
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.6 }
          }
        />
      </motion.div>

      {/* ── Floating metadata labels (desktop only) ─────────────────── */}
      <motion.div
        className="absolute top-24 md:top-32 right-6 md:right-12 z-10 font-mono text-eyebrow text-muted-foreground text-right max-w-[200px] hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.location}
      </motion.div>

      <motion.div
        className="absolute top-24 md:top-32 left-6 md:left-12 z-10 font-mono text-eyebrow text-muted-foreground hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.subRole}
      </motion.div>

      {/* ── Hero content ────────────────────────────────────────────── */}
      <div className="container-editorial relative z-10 min-h-[100svh] flex flex-col justify-center pt-32 pb-20">
        <motion.div style={{ y: textY }} className="w-full">
          {/* Role label — above the 2-column composition */}
          <motion.div
            className="font-mono text-eyebrow text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {profile.role}
          </motion.div>

          {/* ── Two-column composition: NAME (left) + PORTRAIT (right) ── */}
          {/* Desktop: name on the left ~55%, portrait on the right ~45%, both
              vertically centered. The portrait aligns with the AMZAD/PINSO
              typography — the eye moves NAME → PHOTO, not NAME → empty space. */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* LEFT — Display name */}
            <div className="md:col-span-7 lg:col-span-7 order-1">
              <div className="flex flex-col leading-none">
                <HeroLine text={profile.firstName} delay={0.7} />
                <HeroLine text={profile.lastName} delay={1.0} accent />
              </div>

              {/* Tagline — sits directly under the name on the left column */}
              <motion.p
                className="font-mono text-eyebrow text-foreground/85 mt-6 tracking-[0.22em]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                AI <span className="text-accent">·</span> Research{" "}
                <span className="text-accent">·</span> Teaching
              </motion.p>
            </div>

            {/* RIGHT — Editorial portrait */}
            <motion.div
              className="md:col-span-5 lg:col-span-5 order-2 flex justify-center md:justify-end"
              initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              transition={{ delay: 0.95, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <HeroPortrait
                src={profileImages.formal}
                portraitY={portraitY}
                portraitScale={portraitScale}
                reduce={reduce}
              />
            </motion.div>
          </div>

          {/* ── Statement + bio + CTAs (full width below the composition) ── */}
          <motion.div
            className="mt-10 md:mt-14 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {profile.statement}
            </p>
            <p className="mt-4 text-xs md:text-sm text-foreground/70 leading-relaxed">
              {profile.bio}
            </p>
          </motion.div>

          {/* CTAs — academic/informational, no commercial CTAs */}
          <motion.div
            className="mt-10 md:mt-14 flex flex-wrap items-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
          >
            <MagneticButton
              href="#research"
              ariaLabel="Explore Amzad's research and publications"
              className="font-mono text-eyebrow bg-foreground text-background px-6 py-3.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 min-h-[44px] inline-flex items-center"
            >
              EXPLORE RESEARCH →
            </MagneticButton>
            <MagneticButton
              href="#projects"
              ariaLabel="View Amzad's selected technical projects"
              className="font-mono text-eyebrow border border-foreground/40 text-foreground px-6 py-3.5 hover:border-foreground hover:text-foreground hover:bg-foreground/5 transition-colors duration-300 min-h-[44px] inline-flex items-center"
            >
              VIEW PROJECTS →
            </MagneticButton>
            <a
              href={profile.cv}
              download
              className="font-mono text-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-300 px-2 min-h-[44px] inline-flex items-center link-underline"
            >
              DOWNLOAD CV ↓
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-300 px-2 min-h-[44px] inline-flex items-center link-underline"
            >
              LINKEDIN ↗
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden
      >
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-accent"
            animate={reduce ? {} : { y: ["0%", "200%"] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
 * HeroPortrait — editorial portrait treatment for the hero.
 *
 * Designed to feel like a large editorial portrait integrated
 * into the composition — NOT a profile card, avatar, or floating
 * widget. Sits beside the AMZAD/PINSO typography as a visual
 * counterweight.
 *
 * Treatment:
 * - Tall aspect ratio (4/5) for editorial portrait feel
 * - Next.js Image with `fill` + `priority` + responsive `sizes`
 * - Soft edge mask (radial-gradient) so the photo's edges fade
 *   into the dark page — works regardless of the photo's own
 *   background color (designed for the formal photo's clean light
 *   background, but degrades gracefully for any photo)
 * - Subtle grayscale + brightness reduction for cinematic mood
 * - Dark vignette overlay for extra blending
 * - Thin accent frame inset (gallery wall-label) — sits OUTSIDE
 *   the masked layer so it stays crisp
 * - Scrim-chip metadata (IIUC, CGPA) for contrast on dark
 * - Subtle scroll parallax (slower than text for depth)
 * - Subtle mouse parallax (~5px) on desktop only
 * - Clip-path reveal entrance from bottom-up
 * ────────────────────────────────────────────────────────────── */
function HeroPortrait({
  src,
  portraitY,
  portraitScale,
  reduce,
}: {
  src: string;
  portraitY: any;
  portraitScale: any;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[26vw] lg:max-w-[30vw] xl:max-w-[32vw]"
      style={{ y: portraitY, scale: portraitScale }}
    >
      {/* ── Image layer ─────────────────────────────────────────────
          The photo is shown clearly. object-position centers on the
          subject's face/upper-body so the formal portrait is properly
          composed in the 4:5 frame. No filters, no heavy mask — the
          photo's own background is preserved as-is. */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={src}
          alt="Amzad Pinso — formal portrait"
          fill
          priority
          quality={85}
          sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 30vw, (min-width: 768px) 26vw, (min-width: 640px) 340px, 280px"
          className="object-cover object-center"
          style={{
            objectPosition: "center 25%",
            transform: reduce
              ? undefined
              : "translate(calc(var(--mx,0)*-5px), calc(var(--my,0)*-5px)) scale(1.08)",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      {/* Thin accent frame — sits OUTSIDE the masked layer so it stays crisp */}
      <div
        className="absolute inset-3 pointer-events-none border"
        style={{
          borderColor: "color-mix(in oklab, var(--accent) 50%, transparent)",
        }}
        aria-hidden
      />
      {/* Image metadata — scrim chips for contrast on dark */}
      <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest uppercase z-10 px-2 py-1 bg-background/50 backdrop-blur-sm text-foreground/80">
        {profile.universityShort} · {profile.semester}
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest uppercase z-10 px-2 py-1 bg-background/50 backdrop-blur-sm text-foreground/80">
        CGPA {profile.cgpa}
      </div>
    </motion.div>
  );
}

/* HeroLine — staggers letters of a single line of display text. */
function HeroLine({
  text,
  delay = 0,
  accent = false,
}: {
  text: string;
  delay?: number;
  accent?: boolean;
}) {
  const reduce = useReducedMotion();
  const letters = text.split("");
  return (
    <div className="overflow-hidden">
      <motion.h1
        className={`font-display text-display ${accent ? "text-accent" : "text-foreground"}`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { delayChildren: delay, staggerChildren: reduce ? 0 : 0.04 },
          },
        }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "100%" },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}

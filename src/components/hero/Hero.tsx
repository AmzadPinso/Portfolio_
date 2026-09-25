"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/animation/Reveal";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax / opacity transforms on scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle mouse parallax (desktop only)
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
      <motion.div
        className="absolute inset-0 flex flex-col"
        style={{ opacity }}
        aria-hidden
      >
        {/* Background grid lines (subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <div className="container-editorial h-full">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className="border-l border-foreground/40 h-full"
                  style={{ gridColumn: `${i + 1} / span 1` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating role label - top right */}
      <motion.div
        className="absolute top-24 md:top-32 right-6 md:right-12 z-10 font-mono text-eyebrow text-muted-foreground text-right max-w-[200px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.location}
      </motion.div>

      {/* Floating role label - top left */}
      <motion.div
        className="absolute top-24 md:top-32 left-6 md:left-12 z-10 font-mono text-eyebrow text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.role}
      </motion.div>

      <div className="container-editorial relative z-10 min-h-[100svh] flex flex-col justify-center pt-32 pb-20">
        <motion.div style={{ y: textY }} className="w-full">
          {/* Role label */}
          <motion.div
            className="font-mono text-eyebrow text-muted-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {profile.role}
          </motion.div>

          {/* Big name with letter stagger */}
          <div className="flex flex-col leading-none">
            <HeroLine text={profile.firstName} delay={0.7} />
            <HeroLine text={profile.lastName} delay={1.0} accent />
          </div>

          {/* Statement + image split layout */}
          <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
            {/* Statement */}
            <motion.div
              className="md:col-span-7 lg:col-span-8 max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                {profile.statement}
              </p>
              <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed">
                {profile.bio}
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              className="md:col-span-5 lg:col-span-4"
              initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              transition={{ delay: 1.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative aspect-[4/5] w-full max-w-[340px] md:max-w-none md:ml-auto overflow-hidden"
                style={{ y: imageY, scale: imageScale }}
              >
                <img
                  src={profile.image}
                  alt="Amzad Pinso — portrait"
                  className="w-full h-full object-cover grayscale contrast-[1.05]"
                  style={{
                    transform: reduce
                      ? undefined
                      : "translate(calc(var(--mx,0)*-8px), calc(var(--my,0)*-8px)) scale(1.12)",
                    transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                {/* Floating metadata */}
                <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-background/80 uppercase">
                  {profile.university} · {profile.semester}
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-background/80 uppercase">
                  CGPA {profile.cgpa}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            className="mt-10 md:mt-14 flex flex-wrap items-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
          >
            <MagneticButton
              href="#projects"
              className="font-mono text-eyebrow bg-foreground text-background px-6 py-3.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
            >
              VIEW PROJECTS →
            </MagneticButton>
            <MagneticButton
              href={profile.cv}
              download
              className="font-mono text-eyebrow border border-foreground/40 text-foreground px-6 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              DOWNLOAD CV ↓
            </MagneticButton>
            <MagneticButton
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-300 px-2"
            >
              LINKEDIN ↗
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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

/* HeroLine — staggers letters of a single line of display text. */
function HeroLine({ text, delay = 0, accent = false }: { text: string; delay?: number; accent?: boolean }) {
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
          show: { transition: { delayChildren: delay, staggerChildren: reduce ? 0 : 0.04 } },
        }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "100%" },
              show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}

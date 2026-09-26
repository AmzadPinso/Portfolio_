"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
  TextReveal,
  LightForm,
} from "@/components/animation/Reveal";

const stats = [
  { value: "7", label: "Semester", sub: "Currently" },
  { value: "3.66", label: "CGPA", sub: "out of 4.00" },
  { value: "IIUC", label: "University", sub: "Chattogram" },
  { value: "TA", label: "Teaching Assistant", sub: "AI · DBMS" },
];

export function AboutSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="about"
      className="relative py-24 md:py-36 bg-background border-t border-b border-border overflow-hidden"
    >
      {/* Subtle drifting glow */}
      <div className="bg-glow" aria-hidden />

      {/* Faint dotted grid texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(242, 243, 245, 0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="container-editorial relative z-10">
        <SectionHeading number="01" label="About" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left — editorial big statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-display-md text-foreground leading-[0.96] tracking-tight">
                <TextReveal text="A CSE student learning through research, teaching, and technical practice." />
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-10 md:mt-14 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl">
                {profile.longBio}
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-wrap gap-2">
                {profile.researchFocus.map((focus) => (
                  <span
                    key={focus}
                    className="font-mono text-eyebrow border border-border px-3 py-1.5 text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — portrait + stats */}
          <div className="lg:col-span-5 flex flex-col gap-8 relative">
            {/* Light form: thin outlined circle behind portrait */}
            <LightForm
              className="absolute -top-12 -right-16 w-[420px] h-[420px] max-w-none pointer-events-none hidden lg:block"
              delay={0.3}
            >
              <circle
                cx="210"
                cy="210"
                r="200"
                fill="none"
                stroke="var(--shape-outline-strong)"
                strokeWidth="1"
              />
              <circle
                cx="210"
                cy="210"
                r="160"
                fill="none"
                stroke="var(--shape-outline)"
                strokeWidth="1"
              />
            </LightForm>

            <Reveal delay={0.2} className="relative">
              <div className="relative aspect-[4/5] w-full max-w-[400px] overflow-hidden">
                <motion.img
                  src={profile.image}
                  alt="Amzad Pinso — portrait"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-[1.05] brightness-95"
                  initial={
                    reduce
                      ? { opacity: 0 }
                      : { clipPath: "inset(0 100% 0 0)" }
                  }
                  whileInView={
                    reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
                  }
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Subtle dark vignette */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 30%, rgba(13, 15, 18, 0.45) 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest uppercase px-2 py-1 bg-background/50 backdrop-blur-sm text-foreground/80">
                  Student · Researcher · Educator
                </div>
              </div>
            </Reveal>

            <StaggerChildren
              className="grid grid-cols-2 gap-px bg-border"
              stagger={0.08}
            >
              {stats.map((s) => (
                <StaggerItem
                  key={s.label}
                  className="bg-background p-5 md:p-6 group hover:bg-secondary transition-colors duration-400"
                >
                  <div className="font-display text-3xl md:text-4xl text-foreground font-medium tabular-nums">
                    {s.value}
                  </div>
                  <div className="mt-2 font-mono text-eyebrow text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground/70 uppercase">
                    {s.sub}
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <Reveal delay={0.3}>
              <div className="flex items-start gap-4 p-5 border border-border hover:border-accent/40 transition-colors duration-400">
                <div className="w-8 h-8 flex items-center justify-center border border-accent text-accent font-display text-base shrink-0">
                  ♞
                </div>
                <div>
                  <div className="font-mono text-eyebrow text-foreground uppercase">
                    Interest — {profile.interest.name}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {profile.interest.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
  TextReveal,
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
      className="relative py-24 md:py-36 bg-background border-t border-border"
    >
      <div className="container-editorial">
        <SectionHeading number="01" label="About" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left — editorial big statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-display-md text-foreground leading-[0.95] tracking-tight">
                <TextReveal
                  text="I work at the intersection of computer science, intelligent systems, research, and teaching."
                />
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-10 md:mt-14 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                {profile.bio}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-6 text-base md:text-lg text-foreground/75 leading-relaxed max-w-2xl">
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
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal delay={0.2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <motion.img
                  src={profile.image}
                  alt="Amzad Pinso portrait"
                  className="w-full h-full object-cover grayscale contrast-[1.05]"
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
                  whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-background/80 uppercase">
                  Researcher · Educator
                </div>
              </div>
            </Reveal>

            <StaggerChildren className="grid grid-cols-2 gap-px bg-border" stagger={0.08}>
              {stats.map((s) => (
                <StaggerItem
                  key={s.label}
                  className="bg-background p-5 md:p-6 group hover:bg-foreground transition-colors duration-500"
                >
                  <div className="font-display text-3xl md:text-4xl text-foreground group-hover:text-background transition-colors duration-500">
                    {s.value}
                  </div>
                  <div className="mt-2 font-mono text-eyebrow text-muted-foreground group-hover:text-background/70 transition-colors duration-500">
                    {s.label}
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-widest text-muted-foreground/70 uppercase group-hover:text-background/50 transition-colors duration-500">
                    {s.sub}
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <Reveal delay={0.3}>
              <div className="flex items-start gap-4 p-5 border border-border">
                <div className="w-8 h-8 flex items-center justify-center border border-accent text-accent font-display text-base">
                  ♞
                </div>
                <div>
                  <div className="font-mono text-eyebrow text-foreground uppercase">
                    Interest — {profile.interest.name}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{profile.interest.description}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

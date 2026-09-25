"use client";

import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/data/experience";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
} from "@/components/animation/Reveal";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="relative py-24 md:py-36 bg-background border-t border-border"
    >
      <div className="container-editorial">
        <SectionHeading number="04" label="Experience" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-14 md:mb-20">
            Teaching, leadership, and community roles that shaped my approach to
            collaboration, mentorship, and disciplined execution.
          </p>
        </Reveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-px bg-border" aria-hidden />

          <StaggerChildren className="flex flex-col" stagger={0.12}>
            {experience.map((exp) => (
              <StaggerItem key={exp.id}>
                <ExperienceRow {...exp} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({
  period,
  role,
  organization,
  description,
  highlights,
  tags,
  current,
}: (typeof experience)[number]) {
  const reduce = useReducedMotion();
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 pb-12 md:pb-16">
      {/* Timeline dot */}
      <motion.span
        className="absolute left-0 md:left-1/4 top-1.5 -translate-x-1/2 w-3 h-3 border-2 border-background bg-accent rounded-full z-10"
        initial={reduce ? { opacity: 1 } : { scale: 0, opacity: 0 }}
        whileInView={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      />

      {/* Period */}
      <div className="md:pl-8">
        <div className="font-mono text-eyebrow text-accent">{period}</div>
        {current && (
          <div className="mt-1 font-mono text-[10px] tracking-widest text-foreground/60 uppercase">
            ◆ Current
          </div>
        )}
      </div>

      {/* Content */}
      <div className="md:col-span-3">
        <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight tracking-tight">
          {role}
        </h3>
        <div className="mt-1.5 font-mono text-eyebrow text-muted-foreground">
          {organization}
        </div>
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-5 space-y-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-1.5 w-1 h-1 bg-accent shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-eyebrow border border-border px-3 py-1.5 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { awards } from "@/data/awards";
import {
  Reveal,
  SectionHeading,
} from "@/components/animation/Reveal";

export function AwardsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);

  return (
    <section
      id="awards"
      className="relative py-24 md:py-36 bg-foreground text-background border-t border-border overflow-hidden"
    >
      <div className="container-editorial">
        <SectionHeading number="09" label="Recognition" />

        <Reveal>
          <p className="font-display text-headline text-background max-w-4xl mb-14 md:mb-20">
            Achievements across sport, science, and public speaking —
            recognition that reflects leadership, teamwork, and a competitive
            spirit.
          </p>
        </Reveal>
      </div>

      {/* Horizontal scrolling award cards */}
      <div ref={ref} className="relative overflow-hidden">
        <motion.div
          style={reduce ? {} : { x }}
          className="flex gap-6 md:gap-10 px-[clamp(1.25rem,5vw,6rem)] will-change-transform"
        >
          {awards.map((a) => (
            <div
              key={a.id}
              className="shrink-0 w-[280px] md:w-[380px] border border-background/20 p-8 md:p-10 group hover:border-accent transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-eyebrow text-accent">
                  ({a.number})
                </span>
                <span className="font-display text-3xl md:text-4xl text-background/40 group-hover:text-background transition-colors duration-500">
                  {a.year}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-background leading-tight tracking-tight">
                {a.title}
              </h3>
              <div className="mt-2 font-mono text-eyebrow text-background/60">
                {a.context}
              </div>
              <p className="mt-5 text-sm text-background/70 leading-relaxed">
                {a.description}
              </p>
            </div>
          ))}

          {/* Repeating set for marquee continuity when scroll-bound */}
          {awards.map((a) => (
            <div
              key={`${a.id}-dup`}
              aria-hidden
              className="shrink-0 w-[280px] md:w-[380px] border border-background/20 p-8 md:p-10 opacity-50"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-eyebrow text-accent">
                  ({a.number})
                </span>
                <span className="font-display text-3xl md:text-4xl text-background/40">
                  {a.year}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-background leading-tight">
                {a.title}
              </h3>
              <div className="mt-2 font-mono text-eyebrow text-background/60">
                {a.context}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

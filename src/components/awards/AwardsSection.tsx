"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { awards } from "@/data/awards";
import { Reveal, SectionHeading } from "@/components/animation/Reveal";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

export function AwardsSection() {
  const reduce = useReducedMotion();
  const isTouch = useIsTouchDevice();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtler scroll-bound motion (-22% instead of -30%), and disable on touch
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isTouch || reduce ? ["0%", "0%"] : ["0%", "-22%"],
  );

  return (
    <section
      id="awards"
      className="relative py-24 md:py-36 bg-card text-foreground border-t border-b border-border overflow-hidden"
    >
      {/* Subtle accent radial at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(110, 138, 245, 0.08), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-editorial relative z-10">
        <SectionHeading number="09" label="Recognition" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-14 md:mb-20">
            Achievements across sport, science, and public speaking —
            recognition that reflects leadership, teamwork, and a competitive
            spirit.
          </p>
        </Reveal>
      </div>

      {/* Horizontal award cards — scroll-bound on desktop, snap-scroll on touch */}
      <div
        ref={ref}
        className={`relative overflow-hidden ${
          isTouch ? "overflow-x-auto snap-x snap-mandatory scrollbar-hide" : ""
        }`}
      >
        <motion.div
          style={isTouch || reduce ? {} : { x }}
          className={`flex gap-6 md:gap-10 px-[clamp(1.25rem,5vw,6rem)] will-change-transform ${
            isTouch ? "snap-x" : ""
          }`}
        >
          {awards.map((a) => (
            <div
              key={a.id}
              className={`shrink-0 w-[280px] md:w-[380px] border border-foreground/15 p-8 md:p-10 group hover:border-accent transition-colors duration-400 ${
                isTouch ? "snap-start" : ""
              }`}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-section-number text-accent tabular-nums">
                  § {a.number}
                </span>
                <span className="font-display text-3xl md:text-4xl text-muted-foreground group-hover:text-foreground transition-colors duration-500 tabular-nums">
                  {a.year}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight tracking-tight">
                {a.title}
              </h3>
              <div className="mt-2 font-mono text-eyebrow text-muted-foreground">
                {a.context}
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {a.description}
              </p>
            </div>
          ))}

          {/* Repeating set for marquee continuity — only on desktop scroll-bound */}
          {!isTouch &&
            awards.map((a) => (
              <div
                key={`${a.id}-dup`}
                aria-hidden
                className="shrink-0 w-[280px] md:w-[380px] border border-foreground/10 p-8 md:p-10 opacity-40"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-section-number text-accent tabular-nums">
                    § {a.number}
                  </span>
                  <span className="font-display text-3xl md:text-4xl text-muted-foreground/60 tabular-nums">
                    {a.year}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                  {a.title}
                </h3>
                <div className="mt-2 font-mono text-eyebrow text-muted-foreground">
                  {a.context}
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

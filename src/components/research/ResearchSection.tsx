"use client";

import { motion, useReducedMotion } from "motion/react";
import { publications } from "@/data/publications";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
} from "@/components/animation/Reveal";
import { profile } from "@/data/profile";

export function ResearchSection() {
  const reduce = useReducedMotion();
  const pub = publications[0];

  return (
    <section
      id="research"
      className="relative py-24 md:py-36 bg-secondary border-t border-b border-border overflow-hidden"
    >
      {/* Subtle drifting glow */}
      <div className="bg-glow" aria-hidden />

      {/* Faint dotted grid texture */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(110, 138, 245, 0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="container-editorial relative z-10">
        <SectionHeading number="02" label="Research" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-14 md:mb-20">
            Research at the intersection of explainable AI, ensemble learning,
            and healthcare analytics — studying models that are accurate,
            interpretable, and clinically trustworthy.
          </p>
        </Reveal>

        {/* Abstract data visualization */}
        <Reveal delay={0.1}>
          <div className="relative w-full h-[140px] md:h-[200px] mb-12 overflow-hidden border-y border-border">
            <AbstractVisualization />
          </div>
        </Reveal>

        {/* Featured publication card */}
        <Reveal delay={0.15}>
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 border border-border bg-card p-6 md:p-10 lg:p-14 group relative overflow-hidden">
            {/* Left accent rule — featured publication signal */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
              aria-hidden
            />

            {/* Left — meta */}
            <div className="lg:col-span-3 flex lg:flex-col justify-between gap-6 lg:pl-4">
              <div>
                <div className="font-mono text-eyebrow text-accent mb-2">
                  Featured Publication
                </div>
                <div className="font-display text-5xl md:text-6xl text-foreground font-medium tabular-nums">
                  {pub.year}
                </div>
              </div>
              <div>
                <div className="font-mono text-eyebrow text-muted-foreground mb-2">
                  Status
                </div>
                <div className="inline-flex items-center gap-2 border border-accent text-accent px-3 py-1.5 text-xs font-mono uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {pub.status}
                </div>
              </div>
            </div>

            {/* Right — content */}
            <div className="lg:col-span-9">
              <div className="font-mono text-eyebrow text-muted-foreground mb-3">
                {pub.conference}
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight tracking-tight text-balance">
                {pub.title}
              </h3>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-eyebrow text-muted-foreground">
                  Authors
                </span>
                <span className="text-base text-foreground/80">
                  {pub.authors.join(", ")}
                </span>
              </div>

              <div className="mt-6 border-l-2 border-border pl-4">
                <div className="font-mono text-eyebrow text-muted-foreground mb-2">
                  Abstract
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl italic">
                  {pub.abstract}
                </p>
              </div>

              <StaggerChildren
                className="mt-8 flex flex-wrap gap-2"
                stagger={0.06}
              >
                {pub.topics.map((t) => (
                  <StaggerItem
                    key={t}
                    className="font-mono text-eyebrow border border-border px-3 py-1.5 text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                  >
                    {t}
                  </StaggerItem>
                ))}
              </StaggerChildren>

              <div className="mt-10 flex items-center gap-4 flex-wrap">
                {pub.href ? (
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-eyebrow bg-foreground text-background px-6 py-3.5 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  >
                    VIEW PAPER ↗
                  </a>
                ) : (
                  <button
                    disabled
                    className="font-mono text-eyebrow bg-muted text-muted-foreground/60 px-6 py-3.5 cursor-not-allowed"
                    aria-disabled="true"
                  >
                    VIEW PAPER — Link Pending
                  </button>
                )}
                <a
                  href={profile.cv}
                  download
                  className="font-mono text-eyebrow border border-foreground/40 text-foreground px-6 py-3.5 hover:border-foreground hover:bg-foreground/5 transition-colors duration-300"
                >
                  DOWNLOAD CV ↓
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* AbstractVisualization — pure SVG/CSS geometric representation of
   explainable AI + ensemble + healthcare data concepts. */
function AbstractVisualization() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center text-foreground">
      {/* Animated horizontal lines (data flow) */}
      <div className="absolute inset-0 flex flex-col justify-between py-4 px-6 opacity-30">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-px w-full bg-foreground"
            initial={reduce ? { opacity: 0.3 } : { scaleX: 0 }}
            whileInView={reduce ? { opacity: 0.3 } : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        ))}
      </div>

      {/* Center: layered circles representing ensemble + explainability */}
      <svg
        viewBox="0 0 600 200"
        className="relative w-full h-full max-w-4xl"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Outer ensemble rings */}
        {[80, 60, 40, 22].map((r, i) => (
          <motion.circle
            key={i}
            cx="300"
            cy="100"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-foreground"
            initial={reduce ? { opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            whileInView={
              reduce ? { opacity: 0.5 } : { pathLength: 1, opacity: 0.5 }
            }
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}

        {/* Center node */}
        <motion.circle
          cx="300"
          cy="100"
          r="6"
          className="fill-accent"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />

        {/* Surrounding base-learner nodes */}
        {[
          [120, 60],
          [480, 60],
          [120, 140],
          [480, 140],
          [60, 100],
          [540, 100],
        ].map(([x, y], i) => (
          <motion.g
            key={i}
            initial={reduce ? { opacity: 0.6 } : { opacity: 0, y: 6 }}
            whileInView={reduce ? { opacity: 0.6 } : { opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
          >
            <circle cx={x} cy={y} r="3" className="fill-foreground" />
            <line
              x1="300"
              y1="100"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
              opacity="0.3"
            />
          </motion.g>
        ))}

        {/* Threshold markers */}
        {[100, 200, 400, 500].map((x, i) => (
          <motion.line
            key={i}
            x1={x}
            y1="20"
            x2={x}
            y2="180"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 4"
            className="text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
}

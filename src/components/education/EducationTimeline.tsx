"use client";

import { motion, useReducedMotion } from "motion/react";
import { education } from "@/data/education";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
  AnimatedCounter,
} from "@/components/animation/Reveal";

export function EducationTimeline() {
  return (
    <section
      id="education"
      className="relative py-24 md:py-36 bg-background border-t border-border"
    >
      <div className="container-editorial">
        <SectionHeading number="06" label="Education" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-14 md:mb-20">
            An academic trajectory rooted in science, mathematics, and computer
            engineering — building toward research in artificial intelligence.
          </p>
        </Reveal>

        <StaggerChildren className="flex flex-col gap-px bg-border" stagger={0.15}>
          {education.map((edu) => (
            <StaggerItem key={edu.id}>
              <EducationRow {...edu} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function EducationRow({
  degree,
  institution,
  location,
  start,
  end,
  result,
  resultLabel,
  description,
  current,
}: (typeof education)[number]) {
  const reduce = useReducedMotion();
  // Parse a numeric prefix from result (e.g. "3.66 / 4.00" -> 3.66)
  const numericMatch = result.match(/^(\d+(?:\.\d+)?)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const decimals = numericMatch && numericMatch[1].includes(".") ? numericMatch[1].split(".")[1].length : 0;
  const suffix = result.replace(/^(\d+(?:\.\d+)?)/, "").trim();

  return (
    <div className="bg-background grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 p-6 md:p-10 group hover:bg-card transition-colors duration-500">
      {/* Year range */}
      <div className="md:col-span-3">
        <div className="font-mono text-eyebrow text-muted-foreground mb-2">
          {start} — {end}
        </div>
        {current && (
          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-accent uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Current
          </div>
        )}
      </div>

      {/* Degree + institution */}
      <div className="md:col-span-6">
        <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight tracking-tight">
          {degree}
        </h3>
        <div className="mt-2 font-mono text-eyebrow text-foreground/70">
          {institution}
        </div>
        <div className="mt-1 font-mono text-eyebrow text-muted-foreground">
          {location}
        </div>
        {description && (
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Result with animated counter */}
      <div className="md:col-span-3 md:text-right">
        <div className="font-mono text-eyebrow text-muted-foreground mb-2">
          {resultLabel}
        </div>
        <div className="font-display text-4xl md:text-5xl text-foreground">
          {numericValue > 0 ? (
            <>
              <AnimatedCounter
                value={numericValue}
                decimals={decimals}
                className="inline-block"
              />
              {suffix && (
                <span className="text-2xl md:text-3xl text-muted-foreground">
                  {" "}
                  {suffix}
                </span>
              )}
            </>
          ) : (
            result
          )}
        </div>
      </div>
    </div>
  );
}

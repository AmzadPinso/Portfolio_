"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { skills, type SkillCategory } from "@/data/skills";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
} from "@/components/animation/Reveal";

export function SkillsToolkit() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-36 bg-secondary/40 border-t border-border"
    >
      <div className="container-editorial">
        <SectionHeading number="07" label="Toolkit" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-14 md:mb-20">
            An interactive toolkit of programming, research, and professional
            capabilities — built through coursework, teaching, and fieldwork.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {skills.map((cat) => (
            <SkillCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(y * -8);
    ry.set(x * 8);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduce
          ? {}
          : { rotateX: srx, rotateY: sry, transformPerspective: 800 }
      }
      className="bg-background p-8 md:p-10 group relative overflow-hidden min-h-[260px] flex flex-col"
    >
      {/* Hover accent corner */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-baseline justify-between mb-8">
        <span className="font-mono text-section-number text-muted-foreground">
          ({category.number})
        </span>
        <span className="font-mono text-eyebrow text-foreground/50 group-hover:text-accent transition-colors duration-300">
          {category.label}
        </span>
      </div>

      <StaggerChildren className="flex flex-col gap-3 mt-auto" stagger={0.06}>
        {category.items.map((item) => (
          <StaggerItem key={item.name}>
            <div className="border-b border-border pb-3">
              <div className="font-display text-xl md:text-2xl text-foreground group-hover:translate-x-1 transition-transform duration-300 inline-block">
                {item.name}
              </div>
              {item.description && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </motion.div>
  );
}

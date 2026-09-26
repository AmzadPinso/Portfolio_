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
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

export function SkillsToolkit() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-36 bg-background border-t border-b border-border overflow-hidden"
    >
      {/* Subtle drifting glow */}
      <div className="bg-glow" aria-hidden />

      {/* Faint grid background — toolkit feel */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242, 243, 245, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(242, 243, 245, 0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="container-editorial relative z-10">
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
  const isTouch = useIsTouchDevice();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduce || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(y * -4); // reduced from 8deg to 4deg
    ry.set(x * 4);
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
        reduce || isTouch
          ? {}
          : { rotateX: srx, rotateY: sry, transformPerspective: 800 }
      }
      className="bg-background p-8 md:p-10 group relative overflow-hidden min-h-[260px] flex flex-col"
    >
      {/* Hover accent corner brackets */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-baseline justify-between mb-8">
        <span className="font-mono text-section-number text-muted-foreground tabular-nums">
          § {category.number}
        </span>
        <span className="font-mono text-eyebrow text-foreground/50 group-hover:text-accent transition-colors duration-300">
          {category.label}
        </span>
      </div>

      <StaggerChildren
        className="flex flex-col gap-3 mt-auto"
        stagger={0.06}
      >
        {category.items.map((item) => (
          <StaggerItem key={item.name}>
            <div className="border-b border-border pb-3">
              <div className="font-display text-xl md:text-2xl text-foreground font-medium group-hover:translate-x-0.5 transition-transform duration-300 inline-block">
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

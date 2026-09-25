"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { projects, type Project } from "@/data/projects";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
} from "@/components/animation/Reveal";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-36 bg-background border-t border-border"
    >
      <div className="container-editorial">
        <SectionHeading number="03" label="Selected Projects" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-16 md:mb-24">
            A selection of research and engineering work — focused on explainable
            AI, predictive modeling, and applied machine learning.
          </p>
        </Reveal>

        <div className="flex flex-col gap-px bg-border">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Pointer-based subtle position tracking
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX);
    my.set(relY);
  }

  const isPlaceholder = project.placeholder;
  const isLeftLayout = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      data-cursor={isPlaceholder ? "default" : "pointer"}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mx.set(0);
        my.set(0);
      }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-background group"
    >
      <div className="container-editorial py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Number + visual */}
        <div className={`md:col-span-5 ${isLeftLayout ? "md:order-1" : "md:order-2"}`}>
          <div className="flex items-start gap-4 mb-6">
            <span className="font-mono text-eyebrow text-accent">
              ({project.number})
            </span>
            <div className="flex-1 h-px bg-border mt-2.5" />
          </div>

          <div className="relative aspect-[5/4] w-full overflow-hidden bg-muted border border-border">
            {isPlaceholder ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-eyebrow text-muted-foreground">
                  Coming Soon
                </span>
              </div>
            ) : (
              <ProjectVisual project={project} hovered={hovered} mx={mx} my={my} />
            )}
            {/* Overlay info */}
            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-background/80 uppercase pointer-events-none">
              {project.year}
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-background/80 uppercase pointer-events-none">
              {isPlaceholder ? "Pending" : project.status}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`md:col-span-7 ${isLeftLayout ? "md:order-2" : "md:order-1"}`}>
          <div className="font-mono text-eyebrow text-muted-foreground mb-3">
            {project.category}
          </div>
          <h3 className="font-display text-display-md text-foreground leading-none tracking-tight">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-3 text-base md:text-lg text-foreground/70 italic">
              {project.subtitle}
            </p>
          )}
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {project.technologies.length > 0 && (
            <StaggerChildren
              className="mt-8 flex flex-wrap gap-2"
              stagger={0.05}
            >
              {project.technologies.map((t) => (
                <StaggerItem
                  key={t}
                  className="font-mono text-eyebrow border border-border px-3 py-1.5 text-muted-foreground"
                >
                  {t}
                </StaggerItem>
              ))}
            </StaggerChildren>
          )}

          <div className="mt-10 flex items-center gap-4">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-eyebrow bg-foreground text-background px-5 py-3 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
              >
                VIEW PROJECT ↗
              </a>
            ) : isPlaceholder ? (
              <span className="font-mono text-eyebrow text-muted-foreground border border-dashed border-border px-5 py-3">
                Coming Soon
              </span>
            ) : (
              <a
                href="#contact"
                className="font-mono text-eyebrow border border-foreground/40 text-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                ENQUIRE ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* Visual area for non-placeholder projects.
   Uses pure CSS/SVG instead of fabricated screenshots. */
function ProjectVisual({
  project,
  hovered,
  mx,
  my,
}: {
  project: Project;
  hovered: boolean;
  mx: any;
  my: any;
}) {
  // DiaXAI-Stack: ensemble stacking visual
  if (project.id === "proj-diaxai") {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/15 overflow-hidden">
        <svg
          viewBox="0 0 400 320"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {/* Grid lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={(i * 400) / 7}
              y1="0"
              x2={(i * 400) / 7}
              y2="320"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
              opacity="0.08"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(i * 320) / 7}
              x2="400"
              y2={(i * 320) / 7}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
              opacity="0.08"
            />
          ))}

          {/* Base learners (bottom row) */}
          {[
            [70, 230],
            [200, 230],
            [330, 230],
          ].map(([x, y], i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <rect
                x={x - 28}
                y={y - 18}
                width="56"
                height="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground"
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                className="fill-foreground font-mono"
                style={{ fontSize: "10px", letterSpacing: "0.1em" }}
              >
                {`M${i + 1}`}
              </text>
            </motion.g>
          ))}

          {/* Meta-learner (top) */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <rect
              x="156"
              y="50"
              width="88"
              height="44"
              fill="currentColor"
              className="text-accent"
            />
            <text
              x="200"
              y="78"
              textAnchor="middle"
              className="fill-background font-mono"
              style={{ fontSize: "11px", letterSpacing: "0.15em" }}
            >
              STACK
            </text>
          </motion.g>

          {/* Connecting lines */}
          {[
            [70, 230],
            [200, 230],
            [330, 230],
          ].map(([x, y], i) => (
            <motion.line
              key={`l${i}`}
              x1={x}
              y1={y - 18}
              x2="200"
              y2="94"
              stroke="currentColor"
              strokeWidth="0.7"
              className="text-foreground"
              opacity="0.35"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
            />
          ))}

          {/* Threshold bars */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.2 }}
          >
            <line
              x1="20"
              y1="170"
              x2="120"
              y2="170"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
            <text
              x="125"
              y="174"
              className="fill-accent font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.1em" }}
            >
              T1
            </text>
            <line
              x1="280"
              y1="170"
              x2="380"
              y2="170"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
            <text
              x="270"
              y="174"
              textAnchor="end"
              className="fill-accent font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.1em" }}
            >
              T2
            </text>
          </motion.g>
        </svg>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] tracking-widest text-foreground/60 uppercase pointer-events-none">
          LEAKAGE-FREE STACKING · DUAL THRESHOLD
        </div>
      </div>
    );
  }

  // Default fallback visual (abstract)
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/15" />
  );
}

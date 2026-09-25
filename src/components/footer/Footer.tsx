"use client";

import { profile } from "@/data/profile";
import { Reveal, TextReveal } from "@/components/animation/Reveal";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative bg-background text-foreground pt-20 md:pt-32 pb-10 border-t border-border overflow-hidden">
      {/* Subtle radial at top to mirror contact glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(110, 138, 245, 0.06), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container-editorial relative z-10">
        <Reveal>
          <div className="font-mono text-eyebrow text-accent mb-8">
            End of page — return to top
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#hero"
            className="block font-display text-display leading-[0.9] tracking-tight text-foreground hover:text-accent transition-colors duration-400"
            aria-label="Back to top"
          >
            <TextReveal text="AMZAD PINSO" />
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 font-mono text-eyebrow text-muted-foreground uppercase tracking-widest">
            Computer Science & Engineering
          </div>
          <div className="mt-1 font-mono text-eyebrow text-muted-foreground uppercase tracking-widest">
            International Islamic University Chittagong
          </div>
          <div className="mt-3 font-mono text-eyebrow text-accent uppercase tracking-widest">
            AI · Research · Teaching · Technology
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-eyebrow text-muted-foreground">
            © {year} Amzad Pinso · All rights reserved
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-eyebrow text-muted-foreground hover:text-accent transition-colors duration-300 link-underline"
            >
              LINKEDIN ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-eyebrow text-muted-foreground hover:text-accent transition-colors duration-300 link-underline"
            >
              EMAIL ↗
            </a>
            <a
              href={profile.cv}
              download
              className="font-mono text-eyebrow text-muted-foreground hover:text-accent transition-colors duration-300 link-underline"
            >
              CV ↓
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { profile } from "@/data/profile";
import { Reveal, TextReveal } from "@/components/animation/Reveal";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative bg-foreground text-background pt-20 md:pt-32 pb-10 border-t border-background/10">
      <div className="container-editorial">
        <Reveal>
          <div className="font-mono text-eyebrow text-accent mb-8">
            End of Page · Return to Top
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#hero"
            className="block font-display text-display leading-[0.9] tracking-tighter text-background hover:text-accent transition-colors duration-500"
            aria-label="Back to top"
          >
            <TextReveal text="AMZAD PINSO" />
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 font-mono text-eyebrow text-background/60 uppercase tracking-widest">
            Computer Science & Engineering
          </div>
          <div className="mt-1 font-mono text-eyebrow text-background/60 uppercase tracking-widest">
            International Islamic University Chittagong
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-6 border-t border-background/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-eyebrow text-background/50">
            © {year} Amzad Pinso · All rights reserved
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-eyebrow text-background/70 hover:text-accent transition-colors link-underline"
            >
              LINKEDIN ↗
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-eyebrow text-background/70 hover:text-accent transition-colors link-underline"
            >
              EMAIL ↗
            </a>
            <a
              href={profile.cv}
              download
              className="font-mono text-eyebrow text-background/70 hover:text-accent transition-colors link-underline"
            >
              CV ↓
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

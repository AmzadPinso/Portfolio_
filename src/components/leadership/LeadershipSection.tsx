"use client";

import { leadership } from "@/data/leadership";
import {
  Reveal,
  SectionHeading,
  StaggerChildren,
  StaggerItem,
} from "@/components/animation/Reveal";

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="relative py-24 md:py-36 bg-background border-t border-border"
    >
      <div className="container-editorial">
        <SectionHeading number="08" label="Leadership" />

        <Reveal>
          <p className="font-display text-headline text-foreground max-w-4xl mb-14 md:mb-20">
            Roles in student organizations, community service, and disciplined
            training — leadership grounded in teamwork, communication, and
            responsibility.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {leadership.map((lead) => (
            <StaggerChildren
              key={lead.id}
              className="bg-background p-8 md:p-10 group relative overflow-hidden"
            >
              <StaggerItem>
                <div className="font-mono text-eyebrow text-accent mb-3">
                  {lead.period}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight tracking-tight">
                  {lead.role}
                </h3>
                <div className="mt-2 font-mono text-eyebrow text-muted-foreground">
                  {lead.organization}
                </div>
                <p className="mt-5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                  {lead.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {lead.focus.map((f) => (
                    <span
                      key={f}
                      className="font-mono text-eyebrow border border-border px-3 py-1.5 text-muted-foreground group-hover:border-accent group-hover:text-accent transition-colors duration-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            </StaggerChildren>
          ))}
        </div>
      </div>
    </section>
  );
}

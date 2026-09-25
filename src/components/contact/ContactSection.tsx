"use client";

import { socials } from "@/data/socials";
import { profile as profileData } from "@/data/profile";
import {
  Reveal,
  TextReveal,
  MagneticButton,
} from "@/components/animation/Reveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-40 bg-background border-t border-border"
    >
      <div className="container-editorial">
        <Reveal>
          <div className="font-mono text-eyebrow text-accent mb-8">
            (10) Let's Connect
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-display-md text-foreground leading-[0.95] tracking-tight max-w-5xl">
            <TextReveal text="Interested in research, technology, collaboration, or building something meaningful?" />
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            I'm always open to discussing AI research, teaching collaborations,
            internships, and projects at the intersection of machine learning
            and healthcare. Reach out through any of the channels below.
          </p>
        </Reveal>

        {/* Contact methods */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {socials.map((s) => (
            <div
              key={s.label}
              className="bg-background p-6 md:p-8 group hover:bg-card transition-colors duration-500"
            >
              <div className="font-mono text-eyebrow text-muted-foreground mb-3">
                {s.label}
              </div>
              <a
                href={s.href}
                {...(s.type === "external" || s.type === "linkedin"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : s.type === "cv"
                  ? { download: true }
                  : {})}
                className="font-display text-xl md:text-2xl text-foreground link-underline group-hover:text-accent transition-colors duration-300 break-all"
              >
                {s.type === "email"
                  ? profileData.email
                  : s.type === "phone"
                  ? profileData.phoneDisplay
                  : s.type === "linkedin"
                  ? "linkedin.com/in/amzad-pinso"
                  : s.type === "cv"
                  ? "Download CV (PDF)"
                  : s.href}
              </a>
            </div>
          ))}
        </div>

        {/* Primary CTAs */}
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center gap-3 md:gap-4">
            <MagneticButton
              href={`mailto:${profileData.email}`}
              className="font-mono text-eyebrow bg-foreground text-background px-7 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
            >
              SEND EMAIL ↗
            </MagneticButton>
            <MagneticButton
              href={profileData.cv}
              download
              className="font-mono text-eyebrow border border-foreground/40 text-foreground px-7 py-4 hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              DOWNLOAD CV ↓
            </MagneticButton>
            <MagneticButton
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-300 px-2"
            >
              LINKEDIN ↗
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

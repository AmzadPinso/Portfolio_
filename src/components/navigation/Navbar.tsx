"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navLinks, profile } from "@/data/profile";

export function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock + Escape-to-close when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container-editorial flex items-center justify-between h-16 md:h-20">
          {/* Logo / name */}
          <a
            href="#hero"
            className="font-display text-sm tracking-[0.16em] font-medium text-foreground hover:text-accent transition-colors duration-300 uppercase"
            aria-label="Back to top — Amzad Pinso"
          >
            AMZAD PINSO
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-eyebrow text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <span className="text-accent mr-1 tabular-nums">{l.number}</span>
                {l.label}
              </a>
            ))}
            <a
              href={profile.cv}
              download
              className="font-mono text-eyebrow text-foreground border border-foreground/40 px-4 py-2 hover:bg-foreground hover:text-background transition-all duration-300 min-h-[44px] inline-flex items-center"
            >
              CV ↓
            </a>
          </div>

          {/* Mobile menu trigger — 44px touch target */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block h-px w-7 bg-foreground"
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 5 : 0,
              }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            />
            <motion.span
              className="block h-px w-7 bg-foreground"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            />
            <motion.span
              className="block h-px w-7 bg-foreground"
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -5 : 0,
              }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-md flex flex-col overflow-y-auto"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, clipPath: "inset(0 0 0% 0)" }
            }
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-1 flex flex-col justify-center px-8">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 py-4 border-b border-border min-h-[44px]"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.1 + i * 0.05,
                    duration: reduce ? 0 : 0.5,
                  }}
                >
                  <span className="font-mono text-eyebrow text-accent tabular-nums">
                    {l.number}
                  </span>
                  <span className="font-display text-headline text-foreground group-hover:text-accent transition-colors">
                    {l.label}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href={profile.cv}
                download
                onClick={() => setMenuOpen(false)}
                className="mt-8 inline-flex items-center justify-center gap-2 font-mono text-eyebrow border border-foreground/40 px-6 py-4 hover:bg-foreground hover:text-background transition-all min-h-[44px]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduce ? 0 : 0.1 + navLinks.length * 0.05,
                  duration: reduce ? 0 : 0.5,
                }}
              >
                DOWNLOAD CV ↓
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

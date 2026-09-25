"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionProps,
  type Variants,
} from "motion/react";

/* ────────────────────────────────────────────────────────────────
 * Reduced-motion hook — centralises the Motion helper.
 * ──────────────────────────────────────────────────────────────── */
export function usePrefersReducedMotion() {
  return useReducedMotion();
}

/* ────────────────────────────────────────────────────────────────
 * Reveal — fades & lifts children into view on scroll.
 * ──────────────────────────────────────────────────────────────── */
type RevealProps = MotionProps & {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
  ...rest
}: RevealProps) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * StaggerChildren — reveals a list of children with a stagger.
 * ──────────────────────────────────────────────────────────────── */
type StaggerProps = {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
};

export function StaggerChildren({
  children,
  delay = 0,
  stagger = 0.08,
  className,
  once = true,
}: StaggerProps) {
  const reduce = usePrefersReducedMotion();
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduce ? 0 : stagger,
      },
    },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * StaggerItem — child element for StaggerChildren.
 * ──────────────────────────────────────────────────────────────── */
type StaggerItemProps = MotionProps & {
  children: React.ReactNode;
  y?: number;
  className?: string;
};

export function StaggerItem({ children, y = 20, className, ...rest }: StaggerItemProps) {
  const reduce = usePrefersReducedMotion();
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div className={className} variants={item} {...rest}>
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * TextReveal — splits text by word and reveals with stagger + mask.
 * ──────────────────────────────────────────────────────────────── */
type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  once = true,
}: TextRevealProps) {
  const reduce = usePrefersReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: delay, staggerChildren: reduce ? 0 : stagger },
    },
  };
  const word: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "110%" },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-40px" }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span style={{ display: "inline-block" }} variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </motion.span>
  );
}

/* ────────────────────────────────────────────────────────────────
 * Parallax — moves element on scroll relative to viewport.
 * ──────────────────────────────────────────────────────────────── */
type ParallaxProps = {
  children: React.ReactNode;
  speed?: number; // -1..1, negative = moves up slower, positive = faster
  className?: string;
};

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [offset] = useState(120);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset * speed * 2]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 30, mass: 0.4 });

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * ParallaxImage — image with clip-path reveal + parallax shift.
 * ──────────────────────────────────────────────────────────────── */
type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  parallax?: number;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  parallax = 0.18,
}: ParallaxImageProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", opacity: 0 }}
      whileInView={
        reduce
          ? { opacity: 1 }
          : { clipPath: "inset(0% 0 0 0)", opacity: 1 }
      }
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={imgClassName}
        style={
          reduce
            ? { width: "100%", height: "100%", objectFit: "cover" }
            : { y, scale, width: "100%", height: "100%", objectFit: "cover", willChange: "transform" }
        }
      />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
 * MagneticButton — wraps a link/button with magnetic attraction.
 * ──────────────────────────────────────────────────────────────── */
type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  download?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.35,
  download,
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const Comp: any = href ? "a" : "button";

  return (
    <motion.a
      ref={ref as any}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ x, y, display: "inline-block" }}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  );
}

/* ────────────────────────────────────────────────────────────────
 * ScrollProgress — top-of-page reading progress bar.
 * ──────────────────────────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-accent"
    />
  );
}

/* ────────────────────────────────────────────────────────────────
 * AnimatedCounter — counts from 0 to target when in view.
 * Supports decimals (e.g. 3.66) via `decimals` prop.
 * ──────────────────────────────────────────────────────────────── */
type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: AnimatedCounterProps) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // Lazy initial state — when reduce is true, start at target value.
  const [display, setDisplay] = useState(() => (reduce ? value : 0));
  const startedRef = useRef(false);

  useEffect(() => {
    // If reduced motion, jump to target value asynchronously (rAF) to
    // avoid the setState-in-effect lint rule.
    if (reduce) {
      if (display !== value) {
        requestAnimationFrame(() => setDisplay(value));
      }
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const from = 0;
            const to = value;
            function step(now: number) {
              const t = Math.min(1, (now - start) / (duration * 1000));
              const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
              setDisplay(from + (to - from) * eased);
              if (t < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduce, display]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────
 * SectionHeading — editorial numbered section header.
 * ──────────────────────────────────────────────────────────────── */
type SectionHeadingProps = {
  number: string;
  label: string;
  className?: string;
};

export function SectionHeading({ number, label, className }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3 mb-12 md:mb-16">
        <span className="font-mono text-section-number text-muted-foreground">
          ({number})
        </span>
        <span className="font-mono text-section-number text-foreground uppercase tracking-widest">
          {label}
        </span>
        <span className="flex-1 h-px bg-border ml-2" aria-hidden />
      </div>
    </Reveal>
  );
}

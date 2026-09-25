"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Subscribe to the (pointer: coarse) media query so we can disable
 * custom cursor on touch devices. Uses useSyncExternalStore to avoid
 * setState-in-effect lint warnings.
 */
function useIsTouchDevice(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(pointer: coarse)");
      const handler = () => onChange();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );
}

/**
 * CursorFollower — desktop-only custom cursor.
 * - Renders a small dot (instant follow) and a larger ring (spring follow).
 * - Hides on touch devices, when reduced-motion is set, or when window loses focus.
 * - Adds a "hovering" state when over interactive elements (a, button, [data-cursor]).
 */
export function CursorFollower() {
  const reduce = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const enabled = !isTouch && !reduce;

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        "a, button, [data-cursor='pointer'], input, textarea, select, [role='button']",
      );
      setHovering(Boolean(interactive));
    }
    function leave() {
      setHidden(true);
    }
    function enter() {
      setHidden(false);
    }
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hidden ? 0 : hovering ? 0 : 1,
          scale: hovering ? 0.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          opacity: hidden ? 0 : hovering ? 0.85 : 0.45,
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}

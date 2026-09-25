"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

/**
 * Preloader — premium editorial intro animation.
 * Sequence: black bg → AMZAD PINSO small label → large 01 → progress line → fade out.
 * Skips animation entirely when prefers-reduced-motion is set.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(reduce ? 100 : 0);

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setDone(true), 200);
      return () => clearTimeout(t);
    }
    const start = performance.now();
    const duration = 1100;
    let raf = 0;
    function step(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => setDone(true), 150);
      }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Small label */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-eyebrow text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            AMZAD PINSO
          </motion.div>

          {/* Large number */}
          <motion.div
            className="font-display text-display text-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            01
          </motion.div>

          {/* Progress line */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(80vw,420px)]">
            <div className="flex items-center justify-between mb-3 font-mono text-eyebrow text-muted-foreground">
              <span>LOADING</span>
              <span>{progress.toString().padStart(3, "0")}</span>
            </div>
            <div className="h-px w-full bg-border relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

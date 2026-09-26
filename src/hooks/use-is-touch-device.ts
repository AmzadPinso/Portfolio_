"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to the (pointer: coarse) media query so we can disable
 * custom interactions on touch devices.
 * Uses useSyncExternalStore to avoid setState-in-effect lint warnings.
 */
export function useIsTouchDevice(): boolean {
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

"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query. Returns `serverFallback` during SSR and
 * hydration, then the live value — avoiding hydration mismatches.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** True when the user asked the OS to minimise motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/** True for mouse/trackpad users (hover-capable, precise pointer). */
export function useIsFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}

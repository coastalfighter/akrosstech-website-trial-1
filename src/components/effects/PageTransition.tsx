"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Route transition: a lime curtain sweeps across on every client-side
 * navigation while the new page fades in. Only opacity is animated on the
 * page wrapper — transforms would break `position: fixed`/sticky children
 * (e.g. ScrollTrigger pins).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  // Track whether a client-side navigation has happened (adjust-state-on-prop-change
  // pattern) so the very first load — covered by the preloader — is not animated.
  const [previousPath, setPreviousPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  if (pathname !== previousPath) {
    setPreviousPath(pathname);
    setNavigated(true);
  }

  const animate = !reduced && navigated;

  return (
    <>
      <AnimatePresence>
        {animate && (
          <m.div
            key={`curtain-${pathname}`}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-lime-500"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 100% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          >
            <span className="font-display text-ink-950 text-2xl font-semibold tracking-[0.4em] uppercase">
              Akrostech
            </span>
          </m.div>
        )}
      </AnimatePresence>
      <m.div
        key={pathname}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: animate ? 0.25 : 0 }}
      >
        {children}
      </m.div>
    </>
  );
}

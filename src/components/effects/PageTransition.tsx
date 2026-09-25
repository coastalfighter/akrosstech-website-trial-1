"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Route transition: an electric-blue panel wipes up on every client-side
 * navigation (showing the destination path, terminal-style) while the new
 * page fades in. Only opacity is animated on the page wrapper so fixed and
 * pinned children are unaffected.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
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
            key={`wipe-${pathname}`}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80] flex items-end bg-signal p-8"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 100% 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          >
            <span className="font-mono text-sm tracking-widest text-white uppercase">
              cd {pathname === "/" ? "~" : pathname}
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

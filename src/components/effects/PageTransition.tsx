"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const names: Record<string, string> = {
  "/": "Home",
  "/about": "Studio",
  "/services": "Services",
  "/contact": "Contact",
  "/blog": "Journal",
};

function pageName(pathname: string): string {
  if (names[pathname]) return names[pathname];
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Route transition: an ink panel with the destination's name in serif
 * slides up and away on every client-side navigation, while the new page
 * fades in. Only opacity is animated on the page wrapper so pinned
 * sections are unaffected.
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
            className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ink text-paper"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
          >
            <span className="font-serif text-5xl italic md:text-7xl">{pageName(pathname)}</span>
          </m.div>
        )}
      </AnimatePresence>
      <m.div
        key={pathname}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: animate ? 0.35 : 0 }}
      >
        {children}
      </m.div>
    </>
  );
}

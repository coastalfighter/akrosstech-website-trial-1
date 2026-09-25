"use client";

import { LazyMotion } from "motion/react";

/** Animation features are fetched after first paint instead of shipping in the main bundle. */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * Enables Framer Motion's lightweight `m.*` components app-wide. `strict`
 * guarantees nobody accidentally imports the full `motion.*` bundle.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

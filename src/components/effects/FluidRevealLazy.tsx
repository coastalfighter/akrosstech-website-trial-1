"use client";

import dynamic from "next/dynamic";

/**
 * Loads the WebGL fluid reveal in its own chunk after hydration, keeping
 * it out of the initial JavaScript (it only ever runs on hover devices).
 */
export const FluidRevealLazy = dynamic(
  () => import("./FluidReveal").then((mod) => mod.FluidReveal),
  { ssr: false },
);

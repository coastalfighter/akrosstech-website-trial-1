"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { INTRO_DURATION_MS } from "@/components/effects/Preloader";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static, CSS-animated fallback: glowing SVG mark (no WebGL cost). */
function StaticVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="animate-float relative">
        <div className="absolute inset-0 scale-150 rounded-full bg-lime-500/20 blur-3xl" />
        <LogoMark className="relative w-[min(70vw,440px)] text-lime-500 drop-shadow-[0_0_40px_rgba(191,247,71,0.4)]" />
      </div>
    </div>
  );
}

/**
 * Decides between the WebGL scene and the static fallback.
 * The three.js bundle is only fetched on capable, wide viewports, on first
 * user intent and after the intro — keeping it off the critical path.
 */
export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)", false);
  const [ready, setReady] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    if (reduced || !wide) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData || !supportsWebGL()) return;

    let cancelled = false;
    let timer: number | undefined;
    const events = [
      "pointermove",
      "pointerdown",
      "wheel",
      "touchstart",
      "keydown",
      "scroll",
    ] as const;

    const load = () => {
      if (cancelled) return;
      events.forEach((evt) => window.removeEventListener(evt, onIntent));
      window.clearTimeout(fallback);
      // Never swap mid-intro: wait until the preloader curtain has lifted.
      const introLeft =
        document.documentElement.dataset.preloader === "active"
          ? INTRO_DURATION_MS - performance.now()
          : 0;
      timer = window.setTimeout(
        () => {
          const schedule =
            window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
          schedule(() => {
            if (cancelled) return;
            setLowPower((navigator.hardwareConcurrency ?? 8) <= 4);
            setReady(true);
          });
        },
        Math.max(0, introLeft),
      );
    };
    // The WebGL bundle is fetched on first user intent (mouse move, scroll,
    // key, touch) — or after a grace period — so it never competes with
    // first paint or the main-thread work of hydration.
    const onIntent = () => load();
    events.forEach((evt) => window.addEventListener(evt, onIntent, { passive: true, once: true }));
    const fallback = window.setTimeout(load, 8000);

    return () => {
      cancelled = true;
      events.forEach((evt) => window.removeEventListener(evt, onIntent));
      window.clearTimeout(fallback);
      if (timer) window.clearTimeout(timer);
    };
  }, [reduced, wide]);

  if (!ready) return <StaticVisual />;
  return (
    <div className="hero-fade absolute inset-0" style={{ animationDelay: "0s" }}>
      <HeroScene lowPower={lowPower} />
    </div>
  );
}

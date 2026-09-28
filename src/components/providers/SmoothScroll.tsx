"use client";

import { useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/*
 * The active Lenis instance lives in a tiny external store so any component
 * can read it via useSyncExternalStore without prop drilling or effects that
 * set state.
 */
let activeLenis: Lenis | null = null;
const listeners = new Set<() => void>();

function publish(instance: Lenis | null) {
  activeLenis = instance;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Access the active Lenis instance (null when smooth scrolling is disabled). */
export function useLenisInstance(): Lenis | null {
  return useSyncExternalStore(
    subscribe,
    () => activeLenis,
    () => null,
  );
}

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis
 * share a single animation frame (no double rAF, no pin jitter). Disabled
 * entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenis = useLenisInstance();
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion) return;

    // Lerp-based smoothing glides consistently at any wheel speed or refresh
    // rate; touch keeps native momentum (smoother on phones than emulation).
    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -80 },
      autoRaf: false,
    });
    // Mobile URL-bar show/hide resizes the viewport; don't re-layout pins for it.
    ScrollTrigger.config({ ignoreMobileResize: true });

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    publish(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      publish(null);
    };
  }, [reducedMotion]);

  // Reset scroll on route change and let ScrollTrigger re-measure the new page.
  useEffect(() => {
    if (window.location.hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return <>{children}</>;
}

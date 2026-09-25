"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='button'], [data-cursor], summary, label[for]";

/**
 * Two-part cursor: a precise dot plus a lagging ring that grows over
 * interactive elements and can show a label via `data-cursor-label`.
 * Only rendered for fine pointers and when motion is allowed.
 */
export function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "hover" | "hidden">("hidden");

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      setState((s) => (s === "hidden" ? "idle" : s));
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      if (target) {
        setState("hover");
        setLabel(target.dataset.cursorLabel ?? null);
      } else {
        setState("idle");
        setLabel(null);
      }
    };

    const onLeave = () => setState("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const hidden = state === "hidden";
  const hover = state === "hover";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={dotRef} className="fixed top-0 left-0">
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500 transition-[width,height,opacity] duration-200"
          style={{ width: hover ? 0 : 6, height: hover ? 0 : 6, opacity: hidden ? 0 : 1 }}
        />
      </div>
      <div ref={ringRef} className="fixed top-0 left-0">
        <div
          className="text-ink-950 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-lime-500/60 text-[10px] font-semibold tracking-widest uppercase transition-[width,height,background-color,opacity,border-color] duration-300 ease-out"
          style={{
            width: label ? 84 : hover ? 56 : 34,
            height: label ? 84 : hover ? 56 : 34,
            opacity: hidden ? 0 : 1,
            backgroundColor: label
              ? "rgb(191 247 71)"
              : hover
                ? "rgb(191 247 71 / 0.12)"
                : "transparent",
            borderColor: hover ? "rgb(191 247 71 / 0.9)" : undefined,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

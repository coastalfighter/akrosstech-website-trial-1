"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='button'], [data-cursor], summary, label[for]";

/**
 * Crosshair cursor: a precise dot plus corner brackets that lag behind and
 * lock onto interactive elements (optionally showing a `data-cursor-label`).
 * Fine pointers only; disabled for reduced motion.
 */
export function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "hover" | "hidden">("hidden");

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const frame = frameRef.current;
    if (!dot || !frame) return;

    document.documentElement.classList.add("has-custom-cursor");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const frameX = gsap.quickTo(frame, "x", { duration: 0.45, ease: "power3.out" });
    const frameY = gsap.quickTo(frame, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      frameX(e.clientX);
      frameY(e.clientY);
      setState((s) => (s === "hidden" ? "idle" : s));
    };
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      setState(target ? "hover" : "idle");
      setLabel(target?.dataset.cursorLabel ?? null);
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
  const size = label ? 96 : state === "hover" ? 48 : 30;
  const corner = "absolute size-2.5 border-pulse transition-colors duration-300";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={dotRef} className="fixed top-0 left-0">
        <div
          className="size-1.5 -translate-x-1/2 -translate-y-1/2 bg-pulse transition-opacity"
          style={{ opacity: hidden ? 0 : 1 }}
        />
      </div>
      <div ref={frameRef} className="fixed top-0 left-0">
        <div
          className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center font-mono text-[10px] tracking-widest text-white uppercase transition-[width,height,opacity,background-color] duration-300 ease-out"
          style={{
            width: size,
            height: size,
            opacity: hidden ? 0 : 1,
            backgroundColor: label
              ? "rgb(61 123 255 / 0.85)"
              : state === "hover"
                ? "rgb(34 211 238 / 0.08)"
                : "transparent",
          }}
        >
          <span className={`${corner} top-0 left-0 border-t border-l`} />
          <span className={`${corner} top-0 right-0 border-t border-r`} />
          <span className={`${corner} bottom-0 left-0 border-b border-l`} />
          <span className={`${corner} right-0 bottom-0 border-r border-b`} />
          {label}
        </div>
      </div>
    </div>
  );
}

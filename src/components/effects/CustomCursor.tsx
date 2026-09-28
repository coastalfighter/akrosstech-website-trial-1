"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const INTERACTIVE = "a, button, [role='button'], [data-cursor], summary, label[for]";

/**
 * A small difference-blended dot (visible on paper and ink alike) that
 * swells over links and becomes a labelled disc on `data-cursor-label`.
 */
export function CustomCursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "hover" | "hidden">("hidden");

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("has-custom-cursor");
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
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
  const size = label ? 92 : state === "hover" ? 44 : 12;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={ref} className="fixed top-0 left-0 mix-blend-difference">
        <div
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white label !text-[10px] text-black transition-[width,height,opacity] duration-500 ease-out"
          style={{ width: size, height: size, opacity: state === "hidden" ? 0 : 1 }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

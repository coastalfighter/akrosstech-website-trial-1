"use client";

import { ArrowUp } from "lucide-react";
import { useLenisInstance } from "@/components/providers/SmoothScroll";

/** "BACK TO TOP ↑" — glides up with Lenis (instant for reduced motion). */
export function BackToTop() {
  const lenis = useLenisInstance();
  return (
    <button
      type="button"
      onClick={() => {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0 });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex w-fit items-center gap-1.5 text-base uppercase"
    >
      Back to top
      <ArrowUp
        className="size-4 transition-transform duration-500 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </button>
  );
}

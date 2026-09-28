"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { rich } from "@/lib/rich";

/**
 * A small photo window that grows to full-bleed as you scroll (sticky
 * stage inside a tall section), with a statement fading in over it.
 */
export function ExpandingImage({ statement }: { statement: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
        tl.fromTo(
          "[data-expand-frame]",
          { clipPath: "inset(30% 34% 30% 34%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
        )
          .fromTo(
            "[data-expand-frame] img",
            { scale: 1.35 },
            { scale: 1, ease: "none", duration: 1 },
            0,
          )
          .fromTo(
            "[data-expand-copy]",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
            0.62,
          );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} data-tone="ink" aria-label="Our team" className="relative h-[220vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-expand-frame className="absolute inset-0">
          <Photo name="teamLaptops" baked sizes="100vw" className="size-full" />
          <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
        </div>
        <div data-expand-copy className="relative container-page flex h-full items-end pb-16">
          <p className="max-w-4xl display-lg text-paper">{rich(statement)}</p>
        </div>
      </div>
    </section>
  );
}

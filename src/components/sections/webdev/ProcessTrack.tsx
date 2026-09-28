"use client";

import { useRef } from "react";
import { processSteps } from "@/content/website-development";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Discovery → Support as a pinned horizontal track: the section holds while
 * the step cards glide sideways with the scroll (and a lime progress line
 * fills). Phones and reduced-motion users get a vertical stack.
 */
export function ProcessTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        tl.to(track, { x: () => -distance() }, 0).fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1 },
          0,
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-title"
      className="overflow-hidden bg-ink py-28 text-paper lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0"
      data-theme="dark"
    >
      <div className="container-page mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-5">
          <Eyebrow>Our process</Eyebrow>
          <h2 id="process-title" className="max-w-2xl h-lg">
            From briefing to launch <span className="opacity-50">— and every day after.</span>
          </h2>
        </div>
        <span className="hidden h-px w-64 bg-paper/15 lg:block" aria-hidden="true">
          <span ref={barRef} className="block h-full w-full origin-left scale-x-0 bg-lime" />
        </span>
      </div>

      <ol
        ref={trackRef}
        className="container-page flex flex-col gap-4 lg:flex-row lg:gap-5 lg:overflow-visible"
      >
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="flex shrink-0 flex-col gap-8 rounded-[6px] border border-paper/12 bg-ink-2 p-6 lg:min-h-[26rem] lg:w-[24rem] lg:p-7"
          >
            <span className="flex items-center justify-between">
              <span className="mono text-lime tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="mono text-fog">{step.duration}</span>
            </span>
            <Icon name={step.icon} className="size-7 text-lime" />
            <div className="flex flex-col gap-3">
              <h3 className="h-md">{step.title}</h3>
              <p className="text-[15px] leading-[1.4] text-fog">{step.description}</p>
            </div>
            <ul className="mt-auto flex flex-wrap gap-2">
              {step.deliverables.map((d) => (
                <li key={d} className="rounded-[2px] border border-paper/15 px-2 py-1 text-[13px]">
                  {d}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

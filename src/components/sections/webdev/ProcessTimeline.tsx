"use client";

import { useRef } from "react";
import { processSteps } from "@/content/website-development";
import { gsap, useGSAP } from "@/lib/gsap";
import { Label } from "@/components/ui/SectionHeading";

/**
 * Discovery → Support as a pinned horizontal scene on desktop (the track
 * travels with vertical scroll); a vertical list on small screens.
 */
export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;
        const distance = () => track.scrollWidth - window.innerWidth + 80;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-tone="ink"
      aria-labelledby="process-title"
      className="overflow-hidden py-28 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-page mb-12 flex flex-col gap-6">
        <Label index="02">Our process</Label>
        <h2 id="process-title" className="max-w-3xl display-md text-fg">
          From briefing <em className="italic">to launch</em> — and every day after.
        </h2>
        <div className="hidden h-px w-full max-w-md bg-line lg:block" aria-hidden="true">
          <div ref={progressRef} className="h-full origin-left bg-lime" />
        </div>
      </div>
      <ol
        ref={trackRef}
        className="container-page flex flex-col lg:w-max lg:max-w-none lg:flex-row lg:pr-[20vw]"
      >
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col gap-5 border-t border-line py-8 lg:w-[420px] lg:shrink-0 lg:border-t-0 lg:border-l lg:px-10 lg:py-4"
          >
            <span className="font-serif text-8xl leading-none text-fg">0{i + 1}</span>
            <p className="label text-muted">{step.duration}</p>
            <h3 className="font-serif text-4xl text-fg italic">{step.title}</h3>
            <p className="leading-relaxed text-muted">{step.description}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-line-strong px-3 py-1.5 label !text-[10px] text-fg"
                >
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

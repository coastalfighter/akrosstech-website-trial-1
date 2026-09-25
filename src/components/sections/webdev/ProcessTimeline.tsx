"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { processSteps } from "@/content/website-development";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Discovery → Support. On large screens the section pins and the steps
 * travel horizontally with scroll along a progress rail; small screens and
 * reduced motion get a vertical list.
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
        const tween = gsap.to(track, {
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
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step.querySelectorAll("[data-step-inner]"), {
            y: 30,
            opacity: 0,
            stagger: 0.07,
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left 88%",
              once: true,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className="relative overflow-hidden border-y border-line bg-void py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-lines mask-radial opacity-40"
        aria-hidden="true"
      />
      <div className="relative container-page mb-12 flex flex-col gap-5">
        <Eyebrow index="02">Our process</Eyebrow>
        <h2
          id="process-title"
          className="max-w-3xl text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] leading-[1.04] font-semibold text-fg"
        >
          From first call to launch day—and every day after.
        </h2>
        <div className="mt-2 hidden h-px w-full max-w-md bg-line lg:block" aria-hidden="true">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-signal to-pulse"
          />
        </div>
      </div>

      <ol
        ref={trackRef}
        className="relative container-page flex flex-col gap-4 lg:w-max lg:max-w-none lg:flex-row lg:gap-5 lg:pr-[10vw]"
      >
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            data-step
            className="relative flex flex-col gap-5 rounded-2xl border border-line bg-panel/80 p-7 backdrop-blur lg:h-[430px] lg:w-[370px] lg:shrink-0"
          >
            <div data-step-inner className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-lg bg-signal text-white">
                <Icon name={step.icon} className="size-6" />
              </span>
              <span className="font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
                step_{String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div data-step-inner>
              <p className="font-mono text-xs tracking-[0.12em] text-pulse uppercase">
                {step.duration}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-fg">{step.title}</h3>
            </div>
            <p data-step-inner className="leading-relaxed text-fg-muted">
              {step.description}
            </p>
            <ul data-step-inner className="mt-auto grid gap-2 border-t border-line pt-5">
              {step.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-fg/90">
                  <Check className="size-4 text-pulse" aria-hidden="true" />
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

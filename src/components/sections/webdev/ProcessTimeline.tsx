"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { processSteps } from "@/content/website-development";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Discovery → Support process. On large screens the section pins and the
 * steps scroll horizontally, driven by vertical scroll. On small screens and
 * for reduced motion it is a simple vertical list.
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
            y: 40,
            opacity: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: step,
              containerAnimation: tween,
              start: "left 85%",
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
      className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-page mb-12 flex flex-col gap-5 lg:mb-14">
        <Eyebrow className="w-fit">Our process</Eyebrow>
        <h2
          id="process-title"
          className="text-fg max-w-3xl text-[clamp(2rem,1.3rem+3vw,3.75rem)] leading-[1.05] font-medium"
        >
          From first call to launch day—and every day after.
        </h2>
        <div className="bg-line mt-2 hidden h-px w-full max-w-md lg:block" aria-hidden="true">
          <div ref={progressRef} className="h-full origin-left bg-lime-500" />
        </div>
      </div>

      <ol
        ref={trackRef}
        className="container-page flex flex-col gap-5 lg:w-max lg:max-w-none lg:flex-row lg:gap-6 lg:pr-[10vw]"
      >
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            data-step
            className="border-line bg-ink-850 relative flex flex-col gap-5 rounded-[1.75rem] border p-7 lg:h-[440px] lg:w-[380px] lg:shrink-0"
          >
            <div data-step-inner className="flex items-center justify-between">
              <span className="text-ink-950 grid size-12 place-items-center rounded-2xl bg-lime-500">
                <Icon name={step.icon} className="size-6" />
              </span>
              <span
                aria-hidden="true"
                data-num={String(i + 1).padStart(2, "0")}
                className="font-display text-6xl leading-none font-semibold text-white/[0.07] before:content-[attr(data-num)]"
              />
            </div>
            <div data-step-inner>
              <p className="text-xs font-medium tracking-wide text-lime-500 uppercase">
                {step.duration}
              </p>
              <h3 className="text-fg mt-2 text-2xl font-medium">{step.title}</h3>
            </div>
            <p data-step-inner className="text-fg-muted leading-relaxed">
              {step.description}
            </p>
            <ul data-step-inner className="border-line mt-auto grid gap-2 border-t pt-5">
              {step.deliverables.map((d) => (
                <li key={d} className="text-fg/85 flex items-center gap-2.5 text-sm">
                  <Check className="size-4 text-lime-500" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
            {i < processSteps.length - 1 && (
              <span
                className="absolute top-1/2 -right-6 hidden h-px w-6 bg-gradient-to-r from-lime-500/60 to-transparent lg:block"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

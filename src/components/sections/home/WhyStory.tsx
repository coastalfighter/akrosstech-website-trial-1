"use client";

import { useEffect, useRef, useState } from "react";
import { features, whyChooseUs } from "@/content/home";
import type { PhotoKey } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const steps: {
  title: string;
  description: string;
  icon: IconName;
  label: string;
  photo: PhotoKey;
}[] = [
  { ...whyChooseUs.points[0]!, label: "Why choose us", photo: "circuitBoard" },
  { ...whyChooseUs.points[1]!, label: "Why choose us", photo: "meeting" },
  { ...features.items[0]!, label: features.heading, photo: "highFive" },
  { ...features.items[1]!, label: features.heading, photo: "workshop" },
  { ...features.items[2]!, label: features.heading, photo: "security" },
];

/**
 * Sticky scroll story: the photo on the left crossfades as each reason
 * scrolls through the centre of the viewport.
 */
export function WhyStory() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="why-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow={whyChooseUs.eyebrow}
          index="05"
          title={whyChooseUs.heading}
          description={whyChooseUs.body}
          titleClassName="text-[clamp(2rem,1.2rem+2.8vw,3.5rem)]"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sticky, crossfading photo */}
          <div className="hidden lg:block">
            <div className="sticky top-36 aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              {steps.map((step, i) => (
                <Photo
                  key={step.title}
                  name={step.photo}
                  sizes="(min-width: 1024px) 600px, 0px"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-void/90 to-transparent p-6">
                <span className="font-mono text-xs tracking-[0.16em] text-fg-muted uppercase">
                  {steps[active]?.label}
                </span>
                <span className="font-display text-5xl font-bold text-fg">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-lg text-fg-subtle">
                    /{String(steps.length).padStart(2, "0")}
                  </span>
                </span>
              </div>
              <div className="absolute inset-x-0 top-0 z-10 flex gap-1.5 p-4" aria-hidden="true">
                {steps.map((step, i) => (
                  <span
                    key={step.title}
                    className={cn(
                      "h-0.5 flex-1 rounded-full transition-colors duration-500",
                      i <= active ? "bg-pulse" : "bg-white/20",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="flex flex-col">
            {steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                className={cn(
                  "flex min-h-[46vh] flex-col justify-center border-l-2 py-10 pl-8 transition-colors duration-500 lg:min-h-[60vh]",
                  active === i ? "border-pulse" : "border-line",
                )}
              >
                <Photo
                  name={step.photo}
                  sizes="100vw"
                  className="mb-6 aspect-[16/9] rounded-xl border border-line lg:hidden"
                />
                <p className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
                  {String(i + 1).padStart(2, "0")} {"//"} {step.label}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-lg border transition-colors duration-500",
                      active === i
                        ? "border-signal bg-signal text-white"
                        : "border-line-strong text-pulse",
                    )}
                  >
                    <Icon name={step.icon} className="size-6" />
                  </span>
                  <h3
                    className={cn(
                      "text-2xl font-semibold transition-colors duration-500 sm:text-3xl",
                      active === i ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-fg-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

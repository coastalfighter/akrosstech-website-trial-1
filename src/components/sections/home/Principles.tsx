"use client";

import { useState } from "react";
import { features, whyChooseUs } from "@/content/home";
import type { PhotoKey } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

const items: { title: string; description: string; photo: PhotoKey }[] = [
  { ...whyChooseUs.points[0]!, photo: "circuitBoard" },
  { ...whyChooseUs.points[1]!, photo: "meeting" },
  { ...features.items[0]!, photo: "highFive" },
  { ...features.items[1]!, photo: "workshop" },
  { ...features.items[2]!, photo: "security" },
];

/**
 * Why choose us — horizontal accordion. On desktop the hovered/focused
 * panel widens to reveal its photo and copy; on mobile panels stack open.
 */
export function Principles() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="why"
      data-tone="paper"
      data-index-label="Why us"
      aria-labelledby="why-title"
      className="py-28 md:py-40"
    >
      <div className="container-page">
        <div className="mb-16 grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
          <SectionHeading
            id="why-title"
            label={whyChooseUs.eyebrow}
            index="06"
            title="Built for reliability, *scalability* and value."
            size="md"
          />
          <p className="max-w-md leading-relaxed text-muted">{whyChooseUs.body}</p>
        </div>

        <ul className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {items.map((item, i) => {
            const open = active === i;
            return (
              <li
                key={item.title}
                onPointerEnter={() => setActive(i)}
                className={cn(
                  "group relative overflow-hidden border border-line transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:min-w-0",
                  open ? "lg:flex-[4]" : "lg:flex-[1]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  className="relative flex h-full w-full flex-col justify-between gap-8 p-6 text-left lg:p-8"
                >
                  <Photo
                    name={item.photo}
                    baked
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className={cn(
                      "absolute inset-0 -z-10 transition-opacity duration-700",
                      open ? "lg:opacity-100" : "lg:opacity-0",
                      "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-0 -z-10 bg-ink/55 transition-opacity duration-700",
                      open ? "lg:opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "flex justify-between label transition-colors duration-700",
                      open ? "lg:text-paper" : "text-muted",
                    )}
                  >
                    <span>0{i + 1}</span>
                    <span
                      className={cn(
                        "transition-opacity duration-500",
                        open ? "opacity-100" : "lg:opacity-0",
                      )}
                    >
                      ( Principle )
                    </span>
                  </span>
                  <span className="flex flex-col gap-4">
                    <span
                      className={cn(
                        "font-serif text-3xl leading-none transition-colors duration-700 lg:text-4xl",
                        open
                          ? "lg:text-paper"
                          : "text-fg lg:rotate-180 lg:[writing-mode:vertical-rl]",
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "max-w-md text-sm leading-relaxed transition-[opacity,color] duration-700",
                        open
                          ? "text-muted lg:text-paper/80 lg:opacity-100"
                          : "text-muted lg:hidden",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

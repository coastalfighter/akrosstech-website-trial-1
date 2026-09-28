"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { testimonials } from "@/content/testimonials";
import { Label } from "@/components/ui/SectionHeading";

/** One large serif quote at a time with numbered controls. Sample content. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index]!;
  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <section
      id="voices"
      data-tone="ink"
      data-index-label="Voices"
      aria-labelledby="voices-title"
      aria-roledescription="carousel"
      className="py-28 md:py-40"
    >
      <div className="container-page">
        <div className="mb-14 flex flex-wrap items-center justify-between gap-4">
          <Label index="08">Testimonials</Label>
          <span className="rounded-full border border-line-strong px-3 py-1 label text-muted">
            Sample testimonials — placeholder
          </span>
        </div>
        <h2 id="voices-title" className="sr-only">
          What clients say
        </h2>
        <div className="min-h-[18rem] md:min-h-[22rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <m.figure
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="max-w-6xl font-serif text-[clamp(1.8rem,1rem+2.8vw,4rem)] leading-[1.1] text-fg">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap gap-x-6 gap-y-2 label text-muted">
                <span className="text-fg">{t.role}</span>
                <span>{t.company}</span>
                <span>( {t.service} )</span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <span className="font-serif text-2xl text-fg tabular-nums">
            {String(index + 1).padStart(2, "0")}{" "}
            <span className="text-muted">/ {String(testimonials.length).padStart(2, "0")}</span>
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-12 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-12 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

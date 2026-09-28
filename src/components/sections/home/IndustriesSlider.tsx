"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { industries, industriesIntro } from "@/content/industries";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 3600;

/**
 * Industries — a full-screen dark scene that cycles through the sectors we
 * recruit for: cross-fading photography with a slow push-in and one large
 * centred title. Autoplay pauses on hover/focus, off-screen and for
 * reduced motion; previous/next controls are always available.
 */
export function IndustriesSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const count = industries.length;
  const industry = industries[index]!;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || paused || !visible) return;
    const id = window.setInterval(() => go(1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, visible, go]);

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-roledescription="carousel"
      aria-labelledby="industries-title"
      className="relative h-svh min-h-[36rem] overflow-hidden bg-ink text-paper"
      data-theme="dark"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Photography */}
      <AnimatePresence initial={false}>
        <m.div
          key={industry.name}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <m.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: (INTERVAL_MS + 1200) / 1000, ease: "linear" }}
          >
            <Image
              src={industry.src}
              alt={industry.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </m.div>
        </m.div>
      </AnimatePresence>
      <div
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/60"
        aria-hidden="true"
      />

      {/* Title */}
      <div className="absolute inset-0 grid place-items-center px-5" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={industry.name}
            className="text-center h-display"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {industry.name}
          </m.p>
        </AnimatePresence>
      </div>

      {/* Counter + controls */}
      <div className="absolute inset-x-0 top-20 container-page flex items-center justify-end gap-4">
        <span className="mono text-fog tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous industry"
            className="grid size-9 place-items-center rounded-[3px] border border-paper/25 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next industry"
            className="grid size-9 place-items-center rounded-[3px] border border-paper/25 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-16 container-page grid gap-8 md:bottom-20 md:grid-cols-[1fr_24rem] md:items-end">
        <div className="flex flex-col gap-4">
          <Eyebrow>{industriesIntro.eyebrow}</Eyebrow>
          <h2 id="industries-title" className="max-w-md h-md">
            {industriesIntro.title}
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-[14px] leading-relaxed text-fog">{industriesIntro.body}</p>
          <ButtonLink href="/services/recruitment-process-outsourcing" arrow className="w-fit">
            Recruitment services
          </ButtonLink>
        </div>
      </div>

      {/* Progress ticks */}
      <div className="absolute inset-x-0 bottom-11 container-page flex gap-1.5" aria-hidden="true">
        {industries.map((item, i) => (
          <span
            key={item.name}
            className={cn(
              "h-0.5 flex-1 transition-colors duration-500",
              i === index ? "bg-lime" : "bg-paper/20",
            )}
          />
        ))}
      </div>
    </section>
  );
}

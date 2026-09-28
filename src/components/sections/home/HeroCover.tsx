"use client";

import { useRef } from "react";
import Image from "next/image";
import { homeHero } from "@/content/home";
import { photos } from "@/content/media";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { ButtonLink } from "@/components/ui/Button";

/** Fraction of the viewport the cover has collapsed to when it scrolls away. */
const COLLAPSE = 0.88;
/** Header baseline (px from the top) used to decide its text colour. */
const HEADER_LINE = 44;

/**
 * Cinematic cover (juncastudio-style). The dark hero is pinned while the
 * page scrolls; its top edge slides down until only a strip remains, which
 * then scrolls away into the light page. The header colour is handed over
 * precisely as the edge passes beneath it.
 */
export function HeroCover() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const html = document.documentElement;
      const setHeader = (dark: boolean) => {
        if (dark) html.dataset.heroHeader = "dark";
        else delete html.dataset.heroHeader;
      };

      if (reduced) {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onUpdate: () => setHeader(section.getBoundingClientRect().bottom > HEADER_LINE),
        });
        setHeader(true);
        return () => {
          trigger.kill();
          setHeader(false);
        };
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const edge = self.progress * COLLAPSE * window.innerHeight;
            setHeader(edge < HEADER_LINE && self.progress < 1);
          },
          onLeave: () => setHeader(false),
          onEnterBack: () => setHeader(false),
        },
      });
      tl.fromTo(
        stage,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: `inset(${COLLAPSE * 100}% 0% 0% 0%)`, duration: 1 },
        0,
      )
        .to(contentRef.current, { yPercent: -30, opacity: 0, duration: 0.45 }, 0)
        .to(photoRef.current, { scale: 1.18, yPercent: 8, duration: 1 }, 0);

      setHeader(true);
      return () => setHeader(false);
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={sectionRef}
      id="start"
      aria-labelledby="hero-title"
      className="relative h-[190svh] motion-reduce:h-svh"
      data-theme="dark"
      data-theme-edges="bar"
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-svh overflow-hidden bg-ink text-paper will-change-[clip-path]"
      >
        <div ref={photoRef} className="absolute inset-0 origin-bottom">
          <Image
            src={photos.heroEarth.src}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="empty"
            className="ken-burns object-cover object-[50%_70%] opacity-85"
          />
        </div>
        <div
          className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-ink/55"
          aria-hidden="true"
        />
        <div
          className="absolute -right-[10%] -bottom-[30%] size-[70vw] rounded-full bg-lime/10 blur-[120px]"
          aria-hidden="true"
        />

        <div
          ref={contentRef}
          className="relative container-page flex h-full flex-col justify-end gap-10 pb-20 md:pb-24"
        >
          <IntroTitle as="h1" id="hero-title" className="max-w-5xl h-display">
            {"Offshore talent. *Onshore quality.*"}
          </IntroTitle>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <IntroFade delay={0.35}>
              <p className="max-w-md text-[15px] leading-relaxed text-fog sm:text-base">
                {homeHero.subheadline} Recruitment, virtual assistance, accounting and legal support
                — and now, the websites that help you grow.
              </p>
            </IntroFade>
            <IntroFade delay={0.5} className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="solid" size="lg" arrow>
                Book a call
              </ButtonLink>
              <ButtonLink href="/services" size="lg">
                Our services
              </ButtonLink>
            </IntroFade>
          </div>
        </div>
      </div>
    </section>
  );
}

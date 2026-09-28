"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { INTRO_DURATION_MS } from "@/components/effects/Preloader";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const num = (value: string | undefined, fallback: number) => {
  const n = value === undefined ? NaN : Number(value);
  return Number.isFinite(n) ? n : fallback;
};

/** Fade/slide/scale reveal for `[data-reveal]`. */
function initReveal(el: HTMLElement) {
  const d = el.dataset;
  const stagger = num(d.revealStagger, 0);
  const rotateX = num(d.revealRotateX, 0);
  gsap.from(stagger ? Array.from(el.children) : el, {
    y: num(d.revealY, 48),
    scale: num(d.revealScale, 1),
    rotateX,
    opacity: 0,
    duration: 1.1,
    delay: num(d.revealDelay, 0),
    stagger,
    ease: "expo.out",
    transformPerspective: rotateX ? 1000 : undefined,
    transformOrigin: "50% 100%",
    clearProps: "transform,opacity",
    scrollTrigger: { trigger: el, start: d.revealStart ?? "top 95%", once: true },
  });
}

/** Masked split-text reveal for `[data-split]`. */
function initSplit(el: HTMLElement) {
  const d = el.dataset;
  const mode = d.split === "chars" || d.split === "words" ? d.split : "lines";
  SplitText.create(el, {
    type: mode === "chars" ? "words,chars" : mode,
    mask: mode === "chars" ? "words" : mode,
    autoSplit: true,
    onSplit(self) {
      const targets = mode === "chars" ? self.chars : mode === "words" ? self.words : self.lines;
      return gsap.from(targets, {
        yPercent: 115,
        rotate: mode === "lines" ? 0 : 6,
        opacity: 0,
        duration: mode === "chars" ? 0.9 : 1.1,
        stagger: num(d.splitStagger, mode === "chars" ? 0.018 : mode === "words" ? 0.04 : 0.09),
        delay: num(d.splitDelay, 0),
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: d.splitStart ?? "top 85%", once: true },
      });
    },
  });
}

/** Scroll-scrubbed parallax for `[data-parallax]`. */
function initParallax(el: HTMLElement) {
  const d = el.dataset;
  const speed = num(d.parallaxSpeed, 0.2);
  const rotate = num(d.parallaxRotate, 0);
  const scale = num(d.parallaxScale, 0);
  gsap.fromTo(
    el,
    { yPercent: -speed * 50, rotate: -rotate / 2, scale: 1 - scale / 2 },
    {
      yPercent: speed * 50,
      rotate: rotate / 2,
      scale: 1 + scale / 2,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}

/** Word-by-word opacity scrub for `[data-scrub-words]`. */
function initScrubWords(el: HTMLElement) {
  SplitText.create(el, {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    },
  });
}

const revealFrom: Record<string, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  center: "inset(22% 22% 22% 22%)",
};

/** Clip-path wipe + zoom-out for `[data-image-reveal]`. */
function initImageReveal(el: HTMLElement) {
  const inner = el.querySelector("img");
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  tl.fromTo(
    el,
    { clipPath: revealFrom[el.dataset.imageReveal ?? "bottom"] ?? revealFrom.bottom },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
  );
  if (inner) tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
}

/** Card that tilts upright as it scrolls into view, for `[data-tilt-in]`. */
function initTiltIn(el: HTMLElement) {
  gsap.fromTo(
    el,
    { rotateX: 32, rotateZ: -5, scale: 0.84, yPercent: 8, transformPerspective: 1400 },
    {
      rotateX: 0,
      rotateZ: 0,
      scale: 1,
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "center 55%", scrub: 0.5 },
    },
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Text scramble for `[data-scramble]`: characters resolve left to right out
 * of random glyphs when the element enters the viewport. Only the visual,
 * aria-hidden copy is scrambled (see <Scramble>), so assistive tech always
 * reads the final text.
 */
function initScramble(el: HTMLElement) {
  const final = el.textContent ?? "";
  if (!final.trim()) return;
  const duration = num(el.dataset.scrambleDuration, 0.9);
  const state = { p: 0 };
  const chars = Array.from(final);
  el.textContent = chars.map((c) => (c.trim() ? "\u00a0" : c)).join("");
  gsap.to(state, {
    p: 1,
    duration,
    delay: num(el.dataset.scrambleDelay, 0),
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: el.dataset.scrambleStart ?? "top 90%", once: true },
    onUpdate: () => {
      const settled = Math.floor(state.p * chars.length);
      el.textContent = chars
        .map((c, i) => {
          if (i < settled || !c.trim()) return c;
          if (i > settled + 6) return "\u00a0";
          return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
        })
        .join("");
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

function initElement(el: HTMLElement) {
  if (el.hasAttribute("data-split")) initSplit(el);
  if (el.hasAttribute("data-scrub-words")) initScrubWords(el);
  if (el.hasAttribute("data-reveal")) initReveal(el);
  if (el.hasAttribute("data-parallax")) initParallax(el);
  if (el.hasAttribute("data-image-reveal")) initImageReveal(el);
  if (el.hasAttribute("data-scramble")) initScramble(el);
  if (el.hasAttribute("data-tilt-in")) initTiltIn(el);
}

/**
 * One client component that powers every declarative motion primitive
 * (`Reveal`, `TextReveal`, `Parallax`, `Scramble`, `ScrubText`,
 * `ImageReveal`, `TiltCard`) on the page, plus the header/bar theme sensor.
 *
 * Elements are initialised lazily as they approach the viewport, and all
 * animations/splits are reverted on route change via a GSAP context.
 */
export function MotionController() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const finePointer = useIsFinePointer();

  // Once every intro animation has finished, mark the preloader as done so
  // later client-side visits to the home page are not offset by the intro.
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.preloader !== "active") return;
    const settleAt = INTRO_DURATION_MS + 3200;
    const id = window.setTimeout(
      () => {
        html.dataset.preloader = "done";
      },
      Math.max(0, settleAt - performance.now()),
    );
    return () => window.clearTimeout(id);
  }, []);

  // Scroll-driven animations — rebuilt for each route.
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {});
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          ctx.add(() => initElement(entry.target as HTMLElement));
        }
      },
      { rootMargin: "0px 0px 35% 0px" },
    );
    // Wait a frame so the incoming route's DOM is committed.
    const frame = requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>(
          "[data-reveal], [data-split], [data-parallax], [data-scrub-words], [data-image-reveal], [data-scramble], [data-tilt-in]",
        )
        .forEach((el) => observer.observe(el));
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ctx.revert();
    };
  }, [pathname, reduced]);

  // Theme sensor: the fixed header and bottom bar switch to light text
  // while a `[data-theme="dark"]` section sits beneath them (the home hero
  // drives the header itself via `data-hero-header`, see <HeroCover>). Only two
  // attributes on <html> change — no page-wide repaints while scrolling.
  useEffect(() => {
    const html = document.documentElement;
    const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]'));
    const counts = { header: 0, bar: 0 };
    const apply = () => {
      html.dataset.header = counts.header > 0 ? "dark" : "light";
      html.dataset.bar = counts.bar > 0 ? "dark" : "light";
    };
    apply();
    // `data-theme-edges="bar"` (or "header") limits a section to one edge.
    const sense = (edge: "header" | "bar", line: string) =>
      dark
        .filter((section) => {
          const edges = section.dataset.themeEdges;
          return !edges || edges === edge;
        })
        .map((section) =>
          ScrollTrigger.create({
            trigger: section,
            start: `top ${line}`,
            end: `bottom ${line}`,
            onToggle: (self) => {
              counts[edge] = Math.max(0, counts[edge] + (self.isActive ? 1 : -1));
              apply();
            },
          }),
        );
    const triggers = [...sense("header", "top+=36"), ...sense("bar", "bottom-=28")];
    return () => {
      triggers.forEach((t) => t.kill());
      counts.header = counts.bar = 0;
    };
  }, [pathname]);

  // 3D tilt — a single delegated pointer listener for every `[data-tilt]`.
  useEffect(() => {
    if (reduced || !finePointer) return;
    let active: HTMLElement | null = null;
    let frame = 0;

    const reset = (el: HTMLElement) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--glare", "0");
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (el !== active) {
        if (active) reset(active);
        active = el;
      }
      if (!el) return;
      const max = num(el.dataset.tilt, 8);
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
        el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
        el.style.setProperty("--gx", `${px * 100}%`);
        el.style.setProperty("--gy", `${py * 100}%`);
        el.style.setProperty("--glare", "1");
      });
    };

    const onLeaveWindow = () => {
      if (active) reset(active);
      active = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      if (active) reset(active);
    };
  }, [reduced, finePointer]);

  return null;
}

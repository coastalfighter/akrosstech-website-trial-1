"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import heroEarth from "@/assets/images/hero-earth.jpg";
import { coverFit, interpolate, lifeScale, type TrailPoint } from "@/lib/trail";
import { cn } from "@/lib/utils";

/** How long a painted blob lives before it has fully retracted (ms). */
const LIFE = 1100;
/** Hard cap so a frantic cursor can never grow the draw list unbounded. */
const MAX_POINTS = 360;
/** Hairline ink rim around the photo (CSS px). */
const RIM = 2;
/** Canvas overflow above/below the band so blobs near its edge stay round. */
const BLEED = 80;
/** Focal point of the photo: the lit-up cities in the lower half. */
const FOCUS = { x: 0.5, y: 0.72 };
/** Zoomed in so the whole band stays over the city lights, not the sky. */
const ZOOM = 1.35;

// Resolved once at module level: an optimised 1920px variant of the photo
// (sharp at the zoom it is drawn with, without shipping the 2400px original).
const { props: photoProps } = getImageProps({
  src: heroEarth,
  alt: "",
  width: 1920,
  height: Math.round((1920 * heroEarth.height) / heroEarth.width),
  quality: 70,
});

/**
 * noth.in-style hover effect for the hero wordmark: the cursor paints a
 * liquid stroke of ink-rimmed blobs filled with a full-colour photo, which
 * retract shortly after. Drawn on one canvas above the letters.
 *
 * - Only runs for fine pointers with motion allowed; otherwise it renders
 *   the children untouched.
 * - The photo is fetched on first hover (never competes with LCP).
 * - The animation loop runs only while blobs are alive.
 */
export function HeroTrail({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let image: CanvasImageSource | null = null;
    let imageSize = { w: 0, h: 0 };
    let imageRequested = false;
    let last: { x: number; y: number } | null = null;
    let pointer = { x: 0.5, y: 0.5 };
    let ink = "#0b0b0a";
    const points: TrailPoint[] = [];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height + BLEED * 2;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    const requestImage = () => {
      if (imageRequested) return;
      imageRequested = true;
      const img = new Image();
      img.decoding = "async";
      img.src = photoProps.src;
      img
        .decode()
        .then(() => {
          imageSize = { w: img.naturalWidth, h: img.naturalHeight };
          image = brighten(img);
        })
        .catch(() => {
          // Photo unavailable: the effect simply stays off.
        });
    };

    // Lift the night-time photo once, up front, instead of filtering every frame.
    const brighten = (img: HTMLImageElement): CanvasImageSource => {
      const off = document.createElement("canvas");
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;
      const octx = off.getContext("2d");
      if (!octx || !("filter" in octx)) return img;
      octx.filter = "brightness(1.45) contrast(1.1) saturate(1.2)";
      octx.drawImage(img, 0, 0);
      return off;
    };

    const circles = (now: number, factor: number, extra: number) => {
      ctx.beginPath();
      for (const p of points) {
        const wobble = 1 + 0.07 * Math.sin(now * 0.004 + p.seed);
        const core = p.r * lifeScale(now - p.born, LIFE) * wobble * factor;
        if (core <= 0.5) continue;
        const r = core + extra;
        ctx.moveTo(p.x + r, p.y);
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
    };

    const draw = (now: number) => {
      while (points.length && now - points[0]!.born >= LIFE) points.shift();
      ctx.clearRect(0, 0, width, height);
      if (!points.length) {
        frame = 0;
        return;
      }

      // 1. Hairline ink rim — just enough to separate photo from paper.
      ctx.fillStyle = ink;
      circles(now, 1, RIM);
      ctx.fill();

      // 2. The photo, clipped to the inner blobs, drifting against the cursor.
      if (image) {
        const box = coverFit(imageSize.w, imageSize.h, width, height, FOCUS.x, FOCUS.y, ZOOM);
        const driftX = (pointer.x - 0.5) * -0.04 * width;
        const driftY = (pointer.y - 0.5) * -0.04 * height;
        ctx.save();
        circles(now, 1, 0);
        ctx.clip();
        ctx.drawImage(image, box.x + driftX, box.y + driftY, box.width, box.height);
        ctx.restore();
      }

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onEnter = () => {
      requestImage();
      ink = getComputedStyle(wrap).color || ink;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      requestImage();
      // Never paint a bare ink stroke: wait until the photo is ready.
      if (!image) return;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      // Canvas space: shifted by the bleed, and kept within the band so the
      // stroke never paints over the headline or the footer row.
      const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height) + BLEED;
      pointer = { x: x / Math.max(width, 1), y: y / Math.max(height, 1) };
      const base = Math.min(Math.max(width * 0.026, 22), 50);
      const now = performance.now();
      const from = last ?? { x, y };
      const speed = Math.hypot(x - from.x, y - from.y);
      // Faster strokes paint wider, like a loaded brush.
      const boost = 0.85 + Math.min(speed / 80, 1) * 0.3;
      const along = last ? interpolate(from, { x, y }, base * 0.35) : [{ x, y }];
      for (const pt of along) {
        points.push({
          x: pt.x,
          y: pt.y,
          r: base * boost * (0.9 + Math.random() * 0.2),
          born: now,
          seed: Math.random() * Math.PI * 2,
        });
      }
      if (points.length > MAX_POINTS) points.splice(0, points.length - MAX_POINTS);
      last = { x, y };
      start();
    };

    const onLeave = () => {
      last = null;
    };

    // Warm the photo once the page is idle, so the very first stroke has it.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(requestImage, { timeout: 4000 })
      : window.setTimeout(requestImage, 2500);

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 w-full"
        style={{ top: -BLEED, height: `calc(100% + ${BLEED * 2}px)` }}
      />
    </div>
  );
}

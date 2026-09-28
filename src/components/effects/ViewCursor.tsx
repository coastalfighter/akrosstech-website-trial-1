"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small label pill that trails the pointer over `[data-cursor]` elements
 * (e.g. "View project" on work cards). One fixed element, moved with
 * transforms in a rAF loop that only runs while the pill is visible.
 * Fine pointers only; purely decorative (aria-hidden).
 */
export function ViewCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    let active = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = active ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX + 14;
      target.y = e.clientY + 14;
      const host = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const next = host?.dataset.cursor ?? null;
      setLabel((prev) => (prev === next ? prev : next));
      if (next && !active) {
        active = true;
        pos.x = target.x;
        pos.y = target.y;
        frame = requestAnimationFrame(tick);
      } else if (!next) {
        active = false;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] will-change-transform"
    >
      <span
        className={`block rounded-[2px] bg-ink px-2.5 py-1.5 font-mono text-[11px] tracking-[0.06em] text-paper uppercase transition-[opacity,scale] duration-300 ${
          label ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {label ?? ""}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * scfo.de-style "On this page" index, fixed on the left of wide screens.
 * Lists every `[data-index-label]` section and highlights the current one.
 */
export function PageIndex() {
  const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-index-label][id]"));
    // Reading the DOM once after mount (external system) — deferred to a frame.
    const frame = requestAnimationFrame(() =>
      setSections(els.map((el) => ({ id: el.id, label: el.dataset.indexLabel ?? el.id }))),
    );
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (sections.length === 0) return null;
  // Stay out of the way of the full-bleed hero wordmark.
  const onHero = active === null || active === sections[0]?.id;

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 text-fg transition-[color,opacity] duration-700 2xl:block",
        onHero && "pointer-events-none opacity-0",
      )}
    >
      <p className="mb-4 label opacity-50">On this page</p>
      <ul className="flex flex-col gap-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="group flex items-center gap-3 label !text-[10px]">
              <span
                className={cn(
                  "h-px bg-current transition-all duration-500",
                  active === s.id ? "w-8" : "w-3 opacity-50 group-hover:w-5",
                )}
              />
              <span
                className={cn(
                  "transition-opacity duration-500",
                  active === s.id ? "opacity-100" : "opacity-50 group-hover:opacity-100",
                )}
              >
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

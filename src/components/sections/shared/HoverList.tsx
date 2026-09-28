"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PhotoKey } from "@/content/media";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export interface HoverListItem {
  href: string;
  title: string;
  /** Short line shown to the right of the title. */
  meta?: string;
  /** Tiny label (category / date). */
  tag?: string;
  photo: PhotoKey;
  badge?: string;
}

/**
 * Oversized hairline rows. Hovering a row floods it with the inverse tone
 * (text flips) while a photo preview trails the cursor. Touch devices get a
 * static thumbnail on each row instead.
 */
export function HoverList({
  items,
  size = "lg",
  headingLevel = "h3",
}: {
  items: HoverListItem[];
  size?: "md" | "lg";
  headingLevel?: "h2" | "h3";
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const Heading = headingLevel;

  useGSAP(
    () => {
      const list = listRef.current;
      const preview = previewRef.current;
      if (!list || !preview) return;
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3.out" });
        const rTo = gsap.quickTo(preview, "rotate", { duration: 0.9, ease: "power3.out" });
        let lastX: number | null = null;
        let lastY = 0;
        const place = (clientX: number, clientY: number, jump: boolean) => {
          const rect = list.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          if (jump) gsap.set(preview, { x, y, rotate: 0 });
          else {
            xTo(x);
            yTo(y);
            rTo(gsap.utils.clamp(-8, 8, (clientX - (lastX ?? clientX)) * 0.4));
          }
          lastX = clientX;
          lastY = clientY;
        };
        // First contact (including the cursor arriving via scroll) jumps the
        // preview under the pointer instead of flying in from the corner.
        const onMove = (e: PointerEvent) => place(e.clientX, e.clientY, lastX === null);
        const onLeave = () => {
          lastX = null;
        };
        // Scrolling moves the list under a still cursor: keep the preview pinned to it.
        const onScroll = () => {
          if (lastX !== null) place(lastX, lastY, false);
        };
        list.addEventListener("pointermove", onMove);
        list.addEventListener("pointerover", onMove);
        list.addEventListener("pointerleave", onLeave);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
          list.removeEventListener("pointermove", onMove);
          list.removeEventListener("pointerover", onMove);
          list.removeEventListener("pointerleave", onLeave);
          window.removeEventListener("scroll", onScroll);
        };
      });
      return () => mm.revert();
    },
    { scope: listRef },
  );

  return (
    <div ref={listRef} className="relative" onPointerLeave={() => setActive(null)}>
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
      >
        <div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[opacity,scale] duration-500 ease-out",
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
          style={{ width: 300, height: 380 }}
        >
          {items.map((item, i) => (
            <Photo
              key={item.href}
              name={item.photo}
              natural
              sizes="300px"
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                active === i ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      <ul className="border-t border-line">
        {items.map((item, i) => (
          <li key={item.href} onPointerEnter={() => setActive(i)} className="border-b border-line">
            <Link
              href={item.href}
              data-cursor-label="View"
              className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-6 sm:gap-8 md:py-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-lime transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <span className="flex items-center gap-4 pl-0 transition-[padding,color] duration-700 group-hover:pl-4 group-hover:text-ink">
                <span className="w-8 label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <Photo
                  name={item.photo}
                  sizes="80px"
                  className="size-14 shrink-0 sm:size-16 lg:hidden"
                />
              </span>
              <span className="min-w-0 transition-colors duration-700 group-hover:text-ink">
                <Heading
                  className={cn(
                    "font-serif leading-[1] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:italic",
                    size === "lg"
                      ? "text-[clamp(1.9rem,1rem+3.6vw,5rem)]"
                      : "text-[clamp(1.5rem,1rem+1.8vw,2.75rem)]",
                  )}
                >
                  {item.title}
                  {item.badge && (
                    <span className="ml-3 inline-block translate-y-[-0.6em] rounded-full border border-current px-2 py-0.5 label !text-[9px] not-italic">
                      {item.badge}
                    </span>
                  )}
                </Heading>
                {(item.tag || item.meta) && (
                  <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted transition-colors duration-700 group-hover:text-ink/70 md:hidden">
                    {item.tag && <span className="label">{item.tag}</span>}
                  </span>
                )}
              </span>
              <span className="flex items-center gap-6 pr-0 transition-[padding,color] duration-700 group-hover:pr-4 group-hover:text-ink">
                {item.meta && (
                  <span className="hidden max-w-xs text-right text-sm leading-relaxed md:block">
                    {item.meta}
                  </span>
                )}
                <ArrowUpRight
                  className="size-6 shrink-0 transition-transform duration-700 group-hover:rotate-45 md:size-8"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

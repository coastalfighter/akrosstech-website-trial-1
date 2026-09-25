"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allServiceCards } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { homeServicesIntro } from "@/content/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Numbered service rows. On fine pointers a graded photo preview follows
 * the cursor and swaps per hovered row; touch devices see inline thumbnails.
 */
export function ServicesIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      const preview = previewRef.current;
      if (!list || !preview) return;
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const rect = list.getBoundingClientRect();
          xTo(e.clientX - rect.left);
          yTo(e.clientY - rect.top);
        };
        list.addEventListener("pointermove", onMove);
        return () => list.removeEventListener("pointermove", onMove);
      });
      return () => mm.revert();
    },
    { scope: listRef },
  );

  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow={homeServicesIntro.eyebrow}
            index="02"
            title={homeServicesIntro.heading}
          />
          <ButtonLink href="/services" variant="secondary" arrow>
            View All Services
          </ButtonLink>
        </div>

        <div
          ref={listRef}
          className="relative border-t border-line"
          onPointerLeave={() => setActive(null)}
        >
          {/* Floating cursor-following preview (desktop) */}
          <div
            ref={previewRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-20 hidden lg:block"
          >
            <div
              className={cn(
                "relative -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-line-strong shadow-2xl shadow-black/70 transition-[opacity,scale] duration-300",
                active === null ? "scale-90 opacity-0" : "scale-100 opacity-100",
              )}
              style={{ width: 340, height: 230 }}
            >
              {allServiceCards.map((service, i) => (
                <Photo
                  key={service.slug}
                  name={servicePhotos[service.slug]?.hero ?? "blocks"}
                  natural
                  sizes="340px"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>

          <ul>
            {allServiceCards.map((service, i) => (
              <li
                key={service.slug}
                onPointerEnter={() => setActive(i)}
                className="border-b border-line"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 py-7 transition-colors sm:gap-8 sm:py-9"
                >
                  <span
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-signal/15 via-signal/5 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Photo
                      name={servicePhotos[service.slug]?.hero ?? "blocks"}
                      sizes="96px"
                      className="size-16 shrink-0 rounded-lg border border-line sm:size-20 lg:hidden"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                        {service.title}
                      </h3>
                      {service.slug === "website-development" && <Badge>New</Badge>}
                    </div>
                    <p className="mt-2 block max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">
                      {service.cardSummary}
                    </p>
                  </div>
                  <span className="grid size-11 place-items-center rounded-lg border border-line-strong text-fg-muted transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-white sm:size-14">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

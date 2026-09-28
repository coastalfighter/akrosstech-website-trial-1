"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { allServiceCards } from "@/content/services";
import { serviceTaglines } from "@/content/studio";
import { photos, servicePhotos } from "@/content/media";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";
import { Scramble } from "@/components/motion/Scramble";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/** Screen positions (vw, vh from centre) — items fly out of depth here. */
const SLOTS: [number, number][] = [
  [-24, -19],
  [23, 15],
  [-21, 19],
  [26, -17],
  [2, -29],
  [-30, 3],
  [29, 1],
  [-5, 27],
  [17, -27],
  [-27, -6],
];

/** Depth travel: far away → just past the camera. */
const Z_FROM = -2600;
const Z_TO = 700;
/** Timeline units between consecutive items, and each item's flight time. */
const GAP = 0.7;
const FLIGHT = 2.6;

type OrbitItem =
  | { kind: "card"; key: string; index: number; service: (typeof allServiceCards)[number] }
  | { kind: "photo"; key: string; slug: string };

/** Cards and photos interleaved: card, its photo, next card, … */
const items: OrbitItem[] = allServiceCards.flatMap((service, index) => [
  { kind: "card" as const, key: `card-${service.slug}`, index, service },
  { kind: "photo" as const, key: `photo-${service.slug}`, slug: service.slug },
]);

/**
 * "Our services." — juncastudio-style orbit. The title stays pinned in the
 * centre while service cards and photographs fly out of the distance and
 * past the camera as you scroll. Desktop only; phones and reduced-motion
 * users get a plain card list.
 */
export function ServicesOrbit() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-orbit-item]");
        // While items fly, the visual layer is decorative; an accessible list
        // of the same links takes over for keyboard and screen-reader users.
        const visual = sectionRef.current?.querySelector<HTMLElement>("[data-orbit-visual]");
        const accessible = sectionRef.current?.querySelector<HTMLElement>("[data-orbit-a11y]");
        if (visual) {
          visual.inert = true;
          visual.setAttribute("aria-hidden", "true");
        }
        if (accessible) accessible.hidden = false;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });
        els.forEach((el, i) => {
          const [x, y] = SLOTS[i % SLOTS.length]!;
          const at = i * GAP;
          gsap.set(el, { xPercent: -50, yPercent: -50, x: `${x}vw`, y: `${y}vh` });
          tl.fromTo(el, { z: Z_FROM }, { z: Z_TO, duration: FLIGHT }, at)
            .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55 }, at)
            .to(el, { autoAlpha: 0, duration: 0.35 }, at + FLIGHT - 0.35);
        });
        // Hold the last frame briefly before the section releases.
        tl.to({}, { duration: 0.4 });
        return () => {
          if (visual) {
            visual.inert = false;
            visual.removeAttribute("aria-hidden");
          }
          if (accessible) accessible.hidden = true;
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative py-24 motion-safe:md:h-[360vh] motion-safe:md:py-0"
    >
      <div className="motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-svh motion-safe:md:overflow-hidden motion-safe:md:[perspective:1100px]">
        {/* Centre title */}
        <div className="container-page flex flex-col items-center gap-6 text-center motion-safe:md:absolute motion-safe:md:inset-0 motion-safe:md:justify-center">
          <Scramble as="h2" id="services-title" className="h-xl">
            Our services.
          </Scramble>
          <ButtonLink href="/services" arrow>
            Discover all services
          </ButtonLink>
        </div>

        {/* Accessible twin of the flying cards (enabled while they animate). */}
        <ul
          data-orbit-a11y=""
          hidden
          className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:inset-x-0 focus-within:bottom-16 focus-within:z-10 focus-within:container-page focus-within:flex focus-within:flex-wrap focus-within:justify-center focus-within:gap-2"
        >
          {allServiceCards.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex rounded-[3px] bg-ink px-4 py-2.5 text-paper"
              >
                <h3 className="text-[13px] font-medium">{service.title}</h3>
              </Link>
            </li>
          ))}
        </ul>

        {/* Flying items (a stacked list below md) */}
        <ul
          data-orbit-visual=""
          className="container-page mt-14 grid gap-4 sm:grid-cols-2 motion-safe:md:absolute motion-safe:md:inset-0 motion-safe:md:mt-0 motion-safe:md:block motion-safe:md:[transform-style:preserve-3d] lg:grid-cols-3"
        >
          {items.map((item) =>
            item.kind === "card" ? (
              <li
                key={item.key}
                data-orbit-item=""
                className="motion-safe:md:invisible motion-safe:md:absolute motion-safe:md:top-1/2 motion-safe:md:left-1/2 motion-safe:md:w-[17rem] motion-safe:md:will-change-transform"
              >
                <Link
                  href={`/services/${item.service.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-[4px] bg-ink p-5 text-paper transition-colors hover:bg-moss-800"
                >
                  <span className="flex items-center justify-between mono">
                    <span className="text-lime">{String(item.index + 1).padStart(2, "0")}</span>
                    {item.service.slug === "website-development" && <Badge>New</Badge>}
                  </span>
                  <h3 className="font-display text-[22px] leading-[1.1] font-medium tracking-[-0.03em]">
                    {item.service.title}
                  </h3>
                  <span className="text-[13px] leading-tight text-paper/55">
                    {serviceTaglines[item.service.slug]}
                  </span>
                  <span className="line-clamp-4 text-sm leading-[1.35] text-paper/80">
                    {item.service.cardSummary}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-lime">
                    Learn more
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ) : (
              <li
                key={item.key}
                data-orbit-item=""
                aria-hidden="true"
                className={cn(
                  "hidden motion-safe:md:invisible motion-safe:md:absolute motion-safe:md:top-1/2 motion-safe:md:left-1/2 motion-safe:md:block motion-safe:md:w-[13rem] motion-safe:md:will-change-transform",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-2">
                  <Image
                    src={photos[servicePhotos[item.slug]?.hero ?? "blocks"].src}
                    alt=""
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

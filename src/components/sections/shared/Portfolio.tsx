"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/content/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { Photo } from "@/components/ui/Photo";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Sample work gallery. On large screens the section pins and the cards
 * travel horizontally with scroll; on touch/small screens it becomes a
 * native swipeable scroller with snap points.
 */
export function Portfolio({ title = "Selected work", index }: { title?: string; index?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;
        const distance = () => track.scrollWidth - track.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="work-title"
      className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div className="container-page mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-12">
        <div className="flex flex-col gap-5">
          <Eyebrow index={index}>Portfolio</Eyebrow>
          <h2
            id="work-title"
            className="max-w-3xl text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] leading-[1.04] font-semibold text-fg"
          >
            {title}
          </h2>
          <p className="max-w-xl text-fg-muted">
            A preview of the kind of websites and applications we design and build. Real client case
            studies are coming soon.
          </p>
        </div>
        <Badge tone="warning">Sample projects</Badge>
      </div>

      <ul
        ref={trackRef}
        className="container-page flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-4 lg:w-full lg:max-w-none lg:snap-none lg:overflow-visible lg:pr-[20vw] lg:pl-[max(2.5rem,calc((100vw-1360px)/2+2.5rem))]"
        aria-label="Sample projects"
      >
        {portfolio.map((item, i) => (
          <li
            key={item.title}
            className="group w-[82vw] shrink-0 snap-start sm:w-[440px] lg:w-[520px]"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-500 group-hover:border-signal/40">
              <Photo
                name={item.photo}
                className="aspect-[4/3]"
                sizes="(min-width: 1024px) 520px, 82vw"
              >
                <span className="absolute top-4 left-4 z-10 font-mono text-[11px] tracking-[0.14em] text-white/80 uppercase">
                  {String(i + 1).padStart(2, "0")} / {String(portfolio.length).padStart(2, "0")}
                </span>
                <span className="absolute top-4 right-4 z-10">
                  <Badge tone="neutral" className="bg-void/70 backdrop-blur">
                    Sample
                  </Badge>
                </span>
              </Photo>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-pulse uppercase">
                    {item.category}
                  </p>
                  <ArrowUpRight
                    className="size-5 text-fg-subtle transition-all duration-300 group-hover:rotate-45 group-hover:text-pulse"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-fg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Technology">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-fg-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { webDevHero, websitePackages } from "@/content/website-development";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

/** Abstract browser window used in the 3D stack. */
function BrowserMock({ tone, label }: { tone: string; label: string }) {
  return (
    <div className="border-line-strong bg-ink-850 h-full w-full overflow-hidden rounded-2xl border shadow-2xl shadow-black/60">
      <div className="border-line bg-ink-800 flex items-center gap-1.5 border-b px-4 py-2.5">
        <span className="size-2 rounded-full bg-red-400/70" />
        <span className="size-2 rounded-full bg-amber-300/70" />
        <span className="size-2 rounded-full bg-lime-500/80" />
        <span className="text-fg-subtle ml-3 h-4 flex-1 rounded-full bg-white/[0.05] px-3 text-[9px] leading-4">
          {label}
        </span>
      </div>
      <div className="grid gap-3 p-4">
        <div
          className="h-24 rounded-xl"
          style={{ background: `linear-gradient(120deg, ${tone}, transparent)` }}
        />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-white/[0.05]" />
          ))}
        </div>
        <div className="h-2 w-3/4 rounded bg-white/[0.08]" />
        <div className="h-2 w-1/2 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

/**
 * Home-page teaser for the new Website Development service.
 * A stack of browser windows fans out in 3D as the section scrolls into view.
 */
export function WebDevSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-stack-layer]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center 45%",
            scrub: 1,
          },
        });
        layers.forEach((layer, i) => {
          tl.fromTo(
            layer,
            { rotateX: 55, rotateZ: -18, z: -120 * i, y: 80 * i, opacity: 0.3 },
            {
              rotateX: 52,
              rotateZ: -22,
              z: i * 110,
              y: -i * 95,
              x: i * 46,
              opacity: 1,
              ease: "none",
            },
            0,
          );
        });
        gsap.from("[data-spot-line]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const startingPrice = websitePackages[0]?.price ?? "";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="webdev-spot-title"
      className="border-line bg-ink-900 relative overflow-hidden border-y py-24 sm:py-32"
    >
      <div className="line-grid mask-radial absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <Eyebrow>{webDevHero.eyebrow}</Eyebrow>
            <Badge>New</Badge>
          </div>
          <h2
            id="webdev-spot-title"
            className="text-fg text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.02] font-medium"
          >
            Now building <span className="text-gradient-lime">websites</span> that work as hard as
            your team.
          </h2>
          <div
            data-spot-line
            className="h-px w-full bg-gradient-to-r from-lime-500 via-teal-400/50 to-transparent"
            aria-hidden="true"
          />
          <p className="text-fg-muted max-w-xl text-lg leading-relaxed">{webDevHero.intro}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Custom design & development",
              "E-commerce & CMS",
              "Web applications",
              "SEO & performance",
              "Mobile-first builds",
              "Maintenance plans",
            ].map((item) => (
              <li key={item} className="text-fg/90 flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-lime-500/15 text-lime-500">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <ButtonLink href="/services/website-development" size="lg" arrow>
              See Packages & Process
            </ButtonLink>
            <p className="text-fg-muted text-sm">
              Websites from{" "}
              <span className="font-display text-2xl font-semibold text-lime-500">
                {startingPrice}
              </span>
            </p>
          </div>
        </div>

        <div className="relative h-[420px] [perspective:1400px] sm:h-[500px]" aria-hidden="true">
          <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]">
            {[
              { tone: "rgb(124 92 255 / 0.55)", label: "store.yourbrand.com" },
              { tone: "rgb(61 224 197 / 0.55)", label: "app.yourbrand.com" },
              { tone: "rgb(191 247 71 / 0.6)", label: "yourbrand.com" },
            ].map((layer, i) => (
              <div
                key={layer.label}
                data-stack-layer
                className="absolute h-[280px] w-[min(92%,480px)] [transform-style:preserve-3d] sm:h-[330px]"
                style={{
                  transform: `rotateX(52deg) rotateZ(-22deg) translateZ(${i * 110}px) translateY(${-i * 95}px) translateX(${i * 46}px)`,
                }}
              >
                <BrowserMock tone={layer.tone} label={layer.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

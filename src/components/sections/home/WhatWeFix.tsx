import Image from "next/image";
import { whatWeDo } from "@/content/home";
import { photos } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The problem we solve, stated plainly, with a photograph that tilts
 * upright as it scrolls in, then how our talent network answers it.
 */
export function WhatWeFix() {
  return (
    <section aria-labelledby="fix-title" className="overflow-hidden pb-32 md:pb-44">
      <div className="container-page">
        <TextReveal as="h2" id="fix-title" split="lines" className="max-w-5xl h-lg">
          Great businesses, slowed down by busywork.{" "}
          <em className="not-italic opacity-50">
            Hiring, admin, books and legal prep — we take it off your plate.
          </em>
        </TextReveal>

        <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div data-tilt-in="" className="origin-bottom will-change-transform">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[6px] bg-paper-2 shadow-[0_40px_80px_-30px_rgb(10_10_10/0.45)]">
              <Image
                src={photos.teamLaptops.src}
                alt={photos.teamLaptops.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 rounded-[3px] bg-lime px-2.5 py-1.5 mono text-ink">
                100+ pre-vetted professionals
              </span>
            </div>
          </div>

          <Reveal stagger={0.08} className="flex max-w-lg flex-col gap-6">
            <p className="mono text-stone">( What we fix )</p>
            <p className="h-sm">{whatWeDo.network.title}</p>
            <p className="text-[15px] leading-relaxed text-stone">{whatWeDo.network.body}</p>
            <p className="text-[15px] leading-relaxed text-stone">
              <span className="font-medium text-ink">{whatWeDo.engagement.title}.</span>{" "}
              {whatWeDo.engagement.body}
            </p>
            <ButtonLink href="/about" arrow className="w-fit">
              Discover the company
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

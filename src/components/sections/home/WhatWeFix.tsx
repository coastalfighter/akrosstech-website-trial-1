import Image from "next/image";
import { companyStats } from "@/content/site";
import { photos } from "@/content/media";
import { studioFix } from "@/content/studio";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Counter } from "@/components/motion/Counter";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The problem, the reel, the answer (juncastudio flow): a two-line
 * statement, a wide photograph that starts curved and flattens as it
 * scrolls in, then "( What we fix )" with the talent-network story, our
 * numbers and two staggered photographs.
 */
export function WhatWeFix() {
  return (
    <section aria-labelledby="fix-title" className="pb-40 md:pb-52">
      <div className="container-page">
        <TextReveal as="h2" id="fix-title" split="lines" className="max-w-6xl h-xl">
          {studioFix.title[0]}
          <br />
          {studioFix.title[1]}
        </TextReveal>

        {/* Reel */}
        <div className="mt-20 [perspective:1600px] md:mt-28">
          <div
            data-curve=""
            className="relative aspect-[16/10] origin-bottom overflow-hidden rounded-[6px] bg-ink will-change-transform md:aspect-[16/8]"
          >
            <Image
              src={photos.teamLaptops.src}
              alt={photos.teamLaptops.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent"
              aria-hidden="true"
            />
            <p className="absolute bottom-5 left-5 flex items-center gap-2 mono text-paper md:bottom-7 md:left-7">
              <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
              Inside Akrostech — dedicated teams, U.S. hours
            </p>
          </div>
        </div>

        {/* Answer */}
        <div className="mt-24 grid gap-16 md:mt-32 md:grid-cols-12 md:gap-6">
          <div className="flex flex-col gap-10 md:col-span-5">
            <Reveal stagger={0.08} className="flex flex-col gap-5">
              <p className="text-sm text-stone">{studioFix.label}</p>
              {studioFix.paragraphs.map((p) => (
                <p key={p} className="text-[1.0625rem] leading-[1.4]">
                  {p}
                </p>
              ))}
              <ButtonLink href="/about" arrow className="mt-4 w-fit">
                {studioFix.cta}
              </ButtonLink>
            </Reveal>

            <Reveal
              as="dl"
              stagger={0.06}
              className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/12 pt-8"
            >
              {companyStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-sm text-stone">{stat.label}</dt>
                  <dd className="order-1 font-display text-[2.4rem] leading-none font-medium tracking-[-0.03em] tabular-nums">
                    <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </Reveal>

            <div className="relative aspect-[3/2] w-2/3 overflow-hidden rounded-[3px] bg-paper-2">
              <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={photos.meeting.src}
                  alt={photos.meeting.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 66vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:mt-40">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-paper-2">
              <Parallax speed={0.14} className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={photos.vaLaptop.src}
                  alt={photos.vaLaptop.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Headset } from "lucide-react";
import { aboutCta, aboutHero, approach, edge, experience, support } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StatsSection } from "@/components/sections/shared/StatsSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { TextReveal } from "@/components/motion/TextReveal";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Akrostech is a people-powered partner helping businesses build reliable, high-performance remote teams — across recruitment, virtual assistance, accounting, legal support and website development.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.body}
        breadcrumbs={[{ name: "About Us", path: "/about" }]}
        photo="meeting"
      >
        <ul className="flex flex-wrap gap-2">
          {aboutHero.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line-strong bg-void/50 px-3 py-1.5 font-mono text-xs tracking-[0.08em] text-fg-muted uppercase backdrop-blur"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <ButtonLink href="/contact" size="lg" arrow>
            Contact Us
          </ButtonLink>
          <a
            href={site.contact.phoneHref}
            className="font-mono text-sm text-fg-muted hover:text-pulse"
          >
            Need Help! <span className="text-fg">{site.contact.phone}</span>
          </a>
        </div>
      </PageHero>

      {/* Approach: mission & vision with photography */}
      <section aria-labelledby="approach-title" className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            id="approach-title"
            eyebrow={approach.eyebrow}
            index="01"
            title={approach.heading}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              { ...approach.mission, photo: "teamLaptops" as const },
              { ...approach.vision, photo: "blocks" as const },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <TiltCard className="h-full rounded-2xl" max={4}>
                  <article className="group relative isolate flex h-full min-h-[380px] flex-col justify-end gap-4 overflow-hidden rounded-2xl border border-line p-8 sm:p-10">
                    <Photo
                      name={item.photo}
                      className="absolute inset-0 -z-20"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div
                      className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/80 to-void/10"
                      aria-hidden="true"
                    />
                    <h3 className="font-mono text-xs tracking-[0.2em] text-pulse uppercase">
                      {"// "}
                      {item.title}
                    </h3>
                    <p className="text-2xl leading-snug font-semibold text-fg sm:text-3xl">
                      {item.body}
                    </p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our edge */}
      <section
        aria-labelledby="edge-title"
        className="relative overflow-hidden border-y border-line bg-void py-24 sm:py-32"
      >
        <div className="absolute inset-0 grid-lines mask-radial opacity-40" aria-hidden="true" />
        <div className="relative container-page">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              id="edge-title"
              eyebrow={edge.eyebrow}
              index="02"
              title={edge.heading}
            />
            <Reveal>
              <ButtonLink href="/contact" variant="secondary" arrow>
                Contact Us
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal
            stagger={0.07}
            className="grid [gap:1px] overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {edge.items.map((item, i) => (
              <article
                key={item.title}
                className="group flex h-full flex-col gap-5 bg-void p-7 transition-colors duration-500 hover:bg-panel"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-lg border border-line-strong text-pulse transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                    <Icon name={item.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-xs text-fg-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <StatsSection
        stats={experience.stats}
        eyebrow={experience.eyebrow}
        index="03"
        title={experience.heading}
        description={experience.body}
      />

      {/* 24/7 support strip */}
      <section aria-label={support.title} className="pb-12">
        <div className="container-page">
          <Reveal className="beam flex flex-col items-start gap-6 rounded-2xl p-8 glass sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-signal text-white">
                <Headset className="size-8" aria-hidden="true" />
              </span>
              <div>
                <TextReveal
                  as="h2"
                  split="words"
                  className="text-2xl font-semibold text-fg sm:text-3xl"
                >
                  {support.title}
                </TextReveal>
                <p className="mt-1 text-fg-muted">{support.body}</p>
              </div>
            </div>
            <ButtonLink href={site.contact.phoneHref} size="lg" variant="secondary">
              {site.contact.phone}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBanner {...aboutCta} photo="handshake" />
    </>
  );
}

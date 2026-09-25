import type { Metadata } from "next";
import { Headset } from "lucide-react";
import { aboutCta, aboutHero, approach, edge, experience, support } from "@/content/about";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StatsSection } from "@/components/sections/shared/StatsSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { RotatingBadge } from "@/components/sections/shared/RotatingBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Parallax } from "@/components/motion/Parallax";
import { TextReveal } from "@/components/motion/TextReveal";
import { LogoMark } from "@/components/layout/Logo";
import { site } from "@/content/site";

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
        aside={
          <Parallax speed={-0.3} className="flex justify-center">
            <RotatingBadge />
          </Parallax>
        }
      >
        <div>
          <ul className="flex flex-wrap gap-2">
            {aboutHero.tags.map((tag) => (
              <li
                key={tag}
                className="border-line-strong text-fg/85 rounded-full border bg-white/[0.03] px-4 py-2 text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <ButtonLink href="/contact" size="lg" arrow>
            Contact Us
          </ButtonLink>
          <a href={site.contact.phoneHref} className="text-fg-muted text-sm hover:text-lime-500">
            Need Help! <span className="text-fg font-semibold">{site.contact.phone}</span>
          </a>
        </div>
      </PageHero>

      {/* Approach: mission & vision */}
      <section aria-labelledby="approach-title" className="relative py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading id="approach-title" eyebrow={approach.eyebrow} title={approach.heading} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[approach.mission, approach.vision].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} rotateX={8}>
                <TiltCard className="h-full rounded-[2rem]">
                  <article
                    className={
                      i === 0
                        ? "text-ink-950 relative flex h-full min-h-[300px] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-lime-500 p-8 sm:p-10"
                        : "border-line bg-ink-850 relative flex h-full min-h-[300px] flex-col justify-between gap-10 overflow-hidden rounded-[2rem] border p-8 sm:p-10"
                    }
                  >
                    <LogoMark
                      className={
                        i === 0
                          ? "text-ink-950/10 absolute -right-8 -bottom-8 w-48"
                          : "absolute -right-8 -bottom-8 w-48 text-lime-500/10"
                      }
                    />
                    <h3
                      className={
                        i === 0
                          ? "font-display text-sm font-semibold tracking-[0.25em] uppercase"
                          : "font-display text-sm font-semibold tracking-[0.25em] text-lime-500 uppercase"
                      }
                    >
                      {item.title}
                    </h3>
                    <p
                      className={
                        i === 0
                          ? "relative text-2xl leading-snug font-medium sm:text-3xl"
                          : "text-fg relative text-2xl leading-snug font-medium sm:text-3xl"
                      }
                    >
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
        className="border-line bg-ink-900 relative overflow-hidden border-y py-24 sm:py-32"
      >
        <div className="line-grid mask-radial absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-page relative">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading id="edge-title" eyebrow={edge.eyebrow} title={edge.heading} />
            <Reveal>
              <ButtonLink href="/contact" variant="secondary" arrow>
                Contact Us
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {edge.items.map((item, i) => (
              <TiltCard key={item.title} className="rounded-[1.75rem]">
                <article className="border-line bg-ink-850 flex h-full flex-col gap-5 rounded-[1.75rem] border p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-950 grid size-12 place-items-center rounded-2xl bg-lime-500">
                      <Icon name={item.icon} className="size-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      data-num={`0${i + 1}`}
                      className="font-display text-4xl font-semibold text-white/[0.08] before:content-[attr(data-num)]"
                    />
                  </div>
                  <h3 className="text-fg text-xl font-medium">{item.title}</h3>
                  <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
                </article>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>

      <StatsSection
        stats={experience.stats}
        eyebrow={experience.eyebrow}
        title={experience.heading}
        description={experience.body}
        showHighlight={false}
      />

      {/* 24/7 support strip */}
      <section aria-label={support.title} className="pb-12">
        <div className="container-page">
          <Reveal className="glass flex flex-col items-start gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <span className="text-ink-950 grid size-16 shrink-0 place-items-center rounded-2xl bg-lime-500">
                <Headset className="size-8" aria-hidden="true" />
              </span>
              <div>
                <TextReveal
                  as="h2"
                  split="words"
                  className="text-fg text-2xl font-medium sm:text-3xl"
                >
                  {support.title}
                </TextReveal>
                <p className="text-fg-muted mt-1">{support.body}</p>
              </div>
            </div>
            <ButtonLink href={site.contact.phoneHref} size="lg" variant="secondary">
              {site.contact.phone}
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBanner {...aboutCta} />
    </>
  );
}

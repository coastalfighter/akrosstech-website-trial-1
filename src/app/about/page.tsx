import type { Metadata } from "next";
import { aboutCta, aboutHero, approach, edge, experience, support } from "@/content/about";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StatsSection } from "@/components/sections/shared/StatsSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { Label, SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText, ImageReveal } from "@/components/motion/Scroll";

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
        label={aboutHero.eyebrow}
        title="Outsourcing, reimagined for the *modern business*"
        description={aboutHero.body}
        breadcrumbs={[{ name: "About Us", path: "/about" }]}
        photo="meeting"
      >
        <ul className="flex flex-wrap gap-2 label text-fg">
          {aboutHero.tags.map((t) => (
            <li key={t} className="rounded-full border border-line-strong px-3 py-1.5">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-5">
          <ButtonLink href="/contact" arrow>
            Contact us
          </ButtonLink>
          <a href={site.contact.phoneHref} className="link-line label text-muted">
            Need help? {site.contact.phone}
          </a>
        </div>
      </PageHero>

      {/* Approach: mission & vision */}
      <section data-tone="paper" aria-labelledby="approach-title" className="py-28 md:py-40">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_3fr]">
          <Label index="01">{approach.eyebrow}</Label>
          <div className="flex flex-col gap-16">
            <h2 id="approach-title" className="display-lg text-fg">
              Global teams. <em className="italic">Local precision.</em>
            </h2>
            <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-2">
              {[approach.mission, approach.vision].map((item) => (
                <div key={item.title} className="flex flex-col gap-5">
                  <p className="label text-muted">( {item.title} )</p>
                  <ScrubText className="font-serif text-[clamp(1.6rem,1rem+1.6vw,2.6rem)] leading-[1.12] text-fg">
                    {item.body}
                  </ScrubText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our edge */}
      <section data-tone="ink" aria-labelledby="edge-title" className="py-28 md:py-40">
        <div className="container-page grid gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="edge-title"
              label={edge.eyebrow}
              index="02"
              title="The Akrostech difference: *built for results*"
              size="md"
            />
            <ImageReveal className="aspect-[4/3]">
              <Photo
                name="highFive"
                hover
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="size-full"
              />
            </ImageReveal>
          </div>
          <Reveal stagger={0.08} as="ol" className="border-t border-line">
            {edge.items.map((item, i) => (
              <li
                key={item.title}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-10"
              >
                <span className="pt-3 label text-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-4xl leading-tight text-fg transition-transform duration-700 group-hover:translate-x-2 group-hover:italic">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <StatsSection
        stats={experience.stats}
        label={experience.eyebrow}
        index="03"
        title="Proven partnerships, *measurable impact*"
        description={experience.body}
        tone="paper"
      />

      <section data-tone="paper" aria-label={support.title} className="pb-28">
        <div className="container-page flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label text-muted">( Always on )</p>
            <h2 className="mt-4 display-md text-fg">
              24/7 <em className="italic">support</em>
            </h2>
            <p className="mt-3 text-muted">{support.body}</p>
          </div>
          <ButtonLink href={site.contact.phoneHref} variant="outline" size="lg">
            {site.contact.phone}
          </ButtonLink>
        </div>
      </section>

      <CtaBanner {...aboutCta} photo="handshake" />
    </>
  );
}

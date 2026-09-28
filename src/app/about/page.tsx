import type { Metadata } from "next";
import { aboutCta, aboutHero, approach, edge, experience, support } from "@/content/about";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StatsRow } from "@/components/sections/shared/StatsRow";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { StackCards, type StackCard } from "@/components/sections/shared/StackCards";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/Scroll";
import { Scramble } from "@/components/motion/Scramble";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Akrostech is a people-powered partner helping businesses build reliable, high-performance remote teams — across recruitment, virtual assistance, accounting, legal support and website development.",
  path: "/about",
});

const edgeCards: StackCard[] = edge.items.map((item, i) => ({
  title: item.title,
  description: item.description,
  photo: (["teamLaptops", "developers", "analytics", "handshake"] as const)[i] ?? "meeting",
}));

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title="Outsourcing, reimagined for the *modern business.*"
        description={aboutHero.body}
        breadcrumbs={[{ name: "About Us", path: "/about" }]}
        photo="meeting"
      >
        <ul className="flex flex-wrap gap-2 text-[13px]">
          {aboutHero.tags.map((t) => (
            <li key={t} className="rounded-[3px] border border-ink/15 px-2.5 py-1.5">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="solid" arrow>
            Contact us
          </ButtonLink>
          <ButtonLink href="/services">Our services</ButtonLink>
        </div>
      </PageHero>

      {/* Approach */}
      <section aria-labelledby="approach-title" className="py-32 md:py-44">
        <div className="container-page grid gap-14 lg:grid-cols-[14rem_1fr]">
          <Reveal y={10}>
            <Eyebrow>{approach.eyebrow}</Eyebrow>
          </Reveal>
          <div className="flex flex-col gap-16">
            <Scramble as="h2" id="approach-title" className="h-xl">
              {approach.heading}
            </Scramble>
            <div className="grid gap-10 border-t border-ink/12 pt-10 md:grid-cols-2">
              {[approach.mission, approach.vision].map((block) => (
                <div key={block.title} className="flex flex-col gap-4">
                  <p className="mono text-stone">( {block.title} )</p>
                  <ScrubText className="h-sm">{block.body}</ScrubText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our edge */}
      <section aria-labelledby="edge-title" className="pb-32 md:pb-44">
        <div className="container-page">
          <SectionHeading
            id="edge-title"
            eyebrow={edge.eyebrow}
            title="The Akrostech difference: *built for results.*"
            size="lg"
            className="mb-16"
          />
          <StackCards items={edgeCards} />
        </div>
      </section>

      {/* Experience */}
      <section
        aria-labelledby="experience-title"
        className="bg-ink py-32 text-paper md:py-44"
        data-theme="dark"
      >
        <div className="container-page flex flex-col gap-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <SectionHeading
              id="experience-title"
              eyebrow={experience.eyebrow}
              title="Proven partnerships, *measurable impact.*"
              size="lg"
            />
            <Reveal y={16}>
              <p className="text-[15px] leading-relaxed text-fog">{experience.body}</p>
            </Reveal>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-end">
            <StatsRow stats={experience.stats} className="md:grid-cols-3" />
            <Reveal className="flex flex-col gap-3 rounded-[6px] bg-lime p-6 text-ink">
              <p className="h-md">{support.title}</p>
              <p className="text-[14px]">{support.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand heading={aboutCta.heading} body={aboutCta.body} cta={aboutCta.cta} />
    </>
  );
}

import type { Metadata } from "next";
import { companyStats, site } from "@/content/site";
import { byTheNumbers, ctaBanner } from "@/content/home";
import { getAllBlogPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ServicesIndex } from "@/components/sections/home/ServicesIndex";
import { WebDevSpotlight } from "@/components/sections/home/WebDevSpotlight";
import { GlobalTeams } from "@/components/sections/home/GlobalTeams";
import { WhyStory } from "@/components/sections/home/WhyStory";
import { StatsSection } from "@/components/sections/shared/StatsSection";
import { Portfolio } from "@/components/sections/shared/Portfolio";
import { Testimonials } from "@/components/sections/shared/Testimonials";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { BlogCards } from "@/components/sections/shared/BlogCards";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} — ${site.tagline} | Outsourcing & Website Development` },
};

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesIndex />
      <WebDevSpotlight />
      <GlobalTeams />
      <WhyStory />
      <StatsSection
        stats={companyStats}
        eyebrow={byTheNumbers.eyebrow}
        index="06"
        title="Our journey is just beginning but the momentum is real."
        description={byTheNumbers.body.replace(
          "Our journey is just beginning but the momentum is real. ",
          "",
        )}
        highlight={{
          value: `${byTheNumbers.highlight.value}%`,
          label: byTheNumbers.highlight.label,
        }}
        className="border-y border-line"
      />
      <Portfolio index="07" />
      <Testimonials index="08" />

      <section aria-labelledby="blog-title" className="py-24 sm:py-32">
        <div className="container-page">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              id="blog-title"
              eyebrow="Latest Blog"
              index="09"
              title="Our latest insight news"
            />
            <Reveal>
              <ButtonLink href="/blog" variant="secondary" arrow>
                See All Posts
              </ButtonLink>
            </Reveal>
          </div>
          <BlogCards posts={posts} />
        </div>
      </section>

      <CtaBanner {...ctaBanner} photo="highFive" />
      <ContactSection />
    </>
  );
}

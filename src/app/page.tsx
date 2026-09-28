import type { Metadata } from "next";
import { site } from "@/content/site";
import { getAllBlogPosts } from "@/lib/content";
import { blogPhotos } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Hero } from "@/components/sections/home/Hero";
import { ExpandingImage } from "@/components/sections/home/ExpandingImage";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { Ribbons } from "@/components/sections/home/Ribbons";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { WebDevFeature } from "@/components/sections/home/WebDevFeature";
import { Numbers } from "@/components/sections/home/Numbers";
import { Works } from "@/components/sections/home/Works";
import { Principles } from "@/components/sections/home/Principles";
import { Process } from "@/components/sections/home/Process";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { PageIndex } from "@/components/sections/home/PageIndex";
import { HoverList } from "@/components/sections/shared/HoverList";
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
      <PageIndex />
      <Hero />
      <ExpandingImage statement="Built for startups, scaled by enterprises, *trusted by leaders.*" />
      <Manifesto />
      <Ribbons />
      <ServicesSection />
      <WebDevFeature />
      <Numbers />
      <Works />
      <Principles />
      <Process />
      <Testimonials />

      <section
        id="journal"
        data-tone="paper"
        data-index-label="Journal"
        aria-labelledby="journal-title"
        className="py-28 md:py-40"
      >
        <div className="container-page">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="journal-title"
              label="Latest Blog"
              index="09"
              title="Our latest *insight* news"
            />
            <Reveal>
              <ButtonLink href="/blog" variant="outline" arrow>
                See all posts
              </ButtonLink>
            </Reveal>
          </div>
          <HoverList
            size="md"
            items={posts.map((p) => ({
              href: `/blog/${p.slug}`,
              title: p.title,
              meta: `${formatDate(p.date)} — ${p.readingMinutes} min read`,
              tag: p.category,
              photo: blogPhotos[p.slug] ?? "blocks",
            }))}
          />
        </div>
      </section>

      <ContactSection tone="ink" />
    </>
  );
}

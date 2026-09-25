import type { Metadata } from "next";
import { companyStats, site } from "@/content/site";
import { ctaBanner } from "@/content/home";
import { getAllBlogPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/home/Hero";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ServicesBento } from "@/components/sections/home/ServicesBento";
import { WebDevSpotlight } from "@/components/sections/home/WebDevSpotlight";
import { WhatWeDo } from "@/components/sections/home/WhatWeDo";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
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
      <ServicesBento />
      <WebDevSpotlight />
      <WhatWeDo />
      <WhyChooseUs />
      <StatsSection stats={companyStats} />
      <Portfolio limit={6} />
      <Testimonials />

      <section aria-labelledby="blog-title" className="py-24 sm:py-32">
        <div className="container-page">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading id="blog-title" eyebrow="Latest Blog" title="Our latest insight news" />
            <Reveal>
              <ButtonLink href="/blog" variant="secondary" arrow>
                See All Posts
              </ButtonLink>
            </Reveal>
          </div>
          <BlogCards posts={posts} />
        </div>
      </section>

      <CtaBanner {...ctaBanner} />
      <ContactSection />
    </>
  );
}

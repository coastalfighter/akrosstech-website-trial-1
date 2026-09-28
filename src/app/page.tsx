import type { Metadata } from "next";
import { site } from "@/content/site";
import { serviceFaqs } from "@/content/faqs";
import { getAllBlogPosts } from "@/lib/content";
import { faqJsonLd, pageMetadata, serializeJsonLd } from "@/lib/seo";
import { HeroCover } from "@/components/sections/home/HeroCover";
import { Statement } from "@/components/sections/home/Statement";
import { ServicesOrbit } from "@/components/sections/home/ServicesOrbit";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { WhatWeFix } from "@/components/sections/home/WhatWeFix";
import { WhyWork } from "@/components/sections/home/WhyWork";
import { IndustriesSlider } from "@/components/sections/home/IndustriesSlider";
import { Journal } from "@/components/sections/home/Journal";
import { Voices } from "@/components/sections/home/Voices";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { ContactPanel } from "@/components/sections/shared/ContactPanel";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} — ${site.tagline} | Outsourcing & Website Development` },
};

const homeFaqs = serviceFaqs.slice(0, 8);

export default function HomePage() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(homeFaqs)) }}
      />
      <HeroCover />
      <Statement />
      <ServicesOrbit />
      <SelectedWork />
      <WhatWeFix />
      <WhyWork />
      <IndustriesSlider />
      <Journal posts={posts} />
      <Voices />
      <FaqBlock faqs={homeFaqs} />
      <ContactPanel />
    </>
  );
}

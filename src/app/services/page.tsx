import type { Metadata } from "next";
import { allServiceCards } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { serviceFaqs } from "@/content/faqs";
import { ctaBanner } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { HoverList } from "@/components/sections/shared/HoverList";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";

export const metadata: Metadata = pageMetadata({
  title: "Our Services",
  description:
    "Website Development, Recruitment Process Outsourcing, Virtual Assistance, Accounting & Bookkeeping and Legal Process Outsourcing — offshore talent with onshore quality for U.S. businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our services"
        title="Innovative services for your *business growth*"
        description="From hiring and daily operations to finance, legal support—and now your website—Akrostech gives you one reliable partner for building lean, high-performing remote teams."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        photo="networkCables"
      />
      <section data-tone="ink" aria-label="All services" className="py-28 md:py-40">
        <div className="container-page">
          <HoverList
            headingLevel="h2"
            items={allServiceCards.map((s) => ({
              href: `/services/${s.slug}`,
              title: s.title,
              meta: s.summary,
              photo: servicePhotos[s.slug]?.hero ?? "blocks",
              badge: s.slug === "website-development" ? "New" : undefined,
            }))}
          />
        </div>
      </section>
      <FaqSection faqs={serviceFaqs} />
      <CtaBanner {...ctaBanner} />
    </>
  );
}

import type { Metadata } from "next";
import { serviceFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { ServiceRows } from "@/components/sections/services/ServiceRows";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { CtaBand } from "@/components/sections/shared/CtaBand";

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
        eyebrow="Our services"
        title="Innovative services for your *business growth.*"
        description="From hiring and daily operations to finance, legal support—and now your website—Akrostech gives you one reliable partner for building lean, high-performing remote teams."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />
      <section aria-label="All services" className="pt-20 pb-32 md:pt-28 md:pb-44">
        <div className="container-page">
          <ServiceRows />
        </div>
      </section>
      <FaqBlock faqs={serviceFaqs} />
      <CtaBand />
    </>
  );
}

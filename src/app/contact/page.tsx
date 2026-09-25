import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { serviceFaqs } from "@/content/faqs";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Reach out to Akrostech anytime — call +1 (332) 287-0846, email contact@akrostech.info, or send us a message about outsourcing or website development.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact Us", path: "/contact" },
            ]),
          ),
        }}
      />
      <div className="pt-16">
        <ContactSection headingLevel="h1" />
      </div>
      <FaqSection faqs={serviceFaqs.slice(-4)} title="Before you reach out" />
    </>
  );
}

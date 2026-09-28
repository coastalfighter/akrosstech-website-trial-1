import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata, serializeJsonLd } from "@/lib/seo";
import { serviceFaqs } from "@/content/faqs";
import { ContactPanel } from "@/components/sections/shared/ContactPanel";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";

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
      <ContactPanel
        asPage
        title="Get in *touch.*"
        description="We’re always here to assist you! Whether you have questions, need support, or want to discuss your next project, feel free to reach out anytime."
      />
      <div className="pt-24 md:pt-32">
        <FaqBlock faqs={serviceFaqs.slice(-4)} title="Before you *reach out.*" />
      </div>
    </>
  );
}

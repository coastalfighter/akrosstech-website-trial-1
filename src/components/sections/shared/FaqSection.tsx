import type { Faq } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { faqJsonLd, serializeJsonLd } from "@/lib/seo";

export function FaqSection({
  faqs,
  eyebrow = "FAQs",
  index,
  title = "Frequently asked questions",
}: {
  faqs: Faq[];
  eyebrow?: string;
  index?: string;
  title?: string;
}) {
  return (
    <section aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(faqs)) }}
      />
      <div className="container-page grid gap-12 lg:grid-cols-[2fr_3fr]">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={eyebrow} index={index} title={title} />
        </div>
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

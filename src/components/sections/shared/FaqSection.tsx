import type { Faq } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { faqJsonLd, serializeJsonLd } from "@/lib/seo";

export function FaqSection({
  faqs,
  label = "FAQs",
  index,
  title = "Clarity *up front*",
  tone = "paper",
}: {
  faqs: Faq[];
  label?: string;
  index?: string;
  title?: string;
  tone?: "paper" | "ink";
}) {
  return (
    <section
      id="faq"
      data-tone={tone}
      data-index-label="FAQ"
      aria-labelledby="faq-title"
      className="py-28 md:py-40"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(faqs)) }}
      />
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" label={label} index={index} title={title} size="md" />
        </div>
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

import type { Faq } from "@/content/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Got a question? We answer it here." — title and CTA left, FAQ list right. */
export function FaqBlock({
  faqs,
  title = "Got a question? *We answer it here.*",
  eyebrow = "FAQ",
  id = "faq",
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pb-32 md:pb-44">
      <div className="container-page grid gap-12 border-t border-ink/12 pt-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} size="md" />
          <Reveal y={12}>
            <ButtonLink href="/contact" variant="solid" arrow>
              Get in touch
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal y={24}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

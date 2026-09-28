import type { Faq } from "@/content/faqs";
import { studioFaq } from "@/content/studio";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { rich } from "@/lib/rich";

/** "Got a question? We answer it here." — title and CTA left, FAQ list right. */
export function FaqBlock({
  faqs,
  title = studioFaq.title,
  eyebrow = "FAQ",
  id = "faq",
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-[#faf9f6] pt-20 pb-32 md:pt-24 md:pb-40"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.45fr]">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <Reveal y={10}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            id={`${id}-title`}
            split="lines"
            className="max-w-sm font-display text-[clamp(2.3rem,1.5rem+2.3vw,3.45rem)] leading-[1.08] font-medium tracking-[-0.03em]"
          >
            {rich(title)}
          </TextReveal>
          <Reveal y={12}>
            <ButtonLink href="/contact" arrow>
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

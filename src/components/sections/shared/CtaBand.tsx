import { ArrowUpRight } from "lucide-react";
import { ctaBanner } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";

/** Full-width lime call to action — the loudest brand moment on a page. */
export function CtaBand({
  heading = ctaBanner.heading,
  body = ctaBanner.body,
  cta = ctaBanner.cta,
  href = "/contact",
}: {
  heading?: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section
      aria-labelledby="cta-title"
      className="overflow-hidden bg-lime py-24 text-ink md:py-32"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <TextReveal as="h2" id="cta-title" split="lines" className="max-w-4xl h-xl">
          {heading}
        </TextReveal>
        <Reveal stagger={0.08} className="flex flex-col items-start gap-8">
          <ArrowUpRight className="size-16 stroke-[1.25]" aria-hidden="true" />
          <p className="max-w-sm text-[15px] leading-relaxed">{body}</p>
          <ButtonLink href={href} variant="ink" size="lg" arrow>
            {cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

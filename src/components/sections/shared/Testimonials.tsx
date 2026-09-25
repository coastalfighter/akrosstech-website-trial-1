import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="border-line bg-ink-850 flex w-[340px] shrink-0 flex-col gap-6 rounded-[1.75rem] border p-7 whitespace-normal sm:w-[400px]">
      <div className="flex items-center justify-between">
        <Quote className="size-8 text-lime-500" aria-hidden="true" />
        <Badge tone="neutral">Sample</Badge>
      </div>
      <blockquote className="text-fg/90 text-[15px] leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="border-line mt-auto flex items-center gap-3 border-t pt-5">
        <span
          className="text-ink-950 grid size-10 place-items-center rounded-full bg-gradient-to-br from-lime-500 to-teal-400 text-sm font-bold"
          aria-hidden="true"
        >
          {t.role.charAt(0)}
        </span>
        <span>
          <span className="text-fg block text-sm font-semibold">{t.role}</span>
          <span className="text-fg-subtle block text-xs">
            {t.company} · {t.service}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="container-page mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="What partnering with Akrostech feels like"
        />
        <Reveal>
          <Badge tone="warning">Sample testimonials — placeholder content</Badge>
        </Reveal>
      </div>
      <div className="flex flex-col gap-6">
        <Marquee duration={55}>
          {testimonials.slice(0, half + 1).map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {testimonials.slice(half - 1).map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

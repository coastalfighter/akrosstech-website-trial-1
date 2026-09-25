import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col gap-6 rounded-2xl border border-line bg-panel p-7 whitespace-normal sm:w-[420px]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.14em] text-pulse uppercase">
          {t.service}
        </span>
        <Badge tone="neutral">Sample</Badge>
      </div>
      <blockquote className="text-[15px] leading-relaxed text-fg">“{t.quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-5">
        <span
          className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-signal to-pulse font-display text-sm font-bold text-white"
          aria-hidden="true"
        >
          {t.role.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-fg">{t.role}</span>
          <span className="block text-xs text-fg-subtle">{t.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ index }: { index?: string }) {
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
          index={index}
          title="What partnering with Akrostech feels like"
        />
        <Reveal>
          <Badge tone="warning">Sample testimonials — placeholder content</Badge>
        </Reveal>
      </div>
      <div className="flex flex-col gap-5">
        <Marquee duration={60}>
          {testimonials.slice(0, half + 1).map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
        <Marquee duration={65} reverse>
          {testimonials.slice(half - 1).map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

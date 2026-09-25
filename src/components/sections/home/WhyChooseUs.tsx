import { features, whyChooseUs } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="relative py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-2">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow={whyChooseUs.eyebrow}
            title={whyChooseUs.heading}
            titleClassName="text-[clamp(2rem,1.3rem+2.4vw,3.25rem)]"
          />
          <Reveal>
            <p className="text-fg-muted mt-6 max-w-xl text-lg leading-relaxed">
              {whyChooseUs.body}
            </p>
          </Reveal>
        </div>

        {/* Stacking cards: each card sticks slightly lower than the previous. */}
        <div className="flex flex-col gap-6">
          {whyChooseUs.points.map((point, i) => (
            <div key={point.title} className="lg:sticky" style={{ top: `${7 + i * 1.5}rem` }}>
              <Reveal className="border-line bg-ink-850 rounded-[2rem] border p-8 shadow-2xl shadow-black/40 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="text-ink-950 grid size-14 place-items-center rounded-2xl bg-lime-500">
                    <Icon name={point.icon} className="size-7" />
                  </span>
                  <span
                    aria-hidden="true"
                    data-num={`0${i + 1}`}
                    className="font-display text-5xl font-semibold text-white/10 before:content-[attr(data-num)]"
                  />
                </div>
                <h3 className="text-fg mt-8 text-2xl font-medium sm:text-3xl">{point.title}</h3>
                <p className="text-fg-muted mt-4 leading-relaxed">{point.description}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container-page mt-28">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={features.eyebrow} title={features.heading} />
          <Reveal>
            <ButtonLink href="/contact" variant="secondary" arrow>
              Contact Us
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal stagger={0.1} className="grid gap-5 md:grid-cols-3" rotateX={12}>
          {features.items.map((feature) => (
            <TiltCard key={feature.title} className="rounded-[2rem]">
              <div className="group border-line from-ink-800 to-ink-900 relative h-full overflow-hidden rounded-[2rem] border bg-gradient-to-b p-8">
                <div
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-lime-500/0 blur-2xl transition-colors duration-500 group-hover/tilt:bg-lime-500/20"
                  aria-hidden="true"
                />
                <span className="border-line-strong grid size-14 [transform:translateZ(40px)] place-items-center rounded-2xl border text-lime-500">
                  <Icon name={feature.icon} className="size-7" />
                </span>
                <h3 className="text-fg mt-10 text-2xl font-medium">{feature.title}</h3>
                <p className="text-fg-muted mt-3 leading-relaxed">{feature.description}</p>
              </div>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { homeAbout } from "@/content/home";
import { Label } from "@/components/ui/SectionHeading";
import { ScrubText } from "@/components/motion/Scroll";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";

/** "( The step aside )" — the company story as a scroll-lit paragraph. */
export function Manifesto() {
  return (
    <section
      id="manifesto"
      data-tone="paper"
      data-index-label="About"
      aria-labelledby="manifesto-title"
      className="py-28 md:py-44"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_3fr]">
        <div className="flex flex-col gap-4">
          <Label index="01">{homeAbout.eyebrow}</Label>
          <h2 id="manifesto-title" className="sr-only">
            {homeAbout.heading}
          </h2>
        </div>
        <div>
          <ScrubText className="font-serif text-[clamp(1.9rem,1.1rem+2.9vw,4.1rem)] leading-[1.08] text-fg">
            {homeAbout.heading}. {homeAbout.body} <em className="italic">{homeAbout.addendum}</em>
          </ScrubText>

          <Reveal stagger={0.08} className="mt-20 grid gap-px border-t border-line sm:grid-cols-3">
            {homeAbout.pillars.map((pillar, i) => (
              <div key={pillar.title} className="flex flex-col gap-4 pt-6 sm:pr-8">
                <div className="flex items-center justify-between">
                  <span className="label text-muted">0{i + 1}</span>
                  <Icon name={pillar.icon} className="size-5 text-muted" strokeWidth={1.4} />
                </div>
                <h3 className="font-serif text-2xl text-fg">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-14">
            <Link href="/about" className="group inline-flex items-center gap-3 label text-fg">
              <span className="link-line">More about the studio</span>
              <span
                className="transition-transform duration-500 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

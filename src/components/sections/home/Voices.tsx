import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const initials = (text: string) =>
  text
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * Client voices — a horizontally scrolling row (native scroll-snap, so it
 * works with trackpads, touch and keyboard). Testimonials are sample
 * content and labelled as such.
 */
export function Voices() {
  return (
    <section id="voices" aria-labelledby="voices-title" className="pb-32 md:pb-44">
      <div className="container-page">
        <SectionHeading
          id="voices-title"
          eyebrow="Client voices — sample testimonials"
          title="What working with us *feels like.*"
          size="md"
          className="mb-12"
        />
      </div>
      <Reveal y={30}>
        <ul
          className="container-page flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Sample client testimonials"
        >
          <li className="flex w-[82vw] shrink-0 snap-start flex-col justify-between gap-10 rounded-[6px] bg-ink p-6 text-paper sm:w-[30rem] md:p-8">
            <p className="text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] leading-snug font-medium tracking-[-0.02em]">
              Akrostech works with <span className="text-lime">startups</span>,{" "}
              <span className="text-lime">staffing agencies</span> and{" "}
              <span className="text-lime">enterprises</span> that need reliable people behind their
              growth — and a website that shows it.
            </p>
            <p className="mono text-fog">
              These testimonials are samples, shown until approved client quotes are published.
            </p>
          </li>
          {testimonials.map((t) => (
            <li
              key={t.quote}
              className="flex w-[82vw] shrink-0 snap-start flex-col justify-between gap-10 rounded-[6px] bg-paper-2 p-6 sm:w-[24rem] md:p-8"
            >
              <figure className="flex h-full flex-col justify-between gap-10">
                <blockquote className="text-[17px] leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-[13px] font-medium text-ink"
                    aria-hidden="true"
                  >
                    {initials(t.company)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[14px] font-medium">{t.role}</span>
                    <span className="text-[13px] text-stone">
                      {t.company} · {t.service}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

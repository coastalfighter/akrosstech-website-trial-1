import { Phone } from "lucide-react";
import { homeAbout } from "@/content/home";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden py-24 sm:py-36"
    >
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        {/* Layered photo composition with parallax depth */}
        <div className="relative order-2 min-h-[460px] sm:min-h-[560px] lg:order-1">
          <Parallax speed={0.2} className="absolute top-0 left-0 h-[78%] w-[82%]">
            <Photo
              name="teamLaptops"
              hover
              className="size-full rounded-2xl border border-line"
              sizes="(min-width: 1024px) 520px, 82vw"
            />
          </Parallax>
          <Parallax speed={-0.35} className="absolute right-0 bottom-0 h-[52%] w-[56%]">
            <Photo
              name="developers"
              hover
              className="size-full rounded-2xl border border-line-strong shadow-2xl shadow-black/60"
              sizes="(min-width: 1024px) 360px, 56vw"
            />
          </Parallax>
          <Parallax speed={-0.6} className="absolute bottom-[16%] left-[4%] z-10">
            <div className="rounded-xl px-5 py-4 glass">
              <p className="font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                Talent network
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-fg">
                100<span className="text-pulse">+</span>
              </p>
              <p className="text-xs text-fg-muted">pre-vetted professionals</p>
            </div>
          </Parallax>
          {/* corner brackets */}
          <span
            className="absolute -top-3 -left-3 size-6 border-t-2 border-l-2 border-pulse"
            aria-hidden="true"
          />
          <span
            className="absolute -right-3 -bottom-3 size-6 border-r-2 border-b-2 border-pulse"
            aria-hidden="true"
          />
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            id="about-title"
            eyebrow={homeAbout.eyebrow}
            index="01"
            title={homeAbout.heading}
          />
          <Reveal className="flex flex-col gap-4 text-lg leading-relaxed text-fg-muted">
            <p>{homeAbout.body}</p>
            <p className="text-fg">{homeAbout.addendum}</p>
          </Reveal>

          <Reveal stagger={0.08} className="flex flex-col border-t border-line">
            <p className="pt-6 pb-2 font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
              {homeAbout.insideTitle}
            </p>
            {homeAbout.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="group flex items-start gap-5 border-b border-line py-5"
              >
                <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line-strong text-pulse transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <Icon name={pillar.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-fg">{pillar.title}</span>
                  <span className="block text-sm leading-relaxed text-fg-muted">
                    {pillar.description}
                  </span>
                </span>
              </div>
            ))}
          </Reveal>

          <Reveal className="flex flex-wrap items-center gap-6">
            <ButtonLink href="/about" arrow variant="secondary">
              More About
            </ButtonLink>
            <a href={site.contact.phoneHref} className="group flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-lg bg-signal/15 text-pulse transition-colors group-hover:bg-signal group-hover:text-white">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                  Need Help!
                </span>
                <span className="font-semibold text-fg transition-colors group-hover:text-pulse">
                  {site.contact.phone}
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

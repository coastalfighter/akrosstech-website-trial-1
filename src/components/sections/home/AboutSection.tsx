import { Phone } from "lucide-react";
import { homeAbout } from "@/content/home";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { LogoMark } from "@/components/layout/Logo";
import { RotatingBadge } from "@/components/sections/shared/RotatingBadge";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading id="about-title" eyebrow={homeAbout.eyebrow} title={homeAbout.heading} />
          <Reveal className="text-fg-muted flex flex-col gap-4 text-lg leading-relaxed">
            <p>{homeAbout.body}</p>
            <p className="text-fg">{homeAbout.addendum}</p>
          </Reveal>
          <Reveal className="flex flex-wrap items-center gap-6" delay={0.1}>
            <ButtonLink href="/about" arrow variant="secondary">
              More About
            </ButtonLink>
            <a href={site.contact.phoneHref} className="group flex items-center gap-3">
              <span className="group-hover:text-ink-950 grid size-12 place-items-center rounded-full bg-lime-500/10 text-lime-500 transition-colors group-hover:bg-lime-500">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-fg-subtle text-xs">Need Help!</span>
                <span className="text-fg font-semibold transition-colors group-hover:text-lime-500">
                  {site.contact.phone}
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Layered parallax composition */}
        <div className="relative min-h-[520px]">
          <Parallax speed={0.35} className="absolute inset-x-6 top-0 bottom-10 sm:inset-x-12">
            <div className="border-line from-ink-800 via-ink-850 to-ink-900 relative h-full overflow-hidden rounded-[2rem] border bg-gradient-to-br">
              <div
                className="line-grid mask-radial absolute inset-0 opacity-70"
                aria-hidden="true"
              />
              <div
                className="absolute -top-20 -right-20 size-72 rounded-full bg-lime-500/15 blur-3xl"
                aria-hidden="true"
              />
              <LogoMark className="absolute right-8 bottom-8 w-40 text-lime-500/15" />
            </div>
          </Parallax>

          <Parallax speed={-0.25} className="absolute top-10 left-0 z-10 w-[78%] sm:w-[62%]">
            <div className="glass rounded-3xl p-6 shadow-2xl shadow-black/50">
              <p className="font-display mb-5 text-xs tracking-[0.25em] text-lime-500 uppercase">
                {homeAbout.insideTitle}
              </p>
              <ul className="flex flex-col gap-4">
                {homeAbout.pillars.map((pillar) => (
                  <li key={pillar.title} className="flex items-start gap-4">
                    <span className="text-ink-950 grid size-10 shrink-0 place-items-center rounded-xl bg-lime-500">
                      <Icon name={pillar.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="text-fg block font-semibold">{pillar.title}</span>
                      <span className="text-fg-muted block text-sm leading-relaxed">
                        {pillar.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Parallax>

          <Parallax speed={-0.6} className="absolute right-0 bottom-0 z-20 sm:right-4">
            <RotatingBadge />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

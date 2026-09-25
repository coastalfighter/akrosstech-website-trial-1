import { whatWeDo } from "@/content/home";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { TextReveal } from "@/components/motion/TextReveal";
import { TiltCard } from "@/components/motion/TiltCard";

/** Full-bleed parallax band: "Global Teams. Local Impact." */
export function GlobalTeams() {
  return (
    <section
      aria-labelledby="global-title"
      className="relative isolate overflow-hidden py-28 sm:py-40"
    >
      <Parallax speed={0.4} className="absolute inset-x-0 -top-1/4 -bottom-1/4 -z-20">
        <Photo name="serverRack" baked className="size-full" sizes="100vw" />
      </Parallax>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-canvas/75 to-canvas"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 grid-lines mask-radial opacity-60"
        aria-hidden="true"
      />

      <div className="container-page grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div className="flex flex-col gap-6">
          <Reveal y={16}>
            <Eyebrow index="04">{whatWeDo.eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            id="global-title"
            split="chars"
            className="font-display text-[clamp(3rem,1.4rem+6.4vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.05em] text-fg uppercase"
          >
            {whatWeDo.heading}
          </TextReveal>
          <Reveal className="flex flex-wrap items-end gap-6">
            <p className="font-display text-7xl leading-none font-bold text-signal-soft sm:text-8xl">
              <Counter value={100} suffix="+" />
            </p>
            <p className="max-w-xs pb-2 text-fg-muted">{whatWeDo.projects}</p>
          </Reveal>
          <Reveal>
            <ButtonLink href="/contact" arrow variant="secondary">
              Contact Us
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal stagger={0.1} className="grid gap-4">
          <TiltCard className="rounded-2xl">
            <div className="flex h-full flex-col gap-3 rounded-2xl p-7 glass">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-lg bg-signal text-white">
                  <Icon name="users" className="size-5" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                  {whatWeDo.valueTitle}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-fg">{whatWeDo.network.title}</h3>
              <p className="leading-relaxed text-fg-muted">{whatWeDo.network.body}</p>
            </div>
          </TiltCard>
          <TiltCard className="rounded-2xl">
            <div className="beam flex h-full flex-col gap-3 rounded-2xl p-7 glass">
              <span className="grid size-11 place-items-center rounded-lg bg-pulse/15 text-pulse">
                <Icon name="layers" className="size-5" />
              </span>
              <h3 className="text-2xl font-semibold text-fg">{whatWeDo.engagement.title}</h3>
              <p className="leading-relaxed text-fg-muted">{whatWeDo.engagement.body}</p>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}

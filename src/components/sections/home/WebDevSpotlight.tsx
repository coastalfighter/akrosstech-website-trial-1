import { Check } from "lucide-react";
import { webDevHero, websitePackages } from "@/content/website-development";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { TiltCard } from "@/components/motion/TiltCard";
import { Glow } from "@/components/effects/Backgrounds";

const code: [string, string][] = [
  ["text-ion", "export default function"],
  ["text-fg", " YourWebsite() {"],
  ["text-pulse", "  return <Site fast seo accessible />"],
  ["text-fg", "}"],
];

/** Home teaser for the new Website Development service. */
export function WebDevSpotlight() {
  const startingPrice = websitePackages[0]?.price ?? "";
  return (
    <section
      aria-labelledby="webdev-spot-title"
      className="relative overflow-hidden border-y border-line bg-void py-24 sm:py-36"
    >
      <Glow className="top-10 -right-40 size-[40rem]" tone="ion" />
      <div className="absolute inset-0 grid-lines mask-radial opacity-50" aria-hidden="true" />
      <div className="relative container-page grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative">
          <TiltCard max={5} className="rounded-2xl">
            <Photo
              name="codeDark"
              hover
              className="aspect-[4/3] rounded-2xl border border-line-strong"
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </TiltCard>
          <Parallax
            speed={-0.5}
            className="absolute -bottom-10 -left-4 z-10 w-[78%] sm:-left-10 sm:w-[64%]"
          >
            <div className="rounded-xl shadow-2xl shadow-black/70 glass">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-[10px] tracking-[0.12em] text-fg-subtle">
                  app/page.tsx
                </span>
                <span className="font-mono text-[10px] text-ok">● build passing</span>
              </div>
              <pre className="overflow-hidden px-4 py-3 font-mono text-[12px] leading-6">
                {code.map(([tone, line], i) => (
                  <code key={i} className={`block ${tone}`}>
                    <span className="mr-3 text-fg-subtle select-none">{i + 1}</span>
                    {line}
                  </code>
                ))}
              </pre>
            </div>
          </Parallax>
          <Parallax speed={-0.8} className="absolute -top-6 -right-2 z-10 sm:-right-6">
            <div className="flex items-center gap-3 rounded-xl px-4 py-3 glass">
              {["Perf", "A11y", "SEO"].map((label) => (
                <span key={label} className="flex flex-col items-center">
                  <span className="grid size-10 place-items-center rounded-full border-2 border-ok font-mono text-xs font-semibold text-ok">
                    90+
                  </span>
                  <span className="mt-1 font-mono text-[9px] tracking-[0.1em] text-fg-subtle uppercase">
                    {label}
                  </span>
                </span>
              ))}
            </div>
          </Parallax>
        </div>

        <div className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <Eyebrow index="03">{webDevHero.eyebrow}</Eyebrow>
            <Badge>New</Badge>
          </div>
          <TextReveal
            as="h2"
            id="webdev-spot-title"
            split="words"
            className="text-[clamp(2.25rem,1.3rem+3.6vw,4.5rem)] leading-[1] font-bold tracking-tight text-fg"
          >
            Now building websites that work as hard as your team.
          </TextReveal>
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed text-fg-muted">{webDevHero.intro}</p>
          </Reveal>
          <Reveal stagger={0.05} as="ul" className="grid gap-3 sm:grid-cols-2">
            {[
              "Custom design & development",
              "E-commerce & CMS",
              "Web applications",
              "SEO & performance",
              "Mobile-first builds",
              "Maintenance plans",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-fg">
                <span className="grid size-6 place-items-center rounded-md bg-signal/15 text-pulse">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </Reveal>
          <Reveal className="flex flex-wrap items-center gap-6 pt-2">
            <ButtonLink href="/services/website-development" size="lg" arrow>
              See Packages & Process
            </ButtonLink>
            <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
              Websites from{" "}
              <span className="font-display text-3xl font-bold tracking-normal text-fg normal-case">
                {startingPrice}
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

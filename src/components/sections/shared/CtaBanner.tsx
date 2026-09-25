import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { TextReveal } from "@/components/motion/TextReveal";
import { LogoMark } from "@/components/layout/Logo";

interface CtaBannerProps {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  href?: string;
}

/** Full-bleed lime call-to-action panel with parallax brand marks. */
export function CtaBanner({ eyebrow, heading, body, cta, href = "/contact" }: CtaBannerProps) {
  return (
    <section aria-label={eyebrow} className="py-12 sm:py-16">
      <div className="container-page">
        <Reveal
          scale={0.92}
          y={60}
          className="text-ink-950 relative overflow-hidden rounded-[2.5rem] bg-lime-500 px-6 py-16 sm:px-14 sm:py-20"
        >
          <Parallax
            speed={0.5}
            rotate={20}
            className="pointer-events-none absolute -top-10 -right-16 w-72 opacity-20 sm:w-96"
          >
            <LogoMark className="text-ink-950 w-full" />
          </Parallax>
          <Parallax
            speed={-0.4}
            rotate={-15}
            className="pointer-events-none absolute -bottom-20 -left-10 w-56 opacity-10"
          >
            <LogoMark className="text-ink-950 w-full" />
          </Parallax>
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-display mb-5 text-xs font-semibold tracking-[0.3em] uppercase">
                {eyebrow}
              </p>
              <TextReveal
                as="h2"
                split="words"
                className="text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.02] font-semibold"
              >
                {heading}
              </TextReveal>
              <p className="text-ink-800 mt-6 max-w-xl text-lg leading-relaxed">{body}</p>
            </div>
            <ButtonLink
              href={href}
              size="lg"
              arrow
              className="bg-ink-950 text-fg hover:bg-ink-800 hover:shadow-[0_10px_40px_-8px_rgba(0,0,0,0.6)]"
            >
              {cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

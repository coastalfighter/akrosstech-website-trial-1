import type { PhotoKey } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { TextReveal } from "@/components/motion/TextReveal";

interface CtaBannerProps {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  href?: string;
  photo?: PhotoKey;
}

/** Photo-backed call-to-action panel with an animated border beam. */
export function CtaBanner({
  eyebrow,
  heading,
  body,
  cta,
  href = "/contact",
  photo = "laptopGlow",
}: CtaBannerProps) {
  return (
    <section aria-label={eyebrow} className="py-12 sm:py-16">
      <div className="container-page">
        <Reveal
          scale={0.95}
          y={50}
          className="beam relative isolate overflow-hidden rounded-3xl border border-line"
        >
          <Parallax speed={0.35} className="absolute inset-x-0 -top-1/3 -bottom-1/3 -z-10">
            <Photo
              name={photo}
              baked
              className="size-full"
              sizes="(min-width: 1360px) 1280px, 100vw"
            />
          </Parallax>
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/85 to-signal/30"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 grid-lines mask-radial opacity-40"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-8 px-6 py-16 sm:px-14 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 font-mono text-xs tracking-[0.2em] text-pulse uppercase">
                {"// "}
                {eyebrow}
              </p>
              <TextReveal
                as="h2"
                split="words"
                className="text-[clamp(2.25rem,1.3rem+3.8vw,4.75rem)] leading-[1] font-bold tracking-tight text-fg"
              >
                {heading}
              </TextReveal>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{body}</p>
            </div>
            <ButtonLink href={href} size="lg" arrow cursorLabel="Go">
              {cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

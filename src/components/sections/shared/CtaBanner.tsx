import type { PhotoKey } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { TextReveal } from "@/components/motion/TextReveal";
import { Parallax } from "@/components/motion/Parallax";
import { rich } from "@/lib/rich";

interface CtaBannerProps {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  href?: string;
  photo?: PhotoKey;
}

/** Full-bleed monochrome photo band with a serif call to action. */
export function CtaBanner({
  eyebrow,
  heading,
  body,
  cta,
  href = "/contact",
  photo = "handshake",
}: CtaBannerProps) {
  return (
    <section data-tone="ink" aria-label={eyebrow} className="relative isolate overflow-hidden">
      <Parallax speed={0.3} className="absolute inset-x-0 -top-1/4 -bottom-1/4 -z-10">
        <Photo name={photo} baked sizes="100vw" className="size-full" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden="true" />
      <div className="container-page flex min-h-[80svh] flex-col justify-end gap-8 py-20 text-paper">
        <Label className="text-paper/70">{eyebrow}</Label>
        <TextReveal as="h2" split="lines" className="max-w-5xl display-lg">
          {rich(heading)}
        </TextReveal>
        <div className="flex flex-col gap-8 border-t border-paper/25 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-lg text-lg leading-relaxed text-paper/80">{body}</p>
          <ButtonLink href={href} size="lg" arrow className="bg-paper text-ink" cursorLabel="Go">
            {cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

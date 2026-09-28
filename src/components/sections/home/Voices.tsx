import { Fragment } from "react";
import Image from "next/image";
import { testimonials } from "@/content/testimonials";
import { photos } from "@/content/media";
import { studioVoices } from "@/content/studio";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const initials = (text: string) =>
  text
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** `**bold**` → lime emphasis. */
function emphasise(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-medium text-lime">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * Client voices (juncastudio-style): a large dark intro card with how we
 * work, beside a 2×2 grid of voice cards. Testimonials are samples and
 * labelled as such.
 */
export function Voices() {
  const voices = testimonials.slice(0, 4);
  return (
    <section id="voices" aria-labelledby="voices-title" className="pb-40 md:pb-52">
      <div className="container-page">
        <SectionHeading
          id="voices-title"
          eyebrow={studioVoices.eyebrow}
          title={studioVoices.title}
          size="lg"
          className="mb-14"
        />

        <div className="grid gap-3 lg:grid-cols-2">
          <Reveal
            y={30}
            className="relative flex min-h-[34rem] flex-col justify-between gap-10 overflow-hidden rounded-[4px] bg-ink p-6 text-paper md:p-8"
          >
            <Image
              src={photos.circuitTeal.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-30 grayscale"
            />
            <div
              className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/70 to-ink"
              aria-hidden="true"
            />
            <div className="relative flex max-w-lg flex-col gap-5 text-[1.0625rem] leading-[1.4]">
              {studioVoices.intro.map((p) => (
                <p key={p}>{emphasise(p)}</p>
              ))}
            </div>
            <div className="relative flex flex-col gap-5">
              <p className="text-sm text-paper/60">{studioVoices.note}</p>
              <div className="flex flex-wrap gap-2">
                <ButtonLink href="/contact" arrow className="min-w-0">
                  Start a project
                </ButtonLink>
                <ButtonLink href="/about" variant="ink" className="min-w-0 bg-paper text-ink">
                  About us
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal stagger={0.08} as="ul" className="grid gap-3 sm:grid-cols-2">
            {voices.map((t) => (
              <li
                key={t.quote}
                className="group relative flex min-h-[17rem] flex-col justify-between gap-6 overflow-hidden rounded-[4px] bg-moss-900 p-5 text-paper"
              >
                <figure className="flex h-full flex-col justify-between gap-6">
                  <figcaption className="flex items-start justify-between gap-3">
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{t.role}</span>
                      <span className="text-sm text-paper/80">{t.company}</span>
                    </span>
                    <span className="rounded-[2px] bg-paper/10 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.06em] uppercase">
                      Sample
                    </span>
                  </figcaption>
                  <span
                    className="font-display text-[4.5rem] leading-none font-medium tracking-[-0.05em] text-lime/90 transition-opacity duration-500 group-hover:opacity-0 [@media(hover:none)]:hidden"
                    aria-hidden="true"
                  >
                    {initials(t.company)}
                  </span>
                  <blockquote className="text-[15px] leading-[1.4] transition-opacity duration-500 [@media(hover:hover)]:absolute [@media(hover:hover)]:inset-x-5 [@media(hover:hover)]:bottom-5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
                    “{t.quote}”
                  </blockquote>
                </figure>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

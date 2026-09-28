import Link from "next/link";
import { homeHero } from "@/content/home";
import { site } from "@/content/site";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { Wordmark } from "@/components/layout/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { HeroTrail } from "@/components/effects/HeroTrail";

/**
 * noth.in-inspired opener: serif statement + call to action up top, the
 * full-bleed AKROSTECH wordmark in the middle (letters rise in, then drift
 * apart as you scroll; hovering paints it with a photo trail), and a quiet
 * meta row along the bottom.
 */
export function Hero() {
  return (
    <section
      id="start"
      data-tone="paper"
      data-index-label="Start"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-between pt-24 pb-6"
    >
      <div className="container-page grid gap-8 md:grid-cols-2 md:items-start">
        <IntroTitle id="hero-title" as="h1" className="max-w-xl display-md text-fg">
          {"Offshore talent. *Onshore quality.*"}
        </IntroTitle>
        <IntroFade delay={0.35} className="flex flex-col gap-6 md:items-end md:text-right">
          <p className="max-w-sm text-base leading-relaxed text-muted">
            {homeHero.subheadline} Recruitment, virtual assistance, accounting, legal support — and
            now, websites.
          </p>
          <ButtonLink href="/contact" arrow cursorLabel="Let’s talk">
            Book a call
          </ButtonLink>
        </IntroFade>
      </div>

      {/* Hover paints the wordmark with a liquid, photo-filled trail. */}
      <HeroTrail className="py-10 text-fg">
        <Wordmark intro spread className="px-2 md:px-4" />
      </HeroTrail>

      <IntroFade
        delay={0.5}
        className="container-page flex items-end justify-between gap-4 label text-muted"
      >
        <span className="hidden sm:block">( Outsourcing &amp; web studio )</span>
        <span>Wilmington, DE — India</span>
        <span className="flex items-center gap-4">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line hidden sm:inline"
          >
            LinkedIn
          </a>
          <Link href="#manifesto" className="link-line">
            ( Scroll )
          </Link>
        </span>
      </IntroFade>
    </section>
  );
}

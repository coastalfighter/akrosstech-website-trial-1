import { ArrowDown } from "lucide-react";
import { homeHero } from "@/content/home";
import { HeroVisual } from "@/components/three/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { DotGrid, GradientMesh } from "@/components/effects/Backgrounds";
import { LogoMark } from "@/components/layout/Logo";

/**
 * Split a line into characters for the CSS reveal. Each word is wrapped in
 * an inline-block so words never break mid-character-animation.
 */
function AnimatedLine({ text, offset }: { text: string; offset: number }) {
  let index = offset;
  return (
    <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
      {text.split(" ").map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((char, c) => (
            <span key={c} className="hero-char" style={{ ["--i" as string]: index++ }}>
              {char}
            </span>
          ))}
          {w < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const [line1, line2] = homeHero.headlineLines;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[72px]"
    >
      <GradientMesh />
      <DotGrid className="opacity-60" />
      <div
        className="from-ink-950 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />

      {/* 3D scene — sits on the right on desktop, behind content on mobile */}
      <div className="absolute inset-0 -z-0 opacity-50 md:left-[38%] md:opacity-100">
        <HeroVisual />
      </div>

      <div className="container-page relative z-20 flex flex-1 flex-col justify-center py-16">
        <div className="max-w-3xl">
          <div className="hero-fade mb-8" style={{ ["--d" as string]: "0s" }}>
            <Eyebrow>{homeHero.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-title"
            aria-label={`${line1} ${line2}`}
            className="font-display text-fg text-[clamp(3rem,1.2rem+7.4vw,7.75rem)] leading-[0.92] font-semibold tracking-[-0.04em] uppercase"
          >
            <AnimatedLine text={line1} offset={0} />
            <span className="block text-lime-500">
              <AnimatedLine text={line2} offset={line1.length} />
            </span>
          </h1>

          <p
            className="hero-fade text-fg-muted mt-8 max-w-xl text-lg leading-relaxed sm:text-xl"
            style={{ ["--d" as string]: "0.35s" }}
          >
            {homeHero.subheadline}
          </p>

          <div
            className="hero-fade mt-10 flex flex-wrap items-center gap-4"
            style={{ ["--d" as string]: "0.45s" }}
          >
            <Magnetic>
              <ButtonLink href="/contact" size="lg" arrow cursorLabel="Let's go">
                Get Started
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services/website-development" size="lg" variant="secondary">
              Explore Web Development
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        className="hero-fade border-line bg-ink-950/60 relative z-20 border-y py-5 backdrop-blur"
        style={{ ["--d" as string]: "0.55s" }}
      >
        <Marquee duration={36}>
          {homeHero.marquee.map((item) => (
            <span
              key={item}
              className="font-display text-fg/80 flex items-center gap-10 text-lg font-medium whitespace-nowrap sm:text-2xl"
            >
              {item}
              <LogoMark className="w-7 text-lime-500" />
            </span>
          ))}
        </Marquee>
      </div>

      <a
        href="#about"
        className="hero-fade text-fg-subtle absolute right-6 bottom-28 z-20 hidden flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase transition-colors hover:text-lime-500 lg:flex"
        style={{ ["--d" as string]: "0.7s" }}
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

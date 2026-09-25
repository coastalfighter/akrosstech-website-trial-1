import { ArrowDown } from "lucide-react";
import { homeHero } from "@/content/home";
import { companyStats } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { LiveClock } from "@/components/ui/LiveClock";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { GridBackdrop } from "@/components/effects/Backgrounds";
import { Spotlight } from "@/components/effects/Spotlight";

/** Word-masked headline line; `accent` renders the electric gradient per word. */
function HeadlineLine({
  text,
  offset,
  accent = false,
}: {
  text: string;
  offset: number;
  accent?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className="block" aria-hidden="true">
      {words.map((word, i) => (
        <span key={word + i}>
          <span className="hero-mask">
            <span
              className={`hero-word ${accent ? "text-signal" : ""}`}
              style={{ ["--i" as string]: offset + i }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

const opsLines = [
  { text: "$ akrostech status --all", tone: "text-fg" },
  { text: "✓ recruitment   pipeline: active", tone: "text-fg-muted" },
  { text: "✓ va-desk       coverage: EST·CST·PST", tone: "text-fg-muted" },
  { text: "✓ accounting    books: reconciled", tone: "text-fg-muted" },
  { text: "✓ legal         docs: NDA-secured", tone: "text-fg-muted" },
  { text: "✓ web-studio    deploy: production ▲", tone: "text-pulse" },
];

/** Terminal-style live operations card. Lines type in with CSS. */
function OpsTerminal() {
  return (
    <div className="beam relative w-full max-w-[460px] rounded-2xl shadow-[0_40px_120px_-30px_rgba(61,123,255,0.55)] glass">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400/70" />
          <span className="size-2.5 rounded-full bg-amber-300/70" />
          <span className="size-2.5 rounded-full bg-ok/80" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.1em] text-fg-subtle">
          akrostech — ops.sh
        </span>
      </div>
      <div
        className="px-5 py-5 font-mono text-[12.5px] leading-7 sm:text-[13px]"
        role="group"
        aria-label="Akrostech service status: all services active"
      >
        {opsLines.map((line, i) => (
          <span
            key={line.text}
            aria-hidden="true"
            className={`type-line ${line.tone}`}
            style={{
              ["--chars" as string]: line.text.length,
              ["--t" as string]: `${0.5 + i * 0.35}s`,
            }}
          >
            {line.text}
          </span>
        ))}
        <span
          className="mt-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-pulse"
          aria-hidden="true"
        />
      </div>
      <div className="grid grid-cols-3 border-t border-line">
        {companyStats.slice(0, 3).map((stat) => (
          <div key={stat.label} className="border-r border-line px-4 py-4 last:border-r-0">
            <p className="font-display text-2xl font-bold text-fg">
              {stat.value}
              <span className="text-pulse">{stat.suffix}</span>
            </p>
            <p className="mt-1 font-mono text-[10px] leading-tight tracking-[0.08em] text-fg-subtle uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[10px] tracking-[0.12em] text-fg-subtle uppercase">
        <span>
          NYC <LiveClock timeZone="America/New_York" className="text-fg-muted" />
        </span>
        <span>
          CHI <LiveClock timeZone="America/Chicago" className="text-fg-muted" />
        </span>
        <span>
          LA <LiveClock timeZone="America/Los_Angeles" className="text-fg-muted" />
        </span>
        <span className="text-ok">● online</span>
      </div>
    </div>
  );
}

export function Hero() {
  const [line1, line2] = homeHero.headlineLines;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[104px]"
    >
      {/* Earth-at-night network: the "global teams" story in one image. */}
      <div className="absolute inset-0 -z-20">
        <Photo
          name="heroEarth"
          baked
          priority
          sizes="100vw"
          className="size-full"
          imgClassName="object-[70%_center]"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-canvas via-canvas/80 to-canvas/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-canvas to-transparent"
        aria-hidden="true"
      />
      <GridBackdrop className="-z-10 opacity-70" />
      <Spotlight className="-z-10" />

      <div className="container-page grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="hero-fade mb-8" style={{ ["--d" as string]: "0s" }}>
            <Eyebrow index="00">{homeHero.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-title"
            aria-label={`${line1} ${line2}`}
            className="font-display text-[clamp(3rem,1rem+7.6vw,8rem)] leading-[0.92] font-extrabold tracking-[-0.05em] text-fg uppercase"
          >
            <HeadlineLine text={line1} offset={0} />
            <HeadlineLine text={line2} offset={line1.split(" ").length} accent />
          </h1>

          <p
            className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl"
            style={{ ["--d" as string]: "0.3s" }}
          >
            {homeHero.subheadline}{" "}
            <span className="text-fg">
              Recruitment, virtual assistance, accounting, legal support — and now, websites.
            </span>
          </p>

          <div
            className="hero-fade mt-10 flex flex-wrap items-center gap-4"
            style={{ ["--d" as string]: "0.4s" }}
          >
            <Magnetic>
              <ButtonLink href="/contact" size="lg" arrow cursorLabel="Start">
                Get Started
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services/website-development" size="lg" variant="secondary">
              Explore Web Development
            </ButtonLink>
          </div>
        </div>

        <div
          className="hero-fade hidden justify-end md:flex"
          style={{ ["--d" as string]: "0.35s" }}
        >
          <OpsTerminal />
        </div>
      </div>

      <div
        className="hero-fade relative border-y border-line bg-void/70 py-4 backdrop-blur"
        style={{ ["--d" as string]: "0.5s" }}
      >
        <Marquee duration={40}>
          {homeHero.marquee.map((item) => (
            <span
              key={item}
              className="flex items-center gap-5 font-mono text-sm tracking-[0.14em] whitespace-nowrap text-fg-muted uppercase"
            >
              <span className="text-pulse" aria-hidden="true">
                {"//"}
              </span>
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <a
        href="#about"
        className="hero-fade absolute right-6 bottom-24 hidden flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-fg-subtle uppercase transition-colors hover:text-pulse xl:flex"
        style={{ ["--d" as string]: "0.7s" }}
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

import { techStack } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { LogoMark } from "@/components/layout/Logo";

const orbitItems = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "WordPress",
  "Shopify",
  "Tailwind",
  "AWS",
  "Figma",
  "PostgreSQL",
  "Vercel",
  "Python",
];

/** CSS-3D carousel of technologies orbiting the brand mark. */
function TechOrbit() {
  const step = 360 / orbitItems.length;
  return (
    <div
      className="relative mx-auto h-[300px] w-full max-w-[640px] [perspective:1100px] sm:h-[360px]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="absolute size-40 rounded-full bg-lime-500/20 blur-3xl" />
        <LogoMark className="relative w-24 text-lime-500 drop-shadow-[0_0_24px_rgba(191,247,71,0.5)] sm:w-28" />
      </div>
      <div className="absolute inset-0 [transform:rotateX(-14deg)] [transform-style:preserve-3d]">
        <div className="animate-orbit absolute inset-0 [transform-style:preserve-3d]">
          {orbitItems.map((item, i) => (
            // position on the ring → counter-rotate against the ring spin → undo own angle,
            // so every chip always faces the viewer as it orbits.
            <span
              key={item}
              className="absolute top-1/2 left-1/2 -mt-5 -ml-14 h-10 w-28 [transform-style:preserve-3d]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--orbit-radius))` }}
            >
              <span className="animate-orbit-reverse block size-full [transform-style:preserve-3d]">
                <span
                  className="border-line-strong bg-ink-850/90 text-fg flex size-full items-center justify-center rounded-full border text-sm font-medium"
                  style={{ transform: `rotateY(${-i * step}deg)` }}
                >
                  {item}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechStack() {
  const all = techStack.flatMap((g) => g.items);
  return (
    <section
      aria-labelledby="tech-title"
      className="border-line bg-ink-900 relative overflow-hidden border-y py-24 [--orbit-radius:190px] sm:py-32 sm:[--orbit-radius:260px]"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="tech-title"
            eyebrow="Tech stack capabilities"
            title="Modern tools. Proven platforms."
            description="We choose the stack that fits your goals and budget—not the other way round. Here’s what our team works with every day."
          />
          <Reveal stagger={0.05} className="grid gap-6 sm:grid-cols-2">
            {techStack.map((group) => (
              <div key={group.label}>
                <h3 className="font-display mb-3 text-xs tracking-[0.22em] text-lime-500 uppercase">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-line text-fg/85 rounded-full border bg-white/[0.03] px-3 py-1.5 text-xs transition-colors hover:border-lime-500/50 hover:text-lime-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal scale={0.9}>
          <TechOrbit />
        </Reveal>
      </div>
      <div className="border-line mt-20 border-t pt-8">
        <Marquee duration={50}>
          {all.map((item) => (
            <span
              key={item}
              aria-hidden="true"
              data-text={item}
              className="font-display text-3xl font-medium whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] before:content-[attr(data-text)] sm:text-5xl"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

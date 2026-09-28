import {
  Cpu,
  Factory,
  GraduationCap,
  HardHat,
  Headset,
  HeartPulse,
  Landmark,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/content/industries";
import { studioClients, studioStatement } from "@/content/studio";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/Scroll";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Logo-style mark per industry (icon + name), in the order of `industries`. */
const marks: LucideIcon[] = [
  HeartPulse,
  Cpu,
  Landmark,
  Factory,
  HardHat,
  ShoppingCart,
  Headset,
  GraduationCap,
];

/**
 * After the cover: who we work with (eyebrow + one line), a logo-style row
 * of the industries we hire for, then the brand statement — one large
 * sentence that lights up word by word.
 */
export function Statement() {
  return (
    <section id="about" aria-labelledby="statement-title" className="pt-28 pb-36 md:pt-32 md:pb-48">
      <Reveal y={16} className="container-page flex flex-col gap-4">
        <Eyebrow>{studioClients.eyebrow}</Eyebrow>
        <p className="max-w-md text-base leading-[1.35]">{studioClients.body}</p>
      </Reveal>

      <Marquee duration={50} className="mt-16 md:mt-20">
        {industries.map((industry, i) => {
          const Mark = marks[i] ?? Cpu;
          return (
            <span
              key={industry.name}
              className="flex items-center gap-3 px-8 font-display text-[clamp(1.25rem,1rem+0.7vw,1.6rem)] font-medium tracking-[-0.03em] whitespace-nowrap text-ink/70"
            >
              <Mark className="size-[1.1em] stroke-[1.75]" aria-hidden="true" />
              {industry.name}
            </span>
          );
        })}
      </Marquee>

      <div className="container-page mt-40 md:mt-56">
        <h2 id="statement-title" className="sr-only">
          About Akrostech
        </h2>
        <ScrubText className="max-w-[46rem] text-statement">{studioStatement}</ScrubText>
      </div>
    </section>
  );
}

import { byTheNumbers } from "@/content/home";
import type { Stat } from "@/content/site";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccuracyRing } from "./AccuracyRing";
import { cn } from "@/lib/utils";

interface StatsSectionProps {
  stats: Stat[];
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Show the 98% task-accuracy ring (home page). */
  showHighlight?: boolean;
  className?: string;
}

export function StatsSection({
  stats,
  eyebrow = byTheNumbers.eyebrow,
  title = "Our journey is just beginning but the momentum is real.",
  description = "These numbers reflect our commitment to delivering smart, scalable outsourcing solutions to businesses.",
  showHighlight = true,
  className,
}: StatsSectionProps) {
  return (
    <section
      aria-label={eyebrow}
      className={cn("relative overflow-hidden py-24 sm:py-32", className)}
    >
      <div className="container-page">
        <div className={cn("grid items-center gap-14", showHighlight && "lg:grid-cols-[1fr_auto]")}>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {showHighlight && (
            <Reveal className="flex items-center gap-6" scale={0.9}>
              <AccuracyRing value={byTheNumbers.highlight.value} />
              <div>
                <p className="font-display text-fg-subtle text-xs tracking-[0.25em] uppercase">
                  {byTheNumbers.highlight.title}
                </p>
                <p className="text-fg mt-2 text-xl font-medium">
                  {byTheNumbers.highlight.value}% {byTheNumbers.highlight.label}
                </p>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal
          stagger={0.1}
          className="border-line mt-16 grid grid-cols-2 border-t lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "group border-line flex flex-col gap-3 border-b py-10 pr-4 lg:border-b-0",
                i % 2 === 0 ? "border-r lg:border-r" : "pl-6 lg:border-r",
                i > 0 && "lg:pl-8",
                i === stats.length - 1 && "lg:border-r-0",
              )}
            >
              <p className="font-display text-fg text-[clamp(2.75rem,1.8rem+3.5vw,5rem)] leading-none font-semibold transition-colors duration-300 group-hover:text-lime-500">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-fg-muted text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

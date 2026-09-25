import type { Stat } from "@/content/site";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface StatsSectionProps {
  stats: Stat[];
  eyebrow?: string;
  index?: string;
  title?: string;
  description?: string;
  /** Extra highlight chip, e.g. the 98% task accuracy rate. */
  highlight?: { value: string; label: string };
  className?: string;
}

/** Big mono counters in a blueprint-style cell grid. */
export function StatsSection({
  stats,
  eyebrow = "By the Numbers",
  index,
  title,
  description,
  highlight,
  className,
}: StatsSectionProps) {
  return (
    <section aria-label={eyebrow} className={cn("relative py-24 sm:py-32", className)}>
      <div className="container-page">
        {(title || description) && (
          <div className="mb-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={eyebrow}
              index={index}
              title={title ?? eyebrow}
              description={description}
            />
            {highlight && (
              <Reveal className="flex items-center gap-4 rounded-xl px-5 py-4 glass">
                <span className="font-display text-4xl font-bold text-signal-soft">
                  {highlight.value}
                </span>
                <span className="max-w-[10rem] font-mono text-[11px] leading-relaxed tracking-[0.12em] text-fg-muted uppercase">
                  {highlight.label}
                </span>
              </Reveal>
            )}
          </div>
        )}
        <Reveal
          stagger={0.08}
          className="grid grid-cols-2 [gap:1px] overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col justify-between gap-10 bg-canvas p-6 transition-colors duration-500 hover:bg-panel sm:p-8"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase">
                {String(i + 1).padStart(2, "0")} {"//"} metric
              </span>
              <div>
                <p className="font-display text-[clamp(2.75rem,1.6rem+4vw,5.25rem)] leading-none font-bold tracking-tight text-fg transition-colors duration-500 group-hover:text-signal-soft">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-3 text-sm text-fg-muted sm:text-base">{stat.label}</p>
              </div>
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-signal to-pulse transition-transform duration-700 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

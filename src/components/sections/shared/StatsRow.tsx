import type { Stat } from "@/content/site";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Four-up counters on a hairline, e.g. 50+ websites delivered. */
export function StatsRow({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <Reveal
      stagger={0.08}
      as="dl"
      className={cn(
        "grid grid-cols-2 gap-y-10 border-t border-current/15 pt-10 md:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 pr-6">
          <dt className="order-2 text-[13px] opacity-70">{stat.label}</dt>
          <dd className="order-1 h-lg tabular-nums">
            <Counter
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </dd>
        </div>
      ))}
    </Reveal>
  );
}

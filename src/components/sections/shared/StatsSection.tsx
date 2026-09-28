import type { Stat } from "@/content/site";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface StatsSectionProps {
  stats: Stat[];
  label?: string;
  index?: string;
  title: string;
  description?: string;
  tone?: "paper" | "ink";
}

/** Big serif figures in a four-up hairline grid. */
export function StatsSection({
  stats,
  label = "By the Numbers",
  index,
  title,
  description,
  tone = "ink",
}: StatsSectionProps) {
  return (
    <section data-tone={tone} aria-label={label} className="py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          label={label}
          index={index}
          title={title}
          description={description}
          size="md"
          className="mb-16"
        />
        <Reveal
          stagger={0.08}
          as="ul"
          className="grid grid-cols-2 border-t border-line lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <li
              key={stat.label}
              className={`flex flex-col justify-between gap-10 border-b border-line py-8 pr-6 ${i % 2 === 0 ? "border-r lg:border-r" : "pl-6 lg:border-r"} ${i > 0 ? "lg:pl-8" : ""} lg:last:border-r-0`}
            >
              <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-serif text-[clamp(3rem,1.8rem+4vw,6rem)] leading-none text-fg">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-3 text-sm text-muted">{stat.label}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

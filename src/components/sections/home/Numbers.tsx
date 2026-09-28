import { byTheNumbers } from "@/content/home";
import { companyStats } from "@/content/site";
import { Label } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

const notes = [
  "Startups to enterprises across the United States.",
  "Pre-vetted across RPO, VA, accounting and legal.",
  "Partners who stay, because the work holds up.",
  "Coverage across U.S. time zones, all year.",
];

/** scfo-style numbers: hairline rows of label · figure · note. */
export function Numbers() {
  const all = [
    ...companyStats,
    { value: byTheNumbers.highlight.value, suffix: "%", label: byTheNumbers.highlight.label },
  ];
  return (
    <section
      id="numbers"
      data-tone="ink"
      data-index-label="Numbers"
      aria-labelledby="numbers-title"
      className="py-28 md:py-40"
    >
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Label index="04">{byTheNumbers.eyebrow}</Label>
          <TextReveal as="h2" id="numbers-title" className="display-lg text-fg">
            By the <em className="italic">numbers</em>
          </TextReveal>
          <p className="max-w-sm leading-relaxed text-muted">{byTheNumbers.body}</p>
        </div>
        <Reveal stagger={0.08} as="ul" className="border-t border-line">
          {all.map((stat, i) => (
            <li
              key={stat.label}
              className="group grid grid-cols-[1fr_auto] items-end gap-6 border-b border-line py-8 md:grid-cols-[10rem_1fr_auto]"
            >
              <span className="hidden label text-muted md:block">{stat.label}</span>
              <span className="font-serif text-[clamp(3.5rem,2rem+6vw,8rem)] leading-[0.85] text-fg transition-transform duration-700 group-hover:translate-x-3">
                <Counter
                  value={stat.value}
                  decimals={"decimals" in stat ? stat.decimals : undefined}
                  suffix={stat.suffix}
                />
              </span>
              <span className="max-w-[16rem] text-right text-sm leading-relaxed text-muted">
                <span className="mb-2 block label text-fg md:hidden">{stat.label}</span>
                {notes[i] ?? "Measured on every engagement — not estimated."}
              </span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

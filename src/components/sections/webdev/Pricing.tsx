import Link from "next/link";
import type { PricingTier } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface PricingProps {
  id: string;
  label: string;
  index?: string;
  title: string;
  description: string;
  tiers: PricingTier[];
  footnote?: string;
  tone?: "paper" | "ink";
}

/** Pricing as hairline columns; the recommended tier is inverted. */
export function Pricing({
  id,
  label,
  index,
  title,
  description,
  tiers,
  footnote,
  tone = "paper",
}: PricingProps) {
  return (
    <section id={id} data-tone={tone} aria-labelledby={`${id}-title`} className="py-28 md:py-36">
      <div className="container-page">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <SectionHeading id={`${id}-title`} label={label} index={index} title={title} size="md" />
          <p className="leading-relaxed text-muted">{description}</p>
        </div>
        <Reveal
          stagger={0.08}
          className={cn(
            "grid border-t border-l border-line sm:grid-cols-2",
            tiers.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                "group flex flex-col gap-7 border-r border-b border-line p-7 transition-colors duration-700 md:p-8",
                tier.highlighted ? "bg-lime text-ink" : "hover:bg-soft",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-3xl">{tier.name}</h3>
                {tier.highlighted && (
                  <span className="rounded-full border border-current px-2 py-1 label !text-[9px]">
                    Popular
                  </span>
                )}
              </div>
              <p className={cn("text-sm", tier.highlighted ? "opacity-70" : "text-muted")}>
                {tier.tagline}
              </p>
              <div>
                <p className="font-serif text-6xl leading-none">{tier.price}</p>
                <p className={cn("mt-2 label", tier.highlighted ? "opacity-60" : "text-muted")}>
                  {tier.priceNote} · {tier.timeline}
                </p>
              </div>
              <ul
                className={cn(
                  "flex flex-col gap-2.5 border-t pt-6 text-sm",
                  tier.highlighted ? "border-ink/20" : "border-line",
                )}
              >
                {tier.features.map((f) => (
                  <li key={f} className="flex items-baseline gap-3">
                    <span
                      className="h-px w-3 shrink-0 translate-y-[-0.25em] bg-current"
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact#contact"
                className={cn(
                  "mt-auto inline-flex h-12 items-center justify-center rounded-full border label transition-colors",
                  tier.highlighted
                    ? "border-ink hover:bg-ink hover:text-lime"
                    : "border-line-strong hover:border-lime hover:bg-lime hover:text-ink",
                )}
              >
                {tier.cta}
                <span className="sr-only"> — {tier.name}</span>
              </Link>
            </article>
          ))}
        </Reveal>
        {footnote && <p className="mt-8 max-w-2xl text-sm text-muted">{footnote}</p>}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Check, Clock } from "lucide-react";
import type { PricingTier } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <TiltCard max={3} className="rounded-2xl">
      <article
        className={cn(
          "relative flex h-full flex-col gap-6 rounded-2xl border p-7",
          tier.highlighted
            ? "beam border-signal/50 bg-gradient-to-b from-signal/[0.14] to-panel shadow-[0_30px_90px_-30px_rgba(61,123,255,0.7)]"
            : "border-line bg-panel",
        )}
      >
        {tier.highlighted && (
          <span className="absolute -top-3 left-7 rounded-md bg-signal px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-white uppercase">
            Most popular
          </span>
        )}
        <div>
          <h3 className="text-xl font-semibold text-fg">{tier.name}</h3>
          <p className="mt-1 text-sm text-fg-muted">{tier.tagline}</p>
        </div>
        <div>
          <p className="font-display text-5xl font-bold tracking-tight text-fg">{tier.price}</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
            {tier.priceNote}
          </p>
        </div>
        <p className="inline-flex w-fit items-center gap-2 rounded-md border border-line px-2.5 py-1.5 font-mono text-[11px] text-fg-muted">
          <Clock className="size-3.5 text-pulse" aria-hidden="true" />
          {tier.timeline}
        </p>
        <ul className="grid gap-3 border-t border-line pt-6">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-fg/90">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-signal/15 text-pulse">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href="/contact#contact"
          className={cn(
            "mt-auto inline-flex h-12 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
            tier.highlighted
              ? "bg-signal text-white hover:bg-signal-strong"
              : "border border-line-strong text-fg hover:border-pulse hover:text-pulse",
          )}
        >
          {tier.cta}
          <span className="sr-only"> — {tier.name}</span>
        </Link>
      </article>
    </TiltCard>
  );
}

interface PricingProps {
  id: string;
  eyebrow: string;
  index?: string;
  title: string;
  description: string;
  tiers: PricingTier[];
  footnote?: string;
}

export function Pricing({ id, eyebrow, index, title, description, tiers, footnote }: PricingProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          index={index}
          title={title}
          description={description}
          align="center"
          className="mx-auto"
        />
        <Reveal
          stagger={0.08}
          className={cn(
            "mt-16 grid gap-5 md:grid-cols-2",
            tiers.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3 lg:px-10",
          )}
        >
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </Reveal>
        {footnote && (
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-fg-subtle">{footnote}</p>
        )}
      </div>
    </section>
  );
}

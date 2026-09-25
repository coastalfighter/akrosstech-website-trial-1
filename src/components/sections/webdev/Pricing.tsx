import Link from "next/link";
import { Check, Clock } from "lucide-react";
import type { PricingTier } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <TiltCard max={4} className="rounded-[2rem]">
      <article
        className={cn(
          "relative flex h-full flex-col gap-6 rounded-[2rem] border p-7",
          tier.highlighted
            ? "to-ink-850 border-lime-500/60 bg-gradient-to-b from-lime-500/[0.12] shadow-[0_30px_80px_-30px_rgba(191,247,71,0.45)]"
            : "border-line bg-ink-850",
        )}
      >
        {tier.highlighted && (
          <span className="text-ink-950 absolute -top-3 left-7 rounded-full bg-lime-500 px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase">
            Most popular
          </span>
        )}
        <div>
          <h3 className="text-fg text-xl font-semibold">{tier.name}</h3>
          <p className="text-fg-muted mt-1 text-sm">{tier.tagline}</p>
        </div>
        <div>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-fg text-5xl font-semibold tracking-tight">
              {tier.price}
            </span>
          </p>
          <p className="text-fg-subtle mt-1 text-xs tracking-wide uppercase">{tier.priceNote}</p>
        </div>
        <p className="text-fg/85 inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5 text-xs">
          <Clock className="size-3.5 text-lime-500" aria-hidden="true" />
          {tier.timeline}
        </p>
        <ul className="border-line grid gap-3 border-t pt-6">
          {tier.features.map((feature) => (
            <li key={feature} className="text-fg/85 flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime-500/15 text-lime-500">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href="/contact#contact"
          className={cn(
            "mt-auto inline-flex h-12 items-center justify-center rounded-full text-sm font-semibold transition-colors",
            tier.highlighted
              ? "text-ink-950 bg-lime-500 hover:bg-lime-400"
              : "border-line-strong text-fg border hover:border-lime-500 hover:text-lime-500",
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
  title: string;
  description: string;
  tiers: PricingTier[];
  footnote?: string;
}

export function Pricing({ id, eyebrow, title, description, tiers, footnote }: PricingProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto"
        />
        <Reveal
          stagger={0.08}
          className={cn(
            "mt-16 grid gap-6 md:grid-cols-2",
            tiers.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3 lg:px-10",
          )}
        >
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </Reveal>
        {footnote && (
          <p className="text-fg-subtle mx-auto mt-10 max-w-2xl text-center text-sm">{footnote}</p>
        )}
      </div>
    </section>
  );
}

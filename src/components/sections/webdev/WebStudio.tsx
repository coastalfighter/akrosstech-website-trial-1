import Link from "next/link";
import { Check } from "lucide-react";
import { techStack, webServices, webWhyUs, type PricingTier } from "@/content/website-development";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** What we build: sticky heading left, service rows with key points right. */
export function WebServicesList() {
  return (
    <section id="what-we-build" aria-labelledby="build-title" className="py-32 md:py-44">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="build-title"
            eyebrow="What we build"
            title="Everything your business needs *online, under one roof.*"
            size="md"
          />
        </div>
        <Reveal stagger={0.05} as="ol" className="border-t border-ink/12">
          {webServices.map((service, i) => (
            <li
              key={service.title}
              className="grid gap-4 border-b border-ink/12 py-8 md:grid-cols-[3rem_1fr_1fr] md:gap-8"
            >
              <span className="mono text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-3">
                <h3 className="flex items-center gap-3 h-sm">
                  <Icon name={service.icon} className="size-5 shrink-0" />
                  {service.title}
                </h3>
                <p className="text-[15px] leading-[1.4] text-stone">{service.description}</p>
              </div>
              <ul className="flex flex-col gap-2 text-[14px]">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 rounded-full bg-lime p-0.5"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Tech stack: grouped rows plus a slow marquee of every tool. */
export function TechStack() {
  const all = techStack.flatMap((g) => g.items);
  return (
    <section aria-labelledby="stack-title" className="py-32 md:py-44">
      <div className="container-page">
        <SectionHeading
          id="stack-title"
          eyebrow="Tech stack"
          title="Modern tools, *chosen for your project.*"
          size="md"
          className="mb-14"
        />
        <Reveal stagger={0.05} as="dl" className="border-t border-ink/12">
          {techStack.map((group) => (
            <div
              key={group.label}
              className="grid gap-3 border-b border-ink/12 py-5 md:grid-cols-[14rem_1fr]"
            >
              <dt className="mono text-stone">{group.label}</dt>
              <dd className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-[3px] border border-ink/12 px-2.5 py-1 text-[13px] transition-colors hover:border-lime hover:bg-lime"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
      <Marquee duration={70} pauseOnHover={false} className="mt-20">
        {all.map((item) => (
          <span
            key={item}
            className="flex items-center gap-6 px-4 h-lg whitespace-nowrap text-ink/60"
          >
            {item}
            <span className="size-2 bg-lime" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/** Pricing cards; the highlighted tier is lime. Tier names are headings. */
export function Pricing({
  id,
  eyebrow,
  title,
  description,
  tiers,
  footnote,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tiers: PricingTier[];
  footnote?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-32 md:py-44">
      <div className="container-page">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} size="lg" />
          <Reveal y={16}>
            <p className="text-base leading-[1.4] text-stone">{description}</p>
          </Reveal>
        </div>
        <Reveal
          stagger={0.07}
          className={cn(
            "grid gap-3 sm:grid-cols-2",
            tiers.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3",
          )}
        >
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                "flex flex-col gap-7 rounded-[6px] p-6 md:p-7",
                tier.highlighted ? "bg-lime text-ink" : "bg-paper-2",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="h-sm">{tier.name}</h3>
                {tier.highlighted && (
                  <span className="rounded-[3px] bg-ink px-2 py-1 mono !text-[9px] text-lime">
                    Popular
                  </span>
                )}
              </div>
              <p className={cn("text-[14px]", tier.highlighted ? "text-ink/75" : "text-stone")}>
                {tier.tagline}
              </p>
              <div>
                <p className="h-lg tabular-nums">{tier.price}</p>
                <p className={cn("mt-2 mono", tier.highlighted ? "text-ink/70" : "text-stone")}>
                  {tier.priceNote} · {tier.timeline}
                </p>
              </div>
              <ul
                className={cn(
                  "flex flex-col gap-2.5 border-t pt-6 text-[14px]",
                  tier.highlighted ? "border-ink/20" : "border-ink/12",
                )}
              >
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0 rounded-full p-0.5",
                        tier.highlighted ? "bg-ink text-lime" : "bg-lime text-ink",
                      )}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact#contact"
                className={cn(
                  "mt-auto inline-flex h-11 items-center justify-center rounded-[3px] text-[13px] font-medium transition-colors",
                  tier.highlighted
                    ? "bg-ink text-paper hover:bg-paper hover:text-ink"
                    : "border border-ink/20 hover:border-lime hover:bg-lime",
                )}
              >
                {tier.cta}
                <span className="sr-only"> — {tier.name}</span>
              </Link>
            </article>
          ))}
        </Reveal>
        {footnote && <p className="mt-8 max-w-2xl text-[13px] text-stone">{footnote}</p>}
      </div>
    </section>
  );
}

/** Why choose our web studio — icon cards. */
export function WebWhyUs() {
  return (
    <section aria-labelledby="webwhy-title" className="py-32 md:py-44">
      <div className="container-page">
        <SectionHeading
          id="webwhy-title"
          eyebrow="Why Akrostech for web"
          title="Agency craft, *outsourcing economics.*"
          size="lg"
          className="mb-14"
        />
        <Reveal stagger={0.06} as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {webWhyUs.map((item, i) => (
            <li
              key={item.title}
              className="flex min-h-56 flex-col justify-between gap-8 rounded-[6px] bg-paper-2 p-6 transition-colors duration-500 hover:bg-lime"
            >
              <span className="flex items-center justify-between">
                <span className="mono text-stone">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={item.icon} className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="h-sm">{item.title}</h3>
                <p className="text-[15px] leading-[1.4] text-stone">{item.description}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { OutsourcingService } from "@/content/services";
import { allServiceCards } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Parallax } from "@/components/motion/Parallax";
import { RotatingBadge } from "@/components/sections/shared/RotatingBadge";

/** "Why … trust Akrostech" — copy on the left, benefit grid on the right. */
export function ServiceWhy({ service }: { service: OutsourcingService }) {
  const { why } = service;
  return (
    <section aria-labelledby="why-service-title" className="relative py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="why-service-title" eyebrow={why.eyebrow} title={why.heading} />
          <Reveal className="text-fg-muted flex flex-col gap-4 leading-relaxed">
            {why.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
        <Reveal stagger={0.07} className="grid gap-4 sm:grid-cols-2">
          {why.benefits.map((benefit, i) => (
            <TiltCard key={benefit.title} className="rounded-3xl">
              <div className="border-line bg-ink-850 flex h-full flex-col gap-4 rounded-3xl border p-6">
                <div className="flex items-center justify-between">
                  <span className="text-ink-950 grid size-11 place-items-center rounded-xl bg-lime-500">
                    <Icon name={benefit.icon} className="size-5" />
                  </span>
                  <span className="font-display text-fg-subtle text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-fg text-lg font-semibold">{benefit.title}</h3>
                {benefit.description && (
                  <p className="text-fg-muted text-sm leading-relaxed">{benefit.description}</p>
                )}
              </div>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** "What we can do for you" / "Industries" capability cards. */
export function ServiceCapabilities({ service }: { service: OutsourcingService }) {
  const { capabilities } = service;
  return (
    <section
      aria-labelledby="capabilities-title"
      className="border-line bg-ink-900 relative overflow-hidden border-y py-24 sm:py-32"
    >
      <Parallax
        speed={0.6}
        className="pointer-events-none absolute top-16 right-10 hidden lg:block"
      >
        <RotatingBadge />
      </Parallax>
      <div className="container-page relative">
        <SectionHeading
          id="capabilities-title"
          eyebrow={capabilities.eyebrow}
          title={capabilities.heading}
          description={capabilities.body}
        />
        <Reveal
          stagger={0.08}
          rotateX={10}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.items.map((item) => (
            <TiltCard key={item.title} className="rounded-[1.75rem]">
              <article className="group border-line from-ink-800 to-ink-850 relative flex h-full flex-col gap-5 overflow-hidden rounded-[1.75rem] border bg-gradient-to-b p-7">
                <div
                  className="absolute -right-10 -bottom-10 size-40 rounded-full bg-lime-500/0 blur-2xl transition-colors duration-500 group-hover/tilt:bg-lime-500/15"
                  aria-hidden="true"
                />
                <span className="border-line-strong grid size-12 place-items-center rounded-2xl border text-lime-500">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <h3 className="text-fg text-xl font-medium">{item.title}</h3>
                <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
              </article>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Cross-links to the other services. */
export function OtherServices({ currentSlug }: { currentSlug: string }) {
  const others = allServiceCards.filter((s) => s.slug !== currentSlug);
  return (
    <section aria-labelledby="other-services-title" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="other-services-title"
          eyebrow="Explore more"
          title="Other ways we help you scale"
        />
        <Reveal stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group border-line bg-ink-850 flex h-full flex-col gap-4 rounded-3xl border p-6 transition-colors duration-300 hover:border-lime-500/40"
            >
              <div className="flex items-center justify-between">
                <span className="group-hover:text-ink-950 grid size-11 place-items-center rounded-xl bg-white/[0.04] text-lime-500 transition-colors group-hover:bg-lime-500">
                  <Icon name={service.icon} className="size-5" />
                </span>
                {service.slug === "website-development" ? (
                  <Badge>New</Badge>
                ) : (
                  <ArrowUpRight
                    className="text-fg-subtle size-4 transition-transform duration-300 group-hover:rotate-45 group-hover:text-lime-500"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="text-fg text-lg font-medium">{service.title}</h3>
              <p className="text-fg-muted line-clamp-3 text-sm leading-relaxed">
                {service.cardSummary}
              </p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

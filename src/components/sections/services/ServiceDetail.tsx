import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { OutsourcingService } from "@/content/services";
import { allServiceCards } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

/** "Why … trust Akrostech" — copy + benefit cells. */
export function ServiceWhy({ service }: { service: OutsourcingService }) {
  const { why } = service;
  return (
    <section aria-labelledby="why-service-title" className="relative py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6 lg:sticky lg:top-36 lg:self-start">
          <SectionHeading
            id="why-service-title"
            eyebrow={why.eyebrow}
            index="01"
            title={why.heading}
          />
          <Reveal className="flex flex-col gap-4 leading-relaxed text-fg-muted">
            {why.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
        <Reveal
          stagger={0.06}
          className="grid [gap:1px] overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
        >
          {why.benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group flex flex-col gap-4 bg-canvas p-6 transition-colors duration-500 hover:bg-panel sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-lg border border-line-strong text-pulse transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <Icon name={benefit.icon} className="size-5" />
                </span>
                <span className="font-mono text-xs text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-fg">{benefit.title}</h3>
              {benefit.description && (
                <p className="text-sm leading-relaxed text-fg-muted">{benefit.description}</p>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** "What we can do for you" / "Industries" — sticky photo + capability cards. */
export function ServiceCapabilities({ service }: { service: OutsourcingService }) {
  const { capabilities } = service;
  const photo = servicePhotos[service.slug]?.detail ?? "blocks";
  return (
    <section
      aria-labelledby="capabilities-title"
      className="relative overflow-hidden border-y border-line bg-void py-24 sm:py-32"
    >
      <div className="absolute inset-0 grid-lines mask-radial opacity-40" aria-hidden="true" />
      <div className="relative container-page">
        <SectionHeading
          id="capabilities-title"
          eyebrow={capabilities.eyebrow}
          index="02"
          title={capabilities.heading}
          description={capabilities.body}
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="hidden lg:block">
            <Photo
              name={photo}
              className="sticky top-36 aspect-[3/4] rounded-2xl border border-line"
              sizes="(min-width: 1024px) 480px, 0px"
            />
          </div>
          <Reveal stagger={0.07} className="grid gap-4 md:grid-cols-2">
            {capabilities.items.map((item, i) => (
              <TiltCard key={item.title} className="rounded-2xl" max={5}>
                <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-panel p-6 transition-colors duration-500 hover:border-signal/40">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-lg bg-signal/15 text-pulse">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
                </article>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Cross-links to the other services, as photo cards. */
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
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-500 hover:border-signal/40"
            >
              <Photo
                name={servicePhotos[service.slug]?.hero ?? "blocks"}
                className="aspect-[16/10]"
                sizes="(min-width: 1024px) 320px, 50vw"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-fg">{service.title}</h3>
                  {service.slug === "website-development" ? (
                    <Badge>New</Badge>
                  ) : (
                    <ArrowUpRight
                      className="size-4 shrink-0 text-fg-subtle transition-transform duration-300 group-hover:rotate-45 group-hover:text-pulse"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">
                  {service.cardSummary}
                </p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

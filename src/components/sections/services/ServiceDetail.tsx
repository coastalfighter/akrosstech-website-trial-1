import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { OutsourcingService } from "@/content/services";
import { allServiceCards } from "@/content/services";
import { photos, servicePhotos } from "@/content/media";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Why us: sticky heading + body on the left, benefit cards on the right. */
export function ServiceWhy({ service }: { service: OutsourcingService }) {
  const { why } = service;
  return (
    <section aria-labelledby="why-title" className="py-32 md:py-44">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-title"
            eyebrow="Why Akrostech"
            title={`${why.eyebrow} *${why.heading}.*`}
            size="lg"
          />
          <Reveal stagger={0.06} className="flex max-w-lg flex-col gap-4">
            {why.body.map((p) => (
              <p key={p} className="text-base leading-[1.4] text-stone">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal stagger={0.06} as="ul" className="grid gap-3 sm:grid-cols-2">
          {why.benefits.map((benefit, i) => (
            <li
              key={benefit.title}
              className="flex min-h-48 flex-col justify-between gap-8 rounded-[6px] bg-paper-2 p-6 transition-colors duration-500 hover:bg-lime"
            >
              <span className="flex items-center justify-between">
                <span className="mono text-stone">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={benefit.icon} className="size-5" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="h-sm">{benefit.title}</h3>
                {benefit.description && (
                  <p className="text-[15px] leading-[1.4] text-stone">{benefit.description}</p>
                )}
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** Capabilities: ink section with numbered rows. */
export function ServiceCapabilities({ service }: { service: OutsourcingService }) {
  const { capabilities } = service;
  return (
    <section
      aria-labelledby="capabilities-title"
      className="bg-ink py-32 text-paper md:py-44"
      data-theme="dark"
    >
      <div className="container-page">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_26rem] lg:items-end">
          <SectionHeading
            id="capabilities-title"
            eyebrow={capabilities.eyebrow}
            title={capabilities.heading}
            size="lg"
          />
          <Reveal y={16}>
            <p className="text-base leading-[1.4] text-fog">{capabilities.body}</p>
          </Reveal>
        </div>
        <Reveal stagger={0.06} as="ol" className="border-t border-paper/12">
          {capabilities.items.map((item, i) => (
            <li
              key={item.title}
              className="group grid gap-4 border-b border-paper/12 py-8 md:grid-cols-[4rem_1fr_1.3fr] md:gap-10"
            >
              <span className="mono text-lime tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h-sm transition-transform duration-500 group-hover:translate-x-2">
                {item.title}
              </h3>
              <p className="max-w-xl text-base leading-[1.4] text-fog">{item.description}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** The other services as photo cards. */
export function OtherServices({ currentSlug }: { currentSlug: string }) {
  const others = allServiceCards.filter((s) => s.slug !== currentSlug);
  return (
    <section aria-labelledby="other-title" className="py-32 md:py-44">
      <div className="container-page">
        <SectionHeading
          id="other-title"
          eyebrow="More services"
          title="Other ways we *help you scale.*"
          size="md"
          className="mb-12"
        />
        <Reveal stagger={0.08} as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => {
            const photo = photos[servicePhotos[s.slug]?.hero ?? "blocks"];
            return (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-2">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-[1.375rem] leading-[1.15] font-medium tracking-[-0.02em]">
                      <span className="link-line">{s.title}</span>
                    </h3>
                    <span className="flex items-center gap-2">
                      {s.slug === "website-development" && <Badge>New</Badge>}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="line-clamp-3 text-[15px] leading-[1.4] text-stone">
                    {s.cardSummary}
                  </p>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

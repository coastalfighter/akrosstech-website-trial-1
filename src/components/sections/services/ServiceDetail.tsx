import type { OutsourcingService } from "@/content/services";
import { allServiceCards } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/Scroll";
import { HoverList } from "@/components/sections/shared/HoverList";

/** "Why … trust Akrostech": sticky copy + numbered benefit rows. */
export function ServiceWhy({ service }: { service: OutsourcingService }) {
  const { why } = service;
  return (
    <section data-tone="paper" aria-labelledby="why-service-title" className="py-28 md:py-40">
      <div className="container-page grid gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="why-service-title"
            label={why.eyebrow}
            index="01"
            title={why.heading}
            size="md"
          />
          <Reveal className="flex flex-col gap-4 leading-relaxed text-muted">
            {why.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
        <Reveal stagger={0.06} as="ol" className="border-t border-line">
          {why.benefits.map((b, i) => (
            <li
              key={b.title}
              className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7"
            >
              <span className="pt-2 label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-3xl leading-tight text-fg transition-transform duration-700 group-hover:translate-x-2 group-hover:italic">
                  {b.title}
                </h3>
                {b.description && (
                  <p className="mt-2 leading-relaxed text-muted">{b.description}</p>
                )}
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** "What we can do for you" / industries — big numbered rows + a photo. */
export function ServiceCapabilities({ service }: { service: OutsourcingService }) {
  const { capabilities } = service;
  const photo = servicePhotos[service.slug]?.detail ?? "blocks";
  return (
    <section data-tone="ink" aria-labelledby="capabilities-title" className="py-28 md:py-40">
      <div className="container-page">
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <SectionHeading
            id="capabilities-title"
            label={capabilities.eyebrow}
            index="02"
            title={capabilities.heading}
            description={capabilities.body}
          />
          <ImageReveal className="aspect-[4/3]">
            <Photo
              name={photo}
              hover
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="size-full"
            />
          </ImageReveal>
        </div>
        <Reveal
          stagger={0.06}
          as="ol"
          className="grid border-t border-line md:grid-cols-2 md:gap-x-16"
        >
          {capabilities.items.map((item, i) => (
            <li key={item.title} className="group flex gap-6 border-b border-line py-8">
              <span className="font-serif text-4xl leading-none text-muted transition-colors group-hover:text-fg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-3xl leading-tight text-fg group-hover:italic">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
              </div>
            </li>
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
    <section data-tone="paper" aria-labelledby="other-services-title" className="py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          id="other-services-title"
          label="Explore more"
          title="Other ways we help you *scale*"
          size="md"
          className="mb-14"
        />
        <HoverList
          size="md"
          items={others.map((s) => ({
            href: `/services/${s.slug}`,
            title: s.title,
            meta: s.cardSummary,
            photo: servicePhotos[s.slug]?.hero ?? "blocks",
            badge: s.slug === "website-development" ? "New" : undefined,
          }))}
        />
      </div>
    </section>
  );
}

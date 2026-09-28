import { allServiceCards } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { homeServicesIntro } from "@/content/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { HoverList } from "@/components/sections/shared/HoverList";

export function ServicesSection() {
  return (
    <section
      id="services"
      data-tone="ink"
      data-index-label="Services"
      aria-labelledby="services-title"
      className="py-28 md:py-40"
    >
      <div className="container-page">
        <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-title"
            label={homeServicesIntro.eyebrow}
            index="02"
            title="Innovative services for your *business growth*"
          />
          <Reveal>
            <ButtonLink href="/services" variant="outline" arrow>
              View all services
            </ButtonLink>
          </Reveal>
        </div>
        <HoverList
          items={allServiceCards.map((service) => ({
            href: `/services/${service.slug}`,
            title: service.title,
            meta: service.cardSummary,
            photo: servicePhotos[service.slug]?.hero ?? "blocks",
            badge: service.slug === "website-development" ? "New" : undefined,
          }))}
        />
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOutsourcingService, outsourcingServices } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { serviceFaqs } from "@/content/faqs";
import { ctaBanner } from "@/content/home";
import { pageMetadata, serializeJsonLd, serviceJsonLd } from "@/lib/seo";
import type { ServiceOption } from "@/lib/constants";
import { PageHero } from "@/components/sections/shared/PageHero";
import {
  ServiceCapabilities,
  ServiceWhy,
  OtherServices,
} from "@/components/sections/services/ServiceDetail";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Only the four outsourcing services are generated here; unknown slugs 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return outsourcingServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getOutsourcingService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${slug}`,
  });
}

const formService: Record<string, ServiceOption> = {
  "recruitment-process-outsourcing": "Recruitment Process Outsourcing",
  "virtual-assistance": "Virtual Assistance",
  "accounting-assistance": "Accounting Assistance",
  "legal-process-outsourcing": "Legal Process Outsourcing",
};

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getOutsourcingService(slug);
  if (!service) notFound();

  const [lead, ...rest] = service.intro;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            serviceJsonLd({
              name: service.title,
              description: service.seo.description,
              path: `/services/${slug}`,
            }),
          ),
        }}
      />
      <PageHero
        eyebrow="Our services"
        title={service.title}
        description={lead}
        photo={servicePhotos[slug]?.hero}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
        aside={
          <div className="beam ml-auto w-full max-w-sm rounded-2xl p-6 glass">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="grid size-12 place-items-center rounded-lg bg-signal text-white">
                <Icon name={service.icon} className="size-6" />
              </span>
              <span className="font-mono text-[11px] text-ok">● accepting clients</span>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {service.why.benefits.slice(0, 4).map((b) => (
                <li key={b.title} className="flex items-center gap-3 text-sm text-fg">
                  <Icon name={b.icon} className="size-4 text-pulse" />
                  {b.title}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        {rest.map((paragraph) => (
          <p key={paragraph} className="max-w-2xl leading-relaxed text-fg-muted">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-wrap gap-4 pt-2">
          <ButtonLink href="#contact" size="lg" arrow>
            Get Started
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="secondary">
            All Services
          </ButtonLink>
        </div>
      </PageHero>

      <ServiceWhy service={service} />
      <ServiceCapabilities service={service} />
      <FaqSection faqs={serviceFaqs} index="03" />
      <CtaBanner {...ctaBanner} href="#contact" photo={servicePhotos[slug]?.detail} />
      <ContactSection
        eyebrow="Get Started"
        title={`Let’s talk about ${service.title.toLowerCase()}`}
        defaultService={formService[slug]}
      />
      <OtherServices currentSlug={slug} />
    </>
  );
}

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

/** Last word italicised for the editorial title treatment. */
const accent = (title: string) => title.replace(/(\S+)$/, "*$1*");

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
        label="Our services"
        title={accent(service.title)}
        description={lead}
        photo={servicePhotos[slug]?.hero}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
      >
        {rest.map((p) => (
          <p key={p} className="leading-relaxed text-muted">
            {p}
          </p>
        ))}
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#contact" arrow>
            Get started
          </ButtonLink>
          <ButtonLink href="/services" variant="outline">
            All services
          </ButtonLink>
        </div>
      </PageHero>
      <ServiceWhy service={service} />
      <ServiceCapabilities service={service} />
      <FaqSection faqs={serviceFaqs} index="03" />
      <CtaBanner {...ctaBanner} href="#contact" photo={servicePhotos[slug]?.detail} />
      <ContactSection
        label="Get Started"
        title={`Let’s talk about *${service.shortTitle}*`}
        defaultService={formService[slug]}
      />
      <OtherServices currentSlug={slug} />
    </>
  );
}

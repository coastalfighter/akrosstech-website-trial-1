import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOutsourcingService, outsourcingServices } from "@/content/services";
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

/** Map slugs to the contact form's service options. */
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
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
        aside={
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center">
            <div
              className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-lime-500/30"
              aria-hidden="true"
            />
            <div className="border-line absolute inset-10 rounded-full border" aria-hidden="true" />
            <div
              className="absolute inset-0 rounded-full bg-lime-500/10 blur-3xl"
              aria-hidden="true"
            />
            <span className="animate-float text-ink-950 relative grid size-40 place-items-center rounded-[2.5rem] bg-lime-500 shadow-[0_30px_80px_-20px_rgba(191,247,71,0.6)]">
              <Icon name={service.icon} className="size-20" strokeWidth={1.5} />
            </span>
          </div>
        }
      >
        {rest.map((paragraph) => (
          <div key={paragraph}>
            <p className="text-fg-muted max-w-2xl leading-relaxed">{paragraph}</p>
          </div>
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
      <FaqSection faqs={serviceFaqs} />
      <CtaBanner {...ctaBanner} href="#contact" />
      <ContactSection
        eyebrow="Get Started"
        title={`Let’s talk about ${service.title.toLowerCase()}`}
        defaultService={formService[slug]}
      />
      <OtherServices currentSlug={slug} />
    </>
  );
}

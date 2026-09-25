import type { Metadata } from "next";
import { Check } from "lucide-react";
import { webStats } from "@/content/site";
import {
  maintenancePlans,
  webDevHero,
  webFaqs,
  websitePackages,
} from "@/content/website-development";
import { pageMetadata, serializeJsonLd, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { StatsSection } from "@/components/sections/shared/StatsSection";
import { Portfolio } from "@/components/sections/shared/Portfolio";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { OtherServices } from "@/components/sections/services/ServiceDetail";
import { WebServicesGrid } from "@/components/sections/webdev/WebServicesGrid";
import { TechStack } from "@/components/sections/webdev/TechStack";
import { ProcessTimeline } from "@/components/sections/webdev/ProcessTimeline";
import { Pricing } from "@/components/sections/webdev/Pricing";
import { WebWhyUs } from "@/components/sections/webdev/WebWhyUs";
import { WebHeroVisual } from "@/components/sections/webdev/WebHeroVisual";
import { ButtonLink } from "@/components/ui/Button";

const description =
  "Custom website design & development, e-commerce, WordPress & headless CMS, web applications, landing pages, redesigns, performance, SEO and maintenance — transparent packages from a U.S.-aligned team.";

export const metadata: Metadata = pageMetadata({
  title: "Website Development Services — Design, E-commerce & Web Apps",
  description,
  path: "/services/website-development",
});

export default function WebsiteDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            ...serviceJsonLd({
              name: "Website Development",
              description,
              path: "/services/website-development",
            }),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Website Development Packages",
              itemListElement: [...websitePackages, ...maintenancePlans].map((tier) => ({
                "@type": "Offer",
                name: tier.name,
                description: tier.tagline,
                priceCurrency: "USD",
                price: tier.price.replace(/[^0-9.]/g, ""),
              })),
            },
          }),
        }}
      />

      <PageHero
        eyebrow={webDevHero.eyebrow}
        title={webDevHero.title}
        description={webDevHero.intro}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Website Development", path: "/services/website-development" },
        ]}
        aside={<WebHeroVisual />}
      >
        <div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {webDevHero.highlights.map((item) => (
              <li key={item} className="text-fg/85 flex items-center gap-2 text-sm">
                <Check className="size-4 text-lime-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-4 pt-2">
          <ButtonLink href="#contact" size="lg" arrow>
            Start Your Project
          </ButtonLink>
          <ButtonLink href="#packages" size="lg" variant="secondary">
            View Pricing
          </ButtonLink>
        </div>
      </PageHero>

      <StatsSection
        stats={webStats}
        eyebrow="Web by the numbers"
        title="Built for startups, scaled by enterprises."
        description="The same people-first delivery model behind our outsourcing services—now designing and engineering websites for growing businesses."
        showHighlight={false}
        className="border-line bg-ink-900 border-y"
      />
      <WebServicesGrid />
      <ProcessTimeline />
      <TechStack />
      <Pricing
        id="packages"
        eyebrow="Website packages"
        title="Transparent pricing for every stage of growth"
        description="Starting prices for the most common website types. After a free discovery call you’ll receive a fixed quote—no surprises, no hidden fees."
        tiers={websitePackages}
        footnote="All packages include mobile-first design, basic SEO, analytics setup, launch support and 30 days of free post-launch fixes. Prices in USD."
      />
      <Pricing
        id="maintenance"
        eyebrow="Maintenance & support"
        title="Keep your website secure, fast and improving"
        description="Flexible monthly plans with no long-term contracts. Upgrade, downgrade or cancel anytime."
        tiers={maintenancePlans}
        footnote="Maintenance plans are available for websites we build and for existing sites after a quick technical audit. Prices in USD."
      />
      <WebWhyUs />
      <Portfolio title="Websites & apps we love to build" />
      <FaqSection faqs={webFaqs} title="Website development FAQs" />
      <CtaBanner
        eyebrow="Let's Get Started"
        heading="Ready to elevate your brand online? start now!"
        body="Tell us about your project and we’ll follow up with a tailored, fixed-price proposal."
        cta="Start Your Project"
        href="#contact"
      />
      <ContactSection
        eyebrow="Start your project"
        title="Let’s build something remarkable"
        defaultService="Website Development"
      />
      <OtherServices currentSlug="website-development" />
    </>
  );
}

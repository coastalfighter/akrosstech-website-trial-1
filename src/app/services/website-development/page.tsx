import type { Metadata } from "next";
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
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { ContactSection } from "@/components/sections/shared/ContactSection";
import { OtherServices } from "@/components/sections/services/ServiceDetail";
import { Works } from "@/components/sections/home/Works";
import { WebServicesList } from "@/components/sections/webdev/WebServicesList";
import { TechStack } from "@/components/sections/webdev/TechStack";
import { ProcessTimeline } from "@/components/sections/webdev/ProcessTimeline";
import { Pricing } from "@/components/sections/webdev/Pricing";
import { WebWhyUs } from "@/components/sections/webdev/WebWhyUs";
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
        label="New — Website Development"
        title="Websites that work as hard as *your team.*"
        description={webDevHero.intro}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Website Development", path: "/services/website-development" },
        ]}
        photo="codeDark"
      >
        <ul className="flex flex-wrap gap-2 label text-fg">
          {webDevHero.highlights.map((h) => (
            <li key={h} className="rounded-full border border-line-strong px-3 py-1.5">
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#contact" arrow>
            Start your project
          </ButtonLink>
          <ButtonLink href="#packages" variant="outline">
            View pricing
          </ButtonLink>
        </div>
      </PageHero>
      <WebServicesList />
      <ProcessTimeline />
      <TechStack />
      <Pricing
        id="packages"
        label="Website packages"
        index="04"
        title="Transparent pricing for every *stage of growth*"
        description="Starting prices for the most common website types. After a free discovery call you’ll receive a fixed quote—no surprises, no hidden fees."
        tiers={websitePackages}
        footnote="All packages include mobile-first design, basic SEO, analytics setup, launch support and 30 days of free post-launch fixes. Prices in USD."
      />
      <Pricing
        id="maintenance"
        label="Maintenance & support"
        index="04.1"
        title="Keep it secure, fast and *improving*"
        description="Flexible monthly plans with no long-term contracts. Upgrade, downgrade or cancel anytime."
        tiers={maintenancePlans}
        footnote="Maintenance plans are available for websites we build and for existing sites after a quick technical audit. Prices in USD."
      />
      <WebWhyUs />
      <StatsSection
        stats={webStats}
        label="Web by the numbers"
        title="Built for startups, *scaled by enterprises.*"
        tone="paper"
      />
      <Works />
      <FaqSection faqs={webFaqs} index="07" title="Website development *FAQs*" />
      <CtaBanner
        eyebrow="Let's Get Started"
        heading="Ready to elevate your brand online? *start now!*"
        body="Tell us about your project and we’ll follow up with a tailored, fixed-price proposal."
        cta="Start your project"
        href="#contact"
        photo="codeLaptop"
      />
      <ContactSection
        label="Start your project"
        title="Let’s build something *remarkable*"
        defaultService="Website Development"
      />
      <OtherServices currentSlug="website-development" />
    </>
  );
}

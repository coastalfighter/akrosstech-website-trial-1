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
import { StatsRow } from "@/components/sections/shared/StatsRow";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { CtaBand } from "@/components/sections/shared/CtaBand";
import { ContactPanel } from "@/components/sections/shared/ContactPanel";
import { OtherServices } from "@/components/sections/services/ServiceDetail";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import {
  Pricing,
  TechStack,
  WebServicesList,
  WebWhyUs,
} from "@/components/sections/webdev/WebStudio";
import { ProcessTrack } from "@/components/sections/webdev/ProcessTrack";
import { Eyebrow } from "@/components/ui/SectionHeading";
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
        eyebrow="New — Website Development"
        title="Websites that work as hard as *your team.*"
        description={webDevHero.intro}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: "Website Development", path: "/services/website-development" },
        ]}
        photo="codeDark"
      >
        <ul className="flex flex-wrap gap-2 text-[13px]">
          {webDevHero.highlights.map((h) => (
            <li key={h} className="rounded-[3px] border border-ink/15 px-2.5 py-1.5">
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#contact" variant="solid" arrow>
            Start your project
          </ButtonLink>
          <ButtonLink href="#packages">View pricing</ButtonLink>
        </div>
      </PageHero>
      <WebServicesList />
      <ProcessTrack />
      <TechStack />
      <Pricing
        id="packages"
        eyebrow="Website packages"
        title="Transparent pricing for every *stage of growth.*"
        description="Starting prices for the most common website types. After a free discovery call you’ll receive a fixed quote—no surprises, no hidden fees."
        tiers={websitePackages}
        footnote="All packages include mobile-first design, basic SEO, analytics setup, launch support and 30 days of free post-launch fixes. Prices in USD."
      />
      <Pricing
        id="maintenance"
        eyebrow="Maintenance & support"
        title="Keep it secure, fast and *improving.*"
        description="Flexible monthly plans with no long-term contracts. Upgrade, downgrade or cancel anytime."
        tiers={maintenancePlans}
        footnote="Maintenance plans are available for websites we build and for existing sites after a quick technical audit. Prices in USD."
      />
      <WebWhyUs />
      <section aria-labelledby="webstats-title" className="pb-32 md:pb-44">
        <div className="container-page flex flex-col gap-10">
          <Eyebrow>Web by the numbers</Eyebrow>
          <h2 id="webstats-title" className="sr-only">
            Web by the numbers
          </h2>
          <StatsRow stats={webStats} />
        </div>
      </section>
      <SelectedWork showCta={false} />
      <FaqBlock faqs={webFaqs} title="Website development *FAQs.*" />
      <CtaBand
        heading="Ready to elevate your brand online? Start now!"
        body="Tell us about your project and we’ll follow up with a tailored, fixed-price proposal."
        cta="Start your project"
        href="#contact"
      />
      <ContactPanel
        title="Let’s build something *remarkable.*"
        defaultService="Website Development"
      />
      <OtherServices currentSlug="website-development" />
    </>
  );
}

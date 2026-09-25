import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allServiceCards } from "@/content/services";
import { serviceFaqs } from "@/content/faqs";
import { ctaBanner } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata: Metadata = pageMetadata({
  title: "Our Services",
  description:
    "Website Development, Recruitment Process Outsourcing, Virtual Assistance, Accounting & Bookkeeping and Legal Process Outsourcing — offshore talent with onshore quality for U.S. businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Innovative services for your business growth"
        description="From hiring and daily operations to finance, legal support—and now your website—Akrostech gives you one reliable partner for building lean, high-performing remote teams."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />

      <section aria-label="All services" className="pb-24 sm:pb-32">
        <div className="container-page">
          <Reveal stagger={0.08} className="flex flex-col gap-5">
            {allServiceCards.map((service, i) => (
              <TiltCard key={service.slug} max={3} className="rounded-[2rem]">
                <Link
                  href={`/services/${service.slug}`}
                  className="group border-line bg-ink-850 grid gap-6 rounded-[2rem] border p-7 transition-colors duration-300 hover:border-lime-500/40 sm:p-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-display text-fg-subtle text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink-950 grid size-16 place-items-center rounded-2xl bg-lime-500 transition-transform duration-500 group-hover:rotate-[-8deg]">
                      <Icon name={service.icon} className="size-8" />
                    </span>
                  </div>
                  <div>
                    <h2 className="text-fg flex flex-wrap items-center gap-3 text-2xl font-medium sm:text-3xl">
                      {service.title}
                      {service.slug === "website-development" && <Badge>New</Badge>}
                    </h2>
                    <p className="text-fg-muted mt-3 max-w-3xl leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                  <span
                    className="border-line-strong text-fg group-hover:text-ink-950 grid size-14 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-lime-500 group-hover:bg-lime-500"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={serviceFaqs} />
      <CtaBanner {...ctaBanner} />
    </>
  );
}

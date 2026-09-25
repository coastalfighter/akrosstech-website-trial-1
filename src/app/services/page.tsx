import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allServiceCards } from "@/content/services";
import { servicePhotos } from "@/content/media";
import { serviceFaqs } from "@/content/faqs";
import { ctaBanner } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/shared/PageHero";
import { FaqSection } from "@/components/sections/shared/FaqSection";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

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
        photo="networkCables"
      />

      <section aria-label="All services" className="py-24 sm:py-32">
        <div className="container-page flex flex-col gap-20 sm:gap-28">
          {allServiceCards.map((service, i) => (
            <Reveal
              key={service.slug}
              className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16")}
            >
              <Link
                href={`/services/${service.slug}`}
                className={cn("group block", i % 2 === 1 && "lg:order-2")}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Photo
                  name={servicePhotos[service.slug]?.hero ?? "blocks"}
                  className="aspect-[4/3] rounded-2xl border border-line"
                  sizes="(min-width: 1024px) 620px, 100vw"
                />
              </Link>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-fg-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-12 place-items-center rounded-lg bg-signal text-white">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  {service.slug === "website-development" && <Badge>New</Badge>}
                </div>
                <h2 className="text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.05] font-bold tracking-tight text-fg">
                  {service.title}
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-fg-muted">{service.summary}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="group inline-flex w-fit items-center gap-3 font-mono text-sm tracking-[0.12em] text-pulse uppercase"
                >
                  Explore {service.shortTitle}
                  <span className="grid size-10 place-items-center rounded-lg border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FaqSection faqs={serviceFaqs} />
      <CtaBanner {...ctaBanner} />
    </>
  );
}

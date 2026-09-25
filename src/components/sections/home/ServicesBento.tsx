import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeServicesIntro } from "@/content/home";
import { outsourcingServices, websiteDevelopmentCard } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Stylised code window shown inside the Website Development tile. */
function CodeWindow() {
  const lines: [string, string][] = [
    ["text-violet-300", "export default function"],
    ["text-lime-400", "  <Website fast seo responsive />"],
    ["text-teal-300", "  // Core Web Vitals: ✓ ✓ ✓"],
    ["text-fg-muted", "  deploy → production"],
  ];
  return (
    <div className="glass mt-auto overflow-hidden rounded-2xl" aria-hidden="true">
      <div className="border-line flex items-center gap-1.5 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-amber-300/70" />
        <span className="size-2.5 rounded-full bg-lime-500/80" />
        <span className="text-fg-subtle ml-3 text-[11px]">akrostech.dev/build</span>
      </div>
      <pre className="overflow-hidden p-4 font-mono text-[12px] leading-6 sm:text-[13px]">
        {lines.map(([color, code], i) => (
          <code key={i} className={cn("block", color)}>
            <span className="text-fg-subtle mr-4 select-none">{i + 1}</span>
            {code}
          </code>
        ))}
      </pre>
    </div>
  );
}

export function ServicesBento() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            eyebrow={homeServicesIntro.eyebrow}
            title={homeServicesIntro.heading}
          />
          <Reveal>
            <ButtonLink href="/services" variant="secondary" arrow>
              View All Services
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal
          stagger={0.08}
          className="grid auto-rows-[minmax(260px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Featured: Website Development */}
          <TiltCard max={5} className="rounded-[2rem] md:col-span-2 lg:row-span-2">
            <Link
              href={`/services/${websiteDevelopmentCard.slug}`}
              data-cursor-label="Explore"
              className="via-ink-850 to-ink-900 relative flex h-full flex-col gap-6 overflow-hidden rounded-[2rem] border border-lime-500/30 bg-gradient-to-br from-lime-500/[0.14] p-8 sm:p-10"
            >
              <div
                className="absolute -top-24 -right-24 size-80 rounded-full bg-lime-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex items-start justify-between">
                <span className="text-ink-950 grid size-14 place-items-center rounded-2xl bg-lime-500">
                  <Icon name={websiteDevelopmentCard.icon} className="size-7" />
                </span>
                <Badge>New Service</Badge>
              </div>
              <div className="relative">
                <h3 className="text-fg text-3xl font-medium sm:text-4xl">
                  {websiteDevelopmentCard.cardTitle}
                </h3>
                <p className="text-fg-muted mt-4 max-w-md leading-relaxed">
                  {websiteDevelopmentCard.cardSummary}
                </p>
              </div>
              <ul className="relative flex flex-wrap gap-2" aria-label="Highlights">
                {["Custom Design", "E-commerce", "Web Apps", "SEO", "Maintenance"].map((tag) => (
                  <li
                    key={tag}
                    className="border-line-strong text-fg/80 rounded-full border px-3 py-1 text-xs"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <CodeWindow />
              <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-lime-500">
                Explore Website Development
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover/tilt:rotate-45"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </TiltCard>

          {outsourcingServices.map((service) => (
            <TiltCard key={service.slug} className="rounded-[2rem]">
              <Link
                href={`/services/${service.slug}`}
                className="group border-line bg-ink-850 relative flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border p-7 transition-colors duration-300 hover:border-lime-500/40"
              >
                <div className="flex items-start justify-between">
                  <span className="border-line-strong group-hover:text-ink-950 grid size-12 place-items-center rounded-2xl border bg-white/[0.04] text-lime-500 transition-colors duration-300 group-hover:bg-lime-500">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <span
                    className="border-line text-fg-muted grid size-10 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-45 group-hover:border-lime-500 group-hover:text-lime-500"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-auto">
                  <h3 className="text-fg text-xl font-medium sm:text-2xl">{service.cardTitle}</h3>
                  <p className="text-fg-muted mt-3 text-sm leading-relaxed">
                    {service.cardSummary}
                  </p>
                </div>
              </Link>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

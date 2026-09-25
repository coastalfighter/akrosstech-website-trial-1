import { Check } from "lucide-react";
import { webServices } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/** Column spans producing rows of 2 · 3 · 3 · 2 cards on large screens. */
const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function WebServicesGrid() {
  return (
    <section
      id="web-services"
      aria-labelledby="web-services-title"
      className="relative py-24 sm:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="web-services-title"
          eyebrow="What we build"
          title="Everything your business needs online, under one roof"
          description="Strategy, design, development and support—delivered by one accountable team that already understands how your business operates."
        />
        <Reveal stagger={0.05} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {webServices.map((service, i) => (
            <TiltCard key={service.title} className={cn("rounded-[1.75rem]", spans[i])} max={5}>
              <article
                className={cn(
                  "group border-line bg-ink-850 relative flex h-full flex-col gap-5 overflow-hidden rounded-[1.75rem] border p-7 transition-colors duration-300 hover:border-lime-500/40",
                  (i === 0 || i === 1) && "from-ink-800 via-ink-850 to-ink-900 bg-gradient-to-br",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="text-ink-950 grid size-12 place-items-center rounded-2xl bg-lime-500 transition-transform duration-500 group-hover:rotate-[-8deg]">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <span className="font-display text-fg-subtle text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-fg text-xl font-medium sm:text-2xl">{service.title}</h3>
                <p className="text-fg-muted leading-relaxed">{service.description}</p>
                <ul className="mt-auto grid gap-2 pt-2">
                  {service.points.map((point) => (
                    <li key={point} className="text-fg/85 flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-lime-500" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

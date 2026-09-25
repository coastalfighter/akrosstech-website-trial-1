import { Check } from "lucide-react";
import { webServices } from "@/content/website-development";
import type { PhotoKey } from "@/content/media";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

/** Rows of 2 · 3 · 3 · 2 cards on large screens; the first two carry photos. */
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
const featurePhotos: Partial<Record<number, PhotoKey>> = { 0: "codeLaptop", 1: "laptopGlow" };

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
          index="01"
          title="Everything your business needs online, under one roof"
          description="Strategy, design, development and support—delivered by one accountable team that already understands how your business operates."
        />
        <Reveal stagger={0.05} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {webServices.map((service, i) => {
            const photo = featurePhotos[i];
            return (
              <TiltCard key={service.title} className={cn("rounded-2xl", spans[i])} max={4}>
                <article className="group relative isolate flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-line bg-panel p-7 transition-colors duration-500 hover:border-signal/40">
                  {photo && (
                    <>
                      <Photo
                        name={photo}
                        baked
                        className="absolute inset-0 -z-20 opacity-60"
                        sizes="(min-width: 1024px) 640px, 100vw"
                      />
                      <div
                        className="absolute inset-0 -z-10 bg-gradient-to-t from-panel via-panel/85 to-panel/30"
                        aria-hidden="true"
                      />
                    </>
                  )}
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-lg bg-signal text-white shadow-[0_8px_30px_-10px_rgba(61,123,255,0.9)]">
                      <Icon name={service.icon} className="size-6" />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={cn("text-xl font-semibold text-fg sm:text-2xl", photo && "mt-16")}>
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-fg-muted">{service.description}</p>
                  <ul className="mt-auto grid gap-2 border-t border-line pt-4">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-fg/90">
                        <Check className="mt-0.5 size-4 shrink-0 text-pulse" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

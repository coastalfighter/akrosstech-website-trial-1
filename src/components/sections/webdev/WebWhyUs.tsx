import { webWhyUs } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

export function WebWhyUs() {
  return (
    <section
      aria-labelledby="web-why-title"
      className="relative overflow-hidden border-y border-line bg-void py-24 sm:py-32"
    >
      <div className="absolute inset-0 grid-lines mask-radial opacity-40" aria-hidden="true" />
      <div className="relative container-page">
        <SectionHeading
          id="web-why-title"
          eyebrow="Why Akrostech for web"
          index="05"
          title="Our approach: agency craft, outsourcing economics"
        />
        <Reveal
          stagger={0.06}
          className="mt-14 grid [gap:1px] overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {webWhyUs.map((item, i) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 bg-void p-8 transition-colors duration-500 hover:bg-panel"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-lg border border-line-strong text-pulse transition-all duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-white">
                  <Icon name={item.icon} className="size-6" />
                </span>
                <span className="font-mono text-xs text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-fg-muted">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

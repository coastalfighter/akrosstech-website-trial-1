import { webWhyUs } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

export function WebWhyUs() {
  return (
    <section
      aria-labelledby="web-why-title"
      className="border-line bg-ink-900 relative overflow-hidden border-y py-24 sm:py-32"
    >
      <div className="line-grid mask-radial absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-page relative">
        <SectionHeading
          id="web-why-title"
          eyebrow="Why Akrostech for web"
          title="Our approach: agency craft, outsourcing economics"
        />
        <Reveal
          stagger={0.07}
          className="border-line bg-line mt-14 grid gap-px overflow-hidden rounded-[2rem] border sm:grid-cols-2 lg:grid-cols-3"
        >
          {webWhyUs.map((item) => (
            <div
              key={item.title}
              className="group bg-ink-900 hover:bg-ink-850 flex flex-col gap-4 p-8 transition-colors duration-500"
            >
              <span className="border-line-strong group-hover:text-ink-950 grid size-12 place-items-center rounded-2xl border text-lime-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-lime-500">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="text-fg text-xl font-medium">{item.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

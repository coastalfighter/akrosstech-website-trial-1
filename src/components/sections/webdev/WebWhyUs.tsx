import { webWhyUs } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function WebWhyUs() {
  return (
    <section data-tone="ink" aria-labelledby="web-why-title" className="py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          id="web-why-title"
          label="Why Akrostech for web"
          index="05"
          title="Agency craft, *outsourcing economics*"
          className="mb-16"
        />
        <Reveal
          stagger={0.06}
          as="ol"
          className="grid border-t border-line md:grid-cols-2 md:gap-x-16 lg:grid-cols-3"
        >
          {webWhyUs.map((item, i) => (
            <li key={item.title} className="group flex flex-col gap-4 border-b border-line py-8">
              <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-3xl leading-tight text-fg group-hover:italic">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

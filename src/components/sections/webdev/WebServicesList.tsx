import { webServices } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** The ten web services as an editorial index: number · title · copy · points. */
export function WebServicesList() {
  return (
    <section
      id="web-services"
      data-tone="paper"
      aria-labelledby="web-services-title"
      className="py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="web-services-title"
          label="What we build"
          index="01"
          title="Everything your business needs online, *under one roof*"
          className="mb-16"
        />
        <Reveal stagger={0.04} as="ol" className="border-t border-line">
          {webServices.map((s, i) => (
            <li
              key={s.title}
              className="group grid gap-6 border-b border-line py-10 md:grid-cols-[5rem_1.2fr_1fr] md:gap-10"
            >
              <span className="font-serif text-5xl leading-none text-muted transition-colors duration-500 group-hover:text-fg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-[clamp(1.9rem,1.2rem+1.8vw,3rem)] leading-[1.05] text-fg transition-transform duration-700 group-hover:translate-x-2 group-hover:italic">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-muted">{s.description}</p>
              </div>
              <ul className="flex flex-col gap-2 self-end">
                {s.points.map((p) => (
                  <li key={p} className="flex items-baseline gap-3 text-sm text-fg">
                    <span
                      className="h-px w-4 shrink-0 translate-y-[-0.25em] bg-fg"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

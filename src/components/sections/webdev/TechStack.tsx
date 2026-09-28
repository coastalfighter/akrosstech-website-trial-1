import { techStack } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";

/** Stack as an editorial table: category · tools, plus a slow serif marquee. */
export function TechStack() {
  return (
    <section
      data-tone="paper"
      aria-labelledby="tech-title"
      className="overflow-hidden py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          id="tech-title"
          label="Tech stack capabilities"
          index="03"
          title="Modern tools. *Proven platforms.*"
          description="We choose the stack that fits your goals and budget—not the other way round."
          className="mb-16"
        />
        <Reveal stagger={0.05} as="dl" className="border-t border-line">
          {techStack.map((group) => (
            <div
              key={group.label}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-10"
            >
              <dt className="pt-2 label text-muted">{group.label}</dt>
              <dd className="font-serif text-2xl leading-snug text-fg md:text-3xl">
                {group.items.map((item, i) => (
                  <span key={item}>
                    <span className="transition-all duration-300 hover:italic">{item}</span>
                    {i < group.items.length - 1 && <span className="text-muted"> / </span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
      <div className="mt-20" aria-hidden="true">
        <Marquee duration={60} pauseOnHover={false}>
          {techStack
            .flatMap((g) => g.items)
            .map((item) => (
              <span
                key={item}
                className="font-serif text-6xl whitespace-nowrap text-fg/40 italic md:text-8xl"
              >
                {item}
              </span>
            ))}
        </Marquee>
      </div>
    </section>
  );
}

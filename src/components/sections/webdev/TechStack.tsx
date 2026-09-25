import { techStack } from "@/content/website-development";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Photo } from "@/components/ui/Photo";

const key = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z]+/g, "_")
    .replace(/^_|_$/g, "");

/** Tech stack rendered as a syntax-highlighted `stack.json`, plus chip groups. */
export function TechStack() {
  const all = techStack.flatMap((g) => g.items);
  return (
    <section aria-labelledby="tech-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-page grid items-start gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="tech-title"
            eyebrow="Tech stack capabilities"
            index="03"
            title="Modern tools. Proven platforms."
            description="We choose the stack that fits your goals and budget—not the other way round. Here’s what our team works with every day."
          />
          <Reveal>
            <Photo
              name="circuitTeal"
              hover
              className="aspect-[16/9] rounded-2xl border border-line"
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          </Reveal>
        </div>

        <Reveal className="beam overflow-hidden rounded-2xl glass" y={60}>
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-amber-300/70" />
              <span className="size-2.5 rounded-full bg-ok/80" />
            </div>
            <span className="font-mono text-[11px] text-fg-subtle">stack.json</span>
          </div>
          <div className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6">
            <p className="text-fg-subtle">{"{"}</p>
            {techStack.map((group, gi) => (
              <div key={group.label} className="pl-4">
                <span className="text-signal-soft">&quot;{key(group.label)}&quot;</span>
                <span className="text-fg-subtle">: [</span>
                <ul className="flex flex-wrap gap-x-1 gap-y-1 pl-4" aria-label={group.label}>
                  {group.items.map((item, i) => (
                    <li key={item} className="text-ok">
                      &quot;{item}&quot;
                      {i < group.items.length - 1 && <span className="text-fg-subtle">,</span>}
                    </li>
                  ))}
                </ul>
                <span className="text-fg-subtle">]{gi < techStack.length - 1 ? "," : ""}</span>
              </div>
            ))}
            <p className="text-fg-subtle">{"}"}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 border-y border-line py-6">
        <Marquee duration={55}>
          {all.map((item) => (
            <span
              key={item}
              aria-hidden="true"
              data-text={item}
              className="font-display text-3xl font-bold whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.35)] before:content-[attr(data-text)] sm:text-5xl"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

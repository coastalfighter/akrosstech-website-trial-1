import Link from "next/link";
import Image from "next/image";
import { portfolio } from "@/content/portfolio";
import { photos } from "@/content/media";
import { studioWork } from "@/content/studio";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/Scroll";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Asymmetric studio grid: column placement, offset and frame ratio per item. */
const layout: { cell: string; frame: string }[] = [
  { cell: "md:col-span-7 md:col-start-1", frame: "aspect-[16/10]" },
  { cell: "md:col-span-5 md:col-start-8 md:mt-56", frame: "aspect-[4/5]" },
  { cell: "md:col-span-5 md:col-start-2 md:mt-16", frame: "aspect-[4/3]" },
  { cell: "md:col-span-6 md:col-start-7 md:mt-64", frame: "aspect-[16/11]" },
  { cell: "md:col-span-5 md:col-start-1 md:-mt-8", frame: "aspect-[4/5]" },
];

/**
 * Selected work (juncastudio-style): staggered frames with category chips,
 * a mono meta line and "Project: what it does" titles. Every project is
 * sample content and labelled as such.
 */
export function SelectedWork({ showCta = true }: { showCta?: boolean }) {
  const items = portfolio.slice(0, layout.length);
  return (
    <section id="work" aria-labelledby="work-title" className="pt-10 pb-40 md:pb-52">
      <div className="container-page">
        <div className="mb-24 grid gap-10 md:mb-32 lg:grid-cols-[1fr_28rem] lg:items-end">
          <div className="flex flex-col gap-6">
            <Reveal y={10}>
              <Eyebrow>{studioWork.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal as="h2" id="work-title" split="lines" className="h-lg">
              {studioWork.title[0]}
              <br />
              {studioWork.title[1]}
            </TextReveal>
          </div>
          <Reveal y={16}>
            <p className="text-lg leading-[1.4]">{studioWork.body}</p>
          </Reveal>
        </div>

        <ul className="grid gap-20 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {items.map((project, i) => (
            <li key={project.title} className={cn("flex flex-col", layout[i]!.cell)}>
              <Link
                href="/services/website-development"
                data-cursor="View project"
                className="group flex flex-col gap-4"
              >
                <ImageReveal
                  className={cn(
                    "relative overflow-hidden rounded-[3px] bg-paper-2",
                    layout[i]!.frame,
                  )}
                >
                  <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[8%]">
                    <Image
                      src={photos[project.photo].src}
                      alt={photos[project.photo].alt}
                      fill
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </Parallax>
                  <span className="absolute top-3 left-3 flex gap-1.5">
                    {[project.category, "Sample"].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-[2px] bg-ink/75 px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-paper uppercase"
                      >
                        {chip}
                      </span>
                    ))}
                  </span>
                </ImageReveal>
                <span className="flex items-center gap-3 mono text-stone">
                  <span className="size-1.5 rounded-full bg-ink/25" aria-hidden="true" />
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} ·{" "}
                  {project.stack.join(" · ")}
                </span>
                <h3 className="max-w-xl pl-[1.125rem] font-display text-[clamp(1.25rem,1.05rem+0.5vw,1.625rem)] leading-[1.1] font-medium tracking-[-0.02em]">
                  {project.title}: {project.description.replace(/\.$/, "")}
                </h3>
              </Link>
            </li>
          ))}
        </ul>

        {showCta && (
          <Reveal y={16} className="mt-24 flex justify-center">
            <ButtonLink href="/services/website-development" arrow size="lg">
              {studioWork.cta}
            </ButtonLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}

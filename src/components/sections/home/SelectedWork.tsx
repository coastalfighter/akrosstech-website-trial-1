import Link from "next/link";
import Image from "next/image";
import { portfolio } from "@/content/portfolio";
import { photos } from "@/content/media";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/Scroll";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Asymmetric studio grid: column placement, offset and frame ratio per item. */
const layout = [
  "md:col-span-7 md:col-start-1 aspect-[16/10]",
  "md:col-span-4 md:col-start-9 md:mt-44 aspect-[4/5]",
  "md:col-span-5 md:col-start-3 md:mt-10 aspect-[4/3]",
  "md:col-span-5 md:col-start-8 md:mt-52 aspect-[16/11]",
  "md:col-span-4 md:col-start-2 md:-mt-10 aspect-[4/5]",
];

/**
 * Selected work — staggered, asymmetric project frames with a parallax
 * drift. Every project is sample content and labelled as such.
 */
export function SelectedWork({ showCta = true }: { showCta?: boolean }) {
  const items = portfolio.slice(0, layout.length);
  return (
    <section id="work" aria-labelledby="work-title" className="pb-32 md:pb-48">
      <div className="container-page">
        <div className="mb-20 grid gap-8 md:mb-28 lg:grid-cols-[1fr_22rem] lg:items-end">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work — sample projects"
            title="Websites that *work as hard as your team.*"
            size="lg"
          />
          <Reveal y={16} className="flex flex-col gap-6">
            <p className="text-[15px] leading-relaxed text-stone">
              From high-converting landing pages to full web applications — designed to convert,
              engineered to perform. These sample projects show the kind of work our web studio
              delivers.
            </p>
            {showCta && (
              <ButtonLink href="/services/website-development" arrow className="w-fit">
                Explore the web studio
              </ButtonLink>
            )}
          </Reveal>
        </div>

        <ul className="grid gap-16 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {items.map((project, i) => (
            <li
              key={project.title}
              className={cn("flex flex-col gap-4", layout[i]!.replace(/aspect-\S+/, ""))}
            >
              <Link href="/services/website-development" className="group flex flex-col gap-4">
                <ImageReveal
                  className={cn(
                    "relative overflow-hidden rounded-[4px] bg-paper-2",
                    layout[i]!.match(/aspect-\S+/)?.[0],
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
                  <span className="absolute top-3 left-3 rounded-[3px] bg-paper/90 px-2 py-1 mono !text-[9px]">
                    Sample
                  </span>
                </ImageReveal>
                <span className="flex items-center gap-2 mono text-stone">
                  <span className="size-1.5 bg-lime" aria-hidden="true" />
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} ·{" "}
                  {project.category}
                </span>
                <h3 className="max-w-md text-[17px] leading-snug font-medium tracking-[-0.01em]">
                  <span className="link-line">{project.title}</span>
                  <span className="text-stone">: {project.description}</span>
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

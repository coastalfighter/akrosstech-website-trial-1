import Link from "next/link";
import { portfolio } from "@/content/portfolio";
import { SpreadWord, ImageReveal } from "@/components/motion/Scroll";
import { Parallax } from "@/components/motion/Parallax";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

/** Asymmetric placements (column span + offset + parallax speed) per item. */
const layout = [
  { cls: "md:col-span-5 md:col-start-1", aspect: "aspect-[4/5]", speed: 0.05 },
  { cls: "md:col-span-4 md:col-start-8 md:mt-56", aspect: "aspect-[4/3]", speed: -0.15 },
  { cls: "md:col-span-6 md:col-start-2 md:-mt-10", aspect: "aspect-[16/10]", speed: 0.12 },
  { cls: "md:col-span-3 md:col-start-9 md:mt-32", aspect: "aspect-[3/4]", speed: -0.2 },
  { cls: "md:col-span-4 md:col-start-1 md:mt-10", aspect: "aspect-[4/3]", speed: 0.08 },
  { cls: "md:col-span-5 md:col-start-7 md:mt-40", aspect: "aspect-[4/5]", speed: -0.1 },
];

/** noth.in-style works: drifting "WORKS" letters over an asymmetric, parallax gallery. */
export function Works() {
  return (
    <section
      id="works"
      data-tone="ink"
      data-index-label="Work"
      aria-labelledby="works-title"
      className="overflow-hidden py-28 md:py-40"
    >
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between gap-6">
          <p className="label text-muted">05 &nbsp;( Selected work — sample projects )</p>
          <p className="max-w-xs text-right font-serif text-2xl leading-tight text-fg">
            Good websites inform. <em className="italic">Great ones convert.</em>
          </p>
        </div>
        <h2 id="works-title" className="sr-only">
          Works
        </h2>
        <SpreadWord
          text="WORKS"
          className="font-sans text-[22vw] leading-[0.8] font-extrabold tracking-[-0.05em] text-fg"
        />

        <ul className="mt-20 grid gap-16 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {portfolio.map((item, i) => {
            const l = layout[i % layout.length]!;
            return (
              <li key={item.title} className={cn(l.cls)}>
                <Parallax speed={l.speed}>
                  <Link
                    href="/services/website-development"
                    className="group block"
                    data-cursor-label="Sample"
                  >
                    <p className="mb-3 flex justify-between label text-muted">
                      <span>{item.category}</span>
                      <span>( Sample )</span>
                    </p>
                    <ImageReveal className={l.aspect}>
                      <Photo
                        name={item.photo}
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="size-full"
                      />
                    </ImageReveal>
                    <div className="mt-4 flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-2xl text-fg transition-all duration-500 group-hover:italic md:text-3xl">
                        {item.title}
                      </h3>
                      <span className="shrink-0 label text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                  </Link>
                </Parallax>
              </li>
            );
          })}
        </ul>

        <div className="mt-28 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
          <Link
            href="/services/website-development"
            className="group font-serif text-4xl text-fg md:text-5xl"
          >
            <span className="link-line">View our web studio</span>{" "}
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
              ↗
            </span>
          </Link>
          <p className="label text-muted">
            ( {String(portfolio.length).padStart(2, "0")} ) — case studies coming soon
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { photos, type PhotoKey } from "@/content/media";

export interface StackCard {
  title: string;
  /** Bold one-liner above the description. */
  subline?: string;
  description: string;
  photo: PhotoKey;
}

/** Deepening moss per card, so the stack reads as layers. */
const shades = [
  "from-moss-950 to-ink",
  "from-moss-900 to-moss-950",
  "from-moss-800 to-moss-900",
  "from-moss-700 to-moss-800",
  "from-moss-600 to-moss-700",
];

/** Height of each card's title bar that stays visible once stacked. */
const BAR_REM = 4;

/**
 * Sticky stacked cards (juncastudio-style). Each card pins just below the
 * previous card's title bar, so the items pile up as a layered index while
 * you scroll. Pure CSS (position: sticky) — no scroll listeners.
 */
export function StackCards({ items }: { items: StackCard[] }) {
  return (
    <ol className="relative" data-theme="dark" data-theme-edges="bar">
      {items.map((item, i) => (
        <li key={item.title} className="sticky" style={{ top: `calc(6rem + ${i * BAR_REM}rem)` }}>
          <article
            className={`grid min-h-[70svh] gap-6 border-t border-paper/10 bg-linear-to-b ${shades[i % shades.length]} px-5 pt-5 pb-10 text-paper md:grid-cols-[5.5rem_1fr_1.1fr] md:gap-8 md:px-7`}
          >
            <span className="pt-2 font-mono text-[12px] text-lime tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[clamp(1.6rem,1.2rem+1.1vw,2rem)] leading-[1.1] font-light tracking-[-0.03em]">
              {item.title}
            </h3>
            <div className="flex flex-col gap-3 md:pt-1">
              {item.subline && (
                <p className="text-[clamp(1.15rem,1rem+0.4vw,1.35rem)] leading-tight font-medium tracking-[-0.02em]">
                  {item.subline}
                </p>
              )}
              <p className="max-w-md text-base leading-[1.4] text-paper/72">{item.description}</p>
              <div className="relative mt-5 aspect-[16/8] overflow-hidden rounded-[3px] bg-ink/40">
                <Image
                  src={photos[item.photo].src}
                  alt={photos[item.photo].alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}

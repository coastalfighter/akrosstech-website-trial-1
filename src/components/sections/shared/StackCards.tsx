import Image from "next/image";
import { photos, type PhotoKey } from "@/content/media";

export interface StackCard {
  title: string;
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
const BAR_REM = 3.75;

/**
 * Sticky stacked cards (juncastudio-style). Each card pins just below the
 * previous card's title bar, so the items pile up as a layered index while
 * you scroll. Pure CSS (position: sticky) — no scroll listeners.
 */
export function StackCards({ items }: { items: StackCard[] }) {
  return (
    <ol className="relative" data-theme="dark" data-theme-edges="bar">
      {items.map((item, i) => (
        <li key={item.title} className="sticky" style={{ top: `calc(6.75rem + ${i * BAR_REM}rem)` }}>
          <article
            className={`grid min-h-[68svh] gap-8 rounded-t-[6px] bg-linear-to-b ${shades[i % shades.length]} p-5 text-paper md:grid-cols-[4rem_1fr_1.15fr] md:gap-10 md:p-7`}
          >
            <span className="mono text-lime tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="h-sm md:-mt-1">{item.title}</h3>
            <div className="flex flex-col gap-6">
              <p className="max-w-md text-[15px] leading-relaxed text-paper/80">
                {item.description}
              </p>
              <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-ink/40">
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

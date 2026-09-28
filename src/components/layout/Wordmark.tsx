import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  text?: string;
  /** Letters rise in with the CSS intro (hero). */
  intro?: boolean;
  /** Letters drift apart while scrolling (driven by MotionController). */
  spread?: boolean;
  /** Render as a heading with an accessible label; otherwise decorative. */
  as?: "p" | "h1";
  label?: string;
}

/**
 * The full-bleed AKROSTECH wordmark (noth.in-style). Letters are laid out
 * with `justify-between`, so the word spans the container edge-to-edge at
 * any viewport width regardless of font metrics.
 */
export function Wordmark({
  className,
  text = "AKROSTECH",
  intro,
  spread,
  as = "p",
  label,
}: WordmarkProps) {
  const Tag = as;
  const letters = text.split("");
  return (
    <Tag
      className={cn(
        "flex justify-between font-sans text-[17.2vw] leading-[0.78] font-extrabold tracking-[-0.06em] select-none",
        className,
      )}
      aria-hidden={label ? undefined : true}
      data-spread={spread ? "" : undefined}
    >
      {label && <span className="sr-only">{label}</span>}
      {letters.map((letter, i) =>
        intro ? (
          // Spread (scroll transform) lives on the mask; the CSS intro on the inner span.
          <span
            key={i}
            className="hero-mask"
            aria-hidden="true"
            data-spread-letter={spread ? "" : undefined}
          >
            <span
              className="hero-word"
              style={{ ["--i" as string]: i, ["--hero-delay" as string]: "0.05s" }}
            >
              {letter}
            </span>
          </span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block"
            data-spread-letter={spread ? "" : undefined}
          >
            {letter}
          </span>
        ),
      )}
    </Tag>
  );
}

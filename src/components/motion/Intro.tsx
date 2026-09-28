import { Fragment } from "react";
import { plain } from "@/lib/rich";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold entrance primitives driven purely by CSS, so hero content
 * animates on first paint without waiting for JavaScript (fast LCP).
 * They share the `--intro-offset` timing with the preloader.
 */

interface IntroTitleProps {
  /** Supports `*italic*` accents, e.g. "Work that *works*". */
  children: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  /** Base delay in seconds before the first word rises. */
  delay?: number;
}

/** Tokenise into words, tracking which fall inside *italic* markers. */
function tokens(text: string): { word: string; italic: boolean }[] {
  let italic = false;
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      let word = raw;
      const opens = word.startsWith("*");
      if (opens) {
        italic = true;
        word = word.slice(1);
      }
      const current = italic;
      if (word.endsWith("*") || /\*[.,!?]$/.test(word)) {
        word = word.replace(/\*([.,!?]?)$/, "$1");
        italic = false;
      }
      return { word, italic: current };
    });
}

/** Word-by-word masked rise. The heading keeps an aria-label with the full text. */
export function IntroTitle({ children, as = "h1", className, id, delay = 0.05 }: IntroTitleProps) {
  const Tag = as;
  const words = tokens(children);
  return (
    <Tag id={id} className={className} aria-label={plain(children)}>
      {words.map(({ word, italic }, i) => (
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden="true" className="hero-mask">
            <span
              className={cn("hero-word", italic && "italic")}
              style={{ ["--i" as string]: i, ["--hero-delay" as string]: `${delay}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Fade-and-rise wrapper for hero copy and CTAs. `delay` is in seconds. */
export function IntroFade({
  children,
  delay = 0.3,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("hero-fade", className)} style={{ ["--d" as string]: `${delay}s` }}>
      {children}
    </div>
  );
}

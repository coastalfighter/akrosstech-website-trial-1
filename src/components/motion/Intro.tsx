import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold entrance primitives driven purely by CSS, so hero content
 * animates on first paint without waiting for JavaScript (fast LCP).
 * They share the `--intro-offset` timing with the preloader.
 */

interface IntroTitleProps {
  children: string;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
  /** Base delay in seconds before the first word rises. */
  delay?: number;
}

/** Word-by-word masked rise. The heading keeps an aria-label with the full text. */
export function IntroTitle({ children, as = "h1", className, id, delay = 0.05 }: IntroTitleProps) {
  const Tag = as;
  const words = children.split(/\s+/).filter(Boolean);
  return (
    <Tag id={id} className={className} aria-label={children}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden="true" className="hero-mask">
            <span
              className="hero-word"
              style={{ ["--i" as string]: i, ["--hero-delay" as string]: `${delay}s` }}
            >
              {word}
            </span>
          </span>
          {/* Space lives outside the inline-block mask so it is never collapsed. */}
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

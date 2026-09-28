import { cn } from "@/lib/utils";

type SplitMode = "lines" | "words" | "chars";

interface TextRevealProps {
  children: React.ReactNode;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  /** Granularity of the reveal. */
  split?: SplitMode;
  delay?: number;
  /** Stagger between split units in seconds. */
  stagger?: number;
  /** Start revealing when the element top hits this viewport position. */
  start?: string;
  id?: string;
}

/**
 * Masked split-text reveal (GSAP SplitText), driven by <MotionController>.
 * Accepts inline markup (e.g. italic <em> accents); SplitText keeps an
 * aria-label so screen readers hear the whole sentence.
 */
export function TextReveal({
  children,
  as = "p",
  className,
  split = "lines",
  delay,
  stagger,
  start,
  id,
}: TextRevealProps) {
  const Tag = as as "p";
  return (
    <Tag
      id={id}
      className={cn(className)}
      data-split={split}
      data-split-delay={delay || undefined}
      data-split-stagger={stagger}
      data-split-start={start}
    >
      {children}
    </Tag>
  );
}

import { cn } from "@/lib/utils";

interface ScrambleProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  id?: string;
  delay?: number;
  /** Seconds to resolve the whole string. */
  duration?: number;
  start?: string;
}

/**
 * Heading whose letters resolve out of random glyphs when it scrolls into
 * view (driven by <MotionController>). Screen readers get a static copy;
 * only the aria-hidden visual copy is scrambled. Server component.
 */
export function Scramble({
  children,
  as = "h2",
  className,
  id,
  delay,
  duration,
  start,
}: ScrambleProps) {
  const Tag = as;
  return (
    <Tag id={id} className={cn(className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        data-scramble=""
        data-scramble-delay={delay}
        data-scramble-duration={duration}
        data-scramble-start={start}
      >
        {children}
      </span>
    </Tag>
  );
}

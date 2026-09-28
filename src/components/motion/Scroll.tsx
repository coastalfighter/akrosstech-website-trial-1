import { cn } from "@/lib/utils";

/**
 * Declarative scroll effects, all driven by the single <MotionController>.
 * These are server components that only render data attributes.
 */

/** Paragraph whose words light up one by one as it scrolls through view. */
export function ScrubText({
  children,
  className,
  as = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h2" | "div";
}) {
  const Tag = as as "p";
  return (
    <Tag className={cn(className)} data-scrub-words="">
      {children}
    </Tag>
  );
}

/** Image block revealed by a clip-path wipe with a subtle zoom-out. */
export function ImageReveal({
  children,
  className,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  from?: "bottom" | "top" | "left" | "center";
}) {
  return (
    <div className={cn("overflow-hidden", className)} data-image-reveal={from}>
      {children}
    </div>
  );
}

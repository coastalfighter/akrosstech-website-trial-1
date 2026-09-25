import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds per full loop. */
  duration?: number;
  reverse?: boolean;
  /** Pause while hovered. */
  pauseOnHover?: boolean;
}

/**
 * Infinite CSS marquee. Content is rendered twice for a seamless loop; the
 * duplicate is hidden from assistive tech. Pure CSS, so it works without JS.
 */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={cn("group/marquee mask-fade-x flex overflow-hidden", className)}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          className={cn(
            "animate-marquee flex min-w-full shrink-0 items-center justify-around gap-10 pr-10",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          )}
          style={{
            ["--marquee-duration" as string]: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  as?: "div" | "section" | "ul" | "ol" | "article" | "li" | "p" | "span";
  className?: string;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  /** Initial vertical offset in px. */
  y?: number;
  /** Initial scale (e.g. 0.94 for a subtle zoom-in). */
  scale?: number;
  /** Initial 3D tilt in degrees around the X axis. */
  rotateX?: number;
  delay?: number;
  start?: string;
  id?: string;
}

/**
 * Scroll-triggered fade/slide/scale reveal.
 *
 * Server component: it only renders `data-reveal-*` attributes. The single
 * client-side <MotionController> picks them up, so dozens of reveals cost
 * nothing at hydration time. No-op for reduced motion.
 */
export function Reveal({
  children,
  as = "div",
  className,
  stagger,
  y = 48,
  scale = 1,
  rotateX = 0,
  delay = 0,
  start,
  id,
}: RevealProps) {
  const Tag = as as "div";
  return (
    <Tag
      id={id}
      className={cn(className)}
      data-reveal=""
      data-reveal-y={y}
      data-reveal-scale={scale !== 1 ? scale : undefined}
      data-reveal-rotate-x={rotateX || undefined}
      data-reveal-delay={delay || undefined}
      data-reveal-stagger={stagger || undefined}
      data-reveal-start={start}
    >
      {children}
    </Tag>
  );
}

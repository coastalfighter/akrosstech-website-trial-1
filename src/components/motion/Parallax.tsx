import { cn } from "@/lib/utils";

interface ParallaxProps {
  children?: React.ReactNode;
  className?: string;
  /** Movement relative to scroll: positive moves slower (background), negative faster (foreground). */
  speed?: number;
  /** Optional rotation (deg) applied across the scroll range for 3D depth. */
  rotate?: number;
  /** Optional scale delta across the scroll range. */
  scale?: number;
}

/** Scroll-scrubbed parallax depth layer (driven by <MotionController>). */
export function Parallax({
  children,
  className,
  speed = 0.2,
  rotate = 0,
  scale = 0,
}: ParallaxProps) {
  return (
    <div
      className={cn("will-change-transform", className)}
      data-parallax=""
      data-parallax-speed={speed}
      data-parallax-rotate={rotate || undefined}
      data-parallax-scale={scale || undefined}
    >
      {children}
    </div>
  );
}

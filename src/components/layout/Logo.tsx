import {
  LOGO_BAR_PATH,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX,
  LOGO_WAVE_PATH,
} from "@/lib/logo-geometry";
import { cn } from "@/lib/utils";

/** The Akrostech wave monogram in the current text colour. */
export function LogoMark({
  className,
  title,
  animated = false,
}: {
  className?: string;
  title?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("h-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth={LOGO_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={LOGO_WAVE_PATH} pathLength={1} className={animated ? "logo-draw" : undefined} />
      <path
        d={LOGO_BAR_PATH}
        pathLength={1}
        className={animated ? "logo-draw logo-draw-delay" : undefined}
      />
    </svg>
  );
}

/** Mark + wordmark lockup. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="w-7 text-lime" />
      <span className="text-[15px] font-bold tracking-[0.02em] uppercase">Akrostech</span>
    </span>
  );
}

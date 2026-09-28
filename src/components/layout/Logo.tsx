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

/** Mark + wordmark lockup: the lime mark on an ink tile reads on any surface. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Tile takes the text colour, so it inverts over dark sections. */}
      <span className="grid size-7 place-items-center rounded-[6px] bg-current" aria-hidden="true">
        <LogoMark className="logo-glyph w-[18px] text-lime" />
      </span>
      <span className="font-display text-[21px] leading-none font-medium tracking-[-0.03em]">
        Akrostech
      </span>
    </span>
  );
}

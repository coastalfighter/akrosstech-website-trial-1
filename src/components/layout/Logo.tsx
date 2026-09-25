import { useId } from "react";
import {
  LOGO_BAR_PATH,
  LOGO_STROKE_WIDTH,
  LOGO_VIEWBOX,
  LOGO_WAVE_PATH,
} from "@/lib/logo-geometry";
import { cn } from "@/lib/utils";

/** The Akrostech wave monogram, stroked with the electric brand gradient. */
export function LogoMark({
  className,
  title,
  mono = false,
}: {
  className?: string;
  title?: string;
  mono?: boolean;
}) {
  const gradientId = `logo-grad-${useId().replace(/:/g, "")}`;
  const stroke = mono ? "currentColor" : `url(#${gradientId})`;
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("h-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      strokeWidth={LOGO_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!mono && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="160"
            y1="1200"
            x2="1390"
            y2="410"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#3d7bff" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      )}
      <path d={LOGO_WAVE_PATH} stroke={stroke} />
      <path d={LOGO_BAR_PATH} stroke={stroke} />
    </svg>
  );
}

/** Mark + wordmark lockup. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="w-9" />
      <span className="font-display text-[1.3rem] font-bold tracking-tight text-fg">
        Akrostech<span className="text-pulse">.</span>
      </span>
    </span>
  );
}

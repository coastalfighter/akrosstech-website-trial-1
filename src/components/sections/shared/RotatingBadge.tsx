import { useId } from "react";
import { LogoMark } from "@/components/layout/Logo";

/** Circular rotating text badge with the brand mark at its centre. */
export function RotatingBadge({
  text = "Offshore Talent • Onshore Quality • ",
}: {
  text?: string;
}) {
  const pathId = `badge-circle-${useId().replace(/:/g, "")}`;
  return (
    <div
      className="text-ink-950 relative grid size-40 place-items-center rounded-full bg-lime-500 shadow-[0_20px_60px_-15px_rgba(191,247,71,0.6)] sm:size-44"
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0">
        <defs>
          <path id={pathId} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-ink-950 font-display text-[15px] font-semibold uppercase">
          {/* textLength = circumference (2πr, r=74) so the phrase wraps the circle exactly once. */}
          <textPath href={`#${pathId}`} textLength={464} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <LogoMark className="text-ink-950 w-12" />
    </div>
  );
}

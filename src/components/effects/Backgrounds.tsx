import { cn } from "@/lib/utils";

/** Animated gradient mesh (pure CSS). */
export function GradientMesh({ className }: { className?: string }) {
  return (
    <div className={cn("gradient-mesh", className)} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

/** Fixed film-grain overlay adding tactile depth to flat dark surfaces. */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

/** Radially masked dot grid for section backgrounds. */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn("dot-grid mask-radial pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}

/** Faint line grid, faded at the edges. */
export function LineGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn("line-grid mask-radial pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}

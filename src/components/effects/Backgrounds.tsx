import { cn } from "@/lib/utils";

/** Fixed film-grain overlay adding tactile depth. */
export function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

/** Blueprint grid, radially faded. */
export function GridBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 grid-lines mask-radial", className)}
      aria-hidden="true"
    />
  );
}

/** Soft coloured glow orbs for section depth. */
export function Glow({
  className,
  tone = "signal",
}: {
  className?: string;
  tone?: "signal" | "pulse" | "ion";
}) {
  const color = tone === "signal" ? "bg-signal/25" : tone === "pulse" ? "bg-pulse/20" : "bg-ion/20";
  return (
    <div
      className={cn("pointer-events-none absolute rounded-full blur-[120px]", color, className)}
      aria-hidden="true"
    />
  );
}

import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "signal",
  className,
}: {
  children: React.ReactNode;
  tone?: "signal" | "neutral" | "warning";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.12em] uppercase",
        tone === "signal" && "border border-signal/40 bg-signal/15 text-signal-soft",
        tone === "neutral" && "border border-line-strong text-fg-muted",
        tone === "warning" && "border border-amber-300/40 bg-amber-300/10 text-amber-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

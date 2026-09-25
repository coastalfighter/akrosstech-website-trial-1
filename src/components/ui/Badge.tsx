import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "lime",
  className,
}: {
  children: React.ReactNode;
  tone?: "lime" | "neutral" | "warning";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase",
        tone === "lime" && "text-ink-950 bg-lime-500",
        tone === "neutral" && "border-line-strong text-fg-muted border",
        tone === "warning" && "border border-amber-300/40 bg-amber-300/10 text-amber-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

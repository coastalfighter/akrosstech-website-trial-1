import { cn } from "@/lib/utils";

/** Small lime tag, e.g. "New". */
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] bg-lime px-1.5 py-0.5 mono !text-[9px] leading-none text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

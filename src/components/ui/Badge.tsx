import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-current px-2.5 py-1 label !text-[10px] leading-none",
        className,
      )}
    >
      {children}
    </span>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime-500 text-ink-950 shadow-[0_0_0_0_rgba(191,247,71,0.5)] hover:shadow-[0_10px_40px_-8px_rgba(191,247,71,0.6)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg backdrop-blur hover:border-lime-500/60 hover:text-lime-500",
  ghost: "text-fg hover:text-lime-500",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Show the animated diagonal arrow. */
  arrow?: boolean;
  cursorLabel?: string;
}

function Content({
  children,
  arrow,
  variant,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  variant: Variant;
}) {
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <span
          className="relative grid size-5 place-items-center overflow-hidden"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5" />
          <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
        </span>
      )}
    </>
  );
}

/** Link styled as a button. Internal routes use next/link (prefetching). */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  cursorLabel,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} className={classes} data-cursor-label={cursorLabel} {...rest}>
        <Content arrow={arrow} variant={variant}>
          {children}
        </Content>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-cursor-label={cursorLabel} {...rest}>
      <Content arrow={arrow} variant={variant}>
        {children}
      </Content>
    </Link>
  );
}

/** Native button with the same styling. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  type = "button",
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Content arrow={arrow} variant={variant}>
        {children}
      </Content>
    </button>
  );
}

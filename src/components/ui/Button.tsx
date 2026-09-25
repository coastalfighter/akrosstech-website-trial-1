import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-lg font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-white shadow-[0_0_0_1px_rgba(122,163,255,0.4)_inset,0_8px_30px_-10px_rgba(61,123,255,0.9)] hover:bg-signal-strong hover:shadow-[0_0_0_1px_rgba(122,163,255,0.6)_inset,0_12px_44px_-8px_rgba(61,123,255,1)]",
  secondary:
    "border border-line-strong bg-white/[0.02] text-fg hover:border-pulse/60 hover:bg-pulse/[0.06] hover:text-white",
  ghost: "text-fg hover:text-pulse",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Show the sliding arrow. */
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
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
}

/** Link styled as a button. Internal routes use next/link. */
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
  if (/^(https?:|mailto:|tel:)/.test(href)) {
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

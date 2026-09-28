import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ink";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-[2px] whitespace-nowrap transition-[background-color,color,border-color] duration-500 ease-out disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Brand lime — the primary action. */
  solid: "bg-lime text-ink hover:bg-ink hover:text-lime",
  /** Thin frame in the current text colour; works on paper and ink. */
  outline: "border border-current/20 hover:border-lime hover:bg-lime hover:text-ink",
  ink: "bg-ink text-paper hover:bg-lime hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 min-w-[12rem] px-6 text-[15px]",
  lg: "h-13 min-w-[15rem] px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
}

/** Label that rolls up to a copy of itself on hover. */
function Roll({ children }: { children: React.ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function Content({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <Roll>{children}</Roll>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "outline",
  size = "md",
  className,
  children,
  arrow,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        <Content arrow={arrow}>{children}</Content>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  arrow,
  type = "button",
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}

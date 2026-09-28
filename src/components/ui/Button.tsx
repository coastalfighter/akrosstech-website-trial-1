import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-500 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  solid: "bg-lime text-ink hover:bg-lime-soft",
  outline: "border border-line-strong text-fg hover:border-lime hover:bg-lime hover:text-ink",
  ghost: "text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[13px]",
  lg: "h-14 px-7 text-sm",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  cursorLabel?: string;
}

/** Label that rolls up to a copy of itself on hover. */
function Roll({ children }: { children: React.ReactNode }) {
  return (
    <span className="roll label !text-[12px] !tracking-[0.14em]">
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
          className="size-4 transition-transform duration-500 ease-out group-hover:rotate-45"
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "solid",
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
        <Content arrow={arrow}>{children}</Content>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-cursor-label={cursorLabel} {...rest}>
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

/**
 * Circular CTA with text rotating around the edge (rebrandgurus-style).
 * The centre arrow tilts on hover.
 */
export function CircleLink({
  href,
  label,
  ring = "Let’s work together • Get in touch • ",
  className,
}: {
  href: string;
  label: string;
  ring?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-cursor-label="Talk"
      className={cn(
        "group relative grid size-40 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-colors duration-500 hover:border-lime hover:bg-lime hover:text-ink sm:size-48",
        className,
      )}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <path id="circle-link-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current text-[12.5px] font-medium tracking-[0.2em] uppercase">
          <textPath href="#circle-link-path" textLength={490} lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="sr-only">{label}</span>
      <ArrowUpRight
        className="size-8 transition-transform duration-500 group-hover:rotate-45"
        aria-hidden="true"
      />
    </Link>
  );
}

import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { cn } from "@/lib/utils";

/** Small uppercase label with a pulsing lime dot. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "border-line font-display text-fg-muted inline-flex items-center gap-2.5 rounded-full border bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.22em] uppercase",
        className,
      )}
    >
      <span className="animate-pulse-dot size-1.5 rounded-full bg-lime-500" aria-hidden="true" />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  titleClassName?: string;
  id?: string;
  /** Use the CSS-only intro animation (for headings at the top of a page). */
  intro?: boolean;
}

/** Eyebrow + split-text animated title + optional description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
  titleClassName,
  id,
  intro = false,
}: SectionHeadingProps) {
  const titleClasses = cn(
    "max-w-4xl text-[clamp(2rem,1.3rem+3vw,3.75rem)] leading-[1.05] font-medium text-fg",
    titleClassName,
  );

  if (intro) {
    return (
      <div
        className={cn(
          "flex flex-col gap-5",
          align === "center" && "items-center text-center",
          className,
        )}
      >
        {eyebrow && (
          <IntroFade delay={0}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </IntroFade>
        )}
        <IntroTitle as={as === "h1" ? "h1" : "h2"} id={id} className={titleClasses}>
          {title}
        </IntroTitle>
        {description && (
          <IntroFade delay={0.3}>
            <p
              className={cn(
                "text-fg-muted max-w-2xl text-base leading-relaxed sm:text-lg",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          </IntroFade>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal as={as} id={id} split="words" className={titleClasses}>
        {title}
      </TextReveal>
      {description && (
        <Reveal y={24} delay={0.1}>
          <p
            className={cn(
              "text-fg-muted max-w-2xl text-base leading-relaxed sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

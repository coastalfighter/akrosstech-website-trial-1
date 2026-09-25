import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { cn } from "@/lib/utils";

/** Mono "terminal" label, e.g. `[02] // SERVICES`. */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-pulse uppercase",
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-pulse/60" />
        <span className="relative inline-flex size-2 rounded-full bg-pulse" />
      </span>
      {index && <span className="text-fg-subtle">[{index}]</span>}
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;
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

/** Eyebrow + animated title + optional description. */
export function SectionHeading({
  eyebrow,
  index,
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
    "max-w-4xl text-[clamp(2rem,1.2rem+3.2vw,3.75rem)] leading-[1.04] font-semibold text-fg",
    titleClassName,
  );
  const wrapper = cn(
    "flex flex-col gap-5",
    align === "center" && "items-center text-center",
    className,
  );
  const descriptionEl = description && (
    <p
      className={cn(
        "max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg",
        align === "center" && "mx-auto",
      )}
    >
      {description}
    </p>
  );

  if (intro) {
    return (
      <div className={wrapper}>
        {eyebrow && (
          <IntroFade delay={0}>
            <Eyebrow index={index}>{eyebrow}</Eyebrow>
          </IntroFade>
        )}
        <IntroTitle as={as === "h1" ? "h1" : "h2"} id={id} className={titleClasses}>
          {title}
        </IntroTitle>
        {descriptionEl && <IntroFade delay={0.3}>{descriptionEl}</IntroFade>}
      </div>
    );
  }

  return (
    <div className={wrapper}>
      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <TextReveal as={as} id={id} split="words" className={titleClasses}>
        {title}
      </TextReveal>
      {descriptionEl && (
        <Reveal y={24} delay={0.1}>
          {descriptionEl}
        </Reveal>
      )}
    </div>
  );
}

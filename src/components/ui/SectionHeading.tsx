import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Scramble } from "@/components/motion/Scramble";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { plain, rich } from "@/lib/rich";
import { cn } from "@/lib/utils";

/** Section eyebrow, e.g. "WHY WORK WITH US" (12px uppercase). */
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
    <p className={cn("flex items-center gap-2.5 eyebrow", className)}>
      {index && <span className="tabular-nums opacity-60">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;
  /** Wrap words in *asterisks* for the muted half of a two-tone title. */
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg" | "xl";
  className?: string;
  id?: string;
  /** CSS-only intro animation (for headings at the top of a page). */
  intro?: boolean;
}

/**
 * Eyebrow + headline + optional description. Plain titles scramble in;
 * two-tone titles (with *markup*) rise line by line.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  as = "h2",
  size = "lg",
  className,
  id,
  intro = false,
}: SectionHeadingProps) {
  const titleClass = size === "xl" ? "h-xl" : size === "lg" ? "h-lg" : "h-md";
  const wrapper = cn(
    "flex flex-col gap-5",
    align === "center" && "items-center text-center",
    className,
  );
  const desc = description && (
    <p
      className={cn(
        "max-w-lg text-base leading-[1.4] opacity-70 sm:text-lg",
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
        <IntroTitle as={as === "h1" ? "h1" : "h2"} id={id} className={titleClass}>
          {title}
        </IntroTitle>
        {desc && <IntroFade delay={0.3}>{desc}</IntroFade>}
      </div>
    );
  }

  const hasMarkup = title.includes("*");
  return (
    <div className={wrapper}>
      {eyebrow && (
        <Reveal y={10}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      {hasMarkup ? (
        <TextReveal as={as} id={id} split="lines" className={titleClass}>
          {rich(title)}
        </TextReveal>
      ) : (
        <Scramble as={as} id={id} className={titleClass}>
          {plain(title)}
        </Scramble>
      )}
      {desc && (
        <Reveal y={16} delay={0.1}>
          {desc}
        </Reveal>
      )}
    </div>
  );
}

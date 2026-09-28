import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { IntroFade, IntroTitle } from "@/components/motion/Intro";
import { rich } from "@/lib/rich";
import { cn } from "@/lib/utils";

/** Parenthesised editorial label, e.g. "( The Studio )", with optional index. */
export function Label({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3 label text-muted", className)}>
      {index && <span className="text-lime tabular-nums">{index}</span>}
      <span>( {children} )</span>
    </p>
  );
}

interface SectionHeadingProps {
  label?: string;
  index?: string;
  /** Title; wrap words in *asterisks* for italic serif accents. */
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

export function SectionHeading({
  label,
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
  const titleClass = cn(
    size === "xl" ? "display-xl" : size === "lg" ? "display-lg" : "display-md",
    "text-fg",
  );
  const wrapper = cn(
    "flex flex-col gap-6",
    align === "center" && "items-center text-center",
    className,
  );
  const desc = description && (
    <p
      className={cn(
        "max-w-xl text-base leading-relaxed text-muted sm:text-lg",
        align === "center" && "mx-auto",
      )}
    >
      {description}
    </p>
  );

  if (intro) {
    return (
      <div className={wrapper}>
        {label && (
          <IntroFade delay={0}>
            <Label index={index}>{label}</Label>
          </IntroFade>
        )}
        <IntroTitle as={as === "h1" ? "h1" : "h2"} id={id} className={titleClass}>
          {title}
        </IntroTitle>
        {desc && <IntroFade delay={0.3}>{desc}</IntroFade>}
      </div>
    );
  }

  return (
    <div className={wrapper}>
      {label && (
        <Reveal y={12}>
          <Label index={index}>{label}</Label>
        </Reveal>
      )}
      <TextReveal as={as} id={id} split="lines" className={titleClass}>
        {rich(title)}
      </TextReveal>
      {desc && (
        <Reveal y={20} delay={0.1}>
          {desc}
        </Reveal>
      )}
    </div>
  );
}

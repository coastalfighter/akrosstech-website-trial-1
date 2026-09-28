import { Fragment } from "react";

/**
 * Tiny heading markup: `*words*` render as the muted half of a two-tone
 * headline, e.g. rich("Built for reliability, *scalability and value.*").
 * Keeps headings as plain data strings.
 */
export function rich(text: string, emClassName = "not-italic opacity-50"): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className={emClassName}>
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Plain text (markup stripped) — for aria-labels and metadata. */
export const plain = (text: string) => text.replace(/\*/g, "");

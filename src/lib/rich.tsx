import { Fragment } from "react";

/**
 * Tiny editorial markup: `*word*` renders as an italic serif accent,
 * e.g. rich("Work that *works*"). Keeps headings as plain data strings.
 */
export function rich(text: string, emClassName = "italic"): React.ReactNode {
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

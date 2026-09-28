"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Hairline editorial accordion (WAI-ARIA disclosure pattern). */
export function Accordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-baseline gap-6 py-6 text-left"
              >
                <span className="w-8 shrink-0 label text-muted tabular-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-xl leading-snug text-fg transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                  {item.question}
                </span>
                <span className="relative size-4 shrink-0 self-center" aria-hidden="true">
                  <span className="absolute top-1/2 left-0 h-px w-full bg-fg" />
                  <span
                    className={cn(
                      "absolute top-1/2 left-0 h-px w-full bg-fg transition-transform duration-500",
                      !isOpen && "rotate-90",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-14 leading-relaxed text-muted">{item.answer}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

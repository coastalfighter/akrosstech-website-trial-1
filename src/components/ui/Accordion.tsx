"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Studio FAQ list (WAI-ARIA disclosure pattern): hairline rows, a plus that
 * turns into a cross, and colours inherited from the section so it works
 * on paper and ink alike.
 */
export function Accordion({
  items,
  className,
  defaultOpen = null,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("border-t border-current/15", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className="border-b border-current/15">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-center gap-6 py-5 text-left"
              >
                <span className="flex-1 text-lg leading-[1.35] tracking-[-0.03em] transition-opacity duration-300 group-hover:opacity-70 sm:text-xl">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "relative grid size-7 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-500 ease-out",
                    isOpen ? "rotate-45 bg-lime text-ink" : "bg-current/8",
                  )}
                  aria-hidden="true"
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current" />
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
                  <p className="max-w-2xl pr-12 pb-6 text-base leading-[1.4] opacity-75">
                    {item.answer}
                  </p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

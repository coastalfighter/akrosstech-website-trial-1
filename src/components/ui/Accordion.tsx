"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Accessible accordion (WAI-ARIA disclosure pattern). */
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
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div
            key={item.question}
            className={cn(
              "rounded-xl border transition-colors duration-300",
              isOpen
                ? "border-signal/40 bg-signal/[0.05]"
                : "border-line bg-panel/60 hover:border-line-strong",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-sans text-base font-semibold text-fg sm:px-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-fg-subtle" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-md border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-signal bg-signal text-white"
                      : "border-line-strong text-fg-muted",
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
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
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl px-5 pb-6 pl-14 leading-relaxed text-fg-muted sm:px-6 sm:pl-[3.75rem]">
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

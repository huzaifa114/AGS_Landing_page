"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="hud-panel relative overflow-hidden rounded-2xl"
          >
            <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
            <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-indigo-50/60 dark:hover:bg-white/5"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-body-md font-semibold text-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted transition-transform",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="border-t border-border px-6 pb-6 pt-4">
                <p className="text-body-md text-muted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { FAQAccordion };

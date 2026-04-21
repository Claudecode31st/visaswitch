"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y" style={{ borderColor: "var(--border)" }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
              <span
                className="text-base font-semibold leading-snug transition-colors"
                style={{ color: isOpen ? "var(--foreground)" : "var(--muted-foreground)" }}
              >
                {item.q}
              </span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: isOpen ? "var(--foreground)" : "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")}
                  style={{ color: isOpen ? "var(--primary-foreground)" : "var(--muted-foreground)" }}
                />
              </span>
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              )}
            >
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

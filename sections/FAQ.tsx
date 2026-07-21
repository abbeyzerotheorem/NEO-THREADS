"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import { cn } from "@/lib/utils";
import type { FAQCategory } from "@/types/fashion";

const categories: { value: FAQCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "shipping", label: "Shipping" },
  { value: "returns", label: "Returns" },
  { value: "sizing", label: "Sizing" },
  { value: "drop-day", label: "Drop Day" },
  { value: "general", label: "General" }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { faqs } = fashionConfig;
  const [activeCategory, setActiveCategory] = useState<FAQCategory | "all">("all");

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section className="section-padding bg-background" id="faq">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-secondary text-xs font-mono tracking-[0.2em] uppercase mb-5"
          >
            Support
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto leading-relaxed">
            Everything you need to know about shopping with NEO-THREADS.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                "px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 tap-target rounded-full",
                activeCategory === category.value
                  ? "bg-primary text-background"
                  : "bg-secondary/60 text-muted hover:bg-secondary hover:text-foreground"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4 }}
              className={cn(
                "border bg-warm-50 overflow-hidden transition-all duration-300",
                openId === faq.id ? "border-accent/20" : "border-border"
              )}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left tap-target"
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <HelpCircle className={cn(
                    "w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-300",
                    openId === faq.id ? "text-accent" : "text-muted"
                  )} />
                  <span className="font-display font-semibold text-sm sm:text-base">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 text-muted" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 pl-[3.25rem]">
                      <p className="text-sm text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted mb-4">
            Still have questions?
          </p>
          <a href="mailto:care@neothreads.com" className="btn-primary">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs } = fashionConfig;

  const categories = [
    { id: "all", name: "All" },
    { id: "shipping", name: "Shipping" },
    { id: "returns", name: "Returns" },
    { id: "sizing", name: "Sizing" },
    { id: "drop-day", name: "Drop Day" },
    { id: "general", name: "General" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Everything you need to know about shopping with NEO-THREADS.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors tap-target ${
                activeCategory === category.id
                  ? "bg-primary text-background"
                  : "bg-secondary/30 text-primary hover:bg-secondary/50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-border bg-secondary/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left tap-target"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <HelpCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="font-display font-semibold text-base sm:text-lg">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 pl-[3.25rem]">
                      <p className="text-secondary/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-secondary/60 mb-4">
            Still have questions?
          </p>
          <button className="btn-primary">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}

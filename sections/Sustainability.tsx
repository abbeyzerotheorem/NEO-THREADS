"use client";

import { motion } from "framer-motion";
import { Leaf, Globe, Heart, Shield } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

const iconMap = [Leaf, Globe, Shield, Heart] as const;

const bulletPoints = [
  {
    title: "Ethical Manufacturing",
    text: "All production partners are Fair Trade certified, ensuring fair wages and safe working conditions."
  },
  {
    title: "Sustainable Materials",
    text: "Organic cotton, recycled fabrics, and vegetable-tanned leather from certified suppliers."
  },
  {
    title: "Transparent Supply Chain",
    text: "Full traceability from raw material to finished garment. We know exactly how every piece is made."
  }
];

export default function Sustainability() {
  const { sustainability, brand } = fashionConfig;

  return (
    <section className="section-padding bg-background" id="about">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-secondary text-xs font-mono tracking-[0.2em] uppercase mb-5"
            >
              Our Commitment
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Conscious Luxury
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base text-muted mb-8 leading-relaxed"
            >
              {brand.description} True luxury lies in transparency, ethical production, and environmental stewardship.
            </motion.p>

            <div className="space-y-5">
              {bulletPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-sm mb-0.5">{point.title}</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {sustainability.map((metric, index) => {
              const Icon = iconMap[index];
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                  className="bg-warm-50 p-5 sm:p-6 border border-border hover:shadow-premium transition-shadow duration-400"
                >
                  <Icon className="w-7 h-7 text-accent mb-3" />
                  <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-1">
                    {metric.value}
                  </p>
                  <p className="font-semibold text-xs uppercase tracking-wider text-foreground mb-2">
                    {metric.label}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

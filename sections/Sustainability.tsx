"use client";

import { motion } from "framer-motion";
import { Leaf, Globe, Heart, Shield } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function Sustainability() {
  const { sustainability, brand } = fashionConfig;

  const metrics = [
    {
      icon: Leaf,
      ...sustainability[0]
    },
    {
      icon: Globe,
      ...sustainability[1]
    },
    {
      icon: Shield,
      ...sustainability[2]
    },
    {
      icon: Heart,
      ...sustainability[3]
    }
  ];

  return (
    <section className="section-padding bg-background" id="about">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-secondary text-sm font-mono tracking-wider mb-6"
            >
              OUR COMMITMENT
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Conscious Luxury
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-secondary/70 mb-8 leading-relaxed"
            >
              {brand.description} We believe that true luxury lies in transparency, ethical production, and environmental stewardship. Every piece in our collection tells a story of responsible craftsmanship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Ethical Manufacturing</h4>
                  <p className="text-sm text-secondary/60">
                    All our production partners are Fair Trade certified, ensuring fair wages and safe working conditions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Sustainable Materials</h4>
                  <p className="text-sm text-secondary/60">
                    We source organic cotton, recycled fabrics, and vegetable-tanned leather from certified suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Transparent Supply Chain</h4>
                  <p className="text-sm text-secondary/60">
                    Full traceability from raw material to finished garment. We know exactly where and how every piece is made.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-secondary/30 p-6 border border-border"
                >
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <p className="font-display text-3xl font-bold mb-2">{metric.value}</p>
                  <p className="font-semibold text-sm mb-2">{metric.label}</p>
                  <p className="text-xs text-secondary/60">{metric.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

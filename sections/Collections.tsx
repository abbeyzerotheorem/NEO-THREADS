"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function Collections() {
  const { collections } = fashionConfig;

  return (
    <section className="section-padding bg-background" id="collections">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Curated Collections
          </h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Explore our carefully curated capsules, each designed to elevate your wardrobe with purpose and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {collection.name}
              </h3>
              <p className="text-sm text-secondary/70 mb-3 line-clamp-2">
                {collection.description}
              </p>
              <div className="flex items-center text-accent font-medium text-sm">
                Explore
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

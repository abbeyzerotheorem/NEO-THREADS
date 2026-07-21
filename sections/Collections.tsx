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
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-secondary text-xs font-mono tracking-[0.2em] uppercase mb-5"
          >
            Collections
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Curated Collections
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto leading-relaxed">
            Carefully curated capsules designed to elevate your wardrobe with purpose and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  width={600}
                  height={800}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-accent transition-colors duration-300">
                {collection.name}
              </h3>
              <p className="text-sm text-muted mb-3 line-clamp-2 leading-relaxed">
                {collection.description}
              </p>
              <div className="flex items-center text-accent font-semibold text-xs uppercase tracking-wider">
                Explore
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

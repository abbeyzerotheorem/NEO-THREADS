"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function Hero() {
  const { brand } = fashionConfig;

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-background">
      <div className="container-custom grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20 lg:py-0">
        <div className="order-2 lg:order-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="inline-block px-4 py-2 bg-secondary text-sm font-mono tracking-wider mb-4">
              NEW COLLECTION 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.9]"
          >
            {brand.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-secondary/70 max-w-xl leading-relaxed"
          >
            {brand.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button className="btn-primary group">
              Shop the Drop
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary">
              View Lookbook
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-8 pt-8 border-t border-border"
          >
            <div>
              <p className="font-display text-3xl font-bold">8+</p>
              <p className="text-sm text-secondary/60">New Pieces</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold">100%</p>
              <p className="text-sm text-secondary/60">Sustainable</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold">24h</p>
              <p className="text-sm text-secondary/60">Express Ship</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2 relative"
        >
          <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80"
              alt="NEO-THREADS Summer Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 bg-background border border-border p-6 shadow-xl max-w-xs hidden sm:block"
          >
            <p className="font-display font-semibold text-lg mb-2">Limited Edition</p>
            <p className="text-sm text-secondary/60">
              Only 50 pieces available worldwide. Crafted in Italy.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

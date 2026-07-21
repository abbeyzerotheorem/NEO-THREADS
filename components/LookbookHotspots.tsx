"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import type { LookbookHotspot } from "@/types/fashion";

export default function LookbookHotspots() {
  const [activeLookbook, setActiveLookbook] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const lookbooks = fashionConfig.lookbooks;
  const currentLookbook = lookbooks[activeLookbook];

  const goToLookbook = useCallback((index: number) => {
    setActiveLookbook(index);
    setActiveHotspot(null);
  }, []);

  if (!currentLookbook) return null;

  return (
    <section className="section-padding bg-secondary/20" id="lookbook">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary text-background text-xs font-mono tracking-[0.2em] uppercase mb-5"
          >
            Lookbook
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Shop the Look
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto leading-relaxed">
            {currentLookbook.description}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-secondary">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentLookbook.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={currentLookbook.image}
                alt={currentLookbook.title}
                className="w-full h-full object-cover"
                width={1200}
                height={514}
              />
            </AnimatePresence>

            {currentLookbook.hotspots.map((hotspot: LookbookHotspot) => (
              <motion.button
                key={hotspot.id}
                className="absolute tap-target z-10"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                onFocus={() => setActiveHotspot(hotspot.id)}
                onBlur={() => setActiveHotspot(null)}
                aria-label={`View ${hotspot.label}`}
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: activeHotspot === hotspot.id ? 1.15 : 1,
                    }}
                    className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-elevated"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </motion.div>
                  {activeHotspot !== hotspot.id && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                  )}
                </div>

                <AnimatePresence>
                  {activeHotspot === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-background border border-border p-4 shadow-float min-w-[180px] sm:min-w-[200px] z-20 hidden sm:block"
                    >
                      <p className="font-display font-semibold text-sm mb-2">
                        {hotspot.label}
                      </p>
                      <button className="flex items-center gap-1.5 text-accent text-xs font-semibold uppercase tracking-wider hover:gap-2.5 transition-all">
                        View Product
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}

            {lookbooks.length > 1 && (
              <>
                <button
                  onClick={() => goToLookbook(activeLookbook === 0 ? lookbooks.length - 1 : activeLookbook - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-premium z-10"
                  aria-label="Previous lookbook"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => goToLookbook(activeLookbook === lookbooks.length - 1 ? 0 : activeLookbook + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors shadow-premium z-10"
                  aria-label="Next lookbook"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {lookbooks.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {lookbooks.map((lookbook, index) => (
                <button
                  key={lookbook.id}
                  onClick={() => goToLookbook(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeLookbook === index
                      ? "bg-primary w-10"
                      : "bg-border w-4 hover:bg-muted"
                  }`}
                  aria-label={`View ${lookbook.title}`}
                  aria-current={activeLookbook === index ? "true" : "false"}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <button className="btn-secondary">
            View Full Lookbook
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

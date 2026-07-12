"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import type { Lookbook, LookbookHotspot } from "@/types/fashion";

export default function LookbookHotspots() {
  const [activeLookbook, setActiveLookbook] = useState(0);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const lookbooks = fashionConfig.lookbooks;

  const currentLookbook = lookbooks[activeLookbook];

  if (!currentLookbook) return null;

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Shop the Look
          </h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            {currentLookbook.description}
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-secondary">
            <img
              src={currentLookbook.image}
              alt={currentLookbook.title}
              className="w-full h-full object-cover"
            />

            {currentLookbook.hotspots.map((hotspot: LookbookHotspot) => (
              <motion.button
                key={hotspot.id}
                className="absolute tap-target"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                onFocus={() => setHoveredHotspot(hotspot.id)}
                onBlur={() => setHoveredHotspot(null)}
                aria-label={`View ${hotspot.label}`}
              >
                <motion.div
                  animate={{
                    scale: hoveredHotspot === hotspot.id ? 1.2 : 1,
                    backgroundColor: hoveredHotspot === hotspot.id ? "#0047FF" : "#FFFFFF"
                  }}
                  className="relative w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center shadow-lg"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                </motion.div>

                <AnimatePresence>
                  {hoveredHotspot === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-16 top-1/2 -translate-y-1/2 bg-background border border-border p-4 shadow-xl min-w-[200px] z-10"
                    >
                      <p className="font-display font-semibold text-sm mb-2">
                        {hotspot.label}
                      </p>
                      <button className="flex items-center gap-2 text-accent text-sm font-medium hover:underline">
                        View Product
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {lookbooks.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {lookbooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLookbook(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeLookbook === index ? "bg-primary w-8" : "bg-secondary/60 hover:bg-secondary"
                  }`}
                  aria-label={`View lookbook ${index + 1}`}
                  aria-current={activeLookbook === index ? "true" : "false"}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-secondary">
            View Full Lookbook
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

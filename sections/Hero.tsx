"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

const slides = [
  {
    image: "/hero.jpeg",
    alt: "NEO-THREADS Summer Collection — Editorial lookbook",
    caption: "Only 50 pieces available worldwide. Crafted in Italy.",
  },
  {
    image: "/hero2.jpeg",
    alt: "NEO-THREADS — Urban utility meets refined tailoring",
    caption: "Japanese technical fabrics meet Italian craftsmanship.",
  },
  {
    image: "/hero3.jpeg",
    alt: "NEO-THREADS — Conscious luxury capsule",
    caption: "100% carbon neutral. Ethically sourced. Built to last.",
  },
];

const SLIDE_INTERVAL = 5000;

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } }
};

const stats = [
  { value: "8+", label: "New Pieces" },
  { value: "100%", label: "Sustainable" },
  { value: "24h", label: "Express Ship" },
];

export default function Hero() {
  const { brand } = fashionConfig;
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    elapsedRef.current = 0;
    setProgress(0);
    startRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    startRef.current = performance.now();

    const tick = (now: number) => {
      const delta = now - startRef.current;
      startRef.current = now;
      elapsedRef.current += delta;
      setProgress(Math.min(elapsedRef.current / SLIDE_INTERVAL, 1));

      if (elapsedRef.current >= SLIDE_INTERVAL) {
        setCurrent((prev) => (prev + 1) % slides.length);
        elapsedRef.current = 0;
        setProgress(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, current]);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-custom grid lg:grid-cols-2 gap-10 lg:gap-20 items-center py-24 lg:py-0">
        {/* Static text content */}
        <motion.div
          className="order-2 lg:order-1 space-y-7"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-background text-[11px] font-mono tracking-[0.2em] uppercase">
              New Collection 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight leading-[0.92]"
          >
            {brand.tagline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted max-w-xl leading-relaxed"
          >
            {brand.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <a href="#shop" className="btn-primary group">
              Shop the Drop
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a href="#lookbook" className="btn-secondary">
              View Lookbook
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-8 sm:gap-10 pt-8 border-t border-border"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-muted mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="order-1 lg:order-2 relative"
        >
          <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-secondary">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={slide.image}
                alt={slide.alt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                width={1400}
                height={1750}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
              <div className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="pointer-events-auto"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <div className="relative h-[3px] w-8 sm:w-10 bg-white/30 overflow-hidden rounded-full">
                      {i === current && (
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-white rounded-full"
                          style={{ width: `${progress * 100}%` }}
                        />
                      )}
                      {i < current && (
                        <div className="absolute inset-y-0 left-0 w-full bg-white/80 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-mono text-white/60 tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute -bottom-6 -left-4 lg:-bottom-10 lg:-left-10 bg-background border border-border p-5 sm:p-6 shadow-elevated max-w-[260px] hidden sm:block"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-display font-bold text-sm tracking-wide uppercase mb-1.5">Limited Edition</p>
                <p className="text-xs text-muted leading-relaxed">
                  {slide.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
    </section>
  );
}

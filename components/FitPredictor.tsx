"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Ruler } from "lucide-react";

interface FitPredictorProps {
  productId?: string;
}

interface SizeRecommendation {
  size: string;
  fit: "relaxed" | "true" | "slim";
  confidence: number;
}

function calculateSizeRecommendation(heightCm: number, weightKg: number): SizeRecommendation {
  const bmi = weightKg / ((heightCm / 100) ** 2);

  if (heightCm < 165) {
    if (bmi < 20) return { size: "XS", fit: "relaxed", confidence: 85 };
    if (bmi < 23) return { size: "S", fit: "true", confidence: 90 };
    if (bmi < 27) return { size: "M", fit: "true", confidence: 80 };
    return { size: "L", fit: "slim", confidence: 70 };
  }
  if (heightCm < 175) {
    if (bmi < 19) return { size: "S", fit: "relaxed", confidence: 85 };
    if (bmi < 22) return { size: "M", fit: "true", confidence: 95 };
    if (bmi < 26) return { size: "L", fit: "true", confidence: 85 };
    return { size: "XL", fit: "slim", confidence: 75 };
  }
  if (heightCm < 185) {
    if (bmi < 19) return { size: "M", fit: "relaxed", confidence: 80 };
    if (bmi < 23) return { size: "L", fit: "true", confidence: 90 };
    if (bmi < 27) return { size: "XL", fit: "true", confidence: 85 };
    return { size: "XL", fit: "relaxed", confidence: 70 };
  }
  if (bmi < 20) return { size: "L", fit: "relaxed", confidence: 80 };
  if (bmi < 24) return { size: "XL", fit: "true", confidence: 85 };
  return { size: "XL", fit: "relaxed", confidence: 75 };
}

const sizeGuide = [
  { size: "XS", chest: "34-36", waist: "28-30" },
  { size: "S", chest: "36-38", waist: "30-32" },
  { size: "M", chest: "38-40", waist: "32-34" },
  { size: "L", chest: "40-42", waist: "34-36" },
  { size: "XL", chest: "42-44", waist: "36-38" },
];

export default function FitPredictor({ productId }: FitPredictorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [recommendation, setRecommendation] = useState<SizeRecommendation | null>(null);

  const calculateFit = useCallback(() => {
    const h = parseInt(height);
    const w = parseInt(weight);
    if (!h || !w || h < 100 || h < 30) return;
    setRecommendation(calculateSizeRecommendation(h, w));
  }, [height, weight]);

  const fitLabel = recommendation?.fit === "relaxed"
    ? "For a relaxed, oversized fit"
    : recommendation?.fit === "slim"
    ? "For a tailored, slim fit"
    : "True to size — our standard fit";

  return (
    <div className="border border-border bg-warm-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left tap-target"
        aria-expanded={isOpen}
        aria-controls="fit-predictor-content"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Ruler className="w-4.5 h-4.5 text-accent" />
          </div>
          <span className="font-display font-semibold text-sm sm:text-base">
            Smart Fit Predictor
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="fit-predictor-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-border">
              <p className="text-sm text-muted mb-5 pt-4">
                Enter your measurements for a personalized recommendation.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label htmlFor={`height-${productId ?? "all"}`} className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wider">
                    Height (cm)
                  </label>
                  <input
                    id={`height-${productId ?? "all"}`}
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={100}
                    max={220}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all rounded-md"
                    aria-label="Height in centimeters"
                  />
                </div>
                <div>
                  <label htmlFor={`weight-${productId ?? "all"}`} className="block text-xs font-medium text-muted mb-1.5 uppercase tracking-wider">
                    Weight (kg)
                  </label>
                  <input
                    id={`weight-${productId ?? "all"}`}
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={30}
                    max={200}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    className="w-full px-3 py-2.5 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all rounded-md"
                    aria-label="Weight in kilograms"
                  />
                </div>
              </div>

              <button
                onClick={calculateFit}
                className="w-full btn-secondary mb-4"
                disabled={!height || !weight || parseInt(height) < 100 || parseInt(weight) < 30}
              >
                Get My Size
              </button>

              <AnimatePresence>
                {recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="bg-accent/5 border border-accent/15 p-4 rounded-lg mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">Recommended Size</p>
                        <p className="font-display text-2xl font-bold text-primary mb-1">
                          {recommendation.size}
                        </p>
                        <p className="text-sm text-muted">{fitLabel}</p>
                        <p className="text-xs text-muted mt-1">Confidence: {recommendation.confidence}%</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4 border-t border-border">
                <p className="text-[11px] text-muted mb-2 uppercase tracking-wider font-medium">
                  Size Guide (inches)
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {sizeGuide.map((row) => (
                    <div key={row.size} className={`text-center p-2 rounded-md text-xs transition-colors ${
                      recommendation?.size === row.size
                        ? "bg-accent/10 border border-accent/20"
                        : "bg-secondary/50"
                    }`}>
                      <div className="font-bold text-xs">{row.size}</div>
                      <div className="text-[10px] text-muted mt-0.5">{row.chest}"</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

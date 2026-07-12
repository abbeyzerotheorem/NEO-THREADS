"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Ruler } from "lucide-react";

interface FitPredictorProps {
  productId?: string;
}

export default function FitPredictor({ productId }: FitPredictorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const calculateFit = () => {
    const h = parseInt(height);
    const w = parseInt(weight);

    if (!h || !w) return;

    const bmi = w / ((h / 100) ** 2);

    if (bmi < 18.5) {
      setRecommendedSize("Size down for a relaxed fit");
    } else if (bmi < 25) {
      setRecommendedSize("True to size recommended");
    } else if (bmi < 30) {
      setRecommendedSize("Size up for comfort");
    } else {
      setRecommendedSize("Size up 1-2 sizes");
    }
  };

  return (
    <div className="border border-border bg-secondary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-6 text-left tap-target"
        aria-expanded={isOpen}
        aria-controls="fit-predictor-content"
      >
        <div className="flex items-center gap-3">
          <Ruler className="w-5 h-5 text-accent" />
          <span className="font-display font-semibold text-base sm:text-lg">
            Smart Fit Predictor
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="fit-predictor-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-6 pt-0 border-t border-border">
              <p className="text-sm text-secondary/70 mb-4">
                Enter your measurements to get personalized size recommendations and reduce returns.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="height" className="block text-sm font-medium mb-2">
                    Height (cm)
                  </label>
                  <input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="175"
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    aria-label="Height in centimeters"
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-2">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    aria-label="Weight in kilograms"
                  />
                </div>
              </div>

              <button
                onClick={calculateFit}
                className="w-full btn-secondary mb-4"
                disabled={!height || !weight}
              >
                Calculate Fit
              </button>

              <AnimatePresence>
                {recommendedSize && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-accent/10 border border-accent/20 p-4 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-primary mb-1">Recommendation</p>
                        <p className="text-sm text-secondary/80">{recommendedSize}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-secondary/60 mb-2">
                  Size Guide Reference:
                </p>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-center p-2 bg-secondary/30 rounded">
                    <div className="font-bold">XS</div>
                    <div className="text-secondary/60">34-36</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/30 rounded">
                    <div className="font-bold">S</div>
                    <div className="text-secondary/60">36-38</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/30 rounded">
                    <div className="font-bold">M</div>
                    <div className="text-secondary/60">38-40</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/30 rounded">
                    <div className="font-bold">L</div>
                    <div className="text-secondary/60">40-42</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/30 rounded">
                    <div className="font-bold">XL</div>
                    <div className="text-secondary/60">42-44</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

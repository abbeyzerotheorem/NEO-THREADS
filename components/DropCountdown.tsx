"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRemainingTime } from "@/lib/utils";
import { fashionConfig } from "@/data/fashion";

export default function DropCountdown() {
  const { dropTimer } = fashionConfig;
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(new Date(dropTimer.targetDate)));
  const [isVisible, setIsVisible] = useState(dropTimer.enabled);

  useEffect(() => {
    if (!dropTimer.enabled) return;

    const interval = setInterval(() => {
      const remaining = getRemainingTime(new Date(dropTimer.targetDate));
      setTimeLeft(remaining);

      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dropTimer.enabled, dropTimer.targetDate]);

  if (!isVisible) return null;

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary text-background px-4 py-3 sm:px-6 sm:py-4 font-mono text-2xl sm:text-3xl font-bold min-w-[60px] sm:min-w-[80px] text-center"
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <span className="text-xs sm:text-sm font-body tracking-wider mt-2 uppercase">{label}</span>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-primary text-background"
        role="banner"
        aria-label="Drop countdown timer"
      >
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-display font-semibold text-lg sm:text-xl tracking-tight">
                {dropTimer.bannerText}
              </span>
              <span className="hidden lg:inline text-secondary/60">|</span>
              <span className="text-sm sm:text-base text-secondary/80">
                {dropTimer.alertText}
              </span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <TimeBlock value={timeLeft.days} label="Days" />
              <span className="text-2xl sm:text-3xl font-bold">:</span>
              <TimeBlock value={timeLeft.hours} label="Hours" />
              <span className="text-2xl sm:text-3xl font-bold">:</span>
              <TimeBlock value={timeLeft.minutes} label="Mins" />
              <span className="text-2xl sm:text-3xl font-bold">:</span>
              <TimeBlock value={timeLeft.seconds} label="Secs" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

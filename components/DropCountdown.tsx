"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRemainingTime } from "@/lib/utils";
import { fashionConfig } from "@/data/fashion";

const TimeBlock = memo(function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-primary text-background px-3 py-2.5 sm:px-5 sm:py-3.5 font-mono text-xl sm:text-2xl font-bold min-w-[52px] sm:min-w-[72px] text-center tabular-nums">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="block"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] sm:text-xs font-body tracking-[0.15em] mt-2 uppercase text-background/60">
        {label}
      </span>
    </div>
  );
});

const Separator = memo(function Separator() {
  return (
    <span className="text-xl sm:text-2xl font-bold text-background/40 pb-5">:</span>
  );
});

export default function DropCountdown() {
  const { dropTimer } = fashionConfig;
  const [timeLeft, setTimeLeft] = useState(() => getRemainingTime(new Date(dropTimer.targetDate)));
  const [isVisible, setIsVisible] = useState(dropTimer.enabled);

  const tick = useCallback(() => {
    const remaining = getRemainingTime(new Date(dropTimer.targetDate));
    setTimeLeft(remaining);
    if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
      setIsVisible(false);
    }
  }, [dropTimer.targetDate]);

  useEffect(() => {
    if (!dropTimer.enabled) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [dropTimer.enabled, tick]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-primary text-background overflow-hidden"
        role="banner"
        aria-label="Drop countdown timer"
      >
        <div className="container-custom py-3 sm:py-3.5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="font-display font-semibold text-sm sm:text-base tracking-tight text-background">
                {dropTimer.bannerText}
              </span>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="text-xs sm:text-sm text-background/60">
                {dropTimer.alertText}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <TimeBlock value={timeLeft.days} label="Days" />
              <Separator />
              <TimeBlock value={timeLeft.hours} label="Hrs" />
              <Separator />
              <TimeBlock value={timeLeft.minutes} label="Min" />
              <Separator />
              <TimeBlock value={timeLeft.seconds} label="Sec" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

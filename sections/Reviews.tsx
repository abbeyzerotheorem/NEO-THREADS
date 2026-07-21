"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function Reviews() {
  const { reviews } = fashionConfig;

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary text-background text-xs font-mono tracking-[0.2em] uppercase mb-5"
          >
            Reviews
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Customer Stories
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(parseFloat(averageRating)) ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
            <span className="text-sm font-mono font-semibold ml-1">{averageRating}</span>
            <span className="text-sm text-muted">({reviews.length} reviews)</span>
          </div>
          <p className="text-base text-muted max-w-xl mx-auto leading-relaxed">
            Real feedback from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-background border border-border p-5 sm:p-6 hover:shadow-premium hover:border-border/80 transition-all duration-400 group"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < review.rating ? "fill-accent text-accent" : "text-border"
                    }`}
                  />
                ))}
              </div>

              <h3 className="font-display font-semibold text-sm sm:text-base mb-2 leading-snug">
                {review.title}
              </h3>

              <p className="text-sm text-muted mb-4 line-clamp-3 leading-relaxed">
                {review.content}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="font-semibold text-xs">{review.customerName}</p>
                  <p className="text-[11px] text-muted mt-0.5">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>

                {review.verified && (
                  <span className="text-[10px] bg-accent/8 text-accent px-2 py-1 font-semibold uppercase tracking-wider rounded-sm">
                    Verified
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
                <Quote className="w-3 h-3" />
                <span>{review.helpfulCount} found this helpful</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function Reviews() {
  const { reviews } = fashionConfig;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-accent text-accent" : "text-secondary/30"
        }`}
      />
    ));
  };

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Customer Stories
          </h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Real feedback from our community. See what others are saying about their NEO-THREADS experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background border border-border p-6 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              <h3 className="font-display font-semibold text-lg mb-2">
                {review.title}
              </h3>

              <p className="text-secondary/70 mb-4 line-clamp-3 leading-relaxed">
                {review.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-sm">{review.customerName}</p>
                  <p className="text-xs text-secondary/60">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>

                {review.verified && (
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 font-medium">
                    Verified
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-secondary/60">
                <Quote className="w-4 h-4" />
                <span>{review.helpfulCount} people found this helpful</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-secondary">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
}

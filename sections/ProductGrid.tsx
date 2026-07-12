"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Plus } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import { formatPrice } from "@/lib/utils";
import type { Product, ColorVariant } from "@/types/fashion";

export default function ProductGrid() {
  const { products } = fashionConfig;
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});

  const handleColorSelect = (productId: string, colorId: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorId }));
  };

  const getActiveVariant = (product: Product): ColorVariant => {
    const selectedColorId = selectedColors[product.id];
    return (
      product.colorVariants.find((v) => v.id === selectedColorId) ||
      product.colorVariants[0]
    );
  };

  return (
    <section className="section-padding bg-secondary/20" id="shop">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Editorial Catalog
          </h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Discover our latest arrivals and timeless essentials, crafted with uncompromising quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const activeVariant = getActiveVariant(product);
            const isLowStock = product.stockQuantity < 10 && product.stockQuantity > 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="product-card"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="product-card-image relative">
                  <img
                    src={
                      hoveredProduct === product.id
                        ? activeVariant.imageSecondary
                        : activeVariant.imagePrimary
                    }
                    alt={product.title}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />

                  {product.labels.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.labels.map((label) => (
                        <span
                          key={label}
                          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            label === "Sold Out"
                              ? "bg-primary text-background"
                              : label === "New Drop"
                              ? "bg-accent text-background"
                              : "bg-background text-primary border border-border"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}

                  {isLowStock && (
                    <div className="absolute top-3 right-3 bg-red-600 text-background px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      Low Stock
                    </div>
                  )}

                  <div className="absolute inset-0 product-card-overlay" />

                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="flex-1 btn-primary tap-target text-sm py-3">
                      Quick Add
                    </button>
                    <button className="tap-target w-12 h-12 flex items-center justify-center bg-background border border-border hover:bg-secondary transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-semibold text-base sm:text-lg flex-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 ml-2">
                      {product.discountPrice && (
                        <span className="text-sm text-secondary/60 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                      <span className="font-mono font-semibold">
                        {formatPrice(product.discountPrice || product.price)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-secondary/60 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    {product.colorVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => handleColorSelect(product.id, variant.id)}
                        className={`w-6 h-6 rounded-full border-2 transition-all tap-target ${
                          selectedColors[product.id] === variant.id
                            ? "border-primary scale-110"
                            : "border-border hover:border-primary"
                        }`}
                        style={{ backgroundColor: variant.hexCode }}
                        aria-label={`Select ${variant.name}`}
                        title={variant.name}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-secondary/60">
                    <span>{product.material}</span>
                    <span className={isLowStock ? "text-red-600 font-semibold" : ""}>
                      {product.stockQuantity === 0
                        ? "Sold Out"
                        : `${product.stockQuantity} available`}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-secondary">
            View All Products
            <Plus className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

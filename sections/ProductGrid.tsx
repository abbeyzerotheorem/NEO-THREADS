"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Plus, SlidersHorizontal } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, ColorVariant, ProductCategory } from "@/types/fashion";
import FitPredictor from "@/components/FitPredictor";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "outerwear", label: "Outerwear" },
  { value: "tailoring", label: "Tailoring" },
  { value: "essentials", label: "Essentials" },
  { value: "footwear", label: "Footwear" },
  { value: "accessories", label: "Accessories" },
];

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product, variant: ColorVariant) => void;
}

function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const activeVariant = product.colorVariants[selectedColorIdx] || product.colorVariants[0];
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 10;
  const isSoldOut = product.stockQuantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-image relative">
        <img
          src={isHovered ? activeVariant.imageSecondary : activeVariant.imagePrimary}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          width={600}
          height={800}
          loading="lazy"
        />

        {product.labels.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.labels.map((label) => (
              <span
                key={label}
                className={cn(
                  "px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] leading-none",
                  label === "Sold Out"
                    ? "bg-foreground text-background"
                    : label === "New Drop"
                    ? "bg-accent text-background"
                    : label === "Low Stock"
                    ? "bg-red-600 text-white"
                    : "bg-background/95 text-foreground backdrop-blur-sm border border-border"
                )}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="absolute inset-0 product-card-overlay" />

        <div className={cn(
          "absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isSoldOut) onQuickAdd(product, activeVariant);
            }}
            disabled={isSoldOut}
            className="flex-1 btn-primary text-xs py-2.5 px-3"
          >
            {isSoldOut ? "Sold Out" : "Quick Add"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className={cn(
              "tap-target w-10 h-10 flex items-center justify-center border transition-all duration-300",
              isWishlisted
                ? "bg-accent/10 border-accent/30 text-accent"
                : "bg-background/95 backdrop-blur-sm border-border hover:bg-secondary"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-accent")} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-semibold text-sm sm:text-base leading-tight flex-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {product.discountPrice && (
              <span className="text-xs text-muted line-through">
                {formatPrice(product.price)}
              </span>
            )}
            <span className="font-mono text-sm font-semibold tabular-nums">
              {formatPrice(product.discountPrice || product.price)}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted mb-3 line-clamp-1 leading-relaxed">
          {product.material}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.colorVariants.map((variant, idx) => (
              <button
                key={variant.id}
                onClick={() => setSelectedColorIdx(idx)}
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-200",
                  selectedColorIdx === idx
                    ? "border-foreground scale-110 shadow-sm"
                    : "border-border hover:border-foreground/40"
                )}
                style={{ backgroundColor: variant.hexCode }}
                aria-label={`Select ${variant.name}`}
                title={variant.name}
              />
            ))}
          </div>

          <span className={cn(
            "text-[10px] font-medium tabular-nums",
            isSoldOut ? "text-muted" : isLowStock ? "text-red-600" : "text-muted"
          )}>
            {isSoldOut ? "Sold Out" : `${product.stockQuantity} left`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid() {
  const { products } = fashionConfig;
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [cartItems, setCartItems] = useState<Array<{ product: Product; variant: ColorVariant }>>([]);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleQuickAdd = useCallback((product: Product, variant: ColorVariant) => {
    setCartItems((prev) => [...prev, { product, variant }]);
  }, []);

  return (
    <section className="section-padding bg-warm-50" id="shop">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary text-background text-xs font-mono tracking-[0.2em] uppercase mb-5"
          >
            Shop
          </motion.span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Editorial Catalog
          </h2>
          <p className="text-base text-muted max-w-xl mx-auto leading-relaxed">
            Latest arrivals and timeless essentials, crafted with uncompromising quality.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap rounded-full tap-target",
                activeCategory === cat.value
                  ? "bg-primary text-background"
                  : "bg-background text-muted hover:bg-secondary hover:text-foreground border border-border"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>

        <div className="mt-14">
          <FitPredictor />
        </div>
      </div>
    </section>
  );
}

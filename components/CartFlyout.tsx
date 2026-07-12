"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { fashionConfig } from "@/data/fashion";
import type { Product, ColorVariant, Size } from "@/types/fashion";

interface CartItem {
  product: Product;
  colorVariant: ColorVariant;
  size: Size;
  quantity: number;
}

interface CartFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartFlyout({ isOpen, onClose }: CartFlyoutProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("neo-threads-cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("neo-threads-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQuantity = Math.max(1, updated[index].quantity + delta);
      updated[index].quantity = newQuantity;
      return updated;
    });
  };

  const removeItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Your Cart ({totalItems})
              </h2>
              <button
                onClick={onClose}
                className="tap-target p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-secondary mb-4" />
                  <p className="text-lg font-body mb-2">Your cart is empty</p>
                  <p className="text-secondary/60 text-sm">Add some pieces to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.colorVariant.id}-${item.size.name}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 pb-6 border-b border-border last:border-0"
                    >
                      <div className="relative w-24 h-32 flex-shrink-0 bg-secondary overflow-hidden">
                        <img
                          src={item.colorVariant.imagePrimary}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                        {item.product.discountPrice && (
                          <div className="absolute top-2 left-2 bg-accent text-background text-xs font-bold px-2 py-1">
                            SALE
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-base mb-1 truncate">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-secondary/60 mb-2">
                          {item.colorVariant.name} · Size {item.size.name}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="tap-target w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-mono w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="tap-target w-8 h-8 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-display font-semibold">
                            {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-sm text-secondary/60 hover:text-accent transition-colors underline"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-border p-6 bg-secondary/30">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary/60">Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary/60">Shipping</span>
                    <span className="font-mono">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  className="w-full btn-primary relative overflow-hidden"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Checkout
                      <Check className="w-5 h-5" />
                    </span>
                  )}
                </button>

                <p className="text-center text-xs text-secondary/60 mt-4">
                  Free express shipping on orders over {formatPrice(250)}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

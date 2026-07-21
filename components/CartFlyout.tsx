"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Check, Truck } from "lucide-react";
import { formatPrice, loadCart, saveCart, getCartTotal, getCartCount, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";
import type { CartItem } from "@/types/fashion";

interface CartFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate?: (count: number) => void;
}

export default function CartFlyout({ isOpen, onClose, onCartUpdate }: CartFlyoutProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  useEffect(() => {
    saveCart(cartItems);
    onCartUpdate?.(getCartCount(cartItems));
  }, [cartItems, onCartUpdate]);

  const updateQuantity = useCallback((index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQuantity = Math.max(1, updated[index].quantity + delta);
      updated[index] = { ...updated[index], quantity: newQuantity };
      return updated;
    });
  }, []);

  const removeItem = useCallback((index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const subtotal = getCartTotal(cartItems);
  const totalItems = getCartCount(cartItems);
  const freeShippingProgress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280, mass: 0.8 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-float flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-xl font-bold tracking-tight">
                Your Cart ({totalItems})
              </h2>
              <button
                onClick={onClose}
                className="tap-target p-2 -mr-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {subtotal < FREE_SHIPPING_THRESHOLD && cartItems.length > 0 && (
              <div className="px-6 py-3 bg-accent-light">
                <div className="flex items-center gap-2 mb-1.5">
                  <Truck className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-accent">
                    {remainingForFreeShipping > 0
                      ? `Add ${formatPrice(remainingForFreeShipping)} more for free express shipping`
                      : "You qualify for free express shipping!"}
                  </span>
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-muted" />
                  </div>
                  <p className="font-display text-lg font-semibold mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted mb-6 max-w-[240px]">
                    Discover our latest drops and add your favorites
                  </p>
                  <button onClick={onClose} className="btn-primary text-sm">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.colorVariant.id}-${item.size.name}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      layout
                      className="flex gap-4 pb-5 border-b border-border last:border-0"
                    >
                      <div className="relative w-20 h-28 flex-shrink-0 bg-secondary overflow-hidden">
                        <img
                          src={item.colorVariant.imagePrimary}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                          width={80}
                          height={112}
                        />
                        {item.product.discountPrice && (
                          <div className="absolute top-1.5 left-1.5 bg-accent text-background text-[10px] font-bold px-1.5 py-0.5 uppercase">
                            Sale
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col">
                        <h3 className="font-display font-semibold text-sm mb-0.5 truncate pr-6">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-muted mb-2">
                          {item.colorVariant.name} · {item.size.name}
                        </p>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="tap-target w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-sm w-7 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="tap-target w-7 h-7 flex items-center justify-center border border-border hover:bg-secondary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-display font-semibold text-sm tabular-nums">
                            {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(index)}
                          className="text-xs text-muted hover:text-accent transition-colors mt-2 self-start underline underline-offset-2"
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
              <div className="border-t border-border px-6 py-5 bg-warm-50">
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className="font-mono text-xs">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        "Calculated at checkout"
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-border">
                    <span className="font-display">Total</span>
                    <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <button
                  className="w-full btn-primary relative overflow-hidden"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Checkout
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </button>

                <p className="text-center text-[11px] text-muted mt-3">
                  Free express shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

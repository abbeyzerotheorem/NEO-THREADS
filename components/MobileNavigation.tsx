"use client";

import { useState } from "react";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fashionConfig } from "@/data/fashion";

interface MobileNavigationProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function MobileNavigation({ cartCount, onCartClick }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around py-3 px-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center gap-1 tap-target"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs font-medium">Menu</span>
          </button>

          <button className="flex flex-col items-center gap-1 tap-target" aria-label="Search">
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Search</span>
          </button>

          <button className="flex flex-col items-center gap-1 tap-target" aria-label="Wishlist">
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Wishlist</span>
          </button>

          <button
            onClick={onCartClick}
            className="flex flex-col items-center gap-1 tap-target relative"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-background text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-full max-w-sm bg-background z-50 lg:hidden shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-display text-2xl font-semibold tracking-tight">
                  {fashionConfig.brand.name}
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="tap-target p-2 hover:bg-secondary rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-6">
                  <li>
                    <a
                      href="#collections"
                      className="block font-display text-xl font-semibold hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Collections
                    </a>
                  </li>
                  <li>
                    <a
                      href="#shop"
                      className="block font-display text-xl font-semibold hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shop All
                    </a>
                  </li>
                  <li>
                    <a
                      href="#lookbook"
                      className="block font-display text-xl font-semibold hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Lookbook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="block font-display text-xl font-semibold hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="block font-display text-xl font-semibold hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </a>
                  </li>
                </ul>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-sm text-secondary/60 mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    {fashionConfig.brand.socialLinks.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-accent transition-colors"
                      >
                        {social.handle}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

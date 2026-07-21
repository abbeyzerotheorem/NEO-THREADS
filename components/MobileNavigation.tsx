"use client";

import { useCallback } from "react";
import { Menu, X, Search, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fashionConfig } from "@/data/fashion";

interface MobileNavigationProps {
  cartCount: number;
  onCartClick: () => void;
  isMenuOpen: boolean;
  onMenuToggle: (open: boolean) => void;
}

const navLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Shop All", href: "#shop" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNavigation({ cartCount, onCartClick, isMenuOpen, onMenuToggle }: MobileNavigationProps) {
  const closeMenu = useCallback(() => onMenuToggle(false), [onMenuToggle]);

  return (
    <>
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-40"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around py-2 px-2">
          <button
            onClick={() => onMenuToggle(true)}
            className="flex flex-col items-center gap-0.5 py-2 px-3 tap-target"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Menu</span>
          </button>

          <button
            className="flex flex-col items-center gap-0.5 py-2 px-3 tap-target"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Search</span>
          </button>

          <button
            className="flex flex-col items-center gap-0.5 py-2 px-3 tap-target"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Wishlist</span>
          </button>

          <button
            onClick={onCartClick}
            className="flex flex-col items-center gap-0.5 py-2 px-3 tap-target relative"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide">Cart</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0.5 right-1 bg-accent text-background text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
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
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280, mass: 0.8 }}
              className="fixed left-0 top-0 h-full w-[min(85vw,400px)] bg-background z-50 lg:hidden shadow-float flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-display text-xl font-bold tracking-tight">
                  {fashionConfig.brand.name}
                </span>
                <button
                  onClick={closeMenu}
                  className="tap-target p-2 -mr-2 hover:bg-secondary rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        className="block py-3 px-4 -mx-4 font-display text-lg font-medium hover:text-accent hover:bg-secondary/50 rounded-lg transition-all"
                        onClick={closeMenu}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-xs font-medium text-muted tracking-wider uppercase mb-4">Follow Us</p>
                  <div className="flex flex-wrap gap-3">
                    {fashionConfig.brand.socialLinks.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted hover:text-accent transition-colors px-3 py-1.5 border border-border hover:border-accent/30 rounded-full"
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

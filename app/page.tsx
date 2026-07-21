"use client";

import { useState, useCallback, useEffect } from "react";
import DropCountdown from "@/components/DropCountdown";
import CartFlyout from "@/components/CartFlyout";
import MobileNavigation from "@/components/MobileNavigation";
import Hero from "@/sections/Hero";
import Collections from "@/sections/Collections";
import ProductGrid from "@/sections/ProductGrid";
import LookbookHotspots from "@/components/LookbookHotspots";
import Sustainability from "@/sections/Sustainability";
import Reviews from "@/sections/Reviews";
import FAQ from "@/sections/FAQ";
import Footer from "@/sections/Footer";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import { loadCart, getCartCount } from "@/lib/utils";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount(loadCart()));
  }, []);

  const handleCartUpdate = useCallback((count: number) => {
    setCartCount(count);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <DropCountdown />

      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-3.5 flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden tap-target p-2 -ml-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <a href="/" className="font-display text-xl sm:text-2xl font-bold tracking-tight">
            {fashionConfig.brand.name}
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: "Collections", href: "#collections" },
              { label: "Shop", href: "#shop" },
              { label: "Lookbook", href: "#lookbook" },
              { label: "About", href: "#about" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              className="hidden sm:flex tap-target p-2.5 hover:bg-secondary rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={openCart}
              className="tap-target p-2.5 hover:bg-secondary rounded-full transition-colors relative"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-accent text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <Hero />
      <Collections />
      <ProductGrid />
      <LookbookHotspots />
      <Sustainability />
      <Reviews />
      <FAQ />
      <Footer />

      <div className="lg:hidden">
        <MobileNavigation
          cartCount={cartCount}
          onCartClick={openCart}
          isMenuOpen={isMobileMenuOpen}
          onMenuToggle={setIsMobileMenuOpen}
        />
      </div>
      <CartFlyout isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCartUpdate={handleCartUpdate} />
    </main>
  );
}

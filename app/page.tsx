"use client";

import { useState } from "react";
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

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <main className="min-h-screen bg-background">
      <DropCountdown />

      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container-custom py-4 flex items-center justify-between">
          <button className="lg:hidden tap-target p-2" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>

          <a href="/" className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            {fashionConfig.brand.name}
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#collections" className="text-sm font-medium hover:text-accent transition-colors">
              Collections
            </a>
            <a href="#shop" className="text-sm font-medium hover:text-accent transition-colors">
              Shop
            </a>
            <a href="#lookbook" className="text-sm font-medium hover:text-accent transition-colors">
              Lookbook
            </a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block tap-target p-2 hover:bg-secondary rounded-full transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="tap-target p-2 hover:bg-secondary rounded-full transition-colors relative"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-background text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
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

      <MobileNavigation cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <CartFlyout isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}

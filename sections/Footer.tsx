"use client";

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { fashionConfig } from "@/data/fashion";

export default function Footer() {
  const { brand, contact, shipping } = fashionConfig;

  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "#new" },
      { name: "Bestsellers", href: "#bestsellers" },
      { name: "Collections", href: "#collections" },
      { name: "Sale", href: "#sale" }
    ],
    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "FAQs", href: "#faq" },
      { name: "Shipping Info", href: "#shipping" },
      { name: "Returns", href: "#returns" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Sustainability", href: "#sustainability" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "Accessibility", href: "#accessibility" }
    ]
  };

  return (
    <footer className="bg-primary text-background" id="contact">
      <div className="container-custom py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl font-bold tracking-tight mb-4">
              {brand.name}
            </h3>
            <p className="text-secondary/80 mb-6 max-w-sm leading-relaxed">
              {brand.tagline}. Premium silhouettes crafted with uncompromising quality and sustainable practices.
            </p>

            <div className="flex gap-4 mb-8">
              {brand.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-secondary/30 hover:border-accent hover:text-accent transition-colors tap-target"
                  aria-label={social.platform}
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="space-y-3 text-sm text-secondary/80">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${contact.customerCareEmail}`} className="hover:text-accent transition-colors">
                  {contact.customerCareEmail}
                </a>
              </div>
              {contact.supportPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${contact.supportPhone}`} className="hover:text-accent transition-colors">
                    {contact.supportPhone}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{contact.returnsHubAddress}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-secondary/80 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-secondary/80 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-secondary/80 hover:text-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-display font-semibold mb-4">Newsletter</h4>
              <p className="text-secondary/80 text-sm mb-4">
                Subscribe for early access to drops and exclusive offers.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-secondary/20 border border-secondary/30 text-background placeholder:text-secondary/60 focus:outline-none focus:border-accent transition-colors"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-background font-semibold hover:bg-accent/90 transition-colors tap-target"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Shipping</h4>
              <ul className="space-y-2 text-sm text-secondary/80">
                {shipping.slice(0, 3).map((tier) => (
                  <li key={tier.name} className="flex justify-between">
                    <span>{tier.name}</span>
                    <span>{tier.estimatedDays}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-secondary/20">
            <p className="text-sm text-secondary/60">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-secondary/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

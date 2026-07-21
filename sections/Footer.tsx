"use client";

import { useState, useCallback } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { fashionConfig } from "@/data/fashion";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

const platformIcons: Record<string, typeof MessageCircle> = {
  instagram: MessageCircle,
  twitter: MessageCircle,
  tiktok: MessageCircle,
};

export default function Footer() {
  const { brand, contact, shipping, footerLinks } = fashionConfig;
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
    }
  }, [email]);

  return (
    <footer className="bg-primary text-background" id="contact">
      <div className="container-custom py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold tracking-tight mb-3">
              {brand.name}
            </h3>
            <p className="text-sm text-background/60 mb-6 max-w-sm leading-relaxed">
              {brand.tagline}. Premium silhouettes crafted with uncompromising quality and sustainable practices.
            </p>

            <div className="flex gap-3 mb-8">
              {brand.socialLinks.map((social) => {
                const Icon = platformIcons[social.platform] || MessageCircle;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-background/20 hover:border-accent hover:text-accent transition-all duration-300 rounded-full tap-target"
                    aria-label={social.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="space-y-2.5 text-sm text-background/60">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${contact.customerCareEmail}`} className="hover:text-accent transition-colors">
                  {contact.customerCareEmail}
                </a>
              </div>
              {contact.supportPhone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${contact.supportPhone}`} className="hover:text-accent transition-colors">
                    {contact.supportPhone}
                  </a>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{contact.returnsHubAddress}</span>
              </div>
            </div>
          </div>

          {(["shop", "support", "company"] as const).map((group) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks[group].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-background/60 hover:text-accent transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-background/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Newsletter</h4>
              <p className="text-sm text-background/60 mb-4">
                Early access to drops and exclusive offers.
              </p>
              {isSubscribed ? (
                <p className="text-sm text-accent font-medium">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 bg-background/10 border border-background/20 text-background text-sm placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors rounded-none"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-accent text-background font-semibold text-xs uppercase tracking-wider hover:bg-accent/90 transition-colors tap-target"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-3">Shipping</h4>
              <ul className="space-y-2 text-sm text-background/60">
                {shipping.slice(0, 3).map((tier) => (
                  <li key={tier.name} className="flex justify-between">
                    <span>{tier.name}</span>
                    <span className="text-background/40">{tier.estimatedDays}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-background/40 mt-3">
                Free express shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/10">
            <p className="text-xs text-background/40">
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-background/40 hover:text-accent transition-colors"
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

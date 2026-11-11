import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageSquare, Mail, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { CATEGORIES } from '../data/products';
import { createWhatsAppGeneralLink } from '../utils/formatters';

interface FooterProps {
  onOpenPolicyModal?: (policyType: 'shipping' | 'return' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicyModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#632B3A] text-[#F8F5F0] pt-16 pb-12 border-t border-[#411B25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/15">
          {/* Brand Intro Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-3xl tracking-[0.25em] font-medium text-[#F8F5F0] uppercase block">
                {storeConfig.brandName}
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#D9B8B3] uppercase font-sans font-medium">
                {storeConfig.brandTagline}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#F8F5F0]/75 font-sans font-light leading-relaxed max-w-sm mb-6">
              Contemporary Indian couture and handwoven pret celebrating generational artisanal mastery. Designed in New Delhi, delivered with care across India and worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={storeConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#632B3A] text-[#F8F5F0] flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href={createWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#632B3A] text-[#F8F5F0] flex items-center justify-center transition-colors"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href={`mailto:${storeConfig.contactEmail}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#632B3A] text-[#F8F5F0] flex items-center justify-center transition-colors"
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${storeConfig.phone}`}
                aria-label="Phone"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#632B3A] text-[#F8F5F0] flex items-center justify-center transition-colors"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Shop Categories Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9B8B3] font-semibold mb-4 font-sans">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5F0]/80 font-sans">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/collections?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/collections?tag=new" className="text-[#D9B8B3] hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Support Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9B8B3] font-semibold mb-4 font-sans">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5F0]/80 font-sans">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Atelier & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Studio
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal && onOpenPolicyModal('shipping')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping & Delivery Info
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal && onOpenPolicyModal('return')}
                  className="hover:text-white transition-colors text-left"
                >
                  7-Day Exchange Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal && onOpenPolicyModal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicyModal && onOpenPolicyModal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D9B8B3] font-semibold mb-4 font-sans">
              Atelier Gazette
            </h4>
            <p className="text-xs text-[#F8F5F0]/75 font-sans leading-relaxed mb-4">
              Be the first to receive private collection previews, seasonal trunk shows, and editorial edits.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 border border-white/25 px-3.5 py-2.5 text-xs text-[#F8F5F0] placeholder-white/50 focus:outline-none focus:border-[#D9B8B3] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#F8F5F0] hover:bg-white text-[#632B3A] text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowUpRight size={14} />
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs mt-2 font-sans">
                <CheckCircle2 size={13} />
                <span>Thank you for joining our private circle.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F8F5F0]/60 font-sans">
          <div>
            &copy; {new Date().getFullYear()} {storeConfig.brandName} Atelier. All rights reserved. Crafted with contemporary Indian elegance.
          </div>

          <div className="text-[11px] bg-black/20 px-3 py-1.5 border border-white/10 text-[#D9B8B3]">
            Demonstration Storefront Concept &bull; All product specs and policies are configurable
          </div>
        </div>
      </div>
    </footer>
  );
};

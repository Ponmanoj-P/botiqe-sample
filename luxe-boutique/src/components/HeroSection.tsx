import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNewArrivals?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNewArrivals }) => {
  const handleScrollDown = () => {
    if (onScrollToNewArrivals) {
      onScrollToNewArrivals();
    } else {
      const target = document.getElementById('shop-by-category');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[92vh] lg:min-h-[94vh] flex items-center bg-[#F8F5F0] overflow-hidden">
      {/* Background Editorial Model Image with Subtle Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85"
          alt="Contemporary Indian Women's Fashion Campaign - Handcrafted Silk and Ethnic Couture"
          className="w-full h-full object-cover object-top sm:object-center transform scale-100 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Editorial Gradients: Dark subtle overlay on mobile for legibility, luxury warm wash on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#252323]/85 via-[#252323]/55 to-transparent lg:from-[#252323]/80 lg:via-[#252323]/40 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#252323]/80 via-transparent to-black/20" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full text-white">
        <div className="max-w-2xl">
          {/* Subtle Season Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#F8F5F0] text-[11px] uppercase tracking-[0.25em] mb-6 font-sans">
            <Sparkles size={12} className="text-[#D9B8B3]" />
            <span>Autumn / Festive Edit &bull; Vol. 26</span>
          </div>

          {/* Main Campaign Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.08] tracking-tight text-[#F8F5F0] mb-6">
            Style That Speaks.
            <span className="block italic font-normal text-[#D9B8B3] mt-1">
              Elegance That Lasts.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base lg:text-lg text-[#F8F5F0]/90 font-light leading-relaxed max-w-xl mb-10 font-sans tracking-wide">
            Discover thoughtfully curated styles that celebrate individuality and timeless fashion. Handwoven textiles, artisanal silhouettes, and couture tailoring for the modern woman.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#632B3A] text-[#F8F5F0] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#52222F] transition-all duration-300 shadow-luxury group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={handleScrollDown}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-[#F8F5F0] border border-white/40 text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-sm transition-all duration-300"
            >
              <span>DISCOVER NEW ARRIVALS</span>
            </button>
          </div>

          {/* Quick Pillars Micro-Badge */}
          <div className="mt-14 pt-8 border-t border-white/20 grid grid-cols-3 gap-4 max-w-lg text-[11px] tracking-widest uppercase text-white/80 font-sans">
            <div>
              <span className="block text-white font-medium">Pan-India</span>
              <span className="text-[10px] text-white/60 lowercase">express delivery</span>
            </div>
            <div>
              <span className="block text-white font-medium">100% Pure</span>
              <span className="text-[10px] text-white/60 lowercase">handloom silks</span>
            </div>
            <div>
              <span className="block text-white font-medium">Bespoke</span>
              <span className="text-[10px] text-white/60 lowercase">custom sizing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        type="button"
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to discover collections"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans mb-1 opacity-80 group-hover:opacity-100">
          Scroll Down
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
};

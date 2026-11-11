import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const CategorySection: React.FC = () => {
  return (
    <section id="shop-by-category" className="py-20 lg:py-28 bg-[#F8F5F0] border-b border-[#E9DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18">
          <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-medium font-sans mb-3 block">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] tracking-tight">
            Find Your Style
          </h2>
          <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#252323]/70 font-light font-sans max-w-lg mx-auto leading-relaxed">
            From regal handloomed sarees to breathable everyday pret, explore our meticulously designed silhouettes.
          </p>
        </div>

        {/* Visually Immersive Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              to={`/collections?category=${encodeURIComponent(cat.name)}`}
              className="group relative h-[380px] sm:h-[440px] overflow-hidden bg-[#E9DFD3] block shadow-sm hover:shadow-luxury transition-all duration-500"
            >
              {/* Image with subtle zoom on hover */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#252323]/85 via-[#252323]/25 to-transparent group-hover:from-[#632B3A]/90 group-hover:via-[#252323]/40 transition-colors duration-500" />

              {/* Number Badge (01, 02, etc.) */}
              <div className="absolute top-5 left-5 text-white/70 font-serif text-sm tracking-widest">
                0{idx + 1}
              </div>

              {/* Item Count Badge */}
              <div className="absolute top-5 right-5 text-[10px] tracking-widest uppercase font-sans px-2.5 py-1 bg-white/20 backdrop-blur-md text-white border border-white/30">
                {cat.itemCount}
              </div>

              {/* Content at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-white transform transition-transform duration-300">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D9B8B3] font-medium block mb-1">
                  {cat.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-white mb-3">
                  {cat.name}
                </h3>

                {/* Shop Now CTA link */}
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-medium text-white/90 group-hover:text-white pt-2 border-t border-white/20 w-full justify-between">
                  <span>Explore Styles</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#632B3A] flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

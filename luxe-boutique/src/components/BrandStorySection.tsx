import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Feather, HeartHandshake } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F5F0] border-t border-[#E9DFD3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
              Our Heritage & Vision
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] leading-tight mb-6 tracking-tight">
              Every Collection
              <span className="block italic font-normal text-[#632B3A]">
                Tells a Story.
              </span>
            </h2>

            <div className="w-16 h-[1.5px] bg-[#632B3A] mb-8" />

            <div className="font-serif text-xl sm:text-2xl text-[#252323]/90 italic leading-relaxed mb-6">
              "Fashion is more than what we wear. It is an expression of personality, culture and individuality. Our collections bring together thoughtful styles for women who love to express themselves."
            </div>

            <p className="text-sm sm:text-base text-[#252323]/70 font-sans font-light leading-relaxed mb-8">
              Founded on the belief that traditional Indian textiles belong in the everyday wardrobe of the contemporary woman, {storeConfig.brandName} collaborates directly with artisanal clusters. From the handspun looms of Chanderi to the intricate needle-arts of Lucknow and Jaipur, each design bridges centuries-old legacy with modern fluidity.
            </p>

            {/* Micro Highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E9DFD3] flex items-center justify-center text-[#632B3A] shrink-0 mt-0.5">
                  <Scissors size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#252323]">Slow Fashion Philosophy</h4>
                  <p className="text-xs text-[#252323]/60 font-sans">Crafted in small ethical batches, prioritizing longevity and fine drape over mass production.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E9DFD3] flex items-center justify-center text-[#632B3A] shrink-0 mt-0.5">
                  <Feather size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#252323]">Pure Breathable Textiles</h4>
                  <p className="text-xs text-[#252323]/60 font-sans">Authentic katan silk, mulmul cotton, and hand-embroidered organza that feel sublime against the skin.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E9DFD3] flex items-center justify-center text-[#632B3A] shrink-0 mt-0.5">
                  <HeartHandshake size={15} />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-[#252323]">Artisan First Partnership</h4>
                  <p className="text-xs text-[#252323]/60 font-sans">Fair wages and direct support for generational weavers and karigars across India.</p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#632B3A] hover:text-[#52222F] pb-1 border-b border-[#632B3A] transition-colors group"
            >
              <span>Read The Full Atelier Story</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Editorial Visual Composition */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative">
              {/* Main Photo */}
              <div className="aspect-[4/5] overflow-hidden bg-[#252323] shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                  alt="Vanya Boutique Model in Contemporary Indian Ethnic Attire"
                  loading="lazy"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -left-6 w-48 sm:w-60 aspect-square border-2 border-[#632B3A] pointer-events-none hidden sm:block -z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

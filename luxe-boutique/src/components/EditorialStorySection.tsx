import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const EditorialStorySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-[#E9DFD3]/40 border-y border-[#E9DFD3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Magazine Spread Image with Layered Detail */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden shadow-2xl bg-[#632B3A]">
              <img
                src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85"
                alt="The Art of Dressing Beautifully - Indian Haute Couture Editorial"
                loading="lazy"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Editorial Label */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white p-6 shadow-luxury border-l-4 border-[#632B3A] max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#632B3A] font-semibold block mb-1">
                Atelier Focus
              </span>
              <p className="font-serif text-lg text-[#252323] italic leading-snug">
                "Pure raw silk infused with hand-carved zardozi needlework."
              </p>
            </div>
          </div>

          {/* Right: Editorial Typography & Philosophy */}
          <div className="lg:col-span-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
              Editorial Campaign &bull; Series 04
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#252323] leading-[1.12] mb-6 tracking-tight">
              The Art of Dressing
              <span className="block italic text-[#632B3A] font-normal">
                Beautifully.
              </span>
            </h2>

            <div className="w-20 h-[1.5px] bg-[#632B3A] mb-8" />

            <p className="font-serif text-xl sm:text-2xl text-[#252323]/80 italic mb-6 leading-relaxed">
              "From everyday elegance to celebrations that deserve something special, explore styles for every moment."
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#252323]/75 font-sans font-light leading-relaxed mb-10">
              <p>
                True luxury lives in the unspoken details: the natural crispness of pure handloom mulberry silk, the fluid drape of 48-kalidar flares, and the subtle glint of authentic zari that catches candlelight during family evenings.
              </p>
              <p>
                Every garment is designed in dialogue between contemporary Indian comfort and generational handcraft techniques sourced from master weavers across Varanasi, Jaipur, Surat, and Chanderi.
              </p>
            </div>

            {/* Campaign Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E9DFD3] mb-10 text-center sm:text-left">
              <div>
                <span className="font-serif text-3xl font-medium text-[#632B3A] block">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#252323]/60 font-sans">Natural Textiles</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-medium text-[#632B3A] block">24+ Hrs</span>
                <span className="text-[11px] uppercase tracking-wider text-[#252323]/60 font-sans">Hand Embroidery</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-medium text-[#632B3A] block">26K+</span>
                <span className="text-[11px] uppercase tracking-wider text-[#252323]/60 font-sans">Indian Pincodes</span>
              </div>
            </div>

            {/* Primary Action */}
            <div>
              <Link
                to="/collections?category=Festive%20Collection"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#632B3A] hover:bg-[#52222F] text-[#F8F5F0] text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-luxury group"
              >
                <span>EXPLORE THE COLLECTION</span>
                <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

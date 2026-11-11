import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Feather, Scissors, HeartHandshake, ShieldCheck } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F8F5F0] min-h-screen py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
            The Atelier & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#252323] tracking-tight mb-4">
            Every Collection Tells a Story
          </h1>
          <div className="w-20 h-[1.5px] bg-[#632B3A] mx-auto mt-4 mb-6" />
          <p className="font-serif text-xl sm:text-2xl text-[#252323]/80 italic max-w-2xl mx-auto leading-relaxed">
            "Fashion is more than what we wear. It is an expression of personality, culture and individuality. Our collections bring together thoughtful styles for women who love to express themselves."
          </p>
        </div>

        {/* Dual Split Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] overflow-hidden bg-[#252323] shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Artisanal Handwoven Textile Legacy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-sm sm:text-base text-[#252323]/80 font-sans font-light leading-relaxed">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252323] font-light">
              Crafting Contemporary Indian Luxury
            </h2>
            <p>
              At <strong>{storeConfig.brandName}</strong>, we celebrate the poetry of Indian textiles. We believe that heritage craftsmanship is not an artifact of the past to be preserved in glass cases, but a living, breathing art form meant to be worn, celebrated, and cherished in daily life.
            </p>
            <p>
              Our collections are born at the intersection of generational weaving clusters and modern silhouettes. We source pure mulberry and katan silks directly from the master weavers of Kanchipuram and Varanasi, hand-block prints from Sanganer, and airy Chanderi weaves from Madhya Pradesh.
            </p>
            <div className="p-6 bg-[#E9DFD3]/50 border-l-4 border-[#632B3A] italic font-serif text-lg text-[#252323]">
              "Each garment takes anywhere from 18 to 40 hours of dedicated handwork—from yarn twisting to final gota edging."
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="bg-white p-8 border border-[#E9DFD3]">
            <Scissors className="text-[#632B3A] mb-4" size={28} />
            <h3 className="font-serif text-xl font-medium text-[#252323] mb-2">Bespoke Fit</h3>
            <p className="text-xs text-[#252323]/70 font-sans leading-relaxed">
              Every garment is designed with generous internal margins allowing effortless tailor-fit adjustments for women of all body silhouettes.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E9DFD3]">
            <Feather className="text-[#632B3A] mb-4" size={28} />
            <h3 className="font-serif text-xl font-medium text-[#252323] mb-2">Pure Natural Fibers</h3>
            <p className="text-xs text-[#252323]/70 font-sans leading-relaxed">
              We exclusively select natural silks, organic long-staple cottons, and Belgian-grade linens certified for breathability.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E9DFD3]">
            <HeartHandshake className="text-[#632B3A] mb-4" size={28} />
            <h3 className="font-serif text-xl font-medium text-[#252323] mb-2">Ethical Fair Pay</h3>
            <p className="text-xs text-[#252323]/70 font-sans leading-relaxed">
              Our artisan karigars are compensated fairly, ensuring that traditional needlecraft remains a sustainable livelihood for families.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E9DFD3]">
            <ShieldCheck className="text-[#632B3A] mb-4" size={28} />
            <h3 className="font-serif text-xl font-medium text-[#252323] mb-2">Silk Mark Certified</h3>
            <p className="text-xs text-[#252323]/70 font-sans leading-relaxed">
              Our handloom sarees and brocade garments carry Silk Mark testing assurances validating pure natural filaments.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#632B3A] text-white p-12 sm:p-16 shadow-luxury">
          <h2 className="font-serif text-3xl sm:text-4xl font-light mb-4">
            Experience Our Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#F8F5F0]/80 font-sans max-w-md mx-auto mb-8">
            Explore our curated festive edits and discover pieces crafted for your most memorable moments.
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F8F5F0] hover:bg-white text-[#632B3A] text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-colors"
          >
            <span>Browse The Catalogue</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

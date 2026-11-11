import React from 'react';
import { Sparkles, ShieldCheck, Smartphone, MapPin } from 'lucide-react';

export const WhyShopWithUs: React.FC = () => {
  const benefits = [
    {
      number: '01',
      icon: Sparkles,
      title: 'Curated Collections',
      description: 'Thoughtfully selected styles for different tastes and occasions, curated in limited production batches to ensure individuality.',
    },
    {
      number: '02',
      icon: ShieldCheck,
      title: 'Quality & Craftsmanship',
      description: 'Fashion that pays dedicated attention to authentic materials, hand-finished seams, pure silk certifications, and durable linings.',
    },
    {
      number: '03',
      icon: Smartphone,
      title: 'Easy Shopping',
      description: 'A seamless shopping experience across mobile, tablet, and desktop with personal styling guidance available via WhatsApp.',
    },
    {
      number: '04',
      icon: MapPin,
      title: 'Nationwide Reach',
      description: 'Explore collections and enquire about door-to-door insured delivery across India, with live pincode verification and tracking.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
            The Boutique Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] tracking-tight">
            More Than Just Fashion.
          </h2>
          <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.number}
                className="bg-white p-8 border border-[#E9DFD3] flex flex-col justify-between group hover:border-[#632B3A] transition-all duration-300 shadow-sm hover:shadow-luxury"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl text-[#D9B8B3] group-hover:text-[#632B3A] transition-colors font-light">
                      {b.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F8F5F0] flex items-center justify-center text-[#632B3A] group-hover:bg-[#632B3A] group-hover:text-white transition-colors">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#252323] mb-3 group-hover:text-[#632B3A] transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#252323]/70 font-sans font-light leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E9DFD3]/50 flex items-center text-[10px] uppercase tracking-widest text-[#632B3A] font-sans font-medium">
                  Boutique Assurance
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

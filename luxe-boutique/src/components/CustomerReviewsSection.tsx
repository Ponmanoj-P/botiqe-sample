import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const CustomerReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#E9DFD3]/30 border-t border-[#E9DFD3]/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
            Patron Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] tracking-tight">
            Loved by Our Customers
          </h2>
          <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4 mb-3" />
          <p className="text-xs text-[#252323]/50 uppercase tracking-widest font-sans">
            (Sample Demonstration Testimonials &bull; Replaceable with Live Boutique Feedback)
          </p>
        </div>

        {/* Carousel Card */}
        <div className="bg-white border border-[#E9DFD3] p-8 sm:p-14 relative shadow-soft-editorial">
          <Quote className="text-[#D9B8B3] w-12 h-12 mb-6 opacity-60" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1 text-[#C5A059] mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="#C5A059" stroke="none" />
            ))}
          </div>

          {/* Quote Body */}
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#252323] font-light leading-relaxed italic mb-8">
            "{current.quote}"
          </blockquote>

          {/* Reviewer Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E9DFD3]/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-medium text-[#252323]">
                  {current.name}
                </span>
                {current.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-sans tracking-wide">
                    <CheckCircle2 size={13} />
                    <span>Verified Boutique Patron</span>
                  </span>
                )}
              </div>
              <span className="text-xs text-[#252323]/60 font-sans">
                {current.location} &bull; Ordered: <span className="italic">{current.product}</span>
              </span>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans text-[#252323]/50 mr-2">
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </span>
              <button
                type="button"
                onClick={prevReview}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-[#E9DFD3] hover:border-[#632B3A] hover:bg-[#632B3A] hover:text-white transition-colors flex items-center justify-center text-[#252323]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-[#E9DFD3] hover:border-[#632B3A] hover:bg-[#632B3A] hover:text-white transition-colors flex items-center justify-center text-[#252323]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

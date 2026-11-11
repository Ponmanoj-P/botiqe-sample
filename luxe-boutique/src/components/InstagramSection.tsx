import React from 'react';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INSTAGRAM_POSTS } from '../data/products';
import { storeConfig } from '../config/storeConfig';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F8F5F0] border-t border-[#E9DFD3]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3">
            <Instagram size={14} />
            <span>{storeConfig.instagramHandle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] tracking-tight">
            Follow Our Style
          </h2>
          <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#252323]/70 font-light font-sans">
            Discover more looks, new arrivals and everyday inspiration. Tag us in your celebrations.
          </p>
        </div>

        {/* Instagram Grid (6 photos) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-[#E9DFD3] shadow-sm"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#252323]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="flex items-center gap-1 text-[#D9B8B3]">
                    <Heart size={12} fill="#D9B8B3" />
                    {post.likes}
                  </span>
                  <Instagram size={14} className="text-white/80" />
                </div>

                <div className="text-center">
                  <p className="text-[11px] line-clamp-2 text-white/90 font-serif italic mb-2">
                    "{post.caption}"
                  </p>
                  <Link
                    to={`/product/${post.productSlug}`}
                    className="inline-block text-[9px] uppercase tracking-widest font-sans px-2.5 py-1 bg-[#632B3A] text-white hover:bg-[#52222F] transition-colors"
                  >
                    Shop Look
                  </Link>
                </div>

                <div className="text-[9px] text-white/50 tracking-wider font-sans text-right">
                  {storeConfig.instagramHandle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={storeConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-[#632B3A] text-[#632B3A] hover:text-[#F8F5F0] border border-[#632B3A] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 group"
          >
            <Instagram size={16} />
            <span>FOLLOW US ON INSTAGRAM</span>
            <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

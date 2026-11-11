import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface NewArrivalsSectionProps {
  id?: string;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ id = 'new-arrivals' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Sarees', 'Ethnic Sets', 'Kurtis & Kurtas', 'Co-ord Sets', 'Festive Collection'];

  // Filter products
  const filteredProducts = PRODUCTS.filter((product: Product) => {
    if (activeCategory === 'All') return true;
    return product.category === activeCategory || product.secondaryCategory === activeCategory;
  }).slice(0, 8); // Top curated items

  return (
    <section id={id} className="py-20 lg:py-28 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E9DFD3] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#632B3A] font-medium font-sans mb-3">
              <Sparkles size={14} />
              <span>Couture & Pret Arrivals</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] tracking-tight">
              Just Arrived
            </h2>
            <p className="text-sm sm:text-base text-[#252323]/70 font-light font-sans mt-3 max-w-xl">
              Fresh styles, thoughtfully selected for your wardrobe. Handpicked textiles tailored for modern celebrations.
            </p>
          </div>

          <Link
            to="/collections"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#632B3A] hover:text-[#52222F] group mt-4 md:mt-0 transition-colors"
          >
            <span>View Full Catalogue</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#632B3A] text-white shadow-sm'
                  : 'bg-white text-[#252323]/70 hover:bg-[#E9DFD3] hover:text-[#252323] border border-[#E9DFD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/collections"
            className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-[#632B3A] text-[#F8F5F0] text-xs uppercase tracking-[0.2em] font-medium"
          >
            <span>VIEW ALL COLLECTIONS ({PRODUCTS.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

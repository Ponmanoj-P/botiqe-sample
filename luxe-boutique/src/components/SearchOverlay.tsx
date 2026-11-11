import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../data/products';
import { formatPrice } from '../utils/formatters';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = [
    'Anarkali',
    'Silk Saree',
    'Chanderi Kurti',
    'Linen Co-ord',
    'Festive Suit',
    'Zari Border',
    'Sharara',
  ];

  const results: Product[] = query.trim()
    ? PRODUCTS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.fabric.toLowerCase().includes(q) ||
          item.craft.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F8F5F0]/98 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#252323]/70 hover:text-[#632B3A] transition-colors rounded-full hover:bg-[#E9DFD3]/40"
            aria-label="Close search"
          >
            <X size={26} />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative border-b-2 border-[#632B3A] pb-3 mb-8">
          <div className="flex items-center gap-3">
            <Search size={28} className="text-[#632B3A] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sarees, anarkalis, kurtas, fabrics, or festive styles..."
              className="w-full bg-transparent font-serif text-2xl sm:text-3xl text-[#252323] placeholder-[#252323]/30 focus:outline-none tracking-wide"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[#252323]/40 hover:text-[#252323]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Suggested Searches */}
        {!query && (
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#252323]/50 font-sans block mb-3">
              Trending Inquiries
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 bg-white hover:bg-[#632B3A] hover:text-white border border-[#E9DFD3] text-xs uppercase tracking-wider font-sans text-[#252323]/80 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-[#252323]/60 mb-6 pb-2 border-b border-[#E9DFD3]">
              <span>
                Found <strong>{results.length}</strong> {results.length === 1 ? 'piece' : 'pieces'} matching "{query}"
              </span>
              <span className="uppercase tracking-widest text-[10px]">Instant Filter</span>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-12 bg-white border border-[#E9DFD3] p-8">
                <p className="font-serif text-xl text-[#252323] mb-2">No direct matches found</p>
                <p className="text-xs text-[#252323]/60 font-sans max-w-sm mx-auto mb-6">
                  Try searching with terms like "Saree", "Linen", "Kurta", "Anarkali", or view all collections.
                </p>
                <Link
                  to="/collections"
                  onClick={onClose}
                  className="inline-block px-6 py-3 bg-[#632B3A] text-white text-xs uppercase tracking-widest font-sans"
                >
                  Browse Full Catalogue
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="group bg-white p-3 border border-[#E9DFD3] hover:border-[#632B3A] transition-all flex flex-col justify-between"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#E9DFD3] mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#632B3A] font-sans">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-base font-medium text-[#252323] group-hover:text-[#632B3A] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#252323]/60 font-sans line-clamp-1 mt-0.5">
                        {product.fabric}
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-[#E9DFD3]/60 flex items-center justify-between text-xs font-sans">
                      <span className="font-serif text-sm font-semibold text-[#252323]">
                        {formatPrice(product.price)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#632B3A] font-medium text-[11px] group-hover:translate-x-0.5 transition-transform">
                        <span>View</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

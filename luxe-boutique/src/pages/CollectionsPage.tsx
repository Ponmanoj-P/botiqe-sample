import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Sparkles, ChevronDown } from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CollectionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [priceFilter, setPriceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyNew, setOnlyNew] = useState<boolean>(tagParam === 'new');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (tagParam === 'new') {
      setOnlyNew(true);
    }
  }, [categoryParam, tagParam]);

  const categories = [
    'All',
    'Sarees',
    'Kurtis & Kurtas',
    'Ethnic Sets',
    'Dresses',
    'Co-ord Sets',
    'Festive Collection',
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹5,000', value: 'under-5000' },
    { label: '₹5,000 - ₹10,000', value: '5000-10000' },
    { label: 'Above ₹10,000', value: 'above-10000' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category === selectedCategory || p.secondaryCategory === selectedCategory
      );
    }

    // Filter by Tag
    if (onlyNew) {
      result = result.filter((p) => p.isNew);
    }

    // Filter by Price Range
    if (priceFilter === 'under-5000') {
      result = result.filter((p) => p.price < 5000);
    } else if (priceFilter === '5000-10000') {
      result = result.filter((p) => p.price >= 5000 && p.price <= 10000);
    } else if (priceFilter === 'above-10000') {
      result = result.filter((p) => p.price > 10000);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategory, onlyNew, priceFilter, sortBy]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceFilter('All');
    setOnlyNew(false);
    setSortBy('featured');
    searchParams.delete('category');
    searchParams.delete('tag');
    setSearchParams(searchParams);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8F5F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
            The Complete Atelier Edit
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] tracking-tight">
            Curated Collections
          </h1>
          <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#252323]/70 font-sans font-light max-w-lg mx-auto leading-relaxed">
            Handcrafted sarees, tailored anarkalis, pure linen co-ords, and festive ensembles celebrating the rich heritage of Indian textile art.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.15em] font-sans font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#632B3A] text-white shadow-sm'
                  : 'bg-white text-[#252323]/70 hover:bg-[#E9DFD3] hover:text-[#252323] border border-[#E9DFD3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Bar Controls */}
        <div className="bg-white p-4 border border-[#E9DFD3] flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-xs font-sans text-[#252323]/70">
              Showing <strong>{filteredAndSortedProducts.length}</strong> of {PRODUCTS.length} pieces
            </span>

            {/* Only New Toggle */}
            <label className="hidden sm:inline-flex items-center gap-2 text-xs font-sans cursor-pointer text-[#252323]">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
                className="accent-[#632B3A] w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-[#632B3A]" />
                New Arrivals Only
              </span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            {/* Price Filter Dropdown (Desktop) */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-sans">
              <span className="text-[#252323]/60">Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-[#F8F5F0] border border-[#E9DFD3] px-3 py-1.5 text-xs text-[#252323] focus:outline-none focus:border-[#632B3A]"
              >
                {priceRanges.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-sans">
              <span className="text-[#252323]/60">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F8F5F0] border border-[#E9DFD3] px-3 py-1.5 text-xs text-[#252323] focus:outline-none focus:border-[#632B3A]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>

            {/* Reset Filters button if modified */}
            {(selectedCategory !== 'All' || priceFilter !== 'All' || onlyNew) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[#632B3A] hover:underline font-sans ml-2"
              >
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white border border-[#E9DFD3] p-12 text-center my-8">
            <h3 className="font-serif text-2xl font-light text-[#252323] mb-2">
              No pieces match your current filters
            </h3>
            <p className="text-xs text-[#252323]/60 font-sans max-w-sm mx-auto mb-6">
              Try adjusting your price range or category selection to explore more boutique styles.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#632B3A] text-white text-xs uppercase tracking-widest font-sans"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

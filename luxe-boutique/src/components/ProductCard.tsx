import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useQuickView } from '../context/QuickViewContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  // Primary image and optional secondary hover image
  const primaryImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  return (
    <div
      className="group relative flex flex-col h-full bg-white transition-all duration-300 border border-[#E9DFD3]/60 hover:border-[#D9B8B3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges and Overlay Actions */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E9DFD3]/30">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered ? hoverImage : primaryImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Labels / Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#632B3A] text-[#F8F5F0] text-[9px] uppercase tracking-[0.2em] font-sans font-semibold">
              NEW
            </span>
          )}
          {product.tag && !product.isNew && (
            <span className="px-2.5 py-1 bg-[#252323] text-[#F8F5F0] text-[9px] uppercase tracking-[0.2em] font-sans font-medium">
              {product.tag}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="px-2.5 py-1 bg-[#C5A059] text-white text-[9px] uppercase tracking-[0.15em] font-sans font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button (Always visible on mobile, slick hover on desktop) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-[#632B3A] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#252323] hover:text-[#632B3A] backdrop-blur-sm shadow-sm'
          }`}
        >
          <Heart size={16} fill={isFavorited ? '#ffffff' : 'none'} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2 bg-gradient-to-t from-black/50 via-transparent to-transparent">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-full py-2.5 px-4 bg-white/95 hover:bg-white text-[#252323] hover:text-[#632B3A] text-[11px] uppercase tracking-[0.2em] font-sans font-medium shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#252323]/60 uppercase tracking-widest font-sans mb-1.5">
            <span>{product.category}</span>
            <span className="text-[#C5A059] font-medium font-sans">
              ★ {product.rating} <span className="text-[#252323]/40">({product.reviewCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#252323] hover:text-[#632B3A] transition-colors line-clamp-1 mb-1">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Subtitle / Fabric brief */}
          <p className="text-xs text-[#252323]/60 line-clamp-1 font-light font-sans mb-3">
            {product.subtitle}
          </p>

          {/* Color variants swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[10px] text-[#252323]/60 tracking-wider uppercase mr-1">
                Colors:
              </span>
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color.name);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === color.name
                      ? 'ring-2 ring-[#632B3A] ring-offset-1 scale-110'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          )}

          {/* Size Pills */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mb-4">
              <span className="text-[10px] text-[#252323]/60 tracking-wider uppercase mr-1">
                Sizes:
              </span>
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-sans transition-colors ${
                    selectedSize === size
                      ? 'bg-[#632B3A] text-white font-medium'
                      : 'bg-[#F8F5F0] text-[#252323]/80 hover:bg-[#E9DFD3]'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-[#252323]/50">+{product.sizes.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Add to Bag */}
        <div className="pt-3 border-t border-[#E9DFD3]/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg sm:text-xl font-semibold text-[#252323]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#252323]/40 line-through font-sans">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-[#632B3A] font-sans font-medium">
              Tax Included
            </span>
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`p-2.5 sm:px-3 sm:py-2 transition-all duration-300 text-xs uppercase tracking-wider font-sans font-medium flex items-center gap-1.5 ${
              justAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-[#632B3A] hover:bg-[#52222F] text-white shadow-sm'
            }`}
            title="Add to Bag"
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

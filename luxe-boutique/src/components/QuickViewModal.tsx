import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ShoppingBag, Check, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuickView } from '../context/QuickViewContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, createWhatsAppProductLink } from '../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIdx(0);
      setSelectedSize(selectedProduct.sizes[0] || 'M');
      setSelectedColor(selectedProduct.colors[0]?.name || 'Standard');
      setQuantity(1);
      setJustAdded(false);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);

  const handleAdd = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Box */}
      <div className="relative bg-[#F8F5F0] border border-[#E9DFD3] max-w-4xl w-full shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-[#252323] hover:text-[#632B3A] bg-white/80 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left: Gallery */}
          <div className="p-6 bg-white border-b md:border-b-0 md:border-r border-[#E9DFD3] flex flex-col">
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#E9DFD3] mb-4">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Thumbnail switcher */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-18 shrink-0 overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#632B3A]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#252323]/60 uppercase tracking-widest font-sans mb-2">
                <span>{selectedProduct.category}</span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#252323] mb-2 leading-snug">
                {selectedProduct.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl font-semibold text-[#632B3A]">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-[#252323]/40 line-through font-sans">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-sans font-medium">
                  Tax Included
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#252323]/70 font-sans font-light leading-relaxed mb-6 line-clamp-3">
                {selectedProduct.description}
              </p>

              {/* Color Selection */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-sans mb-2">
                    <span className="font-medium text-[#252323]">Color Shade:</span>
                    <span className="text-[#632B3A]">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          selectedColor === c.name
                            ? 'ring-2 ring-[#632B3A] ring-offset-2 scale-110'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="font-medium text-[#252323]">Select Size:</span>
                  <span className="text-xs text-[#252323]/60">Standard Indian Sizing</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-sans transition-all ${
                        selectedSize === s
                          ? 'bg-[#632B3A] text-white font-medium shadow-xs'
                          : 'bg-white border border-[#E9DFD3] text-[#252323] hover:border-[#632B3A]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E9DFD3]">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#E9DFD3] bg-white h-12 px-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#252323] hover:text-[#632B3A] text-sm px-1"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-sans font-medium text-[#252323]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-[#252323] hover:text-[#632B3A] text-sm px-1"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={justAdded}
                  className={`flex-1 h-12 transition-all duration-300 text-xs uppercase tracking-[0.2em] font-sans font-medium flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#632B3A] hover:bg-[#52222F] text-white shadow-luxury'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedProduct)}
                  aria-label="Wishlist"
                  className={`w-12 h-12 flex items-center justify-center border transition-colors ${
                    isFavorited
                      ? 'bg-[#632B3A] text-white border-[#632B3A]'
                      : 'bg-white border-[#E9DFD3] text-[#252323] hover:text-[#632B3A]'
                  }`}
                >
                  <Heart size={18} fill={isFavorited ? '#ffffff' : 'none'} />
                </button>
              </div>

              {/* WhatsApp Enquiry Button */}
              <a
                href={createWhatsAppProductLink(
                  selectedProduct.name,
                  selectedProduct.sku,
                  selectedProduct.price,
                  selectedSize,
                  selectedColor
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-800/10 hover:bg-emerald-800 text-emerald-900 hover:text-white border border-emerald-800/30 text-xs uppercase tracking-[0.15em] font-sans font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={16} />
                <span>Ask Boutique Stylist on WhatsApp</span>
              </a>

              {/* Full details link */}
              <div className="text-center pt-1">
                <Link
                  to={`/product/${selectedProduct.id}`}
                  onClick={closeQuickView}
                  className="text-xs uppercase tracking-widest text-[#252323]/70 hover:text-[#632B3A] underline inline-flex items-center gap-1 font-sans"
                >
                  <span>View Complete Specifications & Gallery</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

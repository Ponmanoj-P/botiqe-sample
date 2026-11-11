import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { Link } from 'react-router-dom';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToBag = (product: any) => {
    const size = product.sizes[0] || 'M';
    const color = product.colors[0]?.name || 'Standard';
    addToCart(product, size, color, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeWishlist}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5F0] flex flex-col shadow-2xl border-l border-[#E9DFD3]">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E9DFD3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-[#632B3A]" />
              <h2 className="font-serif text-2xl font-light text-[#252323] tracking-wide">
                Your Saved Pieces
              </h2>
              <span className="text-xs font-sans text-[#252323]/50">
                ({wishlist.length})
              </span>
            </div>
            <button
              type="button"
              onClick={closeWishlist}
              className="p-2 text-[#252323]/70 hover:text-[#632B3A] transition-colors"
              aria-label="Close wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#E9DFD3]/50 flex items-center justify-center text-[#632B3A] mb-4">
                  <Heart size={28} />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#252323] mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#252323]/60 font-sans max-w-xs mb-6">
                  Save your favorite sarees, suits, and pret pieces to revisit anytime or share with family.
                </p>
                <button
                  type="button"
                  onClick={closeWishlist}
                  className="px-6 py-3 bg-[#632B3A] hover:bg-[#52222F] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 bg-white border border-[#E9DFD3] shadow-xs"
                >
                  <Link
                    to={`/product/${product.id}`}
                    onClick={closeWishlist}
                    className="w-20 h-26 shrink-0 block"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-top bg-[#E9DFD3]"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={closeWishlist}
                          className="font-serif text-base font-medium text-[#252323] hover:text-[#632B3A] line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-[#252323]/40 hover:text-[#632B3A] p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p className="text-xs text-[#252323]/60 font-sans mt-0.5">
                        {product.category}
                      </p>

                      <div className="font-serif text-base font-semibold text-[#632B3A] mt-2">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleMoveToBag(product)}
                      className="w-full mt-3 py-2 px-3 bg-[#632B3A] hover:bg-[#52222F] text-white text-[11px] uppercase tracking-wider font-sans font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

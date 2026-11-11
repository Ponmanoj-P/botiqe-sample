import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { storeConfig } from '../config/storeConfig';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = storeConfig.shipping.freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCoupon(couponInput);
      if (ok) setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5F0] flex flex-col shadow-2xl border-l border-[#E9DFD3]">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E9DFD3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#632B3A]" />
              <h2 className="font-serif text-2xl font-light text-[#252323] tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-sans text-[#252323]/50">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-2 text-[#252323]/70 hover:text-[#632B3A] transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#E9DFD3]/40 p-4 border-b border-[#E9DFD3]">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-[#252323]/80 font-sans mb-2">
                Add <span className="font-semibold text-[#632B3A]">{formatPrice(amountNeededForFreeShipping)}</span> more to unlock <span className="font-semibold">Complimentary Pan-India Shipping</span>!
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-sans font-medium flex items-center gap-1.5 mb-2">
                <Check size={14} />
                <span>Congratulations! You qualify for Complimentary Shipping!</span>
              </p>
            )}
            <div className="w-full bg-[#E9DFD3] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#632B3A] h-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#E9DFD3]/50 flex items-center justify-center text-[#632B3A] mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#252323] mb-2">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#252323]/60 font-sans max-w-xs mb-6">
                  Explore our curated collections of sarees, anarkalis, and modern pret to find your next signature look.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-6 py-3 bg-[#632B3A] hover:bg-[#52222F] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 bg-white border border-[#E9DFD3] shadow-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-26 object-cover object-top bg-[#E9DFD3] shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base font-medium text-[#252323] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-[#252323]/40 hover:text-[#632B3A] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#252323]/60 font-sans mt-1">
                        <span>Size: <strong className="text-[#252323]">{item.size}</strong></span>
                        <span>&bull;</span>
                        <span>Color: <strong className="text-[#252323]">{item.color}</strong></span>
                      </div>

                      <div className="font-serif text-base font-semibold text-[#632B3A] mt-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E9DFD3]/50">
                      <div className="flex items-center border border-[#E9DFD3] bg-[#F8F5F0]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                          }
                          className="p-1 hover:text-[#632B3A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-sans font-medium text-[#252323]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                          className="p-1 hover:text-[#632B3A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-[11px] text-[#252323]/50 font-sans">
                        {formatPrice(item.product.price)} each
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E9DFD3] space-y-4">
              {/* Promo code input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-sans">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Tag size={13} />
                      <span>Code <strong>{appliedCoupon}</strong> Applied (-{formatPrice(discount)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-emerald-800 hover:text-red-700 underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. WELCOME10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#F8F5F0] border border-[#E9DFD3] text-xs font-sans uppercase focus:outline-none focus:border-[#632B3A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#252323] hover:bg-[#632B3A] text-white text-xs uppercase tracking-wider font-sans font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1 font-sans">{couponError}</p>
                )}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-[#E9DFD3]/60">
                <div className="flex justify-between text-[#252323]/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#252323]/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#252323] pt-2 border-t border-[#E9DFD3]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg text-[#632B3A]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#632B3A] hover:bg-[#52222F] text-white text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all shadow-luxury flex items-center justify-center gap-2 group"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#252323]/60 uppercase tracking-widest font-sans pt-1">
                <ShieldCheck size={12} className="text-emerald-700" />
                <span>Pan-India Insured Dispatch &bull; Demo Storefront</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  MessageSquare,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronRight,
  Check,
  Star,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, Product } from '../data/products';
import { formatPrice, createWhatsAppProductLink, checkPincodeDelivery, PincodeInfo } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find product by id or slug
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Pincode checker state
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<PincodeInfo | null>(null);
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // Active accordion tab
  const [activeTab, setActiveTab] = useState<'description' | 'craft' | 'shipping' | 'care'>('description');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImageIdx(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);
      setPincodeChecked(false);
      setPincodeResult(null);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F8F5F0] p-6 text-center">
        <h2 className="font-serif text-3xl text-[#252323] mb-4">Design Not Found</h2>
        <p className="text-sm text-[#252323]/60 mb-6 font-sans">
          The requested garment is currently unavailable or may have been rotated to our archives.
        </p>
        <Link
          to="/collections"
          className="px-8 py-3 bg-[#632B3A] text-white text-xs uppercase tracking-widest font-sans"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincodeDelivery(pincodeInput);
    setPincodeResult(result);
    setPincodeChecked(true);
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.secondaryCategory === product.category)
  ).slice(0, 4);

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-sans text-[#252323]/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#632B3A]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-[#632B3A]">Collections</Link>
          <ChevronRight size={12} />
          <Link to={`/collections?category=${encodeURIComponent(product.category)}`} className="hover:text-[#632B3A]">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#252323] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical / Horizontal Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[700px] shrink-0 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-18 sm:w-20 aspect-[3/4] overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx
                        ? 'border-[#632B3A] ring-1 ring-[#632B3A]'
                        : 'border-[#E9DFD3] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-[#E9DFD3] shadow-soft-editorial">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />

              {/* Tag / Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-[#632B3A] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-semibold">
                    NEW ARRIVAL
                  </span>
                )}
                {product.tag && (
                  <span className="px-3 py-1 bg-[#252323] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Wishlist Button on image */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
                className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors ${
                  isFavorited
                    ? 'bg-[#632B3A] text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#252323] shadow-sm backdrop-blur-sm'
                }`}
              >
                <Heart size={18} fill={isFavorited ? '#ffffff' : 'none'} />
              </button>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category, SKU & Rating */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest font-sans text-[#252323]/60 mb-2">
                <span>{product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#252323] tracking-tight mb-2">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#252323]/70 font-sans font-light mb-4">
                {product.subtitle}
              </p>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E9DFD3]">
                <div className="flex items-center text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#C5A059" stroke="none" />
                  ))}
                </div>
                <span className="text-xs font-sans font-medium text-[#252323]">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs font-sans text-[#252323]/50">
                  ({product.reviewCount} Boutique Patron Reviews)
                </span>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-semibold text-[#632B3A]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-[#252323]/40 line-through font-sans">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2 py-0.5 bg-[#C5A059]/15 text-[#9A7B39] text-xs font-semibold font-sans">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] uppercase tracking-wider text-[#252323]/60 font-sans mt-1">
                  Inclusive of all taxes &bull; Complimentary insured shipping
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-sans mb-2.5">
                    <span className="font-semibold text-[#252323] uppercase tracking-wider">
                      Color Variant:
                    </span>
                    <span className="text-[#632B3A] font-medium">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-sans transition-all ${
                          selectedColor === c.name
                            ? 'border-[#632B3A] bg-white ring-1 ring-[#632B3A]'
                            : 'border-[#E9DFD3] bg-white/60 hover:border-[#632B3A]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-sans mb-2.5">
                  <span className="font-semibold text-[#252323] uppercase tracking-wider">
                    Select Size:
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-[#632B3A] hover:underline font-medium"
                  >
                    <Ruler size={13} />
                    <span>View Sizing Chart</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-12 px-4 py-2.5 text-xs font-sans transition-all ${
                        selectedSize === s
                          ? 'bg-[#632B3A] text-white font-medium shadow-sm'
                          : 'bg-white border border-[#E9DFD3] text-[#252323] hover:border-[#632B3A]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider font-semibold font-sans text-[#252323]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#E9DFD3] bg-white h-11 px-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#252323] hover:text-[#632B3A] px-2 text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-sans font-medium text-[#252323]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-[#252323] hover:text-[#632B3A] px-2 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="space-y-3 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={justAdded}
                    className={`flex-1 py-4 text-xs uppercase tracking-[0.25em] font-sans font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                      justAdded
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#632B3A] hover:bg-[#52222F] text-white shadow-luxury'
                    }`}
                  >
                    {justAdded ? (
                      <>
                        <Check size={16} />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 py-4 bg-[#252323] hover:bg-black text-white text-xs uppercase tracking-[0.25em] font-sans font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Direct WhatsApp Enquiry */}
                <a
                  href={createWhatsAppProductLink(
                    product.name,
                    product.sku,
                    product.price,
                    selectedSize,
                    selectedColor
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-800/10 hover:bg-emerald-800 text-emerald-900 hover:text-white border border-emerald-800/30 text-xs uppercase tracking-[0.15em] font-sans font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="bg-white p-4 border border-[#E9DFD3] mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-sans text-[#252323] mb-2">
                  <MapPin size={14} className="text-[#632B3A]" />
                  <span>Check Delivery Date & Pincode</span>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Indian PIN (e.g. 110001)"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 bg-[#F8F5F0] border border-[#E9DFD3] text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#632B3A] text-white text-xs uppercase tracking-wider font-sans font-medium"
                  >
                    Check
                  </button>
                </form>

                {pincodeChecked && pincodeResult && (
                  <div className="mt-3 pt-3 border-t border-[#E9DFD3] text-xs font-sans">
                    {pincodeResult.valid ? (
                      <div className="space-y-1 text-emerald-800">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Check size={13} />
                          <span>Delivery Available to {pincodeResult.city}, {pincodeResult.state}</span>
                        </div>
                        <p className="text-[#252323]/70 pl-4">
                          Estimated Dispatch & Delivery: <strong>{pincodeResult.estimatedDays}</strong>
                        </p>
                        <p className="text-[#252323]/70 pl-4">
                          Cash on Delivery (COD) eligible
                        </p>
                      </div>
                    ) : (
                      <p className="text-red-600">
                        Please enter a valid 6-digit Indian PIN code.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border-t border-[#E9DFD3] pt-6">
              <div className="flex border-b border-[#E9DFD3] gap-6 text-xs uppercase tracking-wider font-sans font-medium mb-4 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 transition-colors relative whitespace-nowrap ${
                    activeTab === 'description' ? 'text-[#632B3A] font-semibold' : 'text-[#252323]/60 hover:text-[#252323]'
                  }`}
                >
                  Description
                  {activeTab === 'description' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#632B3A]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('craft')}
                  className={`pb-2 transition-colors relative whitespace-nowrap ${
                    activeTab === 'craft' ? 'text-[#632B3A] font-semibold' : 'text-[#252323]/60 hover:text-[#252323]'
                  }`}
                >
                  Craft & Details
                  {activeTab === 'craft' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#632B3A]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition-colors relative whitespace-nowrap ${
                    activeTab === 'shipping' ? 'text-[#632B3A] font-semibold' : 'text-[#252323]/60 hover:text-[#252323]'
                  }`}
                >
                  Shipping & Returns
                  {activeTab === 'shipping' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#632B3A]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 transition-colors relative whitespace-nowrap ${
                    activeTab === 'care' ? 'text-[#632B3A] font-semibold' : 'text-[#252323]/60 hover:text-[#252323]'
                  }`}
                >
                  Garment Care
                  {activeTab === 'care' && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#632B3A]" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs sm:text-sm font-sans text-[#252323]/75 leading-relaxed">
                {activeTab === 'description' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <div className="bg-[#E9DFD3]/40 p-3 border-l-2 border-[#632B3A]">
                      <span className="font-semibold text-[#632B3A] block text-[11px] uppercase tracking-wider mb-1">
                        Artisan Atelier Note
                      </span>
                      <p className="italic text-[#252323]/80">{product.storyNotes}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'craft' && (
                  <div className="space-y-2 bg-white p-4 border border-[#E9DFD3]">
                    <div><strong>Fabric:</strong> {product.fabric}</div>
                    <div><strong>Craft Technique:</strong> {product.craft}</div>
                    <div><strong>Fit & Silhouette:</strong> {product.fit}</div>
                    <div><strong>Package Contains:</strong> 1 Designer Ensemble with authenticity certificate.</div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>Complimentary insured shipping across 26,000+ Indian pincodes.</p>
                    <p>Dispatch within 24-48 business hours. Live tracking provided via WhatsApp & SMS.</p>
                    <p>Hassle-free 7-day complimentary size exchange across India.</p>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <p><strong>Recommended Care:</strong> {product.careInstructions}</p>
                    <p>Avoid direct iron contact on zari embroidery or mirror work; always use an ironing cloth or low steam.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#E9DFD3]">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-2 block">
                Complete The Wardrobe
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#252323]">
                You May Also Admire
              </h2>
              <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Sticky Add to Bag Bottom Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 px-4 border-t border-[#E9DFD3] flex items-center justify-between gap-3 shadow-elevated">
        <div>
          <span className="font-serif text-base font-semibold text-[#632B3A] block">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-[#252323]/60 font-sans">
            Size: {selectedSize}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-5 py-2.5 bg-[#632B3A] text-white text-xs uppercase tracking-wider font-sans font-medium flex items-center gap-1.5"
          >
            <ShoppingBag size={14} />
            <span>Add to Bag</span>
          </button>
          <a
            href={createWhatsAppProductLink(product.name, product.sku, product.price, selectedSize, selectedColor)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="p-2.5 bg-emerald-800 text-white"
          >
            <MessageSquare size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { storeConfig } from '../config/storeConfig';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'New Arrivals', path: '/collections?tag=new' },
    { name: 'Brand Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Small Announcement Bar */}
      <div className="bg-[#632B3A] text-[#F8F5F0] py-2 px-4 text-center text-xs tracking-widest font-light transition-all duration-300 flex items-center justify-center gap-2">
        <span>{storeConfig.announcementText}</span>
        <span className="hidden md:inline-block opacity-60">|</span>
        <span className="hidden md:inline-block opacity-80 text-[11px]">Bespoke Sizing & Worldwide Enquiries</span>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5F0]/95 backdrop-blur-md shadow-sm py-3.5 border-b border-[#E9DFD3]'
            : 'bg-[#F8F5F0] py-5 border-b border-[#E9DFD3]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger & Search */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#252323] hover:text-[#632B3A] focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-[#252323] hover:text-[#632B3A] focus:outline-none transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Left / Brand Wordmark */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link to="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-[#252323] group-hover:text-[#632B3A] transition-colors uppercase">
                  {storeConfig.brandName}
                </span>
                <span className="block text-[9px] tracking-[0.35em] text-[#632B3A] uppercase font-sans font-medium -mt-1">
                  Atelier & Pret
                </span>
              </Link>
            </div>

            {/* Center Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative py-1 ${
                      isActive
                        ? 'text-[#632B3A] font-semibold'
                        : 'text-[#252323]/80 hover:text-[#632B3A]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#632B3A]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Desktop Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-widest text-[#252323]/80 hover:text-[#632B3A] py-1 transition-colors"
                aria-label="Search products"
              >
                <Search size={18} />
                <span className="text-[11px] font-medium">Search</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={openWishlist}
                className="relative p-1.5 text-[#252323] hover:text-[#632B3A] transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#632B3A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 p-1.5 text-[#252323] hover:text-[#632B3A] transition-colors group"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#632B3A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                    {cartCount}
                  </span>
                )}
                <span className="hidden sm:inline-block text-xs uppercase tracking-widest font-medium text-[#252323] group-hover:text-[#632B3A]">
                  Bag {cartCount > 0 && `(${cartCount})`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E9DFD3] bg-[#F8F5F0] px-6 py-6 animate-fadeIn transition-all shadow-lg">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm uppercase tracking-[0.2em] font-medium text-[#252323] hover:text-[#632B3A] py-2 border-b border-[#E9DFD3]/40"
                >
                  <span>{link.name}</span>
                  <ArrowRight size={16} className="text-[#632B3A]" />
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#E9DFD3]/60 text-xs uppercase tracking-widest text-[#252323] rounded-none hover:bg-[#E9DFD3] transition-colors"
                >
                  <Search size={16} />
                  <span>Search Collections</span>
                </button>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-[#252323]/60 uppercase tracking-widest font-sans">
                    WhatsApp Concierge
                  </p>
                  <a
                    href={`https://wa.me/${storeConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#632B3A] underline mt-0.5 inline-block"
                  >
                    {storeConfig.whatsappDisplayNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

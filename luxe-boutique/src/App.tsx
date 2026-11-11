import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { QuickViewProvider } from './context/QuickViewContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyType | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F5F0] text-[#252323] font-sans selection:bg-[#632B3A] selection:text-white">
      <ScrollToTop />
      {/* Sticky Top Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onOpenPolicyModal={(policy) => setActivePolicyModal(policy)} />

      {/* Slide-over Drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <QuickViewModal />
      <PolicyModal policyType={activePolicyModal} onClose={() => setActivePolicyModal(null)} />
      <WhatsAppFloatingButton />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <QuickViewProvider>
            <AppContent />
          </QuickViewProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
};

export default App;

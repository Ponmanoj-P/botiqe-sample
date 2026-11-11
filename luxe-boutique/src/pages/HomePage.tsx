import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategorySection } from '../components/CategorySection';
import { NewArrivalsSection } from '../components/NewArrivalsSection';
import { EditorialStorySection } from '../components/EditorialStorySection';
import { WhyShopWithUs } from '../components/WhyShopWithUs';
import { BrandStorySection } from '../components/BrandStorySection';
import { CustomerReviewsSection } from '../components/CustomerReviewsSection';
import { InstagramSection } from '../components/InstagramSection';
import { ContactWhatsAppSection } from '../components/ContactWhatsAppSection';

export const HomePage: React.FC = () => {
  const scrollToNewArrivals = () => {
    const el = document.getElementById('new-arrivals');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0">
      <HeroSection onScrollToNewArrivals={scrollToNewArrivals} />
      <CategorySection />
      <NewArrivalsSection id="new-arrivals" />
      <EditorialStorySection />
      <WhyShopWithUs />
      <BrandStorySection />
      <CustomerReviewsSection />
      <InstagramSection />
      <ContactWhatsAppSection />
    </div>
  );
};

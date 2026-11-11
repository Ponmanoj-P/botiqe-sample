export interface StoreConfig {
  brandName: string;
  brandTagline: string;
  announcementText: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string;
  whatsappDisplayNumber: string;
  contactEmail: string;
  phone: string;
  storeAddress: {
    studioName: string;
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  openingHours: string;
  currency: {
    symbol: string;
    code: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    estimatedDeliveryDays: string;
  };
  policies: {
    returnPeriodDays: number;
    exchangePolicy: string;
    shippingPolicy: string;
  };
}

export const storeConfig: StoreConfig = {
  brandName: "VANYA",
  brandTagline: "Contemporary Indian Couture & Pret",
  announcementText: "Discover timeless styles, delivered across India. Free shipping on orders above ₹4,999.",
  instagramHandle: "@vanyaboutique.in",
  instagramUrl: "https://instagram.com",
  whatsappNumber: "919876543210", // Configurable boutique WhatsApp
  whatsappDisplayNumber: "+91 98765 43210",
  contactEmail: "care@vanyaboutique.in",
  phone: "+91 11 4987 6543",
  storeAddress: {
    studioName: "Vanya Flagship Atelier",
    street: "Plot No. 42, Style Avenue, Near Defense Colony Flyover",
    locality: "Defence Colony",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110024",
  },
  openingHours: "Mon - Sat: 11:00 AM - 8:00 PM IST (Sundays by appointment)",
  currency: {
    symbol: "₹",
    code: "INR",
  },
  shipping: {
    freeShippingThreshold: 4999,
    standardShippingFee: 250,
    estimatedDeliveryDays: "3 to 5 business days",
  },
  policies: {
    returnPeriodDays: 7,
    exchangePolicy: "Hassle-free 7-day size exchange across India. Custom-tailored pieces are eligible for free alterations.",
    shippingPolicy: "Complimentary insured delivery across 26,000+ Indian pincodes. International shipping available upon WhatsApp request.",
  },
};

import { storeConfig } from '../config/storeConfig';

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const createWhatsAppProductLink = (
  productName: string,
  sku: string,
  price: number,
  size?: string,
  color?: string
): string => {
  const number = storeConfig.whatsappNumber;
  let message = `Hello ${storeConfig.brandName}, I am interested in: *${productName}* (SKU: ${sku}, Price: ${formatPrice(price)}).`;
  if (size) message += `\nSelected Size: ${size}`;
  if (color) message += `\nSelected Color: ${color}`;
  message += `\nCould you please share details on styling, fit, and delivery availability?`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const createWhatsAppGeneralLink = (): string => {
  const number = storeConfig.whatsappNumber;
  const message = `Hello ${storeConfig.brandName}! I would like to inquire about your collections and custom styling services.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export interface PincodeInfo {
  valid: boolean;
  city?: string;
  state?: string;
  estimatedDays?: string;
  codAvailable?: boolean;
}

export const checkPincodeDelivery = (pincode: string): PincodeInfo => {
  const clean = pincode.trim();
  if (!/^\d{6}$/.test(clean)) {
    return { valid: false };
  }

  const prefix = clean.substring(0, 2);
  let city = 'Metro Hub';
  let state = 'India';
  let estimatedDays = '3 to 5 business days';

  // Realistic sample mapping of Indian Postal Circles
  if (prefix >= '11' && prefix <= '11') {
    city = 'New Delhi';
    state = 'Delhi NCR';
    estimatedDays = 'Next Day Express / 2 Days';
  } else if (prefix >= '12' && prefix <= '13') {
    city = 'Gurugram / Faridabad';
    state = 'Haryana';
    estimatedDays = '1 to 2 business days';
  } else if (prefix >= '20' && prefix <= '28') {
    city = 'Noida / Lucknow';
    state = 'Uttar Pradesh';
    estimatedDays = '2 to 3 business days';
  } else if (prefix >= '30' && prefix <= '34') {
    city = 'Jaipur';
    state = 'Rajasthan';
    estimatedDays = '2 to 4 business days';
  } else if (prefix >= '36' && prefix <= '39') {
    city = 'Ahmedabad / Surat';
    state = 'Gujarat';
    estimatedDays = '3 to 4 business days';
  } else if (prefix >= '40' && prefix <= '44') {
    city = 'Mumbai / Pune';
    state = 'Maharashtra';
    estimatedDays = '2 to 3 business days';
  } else if (prefix >= '50' && prefix <= '53') {
    city = 'Hyderabad';
    state = 'Telangana';
    estimatedDays = '3 to 4 business days';
  } else if (prefix >= '56' && prefix <= '59') {
    city = 'Bengaluru';
    state = 'Karnataka';
    estimatedDays = '2 to 3 business days';
  } else if (prefix >= '60' && prefix <= '64') {
    city = 'Chennai';
    state = 'Tamil Nadu';
    estimatedDays = '3 to 4 business days';
  } else if (prefix >= '67' && prefix <= '69') {
    city = 'Kochi / Trivandrum';
    state = 'Kerala';
    estimatedDays = '3 to 5 business days';
  } else if (prefix >= '70' && prefix <= '74') {
    city = 'Kolkata';
    state = 'West Bengal';
    estimatedDays = '3 to 5 business days';
  }

  return {
    valid: true,
    city,
    state,
    estimatedDays,
    codAvailable: true,
  };
};

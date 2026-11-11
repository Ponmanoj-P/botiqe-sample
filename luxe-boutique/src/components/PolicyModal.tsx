import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';

export type PolicyType = 'shipping' | 'return' | 'privacy' | 'terms';

interface PolicyModalProps {
  policyType: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  const contentMap = {
    shipping: {
      title: 'Shipping & Pan-India Delivery',
      icon: Truck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm font-sans text-[#252323]/80 leading-relaxed">
          <p>
            At <strong>{storeConfig.brandName}</strong>, we take pride in delivering our handcrafted creations safely across all 28 states and union territories in India.
          </p>
          <div className="bg-white p-4 border border-[#E9DFD3] space-y-2">
            <h4 className="font-semibold text-[#632B3A]">Dispatch & Delivery Timelines</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Pret & Ready-to-Wear:</strong> Dispatched within 24 to 48 hours. Estimated transit time: {storeConfig.shipping.estimatedDeliveryDays}.</li>
              <li><strong>Couture & Handloomed Silks:</strong> Dispatched within 3 to 5 business days after artisan finishing and quality inspection.</li>
              <li><strong>Complimentary Shipping:</strong> Automatically applied on all pan-India orders above ₹{storeConfig.shipping.freeShippingThreshold.toLocaleString()}.</li>
            </ul>
          </div>
          <p>
            All consignments are fully insured against transit damage and dispatched via premier express couriers (BlueDart, Delhivery, DTDC). Live SMS & WhatsApp tracking links are shared upon dispatch.
          </p>
        </div>
      ),
    },
    return: {
      title: '7-Day Return & Exchange Policy',
      icon: RefreshCw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm font-sans text-[#252323]/80 leading-relaxed">
          <p>
            We want you to adore your purchase. If a garment does not fit perfectly, we offer a seamless <strong>{storeConfig.policies.returnPeriodDays}-day complimentary size exchange</strong>.
          </p>
          <div className="bg-white p-4 border border-[#E9DFD3] space-y-2">
            <h4 className="font-semibold text-[#632B3A]">Exchange Guidelines</h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Items must be unworn, unwashed, and returned in their original luxury packaging with all artisan tags intact.</li>
              <li>Doorstep reverse pickup is arranged by our team across supported Indian pincodes.</li>
              <li>Store credits never expire and can be utilized across any future collection release.</li>
            </ul>
          </div>
          <p>
            To initiate an exchange, simply drop a message on our WhatsApp concierge with your Order ID.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy & Data Protection',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm font-sans text-[#252323]/80 leading-relaxed">
          <p>
            {storeConfig.brandName} respects your digital privacy. We only collect essential client details (name, delivery address, phone, email) strictly required to fulfill your orders and offer personalized styling assistance.
          </p>
          <p>
            We never share or sell personal client information to third-party marketing brokers. All checkout transmissions adhere to 256-bit SSL encryption.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm font-sans text-[#252323]/80 leading-relaxed">
          <p>
            By accessing and shopping at {storeConfig.brandName}, you agree to our standard terms and conditions. Because each textile includes handwoven silk or artisan block print, subtle variations in weft slub and dye tones are hallmarks of genuine handcraft rather than defects.
          </p>
          <p>
            Prices are listed in Indian Rupees (INR) and are inclusive of all domestic GST taxes.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[policyType];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#F8F5F0] border border-[#E9DFD3] max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center justify-between border-b border-[#E9DFD3] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E9DFD3] flex items-center justify-center text-[#632B3A]">
              <Icon size={16} />
            </div>
            <h3 className="font-serif text-2xl font-light text-[#252323]">
              {current.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#252323]/60 hover:text-[#632B3A] p-1"
          >
            <X size={20} />
          </button>
        </div>

        {current.body}

        <div className="mt-8 pt-4 border-t border-[#E9DFD3] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#632B3A] text-white text-xs uppercase tracking-widest font-sans font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

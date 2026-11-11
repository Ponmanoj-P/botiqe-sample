import React from 'react';
import { MessageSquare, Phone, Mail, Instagram, MapPin, Clock, ArrowRight } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { createWhatsAppGeneralLink } from '../utils/formatters';

export const ContactWhatsAppSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#E9DFD3]/40 border-t border-[#E9DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E9DFD3] p-8 sm:p-12 lg:p-16 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
                Personal Shopping & Atelier Concierge
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#252323] leading-tight mb-4 tracking-tight">
                Found Something You Love?
              </h2>
              <div className="w-16 h-[1.5px] bg-[#632B3A] mb-6" />
              <p className="font-serif text-xl sm:text-2xl text-[#252323]/80 italic mb-6">
                "Need help with sizing, styling or placing an order? We'd love to help."
              </p>
              <p className="text-sm text-[#252323]/70 font-sans font-light leading-relaxed mb-8 max-w-xl">
                Our bespoke concierge team is available to assist you with custom measurements, bridal trousseau consultations, fabric swatches, or expedited delivery across India and worldwide.
              </p>

              {/* Direct WhatsApp CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={createWhatsAppGeneralLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-md group"
                >
                  <MessageSquare size={18} />
                  <span>WHATSAPP US NOW</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`tel:${storeConfig.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-[#F8F5F0] text-[#252323] border border-[#252323]/30 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  <Phone size={16} />
                  <span>Call {storeConfig.whatsappDisplayNumber}</span>
                </a>
              </div>
            </div>

            {/* Right Contact Quick Cards */}
            <div className="lg:col-span-5 bg-[#F8F5F0] p-6 sm:p-8 border border-[#E9DFD3] space-y-6">
              <h3 className="font-serif text-xl font-medium text-[#252323] border-b border-[#E9DFD3] pb-3">
                Atelier Information
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#252323] block text-sm font-serif">
                      {storeConfig.storeAddress.studioName}
                    </span>
                    <p className="text-[#252323]/70 leading-relaxed mt-0.5">
                      {storeConfig.storeAddress.street}, {storeConfig.storeAddress.locality}, {storeConfig.storeAddress.city}, {storeConfig.storeAddress.state} - {storeConfig.storeAddress.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#252323] block">Studio Timings</span>
                    <p className="text-[#252323]/70 mt-0.5">{storeConfig.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#252323] block">Client Care Email</span>
                    <a href={`mailto:${storeConfig.contactEmail}`} className="text-[#632B3A] underline mt-0.5 inline-block">
                      {storeConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#252323] block">Instagram DM</span>
                    <a href={storeConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#632B3A] underline mt-0.5 inline-block">
                      {storeConfig.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

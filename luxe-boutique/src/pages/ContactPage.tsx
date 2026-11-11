import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Instagram, MapPin, Clock, CheckCircle2, Send } from 'lucide-react';
import { storeConfig } from '../config/storeConfig';
import { createWhatsAppGeneralLink } from '../utils/formatters';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Styling Consultation',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Styling Consultation',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#632B3A] font-semibold font-sans mb-3 block">
            Client Concierge & Atelier Visits
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#252323] tracking-tight mb-4">
            Connect With Our Studio
          </h1>
          <div className="w-16 h-[1.5px] bg-[#632B3A] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#252323]/70 font-sans max-w-md mx-auto">
            Whether inquiring about custom sizing, bridal trousseau styling, or order tracking, our stylists are delighted to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Channels & Atelier Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* WhatsApp Quick Connect Card */}
            <div className="bg-emerald-900 text-white p-8 shadow-luxury">
              <div className="w-12 h-12 rounded-full bg-emerald-800 flex items-center justify-center text-white mb-6">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-serif text-2xl font-light mb-2">Instant WhatsApp Concierge</h3>
              <p className="text-xs text-white/80 font-sans leading-relaxed mb-6">
                Connect directly with our boutique styling team for instant size advice, fabric videos, and live order assistance.
              </p>
              <a
                href={createWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-colors shadow-sm"
              >
                <MessageSquare size={16} />
                <span>Chat On WhatsApp Now</span>
              </a>
            </div>

            {/* Atelier Info Card */}
            <div className="bg-white p-8 border border-[#E9DFD3] space-y-6">
              <h3 className="font-serif text-2xl font-light text-[#252323] border-b border-[#E9DFD3] pb-4">
                Flagship Studio Details
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252323] font-serif text-sm block">
                      {storeConfig.storeAddress.studioName}
                    </strong>
                    <p className="text-[#252323]/70 leading-relaxed mt-0.5">
                      {storeConfig.storeAddress.street}, {storeConfig.storeAddress.locality}, {storeConfig.storeAddress.city}, {storeConfig.storeAddress.state} - {storeConfig.storeAddress.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252323] block">Studio Timings</strong>
                    <p className="text-[#252323]/70 mt-0.5">{storeConfig.openingHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252323] block">Direct Telephone</strong>
                    <a href={`tel:${storeConfig.phone}`} className="text-[#632B3A] underline mt-0.5 inline-block">
                      {storeConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252323] block">Client Email</strong>
                    <a href={`mailto:${storeConfig.contactEmail}`} className="text-[#632B3A] underline mt-0.5 inline-block">
                      {storeConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#252323] block">Instagram Official</strong>
                    <a href={storeConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#632B3A] underline mt-0.5 inline-block">
                      {storeConfig.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Appointment Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 border border-[#E9DFD3] shadow-soft-editorial">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#252323] mb-2">
              Send an Atelier Inquiry
            </h2>
            <p className="text-xs text-[#252323]/60 font-sans mb-8">
              We respond to all styling consultations and order queries within 2-4 business hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 text-center text-emerald-900 animate-fadeIn">
                <CheckCircle2 size={36} className="mx-auto mb-3 text-emerald-700" />
                <h3 className="font-serif text-2xl font-medium mb-1">Message Received</h3>
                <p className="text-xs font-sans text-emerald-800">
                  Thank you for reaching out. Our boutique styling team will contact you shortly via email or WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sen"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                  >
                    <option value="Styling Consultation">Personal Styling & Sizing Advice</option>
                    <option value="Bridal Trousseau">Bridal & Festive Trousseau Curation</option>
                    <option value="Custom Alteration">Bespoke Stitching & Blouse Customization</option>
                    <option value="Order Tracking">Existing Order Status & Dispatch</option>
                    <option value="International Shipping">International Delivery Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                    Your Message / Styling Request *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the occasion, preferred silhouette, or product inquiry..."
                    className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#632B3A] hover:bg-[#52222F] text-white text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all shadow-luxury flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Send Concierge Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

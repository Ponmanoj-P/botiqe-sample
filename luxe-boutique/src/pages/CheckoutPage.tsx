import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';
import { storeConfig } from '../config/storeConfig';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi NCR', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

interface OrderConfirmation {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: any[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
}

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discount, shipping, total, appliedCoupon, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Delhi NCR',
    pincode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order generation
    setTimeout(() => {
      const generatedOrderId = `VNY-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderConfirmation = {
        orderId: generatedOrderId,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: [...cart],
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod: paymentMethod === 'upi' ? 'UPI / QR Payment' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash On Delivery',
        orderDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      clearCart();
    }, 1000);
  };

  // WhatsApp confirmation message link
  const getWhatsAppOrderConfirmationLink = (order: OrderConfirmation) => {
    const text = `Hello ${storeConfig.brandName}, I have placed a demonstration order:\n*Order ID:* ${order.orderId}\n*Customer:* ${order.customerName}\n*Phone:* ${order.phone}\n*City:* ${order.city}, ${order.state}\n*Total:* ${formatPrice(order.total)}\n\nPlease advise on tracking and dispatch!`;
    return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  // If order was placed, display rich confirmation screen
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#E9DFD3] p-8 sm:p-12 shadow-luxury text-center">
            {/* Header Badge */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>

            <div className="inline-block px-3 py-1 bg-[#632B3A]/10 text-[#632B3A] text-xs uppercase tracking-widest font-sans font-semibold mb-3">
              Demonstration Order Placed
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#252323] font-light mb-2">
              Thank You, {completedOrder.customerName}
            </h1>
            <p className="text-xs sm:text-sm text-[#252323]/70 font-sans mb-8">
              Your demonstration order has been successfully recorded. An atelier concierge is preparing the packaging preview.
            </p>

            {/* Order Details Card */}
            <div className="bg-[#F8F5F0] border border-[#E9DFD3] p-6 text-left space-y-4 mb-8 text-xs font-sans">
              <div className="flex flex-wrap justify-between items-center pb-3 border-b border-[#E9DFD3] gap-2">
                <div>
                  <span className="text-[#252323]/60 block text-[10px] uppercase tracking-wider">Order Reference</span>
                  <span className="font-serif text-lg font-bold text-[#632B3A]">{completedOrder.orderId}</span>
                </div>
                <div>
                  <span className="text-[#252323]/60 block text-[10px] uppercase tracking-wider">Order Date</span>
                  <span className="font-medium text-[#252323]">{completedOrder.orderDate}</span>
                </div>
                <div>
                  <span className="text-[#252323]/60 block text-[10px] uppercase tracking-wider">Payment Method</span>
                  <span className="font-medium text-[#252323]">{completedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items Summary */}
              <div>
                <span className="text-[#252323]/60 block text-[10px] uppercase tracking-wider mb-2">Ordered Silhouettes</span>
                <div className="space-y-3">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt="" className="w-10 h-13 object-cover bg-white" />
                        <div>
                          <p className="font-serif text-sm font-medium text-[#252323]">{item.product.name}</p>
                          <p className="text-[11px] text-[#252323]/60">Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-serif text-sm font-semibold text-[#252323]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="pt-3 border-t border-[#E9DFD3] space-y-1">
                <div className="flex justify-between text-[#252323]/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(completedOrder.subtotal)}</span>
                </div>
                {completedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount</span>
                    <span>-{formatPrice(completedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#252323]/70">
                  <span>Insured Shipping</span>
                  <span>{completedOrder.shipping === 0 ? 'Complimentary' : formatPrice(completedOrder.shipping)}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-[#632B3A] pt-2 border-t border-[#E9DFD3]">
                  <span>Total Amount</span>
                  <span>{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-3 border-t border-[#E9DFD3]">
                <span className="text-[#252323]/60 block text-[10px] uppercase tracking-wider">Shipping Address</span>
                <p className="text-[#252323] mt-0.5">
                  {completedOrder.address}, {completedOrder.city}, {completedOrder.state} - {completedOrder.pincode}
                </p>
                <p className="text-[#252323]/70 text-[11px] mt-0.5">
                  Phone: {completedOrder.phone} &bull; Email: {completedOrder.email}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppOrderConfirmationLink(completedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-[0.2em] font-sans font-medium flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Confirm via WhatsApp</span>
              </a>

              <Link
                to="/collections"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#632B3A] hover:bg-[#52222F] text-white text-xs uppercase tracking-[0.2em] font-sans font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If bag is empty and no completed order
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F8F5F0] p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#E9DFD3] flex items-center justify-center text-[#632B3A] mb-4">
          <ShoppingBag size={28} />
        </div>
        <h2 className="font-serif text-3xl font-light text-[#252323] mb-2">Your Bag is Empty</h2>
        <p className="text-xs sm:text-sm text-[#252323]/60 max-w-sm mb-6 font-sans">
          You have not added any garments to your shopping bag yet. Explore our handcrafted sarees and ensembles.
        </p>
        <Link
          to="/collections"
          className="px-8 py-3 bg-[#632B3A] text-white text-xs uppercase tracking-[0.2em] font-sans font-medium"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5F0] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Back */}
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#252323]/70 hover:text-[#632B3A] font-sans mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Collections</span>
        </Link>

        {/* Demo Notice Banner */}
        <div className="bg-[#E9DFD3] border-l-4 border-[#632B3A] p-4 mb-8 flex items-start gap-3">
          <Sparkles size={18} className="text-[#632B3A] shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-[#252323]">
            <strong>Demonstration Checkout Mode:</strong> This storefront concept demonstrates an authentic e-commerce workflow. No real payment charge or financial debit occurs. All boutique shipping policies and contact methods are fully configurable.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Customer Information & Delivery Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmitOrder} className="space-y-8">
              {/* Step 1: Customer Contact Info */}
              <div className="bg-white p-6 sm:p-8 border border-[#E9DFD3] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E9DFD3] pb-3 mb-6">
                  <h2 className="font-serif text-xl sm:text-2xl font-light text-[#252323]">
                    1. Contact Information
                  </h2>
                  <span className="text-[11px] uppercase tracking-wider text-[#632B3A] font-sans">
                    Step 1 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Phone Number (for WhatsApp Updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="radhika@example.com"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-white p-6 sm:p-8 border border-[#E9DFD3] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E9DFD3] pb-3 mb-6">
                  <h2 className="font-serif text-xl sm:text-2xl font-light text-[#252323]">
                    2. Pan-India Delivery Address
                  </h2>
                  <span className="text-[11px] uppercase tracking-wider text-[#632B3A] font-sans">
                    Step 2 of 3
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      House / Flat No. & Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No. 12, Gulmohar Enclave"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Apartment, Floor, Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Opposite Lotus Park"
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New Delhi"
                        className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="110024"
                        className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold font-sans text-[#252323] mb-1.5">
                      Special Alteration or Blouse Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="E.g., Please provide unstitched blouse piece with extra sleeve borders."
                      className="w-full bg-[#F8F5F0] border border-[#E9DFD3] px-3.5 py-2 text-xs font-sans focus:outline-none focus:border-[#632B3A]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Preference (Demo Mode) */}
              <div className="bg-white p-6 sm:p-8 border border-[#E9DFD3] shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E9DFD3] pb-3 mb-6">
                  <h2 className="font-serif text-xl sm:text-2xl font-light text-[#252323]">
                    3. Payment Simulation (Demo Mode)
                  </h2>
                  <span className="text-[11px] uppercase tracking-wider text-[#632B3A] font-sans">
                    Step 3 of 3
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#632B3A] bg-[#632B3A]/5 ring-1 ring-[#632B3A]'
                        : 'border-[#E9DFD3] hover:border-[#632B3A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode size={20} className="text-[#632B3A]" />
                      <div>
                        <span className="font-medium text-xs text-[#252323] block">
                          Instant UPI / QR Code (GPay, PhonePe, Paytm)
                        </span>
                        <span className="text-[11px] text-[#252323]/60 font-sans">
                          Simulated fast one-click instant payment
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="accent-[#632B3A]"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#632B3A] bg-[#632B3A]/5 ring-1 ring-[#632B3A]'
                        : 'border-[#E9DFD3] hover:border-[#632B3A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={20} className="text-[#632B3A]" />
                      <div>
                        <span className="font-medium text-xs text-[#252323] block">
                          Credit / Debit Card (Visa, Mastercard, RuPay)
                        </span>
                        <span className="text-[11px] text-[#252323]/60 font-sans">
                          Secure gateway simulation
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#632B3A]"
                    />
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#632B3A] bg-[#632B3A]/5 ring-1 ring-[#632B3A]'
                        : 'border-[#E9DFD3] hover:border-[#632B3A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote size={20} className="text-[#632B3A]" />
                      <div>
                        <span className="font-medium text-xs text-[#252323] block">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[11px] text-[#252323]/60 font-sans">
                          Pay upon doorstep parcel inspection
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#632B3A]"
                    />
                  </label>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#632B3A] hover:bg-[#52222F] text-white text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all shadow-luxury flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Generating Demo Order...</span>
                  ) : (
                    <span>CONFIRM & PLACE DEMO ORDER ({formatPrice(total)})</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Order Summary Breakdown (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 border border-[#E9DFD3] shadow-soft-editorial sticky top-24">
              <h3 className="font-serif text-2xl font-light text-[#252323] border-b border-[#E9DFD3] pb-4 mb-6">
                Bag Summary ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-3 pb-3 border-b border-[#E9DFD3]/60"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover bg-[#E9DFD3] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between text-xs font-sans">
                      <div>
                        <h4 className="font-serif text-sm font-medium text-[#252323] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[#252323]/60 text-[11px]">
                          Size: <strong>{item.size}</strong> &bull; Color: <strong>{item.color}</strong>
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#252323]/60">Qty: {item.quantity}</span>
                        <span className="font-serif text-sm font-semibold text-[#632B3A]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs font-sans border-b border-[#E9DFD3] pb-4 mb-4">
                <div className="flex justify-between text-[#252323]/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#252323]/70">
                  <span>Pan-India Insured Delivery</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#252323] pt-3 border-t border-[#E9DFD3]">
                  <span>Total Payable</span>
                  <span className="font-serif text-xl text-[#632B3A]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 pt-2 text-[11px] font-sans text-[#252323]/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-800" />
                  <span>256-Bit SSL Demo Checkout Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[#632B3A]" />
                  <span>Complimentary Insured Shipping Across India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

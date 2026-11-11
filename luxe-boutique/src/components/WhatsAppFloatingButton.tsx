import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { createWhatsAppGeneralLink } from '../utils/formatters';
import { storeConfig } from '../config/storeConfig';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip Message */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#252323] px-3.5 py-2 rounded-none border border-[#E9DFD3] shadow-luxury text-xs font-sans max-w-xs animate-fadeIn">
          <span>Need sizing help? Chat with {storeConfig.brandName} Stylist</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-[#252323]/50 hover:text-[#252323] ml-1"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={createWhatsAppGeneralLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 bg-emerald-800 hover:bg-emerald-900 text-white rounded-full flex items-center justify-center shadow-elevated transition-transform hover:scale-105 group"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        <MessageSquare size={26} />
      </a>
    </div>
  );
};

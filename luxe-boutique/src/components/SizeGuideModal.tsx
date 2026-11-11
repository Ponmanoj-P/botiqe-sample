import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const measurements = [
    { size: 'XS', bustIn: '32 - 33', waistIn: '26 - 27', hipIn: '35 - 36', bustCm: '81 - 84', waistCm: '66 - 68', hipCm: '89 - 91' },
    { size: 'S', bustIn: '34 - 35', waistIn: '28 - 29', hipIn: '37 - 38', bustCm: '86 - 89', waistCm: '71 - 74', hipCm: '94 - 96' },
    { size: 'M', bustIn: '36 - 37', waistIn: '30 - 31', hipIn: '39 - 40', bustCm: '91 - 94', waistCm: '76 - 79', hipCm: '99 - 101' },
    { size: 'L', bustIn: '38 - 39', waistIn: '32 - 33', hipIn: '41 - 42', bustCm: '96 - 99', waistCm: '81 - 84', hipCm: '104 - 106' },
    { size: 'XL', bustIn: '40 - 41', waistIn: '34 - 35', hipIn: '43 - 44', bustCm: '101 - 104', waistCm: '86 - 89', hipCm: '109 - 112' },
    { size: 'XXL', bustIn: '42 - 43', waistIn: '36 - 37', hipIn: '45 - 46', bustCm: '106 - 109', waistCm: '91 - 94', hipCm: '114 - 117' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-[#F8F5F0] border border-[#E9DFD3] max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center justify-between border-b border-[#E9DFD3] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Ruler size={20} className="text-[#632B3A]" />
            <h3 className="font-serif text-2xl font-light text-[#252323]">
              Boutique Sizing Guide
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

        <p className="text-xs text-[#252323]/70 font-sans mb-6">
          All measurements are garment-ready body dimensions in inches and centimeters. For relaxed silhouettes like Anarkalis and Kurtas, generous 2-inch side seam margins are provided for custom alterations.
        </p>

        {/* Table */}
        <div className="overflow-x-auto mb-6 bg-white border border-[#E9DFD3]">
          <table className="w-full text-xs font-sans text-left">
            <thead className="bg-[#632B3A] text-white uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Bust (Inches)</th>
                <th className="p-3">Waist (Inches)</th>
                <th className="p-3">Hips (Inches)</th>
                <th className="p-3">Bust (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9DFD3]">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-[#F8F5F0]">
                  <td className="p-3 font-semibold text-[#632B3A]">{row.size}</td>
                  <td className="p-3">{row.bustIn}"</td>
                  <td className="p-3">{row.waistIn}"</td>
                  <td className="p-3">{row.hipIn}"</td>
                  <td className="p-3 text-[#252323]/60">{row.bustCm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#E9DFD3]/40 p-4 border border-[#E9DFD3] text-xs font-sans text-[#252323]/80 space-y-1">
          <p className="font-semibold text-[#252323]">Need Custom Made-to-Measure Sizing?</p>
          <p>
            Connect directly with our master master-cutter via WhatsApp to provide custom blouse, sleeve, or hem measurements at no additional fee.
          </p>
        </div>
      </div>
    </div>
  );
};

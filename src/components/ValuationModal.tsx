import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Send, 
  Home, 
  Calendar,
  Phone
} from 'lucide-react';
import { ValuationRequest } from '../types';

interface ValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ValuationRequest>({
    fullName: '',
    email: '',
    phone: '',
    propertyAddress: '',
    postcode: '',
    propertyType: 'Detached House',
    bedrooms: '3',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [refCode, setRefCode] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `VAL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generatedRef);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white border border-slate-200 rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-900 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#B48C4E]/10 border border-[#B48C4E]/30 text-[#B48C4E] text-xs font-semibold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Licensed NAEA Agent • Free & No Obligation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
                Know What Your Property Could Be Worth
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Arrange a free pre-sale valuation and marketing consultation with Morgan Property Services. Gain honest, market-grounded local property insights in Newry and Mourne.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Patrick Morgan"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 028 3026 0000"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="patrick@example.com"
                  className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Property Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.propertyAddress}
                    onChange={e => setFormData({ ...formData, propertyAddress: e.target.value })}
                    placeholder="Street name & area in Newry/Mourne"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Postcode</label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={e => setFormData({ ...formData, postcode: e.target.value })}
                    placeholder="e.g. BT35 8FF"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  >
                    <option value="Detached House">Detached House</option>
                    <option value="Semi-Detached">Semi-Detached</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Commercial Premises">Commercial Premises</option>
                    <option value="Development Site">Development Site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">No. of Bedrooms</label>
                  <select
                    value={formData.bedrooms}
                    onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  >
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                    <option value="N/A">N/A (Commercial/Land)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Additional Information or Questions</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Looking to sell within 3 months..."
                  className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-3.5 px-6 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Request My Free Valuation</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2 text-center">
                <ShieldCheck className="w-4 h-4 text-[#B48C4E]" />
                <span>Free, no-obligation valuation & confidential pre-sale advice</span>
              </div>
            </form>

          </div>
        ) : (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-serif text-[#0F172A]">Valuation Request Received!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your pre-sale valuation consultation reference is:
              </p>
              <div className="inline-block bg-slate-50 border border-[#B48C4E]/40 text-[#B48C4E] font-mono font-bold px-4 py-2 rounded-sm text-lg">
                {refCode}
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Our Licensed NAEA Property Valuer will review your details for <strong>{formData.propertyAddress}</strong> and contact you at <strong>{formData.phone}</strong> to confirm a convenient time for your home visit.
            </p>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-[#0F172A] hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-sm text-xs cursor-pointer transition-colors uppercase tracking-wider"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

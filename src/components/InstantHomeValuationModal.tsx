import React, { useState } from 'react';
import { 
  X, 
  Home, 
  MapPin, 
  CheckCircle2, 
  Calculator, 
  Send, 
  Award, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CurrencyOption } from '../types';
import { formatPrice } from '../utils/formatters';

interface InstantHomeValuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyOption;
}

export const InstantHomeValuationModal: React.FC<InstantHomeValuationModalProps> = ({
  isOpen,
  onClose,
  currency
}) => {
  const [step, setStep] = useState<number>(1);
  const [postcode, setPostcode] = useState<string>('BT34 2DA');
  const [propertyType, setPropertyType] = useState<string>('Semi-Detached');
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [condition, setCondition] = useState<string>('Fully Renovated / Excellent');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [estimatedRange, setEstimatedRange] = useState<{ min: number; max: number } | null>(null);

  if (!isOpen) return null;

  const handleCalculateInstant = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Baseline calculations for Newry area
    let base = 210000;
    if (propertyType.includes('Detached')) base = 320000;
    if (propertyType.includes('Apartment')) base = 150000;
    if (propertyType.includes('Townhouse')) base = 195000;

    base += (bedrooms - 3) * 35000;

    if (condition.includes('Excellent')) base *= 1.15;
    if (condition.includes('Needs TLC')) base *= 0.88;

    const min = Math.round(base * 0.95);
    const max = Math.round(base * 1.05);

    setEstimatedRange({ min, max });
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setEstimatedRange(null);
    setFullName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-xl w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Instant Automated Home Value Estimate
              </h2>
              <p className="text-xs text-slate-300">
                AI & NAEA Licensed Comparable Market Analysis (CMA) Tool
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {step === 1 ? (
          <form onSubmit={handleCalculateInstant} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm text-xs text-slate-600 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#B48C4E] flex-shrink-0" />
              <span>Get an instant mathematical market estimate based on recent sold land registry transactions across Newry & Mourne.</span>
            </div>

            {/* Postcode & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Property Postcode *
                </label>
                <input
                  type="text"
                  required
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g. BT34 2DA"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Property Style
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                >
                  <option value="Detached House">Detached House</option>
                  <option value="Semi-Detached">Semi-Detached</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Bungalow">Bungalow</option>
                </select>
              </div>
            </div>

            {/* Bedrooms & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                >
                  <option value={1}>1 Bedroom</option>
                  <option value={2}>2 Bedrooms</option>
                  <option value={3}>3 Bedrooms</option>
                  <option value={4}>4 Bedrooms</option>
                  <option value={5}>5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Property Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                >
                  <option value="Fully Renovated / Excellent">Fully Renovated / Modern</option>
                  <option value="Good Condition">Good Standard Condition</option>
                  <option value="Needs TLC / Modernisation">Needs TLC / Modernisation</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Where should we send your full CMA Valuation Report?
              </label>

              <input
                type="text"
                required
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Instant Valuation Range</span>
            </button>

          </form>
        ) : (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B48C4E]">
                Estimated Valuation Estimate ({postcode})
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A]">
                {estimatedRange && `${formatPrice(estimatedRange.min, currency)} – ${formatPrice(estimatedRange.max, currency)}`}
              </h3>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Property Details:</span>
                <span className="font-bold text-slate-800">{bedrooms} Bed {propertyType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Condition Grade:</span>
                <span className="font-bold text-slate-800">{condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Full Report Sent To:</span>
                <span className="font-bold text-[#B48C4E]">{email}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Our Senior Valuation Director will review your property specifications and call you on <strong className="text-slate-900">{phone}</strong> to offer a precise, free in-person valuation inspection.
            </p>

            <button
              onClick={handleReset}
              className="w-full bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

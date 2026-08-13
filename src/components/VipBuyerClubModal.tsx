import React, { useState } from 'react';
import { X, Crown, ShieldCheck, CheckCircle2, Send, Lock, Sparkles } from 'lucide-react';

interface VipBuyerClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipBuyerClubModal: React.FC<VipBuyerClubModalProps> = ({
  isOpen,
  onClose
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [budget, setBudget] = useState<string>('£250,000 - £400,000');
  const [buyerType, setBuyerType] = useState<string>('Cash Buyer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-lg w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                VIP Off-Market & Investor Club Registration
              </h2>
              <p className="text-xs text-slate-300">
                Get first-look access to unlisted properties before public portal release
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
        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0F172A]">
              Welcome to the Morgan VIP Investor Club!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>. You have been registered in our confidential off-market buyer registry. Our Senior Acquisitions Director will contact you when pre-market homes matching <strong className="text-[#B48C4E]">{budget}</strong> become available.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm text-xs text-slate-700 space-y-1">
              <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#B48C4E]" />
                <span>Off-Market Confidentiality Promise</span>
              </span>
              <p className="text-[11px] text-slate-500">
                Over 20% of high-end homes and investment portfolios in Newry & Mourne sell quietly without ever reaching Rightmove or PropertyPal.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Patrick O'Neill"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07700 900123"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Acquisition Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                  >
                    <option value="Under £150,000">Under £150,000</option>
                    <option value="£150,000 - £250,000">£150,000 - £250,000</option>
                    <option value="£250,000 - £400,000">£250,000 - £400,000</option>
                    <option value="£400,000 - £750,000">£400,000 - £750,000</option>
                    <option value="£750,000+ Luxury / Commercial">£750,000+ Luxury / Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Buyer Purchasing Status
                  </label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                  >
                    <option value="Cash Buyer">Cash Buyer (Funds Ready)</option>
                    <option value="First Time Buyer">First Time Buyer</option>
                    <option value="Mortgage Approved">Mortgage Approved in Principle</option>
                    <option value="Property to Sell First">Property to Sell First</option>
                    <option value="Portfolio Investor">Portfolio Investor</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md mt-2"
            >
              <Crown className="w-4 h-4" />
              <span>Register for Off-Market VIP Alerts</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

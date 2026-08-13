import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    cookies: 'Cookie Policy'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-900 relative max-h-[85vh] overflow-y-auto space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#B48C4E]">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-xl font-bold font-serif text-[#0F172A]">{titles[type]}</h2>
        </div>

        <div className="text-xs text-slate-600 space-y-3 leading-relaxed border-t border-slate-200 pt-4">
          {type === 'privacy' && (
            <>
              <p><strong>Morgan Property Services</strong> respect your privacy and are committed to protecting your personal data in accordance with UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
              <h4 className="font-bold text-[#0F172A] text-sm">1. Information We Collect</h4>
              <p>When you fill out valuation, viewing, or contact forms, we collect information including your full name, phone number, email address, property details, and viewing preferences.</p>
              <h4 className="font-bold text-[#0F172A] text-sm">2. How We Use Your Data</h4>
              <p>Your data is used strictly to communicate regarding property sales, lettings, market appraisals, accompanied viewings, or legal tenancy management services.</p>
              <h4 className="font-bold text-[#0F172A] text-sm">3. NAEA Licensing Standard</h4>
              <p>As a Licensed NAEA estate agency, we uphold strict standards of client confidentiality and transparency.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>Welcome to the <strong>Morgan Property Services</strong> official website. By browsing or submitting property enquiries on this website, you agree to these Terms and Conditions.</p>
              <h4 className="font-bold text-[#0F172A] text-sm">1. Property Particulars</h4>
              <p>While every reasonable effort is made to ensure accuracy, property listings, dimensions, and descriptions are intended as a general guide only and do not constitute an offer or contract.</p>
              <h4 className="font-bold text-[#0F172A] text-sm">2. Valuation & Advisory Services</h4>
              <p>Pre-sale property valuations and consultations provided by Morgan Property Services are advisory market appraisals.</p>
            </>
          )}

          {type === 'cookies' && (
            <>
              <p><strong>Morgan Property Services</strong> uses essential cookies to ensure secure navigation, property filtering, and saved property preferences on our website.</p>
              <h4 className="font-bold text-[#0F172A] text-sm">1. Essential Functional Cookies</h4>
              <p>Cookies store session preferences such as your saved properties wishlist and search filter settings locally on your browser.</p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0F172A] hover:bg-slate-800 text-white font-semibold py-2 px-5 rounded-sm text-xs cursor-pointer uppercase tracking-wider transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

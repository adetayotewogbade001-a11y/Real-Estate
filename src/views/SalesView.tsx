import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calculator, 
  CheckCircle2, 
  Award, 
  Home, 
  TrendingUp, 
  Camera, 
  Users, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  PhoneCall,
  Building2
} from 'lucide-react';

interface SalesViewProps {
  onOpenValuation: () => void;
  onNavigate: (view: string) => void;
}

export const SalesView: React.FC<SalesViewProps> = ({ onOpenValuation, onNavigate }) => {
  return (
    <div className="space-y-16 pb-12 text-slate-900">
      <Helmet>
        <title>Residential Sales | Morgan Property Services | Newry</title>
        <meta 
          name="description" 
          content="Thinking of selling your house in Newry? Get a free pre-sale valuation and expert property marketing advice from our Licensed NAEA agents." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#sales" />
        <meta property="og:title" content="Residential Sales | Morgan Property Services Newry" />
        <meta property="og:description" content="Expert property sales guidance, market appraisals, accompanied viewings, and marketing across Newry & Mourne." />
      </Helmet>
      
      {/* Hero Banner Header with Property Background Image & Far Left Alignment */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="Newry Property Sales"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/20 border border-[#B48C4E]/30 text-[#B48C4E] px-3.5 py-1.5 rounded-sm text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Licensed NAEA Agent • Pre-Sale Consultation</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Thinking of Selling Your Property in Newry?
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-left">
              From your initial valuation to marketing and viewings, Morgan Property Services provides professional support throughout the selling process across Newry, Warrenpoint, Camlough, and Mourne.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
              <button
                onClick={onOpenValuation}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Book a Free Pre-Sale Valuation</span>
              </button>
              <span className="text-xs text-slate-300 italic text-left">
                Free, no-obligation valuation and marketing consultation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* Selling Process Services Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E]">
            End-To-End Sales Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
            Comprehensive Property Marketing & Negotiation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            How we market and guide your residential sale to completion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 shadow-sm hover:border-[#B48C4E] transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Property Valuations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Data-grounded pre-sale appraisals provided directly by a Licensed NAEA agent.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 shadow-sm hover:border-[#B48C4E] transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Property Marketing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eye-catching photography, tailored online presence, and branded sale boards.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 shadow-sm hover:border-[#B48C4E] transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Accompanied Viewings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All prospective buyers are accompanied by experienced local property staff.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 shadow-sm hover:border-[#B48C4E] transition-colors">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Flexible Agency Options</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choice of sole agency, joint agency, or multiple agency arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Banner */}
      <div className="bg-[#0F172A] text-white border border-slate-800 p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-serif text-white">Ready to discover your home's current market value?</h3>
          <p className="text-xs text-slate-300">Free, no-obligation valuation and pre-sale marketing advice from our Newry team.</p>
        </div>
        <button
          onClick={onOpenValuation}
          className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          Book Your Free Valuation
        </button>
      </div>

    </div>
    </div>
  );
};

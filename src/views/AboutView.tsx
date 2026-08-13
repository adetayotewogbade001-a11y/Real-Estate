import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  Award, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  Calculator,
  PhoneCall
} from 'lucide-react';

interface AboutViewProps {
  onOpenValuation: () => void;
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenValuation, onNavigate }) => {
  return (
    <div className="space-y-16 pb-12 text-slate-900">
      <Helmet>
        <title>About Us | Licensed NAEA Estate Agency | Morgan Property Services Newry</title>
        <meta 
          name="description" 
          content="Learn about Morgan Property Services, a trusted independent NAEA licensed estate agency serving Newry and Mourne with local property knowledge." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#about" />
        <meta property="og:title" content="About Morgan Property Services | Estate Agents Newry" />
        <meta property="og:description" content="Long-established estate agency in Newry providing residential sales, lettings, commercial property and pre-sale market appraisals." />
      </Helmet>
      
      {/* Hero Banner Header with Property Background Image & Far Left Alignment */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80"
            alt="Morgan Property Services Newry Team & Region"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/20 border border-[#B48C4E]/30 text-[#B48C4E] px-3.5 py-1.5 rounded-sm text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Licensed NAEA Agent • Newry City</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Local property knowledge, built over years of experience.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-left">
              Morgan Property Services is a long-established estate agency located in Newry City. We provide a professional and personalised property service tailored to buyers, sellers, landlords, and tenants across the Newry and Mourne area.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
              <button
                onClick={onOpenValuation}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Book a Free Valuation</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-sm text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
              >
                <PhoneCall className="w-4 h-4 text-[#B48C4E]" />
                <span>Contact Our Team</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* Core Values / Strengths */}
      <div className="bg-white border border-slate-200 rounded-sm p-8 sm:p-12 space-y-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E]">
            Our Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
            What Defines Morgan Property Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="bg-[#F9FAFB] p-6 rounded-sm border border-slate-200 space-y-3 hover:border-[#B48C4E] transition-colors">
            <MapPin className="w-6 h-6 text-[#B48C4E]" />
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Local Newry Focus</h3>
            <p className="leading-relaxed text-slate-600">
              Deep familiarity with Newry City Centre, Camlough, Warrenpoint, Rostrevor, Bessbrook, and surrounding rural communities.
            </p>
          </div>

          <div className="bg-[#F9FAFB] p-6 rounded-sm border border-slate-200 space-y-3 hover:border-[#B48C4E] transition-colors">
            <ShieldCheck className="w-6 h-6 text-[#B48C4E]" />
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Licensed Integrity</h3>
            <p className="leading-relaxed text-slate-600">
              Operating under NAEA licensing rules ensures client protection, financial security, and ethical negotiation standards.
            </p>
          </div>

          <div className="bg-[#F9FAFB] p-6 rounded-sm border border-slate-200 space-y-3 hover:border-[#B48C4E] transition-colors">
            <Users className="w-6 h-6 text-[#B48C4E]" />
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Personal Attention</h3>
            <p className="leading-relaxed text-slate-600">
              Direct access to experienced property personnel who know your property and understand your goals.
            </p>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

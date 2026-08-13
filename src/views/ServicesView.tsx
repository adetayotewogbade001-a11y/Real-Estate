import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Home, 
  Key, 
  Building2, 
  Store, 
  ShieldCheck, 
  Calculator, 
  TrendingUp, 
  Users, 
  Briefcase, 
  HardHat, 
  Globe, 
  ArrowRight,
  X,
  Send,
  Award,
  PhoneCall
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { PropertyService } from '../types';

interface ServicesViewProps {
  onOpenValuation: () => void;
  onNavigate: (view: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenValuation, onNavigate }) => {
  const [selectedService, setSelectedService] = useState<PropertyService | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Key': return <Key className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Store': return <Store className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Calculator': return <Calculator className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'HardHat': return <HardHat className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      default: return <Building2 className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-12 pb-12 text-slate-900">
      <Helmet>
        <title>Property Services & Valuations | Morgan Property Services | Newry</title>
        <meta 
          name="description" 
          content="Explore our end-to-end estate agency services including pre-sale market appraisals, accompanied viewings, and tenancy management in Newry." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#services" />
        <meta property="og:title" content="Property Services & Valuations | Morgan Property Services Newry" />
        <meta property="og:description" content="Professional estate agency services across sales, lettings, market appraisals, and commercial property in Newry & Mourne." />
      </Helmet>
      
      {/* Hero Banner Header with Background Property Image & Far Left Alignment */}
      <section className="relative min-h-[360px] sm:min-h-[420px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80"
            alt="Morgan Property Services Scope"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/20 border border-[#B48C4E]/30 text-[#B48C4E] px-3.5 py-1.5 rounded-sm text-xs font-semibold">
              <Award className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Licensed NAEA Accreditation • Newry</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Our Property Services
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-left">
              Morgan Property Services provides professional and personalised property services across the Newry and Mourne area, covering sales, lettings, valuations, and management.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
              <button
                onClick={onOpenValuation}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Book a Valuation</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#B48C4E]" />
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* 11 Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service, idx) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service)}
            className="bg-white border border-slate-200 hover:border-[#B48C4E] p-6 rounded-sm shadow-sm transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(service.iconName)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-sm border border-slate-200">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif text-[#0F172A] group-hover:text-[#B48C4E] transition-colors">
                {service.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {service.shortDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#B48C4E]">
              <span>View Service Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl text-slate-900 relative space-y-6">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-slate-100 text-slate-600 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-[10px] text-[#B48C4E] font-bold uppercase tracking-widest block">
                  {selectedService.category} Service
                </span>
                <h2 className="text-xl font-bold font-serif text-[#0F172A]">{selectedService.title}</h2>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedService.fullDesc}</p>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Highlights:</h4>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {selectedService.highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B48C4E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  if (selectedService.id === 'prop-valuations' || selectedService.id === 'market-appraisals') {
                    onOpenValuation();
                  } else {
                    onNavigate('contact');
                  }
                }}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enquire About This Service</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  );
};

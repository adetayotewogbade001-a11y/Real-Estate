import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  Store, 
  Briefcase, 
  HardHat, 
  TrendingUp, 
  Send, 
  CheckCircle2,
  MapPin,
  Search
} from 'lucide-react';

interface CommercialViewProps {
  onNavigate: (view: string) => void;
}

export const CommercialView: React.FC<CommercialViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-12 text-slate-900">
      <Helmet>
        <title>Commercial Property & Investment | Morgan Property Services | Newry</title>
        <meta 
          name="description" 
          content="Commercial real estate, retail units, corporate offices, and developer advisory services along the Belfast-Dublin A1 corridor in Newry." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#commercial" />
        <meta property="og:title" content="Commercial Property & Real Estate | Morgan Property Services Newry" />
        <meta property="og:description" content="Retail leases, commercial sales, corporate office rentals, and developer site appraisals across Newry City and Northern Ireland." />
      </Helmet>
      
      {/* Hero Banner Header with Commercial Property Background Image & Far Left Alignment */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Newry Commercial Real Estate"
            className="w-full h-full object-cover opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-5 flex flex-col items-start text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] bg-[#B48C4E]/20 border border-[#B48C4E]/30 px-3.5 py-1.5 rounded-sm inline-block">
              Commercial Real Estate
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Commercial Property & Lettings
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-left">
              Morgan Property Services works with commercial property clients across Newry City, Warrenpoint, and Northern Ireland. Providing strategic sales, corporate office rentals, retail leases, and developer advisory.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold px-6 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enquire About Commercial Property</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* Services Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E]">
            Commercial Scope
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
            Specialised Commercial Services
          </h2>
          <p className="text-xs text-slate-500">
            Tailored solutions for local businesses, landlords, and property investors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Commercial Sales</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sales marketing and valuation of commercial premises, retail units, and warehouse facilities.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Commercial Lettings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lease negotiations and tenant sourcing for prime town centre retail space and business parks.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Office Rental</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sourcing corporate office suites and flexible workspace solutions along the Belfast-Dublin corridor.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <HardHat className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Developer Services</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Site appraisal, off-plan pricing strategies, and marketing launches for residential & commercial developers.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors shadow-sm sm:col-span-2 lg:col-span-2">
            <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif text-[#0F172A]">Commercial Market Appraisals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Detailed local valuation reporting evaluating footfall, yield potential, and regional planning considerations.
            </p>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};

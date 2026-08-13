import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Key, 
  Building2, 
  ShieldCheck, 
  Users, 
  Search, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Home
} from 'lucide-react';

interface LettingsViewProps {
  onNavigate: (view: string) => void;
  onOpenValuation: () => void;
}

export const LettingsView: React.FC<LettingsViewProps> = ({ onNavigate, onOpenValuation }) => {
  return (
    <div className="space-y-16 pb-12 text-slate-900">
      <Helmet>
        <title>Properties To Let & Landlord Management | Morgan Property Services | Newry</title>
        <meta 
          name="description" 
          content="Comprehensive landlord letting management services and rental properties to let across Newry, Warrenpoint, Rostrevor, and South Armagh." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#lettings" />
        <meta property="og:title" content="Properties To Let & Management | Morgan Property Services Newry" />
        <meta property="og:description" content="Professional residential lettings, tenant sourcing, and landlord property management services across Newry and Mourne." />
      </Helmet>
      
      {/* Hero Banner Header with Property Background Image & Far Left Alignment */}
      <section className="relative min-h-[360px] sm:min-h-[420px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
            alt="Newry Rental Lettings"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/20 border border-[#B48C4E]/30 text-[#B48C4E] px-3.5 py-1.5 rounded-sm text-xs font-semibold">
              <Key className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Newry & Mourne Residential Lettings</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Professional Letting Services for Landlords and Tenants
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-left">
              Morgan Property Services provides professional letting services throughout the Newry and Mourne area, offering structured landlord management and quality accommodation for tenants.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Enquire About Lettings</span>
              </button>
              <button
                onClick={() => onNavigate('properties')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#B48C4E]" />
                <span>View Properties To Let</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      {/* Pathways Grid: For Landlords vs For Tenants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pathway 1: For Landlords */}
        <div className="bg-white border border-slate-200 rounded-sm p-8 space-y-6 relative flex flex-col justify-between hover:border-[#B48C4E] transition-colors shadow-sm">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">For Landlords</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tailored letting solutions whether you need tenant placement or complete property management.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Targeted property advertising & portal exposure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Rigorous tenant reference & suitability checks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Tenancy agreements & inventory management</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Full property management & maintenance support</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Talk to Our Lettings Team</span>
            </button>
          </div>
        </div>

        {/* Pathway 2: For Tenants */}
        <div className="bg-white border border-slate-200 rounded-sm p-8 space-y-6 relative flex flex-col justify-between hover:border-[#B48C4E] transition-colors shadow-sm">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>

            <h2 className="text-2xl font-bold font-serif text-[#0F172A]">For Tenants</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find suitable rental accommodation across Newry City, Warrenpoint, and surrounding villages.
            </p>

            <ul className="space-y-3 text-xs text-slate-700 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Browse available houses, flats, and apartments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Arrange accompanied property viewings easily</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Clear tenancy guidance & deposit handling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Responsive contact point throughout your lease</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('properties')}
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-sm text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Search className="w-4 h-4 text-[#B48C4E]" />
              <span>View Rental Properties</span>
            </button>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
};

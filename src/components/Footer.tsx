import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Facebook, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenValuation: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  onOpenValuation,
  onOpenLegal
}) => {
  return (
    <footer className="bg-[#0F172A] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-tight text-white leading-tight">
                MORGAN PROPERTY SERVICES
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#B48C4E] uppercase">
                Newry City, Northern Ireland
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Professional estate agency, letting, and commercial property services in Newry and Mourne for over 30 years.
            </p>

            {/* NAEA Accreditation Box */}
            <div className="inline-flex items-center gap-3 p-3 rounded-sm bg-white/5 border border-white/10 text-xs text-slate-300">
              <div className="p-2 bg-[#B48C4E]/20 text-[#B48C4E] rounded-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-white block">Licensed NAEA Agent</span>
                <span className="text-slate-400 text-[11px]">National Association of Estate Agents</span>
              </div>
            </div>

            {/* Social Link */}
            <div className="pt-2">
              <a
                href="https://www.facebook.com/morganpropertyservices?fref=ts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white/10 border border-white/15 hover:bg-white/20 text-white text-xs font-medium transition-all group"
              >
                <Facebook className="w-4 h-4 text-[#B48C4E] group-hover:scale-110 transition-transform" />
                <span>Follow Morgan Property Services on Facebook</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#B48C4E] uppercase tracking-widest block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home' },
                { id: 'properties', label: 'Search Properties' },
                { id: 'sales', label: 'Property Sales' },
                { id: 'lettings', label: 'Lettings' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentView(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#B48C4E] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Services */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#B48C4E] uppercase tracking-widest block">
              Services
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => { setCurrentView('sales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="hover:text-[#B48C4E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Properties For Sale</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('lettings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="hover:text-[#B48C4E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Properties To Let</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('commercial'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="hover:text-[#B48C4E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Commercial Property</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenValuation} 
                  className="hover:text-[#B48C4E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Free Property Valuations</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="hover:text-[#B48C4E] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                  <span>Property Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours & Contact */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#B48C4E] uppercase tracking-widest block">
              Office Info
            </span>
            <div className="bg-white/5 border border-white/10 rounded-sm p-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Mon – Fri:</span>
                <span className="font-semibold text-white">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Saturday:</span>
                <span className="font-semibold text-white">09:00 – 12:00</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-white/10 pt-1.5">
                <span>Sunday:</span>
                <span className="text-slate-500">Closed</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenValuation}
                className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-2.5 px-3 rounded-sm text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer text-center block"
              >
                Book a Free Valuation
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          <div>
            <p>© {new Date().getFullYear()} MORGAN PROPERTY SERVICES NEWRY. ALL RIGHTS RESERVED.</p>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onOpenLegal('terms')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => onOpenLegal('cookies')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

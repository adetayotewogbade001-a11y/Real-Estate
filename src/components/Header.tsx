import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Phone, 
  Heart, 
  Award, 
  ChevronRight,
  Calculator,
  Search
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  savedCount: number;
  onOpenValuation: () => void;
  onOpenCms: () => void;
  onOpenSavedDrawer?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  savedCount,
  onOpenValuation,
  onOpenCms,
  onOpenSavedDrawer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'sales', label: 'Sales' },
    { id: 'lettings', label: 'Lettings' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-100 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-[#B48C4E]">
              <Award className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Licensed NAEA Agent</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              Serving Newry, Warrenpoint, Camlough & Mourne Area
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px]">
            <span className="text-slate-400 hidden md:inline">
              Mon–Fri 09:00–17:30 | Sat 09:00–12:00
            </span>
            <button
              onClick={onOpenCms}
              className="text-xs text-[#B48C4E] hover:text-amber-300 font-medium underline underline-offset-2 transition-colors cursor-pointer"
              title="Manage local property database"
            >
              Property Portal / CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] font-bold flex items-center justify-center shadow-sm group-hover:bg-[#1E293B] transition-colors">
            <Building2 className="w-5 h-5 text-[#B48C4E]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold tracking-tight text-[#0F172A] leading-tight">
              MORGAN
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#B48C4E] uppercase -mt-0.5">
              Property Services
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#0F172A] border-b-2 border-[#B48C4E] pb-1 font-bold'
                    : 'hover:text-[#0F172A] pb-1'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Favorites shortcut */}
          <button
            onClick={() => onOpenSavedDrawer ? onOpenSavedDrawer() : handleNavClick('properties')}
            className="p-2 rounded-sm bg-slate-50 text-slate-600 hover:text-[#0F172A] hover:bg-slate-100 border border-slate-200 transition-colors relative cursor-pointer"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B48C4E] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {savedCount}
              </span>
            )}
          </button>

          {/* Book Valuation Primary CTA */}
          <button
            onClick={onOpenValuation}
            className="px-5 py-2.5 bg-[#0F172A] text-white text-xs font-semibold rounded-sm hover:bg-slate-800 transition-all cursor-pointer uppercase tracking-wider flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-[#B48C4E]" />
            <span>Book a Valuation</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenValuation}
            className="bg-[#0F172A] text-white font-semibold text-xs px-3 py-1.5 rounded-sm cursor-pointer"
          >
            Valuation
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-black rounded-sm bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-[#B48C4E] font-medium">
              <Award className="w-3.5 h-3.5" /> Licensed NAEA Agent
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCms();
              }}
              className="text-[#0F172A] font-bold underline cursor-pointer"
            >
              CMS Portal
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-sm text-sm font-medium flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#0F172A] text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenValuation();
              }}
              className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-3 px-4 rounded-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Book a Free Valuation</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full bg-[#0F172A] hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#B48C4E]" />
              <span>Contact Our Office</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

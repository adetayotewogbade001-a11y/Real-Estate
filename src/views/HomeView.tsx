import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, 
  Award, 
  CheckCircle2, 
  Search, 
  Calculator, 
  ArrowRight, 
  MapPin, 
  PhoneCall, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Home as HomeIcon,
  Key,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Compass,
  Crown,
  Sparkles
} from 'lucide-react';
import { Property, PropertyFilter, CurrencyOption, UnitOption } from '../types';
import { PropertySearchBar } from '../components/PropertySearchBar';
import { PropertyCard } from '../components/PropertyCard';

interface HomeViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSaveProperty: (id: string) => void;
  filter: PropertyFilter;
  setFilter: React.Dispatch<React.SetStateAction<PropertyFilter>>;
  onSearchProperties: () => void;
  onOpenValuation: () => void;
  onNavigate: (view: string) => void;
  currency: CurrencyOption;
  unit: UnitOption;
  onOpenMarketAnalytics: () => void;
  onOpenNeighborhoods: () => void;
  onOpenOffPlan: () => void;
  onOpenRoiCalculator: () => void;
  onOpenVipClub: () => void;
  onOpenInstantValuation: () => void;
}

const HERO_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    caption: 'Luxury Residential Properties in Newry & Mourne'
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    caption: 'Detached & Family Homes across Warrenpoint & Camlough'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    caption: 'Modern Lettings & Townhouses in Co. Down'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
    caption: 'Prime Commercial Real Estate & Developments'
  }
];

export const HomeView: React.FC<HomeViewProps> = ({
  properties,
  onSelectProperty,
  savedPropertyIds,
  onToggleSaveProperty,
  filter,
  setFilter,
  onSearchProperties,
  onOpenValuation,
  onNavigate,
  currency,
  unit,
  onOpenMarketAnalytics,
  onOpenNeighborhoods,
  onOpenOffPlan,
  onOpenRoiCalculator,
  onOpenVipClub,
  onOpenInstantValuation
}) => {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 4);

  // Background Image Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 pb-12">
      <Helmet>
        <title>Morgan Property Services | Estate & Letting Agents in Newry</title>
        <meta 
          name="description" 
          content="Morgan Property Services is a long-established Licensed NAEA estate agency in Newry providing residential sales, lettings, valuations, and commercial property across Newry & Mourne." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/" />
        <meta property="og:title" content="Morgan Property Services | Estate & Letting Agents Newry" />
        <meta property="og:description" content="Leading estate agency in Newry City offering residential sales, property lettings, commercial real estate and free pre-sale valuations." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* HERO SECTION WITH SLIDING BACKGROUND IMAGES */}
      <section className="relative min-h-[520px] lg:min-h-[580px] flex items-center bg-[#0F172A] overflow-hidden">
        
        {/* Sliding Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-40 scale-105 transition-transform duration-[6000ms]' : 'opacity-0 scale-100'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Gradient overlay ensuring far-left text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        {/* Hero Content Box - Strictly Far-Left Aligned */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-6 flex flex-col items-start text-left">
            
            {/* Trust Indicator Badge */}
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/10 border border-[#B48C4E]/30 px-3.5 py-1.5 rounded-sm text-xs font-semibold text-[#B48C4E] backdrop-blur-md">
              <Award className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Licensed NAEA Agent • Newry City</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-[1.15] tracking-tight text-left">
              Property expertise, <br />
              <span className="text-[#B48C4E] italic font-normal">with a personal touch.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl text-left">
              Morgan Property Services is a long-established estate agency in Newry, providing professional and personalised property services for buyers, sellers, landlords and tenants across Newry and Mourne.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-start gap-3 pt-2">
              <button
                onClick={onOpenInstantValuation}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant AI Valuation</span>
              </button>

              <button
                onClick={onOpenOffPlan}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#B48C4E]" />
                <span>Off-Plan Developments</span>
              </button>
            </div>

            {/* Slide Navigation Controls & Indicators */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C4E]">Property Gallery:</span>
              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentSlide ? 'w-6 bg-[#B48C4E]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Subtle Trust Badges - Left Aligned */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-start gap-6 text-xs text-slate-300 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E]" />
                <span>Residential Sales & Lettings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E]" />
                <span>Commercial Property Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B48C4E]" />
                <span>Free Pre-Sale Market Appraisals</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROMINENT PROPERTY SEARCH BAR SECTION */}
      <section className="-mt-12 sm:-mt-16 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertySearchBar
          filter={filter}
          setFilter={setFilter}
          onSearch={onSearchProperties}
        />
      </section>

      {/* PORTAL FEATURE HIGHLIGHT GRID (D&B, fäm, Oasis, Caul, Patricia Grieco) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          
          <button
            onClick={onOpenMarketAnalytics}
            className="p-4 bg-slate-900 text-white rounded-sm border border-slate-800 hover:border-[#B48C4E] text-left space-y-2 transition-all cursor-pointer group shadow-sm"
          >
            <BarChart3 className="w-6 h-6 text-[#B48C4E] group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-serif font-bold text-xs text-white">Market Index</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Average £/sq ft & YoY growth</p>
            </div>
          </button>

          <button
            onClick={onOpenOffPlan}
            className="p-4 bg-slate-900 text-white rounded-sm border border-slate-800 hover:border-[#B48C4E] text-left space-y-2 transition-all cursor-pointer group shadow-sm"
          >
            <Building2 className="w-6 h-6 text-[#B48C4E] group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-serif font-bold text-xs text-white">Off-Plan Projects</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Pre-launch developments</p>
            </div>
          </button>

          <button
            onClick={onOpenNeighborhoods}
            className="p-4 bg-slate-900 text-white rounded-sm border border-slate-800 hover:border-[#B48C4E] text-left space-y-2 transition-all cursor-pointer group shadow-sm"
          >
            <Compass className="w-6 h-6 text-[#B48C4E] group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-serif font-bold text-xs text-white">Area Guides</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Schools, commutes & yields</p>
            </div>
          </button>

          <button
            onClick={onOpenRoiCalculator}
            className="p-4 bg-slate-900 text-white rounded-sm border border-slate-800 hover:border-[#B48C4E] text-left space-y-2 transition-all cursor-pointer group shadow-sm"
          >
            <TrendingUp className="w-6 h-6 text-[#B48C4E] group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-serif font-bold text-xs text-white">ROI Yield Calculator</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Gross/Net rental projections</p>
            </div>
          </button>

          <button
            onClick={onOpenVipClub}
            className="p-4 bg-[#0F172A] text-white rounded-sm border border-amber-500/40 hover:border-amber-400 text-left space-y-2 transition-all cursor-pointer group shadow-sm col-span-2 md:col-span-1"
          >
            <Crown className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="font-serif font-bold text-xs text-amber-300">VIP Off-Market Club</h4>
              <p className="text-[10px] text-slate-300 mt-0.5">Unlisted pre-market alerts</p>
            </div>
          </button>

        </div>
      </section>

      {/* FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] block mb-1">
              Handpicked Listings
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore highlighted homes, rentals, and commercial spaces in Newry & Mourne
            </p>
          </div>

          <button
            onClick={() => onNavigate('properties')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F172A] hover:text-[#B48C4E] transition-colors cursor-pointer group"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#B48C4E]" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
              isSaved={savedPropertyIds.includes(property.id)}
              onToggleSave={onToggleSaveProperty}
              currency={currency}
              unit={unit}
            />
          ))}
        </div>
      </section>

      {/* WHY MORGAN PROPERTY SERVICES SECTION */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] bg-[#B48C4E]/10 border border-[#B48C4E]/20 px-3 py-1 rounded-sm inline-block">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0F172A]">
              Local knowledge. Personal service. Professional results.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Morgan Property Services combines deep local understanding with licensed professional standards to deliver exceptional property guidance across Newry City and surrounding districts.
            </p>
          </div>

          {/* 5 Feature Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="bg-[#F9FAFB] border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Local Market Knowledge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our expert knowledge of the local Newry property market helps clients make informed property decisions.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Personalised Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We provide a professional and personalised service tailored directly to each client's specific circumstances.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Experienced Team</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A long-established estate agency serving the Newry area with broad expertise across residential and commercial property.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Licensed NAEA Agent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The business owner is a Licensed NAEA Agent, providing additional confidence and security when dealing with your property.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-slate-200 p-6 rounded-sm space-y-3 hover:border-[#B48C4E] transition-colors sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-serif text-[#0F172A]">Comprehensive Services</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From sales and lettings to valuations, management and commercial property, we provide end-to-end property solutions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* THINKING OF SELLING CALLOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] border border-slate-800 rounded-sm p-8 sm:p-12 relative overflow-hidden shadow-xl text-white">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] bg-[#B48C4E]/20 border border-[#B48C4E]/30 px-3 py-1 rounded-sm inline-block">
              Seller Consultation
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Thinking of Selling Your Property?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              From your initial valuation to marketing and viewings, Morgan Property Services provides professional support throughout the selling process across Newry and Mourne.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenInstantValuation}
                className="bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Instant Value Range</span>
              </button>
              <button
                onClick={() => onNavigate('sales')}
                className="text-slate-300 hover:text-white text-xs uppercase tracking-wider font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Learn about our sales process</span>
                <ArrowRight className="w-4 h-4 text-[#B48C4E]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] block">
            Straightforward Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
            How It Works
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Four simple steps to buying, selling, or letting your property with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Talk to Us',
              desc: 'Tell us what you are looking to achieve, whether buying, selling, renting or letting.'
            },
            {
              step: '02',
              title: 'Property Advice',
              desc: 'Receive professional advice and pre-sale appraisals based on your property and market circumstances.'
            },
            {
              step: '03',
              title: 'Market & Manage',
              desc: 'We help market your property, arrange accompanied viewings and manage the process.'
            },
            {
              step: '04',
              title: 'Move Forward',
              desc: 'Work alongside our experienced team towards a successful sale, letting or tenancy.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-sm space-y-3 relative group hover:border-[#B48C4E] transition-colors shadow-sm">
              <span className="text-3xl font-serif font-bold text-[#B48C4E] block">
                {item.step}
              </span>
              <h3 className="text-base font-bold font-serif text-[#0F172A]">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

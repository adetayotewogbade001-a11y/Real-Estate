import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  School, 
  TrendingUp, 
  Clock, 
  Building2, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Compass
} from 'lucide-react';
import { NeighborhoodInfo, CurrencyOption } from '../types';
import { MOCK_NEIGHBORHOODS } from '../data/portalData';
import { formatPrice } from '../utils/formatters';

interface NeighborhoodGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyOption;
  onFilterByLocation: (town: string) => void;
}

export const NeighborhoodGuidesModal: React.FC<NeighborhoodGuidesModalProps> = ({
  isOpen,
  onClose,
  currency,
  onFilterByLocation
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodInfo>(MOCK_NEIGHBORHOODS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-5xl w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Newry & Mourne Neighborhood & Living Guides
              </h2>
              <p className="text-xs text-slate-300">
                In-depth local market statistics, schools, commute times, and lifestyle guides
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

        {/* Body Container */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[82vh] overflow-y-auto">
          
          {/* Left Area Tabs Column */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Select Area Guide
            </span>

            {MOCK_NEIGHBORHOODS.map((neigh) => {
              const isSelected = selectedNeighborhood.id === neigh.id;
              return (
                <button
                  key={neigh.id}
                  onClick={() => setSelectedNeighborhood(neigh)}
                  className={`w-full text-left p-3 rounded-sm border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#B48C4E] hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <h4 className="font-serif font-bold text-xs group-hover:text-[#B48C4E] transition-colors">
                      {neigh.name}
                    </h4>
                    <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      Avg. Price: {formatPrice(neigh.avgPriceGBP, currency)}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#B48C4E]' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Selected Neighborhood Deep Dive Column */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Hero Image Banner */}
            <div className="relative h-48 sm:h-56 rounded-sm overflow-hidden border border-slate-200">
              <img
                src={selectedNeighborhood.heroImage}
                alt={selectedNeighborhood.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] bg-slate-900/80 px-2 py-0.5 rounded">
                  Area Guide
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {selectedNeighborhood.name}
                </h3>
                <p className="text-xs text-slate-200 mt-0.5 italic">
                  {selectedNeighborhood.tagline}
                </p>
              </div>
            </div>

            {/* Key Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Avg House Price
                </span>
                <span className="text-sm font-serif font-bold text-[#0F172A]">
                  {formatPrice(selectedNeighborhood.avgPriceGBP, currency)}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Avg Monthly Rent
                </span>
                <span className="text-sm font-serif font-bold text-[#B48C4E]">
                  {formatPrice(selectedNeighborhood.avgRentGBP, currency)}/mo
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Gross Yield
                </span>
                <span className="text-sm font-serif font-bold text-emerald-600">
                  {selectedNeighborhood.yieldPercent}% p.a.
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  School Rating
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1">
                  {selectedNeighborhood.schoolRating}
                </span>
              </div>
            </div>

            {/* Commute Times */}
            <div className="p-3 bg-slate-900 text-white rounded-sm space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#B48C4E] tracking-wider block">
                Corridor Commute Times (A1/M1 Highway & Rail)
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B48C4E]" />
                  <span>Belfast City Centre: <strong>~{selectedNeighborhood.commuteBelfastMin} mins</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B48C4E]" />
                  <span>Dublin Airport / City: <strong>~{selectedNeighborhood.commuteDublinMin} mins</strong></span>
                </div>
              </div>
            </div>

            {/* Area Overview & Key Highlights */}
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedNeighborhood.description}
              </p>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  Neighborhood Highlights
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedNeighborhood.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 bg-slate-50 p-2 rounded-sm border border-slate-100">
                      <span className="text-[#B48C4E] font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Ready to view listings in {selectedNeighborhood.name}?
              </span>
              <button
                onClick={() => {
                  onClose();
                  onFilterByLocation(selectedNeighborhood.name.split(' ')[0]);
                }}
                className="bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>View {selectedNeighborhood.name.split(' ')[0]} Listings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

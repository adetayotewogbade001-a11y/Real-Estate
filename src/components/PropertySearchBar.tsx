import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Home, 
  PoundSterling, 
  BedDouble, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Video, 
  Calendar, 
  Zap, 
  Maximize2 
} from 'lucide-react';
import { PropertyFilter } from '../types';

interface PropertySearchBarProps {
  filter: PropertyFilter;
  setFilter: React.Dispatch<React.SetStateAction<PropertyFilter>>;
  onSearch: () => void;
  className?: string;
}

export const PropertySearchBar: React.FC<PropertySearchBarProps> = ({
  filter,
  setFilter,
  onSearch,
  className = ''
}) => {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleCategoryChange = (category: 'All' | 'Buy' | 'Rent' | 'Commercial') => {
    setFilter(prev => ({ ...prev, category }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  // Count active advanced filters
  const activeAdvancedCount = [
    filter.propertyAge && filter.propertyAge !== 'All' ? 1 : 0,
    filter.epcRating && filter.epcRating !== 'All' ? 1 : 0,
    filter.minLandSize && filter.minLandSize > 0 ? 1 : 0,
    filter.hasVirtualTour ? 1 : 0,
    filter.searchQuery && filter.searchQuery.trim() !== '' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const handleResetFilters = () => {
    setFilter({
      category: 'All',
      propertyType: '',
      location: '',
      minPrice: 0,
      maxPrice: 0,
      minBedrooms: 0,
      searchQuery: '',
      statusFilter: '',
      propertyAge: 'All',
      epcRating: 'All',
      minLandSize: 0,
      hasVirtualTour: false
    });
  };

  return (
    <div className={`bg-white shadow-xl rounded-sm p-6 sm:p-8 border border-slate-100 text-slate-900 ${className}`}>
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0F172A] flex items-center gap-2">
            <Search className="w-5 h-5 text-[#B48C4E]" />
            <span>Find Your Next Property</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse homes, lettings, and commercial properties across Newry & Mourne
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-sm border border-slate-200 self-start md:self-auto flex-wrap gap-1">
          {(['Buy', 'Rent', 'Commercial'] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter.category === cat
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              {cat === 'Buy' ? 'For Sale' : cat === 'Rent' ? 'To Let' : 'Commercial'}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleCategoryChange('All')}
            className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter.category === 'All'
                ? 'bg-[#0F172A] text-white'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Main Filter Form */}
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* Basic Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Location / Area */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#B48C4E]" />
              <span>Location / Area</span>
            </label>
            <select
              value={filter.location}
              onChange={e => setFilter(prev => ({ ...prev, location: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
            >
              <option value="">All Newry & Mourne Areas</option>
              <option value="Newry">Newry City Centre</option>
              <option value="Camlough">Camlough</option>
              <option value="Warrenpoint">Warrenpoint</option>
              <option value="Rostrevor">Rostrevor</option>
              <option value="Bessbrook">Bessbrook</option>
              <option value="Mayobridge">Mayobridge</option>
              <option value="Kilkeel">Kilkeel</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Home className="w-3 h-3 text-[#B48C4E]" />
              <span>Property Type</span>
            </label>
            <select
              value={filter.propertyType}
              onChange={e => setFilter(prev => ({ ...prev, propertyType: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
            >
              <option value="">All Property Types</option>
              <option value="Detached House">Detached House</option>
              <option value="Semi-Detached">Semi-Detached</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Commercial Office">Commercial Office</option>
              <option value="Industrial / Warehouse">Industrial / Warehouse</option>
            </select>
          </div>

          {/* Maximum Price */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <PoundSterling className="w-3 h-3 text-[#B48C4E]" />
              <span>Maximum Price</span>
            </label>
            <select
              value={filter.maxPrice}
              onChange={e => setFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
            >
              <option value={0}>No Maximum Limit</option>
              {filter.category === 'Rent' ? (
                <>
                  <option value={600}>£600 / mo</option>
                  <option value={800}>£800 / mo</option>
                  <option value={1000}>£1,000 / mo</option>
                  <option value={1200}>£1,200 / mo</option>
                  <option value={1500}>£1,500 / mo</option>
                </>
              ) : (
                <>
                  <option value={150000}>Up to £150,000</option>
                  <option value={200000}>Up to £200,000</option>
                  <option value={250000}>Up to £250,000</option>
                  <option value={300000}>Up to £300,000</option>
                  <option value={400000}>Up to £400,000</option>
                  <option value={500000}>Up to £500,000+</option>
                </>
              )}
            </select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BedDouble className="w-3 h-3 text-[#B48C4E]" />
              <span>Min Bedrooms</span>
            </label>
            <select
              value={filter.minBedrooms}
              onChange={e => setFilter(prev => ({ ...prev, minBedrooms: Number(e.target.value) }))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
            >
              <option value={0}>Any Beds</option>
              <option value={1}>1+ Bedrooms</option>
              <option value={2}>2+ Bedrooms</option>
              <option value={3}>3+ Bedrooms</option>
              <option value={4}>4+ Bedrooms</option>
            </select>
          </div>

          {/* Action Buttons: Search + Toggle Advanced */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-3 rounded-sm border transition-all cursor-pointer flex items-center justify-center relative ${
                showAdvanced || activeAdvancedCount > 0
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeAdvancedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B48C4E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {activeAdvancedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* EXPANDABLE ADVANCED FILTERS PANEL */}
        {showAdvanced && (
          <div className="pt-4 mt-4 border-t border-slate-200 space-y-4 bg-slate-50/80 p-4 rounded-sm border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B48C4E]" />
                <span>Advanced Search Criteria</span>
              </span>

              {activeAdvancedCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[10px] font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Property Age */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#B48C4E]" />
                  <span>Property Age</span>
                </label>
                <select
                  value={filter.propertyAge || 'All'}
                  onChange={e => setFilter(prev => ({ ...prev, propertyAge: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-sm px-3 py-2 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
                >
                  <option value="All">All Property Ages</option>
                  <option value="New Build">New Build (Turnkey)</option>
                  <option value="Under 5 Years">Under 5 Years Old</option>
                  <option value="5-10 Years">5 - 10 Years Old</option>
                  <option value="10-20 Years">10 - 20 Years Old</option>
                  <option value="Period / Character">Period / Character Home</option>
                </select>
              </div>

              {/* Energy Rating (EPC) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#B48C4E]" />
                  <span>Energy Rating (EPC)</span>
                </label>
                <select
                  value={filter.epcRating || 'All'}
                  onChange={e => setFilter(prev => ({ ...prev, epcRating: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-sm px-3 py-2 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
                >
                  <option value="All">All EPC Ratings</option>
                  <option value="A">EPC Rating A (Highest Efficiency)</option>
                  <option value="B">EPC Rating B</option>
                  <option value="C">EPC Rating C</option>
                  <option value="D">EPC Rating D</option>
                  <option value="E">EPC Rating E</option>
                </select>
              </div>

              {/* Min Land / Plot Size */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Maximize2 className="w-3 h-3 text-[#B48C4E]" />
                  <span>Min Land / Plot Size</span>
                </label>
                <select
                  value={filter.minLandSize || 0}
                  onChange={e => setFilter(prev => ({ ...prev, minLandSize: Number(e.target.value) }))}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-sm px-3 py-2 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
                >
                  <option value={0}>Any Plot Size</option>
                  <option value={0.15}>0.15+ Acres</option>
                  <option value={0.25}>0.25+ Acres</option>
                  <option value={0.5}>0.5+ Acres</option>
                  <option value={1.0}>1.0+ Acres</option>
                  <option value={2.0}>2.0+ Acres</option>
                </select>
              </div>

              {/* Keyword / Reference Search & Virtual Tour Toggle */}
              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Search Keyword / Ref #
                </label>
                <input
                  type="text"
                  placeholder="e.g. MPS-2026-101, Chapel Rd..."
                  value={filter.searchQuery}
                  onChange={e => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-sm px-3 py-2 focus:border-[#B48C4E] focus:outline-none font-medium"
                />
              </div>

            </div>

            {/* Virtual Tour Toggle Switch */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={filter.hasVirtualTour || false}
                  onChange={e => setFilter(prev => ({ ...prev, hasVirtualTour: e.target.checked }))}
                  className="w-4 h-4 rounded-sm text-[#B48C4E] focus:ring-[#B48C4E] cursor-pointer"
                />
                <Video className="w-4 h-4 text-[#B48C4E]" />
                <span>Show Virtual 3D Tour Properties Only</span>
              </label>

              <button
                type="submit"
                className="text-xs font-bold uppercase tracking-wider text-[#B48C4E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Apply Advanced Filters</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}
      </form>
    </div>
  );
};

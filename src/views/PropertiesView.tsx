import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Grid, 
  List, 
  Heart, 
  Filter, 
  X, 
  Building2, 
  PlusCircle, 
  SlidersHorizontal,
  Home,
  MapPin,
  PoundSterling,
  Award,
  Calculator,
  Map as MapIcon,
  Columns
} from 'lucide-react';
import { Property, PropertyFilter, CurrencyOption, UnitOption } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { HouzezPropertyMap } from '../components/HouzezPropertyMap';

interface PropertiesViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  savedPropertyIds: string[];
  onToggleSaveProperty: (id: string) => void;
  filter: PropertyFilter;
  setFilter: React.Dispatch<React.SetStateAction<PropertyFilter>>;
  onOpenCms: () => void;
  onOpenValuation: () => void;
  compareIds?: string[];
  onToggleCompare?: (property: Property) => void;
  onScheduleViewing?: (property: Property) => void;
  currency?: CurrencyOption;
  unit?: UnitOption;
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({
  properties,
  onSelectProperty,
  savedPropertyIds,
  onToggleSaveProperty,
  filter,
  setFilter,
  onOpenCms,
  onOpenValuation,
  compareIds = [],
  onToggleCompare,
  onScheduleViewing,
  currency,
  unit
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map' | 'split'>('grid');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'beds'>('newest');
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Saved Only Filter
      if (showSavedOnly && !savedPropertyIds.includes(prop.id)) {
        return false;
      }

      // Category filter (Buy / Rent / Commercial)
      if (filter.category !== 'All' && prop.category !== filter.category) {
        return false;
      }

      // Property Type filter
      if (filter.propertyType && prop.type !== filter.propertyType) {
        return false;
      }

      // Location filter
      if (filter.location && !prop.address.town.toLowerCase().includes(filter.location.toLowerCase()) && !prop.address.area.toLowerCase().includes(filter.location.toLowerCase())) {
        return false;
      }

      // Max Price
      if (filter.maxPrice > 0 && prop.price > filter.maxPrice) {
        return false;
      }

      // Min Bedrooms
      if (filter.minBedrooms > 0 && prop.bedrooms < filter.minBedrooms) {
        return false;
      }

      // Search Query
      if (filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(q);
        const matchStreet = prop.address.street.toLowerCase().includes(q);
        const matchTown = prop.address.town.toLowerCase().includes(q);
        const matchRef = prop.reference.toLowerCase().includes(q);
        if (!matchTitle && !matchStreet && !matchTown && !matchRef) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'beds') return b.bedrooms - a.bedrooms;
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    });
  }, [properties, filter, showSavedOnly, savedPropertyIds, sortBy]);

  const resetFilters = () => {
    setFilter({
      category: 'All',
      propertyType: '',
      location: '',
      minPrice: 0,
      maxPrice: 0,
      minBedrooms: 0,
      searchQuery: '',
      statusFilter: ''
    });
    setShowSavedOnly(false);
  };

  return (
    <div className="space-y-10 pb-12 text-slate-900">
      <Helmet>
        <title>Properties For Sale & To Let | Morgan Property Services | Newry</title>
        <meta 
          name="description" 
          content="Browse available residential homes for sale, apartments to let, and commercial listings in Newry, Warrenpoint, Camlough, and surrounding areas." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#properties" />
        <meta property="og:title" content="Properties For Sale & To Let | Morgan Property Services Newry" />
        <meta property="og:description" content="Search residential property listings, homes for sale, rental properties, and commercial premises across Newry & Mourne." />
      </Helmet>

      {/* Hero Banner Header with Property Image Background & Far-Left Text */}
      <section className="relative min-h-[320px] sm:min-h-[380px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
            alt="Newry Property Listings"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-4 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/20 border border-[#B48C4E]/30 px-3.5 py-1.5 rounded-sm text-xs font-semibold text-[#B48C4E]">
              <Building2 className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Houzez Property Search Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Available Properties in Newry & Mourne
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-left">
              Browse residential sales, lettings, and commercial listings from Morgan Property Services. Compare properties side-by-side or explore interactively on our map.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-start gap-3 w-full">
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`px-4 py-2.5 rounded-sm border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  showSavedOnly
                    ? 'bg-[#B48C4E] text-white border-[#B48C4E] shadow-sm'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-md'
                }`}
              >
                <Heart className={`w-4 h-4 ${showSavedOnly ? 'fill-white' : 'text-[#B48C4E]'}`} />
                <span>Saved Wishlist ({savedPropertyIds.length})</span>
              </button>

              <button
                onClick={onOpenCms}
                className="px-4 py-2.5 rounded-sm bg-[#B48C4E] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer hover:bg-[#967540] shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Manage Database / CMS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Control Bar: View Mode Selector & Results Summary */}
        <div className="bg-white border border-slate-200 rounded-sm p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
          <div className="text-slate-600 font-medium flex items-center gap-2">
            <span>Showing <strong className="text-[#0F172A] font-bold">{filteredProperties.length}</strong> matching property listings</span>
            {compareIds.length > 0 && (
              <span className="bg-[#0F172A] text-[#B48C4E] px-2 py-0.5 rounded-sm font-bold text-[10px]">
                {compareIds.length} in Compare Tray
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1 text-xs text-slate-900 focus:outline-none font-medium cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="beds">Most Bedrooms</option>
              </select>
            </div>

            {/* View Mode Selector */}
            <div className="flex bg-slate-100 p-1 rounded-sm border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'grid' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:text-black'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'list' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:text-black'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'map' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:text-black'
                }`}
                title="Map View"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#B48C4E]" />
                <span className="hidden sm:inline">Map</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'split' ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-600 hover:text-black'
                }`}
                title="Split Map & List"
              >
                <Columns className="w-3.5 h-3.5 text-[#B48C4E]" />
                <span className="hidden sm:inline">Split</span>
              </button>
            </div>
          </div>
        </div>

        {/* FULL MAP VIEW MODE */}
        {viewMode === 'map' && (
          <div className="space-y-4">
            <HouzezPropertyMap
              properties={filteredProperties}
              onSelectProperty={onSelectProperty}
              hoveredPropertyId={hoveredPropertyId}
            />
          </div>
        )}

        {/* SPLIT VIEW MODE (Map + Cards side by side) */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 sticky top-20 h-[550px]">
              <HouzezPropertyMap
                properties={filteredProperties}
                onSelectProperty={onSelectProperty}
                hoveredPropertyId={hoveredPropertyId}
              />
            </div>
            <div className="lg:col-span-7 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {filteredProperties.map(prop => (
                <div
                  key={prop.id}
                  onMouseEnter={() => setHoveredPropertyId(prop.id)}
                  onMouseLeave={() => setHoveredPropertyId(null)}
                >
                  <PropertyCard
                    property={prop}
                    onSelect={onSelectProperty}
                    isSaved={savedPropertyIds.includes(prop.id)}
                    onToggleSave={onToggleSaveProperty}
                    isCompared={compareIds.includes(prop.id)}
                    onToggleCompare={onToggleCompare}
                    viewMode="list"
                    onScheduleViewing={onScheduleViewing}
                    currency={currency}
                    unit={unit}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STANDARD GRID & LIST LAYOUT WITH FILTER SIDEBAR */}
        {(viewMode === 'grid' || viewMode === 'list') && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Filter Column */}
            <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-5 h-fit shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#B48C4E]" />
                  <span>Filter Listings</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#B48C4E] hover:underline cursor-pointer font-bold uppercase"
                >
                  Reset All
                </button>
              </div>

              {/* Search Query Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Search Keyword / Ref</label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Street, town, reference..."
                    value={filter.searchQuery}
                    onChange={e => setFilter({ ...filter, searchQuery: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm pl-8 pr-3 py-2 text-xs text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Listing Type</label>
                <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-sm border border-slate-200 text-xs">
                  {(['All', 'Buy', 'Rent', 'Commercial'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilter({ ...filter, category: cat })}
                      className={`py-1.5 px-2 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        filter.category === cat
                          ? 'bg-[#0F172A] text-white shadow-sm'
                          : 'text-slate-600 hover:text-black'
                      }`}
                    >
                      {cat === 'Buy' ? 'Sales' : cat === 'Rent' ? 'To Let' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Area / Location</label>
                <select
                  value={filter.location}
                  onChange={e => setFilter({ ...filter, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs text-slate-900 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
                >
                  <option value="">All Areas in Newry & Mourne</option>
                  <option value="Newry">Newry City</option>
                  <option value="Camlough">Camlough</option>
                  <option value="Warrenpoint">Warrenpoint</option>
                  <option value="Rostrevor">Rostrevor</option>
                  <option value="Bessbrook">Bessbrook</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Property Style</label>
                <select
                  value={filter.propertyType}
                  onChange={e => setFilter({ ...filter, propertyType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs text-slate-900 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
                >
                  <option value="">All Styles</option>
                  <option value="Detached House">Detached House</option>
                  <option value="Semi-Detached">Semi-Detached</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Min Bedrooms</label>
                <select
                  value={filter.minBedrooms}
                  onChange={e => setFilter({ ...filter, minBedrooms: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-xs text-slate-900 focus:border-[#B48C4E] focus:outline-none font-medium cursor-pointer"
                >
                  <option value={0}>Any Bedrooms</option>
                  <option value={1}>1+ Beds</option>
                  <option value={2}>2+ Beds</option>
                  <option value={3}>3+ Beds</option>
                  <option value={4}>4+ Beds</option>
                </select>
              </div>

              {/* Valuation CTA Banner */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs text-slate-700 font-bold block">Thinking of selling?</span>
                <button
                  onClick={onOpenValuation}
                  className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-2.5 px-3 rounded-sm text-xs uppercase tracking-wider cursor-pointer text-center block shadow-sm"
                >
                  Book a Free Valuation
                </button>
              </div>
            </div>

            {/* Right Properties Grid Column */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Properties Display */}
              {filteredProperties.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                  {filteredProperties.map(property => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={onSelectProperty}
                      isSaved={savedPropertyIds.includes(property.id)}
                      onToggleSave={onToggleSaveProperty}
                      isCompared={compareIds.includes(property.id)}
                      onToggleCompare={onToggleCompare}
                      viewMode={viewMode}
                      onScheduleViewing={onScheduleViewing}
                      currency={currency}
                      unit={unit}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-sm p-12 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-[#B48C4E] flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#0F172A]">No Properties Found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No matching property listings fit your current criteria. Try resetting filters or browsing all sales and lettings.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-[#B48C4E] text-white font-bold px-4 py-2 rounded-sm text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

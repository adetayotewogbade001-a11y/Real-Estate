import React, { useState } from 'react';
import { Search, MapPin, Home, PoundSterling, BedDouble, Filter } from 'lucide-react';
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
  const handleCategoryChange = (category: 'All' | 'Buy' | 'Rent' | 'Commercial') => {
    setFilter(prev => ({ ...prev, category }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className={`bg-white shadow-xl rounded-sm p-6 sm:p-8 border border-slate-100 text-slate-900 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0F172A] flex items-center gap-2">
            <Search className="w-5 h-5 text-[#B48C4E]" />
            <span>Find Your Next Property</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse homes, rentals, and commercial properties across Newry and Mourne
          </p>
        </div>

        {/* Category Tabs: Buy / Rent / Commercial */}
        <div className="flex bg-slate-100 p-1 rounded-sm border border-slate-200 self-start md:self-auto">
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

      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Query / Area */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Location / Area
          </label>
          <select
            value={filter.location}
            onChange={e => setFilter(prev => ({ ...prev, location: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium"
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
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Property Type
          </label>
          <select
            value={filter.propertyType}
            onChange={e => setFilter(prev => ({ ...prev, propertyType: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium"
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

        {/* Max Price */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Maximum Price
          </label>
          <select
            value={filter.maxPrice}
            onChange={e => setFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium"
          >
            <option value={0}>No Limit</option>
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
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Min Bedrooms
          </label>
          <select
            value={filter.minBedrooms}
            onChange={e => setFilter(prev => ({ ...prev, minBedrooms: Number(e.target.value) }))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium"
          >
            <option value={0}>Any Beds</option>
            <option value={1}>1+ Bedrooms</option>
            <option value={2}>2+ Bedrooms</option>
            <option value={3}>3+ Bedrooms</option>
            <option value={4}>4+ Bedrooms</option>
          </select>
        </div>

        {/* Search Submit CTA */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

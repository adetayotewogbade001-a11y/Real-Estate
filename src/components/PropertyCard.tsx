import React from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Building2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Property, CurrencyOption, UnitOption } from '../types';
import { formatPrice, formatArea } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isSaved?: boolean;
  onToggleSave?: (propertyId: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (property: Property) => void;
  viewMode?: 'grid' | 'list';
  onScheduleViewing?: (property: Property) => void;
  currency?: CurrencyOption;
  unit?: UnitOption;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isSaved = false,
  onToggleSave,
  isCompared = false,
  onToggleCompare,
  viewMode = 'grid',
  onScheduleViewing,
  currency = { code: 'GBP', symbol: '£', rateToGBP: 1.0, label: 'GBP' } as CurrencyOption,
  unit = 'sqft' as UnitOption
}) => {
  const displayPrice = currency ? formatPrice(property.price, currency) : property.priceText;
  const displayArea = formatArea(property.sqft, unit);

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'For Sale':
        return 'bg-[#0F172A] text-white';
      case 'To Let':
        return 'bg-[#B48C4E] text-white';
      case 'Commercial':
        return 'bg-slate-500 text-white';
      case 'New Release':
        return 'bg-amber-600 text-white';
      case 'Under Offer':
      case 'Sold STC':
        return 'bg-slate-400 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  // LIST VIEW LAYOUT (Horizontal Card)
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row group">
        
        {/* Left Image Section */}
        <div className="relative w-full sm:w-64 h-48 sm:h-auto bg-slate-100 flex-shrink-0 overflow-hidden">
          <img
            src={property.mainImage}
            alt={property.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm ${getStatusBadgeStyle(property.status)}`}>
              {property.status}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 backdrop-blur-sm px-2 py-1 rounded-sm border border-slate-200">
              {property.type}
            </span>
          </div>

          <div className="absolute bottom-2 right-2 z-10">
            <span className="text-[10px] text-white bg-slate-900/80 px-2 py-0.5 rounded-sm font-mono">
              Ref: {property.reference}
            </span>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-medium text-slate-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B48C4E]" />
                  <span>{property.address.street}, {property.address.town} ({property.address.postcode})</span>
                </p>

                <h3 
                  onClick={() => onSelect(property)}
                  className="font-bold text-base text-[#0F172A] group-hover:text-[#B48C4E] transition-colors cursor-pointer font-serif leading-snug"
                >
                  {property.title}
                </h3>
              </div>

              <p className="text-xl font-serif font-bold text-[#B48C4E] text-right flex-shrink-0">
                {displayPrice}{property.category === 'Rent' ? '/mo' : ''}
              </p>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Specs & Actions Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-slate-600 font-medium">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1" title="Bedrooms">
                  <Bed className="w-4 h-4 text-[#B48C4E]" />
                  <span>{property.bedrooms} Beds</span>
                </span>
              )}

              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1" title="Bathrooms">
                  <Bath className="w-4 h-4 text-[#B48C4E]" />
                  <span>{property.bathrooms} Baths</span>
                </span>
              )}

              {property.sqft && property.sqft > 0 && (
                <span className="flex items-center gap-1" title="Area">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B48C4E]" />
                  <span>{displayArea}</span>
                </span>
              )}

              {property.epcRating && (
                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  EPC {property.epcRating}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {onToggleCompare && (
                <button
                  onClick={() => onToggleCompare(property)}
                  className={`px-2.5 py-1.5 rounded-sm border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isCompared
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#B48C4E]'
                  }`}
                  title="Compare listing"
                >
                  {isCompared ? '⇄ Compared' : '⇄ Compare'}
                </button>
              )}

              {onToggleSave && (
                <button
                  onClick={() => onToggleSave(property.id)}
                  className={`p-1.5 rounded-sm border transition-all cursor-pointer ${
                    isSaved
                      ? 'bg-[#B48C4E] text-white border-[#B48C4E]'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#B48C4E]'
                  }`}
                  title={isSaved ? 'Saved' : 'Save property'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              )}

              {onScheduleViewing && (
                <button
                  onClick={() => onScheduleViewing(property)}
                  className="px-3 py-1.5 bg-[#B48C4E] hover:bg-[#967540] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Tour</span>
                </button>
              )}

              <button
                onClick={() => onSelect(property)}
                className="px-3 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD GRID VIEW LAYOUT
  return (
    <div className="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Property Image Container */}
      <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
        <img
          src={property.mainImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 z-10">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm ${getStatusBadgeStyle(property.status)}`}>
            {property.status}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 backdrop-blur-sm px-2 py-1 rounded-sm border border-slate-200">
            {property.type}
          </span>
        </div>

        {/* Action Controls (Save + Compare) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              className={`px-2 py-1 rounded-sm text-[9px] font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                isCompared
                  ? 'bg-[#0F172A] text-white shadow-md border border-[#B48C4E]'
                  : 'bg-white/80 text-slate-800 hover:bg-white border border-slate-200'
              }`}
              title="Compare property"
            >
              ⇄ {isCompared ? 'Compared' : 'Compare'}
            </button>
          )}

          {onToggleSave && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                isSaved
                  ? 'bg-[#B48C4E] text-white shadow-md'
                  : 'bg-white/80 text-slate-700 hover:text-black hover:bg-white'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          )}
        </div>

        {/* Bottom Image Overlay: Ref Tag */}
        <div className="absolute bottom-2 right-2 z-10">
          <span className="text-[10px] text-white bg-slate-900/80 px-2 py-0.5 rounded-sm font-mono">
            Ref: {property.reference}
          </span>
        </div>
      </div>

      {/* Property Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Location */}
          <p className="text-[11px] font-medium text-slate-500 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B48C4E]" />
            <span>{property.address.street}, {property.address.town}</span>
          </p>

          {/* Title */}
          <h3 
            onClick={() => onSelect(property)}
            className="font-bold text-sm text-[#0F172A] group-hover:text-[#B48C4E] transition-colors line-clamp-1 cursor-pointer font-serif"
          >
            {property.title}
          </h3>

          {/* Price */}
          <p className="text-lg font-serif font-bold text-[#B48C4E] mt-1">
            {displayPrice}{property.category === 'Rent' ? '/mo' : ''}
          </p>
        </div>

        {/* Property Key Specs */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
          <div className="flex space-x-3">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1" title="Bedrooms">
                <Bed className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bedrooms} Bed</span>
              </span>
            )}

            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1" title="Bathrooms">
                <Bath className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.bathrooms} Bath</span>
              </span>
            )}

            {property.sqft && property.sqft > 0 && (
              <span className="flex items-center gap-1 hidden sm:flex" title="Square Feet">
                <Maximize2 className="w-3 h-3 text-slate-400" />
                <span>{displayArea}</span>
              </span>
            )}
          </div>

          <button
            onClick={() => onSelect(property)}
            className="text-[#0F172A] font-bold uppercase tracking-tighter hover:text-[#B48C4E] transition-colors flex items-center gap-0.5 cursor-pointer text-xs"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};


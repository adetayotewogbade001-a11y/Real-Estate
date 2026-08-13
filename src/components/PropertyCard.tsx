import React from 'react';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Building2,
  Tag
} from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  isSaved?: boolean;
  onToggleSave?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isSaved = false,
  onToggleSave
}) => {
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

        {/* Favorite Bookmark Button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
              isSaved
                ? 'bg-[#B48C4E] text-white shadow-md'
                : 'bg-white/80 text-slate-700 hover:text-black hover:bg-white'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save property'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        )}

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
            {property.priceText}
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
                <span>{property.sqft} sq ft</span>
              </span>
            )}
          </div>

          <button
            onClick={() => onSelect(property)}
            className="text-[#0F172A] font-bold uppercase tracking-tighter hover:text-[#B48C4E] transition-colors flex items-center gap-0.5 cursor-pointer"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

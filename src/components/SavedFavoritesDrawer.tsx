import React from 'react';
import { X, Heart, Trash2, ArrowRight, ExternalLink, Bed, Bath, MapPin, Building2 } from 'lucide-react';
import { Property } from '../types';

interface SavedFavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onSelectProperty: (property: Property) => void;
  onToggleCompare?: (property: Property) => void;
  compareIds?: string[];
}

export const SavedFavoritesDrawer: React.FC<SavedFavoritesDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveFavorite,
  onClearAll,
  onSelectProperty,
  onToggleCompare,
  compareIds = []
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#B48C4E] fill-[#B48C4E]" />
            <div>
              <h2 className="text-base font-serif font-bold text-white">Saved Properties</h2>
              <p className="text-[11px] text-slate-300">
                {savedProperties.length} shortlisted listing{savedProperties.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedProperties.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold uppercase tracking-wider px-2 py-1 bg-red-950/40 rounded border border-red-800/40 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Heart className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-sm font-serif font-bold text-[#0F172A]">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any property card to save homes for easy comparison and viewing.
              </p>
            </div>
          ) : (
            savedProperties.map((property) => {
              const isCompared = compareIds.includes(property.id);
              return (
                <div 
                  key={property.id}
                  className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm hover:border-[#B48C4E] transition-all flex gap-3 group relative"
                >
                  {/* Thumbnail */}
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-24 h-24 object-cover rounded-sm flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#B48C4E]">
                          {property.status}
                        </span>
                        <button
                          onClick={() => onRemoveFavorite(property.id)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 
                        onClick={() => {
                          onClose();
                          onSelectProperty(property);
                        }}
                        className="font-bold text-xs text-[#0F172A] hover:text-[#B48C4E] cursor-pointer line-clamp-1 font-serif"
                      >
                        {property.title}
                      </h4>

                      <p className="text-xs font-serif font-bold text-[#B48C4E] mt-0.5">
                        {property.priceText}
                      </p>

                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{property.address.street}, {property.address.town}</span>
                      </p>
                    </div>

                    {/* Quick Action Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-semibold text-slate-600">
                      <span>{property.bedrooms} Beds • {property.type}</span>
                      
                      <div className="flex items-center gap-2">
                        {onToggleCompare && (
                          <button
                            onClick={() => onToggleCompare(property)}
                            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider cursor-pointer border ${
                              isCompared 
                                ? 'bg-[#0F172A] text-white border-[#0F172A]' 
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#B48C4E]'
                            }`}
                          >
                            {isCompared ? 'Compared ✓' : '+ Compare'}
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProperty(property);
                          }}
                          className="text-[#0F172A] font-bold hover:text-[#B48C4E] flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
          >
            Continue Browsing Properties
          </button>
        </div>

      </div>
    </div>
  );
};

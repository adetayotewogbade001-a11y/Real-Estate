import React from 'react';
import { 
  X, 
  Trash2, 
  Check, 
  Bed, 
  Bath, 
  Maximize2, 
  Building2, 
  ShieldCheck, 
  Tag, 
  MapPin, 
  ExternalLink,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Property } from '../types';

interface PropertyCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareProperties: Property[];
  onRemoveFromCompare: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onClearAll: () => void;
}

const ALL_AMENITIES = [
  'Four double bedrooms (Master with en-suite)',
  'Spacious open-plan kitchen & sunroom',
  'Oil fired central heating & uPVC double glazing',
  'Landscaped rear garden with paved patio area',
  'Tarmac driveway with ample off-street parking',
  'Detached garage with electric roller door',
  'Gas central heating',
  'Enclosed rear lawn with mountain views',
  'Waterfront views over Newry Canal',
  'Private balcony accessible from living area',
  'Gated courtyard with allocated parking space',
  'Intercom system & lift access'
];

export const PropertyCompareModal: React.FC<PropertyCompareModalProps> = ({
  isOpen,
  onClose,
  compareProperties,
  onRemoveFromCompare,
  onSelectProperty,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900 relative flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold text-sm">
              ⇄
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Property Comparison Matrix
              </h2>
              <p className="text-xs text-slate-300">
                Comparing {compareProperties.length} selected property listing{compareProperties.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareProperties.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors px-2 py-1 bg-red-950/40 border border-red-800/40 rounded-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Matrix</span>
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-x-auto">
          {compareProperties.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#0F172A]">No properties selected for comparison</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Click the <span className="font-bold text-[#B48C4E]">"⇄ Compare"</span> button on any property listing to add up to 4 properties into this comparison table.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <table className="w-full border-collapse border border-slate-200 text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="bg-slate-50 border border-slate-200 p-3 text-left w-48 font-bold text-[#0F172A] font-serif uppercase tracking-wider text-[11px]">
                      Property Attribute
                    </th>
                    {compareProperties.map((prop) => (
                      <th key={prop.id} className="bg-white border border-slate-200 p-3 text-left align-top min-w-[200px] relative">
                        <button
                          onClick={() => onRemoveFromCompare(prop.id)}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                          title="Remove property"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="space-y-2 pr-6">
                          <img
                            src={prop.mainImage}
                            alt={prop.title}
                            className="w-full h-28 object-cover rounded-sm border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#0F172A] text-white inline-block">
                            {prop.status}
                          </span>
                          <h4 
                            onClick={() => {
                              onClose();
                              onSelectProperty(prop);
                            }}
                            className="font-bold font-serif text-[#0F172A] hover:text-[#B48C4E] transition-colors cursor-pointer line-clamp-2 leading-snug"
                          >
                            {prop.title}
                          </h4>
                          <p className="text-[#B48C4E] font-bold text-sm font-serif">
                            {prop.priceText}
                          </p>
                          <button
                            onClick={() => {
                              onClose();
                              onSelectProperty(prop);
                            }}
                            className="w-full bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-[10px] uppercase tracking-wider py-1.5 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span>Inspect Specs</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* Reference ID */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Reference ID</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 font-mono text-xs text-slate-800">{p.reference}</td>
                    ))}
                  </tr>

                  {/* Category & Type */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Category / Type</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 text-slate-800 font-medium">
                        {p.category} • {p.type}
                      </td>
                    ))}
                  </tr>

                  {/* Address */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Location</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 text-slate-800">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#B48C4E] flex-shrink-0 mt-0.5" />
                          <span>{p.address.street}, {p.address.town} ({p.address.postcode})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Bedrooms</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 font-bold text-slate-800">
                        {p.bedrooms > 0 ? `${p.bedrooms} Beds` : 'N/A (Commercial)'}
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Bathrooms</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 font-bold text-slate-800">
                        {p.bathrooms > 0 ? `${p.bathrooms} Baths` : 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* Floor Area */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Floor Area</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 font-semibold text-slate-800">
                        {p.sqft ? `${p.sqft.toLocaleString()} sq ft` : 'Unspecified'}
                      </td>
                    ))}
                  </tr>

                  {/* EPC Rating */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">EPC Energy Rating</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200">
                        {p.epcRating ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300 inline-block">
                            {p.epcRating}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Exempt / Pending</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Tenure / Rates */}
                  <tr>
                    <td className="bg-slate-50 p-3 font-semibold text-slate-700 border border-slate-200">Tenure / Rates</td>
                    {compareProperties.map(p => (
                      <td key={p.id} className="p-3 border border-slate-200 text-xs text-slate-700">
                        <div>{p.tenure || 'Freehold'}</div>
                        <div className="text-slate-500">{p.rates || 'Standard Rates'}</div>
                      </td>
                    ))}
                  </tr>

                  {/* Features Matrix Header */}
                  <tr>
                    <td colSpan={compareProperties.length + 1} className="bg-[#0F172A] text-white font-bold p-2.5 text-xs font-serif uppercase tracking-wider">
                      Key Features & Amenities Comparison
                    </td>
                  </tr>

                  {/* Selected Features Checklist */}
                  {ALL_AMENITIES.slice(0, 6).map((amenity, idx) => (
                    <tr key={idx}>
                      <td className="bg-slate-50 p-3 font-medium text-slate-700 border border-slate-200 text-xs">
                        {amenity}
                      </td>
                      {compareProperties.map(p => {
                        const hasFeature = p.features.some(f => f.toLowerCase().includes(amenity.slice(0, 10).toLowerCase()));
                        return (
                          <td key={p.id} className="p-3 border border-slate-200 text-center">
                            {hasFeature ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                                <Check className="w-4 h-4" />
                              </div>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>* All property specs sourced directly from Licensed NAEA database for Newry & Mourne.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-[#0F172A] text-white font-bold uppercase tracking-wider text-xs hover:bg-[#B48C4E] transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};

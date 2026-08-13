import React from 'react';
import { X, ArrowRight, Layers } from 'lucide-react';
import { Property } from '../types';

interface PropertyCompareBarProps {
  compareProperties: Property[];
  onOpenCompareModal: () => void;
  onRemoveProperty: (id: string) => void;
  onClearAll: () => void;
}

export const PropertyCompareBar: React.FC<PropertyCompareBarProps> = ({
  compareProperties,
  onOpenCompareModal,
  onRemoveProperty,
  onClearAll,
}) => {
  if (compareProperties.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#0F172A] text-white rounded-sm shadow-2xl border border-slate-700/80 p-3 sm:p-4 max-w-4xl w-[92%] sm:w-auto animate-bounceIn flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 backdrop-blur-md">
      
      {/* Title & Count */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold text-sm">
          ⇄
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] block">
            Houzez Compare Tray
          </span>
          <span className="text-xs sm:text-sm font-bold text-white">
            {compareProperties.length} of 4 Properties
          </span>
        </div>
      </div>

      {/* Thumbnails list */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
        {compareProperties.map((prop) => (
          <div
            key={prop.id}
            className="relative flex-shrink-0 group bg-slate-800 rounded-sm p-1 border border-slate-700 flex items-center gap-2 pr-2"
          >
            <img
              src={prop.mainImage}
              alt={prop.title}
              className="w-9 h-9 object-cover rounded-xs"
              referrerPolicy="no-referrer"
            />
            <div className="hidden md:block text-left">
              <p className="text-[10px] font-bold text-white line-clamp-1 max-w-[100px]">
                {prop.title}
              </p>
              <p className="text-[9px] text-[#B48C4E] font-bold">
                {prop.priceText}
              </p>
            </div>
            <button
              onClick={() => onRemoveProperty(prop.id)}
              className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
              title="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          onClick={onOpenCompareModal}
          className="flex-1 sm:flex-initial bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
        >
          <span>Compare Now ({compareProperties.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onClearAll}
          className="text-slate-400 hover:text-white text-[10px] uppercase tracking-wider font-semibold underline px-2 cursor-pointer"
        >
          Clear
        </button>
      </div>

    </div>
  );
};

import React from 'react';
import { Globe, DollarSign, RefreshCw, Layers } from 'lucide-react';
import { CurrencyOption, UnitOption } from '../types';
import { CURRENCY_RATES } from '../data/portalData';

interface MultiCurrencyBarProps {
  selectedCurrency: CurrencyOption;
  onCurrencyChange: (currency: CurrencyOption) => void;
  selectedUnit: UnitOption;
  onUnitChange: (unit: UnitOption) => void;
}

export const MultiCurrencyBar: React.FC<MultiCurrencyBarProps> = ({
  selectedCurrency,
  onCurrencyChange,
  selectedUnit,
  onUnitChange,
}) => {
  return (
    <div className="bg-[#0B1120] text-slate-300 border-b border-slate-800 text-[11px] py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 shadow-inner">
      
      {/* Left: Global Investor Banner & Live Exchange Rate */}
      <div className="flex items-center gap-3 text-slate-400">
        <div className="flex items-center gap-1.5 text-[#B48C4E] font-medium">
          <Globe className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="font-bold uppercase tracking-wider text-[10px]">
            International Investor Portal
          </span>
        </div>
        <span className="hidden md:inline text-slate-600">•</span>
        <span className="hidden md:inline text-slate-400 font-mono text-[10px]">
          1 GBP = {selectedCurrency.rateToGBP.toFixed(2)} {selectedCurrency.code}
        </span>
      </div>

      {/* Right: Currency & Unit Controls */}
      <div className="flex items-center gap-4 ml-auto">
        
        {/* Currency Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-medium hidden sm:inline">Currency:</span>
          <select
            value={selectedCurrency.code}
            onChange={(e) => {
              const found = CURRENCY_RATES.find((c) => c.code === e.target.value);
              if (found) onCurrencyChange(found);
            }}
            className="bg-slate-900 border border-slate-700 text-white font-bold rounded-sm px-2 py-0.5 text-[11px] focus:outline-none focus:border-[#B48C4E] cursor-pointer"
          >
            {CURRENCY_RATES.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Unit Selector (Sq Ft / Sq Meters) */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-sm p-0.5 text-[10px] font-bold">
          <button
            onClick={() => onUnitChange('sqft')}
            className={`px-2 py-0.5 rounded-2xs transition-colors cursor-pointer ${
              selectedUnit === 'sqft'
                ? 'bg-[#B48C4E] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sq Ft
          </button>
          <button
            onClick={() => onUnitChange('sqm')}
            className={`px-2 py-0.5 rounded-2xs transition-colors cursor-pointer ${
              selectedUnit === 'sqm'
                ? 'bg-[#B48C4E] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            m²
          </button>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Building2, 
  PoundSterling, 
  Download, 
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { CurrencyOption } from '../types';
import { MARKET_ANALYTICS } from '../data/portalData';
import { formatPrice } from '../utils/formatters';

interface MarketAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyOption;
}

export const MarketAnalyticsModal: React.FC<MarketAnalyticsModalProps> = ({
  isOpen,
  onClose,
  currency
}) => {
  const [reportDownloaded, setReportDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-4xl w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Newry & Mourne Real Estate Market Index & Analytics
              </h2>
              <p className="text-xs text-slate-300">
                Official transaction data, average £/sq ft metrics, and capital appreciation trends
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          
          {/* Main Key Indexes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Avg Price / Sq Ft
              </span>
              <div className="text-xl font-serif font-bold text-[#0F172A]">
                {formatPrice(MARKET_ANALYTICS.avgPricePerSqFtGBP, currency)} / sq ft
              </div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +5.4% YoY Growth
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Avg Days to Sell
              </span>
              <div className="text-xl font-serif font-bold text-[#B48C4E]">
                {MARKET_ANALYTICS.avgDaysOnMarket} Days
              </div>
              <span className="text-[10px] text-slate-500 block">
                High buyer demand velocity
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Quarterly Sales Vol
              </span>
              <div className="text-xl font-serif font-bold text-[#0F172A]">
                {MARKET_ANALYTICS.salesVolumeGBP}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {MARKET_ANALYTICS.totalSoldQuarter} Homes Transacted
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Listings
              </span>
              <div className="text-xl font-serif font-bold text-slate-800">
                {MARKET_ANALYTICS.activeListingsCount} Units
              </div>
              <span className="text-[10px] text-slate-500 block">
                Sales & Lettings Total
              </span>
            </div>
          </div>

          {/* Visual Market Trend Graphic Bar */}
          <div className="bg-slate-900 text-white p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-serif font-bold text-[#B48C4E]">
                2024 - 2026 Housing Market Appreciation Index (Co. Down / Armagh Corridor)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Source: Land & Property Services NI</span>
            </div>

            {/* Simulated Clean Chart Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Newry City Residential</span>
                  <span className="font-bold text-emerald-400">+5.8% p.a.</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[78%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Warrenpoint & Rostrevor Coastal Homes</span>
                  <span className="font-bold text-emerald-400">+6.4% p.a.</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#B48C4E] h-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Commercial & Industrial Space</span>
                  <span className="font-bold text-emerald-400">+4.2% p.a.</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-[65%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Top Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Top Performing Location
              </span>
              <p className="font-serif font-bold text-[#0F172A] text-sm mt-0.5">
                {MARKET_ANALYTICS.topPerformingArea}
              </p>
              <p className="text-slate-500 text-[11px] mt-1">
                Driven by high demand for coastal family homes and proximity to Carlingford Lough.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Highest Demand Asset Class
              </span>
              <p className="font-serif font-bold text-[#0F172A] text-sm mt-0.5">
                {MARKET_ANALYTICS.topPropertyType}
              </p>
              <p className="text-slate-500 text-[11px] mt-1">
                First-time buyers and Dublin-Belfast commuters seeking turnkey finish.
              </p>
            </div>
          </div>

          {/* Download Official Report */}
          <div className="pt-2 border-t border-slate-200">
            {reportDownloaded ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-center text-xs font-bold">
                ✓ Q3 2026 Official Newry Real Estate Market Report Downloaded!
              </div>
            ) : (
              <button
                onClick={() => setReportDownloaded(true)}
                className="w-full bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-[#B48C4E]" />
                <span>Download Full Q3 2026 Market Analysis & Price Index PDF</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

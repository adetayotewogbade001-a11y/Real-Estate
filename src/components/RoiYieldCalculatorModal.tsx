import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Calculator, 
  Percent, 
  PoundSterling, 
  PieChart, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Building2,
  Send
} from 'lucide-react';
import { Property, CurrencyOption } from '../types';
import { formatPrice } from '../utils/formatters';

interface RoiYieldCalculatorModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyOption;
}

export const RoiYieldCalculatorModal: React.FC<RoiYieldCalculatorModalProps> = ({
  property,
  isOpen,
  onClose,
  currency
}) => {
  const [purchasePrice, setPurchasePrice] = useState<number>(property ? property.price : 220000);
  const [expectedMonthlyRent, setExpectedMonthlyRent] = useState<number>(
    property && property.category === 'Rent' ? property.price : 1100
  );
  const [annualManagementFeePercent, setAnnualManagementFeePercent] = useState<number>(8); // 8% agent fee
  const [annualInsuranceAndRates, setAnnualInsuranceAndRates] = useState<number>(1200);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25); // 25% deposit
  const [interestRatePercent, setInterestRatePercent] = useState<number>(4.5);
  const [holdingYears, setHoldingYears] = useState<number>(5);
  const [expectedAppreciationAnnualPercent, setExpectedAppreciationAnnualPercent] = useState<number>(4.0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Calculations
  const grossAnnualRent = expectedMonthlyRent * 12;
  const grossYieldPercent = purchasePrice > 0 ? (grossAnnualRent / purchasePrice) * 100 : 0;

  const annualManagementCost = (grossAnnualRent * annualManagementFeePercent) / 100;
  const totalAnnualOperatingExpenses = annualManagementCost + annualInsuranceAndRates;
  const netAnnualRentalIncome = grossAnnualRent - totalAnnualOperatingExpenses;
  const netYieldPercent = purchasePrice > 0 ? (netAnnualRentalIncome / purchasePrice) * 100 : 0;

  // Financing calculations
  const depositAmount = (purchasePrice * downPaymentPercent) / 100;
  const loanAmount = purchasePrice - depositAmount;
  const monthlyInterestPayment = (loanAmount * (interestRatePercent / 100)) / 12;
  const annualInterestPayment = monthlyInterestPayment * 12;
  
  const annualNetCashFlowFinanced = netAnnualRentalIncome - annualInterestPayment;
  const cashOnCashYieldPercent = depositAmount > 0 ? (annualNetCashFlowFinanced / depositAmount) * 100 : 0;

  // 5-Year Capital Growth Projection
  const projectedFutureValue = purchasePrice * Math.pow(1 + expectedAppreciationAnnualPercent / 100, holdingYears);
  const projectedTotalCapitalGain = projectedFutureValue - purchasePrice;
  const total5YearReturn = projectedTotalCapitalGain + (annualNetCashFlowFinanced * holdingYears);

  const handleDownloadReport = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-4xl w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Investor ROI & Rental Yield Calculator
              </h2>
              <p className="text-xs text-slate-300">
                {property ? `Targeting: ${property.title}` : 'Proposing Investment Yield for Newry & Mourne Real Estate'}
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
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[82vh] overflow-y-auto">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#B48C4E]" />
              <span>Investment Parameters</span>
            </h3>

            {/* Purchase Price Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Property Purchase Price ({currency.code})
              </label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                {formatPrice(purchasePrice, currency)}
              </p>
            </div>

            {/* Monthly Rental Income */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Monthly Rent ({currency.code})
              </label>
              <input
                type="number"
                value={expectedMonthlyRent}
                onChange={(e) => setExpectedMonthlyRent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                Gross Annual Rental Income: {formatPrice(grossAnnualRent, currency)}/yr
              </p>
            </div>

            {/* Operating Expenses */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Agent Management Fee (%)
                </label>
                <input
                  type="number"
                  value={annualManagementFeePercent}
                  onChange={(e) => setAnnualManagementFeePercent(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Rates & Insurance ({currency.code})
                </label>
                <input
                  type="number"
                  value={annualInsuranceAndRates}
                  onChange={(e) => setAnnualInsuranceAndRates(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>
            </div>

            {/* Mortgage Financing Assumptions */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
              <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider block">
                Buy-to-Let Mortgage Assumptions
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Deposit % ({downPaymentPercent}%)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-[#B48C4E] cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 font-bold block">
                    Cash Deposit: {formatPrice(depositAmount, currency)}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRatePercent}
                    onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-sm px-2.5 py-1 text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Holding Period & Capital Gain */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Investment Horizon (Years)
                </label>
                <select
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2 text-xs font-bold"
                >
                  <option value={3}>3 Years</option>
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Est. Annual Appreciation (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={expectedAppreciationAnnualPercent}
                  onChange={(e) => setExpectedAppreciationAnnualPercent(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2 text-xs font-bold"
                />
              </div>
            </div>

          </div>

          {/* Right Metrics Output Column */}
          <div className="lg:col-span-6 space-y-4 bg-slate-900 text-white p-5 rounded-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B48C4E]">
                  Financial Performance Summary
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  Newry Market Baseline
                </span>
              </div>

              {/* Main Key Highlights Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-sm space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Gross Rental Yield
                  </span>
                  <div className="text-2xl font-serif font-bold text-emerald-400">
                    {grossYieldPercent.toFixed(2)}%
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    {formatPrice(grossAnnualRent, currency)} / yr
                  </span>
                </div>

                <div className="bg-slate-800/90 border border-slate-700/80 p-3 rounded-sm space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Net Rental Yield
                  </span>
                  <div className="text-2xl font-serif font-bold text-[#B48C4E]">
                    {netYieldPercent.toFixed(2)}%
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    After management & fees
                  </span>
                </div>
              </div>

              {/* Secondary Breakdown */}
              <div className="space-y-2 text-xs bg-slate-800/40 p-3 rounded-sm border border-slate-800">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Net Operating Income (NOI):</span>
                  <span className="font-bold text-white">{formatPrice(netAnnualRentalIncome, currency)}/yr</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Est. Mortgage Interest:</span>
                  <span className="font-bold text-red-300">-{formatPrice(annualInterestPayment, currency)}/yr</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Net Cash Flow (Financed):</span>
                  <span className="font-bold text-emerald-400">{formatPrice(annualNetCashFlowFinanced, currency)}/yr</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Cash-on-Cash Return:</span>
                  <span className="font-bold text-[#B48C4E]">{cashOnCashYieldPercent.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-300 font-bold">Est. {holdingYears}-Yr Total ROI:</span>
                  <span className="font-bold text-emerald-400">{formatPrice(total5YearReturn, currency)}</span>
                </div>
              </div>

              {/* Capital Appreciation Highlight */}
              <div className="bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-sm text-xs space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">
                  Projected Capital Gain ({holdingYears} Years)
                </span>
                <p className="text-sm font-serif font-bold text-white">
                  +{formatPrice(projectedTotalCapitalGain, currency)}
                </p>
                <p className="text-[10px] text-slate-300">
                  Estimated future valuation: {formatPrice(projectedFutureValue, currency)}
                </p>
              </div>
            </div>

            {/* Email / Download Report Request */}
            <div className="pt-3 border-t border-slate-800">
              {downloadSuccess ? (
                <div className="bg-emerald-900/50 border border-emerald-700 p-2.5 rounded text-center text-xs text-emerald-200 font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>PDF Investment Report Downloaded!</span>
                </div>
              ) : (
                <button
                  onClick={handleDownloadReport}
                  className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Complete Investment Prospectus (PDF)</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

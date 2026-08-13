import React, { useState } from 'react';
import { Calculator, PoundSterling, Percent, Calendar, RefreshCw } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
  isRental?: boolean;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  initialPrice = 250000,
  isRental = false
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [depositPercent, setDepositPercent] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [termYears, setTermYears] = useState<number>(25);

  const depositAmount = (propertyPrice * depositPercent) / 100;
  const loanAmount = propertyPrice - depositAmount;

  // Monthly mortgage calculation formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const calculateMonthly = () => {
    if (isRental) {
      return propertyPrice; // for rental, price is already monthly
    }
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = termYears * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const monthly =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return isNaN(monthly) ? 0 : Math.round(monthly);
  };

  const monthlyPayment = calculateMonthly();

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-sm p-5 sm:p-6 text-slate-900 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h4 className="text-sm sm:text-base font-bold font-serif text-[#0F172A] flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#B48C4E]" />
          <span>{isRental ? 'Rental Affordability Summary' : 'Mortgage Repayment Estimator'}</span>
        </h4>
        <span className="text-[10px] uppercase tracking-wider text-[#B48C4E] bg-[#B48C4E]/10 border border-[#B48C4E]/20 px-2 py-0.5 rounded-sm font-semibold">
          Est. Repayments
        </span>
      </div>

      {!isRental ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Property Price Input */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Property Price (£)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">£</span>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-white border border-slate-300 rounded-sm pl-7 pr-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                />
              </div>
            </div>

            {/* Deposit Percentage */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Deposit ({depositPercent}% = £{depositAmount.toLocaleString()})
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={depositPercent}
                onChange={(e) => setDepositPercent(Number(e.target.value))}
                className="w-full accent-[#B48C4E] bg-slate-200 rounded-sm h-2 cursor-pointer mt-3"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Interest Rate ({interestRate}%)
              </label>
              <input
                type="range"
                min="1.0"
                max="9.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#B48C4E] bg-slate-200 rounded-sm h-2 cursor-pointer mt-3"
              />
            </div>

            {/* Term */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Mortgage Term ({termYears} Years)
              </label>
              <select
                value={termYears}
                onChange={(e) => setTermYears(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years</option>
                <option value={30}>30 Years</option>
                <option value={35}>35 Years</option>
              </select>
            </div>
          </div>

          {/* Result Box */}
          <div className="bg-white border border-[#B48C4E]/40 rounded-sm p-4 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs text-slate-500 block">Estimated Monthly Repayment</span>
              <span className="text-2xl font-bold font-serif text-[#0F172A]">
                £{monthlyPayment.toLocaleString()} <span className="text-xs font-sans text-slate-500 font-normal">/ month</span>
              </span>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <div>Loan Amount: £{loanAmount.toLocaleString()}</div>
              <div>Deposit: £{depositAmount.toLocaleString()}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white border border-slate-200 rounded-sm p-4 space-y-2 text-xs shadow-sm">
          <div className="flex justify-between items-center text-slate-700">
            <span>Monthly Rent:</span>
            <span className="text-lg font-bold text-[#0F172A] font-serif">£{propertyPrice} / mo</span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Security Deposit (1 month standard):</span>
            <span className="font-semibold text-slate-900">£{propertyPrice}</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Tenancies subject to credit & reference checks. Managed by Morgan Property Services.
          </p>
        </div>
      )}
    </div>
  );
};

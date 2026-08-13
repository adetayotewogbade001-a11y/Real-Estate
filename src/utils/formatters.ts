import { CurrencyOption, UnitOption } from '../types';

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'GBP', symbol: '£', rateToGBP: 1.0, label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', rateToGBP: 1.17, label: 'EUR (€)' },
  { code: 'USD', symbol: '$', rateToGBP: 1.28, label: 'USD ($)' },
  { code: 'AED', symbol: 'AED', rateToGBP: 4.70, label: 'AED' },
];

export const formatPrice = (priceInGBP: number, currency: CurrencyOption): string => {
  if (!priceInGBP || isNaN(priceInGBP)) return 'Price on Application';
  
  const converted = Math.round(priceInGBP * currency.rateToGBP);

  if (currency.code === 'GBP') {
    return `£${converted.toLocaleString()}`;
  }
  if (currency.code === 'EUR') {
    return `€${converted.toLocaleString()}`;
  }
  if (currency.code === 'USD') {
    return `$${converted.toLocaleString()}`;
  }
  if (currency.code === 'AED') {
    return `AED ${converted.toLocaleString()}`;
  }

  return `${currency.symbol}${converted.toLocaleString()}`;
};

export const formatArea = (sqftIn: number | undefined, unit: UnitOption): string => {
  if (!sqftIn || isNaN(sqftIn)) return 'Unspecified';
  
  if (unit === 'sqm') {
    const sqm = Math.round(sqftIn * 0.092903);
    return `${sqm.toLocaleString()} m²`;
  }

  return `${sqftIn.toLocaleString()} sq ft`;
};

export type PropertyStatus = 'For Sale' | 'To Let' | 'Commercial' | 'Under Offer' | 'New Release' | 'Sold STC';

export type PropertyCategory = 'Buy' | 'Rent' | 'Commercial';

export type PropertyType = 
  | 'Detached House'
  | 'Semi-Detached'
  | 'Townhouse'
  | 'Apartment'
  | 'Bungalow'
  | 'Commercial Office'
  | 'Retail Unit'
  | 'Industrial / Warehouse'
  | 'Development Land';

export interface Property {
  id: string;
  reference: string;
  title: string;
  category: PropertyCategory;
  status: PropertyStatus;
  type: PropertyType;
  price: number;
  priceText: string;
  address: {
    street: string;
    area: string;
    town: string; // e.g. Newry, Warrenpoint, Camlough, Rostrevor
    postcode: string;
  };
  bedrooms: number;
  bathrooms: number;
  receptions?: number;
  sqft?: number;
  featured: boolean;
  mainImage: string;
  images: string[];
  description: string;
  features: string[];
  epcRating?: string;
  tenure?: string;
  rates?: string;
  floorplanUrl?: string;
  agentName?: string;
  addedDate: string;
  propertyAge?: 'New Build' | 'Under 5 Years' | '5-10 Years' | '10-20 Years' | 'Period / Character' | string;
  landSize?: number; // in Acres
  landSizeText?: string;
  virtualTourUrl?: string;
  hasVirtualTour?: boolean;
}

export interface PropertyFilter {
  category: 'All' | 'Buy' | 'Rent' | 'Commercial';
  propertyType: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  searchQuery: string;
  statusFilter: string;
  propertyAge?: string;
  epcRating?: string;
  minLandSize?: number;
  hasVirtualTour?: boolean;
}

export interface ValuationRequest {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  postcode: string;
  propertyType: string;
  bedrooms: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: 
    | 'Buying'
    | 'Selling'
    | 'Letting'
    | 'Renting'
    | 'Commercial Property'
    | 'Valuation'
    | 'Property Management'
    | 'General Enquiry';
  propertyReference?: string;
  message: string;
}

export interface ViewingRequestInput {
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  buyerStatus: 'First Time Buyer' | 'Looking to Sell First' | 'Cash Buyer' | 'Investor' | 'Renter';
  message?: string;
}

export interface CurrencyOption {
  code: 'GBP' | 'EUR' | 'USD' | 'AED';
  symbol: string;
  rateToGBP: number; // Conversion factor relative to GBP (1.0)
  label: string;
}

export type UnitOption = 'sqft' | 'sqm';

export interface OffPlanProject {
  id: string;
  name: string;
  location: string;
  completionDate: string;
  progressPercent: number;
  startingPriceGBP: number;
  developer: string;
  image: string;
  totalUnits: number;
  availableUnits: number;
  paymentPlan: string;
  highlights: string[];
  description: string;
}

export interface NeighborhoodInfo {
  id: string;
  name: string;
  tagline: string;
  heroImage: string;
  avgPriceGBP: number;
  avgRentGBP: number;
  yieldPercent: number;
  schoolRating: string;
  commuteBelfastMin: number;
  commuteDublinMin: number;
  highlights: string[];
  description: string;
}

export interface MarketAnalyticsData {
  avgPricePerSqFtGBP: number;
  yoyGrowthPercent: number;
  avgDaysOnMarket: number;
  activeListingsCount: number;
  totalSoldQuarter: number;
  salesVolumeGBP: string;
  topPerformingArea: string;
  topPropertyType: string;
}

export interface PropertyService {
  id: string;
  title: string;
  category: 'Sales' | 'Lettings' | 'Commercial' | 'Management' | 'Valuation';
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

import { OffPlanProject, NeighborhoodInfo, MarketAnalyticsData, CurrencyOption } from '../types';

export const CURRENCY_RATES: CurrencyOption[] = [
  { code: 'GBP', symbol: '£', rateToGBP: 1.0, label: 'GBP (£) - British Pound' },
  { code: 'EUR', symbol: '€', rateToGBP: 1.17, label: 'EUR (€) - Euro (Ireland/EU)' },
  { code: 'USD', symbol: '$', rateToGBP: 1.28, label: 'USD ($) - US Dollar' },
  { code: 'AED', symbol: 'AED ', rateToGBP: 4.70, label: 'AED (AED) - UAE Dirham' }
];

export const MOCK_OFFPLAN_PROJECTS: OffPlanProject[] = [
  {
    id: 'offplan-001',
    name: 'Canal Basin Quarter & Marina Residences',
    location: 'Canal Bank, Newry City Centre',
    completionDate: 'Q4 2026',
    progressPercent: 42,
    startingPriceGBP: 185000,
    developer: 'Morgan Premier Developments & MJM Group',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 36,
    availableUnits: 11,
    paymentPlan: '10% Reservation • 15% On Structure • 75% On Handover',
    highlights: [
      'Waterfront balconies with Newry Canal & Slieve Gullion views',
      'Underground EV charging & secure gated parking',
      'Luxury Italian kitchens with quartz countertops',
      'A-rated EPC energy efficiency rating'
    ],
    description: 'A landmark waterfront residential development offering contemporary 1, 2, and 3-bedroom luxury apartments situated along the historic Newry Canal. Features floor-to-ceiling glazing, private balcony spaces, and ultra-low running costs.'
  },
  {
    id: 'offplan-002',
    name: 'Rostrevor Heights Luxury Executive Villas',
    location: 'Shore Road, Rostrevor, Co. Down',
    completionDate: 'Q2 2027',
    progressPercent: 25,
    startingPriceGBP: 425000,
    developer: 'Mourne Heritage Fine Homes',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 12,
    availableUnits: 4,
    paymentPlan: '15% Deposit • 15% Roofing Stage • 70% Completion',
    highlights: [
      'Exclusive gated enclave overlooking Carlingford Lough',
      '4 & 5 bedroom detached executive residences',
      'Air source heat pumps & solar PV integrated roofs',
      'Bespoke interior design packages included'
    ],
    description: 'An ultra-exclusive collection of 12 detached luxury residences in the romantic coastal village of Rostrevor. Elevated site providing panoramic sea views across Carlingford Lough to the Cooley Mountains.'
  },
  {
    id: 'offplan-003',
    name: 'Camlough Lake View Eco-Lodges & Townhouses',
    location: 'Newry Road, Camlough',
    completionDate: 'Q1 2027',
    progressPercent: 60,
    startingPriceGBP: 220000,
    developer: 'Ring of Gullion Homes',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    totalUnits: 20,
    availableUnits: 7,
    paymentPlan: '10% Deposit • 90% Mortgage or Cash on Handover',
    highlights: [
      'Direct walking distance to Camlough Lake & Village',
      'Triple glazed architectural glass & heat recovery ventilation',
      'Turnkey luxury specification with flooring & appliances',
      'Expected 6.5% gross rental return for investors'
    ],
    description: 'Modern eco-friendly 3 and 4 bedroom townhouses designed for sustainable mountain and lakeside living. Features smart home climate controls, private rear gardens, and dedicated home office pods.'
  }
];

export const MOCK_NEIGHBORHOODS: NeighborhoodInfo[] = [
  {
    id: 'neigh-001',
    name: 'Newry City Centre & Canal Quarter',
    tagline: 'Vibrant hub for commerce, shopping, and Dublin-Belfast commuter transport',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    avgPriceGBP: 195000,
    avgRentGBP: 950,
    yieldPercent: 6.8,
    schoolRating: 'Outstanding (St. Colman\'s & Sacred Heart)',
    commuteBelfastMin: 45,
    commuteDublinMin: 60,
    highlights: [
      'Direct A1/M1 dual carriageway access to Dublin & Belfast',
      'Newry Train Station with Enterprise Express service',
      'Two major shopping centres (Buttercrane & Quays)',
      'Rich historic canal towpath walking routes'
    ],
    description: 'Newry City Centre offers ideal urban living with rich history, award-winning schools, and top-tier transport links connecting Belfast and Dublin.'
  },
  {
    id: 'neigh-002',
    name: 'Warrenpoint & Rostrevor Coastal Belt',
    tagline: 'Scenic seaside living with Carlingford Lough views and vibrant promenade life',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    avgPriceGBP: 285000,
    avgRentGBP: 1100,
    yieldPercent: 5.4,
    schoolRating: 'Excellent (St. Mark\'s & Dromore Road)',
    commuteBelfastMin: 55,
    commuteDublinMin: 70,
    highlights: [
      'Kilbroney Forest Park & Rostrevor Fairy Glen',
      'Bustling seaside promenade with cafes & artisan dining',
      'Water sports, sailing club & Carlingford Lough ferry',
      'High demand for executive holiday lets & family homes'
    ],
    description: 'Renowned for its breathtaking natural beauty where the Mourne Mountains meet Carlingford Lough. A paradise for outdoor enthusiasts and luxury coastal buyers.'
  },
  {
    id: 'neigh-003',
    name: 'Camlough & Ring of Gullion AONB',
    tagline: 'Lakeside tranquility and mountain hiking just 10 minutes from Newry city',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    avgPriceGBP: 245000,
    avgRentGBP: 1000,
    yieldPercent: 5.9,
    schoolRating: 'Very Good (St. Malachy\'s Primary)',
    commuteBelfastMin: 50,
    commuteDublinMin: 65,
    highlights: [
      'Camlough Lake water sports & outdoor swimming',
      'Slieve Gullion Forest Park & Giant\'s Lair trail',
      'Tight-knit village community with local craft bakeries',
      'Fast growing demand for detached modern family homes'
    ],
    description: 'Set within an Area of Outstanding Natural Beauty, Camlough provides country lakeside living combined with rapid access to the A1 bypass.'
  },
  {
    id: 'neigh-004',
    name: 'Bessbrook Historic Model Village',
    tagline: 'Charming granite architecture, mill pond walks, and peaceful tree-lined greens',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    avgPriceGBP: 175000,
    avgRentGBP: 850,
    yieldPercent: 7.2,
    schoolRating: 'Excellent (Bessbrook Primary & St. Paul\'s)',
    commuteBelfastMin: 40,
    commuteDublinMin: 65,
    highlights: [
      'Famous 18-Arch Craigmore Viaduct landmark',
      'Quaker heritage architecture & pristine village pond',
      'Affordable entry prices with outstanding rental yields',
      'Close proximity to Newry Train Station (5 mins)'
    ],
    description: 'Bessbrook is a unique historical village built in the 19th century, offering characterful granite cottages, family parks, and great commuter value.'
  }
];

export const MARKET_ANALYTICS: MarketAnalyticsData = {
  avgPricePerSqFtGBP: 182,
  yoyGrowthPercent: 5.4,
  avgDaysOnMarket: 22,
  activeListingsCount: 148,
  totalSoldQuarter: 84,
  salesVolumeGBP: '£18.6M',
  topPerformingArea: 'Warrenpoint & Rostrevor',
  topPropertyType: '3 & 4 Bedroom Semi-Detached'
};

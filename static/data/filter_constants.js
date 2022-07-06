export const bedBathText = 'Beds & Baths';
export const priceText = 'Price';
export const homeText = 'Home Type';
export const moreText = 'More';
export const statusText = 'Status';
export const typeText = 'Type';

export const minPriceList = [
  {label: '$0+', value: ''},
  {label: '$100,000+', value: 100000},
  {label: '$200,000+', value: 200000},
  {label: '$300,000+', value: 300000},
  {label: '$400,000+', value: 400000},
  {label: '$500,000+', value: 500000},
  {label: '$600,000+', value: 600000},
  {label: '$700,000+', value: 700000},
  {label: '$800,000+', value: 800000},
  {label: '$900,000+', value: 900000},
];

export const maxPriceList = [
  {label: '$600,000', value: 600000},
  {label: '$700,000', value: 700000},
  {label: '$800,000', value: 800000},
  {label: '$900,000', value: 900000},
  {label: '$1M', value: 1000000},
  {label: '$1.25M', value: 1250000},
  {label: '$1.5M', value: 1500000},
  {label: '$1.75M', value: 1750000},
  {label: '$2M', value: 2000000},
  {label: 'Any Price', value: ''},
];

export const bedsList = [
  {label: 'Any', value: null},
  {label: '1+', value: 1},
  {label: '2+', value: 2},
  {label: '3+', value: 3},
  {label: '4+', value: 4},
  {label: '5+', value: 5},
];

export const bathsList = [
  {label: 'Any', value: null},
  {label: '1.5+', value: 1.5},
  {label: '2+', value: 2},
  {label: '3+', value: 3},
  {label: '4+', value: 4},
  {label: '5+', value: 5},
];

export const homeTypeList = [
  { label: 'Houses', value: 'Houses' },
  { label: 'Townhouse', value: 'Townhouse' },
  { label: 'Multi-Family', value: 'Multifamily' },
  { label: 'Single-Family', value: 'Single Family' },
  { label: 'Land/Commercial', value: 'Land/commercial' },
  { label: 'Apartments', value: 'Apartment' }
];

export const saleByList = [
  { label: 'Any', value: null },
  { label: 'Agent', value: 'agent' },
  { label: 'Home Owner', value: 'homeowner' },
  { label: 'Home Builder', value: 'home_builder' },
];

export const daysOnDealtyList = [
  {label: 'Any', value: null},
  {label: '1 day', value: 1},
  {label: '7 days', value: 7},
  {label: '14 days', value: 14},
  {label: '30 days', value: 30},
  {label: '90 days', value: 90},
  {label: '6 months', value: 182},
  {label: '12 months', value: 365},
  {label: '24 months', value: 730},
  {label: '36 months', value: 1095},
];

export const maxHoaList = [
  {label: 'Any', value: null},
  {label: 'No HOA Fee', value: 'false'},
  {label: '$50/month', value: 50},
  {label: '$100/month', value: 100},
  {label: '$200/month', value: 200},
  {label: '$300/month', value: 300},
  {label: '$400/month', value: 400},
  {label: '$500/month', value: 500},
  {label: '$600/month', value: 600},
  {label: '$700/month', value: 700},
  {label: '$800/month', value: 800},
  {label: '$900/month', value: 900},
  {label: '$1000/month', value: 1000},
];

export const parkingSpotsList = [
  {label: 'Any', value: null},
  {label: '1+', value: 1},
  {label: '2+', value: 2},
  {label: '3+', value: 3},
  {label: '4+', value: 4},
];

export const lotSizeList = [
  {label: 'Any', value: null},
  {label: '1,000 sqft', value: 1000},
  {label: '2,000 sqft', value: 2000},
  {label: '3,000 sqft', value: 3000},
  {label: '4,000 sqft', value: 4000},
  {label: '5,000 sqft', value: 5000},
  {label: '7,500 sqft', value: 7500},
  {label: '1/4 acre', value: 10890},
  {label: '1/2 acre', value: 21780},
  {label: '1 acre', value: 43560},
  {label: '2 acres', value: 87120},
  {label: '5 acres', value: 217800},
  {label: '10 acres', value: 435600},
  {label: '20 acres', value: 871200},
  {label: '50 acres', value: 2178000},
  {label: '100 acres', value: 4356000},
];

export const sqftList = [
  {label: 'Any', value: null},
  {label: '500', value: 500},
  {label: '750', value: 750},
  {label: '1,000', value: 1000},
  {label: '1,250', value: 1200},
  {label: '1,500', value: 1500},
  {label: '1,750', value: 1750},
  {label: '2,000', value: 2000},
  {label: '2,250', value: 2250},
  {label: '2,500', value: 2500},
  {label: '2,750', value: 2750},
  {label: '3,000', value: 3000},
  {label: '3,500', value: 3500},
  {label: '4,000', value: 4000},
  {label: '5,000', value: 5000},
  {label: '7,500', value: 7500},
];

export const sortByList = [
  {label: 'Homes for you', value: 'default'},
  {label: 'Price (Low to High)', value: 'low_to_high'},
  {label: 'Price (High to Low)', value: 'high_to_low'},
  {label: 'Newest', value: 'newest'},
];

export const statusList = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' }
];

export const listingTypeList = [
  { label: 'Rental', value: 'rental' },
  { label: 'For Sale', value: 'for_sale' }
];

export const defaultFilters = {
  status: 'active',
  listingType: 'for_sale',
};

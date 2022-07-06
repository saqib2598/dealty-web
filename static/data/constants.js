export const FILTERS_DATA = {
  PRICE: {
    MIN: 0,
    MAX: 2000000,
  },
  BEDS: [
    {
      label: '0+',
      value: 0,
    },
    {
      label: '1+',
      value: 1,
    },
    {
      label: '2+',
      value: 2,
    },
    {
      label: '3+',
      value: 3,
    },
    {
      label: '4+',
      value: 4,
    },
    {
      label: '5+',
      value: 5,
    },
    {
      label: '6+',
      value: 6,
    },
  ],
  BATHS: [
    {
      label: '0+',
      value: 0,
    },
    {
      label: '1+',
      value: 1,
    },
    {
      label: '1.5+',
      value: 1.5,
    },
    {
      label: '2+',
      value: 2,
    },
    {
      label: '3+',
      value: 3,
    },
    {
      label: '4+',
      value: 4,
    },
    {
      label: '5+',
      value: 5,
    },
    {
      label: '6+',
      value: 6,
    },
  ],
  OPEN_HOUSE: [
    {
      label: 'Today',
      value: 'today',
    },
    {
      label: 'Tomorrow',
      value: 'tomorrow',
    },
    {
      label: 'This Week',
      value: 'this-week',
    },
    {
      label: 'This Month',
      value: 'this-month',
    },
    {
      label: 'Single Custom Date',
      value: 'single-custom-date',
    },
    {
      label: 'Custom Date Range',
      value: 'custom-date-range',
    },
  ],
  PROPERTY_TYPES: [
    {
      label: 'New Build',
      value: 'NEW-HOUSE',
    },
    {
      label: 'Multi Family',
      value: 'Multi Family',
    },
    {
      label: 'Townhome',
      value: 'Townhouse',
    },
    {
      label: 'Condo',
      value: 'Condo',
    },
    {
      label: 'Single Family',
      value: 'Single Family',
    },
    {
      label: 'Land',
      value: 'Land',
    },
    {
      label: 'Mobile/Manufactured',
      value: 'MOBILE HOME',
    },
    {
      label: 'All',
      value: 'all',
    },
  ],
};

export const REASONS = [
  {
    label: 'Reason 1',
    value: 'Reason 1',
  },
  {
    label: 'Reason 2',
    value: 'Reason 2',
  },
  {
    label: 'Reason 3',
    value: 'Reason 3',
  },
  {
    label: 'Reason 4',
    value: 'Reason 4',
  },
];

export const MAP_STYLES = [
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e9e9e9',
      },
      {
        'lightness': 17,
      },
    ],
  },
  {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f5f5',
      },
      {
        'lightness': 20,
      },
    ],
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#ffffff',
      },
      {
        'lightness': 17,
      },
    ],
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#ffffff',
      },
      {
        'lightness': 29,
      },
      {
        'weight': 0.2,
      },
    ],
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ffffff',
      },
      {
        'lightness': 18,
      },
    ],
  },
  {
    'featureType': 'road.local',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ffffff',
      },
      {
        'lightness': 16,
      },
    ],
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f5f5',
      },
      {
        'lightness': 21,
      },
    ],
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dedede',
      },
      {
        'lightness': 21,
      },
    ],
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'visibility': 'on',
      },
      {
        'color': '#ffffff',
      },
      {
        'lightness': 16,
      },
    ],
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'saturation': 36,
      },
      {
        'color': '#333333',
      },
      {
        'lightness': 40,
      },
    ],
  },
  {
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off',
      },
    ],
  },
  {
    'featureType': 'transit',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f2f2f2',
      },
      {
        'lightness': 19,
      },
    ],
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#fefefe',
      },
      {
        'lightness': 20,
      },
    ],
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#fefefe',
      },
      {
        'lightness': 17,
      },
      {
        'weight': 1.2,
      },
    ],
  },
];

export const SELLER_TYPES = [
  {
    label: 'a Homeowner',
    value: 'homeowner',
  },
  {
    label: 'a Real Estate Agent',
    value: 'agent',
  },
  {
    label: 'a Home Builder',
    value: 'home_builder',
  },
  {
    label: 'an Investor - unlicensed owner of more than one property',
    value: 'investor',
  },
];

export const BUILDER = [
  {
    label: 'Toll Brothers',
    value: 'toll_brothers',
  },
  {
    label: 'PULTE Homes',
    value: 'pulte_homes',
  },
  {
    label: 'VIP Homes',
    value: 'vip_homes',
  },
  {
    label: 'Watt Communities',
    value: 'watt_communities',
  },
];

export const USER_TYPES = [
  {
    label: 'Buyer',
    value: 'buyer',
  },
  {
    label: 'Seller',
    value: 'seller',
  },
  {
    label: 'Loan Officer',
    value: 'loan-officer',
  },
];

export const OFFER_TYPES = [
  {
    label: 'Cash',
    value: 'cash',
  },
  {
    label: 'Financing',
    value: 'finance',
  },
];

export const SURVEY_QUESTIONS = [
  {
    label: 'Internet Search',
    value: 'internet_search',
  },
  {
    label: 'Email/Text',
    value: 'email/text',
  },
  {
    label: 'Radio',
    value: 'radio',
  },
  {
    label: 'TV',
    value: 'tv',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const STATES = [
  {label: 'Alaska', value: 'AK'},
  {label: 'Alabama', value: 'AL'},
  {label: 'Arkansas', value: 'AR'},
  {label: 'Arizona', value: 'AZ'},
  {label: 'California', value: 'CA'},
  {label: 'Colorado', value: 'CO'},
  {label: 'Connecticut', value: 'CT'},
  {label: 'District of Columbia', value: 'DC'},
  {label: 'Delaware', value: 'DE'},
  {label: 'Florida', value: 'FL'},
  {label: 'Georgia', value: 'GA'},
  {label: 'Hawaii', value: 'HI'},
  {label: 'Iowa', value: 'IA'},
  {label: 'Idaho', value: 'ID'},
  {label: 'Illinois', value: 'IL'},
  {label: 'Indiana', value: 'IN'},
  {label: 'Kansas', value: 'KS'},
  {label: 'Kentucky', value: 'KY'},
  {label: 'Louisiana', value: 'LA'},
  {label: 'Massachusetts', value: 'MA'},
  {label: 'Maryland', value: 'MD'},
  {label: 'Maine', value: 'ME'},
  {label: 'Michigan', value: 'MI'},
  {label: 'Minnesota', value: 'MN'},
  {label: 'Missouri', value: 'MO'},
  {label: 'Mississippi', value: 'MS'},
  {label: 'Montana', value: 'MT'},
  {label: 'North Carolina', value: 'NC'},
  {label: 'North Dakota', value: 'ND'},
  {label: 'Nebraska', value: 'NE'},
  {label: 'New Hampshire', value: 'NH'},
  {label: 'New Jersey', value: 'NJ'},
  {label: 'New Mexico', value: 'NM'},
  {label: 'Nevada', value: 'NV'},
  {label: 'New York', value: 'NY'},
  {label: 'Ohio', value: 'OH'},
  {label: 'Oklahoma', value: 'OK'},
  {label: 'Oregon', value: 'OR'},
  {label: 'Pennsylvania', value: 'PA'},
  {label: 'Rhode Island', value: 'RI'},
  {label: 'South Carolina', value: 'SC'},
  {label: 'South Dakota', value: 'SD'},
  {label: 'Tennessee', value: 'TN'},
  {label: 'Texas', value: 'TX'},
  {label: 'Utah', value: 'UT'},
  {label: 'Virginia', value: 'VA'},
  {label: 'Vermont', value: 'VT'},
  {label: 'Washington', value: 'WA'},
  {label: 'Wisconsin', value: 'WI'},
  {label: 'West Virginia', value: 'WV'},
  {label: 'Wyoming', value: 'WY'},
];

export const ICON_TYPES = {
  agent: '/static/images/agent.jpg',
  home_builder: '/static/images/hb.jpg',
  investor: '/static/images/inv.jpg',
};

export const APPOINTMENT_TYPE = [
  {
    label: 'In Person Showing',
    value: 'in_person',
  },
  {
    label: 'Virtual Showing',
    value: 'virtual',
  },
];

export const PHOTOGRAPHY_PACKAGES = [
  {
    label: 'Interior/Exterior Photo $149',
    value: 'Interior/Exterior Photo $149',
  },
  {
    label: 'Interior/Exterior Photo Plus Drone/Areal Video $199',
    value: 'Interior/Exterior Photo Plus Drone/Areal Video $199',
  },
  {
    label: 'Interior/Exterior Photo Video Walk Through Tour $275',
    value: 'Interior/Exterior Photo Video Walk Through Tour $275',
  },
];

export const FOR_SALE_FILTERS = [
  {
    label: 'Agent',
    value: 'agent',
  },
  {
    label: 'Homeowner',
    value: 'homeowner',
  },
  {
    label: 'Home Builder',
    value: 'home_builder',
  },
];
export const DAYS_ON_DEALTY = [
  {
    label: 'less than 10',
    value: 10,
  },
  {
    label: 'less than 50',
    value: 50,
  },
  {
    label: 'less than 100',
    value: 100,
  },
];
export const SERVICES_OPTIONS = [
  {
    label: 'Locations',
    route: '/location',
  },
];
export const HELP_OPTIONS = [
  {
    label: 'Contact Us',
    route: '/contact',
  },
  {
    label: 'Blogs',
    route: '/blog',
  },
  {
    label: 'About Dealty',
    route: '/about-dealty',
  },
];
export const LINK_OPTIONS = [
  {
    label: 'Privacy',
    route: '/privacy-policy',
  },
  {
    label: 'Terms',
    route: '/terms',
  },
  {
    label: 'Contact',
    route: '/contact',
  },
  {
    label: 'FAQs',
    route: '/faq',
  },
];
export const SOCIAL_LINKS = [
  {
    label: 'Email',
    class: 'email',
    link: 'https://www.hud.gov/program_offices/fair_housing_equal_opp',
  },
  {
    label: 'Facebook',
    class: 'facebook',
    link: 'https://www.facebook.com/dealty/',
  },
  {
    label: 'Twitter',
    class: 'twitter',
    link: 'https://twitter.com/YourDealty',
  },
  {
    label: 'Instagram',
    class: 'instagram',
    link: 'https://www.instagram.com/YourDealty/',
  },
  {
    label: 'Linkedin',
    class: 'linkedin',
    link: 'https://www.linkedin.com/company/dealty/',
  },
];

export const LABELS = {
  daysOnDealty: 'Days on dealty',
  parking: 'Parking',
  buitIn: 'Built In',
  pool: 'Pool',
  newAppliances: 'New Appliances',
  flooringType: 'Flooring Type',
  openHouseDate: 'Open House Date',
  openHouseTime: 'Open House Time',
  HOAName: 'HOA Name',
  HOAMonthlyCost: 'HOA Monthly Cost',
}

export const STATUSES = {
  active: 'active'
}

export const ICONS = {
  garage: '../../static/images/propertydetail/Garage.svg',
  built: '../../static/images/propertydetail/Built.svg',
  pool: '../../static/images/propertydetail/pool.svg',
  newAppliances: '../../static/images/propertydetail/single-icon.svg',
  flooring: '../../static/images/propertydetail/flooring.svg',
  daysOnDealty: '../../static/images/propertydetail/f-icon7.svg',
  homeOwner: '../../static/images/propertydetail/homeowner.svg',
  monthlyCost: '../../static/images/propertydetail/conthlyCost.svg',
};

export const NAV_TOP_OPTIONS = [
  {
    label: 'Sell',
    link: '/seller/add-new-property',
  },
  {
    label: 'Buy',
    link: '/buy',
  },
  {
    label: 'Rent',
    link: '/buy/',
  },
  {
    label: 'Resource',
    link: '/resources',
  },
  {
    label: 'Contact',
    link: '/contact',
  },
];

export const NAV_DROPDOWN_OPTIONS = [
  {
    label: 'Inbox',
    link: 'inbox',
  },
  {
    label: 'Favourites',
    link: 'favourites',
  },
  {
    label: 'Offers',
    link: 'offers',
  },
  {
    label: 'Showings',
    link: 'appointments',
  },
  {
    label: 'Saved Searches',
    link: 'saved-searches',
  },
  {
    label: 'Account',
    link: 'my-account',
  },
];

export const defaultFilter = 'for_sale';
export const sevenDays = 168;

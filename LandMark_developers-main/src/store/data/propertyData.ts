export const propertyData = {
  // Main Property
  mainProperty: {
    name: 'Vanshdeep The Aura',
    builder: 'Vanshdeep Builders',
    location: 'Khasra No. 633 And 634, Village - Bilwa Kallan, Jagatpura, NH - 8, Jaipur',
    price: {
      min: 31.73,
      max: 98.01,
      unit: 'L',
      perSqft: 5770,
      emi: 16.8
    },
    rating: 4.7,
    type: '12 BHK Apartment',
    possession: 'Jan 2020',
    pricePerSqft: 57770
  },

  // Featured Property
  featuredProperty: {
    name: 'Axis Royal Samriddhi',
    price: '10.0 L',
    bedrooms: 1,
    bathrooms: 1,
    area: 378,
    floor: 6,
    totalFloors: 8,
    parking: '1 Covered + 1 Open',
    balcony: 1,
    added: 'More than a month ago'
  },

  // Price Trends
  priceTrends: {
    project: {
      name: 'Axis Royal Samriddhi',
      depreciation: 5.72,
      avgRate: 2700,
      period: '1 year'
    },
    locality: {
      name: 'Jagatpura',
      depreciation: 11.95,
      avgRate: 4500,
      period: '1 year'
    }
  },

  // Floor Plans
  floorPlans: [
    {
      type: '1 BHK',
      price: '31.73 L - 39.83 L',
      area: 549.65,
      image: '/api/placeholder/300/200'
    },
    {
      type: '2 BHK',
      price: '65.45 L - 67.3 L',
      area: 690,
      image: '/api/placeholder/300/200'
    },
    {
      type: '3 BHK',
      price: '83 L - 98.01 L',
      area: 980,
      image: '/api/placeholder/300/200'
    }
  ],

  // Amenities
  amenities: [
    { name: 'Water Harvesting', icon: '💧' },
    { name: 'Park', icon: '🌳' },
    { name: 'Security', icon: '🛡️' },
    { name: 'Parking', icon: '🚗' },
    { name: 'Power Backup', icon: '⚡' },
    { name: 'Lift', icon: '🛗' }
  ],

  // Locality Info
  locality: {
    name: 'Jagatpura, Jaipur',
    societies: 253,
    apartments: 329,
    ownerProperties: 111,
    rating: 4.7,
    connectivity: 4.6,
    neighborhood: 4.7,
    goodThings: [
      'Quiet residential neighborhood',
      'Parks, schools, stores nearby',
      'Growth potential for real estate',
      'Bus route no. 8 available',
      'Easy connectivity to Airport'
    ],
    improvements: [
      'Proper market needed',
      'College nearby needed',
      'Water system improvement needed',
      'Lack of public transport in some areas'
    ]
  },

  // Reviews
  reviews: [
    {
      name: 'Abhinandan',
      type: 'Owner',
      time: '1 year ago',
      good: 'Newly constructed villa at JDA Approved Ashadeep Green valley',
      improvement: 'As the colony is new it will be fully occupied very soon, currently 15 villas',
      rating: 4.5
    }
  ],

  // Similar Properties
  similarProperties: [
    {
      name: '1 BHK Apartment',
      location: 'Jagatpura, Jaipur',
      price: '10.0 L',
      area: 378,
      status: 'Ready to move'
    }
  ],

  // Images
  images: [
    'https://housing-images.n7net.in/4f2250e8/289f92424e8ca502ecb046b24ebf4d31/v0/fs/vanshdeep_the_aura-jagatpura_jaipur-jaipur-vanshdeep_builders.jpeg',
    'https://housing-images.n7net.in/4f2250e8/289f92424e8ca502ecb046b24ebf4d31/v0/fs/vanshdeep_the_aura-jagatpura_jaipur-jaipur-vanshdeep_builders.jpeg',
    'https://housing-images.n7net.in/4f2250e8/289f92424e8ca502ecb046b24ebf4d31/v0/fs/vanshdeep_the_aura-jagatpura_jaipur-jaipur-vanshdeep_builders.jpeg',
    'https://housing-images.n7net.in/4f2250e8/289f92424e8ca502ecb046b24ebf4d31/v0/fs/vanshdeep_the_aura-jagatpura_jaipur-jaipur-vanshdeep_builders.jpeg',
    'https://housing-images.n7net.in/4f2250e8/289f92424e8ca502ecb046b24ebf4d31/v0/fs/vanshdeep_the_aura-jagatpura_jaipur-jaipur-vanshdeep_builders.jpeg',
    'https://housing-images.n7net.in/4f2250e8/289f92424e8ca502ecb046b24ebf4d31/v0/fs/vanshdeep_the_aura-jagatpura_jaipur-jaipur-vanshdeep_builders.jpeg'
  ]
};

export const floorPlans = {
  '1bhk': {
    type: '1 BHK Apartment',
    price: '₹31.73 L - ₹39.83 L',
    area: '549.65 sq.ft',
    rooms: [
      { name: 'Drawing/Living Room', dimensions: "15' 7\" × 9' 0\"" },
      { name: 'Kitchen', dimensions: "5' 0\" × 9' 4\"" },
      { name: 'Bedroom 1', dimensions: "10' 3\" × 9' 0\"" }
    ],
    features: ['Modern Kitchen Design', 'Spacious Living Area']
  },
  '2bhk': {
    type: '2 BHK Apartment',
    price: '₹65.45 L - ₹67.3 L',
    area: '690 sq.ft',
    rooms: [
      { name: 'Living Room', dimensions: "16' 2\" × 10' 0\"" },
      { name: 'Bedroom 1', dimensions: "12' 0\" × 10' 0\"" }
    ],
    features: ['Modular Kitchen', 'Two Balconies']
  },
  '3bhk': {
    type: '3 BHK Apartment',
    price: '₹83 L - ₹98.01 L',
    area: '980 sq.ft',
    rooms: [
      { name: 'Living/Dining', dimensions: "18' 0\" × 12' 0\"" },
      { name: 'Bedroom 1', dimensions: "13' 0\" × 11' 0\"" }
    ],
    features: ['Large Living Room', 'Three Balconies']
  }
};

export const pricingCards = [
  { key: '1bhk', type: '1 BHK', price: '31.73 L - 39.83 L', area: '549.65', base: '31.73 L' },
  { key: '2bhk', type: '2 BHK', price: '65.45 L - 67.3 L', area: '690', base: '65.45 L' },
  { key: '3bhk', type: '3 BHK', price: '83 L - 98.01 L', area: '980', base: '83 L' }
];

export const overviewData = [
  { label: "Project Name", value: "Axis Royal Samriddhi", link: true },
  { label: "Brokerage", value: "No Charge", sub: "Access Zero Brokerage Properties" },
  { label: "Price", value: "₹10.0 L" },
  { label: "Bedrooms", value: "1" },
  { label: "Bathrooms", value: "1" },
  { label: "Parking", value: "1 Covered and 1 Open Parking" },
  { label: "Parking Info", value: "No Parking" },
  { label: "Balcony", value: "1" },
  { label: "Added", value: "More than a month ago" },
  { label: "Area Unit", value: "sq.ft." },
];

export const amenitiesList = [
  { name: "Amphitheater", icon: "Tent" },
  { name: "Cricket Pitch", icon: "Bike" },
  { name: "Grocery Shop", icon: "Store" },
  { name: "Gazebo", icon: "Tent" },
  { name: "Reflexology Park", icon: "Flower2" },
  { name: "Swimming Pool", icon: "Waves" },
  { name: "Skating Rink", icon: "Bike" },
  { name: "Fountains", icon: "Landmark" },
  { name: "Landscaping & Tree...", icon: "Trees" },
  { name: "Water Conservation...", icon: "Droplets" },
  { name: "Table Tennis", icon: "Table" }
];

export const floorData = [
  { label: "Living/Dining", value: "Vitrified Tiles" },
  { label: "Master Bedroom", value: "Vitrified Tiles" },
  { label: "Other Bedroom", value: "Vitrified Tiles" },
  { label: "Kitchen", value: "Vitrified Tiles" },
  { label: "Toilets", value: "Anti Skid Ceramic Tiles" },
  { label: "Balcony", value: "Anti skid ceramic tiles" }
];

export const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'floorplans', label: 'Floor Plans' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'locality', label: 'Locality' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'pricing', label: 'Pricing' }
];
import { Property } from '../types/property';

export const propertiesData: Property[] = [
  {
    id: '1',
    title: 'Premium Alphonso Mango Farm',
    description: 'A well-established 25-acre Alphonso mango farm with 500+ mature trees producing premium quality mangoes. The property includes irrigation infrastructure, farm equipment, and a small office. Perfect for commercial mango production with existing export connections.',
    price: 750000,
    size: 25,
    location: 'Maharashtra, India',
    address: '123 Farm Road, Ratnagiri, Maharashtra, India',
    coordinates: {
      lat: 16.9942,
      lng: 73.3126
    },
    type: 'mango-farm',
    images: [
      'https://images.pexels.com/photos/2751755/pexels-photo-2751755.jpeg',
      'https://images.pexels.com/photos/5561519/pexels-photo-5561519.jpeg',
      'https://images.pexels.com/photos/158028/belgrade-serbia-fruits-market-158028.jpeg',
      'https://images.pexels.com/photos/8353801/pexels-photo-8353801.jpeg'
    ],
    features: [
      '500+ mature mango trees',
      'Drip irrigation system',
      'Water reservoir',
      'Farm equipment included',
      'Organic certification'
    ],
    amenities: [
      'Farm office',
      'Storage facility',
      'Worker housing',
      'Electricity connection',
      'Boundary wall'
    ],
    status: 'For Sale',
    featured: true,
    createdAt: '2023-09-15T00:00:00Z',
    updatedAt: '2023-10-05T00:00:00Z',
    yieldData: {
      estimatedYield: 3.5,
      varietiesGrown: ['Alphonso', 'Kesar'],
      harvestSeason: 'April to June'
    }
  },
  {
    id: '2',
    title: 'Fertile Agricultural Land with Mango Potential',
    description: 'Prime agricultural land with fertile soil perfect for mango cultivation. This 15-acre property is located in a region known for high-quality mango production. The land includes a water source and has road access, making it an excellent investment opportunity.',
    price: 350000,
    size: 15,
    location: 'Andhra Pradesh, India',
    address: '456 Rural Highway, Vijayawada, Andhra Pradesh, India',
    coordinates: {
      lat: 16.5062,
      lng: 80.6480
    },
    type: 'agricultural-land',
    images: [
      'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg',
      'https://images.pexels.com/photos/175370/pexels-photo-175370.jpeg',
      'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg',
      'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg'
    ],
    features: [
      'Fertile soil',
      'Natural water source',
      'Road access',
      'Electricity available',
      'Flat terrain'
    ],
    amenities: [
      'Good rainfall region',
      'Nearby village',
      'Agricultural support services'
    ],
    status: 'For Sale',
    featured: true,
    createdAt: '2023-08-20T00:00:00Z',
    updatedAt: '2023-09-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Exclusive Mango Estate with Luxury Farmhouse',
    description: 'A stunning 40-acre mango estate featuring a modern 4-bedroom farmhouse. This premium property includes established mango orchards with multiple premium varieties, advanced irrigation systems, and beautiful landscaped gardens. An ideal combination of luxury living and commercial agriculture.',
    price: 1250000,
    size: 40,
    location: 'Gujarat, India',
    address: '789 Estate Drive, Valsad, Gujarat, India',
    coordinates: {
      lat: 20.5932,
      lng: 72.9342
    },
    type: 'farm-house',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/7174114/pexels-photo-7174114.jpeg',
      'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
      'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg'
    ],
    features: [
      'Luxury 4-bedroom farmhouse',
      '800+ mango trees of multiple varieties',
      'Modern drip irrigation',
      'Swimming pool',
      'Landscaped gardens',
      'Solar power system'
    ],
    amenities: [
      'Gated property',
      'Caretaker residence',
      'Equipment storage',
      'High-speed internet',
      'Security system'
    ],
    status: 'For Sale',
    featured: true,
    createdAt: '2023-07-10T00:00:00Z',
    updatedAt: '2023-09-22T00:00:00Z',
    yieldData: {
      estimatedYield: 4.2,
      varietiesGrown: ['Kesar', 'Alphonso', 'Banganapalli', 'Dasheri'],
      harvestSeason: 'March to July'
    },
    videoTour: 'https://www.youtube.com/watch?v=example1'
  },
  {
    id: '4',
    title: 'Commercial Mango Processing Plot',
    description: 'Strategic 5-acre commercial plot ideal for mango processing facility. Located near major mango production regions with excellent transportation links. All utilities available and zoned for agricultural processing. Perfect for setting up a mango processing, packaging, or export business.',
    price: 280000,
    size: 5,
    location: 'Uttar Pradesh, India',
    address: '101 Industrial Area, Lucknow, Uttar Pradesh, India',
    coordinates: {
      lat: 26.8467,
      lng: 80.9462
    },
    type: 'commercial-plot',
    images: [
      'https://images.pexels.com/photos/3855622/pexels-photo-3855622.jpeg',
      'https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg',
      'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg',
      'https://images.pexels.com/photos/1129371/pexels-photo-1129371.jpeg'
    ],
    features: [
      'Commercial zoning',
      'All utilities connected',
      'Highway access',
      'Level terrain',
      'Strategic location near farms'
    ],
    amenities: [
      'Industrial area benefits',
      'Labor availability',
      'Transportation links',
      'Government incentives eligible'
    ],
    status: 'For Sale',
    featured: false,
    createdAt: '2023-08-05T00:00:00Z',
    updatedAt: '2023-09-12T00:00:00Z'
  },
  {
    id: '5',
    title: 'Investment Mango Orchard Package',
    description: 'Turnkey investment opportunity with multiple mango orchards totaling 60 acres. These established farms are currently producing income with a professional management team in place. Excellent ROI potential with established distribution channels and export connections.',
    price: 1800000,
    size: 60,
    location: 'Karnataka, India',
    address: '222 Investor Road, Bangalore Rural, Karnataka, India',
    coordinates: {
      lat: 13.0022,
      lng: 77.5569
    },
    type: 'investment-plot',
    images: [
      'https://images.pexels.com/photos/3493583/pexels-photo-3493583.jpeg',
      'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg',
      'https://images.pexels.com/photos/3629537/pexels-photo-3629537.jpeg',
      'https://images.pexels.com/photos/5331303/pexels-photo-5331303.jpeg'
    ],
    features: [
      'Professionally managed',
      'Multiple orchards package',
      'Established income stream',
      'Premium varieties',
      'Export connections'
    ],
    amenities: [
      'Management facilities',
      'Processing center',
      'Cold storage',
      'Staff quarters'
    ],
    status: 'For Sale',
    featured: true,
    createdAt: '2023-06-28T00:00:00Z',
    updatedAt: '2023-09-30T00:00:00Z',
    yieldData: {
      estimatedYield: 3.8,
      varietiesGrown: ['Banganapalli', 'Mallika', 'Alphonso', 'Totapuri'],
      harvestSeason: 'March to August'
    },
    videoTour: 'https://www.youtube.com/watch?v=example2',
    virtualTour: 'https://virtual-tour.example.com/tour3'
  },
  {
    id: '6',
    title: 'Young Mango Plantation with Growth Potential',
    description: 'An emerging 20-acre mango plantation with 3-year-old trees of premium varieties. This property offers excellent growth potential as the trees mature. Includes irrigation infrastructure and basic facilities. Ideal for long-term agricultural investment with increasing returns.',
    price: 420000,
    size: 20,
    location: 'Tamil Nadu, India',
    address: '333 Growth Avenue, Salem, Tamil Nadu, India',
    coordinates: {
      lat: 11.6643,
      lng: 78.1460
    },
    type: 'mango-farm',
    images: [
      'https://images.pexels.com/photos/4750273/pexels-photo-4750273.jpeg',
      'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg',
      'https://images.pexels.com/photos/639105/pexels-photo-639105.jpeg',
      'https://images.pexels.com/photos/421797/pexels-photo-421797.jpeg'
    ],
    features: [
      'Young plantation (3 years old)',
      '400+ trees of premium varieties',
      'Drip irrigation installed',
      'Fertile soil',
      'Growth potential'
    ],
    amenities: [
      'Basic storage facility',
      'Caretaker hut',
      'Bore well',
      'Farm tools included'
    ],
    status: 'For Sale',
    featured: false,
    createdAt: '2023-08-15T00:00:00Z',
    updatedAt: '2023-09-10T00:00:00Z',
    yieldData: {
      estimatedYield: 1.5, // Currently low but increasing as trees mature
      varietiesGrown: ['Alphonso', 'Banganapalli', 'Neelam'],
      harvestSeason: 'April to July'
    }
  }
];
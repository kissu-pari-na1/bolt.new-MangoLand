export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  size: number; // in acres
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: PropertyType;
  images: string[];
  features: string[];
  amenities: string[];
  status: 'For Sale' | 'Sold' | 'Under Contract';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  yieldData?: {
    estimatedYield: number; // tons per acre
    varietiesGrown: string[];
    harvestSeason: string;
  };
  videoTour?: string;
  virtualTour?: string;
}

export type PropertyType = 
  | 'mango-farm' 
  | 'agricultural-land' 
  | 'commercial-plot' 
  | 'farm-house' 
  | 'investment-plot';

export interface PropertyFilter {
  type?: PropertyType | 'all';
  location?: string | 'all';
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  features?: string[];
  status?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'size-asc' | 'size-desc' | 'newest';
}
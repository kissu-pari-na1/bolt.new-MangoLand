import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyFilter } from '../types/property';
import { propertiesData } from '../data/properties';

interface PropertyContextType {
  properties: Property[];
  featuredProperties: Property[];
  filteredProperties: Property[];
  loading: boolean;
  setFilters: (filters: PropertyFilter) => void;
  getPropertyById: (id: string) => Property | undefined;
  getRelatedProperties: (id: string, limit?: number) => Property[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/properties');
        // const data = await response.json();
        const data = propertiesData;
        
        setProperties(data);
        setFilteredProperties(data);
        setFeaturedProperties(data.filter(property => property.featured));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const setFilters = (filters: PropertyFilter) => {
    let result = [...properties];

    // Filter by type
    if (filters.type && filters.type !== 'all') {
      result = result.filter(property => property.type === filters.type);
    }

    // Filter by location
    if (filters.location && filters.location !== 'all') {
      result = result.filter(property => property.location.includes(filters.location));
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter(property => property.price >= filters.minPrice!);
    }
    if (filters.maxPrice) {
      result = result.filter(property => property.price <= filters.maxPrice!);
    }

    // Filter by size range
    if (filters.minSize) {
      result = result.filter(property => property.size >= filters.minSize!);
    }
    if (filters.maxSize) {
      result = result.filter(property => property.size <= filters.maxSize!);
    }

    // Filter by features
    if (filters.features && filters.features.length > 0) {
      result = result.filter(property => 
        filters.features!.every(feature => property.features.includes(feature))
      );
    }

    setFilteredProperties(result);
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const getRelatedProperties = (id: string, limit = 3) => {
    const property = getPropertyById(id);
    if (!property) return [];

    return properties
      .filter(p => p.id !== id && p.type === property.type)
      .slice(0, limit);
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      featuredProperties,
      filteredProperties,
      loading,
      setFilters,
      getPropertyById,
      getRelatedProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
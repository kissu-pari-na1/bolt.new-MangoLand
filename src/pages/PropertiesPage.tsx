import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { PropertyFilter } from '../types/property';

const PropertiesPage = () => {
  const location = useLocation();
  const { filteredProperties, setFilters, loading } = useProperty();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState<PropertyFilter>({
    type: 'all',
    location: '',
    minPrice: undefined,
    maxPrice: undefined,
    minSize: undefined,
    maxSize: undefined,
    features: [],
    sortBy: 'newest'
  });

  // Parse URL query parameters on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const filterParams: PropertyFilter = {
      type: (params.get('type') as any) || 'all',
      location: params.get('location') || '',
      minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
      maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
      minSize: params.get('minSize') ? Number(params.get('minSize')) : undefined,
      maxSize: params.get('maxSize') ? Number(params.get('maxSize')) : undefined,
      sortBy: (params.get('sortBy') as any) || 'newest'
    };
    
    setAppliedFilters(filterParams);
    setFilters(filterParams);
  }, [location.search, setFilters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const { checked } = checkbox;
      
      setAppliedFilters(prev => {
        const features = [...(prev.features || [])];
        
        if (checked) {
          features.push(value);
        } else {
          const index = features.indexOf(value);
          if (index !== -1) {
            features.splice(index, 1);
          }
        }
        
        return { ...prev, features };
      });
    } else {
      setAppliedFilters(prev => ({
        ...prev,
        [name]: name === 'type' || name === 'location' || name === 'sortBy' 
          ? value 
          : value === '' ? undefined : Number(value)
      }));
    }
  };

  const handleApplyFilters = () => {
    setFilters(appliedFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      type: 'all',
      location: '',
      minPrice: undefined,
      maxPrice: undefined,
      minSize: undefined,
      maxSize: undefined,
      features: [],
      sortBy: 'newest'
    };
    
    setAppliedFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Property Listings</h1>
            <p className="text-gray-600">
              Discover exceptional mango farms and agricultural land properties
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
            >
              <Filter size={18} />
              Filter
            </button>
            
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button 
                onClick={() => setIsGridView(true)}
                className={`p-2 ${isGridView ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setIsGridView(false)}
                className={`p-2 ${!isGridView ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Always visible on desktop, togglable on mobile */}
          <div className={`lg:w-1/4 bg-white p-6 rounded-lg shadow-md ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </h2>
              <button 
                onClick={handleResetFilters}
                className="text-primary hover:text-primary-dark text-sm"
              >
                Reset All
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Property Type */}
              <div>
                <label htmlFor="type" className="block font-medium mb-2">Property Type</label>
                <select
                  id="type"
                  name="type"
                  value={appliedFilters.type}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                >
                  <option value="all">All Types</option>
                  <option value="mango-farm">Mango Farm</option>
                  <option value="agricultural-land">Agricultural Land</option>
                  <option value="farm-house">Farm House</option>
                  <option value="commercial-plot">Commercial Plot</option>
                  <option value="investment-plot">Investment Plot</option>
                </select>
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="location" className="block font-medium mb-2">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="State or Region"
                  value={appliedFilters.location}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block font-medium mb-2">Price Range (₹)</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      placeholder="Min"
                      value={appliedFilters.minPrice || ''}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      placeholder="Max"
                      value={appliedFilters.maxPrice || ''}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
              
              {/* Size Range */}
              <div>
                <label className="block font-medium mb-2">Size (acres)</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      id="minSize"
                      name="minSize"
                      placeholder="Min"
                      value={appliedFilters.minSize || ''}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      id="maxSize"
                      name="maxSize"
                      placeholder="Max"
                      value={appliedFilters.maxSize || ''}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <label htmlFor="sortBy" className="block font-medium mb-2">Sort By</label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={appliedFilters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                  <option value="size-asc">Size (Small to Large)</option>
                  <option value="size-desc">Size (Large to Small)</option>
                </select>
              </div>
              
              {/* Apply Button (Mobile Only) */}
              <div className="pt-4 lg:hidden">
                <button
                  onClick={handleApplyFilters}
                  className="w-full btn btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Properties List */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading properties...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <button
                  onClick={handleResetFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={isGridView ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` : `space-y-6`}>
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    className={!isGridView ? 'flex flex-col md:flex-row overflow-hidden' : ''}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
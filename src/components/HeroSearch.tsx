import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    type: 'all',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    
    if (searchParams.type !== 'all') {
      params.append('type', searchParams.type);
    }
    
    if (searchParams.location) {
      params.append('location', searchParams.location);
    }
    
    if (searchParams.minPrice) {
      params.append('minPrice', searchParams.minPrice);
    }
    
    if (searchParams.maxPrice) {
      params.append('maxPrice', searchParams.maxPrice);
    }
    
    // Navigate to properties page with filters
    navigate({
      pathname: '/properties',
      search: params.toString()
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            id="type"
            name="type"
            value={searchParams.type}
            onChange={handleChange}
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
        
        <div className="md:col-span-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="State or Region"
            value={searchParams.location}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>
        
        <div className="md:col-span-1">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Min Price"
            value={searchParams.minPrice}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>
        
        <div className="md:col-span-1">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price (₹)
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Max Price"
            value={searchParams.maxPrice}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
          />
        </div>
        
        <div className="md:col-span-1 flex items-end">
          <button 
            type="submit" 
            className="w-full h-[42px] bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center"
          >
            <Search size={18} className="mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearch;
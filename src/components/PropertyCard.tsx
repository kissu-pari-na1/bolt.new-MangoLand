import { Link } from 'react-router-dom';
import { MapPin, Ruler, ArrowRight } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const PropertyCard = ({ property, className = '' }: PropertyCardProps) => {
  const { id, title, images, price, size, location, type, status } = property;
  
  const typeLabel = type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
      notation: price >= 10000000 ? 'compact' : 'standard',
      compactDisplay: 'short'
    }).format(price);
  };

  return (
    <div 
      className={`property-card group transition-all duration-300 ${className}`}
      data-property-id={id}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={images[0]} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full text-sm font-semibold text-primary">
          {status}
        </div>
        
        <div className="absolute top-4 left-4 bg-secondary py-1 px-3 rounded-full text-sm font-semibold text-dark">
          {typeLabel}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary">
          {title}
        </h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <Ruler size={16} className="mr-1" />
          <span>{size} acres</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            {formatPrice(price)}
          </div>
          
          <Link 
            to={`/properties/${id}`} 
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
          >
            View Details <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
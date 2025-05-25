import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { 
  MapPin, Ruler, CalendarClock, ArrowLeft, 
  DollarSign, Clock, Sprout, Leaf, 
  Phone, Mail, Share, Heart, Check
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import ContactForm from '../components/ContactForm';

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, getRelatedProperties } = useProperty();
  const [activeImage, setActiveImage] = useState(0);
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get property data
  const property = getPropertyById(id || '');
  const relatedProperties = getRelatedProperties(id || '');
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Property Not Found</h1>
          <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/properties" className="btn btn-primary">
            <ArrowLeft size={18} className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }
  
  const {
    title, description, price, size, location, address,
    type, images, features, amenities, status, createdAt,
    yieldData
  } = property;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const typeLabel = type.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container-custom py-8">
        {/* Back Button */}
        <Link 
          to="/properties" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Properties
        </Link>
        
        {/* Property Title & Status */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                {location}
              </div>
              <div className="flex items-center text-gray-600">
                <Ruler size={18} className="mr-1" />
                {size} acres
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarClock size={18} className="mr-1" />
                Listed on {formatDate(createdAt)}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'} hover:bg-red-50 hover:text-red-500 transition-colors`}
              aria-label="Add to favorites"
            >
              <Heart size={20} className={isFavorite ? 'fill-red-500' : ''} />
            </button>
            <button 
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-colors"
              aria-label="Share property"
            >
              <Share size={20} />
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Main Image Gallery */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
              <div className="relative aspect-[16/9]">
                <img 
                  src={images[activeImage]} 
                  alt={`${title} - Image ${activeImage + 1}`} 
                  className="w-full h-full object-cover" 
                />
                
                <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full text-sm font-semibold text-primary">
                  {status}
                </div>
                
                <div className="absolute top-4 left-4 bg-secondary py-1 px-3 rounded-full text-sm font-semibold text-[#333333]">
                  {typeLabel}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="p-4 grid grid-cols-5 gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-[4/3] rounded-md overflow-hidden cursor-pointer border-2 ${
                      index === activeImage ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${title} - Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center">
                    <DollarSign size={20} className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold">{formatPrice(price)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Ruler size={20} className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Property Size</p>
                      <p className="font-semibold">{size} acres</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={20} className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">{address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={20} className="text-primary mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Listed Date</p>
                      <p className="font-semibold">{formatDate(createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {yieldData && (
                <div className="border-t border-gray-100 p-6">
                  <h3 className="text-xl font-semibold mb-4">Yield Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                    <div className="flex items-center">
                      <Sprout size={20} className="text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Estimated Yield</p>
                        <p className="font-semibold">{yieldData.estimatedYield} tons/acre</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Leaf size={20} className="text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Varieties</p>
                        <p className="font-semibold">{yieldData.varietiesGrown.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <CalendarClock size={20} className="text-primary mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Harvest Season</p>
                        <p className="font-semibold">{yieldData.harvestSeason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                  {features.map((feature, index) => (
                    <div key={`feature-${index}`} className="flex items-center">
                      <Check size={16} className="text-primary mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {amenities.map((amenity, index) => (
                    <div key={`amenity-${index}`} className="flex items-center">
                      <Check size={16} className="text-primary mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact & Related */}
          <div>
            {/* Contact Box */}
            <div className="bg-white rounded-lg shadow-md mb-6 sticky top-32">
              <div className="p-6">
                <div className="bg-primary/5 p-4 rounded-lg mb-6">
                  <h2 className="text-2xl font-bold text-primary mb-1">{formatPrice(price)}</h2>
                  <p className="text-gray-600">{size} acres in {location}</p>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
                
                {!isContactFormVisible ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => setIsContactFormVisible(true)}
                      className="btn btn-primary w-full"
                    >
                      <Phone size={18} className="mr-2" />
                      Request Information
                    </button>
                    
                    <a 
                      href="tel:+1234567890" 
                      className="btn btn-outline w-full"
                    >
                      <Phone size={18} className="mr-2" />
                      Call Agent
                    </a>
                    
                    <a 
                      href="mailto:info@mangolands.com" 
                      className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 w-full"
                    >
                      <Mail size={18} className="mr-2" />
                      Email Agent
                    </a>
                  </div>
                ) : (
                  <ContactForm propertyId={id || ''} propertyTitle={title} onClose={() => setIsContactFormVisible(false)} />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
import { Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';
import { Search, MapPin, DollarSign, Phone } from 'lucide-react';
import HeroSearch from '../components/HeroSearch';
import TestimonialCard from '../components/TestimonialCard';

const HomePage = () => {
  const { featuredProperties, loading } = useProperty();

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg" 
            alt="Mango farm" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary-dark/60"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white pt-24">
          <div className="max-w-2xl mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Mango Farm & Land Investment
            </h1>
            <p className="text-xl mb-8">
              Premium agricultural properties featuring established mango farms 
              and fertile land for your next investment or business venture.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/properties" className="btn bg-secondary text-dark hover:bg-secondary-dark">
                Browse Properties
              </Link>
              <Link to="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
          
          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium mango farms and agricultural land opportunities
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <p>Loading properties...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/properties" className="btn btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MangoLands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in high-quality mango farms and agricultural land properties 
              with a focus on investment value and production potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Selection</h3>
              <p className="text-gray-600">
                Every property is personally vetted for quality, production potential, and investment value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prime Locations</h3>
              <p className="text-gray-600">
                Properties in the best agricultural regions known for premium mango production.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Investment Value</h3>
              <p className="text-gray-600">
                Properties selected for their potential return on investment and future growth.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Professional guidance from agricultural and real estate experts throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from investors and farm owners who found their ideal properties through MangoLands
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="MangoLands helped me find the perfect mango farm that's now producing premium quality fruit and generating excellent returns."
              author="Rajesh Kumar"
              role="Farm Owner"
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
              rating={5}
            />
            
            <TestimonialCard 
              quote="As an agricultural investor, I appreciate their deep knowledge of soil quality and yield potential. My property exceeded expectations."
              author="Meera Patel"
              role="Agricultural Investor"
              image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
              rating={5}
            />
            
            <TestimonialCard 
              quote="Their guidance through the entire purchasing process was invaluable. They found me a property that perfectly matched my requirements."
              author="Sanjay Mehta"
              role="Business Owner"
              image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Invest in Premium Agricultural Land?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Let us help you find the perfect mango farm or agricultural property for your investment portfolio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/properties" className="btn bg-white text-primary hover:bg-gray-100">
              Browse Properties
            </Link>
            <Link to="/contact" className="btn border-2 border-white hover:bg-white hover:text-primary">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
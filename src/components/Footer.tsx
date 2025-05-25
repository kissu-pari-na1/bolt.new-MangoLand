import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">MangoLands</h3>
            <p className="mb-4 text-gray-300">
              Your trusted partner for premium mango farms and land properties. 
              We help connect buyers with their dream agricultural investments.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/properties" className="text-gray-300 hover:text-white transition-colors">Properties</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li><Link to="/properties?type=mango-farm" className="text-gray-300 hover:text-white transition-colors">Mango Farms</Link></li>
              <li><Link to="/properties?type=agricultural-land" className="text-gray-300 hover:text-white transition-colors">Agricultural Land</Link></li>
              <li><Link to="/properties?type=commercial-plots" className="text-gray-300 hover:text-white transition-colors">Commercial Plots</Link></li>
              <li><Link to="/properties?type=farm-houses" className="text-gray-300 hover:text-white transition-colors">Farm Houses</Link></li>
              <li><Link to="/properties?type=investment-plots" className="text-gray-300 hover:text-white transition-colors">Investment Plots</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-light mt-1 flex-shrink-0" />
                <span>123 Farm Avenue, Agricultural District, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary-light flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary-light transition-colors">+123 456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-light flex-shrink-0" />
                <a href="mailto:info@mangolands.com" className="hover:text-primary-light transition-colors">info@mangolands.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {currentYear} MangoLands. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4 text-sm">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
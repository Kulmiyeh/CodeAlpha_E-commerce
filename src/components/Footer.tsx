import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">KULMIYE STORE</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your one-stop shop for premium electronics, accessories, and lifestyle products. Quality guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link></li>
              <li><Link to="/cart" className="hover:text-blue-600 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/profile" className="hover:text-blue-600 transition-colors">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>Hodan street, Mogadisho, Somalia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>25261 518 0498</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>support@kulmiyestore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} kulmiye Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

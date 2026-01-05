import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const whatsappMessage = encodeURIComponent("Hello Vinisee Movers! I'd like to inquire about your moving services.");
  const whatsappLink = `https://wa.me/254712345678?text=${whatsappMessage}`;

  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to Move?</h3>
              <p className="text-emerald-100 mt-2">Get a free quote today and experience stress-free moving.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/book"
                className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg text-center"
              >
                Book Your Move
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Vinisee</h2>
                <p className="text-xs text-emerald-400 font-medium -mt-1">MOVERS</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Eldoret's premier moving company. We make relocations seamless, safe, and stress-free for homes and businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-400 hover:text-emerald-400 transition-colors">Book a Move</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors">Home Moving</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors">Office Relocation</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors">Packing Services</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors">Storage Solutions</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-emerald-400 transition-colors">Long Distance</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Elgon View, Uganda Road<br />Eldoret, Kenya</span>
              </li>
              <li>
                <a href="tel:+254712345678" className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>+254 712 345 678</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@viniseemovers.co.ke" className="flex items-center space-x-3 text-gray-400 hover:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>info@viniseemovers.co.ke</span>
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-gray-500">Working Hours</p>
              <p className="text-gray-400">Mon - Sat: 6:00 AM - 8:00 PM</p>
              <p className="text-gray-400">Sunday: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Vinisee Movers. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

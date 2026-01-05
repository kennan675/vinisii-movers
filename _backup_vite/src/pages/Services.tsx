import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Building2, Package, Warehouse, Truck, Shield, Clock, Users, ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Home Moving',
    description: 'Complete residential moving services for apartments, houses, and estates.',
    features: [
      'Full packing and unpacking services',
      'Furniture disassembly and reassembly',
      'Careful handling of fragile items',
      'Same-day moves available',
      'Flexible scheduling',
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602543739_15e011d5.jpg',
  },
  {
    icon: Building2,
    title: 'Office Relocation',
    description: 'Efficient office moving services to minimize business downtime.',
    features: [
      'Weekend and after-hours moves',
      'IT equipment handling',
      'Furniture installation',
      'Minimal business disruption',
      'Project management included',
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602652020_79d4c4d2.jpg',
  },
  {
    icon: Package,
    title: 'Packing Services',
    description: 'Professional packing with quality materials for safe transport.',
    features: [
      'High-quality packing materials',
      'Custom crating for valuables',
      'Labeling and inventory',
      'Fragile item specialists',
      'Eco-friendly options available',
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602654658_44bab51b.jpg',
  },
  {
    icon: Warehouse,
    title: 'Storage Solutions',
    description: 'Secure short-term and long-term storage for your belongings.',
    features: [
      'Climate-controlled units',
      '24/7 security monitoring',
      'Flexible rental periods',
      'Easy access to your items',
      'Insurance options available',
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602550142_155d5954.jpg',
  },
  {
    icon: Truck,
    title: 'Long Distance Moving',
    description: 'Reliable long-distance moves across Kenya and East Africa.',
    features: [
      'Door-to-door service',
      'GPS tracking available',
      'Dedicated move coordinator',
      'Transparent pricing',
      'Delivery time guarantees',
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602635704_81a6f3c0.png',
  },
  {
    icon: Shield,
    title: 'Insurance & Protection',
    description: 'Comprehensive coverage for complete peace of mind.',
    features: [
      'Full value protection',
      'Basic liability coverage',
      'Third-party insurance options',
      'Damage claims support',
      'Transparent policies',
    ],
    image: 'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602571047_2cd5c74b.png',
  },
];

const whyUs = [
  { icon: Clock, title: 'On-Time Service', description: 'We respect your schedule' },
  { icon: Users, title: 'Expert Team', description: 'Trained professionals' },
  { icon: Shield, title: 'Fully Insured', description: 'Your items are protected' },
  { icon: Truck, title: 'Modern Fleet', description: 'Well-maintained vehicles' },
];

const Services: React.FC = () => {
  const whatsappMessage = encodeURIComponent("Hello Vinisee Movers! I'd like to inquire about your services.");
  const whatsappLink = `https://wa.me/254712345678?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-sky-50 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-200 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Complete Moving Solutions{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                  For Every Need
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                From packing to unpacking, local moves to long-distance relocations, 
                we offer comprehensive services tailored to your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-200"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg transition-all"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Chat With Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Bar */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {whyUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
                  >
                    <div className={isEven ? 'order-1' : 'order-1 lg:order-2'}>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                      </div>
                      <p className="text-lg text-gray-600 mb-8">{service.description}</p>
                      <ul className="space-y-4 mb-8">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/book"
                        className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
                      >
                        Book This Service
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                    <div className={isEven ? 'order-2' : 'order-2 lg:order-1'}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-500 to-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Contact us today for a free, no-obligation quote. We'll help you plan the perfect move.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Book Your Move
                </Link>
                <a
                  href="tel:+254712345678"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-700 text-white rounded-xl font-semibold text-lg hover:bg-emerald-800 transition-colors"
                >
                  Call +254 712 345 678
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Building2, Package, Warehouse, Truck, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Home Moving',
    description: 'Complete residential moving services for apartments, houses, and estates. We handle everything from packing to setup.',
    color: 'emerald',
  },
  {
    icon: Building2,
    title: 'Office Relocation',
    description: 'Minimize downtime with our efficient office moving services. We work around your schedule for seamless transitions.',
    color: 'sky',
  },
  {
    icon: Package,
    title: 'Packing Services',
    description: 'Professional packing with quality materials. We ensure your items are protected for safe transport.',
    color: 'amber',
  },
  {
    icon: Warehouse,
    title: 'Storage Solutions',
    description: 'Secure short-term and long-term storage facilities. Climate-controlled options available.',
    color: 'violet',
  },
  {
    icon: Truck,
    title: 'Long Distance',
    description: 'Moving across Kenya? We provide reliable long-distance moving services to any destination.',
    color: 'rose',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'All moves are fully insured for your peace of mind. Comprehensive protection for your belongings.',
    color: 'teal',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'group-hover:border-emerald-200' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'group-hover:border-sky-200' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'group-hover:border-amber-200' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'group-hover:border-violet-200' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-600', border: 'group-hover:border-rose-200' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'group-hover:border-teal-200' },
};

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Complete Moving Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From packing to unpacking, we offer comprehensive moving services tailored to your needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = colorClasses[service.color];
            const Icon = service.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`group h-full bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 ${colors.border}`}>
                  <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className={`inline-flex items-center ${colors.text} font-medium group-hover:underline`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/book"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-200"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

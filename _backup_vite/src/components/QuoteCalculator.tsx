import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Home, Building2, Package, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const propertyTypes = [
  { id: 'bedsitter', label: 'Bedsitter', basePrice: 3000, icon: Home },
  { id: 'apartment-1br', label: '1 Bedroom', basePrice: 5000, icon: Home },
  { id: 'apartment-2br', label: '2 Bedroom', basePrice: 8000, icon: Home },
  { id: 'apartment-3br', label: '3 Bedroom', basePrice: 12000, icon: Home },
  { id: 'house', label: 'House (4+ BR)', basePrice: 18000, icon: Building2 },
  { id: 'office-small', label: 'Small Office', basePrice: 10000, icon: Building2 },
  { id: 'office-large', label: 'Large Office', basePrice: 25000, icon: Building2 },
];

const distances = [
  { id: 'local', label: 'Within Eldoret', multiplier: 1 },
  { id: 'nearby', label: 'Nearby Towns (50km)', multiplier: 1.5 },
  { id: 'regional', label: 'Regional (100km)', multiplier: 2 },
  { id: 'long', label: 'Long Distance (200km+)', multiplier: 3 },
];

const extras = [
  { id: 'packing', label: 'Full Packing Service', price: 3000 },
  { id: 'unpacking', label: 'Unpacking Service', price: 2000 },
  { id: 'storage', label: 'Temporary Storage (per day)', price: 500 },
  { id: 'insurance', label: 'Premium Insurance', price: 1500 },
];

const QuoteCalculator: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState('apartment-2br');
  const [selectedDistance, setSelectedDistance] = useState('local');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const estimate = useMemo(() => {
    const property = propertyTypes.find(p => p.id === selectedProperty);
    const distance = distances.find(d => d.id === selectedDistance);
    
    if (!property || !distance) return 0;

    let total = property.basePrice * distance.multiplier;
    
    selectedExtras.forEach(extraId => {
      const extra = extras.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });

    return Math.round(total);
  }, [selectedProperty, selectedDistance, selectedExtras]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Instant Quote
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Estimate Your Moving Cost
          </h2>
          <p className="text-lg text-gray-600">
            Get an instant estimate for your move. Final pricing may vary based on specific requirements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-8 md:p-10"
        >
          {/* Property Type */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="w-5 h-5 mr-2 text-emerald-500" />
              Property Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {propertyTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedProperty(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedProperty === type.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-emerald-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${
                      selectedProperty === type.id ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-medium ${
                      selectedProperty === type.id ? 'text-emerald-600' : 'text-gray-700'
                    }`}>
                      {type.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-emerald-500" />
              Distance
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {distances.map((dist) => (
                <button
                  key={dist.id}
                  onClick={() => setSelectedDistance(dist.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedDistance === dist.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-200'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    selectedDistance === dist.id ? 'text-emerald-600' : 'text-gray-700'
                  }`}>
                    {dist.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-emerald-500" />
              Additional Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extras.map((extra) => (
                <button
                  key={extra.id}
                  onClick={() => toggleExtra(extra.id)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    selectedExtras.includes(extra.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-200'
                  }`}
                >
                  <span className={`text-sm font-medium ${
                    selectedExtras.includes(extra.id) ? 'text-emerald-600' : 'text-gray-700'
                  }`}>
                    {extra.label}
                  </span>
                  <span className={`text-sm ${
                    selectedExtras.includes(extra.id) ? 'text-emerald-600' : 'text-gray-500'
                  }`}>
                    +KES {extra.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Estimate Result */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Estimated Cost</p>
                <p className="text-4xl font-bold">
                  KES {estimate.toLocaleString()}
                </p>
                <p className="text-emerald-100 text-xs mt-1">
                  *Final price may vary based on actual items and conditions
                </p>
              </div>
              <Link
                to="/book"
                className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteCalculator;

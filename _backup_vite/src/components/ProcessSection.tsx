import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Calendar, Truck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Request a Quote',
    description: 'Fill out our simple online form or call us. Tell us about your move and get a free, no-obligation quote.',
  },
  {
    icon: Calendar,
    step: '02',
    title: 'Schedule Your Move',
    description: 'Choose a date and time that works for you. We offer flexible scheduling including weekends.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'We Handle Everything',
    description: 'Our professional team arrives on time, packs carefully, and transports your belongings safely.',
  },
  {
    icon: CheckCircle2,
    step: '04',
    title: 'Settle Into Your New Space',
    description: 'We unload, unpack if needed, and ensure everything is in place. Welcome to your new home!',
  },
];

const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Moving Made Simple
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures a stress-free moving experience from start to finish.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                    {/* Step Number */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Step Badge */}
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold mb-4">
                      Step {step.step}
                    </span>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            to="/book"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-200"
          >
            Start Your Move Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;

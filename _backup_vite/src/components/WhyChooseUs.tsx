import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, Award, Truck, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All moves are covered by comprehensive insurance for complete peace of mind.',
  },
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    description: 'We respect your schedule and guarantee punctual arrival and completion.',
  },
  {
    icon: Users,
    title: 'Trained Professionals',
    description: 'Our team is professionally trained in handling all types of items with care.',
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: '10+ years of experience delivering exceptional moving services in Eldoret.',
  },
  {
    icon: Truck,
    title: 'Modern Fleet',
    description: 'Well-maintained vehicles of various sizes to handle any move efficiently.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We go the extra mile for every customer.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Eldoret's Most Trusted Moving Company
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              For over a decade, Vinisee Movers has been the go-to choice for families and businesses 
              in Eldoret. We combine professionalism with a personal touch to make every move a success.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602588711_2f95b73a.png"
                  alt="Professional mover"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602652020_79d4c4d2.jpg"
                  alt="Office relocation"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602585888_0873dedd.jpg"
                  alt="Moving team"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602654658_44bab51b.jpg"
                  alt="Packing service"
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10+</p>
                  <p className="text-sm text-gray-500">Years of Excellence</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

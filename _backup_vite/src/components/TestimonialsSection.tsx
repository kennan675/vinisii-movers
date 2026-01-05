import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Wanjiku',
    role: 'Homeowner',
    location: 'Elgon View, Eldoret',
    rating: 5,
    text: 'Vinisee Movers made our house move incredibly smooth. The team was professional, careful with our furniture, and finished ahead of schedule. Highly recommend!',
    avatar: 'SW',
  },
  {
    name: 'James Kiprop',
    role: 'Business Owner',
    location: 'CBD, Eldoret',
    rating: 5,
    text: 'We relocated our entire office over a weekend. Zero downtime on Monday! The team was efficient and handled our equipment with great care.',
    avatar: 'JK',
  },
  {
    name: 'Grace Akinyi',
    role: 'Apartment Resident',
    location: 'Langas, Eldoret',
    rating: 5,
    text: 'Affordable, reliable, and friendly. They packed everything perfectly and nothing was damaged. Will definitely use them again for my next move.',
    avatar: 'GA',
  },
  {
    name: 'Peter Ochieng',
    role: 'Family Move',
    location: 'Kapsoya, Eldoret',
    rating: 5,
    text: 'Moving with kids is stressful, but Vinisee made it easy. They were patient, organized, and even helped set up the kids\' beds first. Amazing service!',
    avatar: 'PO',
  },
  {
    name: 'Mary Chebet',
    role: 'Long Distance Move',
    location: 'Nairobi to Eldoret',
    rating: 5,
    text: 'Moved from Nairobi to Eldoret and everything arrived in perfect condition. Great communication throughout the journey. Professional team!',
    avatar: 'MC',
  },
  {
    name: 'David Mutua',
    role: 'Student',
    location: 'Moi University Area',
    rating: 5,
    text: 'As a student, I needed an affordable option. Vinisee offered great rates and the movers were super helpful. Quick and efficient service!',
    avatar: 'DM',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about their moving experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-gray-50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:border-emerald-100 hover:shadow-xl transition-all duration-300">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-emerald-200" />
                </div>

                {/* Rating */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">500+</p>
              <p className="text-emerald-100">Successful Moves</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">4.9</p>
              <p className="text-emerald-100">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">98%</p>
              <p className="text-emerald-100">Customer Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">10+</p>
              <p className="text-emerald-100">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

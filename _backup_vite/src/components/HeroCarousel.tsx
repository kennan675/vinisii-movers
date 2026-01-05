import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';
import ThreeScene from './ThreeScene';

const heroImages = [
  'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602543739_15e011d5.jpg',
  'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602550142_155d5954.jpg',
  'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602571047_2cd5c74b.png',
  'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602563976_c10ee8c7.png',
  'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602635704_81a6f3c0.png',
  'https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602625309_578a303b.jpg',
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const whatsappMessage = encodeURIComponent("Hello Vinisee Movers! I'd like to get a quote for my move.");
  const whatsappLink = `https://wa.me/254712345678?text=${whatsappMessage}`;

  const features = [
    'Professional & Trained Crew',
    'Fully Insured Moves',
    'Same-Day Service Available',
  ];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentIndex]}
            alt="Moving service"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />

      {/* 3D Scene Overlay */}
      <ThreeScene />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              Eldoret's #1 Moving Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
          >
            Moving Made{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
              Simple
            </span>
            <br />
            & Stress-Free
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 mb-8 max-w-lg"
          >
            Professional moving services for homes and offices in Eldoret and across Kenya. 
            We handle your belongings with care, so you can focus on your new beginning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Link
              to="/book"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300"
            >
              Book Your Move
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-green-200"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Get Free Quote
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-700"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-emerald-500'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Floating Stats Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hidden lg:block absolute right-8 bottom-24 z-20"
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-gray-100">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">500+</p>
              <p className="text-sm text-gray-500">Moves Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">4.9</p>
              <p className="text-sm text-gray-500">Customer Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">10+</p>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">24/7</p>
              <p className="text-sm text-gray-500">Support Available</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;

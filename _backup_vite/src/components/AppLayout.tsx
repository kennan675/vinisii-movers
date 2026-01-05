import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import QuoteCalculator from '@/components/QuoteCalculator';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <ServicesSection />
        <WhyChooseUs />
        <QuoteCalculator />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

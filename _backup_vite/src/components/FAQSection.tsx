import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I get a quote for my move?',
    answer: 'You can get a free quote by filling out our online booking form, calling us directly at +254 712 345 678, or chatting with us on WhatsApp. We\'ll assess your needs and provide a transparent quote with no hidden fees.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 1-2 weeks in advance, especially during peak moving seasons (end of month, holidays). However, we do offer same-day and next-day services when available.',
  },
  {
    question: 'Are my belongings insured during the move?',
    answer: 'Yes! All moves are covered by our basic insurance. We also offer additional comprehensive coverage options for valuable items. Ask our team about our insurance packages.',
  },
  {
    question: 'Do you provide packing materials?',
    answer: 'Yes, we provide all necessary packing materials including boxes, tape, bubble wrap, and protective covers. You can also opt for our full packing service where our team handles everything.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve Eldoret and the surrounding areas. We also offer long-distance moving services across Kenya, including Nairobi, Mombasa, Kisumu, and other major cities.',
  },
  {
    question: 'Can you move specialty items like pianos or artwork?',
    answer: 'Absolutely! Our team is trained to handle specialty items including pianos, artwork, antiques, and fragile electronics. We use specialized equipment and techniques to ensure safe transport.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept M-Pesa, bank transfers, and cash payments. A deposit may be required for larger moves, with the balance due upon completion of the move.',
  },
  {
    question: 'What if I need to reschedule my move?',
    answer: 'We understand plans can change. Please notify us at least 48 hours before your scheduled move to reschedule without any fees. Last-minute changes may incur a small rescheduling fee.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our moving services.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  openIndex === index
                    ? 'border-emerald-200 shadow-lg'
                    : 'border-gray-100 hover:border-emerald-100'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      openIndex === index ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <HelpCircle className={`w-5 h-5 ${
                        openIndex === index ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <span className={`font-medium transition-colors ${
                      openIndex === index ? 'text-emerald-600' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-20">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="https://wa.me/254712345678?text=Hello%20Vinisee%20Movers!%20I%20have%20a%20question..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
          >
            Chat With Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

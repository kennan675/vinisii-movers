import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, Phone, Mail, Clock, MessageCircle, Send, 
  Facebook, Instagram, Twitter, Loader2 
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Elgon View, Uganda Road', 'Eldoret, Kenya'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+254 712 345 678', '+254 723 456 789'],
    links: ['tel:+254712345678', 'tel:+254723456789'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@viniseemovers.co.ke', 'bookings@viniseemovers.co.ke'],
    links: ['mailto:info@viniseemovers.co.ke', 'mailto:bookings@viniseemovers.co.ke'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Sat: 6:00 AM - 8:00 PM', 'Sunday: 8:00 AM - 6:00 PM'],
  },
];

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      toast({
        title: 'Please fill in required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you as soon as possible.',
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

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
                Contact Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Get in Touch{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                  With Us
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{info.title}</h3>
                    {info.details.map((detail, dIndex) => (
                      info.links ? (
                        <a
                          key={dIndex}
                          href={info.links[dIndex]}
                          className="block text-gray-600 hover:text-emerald-600 transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={dIndex} className="text-gray-600">{detail}</p>
                      )
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+254 7XX XXX XXX"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select a subject</option>
                          <option value="quote">Get a Quote</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="feedback">Feedback</option>
                          <option value="complaint">Complaint</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Map & Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Map Placeholder */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.75772090774!2d35.20899!3d0.5143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101f5e2a9f6a7%3A0x8c8c8c8c8c8c8c8c!2sEldoret%2C%20Kenya!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vinisee Movers Location"
                  />
                </div>

                {/* Quick Contact */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="text-emerald-100 mb-6">
                    Chat with us on WhatsApp for quick responses or call us directly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </a>
                    <a
                      href="tel:+254712345678"
                      className="flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                  <p className="text-gray-600 mb-6">
                    Stay connected with us on social media for updates and moving tips.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-gray-100 hover:bg-emerald-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-gray-100 hover:bg-emerald-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-gray-100 hover:bg-emerald-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

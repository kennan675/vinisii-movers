import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Award, Users, Truck, Target, Heart, Shield, CheckCircle } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Successful Moves' },
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Team Members' },
  { value: '4.9', label: 'Customer Rating' },
];

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Every decision we make is guided by what\'s best for our customers. Your satisfaction is our success.',
  },
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'We handle your belongings as if they were our own. Honesty and transparency in everything we do.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for perfection in every move. Continuous improvement is part of our DNA.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description: 'Our strength lies in our team. Together, we achieve what seems impossible.',
  },
];

const team = [
  { name: 'John Kibet', role: 'Founder & CEO', avatar: 'JK' },
  { name: 'Mary Wanjiku', role: 'Operations Manager', avatar: 'MW' },
  { name: 'Peter Ochieng', role: 'Fleet Manager', avatar: 'PO' },
  { name: 'Grace Akinyi', role: 'Customer Relations', avatar: 'GA' },
];

const About: React.FC = () => {
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
                About Us
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Moving Eldoret Forward,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                  One Home at a Time
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                For over a decade, Vinisee Movers has been the trusted partner for families and 
                businesses in Eldoret and across Kenya, delivering exceptional moving services with care and professionalism.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  From Humble Beginnings to Eldoret's Premier Movers
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Vinisee Movers was founded in 2015 with a simple mission: to make moving less stressful 
                    for the people of Eldoret. What started as a small operation with just one truck has 
                    grown into a full-service moving company with a fleet of modern vehicles and a team of 
                    over 50 dedicated professionals.
                  </p>
                  <p>
                    Our founder, John Kibet, experienced firsthand the challenges of moving when he relocated 
                    his family to Eldoret. The lack of reliable, professional moving services inspired him to 
                    create something better. Today, Vinisee Movers is synonymous with trust, reliability, and 
                    exceptional service.
                  </p>
                  <p>
                    We've helped over 500 families and businesses move safely, and we continue to grow while 
                    maintaining the personal touch that made us successful in the first place.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/695b78f7a1cfebbafdc3dbda_1767602543739_15e011d5.jpg"
                  alt="Vinisee Movers team"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Since 2015</p>
                      <p className="text-sm text-gray-500">Serving Eldoret</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What Drives Us Every Day
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our core values guide every decision and interaction, ensuring we deliver the best possible service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Meet the Leadership
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The dedicated professionals behind Vinisee Movers' success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-500 to-emerald-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
                "To provide stress-free, reliable, and affordable moving services that exceed 
                expectations, treating every customer's belongings with the care and respect they deserve."
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {['Reliability', 'Affordability', 'Professionalism', 'Care'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

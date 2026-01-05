import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, Calendar, Clock, Home, Building2, Package, 
  Phone, User, Mail, FileText, CheckCircle, ArrowRight, 
  ArrowLeft, Loader2, MessageCircle, Warehouse
} from 'lucide-react';

const propertyTypes = [
  { value: 'bedsitter', label: 'Bedsitter', icon: Home },
  { value: 'apartment', label: 'Apartment', icon: Home },
  { value: 'house', label: 'House', icon: Home },
  { value: 'office', label: 'Office', icon: Building2 },
  { value: 'warehouse', label: 'Warehouse', icon: Warehouse },
];

const BookMove: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    destination: '',
    moveDate: '',
    moveTime: '',
    propertyType: '',
    itemNotes: '',
  });

  const generateBookingRef = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `VIN-${year}-${random}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePropertySelect = (value: string) => {
    setFormData(prev => ({ ...prev, propertyType: value }));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.pickupLocation && formData.destination;
      case 2:
        return formData.moveDate && formData.moveTime && formData.propertyType;
      case 3:
        return formData.customerName && formData.phone;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    } else {
      toast({
        title: 'Please fill in all required fields',
        variant: 'destructive',
      });
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      toast({
        title: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    const ref = generateBookingRef();

    try {
      const { error } = await supabase.from('bookings').insert({
        booking_ref: ref,
        customer_name: formData.customerName,
        phone: formData.phone,
        email: formData.email || null,
        pickup_location: formData.pickupLocation,
        destination: formData.destination,
        move_date: formData.moveDate,
        move_time: formData.moveTime,
        property_type: formData.propertyType,
        item_notes: formData.itemNotes || null,
        status: 'new',
      });

      if (error) throw error;

      // Send notification (optional - won't fail if edge function fails)
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            bookingRef: ref,
            customerName: formData.customerName,
            phone: formData.phone,
            pickupLocation: formData.pickupLocation,
            destination: formData.destination,
            moveDate: formData.moveDate,
            moveTime: formData.moveTime,
            propertyType: formData.propertyType,
          },
        });
      } catch (notifError) {
        console.log('Notification not sent:', notifError);
      }

      setBookingRef(ref);
      setStep(4);
      toast({
        title: 'Booking Submitted!',
        description: `Your booking reference is ${ref}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error submitting booking',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vinisee Movers! I just submitted a booking (Ref: ${bookingRef || 'pending'}). ` +
    `Moving from ${formData.pickupLocation} to ${formData.destination} on ${formData.moveDate}.`
  );
  const whatsappLink = `https://wa.me/254712345678?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              Book Your Move
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Let's Plan Your Move
            </h1>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you with a quote.
            </p>
          </motion.div>

          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      s <= step
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 sm:w-24 h-1 mx-2 rounded transition-colors ${
                        s < step ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Form Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            {/* Step 1: Locations */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Where are you moving?</h2>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Elgon View, Eldoret"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                    Destination *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="e.g., Kapsoya, Eldoret"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Move Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                      Move Date *
                    </label>
                    <input
                      type="date"
                      name="moveDate"
                      value={formData.moveDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      name="moveTime"
                      value={formData.moveTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
                    <Home className="w-4 h-4 mr-2 text-emerald-500" />
                    Property Type *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handlePropertySelect(type.value)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.propertyType === type.value
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-200'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${
                            formData.propertyType === type.value ? 'text-emerald-600' : 'text-gray-400'
                          }`} />
                          <p className={`text-sm font-medium ${
                            formData.propertyType === type.value ? 'text-emerald-600' : 'text-gray-600'
                          }`}>
                            {type.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 mr-2 text-emerald-500" />
                    Item Notes (Optional)
                  </label>
                  <textarea
                    name="itemNotes"
                    value={formData.itemNotes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="List major items, special requirements, or anything we should know..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Contact Details</h2>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-emerald-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-emerald-500" />
                    Phone Number *
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
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                    Email (Optional)
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

                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">From:</span> {formData.pickupLocation}</p>
                    <p><span className="text-gray-500">To:</span> {formData.destination}</p>
                    <p><span className="text-gray-500">Date:</span> {formData.moveDate} at {formData.moveTime}</p>
                    <p><span className="text-gray-500">Property:</span> {formData.propertyType}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Submitted!</h2>
                <p className="text-gray-600 mb-2">Your booking reference is:</p>
                <p className="text-3xl font-bold text-emerald-600 mb-6">{bookingRef}</p>
                <p className="text-gray-600 mb-8">
                  We'll contact you shortly to confirm your move and provide a quote.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href="tel:+254712345678"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Us Now
                  </a>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between mt-10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Booking
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookMove;

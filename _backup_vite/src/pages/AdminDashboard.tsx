import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Truck, Users, Calendar, Package, ChevronRight, Plus,
  Search, Filter, MoreVertical, Phone, MapPin, Clock,
  CheckCircle, AlertCircle, Loader2, X, User, Car
} from 'lucide-react';

interface Booking {
  id: string;
  booking_ref: string;
  customer_name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  move_date: string;
  move_time: string;
  property_type: string;
  item_notes: string | null;
  status: string;
  created_at: string;
}

interface Staff {
  id: string;
  name: string;
  phone: string;
  role: string;
  is_available: boolean;
  jobs_completed: number;
  rating: number;
}

interface Vehicle {
  id: string;
  name: string;
  plate_number: string;
  vehicle_type: string;
  capacity: string;
  is_available: boolean;
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  scheduled: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  in_progress: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
};

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'jobs' | 'staff' | 'vehicles'>('jobs');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, staffRes, vehiclesRes] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('staff').select('*').order('name'),
        supabase.from('vehicles').select('*').order('name'),
      ]);

      if (bookingsRes.data) setBookings(bookingsRes.data);
      if (staffRes.data) setStaff(staffRes.data);
      if (vehiclesRes.data) setVehicles(vehiclesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast({ title: 'Status updated successfully' });
    } catch (error: any) {
      toast({ title: 'Error updating status', description: error.message, variant: 'destructive' });
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.booking_ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pickup_location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    new: bookings.filter(b => b.status === 'new').length,
    inProgress: bookings.filter(b => b.status === 'in_progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-gray-900">Vinisee Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/staff"
                className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Staff Portal
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
              >
                View Website
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Jobs', value: stats.total, icon: Package, color: 'emerald' },
            { label: 'New Requests', value: stats.new, icon: AlertCircle, color: 'blue' },
            { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'purple' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'green' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {[
            { id: 'jobs', label: 'Jobs', icon: Package },
            { id: 'staff', label: 'Staff', icon: Users },
            { id: 'vehicles', label: 'Vehicles', icon: Car },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Search & Filter */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, reference, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Jobs List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No bookings found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredBookings.map((booking) => {
                  const status = statusColors[booking.status] || statusColors.new;
                  return (
                    <div
                      key={booking.id}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowModal(true);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-gray-900">{booking.booking_ref}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} mr-1.5`} />
                              {booking.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium">{booking.customer_name}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.pickup_location} → {booking.destination}
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(booking.move_date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.move_time}
                            </span>
                            <span className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {booking.phone}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === 'staff' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Team Members</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Staff</span>
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {staff.map((member) => (
                <div key={member.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{member.jobs_completed} jobs</p>
                      <p className="text-xs text-gray-500">Rating: {member.rating}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {member.is_available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Fleet Management</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vehicle.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {vehicle.is_available ? 'Available' : 'In Use'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{vehicle.name}</h4>
                  <p className="text-sm text-gray-500">{vehicle.plate_number}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 capitalize">{vehicle.vehicle_type}</span>
                    <span className="text-xs font-medium text-gray-700">{vehicle.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedBooking.booking_ref}</h3>
                <p className="text-sm text-gray-500">Booking Details</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Customer</h4>
                <p className="font-semibold text-gray-900">{selectedBooking.customer_name}</p>
                <a href={`tel:${selectedBooking.phone}`} className="text-emerald-600 hover:underline">
                  {selectedBooking.phone}
                </a>
              </div>

              {/* Locations */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Route</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="text-gray-900">{selectedBooking.pickup_location}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">To</p>
                      <p className="text-gray-900">{selectedBooking.destination}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Date</h4>
                  <p className="text-gray-900">{new Date(selectedBooking.move_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Time</h4>
                  <p className="text-gray-900">{selectedBooking.move_time}</p>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Property Type</h4>
                <p className="text-gray-900 capitalize">{selectedBooking.property_type}</p>
              </div>

              {/* Notes */}
              {selectedBooking.item_notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                  <p className="text-gray-900">{selectedBooking.item_notes}</p>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  {['new', 'scheduled', 'in_progress', 'completed'].map((status) => {
                    const colors = statusColors[status];
                    return (
                      <button
                        key={status}
                        onClick={() => {
                          updateBookingStatus(selectedBooking.id, status);
                          setSelectedBooking({ ...selectedBooking, status });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedBooking.status === status
                            ? `${colors.bg} ${colors.text}`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Close
              </button>
              <a
                href={`https://wa.me/${selectedBooking.phone.replace(/\D/g, '')}?text=Hello ${selectedBooking.customer_name}, regarding your booking ${selectedBooking.booking_ref}...`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                WhatsApp Customer
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

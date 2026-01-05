import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Truck, MapPin, Calendar, Clock, Phone, User,
  CheckCircle, Package, Navigation, Loader2, RefreshCw
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
}

const statusSteps = [
  { id: 'scheduled', label: 'Scheduled', icon: Calendar },
  { id: 'in_progress', label: 'In Progress', icon: Truck },
  { id: 'arrived', label: 'Arrived', icon: MapPin },
  { id: 'loaded', label: 'Loaded', icon: Package },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const StaffDashboard: React.FC = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Booking | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .in('status', ['scheduled', 'in_progress'])
        .order('move_date', { ascending: true });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (jobId: string, newStatus: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', jobId);

      if (error) throw error;

      if (newStatus === 'completed') {
        setJobs(prev => prev.filter(j => j.id !== jobId));
        setSelectedJob(null);
      } else {
        setJobs(prev =>
          prev.map(j => (j.id === jobId ? { ...j, status: newStatus } : j))
        );
        if (selectedJob?.id === jobId) {
          setSelectedJob({ ...selectedJob, status: newStatus });
        }
      }

      toast({
        title: 'Status Updated',
        description: `Job marked as ${newStatus.replace('_', ' ')}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIndex = (status: string) => {
    const index = statusSteps.findIndex(s => s.id === status);
    return index >= 0 ? index : 0;
  };

  const todayJobs = jobs.filter(
    j => new Date(j.move_date).toDateString() === new Date().toDateString()
  );
  const upcomingJobs = jobs.filter(
    j => new Date(j.move_date) > new Date()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold">Staff Portal</h1>
                <p className="text-xs text-emerald-100">Vinisee Movers</p>
              </div>
            </div>
            <button
              onClick={fetchJobs}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Today's Jobs</p>
            <p className="text-2xl font-bold text-gray-900">{todayJobs.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Upcoming</p>
            <p className="text-2xl font-bold text-gray-900">{upcomingJobs.length}</p>
          </div>
        </div>

        {/* Job List or Detail View */}
        {selectedJob ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Job Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
              <button
                onClick={() => setSelectedJob(null)}
                className="text-sm text-emerald-100 hover:text-white mb-2"
              >
                ← Back to Jobs
              </button>
              <h2 className="text-xl font-bold">{selectedJob.booking_ref}</h2>
              <p className="text-emerald-100">{selectedJob.customer_name}</p>
            </div>

            {/* Status Progress */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Job Progress</h3>
              <div className="flex items-center justify-between">
                {statusSteps.slice(0, 4).map((step, index) => {
                  const Icon = step.icon;
                  const currentIndex = getStatusIndex(selectedJob.status);
                  const isCompleted = index <= currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-gray-100 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs mt-2 ${isCompleted ? 'text-emerald-600 font-medium' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                      </div>
                      {index < 3 && (
                        <div className={`flex-1 h-1 mx-2 rounded ${
                          index < currentIndex ? 'bg-emerald-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Job Details */}
            <div className="p-6 space-y-4">
              {/* Route */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Pickup</p>
                    <p className="font-medium text-gray-900">{selectedJob.pickup_location}</p>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedJob.pickup_location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-medium text-gray-900">{selectedJob.destination}</p>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedJob.destination)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Time & Property */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedJob.move_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">{selectedJob.move_time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Property</p>
                  <p className="font-medium text-gray-900 capitalize">{selectedJob.property_type}</p>
                </div>
              </div>

              {/* Notes */}
              {selectedJob.item_notes && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">
                    {selectedJob.item_notes}
                  </p>
                </div>
              )}

              {/* Customer Contact */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`tel:${selectedJob.phone}`}
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Customer</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-3">Update Status</p>
              <div className="grid grid-cols-2 gap-3">
                {selectedJob.status === 'scheduled' && (
                  <button
                    onClick={() => updateJobStatus(selectedJob.id, 'in_progress')}
                    disabled={updating}
                    className="col-span-2 flex items-center justify-center space-x-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                  >
                    {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Truck className="w-5 h-5" />}
                    <span>Start Move</span>
                  </button>
                )}
                {selectedJob.status === 'in_progress' && (
                  <>
                    <button
                      onClick={() => updateJobStatus(selectedJob.id, 'in_progress')}
                      disabled={updating}
                      className="flex items-center justify-center space-x-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      <MapPin className="w-5 h-5" />
                      <span>Arrived</span>
                    </button>
                    <button
                      onClick={() => updateJobStatus(selectedJob.id, 'in_progress')}
                      disabled={updating}
                      className="flex items-center justify-center space-x-2 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      <Package className="w-5 h-5" />
                      <span>Loaded</span>
                    </button>
                    <button
                      onClick={() => updateJobStatus(selectedJob.id, 'completed')}
                      disabled={updating}
                      className="col-span-2 flex items-center justify-center space-x-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                    >
                      {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                      <span>Mark as Delivered</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Today's Jobs */}
            {todayJobs.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Today's Jobs</h2>
                <div className="space-y-3">
                  {todayJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedJob(job)}
                      className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-emerald-500 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{job.booking_ref}</p>
                          <p className="text-sm text-gray-600">{job.customer_name}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.move_time}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'in_progress'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {job.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 truncate">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {job.pickup_location} → {job.destination}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Jobs */}
            {upcomingJobs.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Jobs</h2>
                <div className="space-y-3">
                  {upcomingJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedJob(job)}
                      className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{job.booking_ref}</p>
                          <p className="text-sm text-gray-600">{job.customer_name}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(job.move_date).toLocaleDateString()} at {job.move_time}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {jobs.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Jobs</h3>
                <p className="text-gray-500">You don't have any assigned jobs at the moment.</p>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            )}
          </>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <div className="max-w-lg mx-auto flex justify-around">
            <Link to="/staff" className="flex flex-col items-center text-emerald-600">
              <Package className="w-6 h-6" />
              <span className="text-xs mt-1">Jobs</span>
            </Link>
            <Link to="/" className="flex flex-col items-center text-gray-400">
              <Truck className="w-6 h-6" />
              <span className="text-xs mt-1">Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

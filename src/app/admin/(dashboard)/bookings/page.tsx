'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_date: string | null;
  event_type: string | null;
  message: string | null;
  status: 'pending' | 'confirmed' | 'declined' | 'completed';
  created_at: string;
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'declined', 'completed'] as const;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const supabase = createClient();

  const fetchBookings = async () => {
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data } = await query;
    setBookings(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    if (status) setStatusFilter(status);
  }, []);

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      await supabase.from('bookings').update({ status }).eq('id', id);
      await fetchBookings();
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update booking');
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'declined': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
            Bookings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage booking inquiries and opportunities
          </p>
        </div>
        <div className="flex gap-2">
          {['all', ...STATUS_OPTIONS].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                statusFilter === status
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No bookings yet</p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            Booking inquiries from your website will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {booking.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <a href={`mailto:${booking.email}`} className="hover:text-gray-900 dark:hover:text-white">
                        {booking.email}
                      </a>
                    </p>
                    {booking.phone && (
                      <p>
                        <a href={`tel:${booking.phone}`} className="hover:text-gray-900 dark:hover:text-white">
                          {booking.phone}
                        </a>
                      </p>
                    )}
                    {booking.event_date && (
                      <p>Event date: {formatDate(booking.event_date)}</p>
                    )}
                    {booking.event_type && (
                      <p>Event type: {booking.event_type}</p>
                    )}
                  </div>
                  {booking.message && (
                    <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                      &ldquo;{booking.message}&rdquo;
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                    Submitted {formatDate(booking.created_at)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(booking.id, status)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                        booking.status === status
                          ? getStatusColor(status)
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  let photosCount = 0;
  let bookingsCount = 0;
  let pendingCount = 0;

  try {
    const [photosRes, bookingsRes, pendingRes] = await Promise.all([
      supabase.from('photos').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    ]);
    photosCount = photosRes.count ?? 0;
    bookingsCount = bookingsRes.count ?? 0;
    pendingCount = pendingRes.count ?? 0;
  } catch {
    // Tables may not exist yet - show zeros
  }

  const stats = [
    { label: 'Total Photos', value: photosCount, href: '/admin/photos', color: 'bg-blue-500' },
    { label: 'Total Bookings', value: bookingsCount, href: '/admin/bookings', color: 'bg-emerald-500' },
    { label: 'Pending Bookings', value: pendingCount, href: '/admin/bookings?status=pending', color: 'bg-amber-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here&apos;s an overview of your site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {stat.label}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View & manage →
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/photos?upload=true"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Photos
          </Link>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('contact').insert({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: (formData.get('phone') as string) || null,
        event_date: (formData.get('event_date') as string) || null,
        event_type: (formData.get('event_type') as string) || null,
        message: (formData.get('message') as string) || null,
      });

      if (error) throw error;

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-cream-light dark:bg-gray-900/20 border-2 border-dusty-rose dark:border-gray-700 rounded-3xl p-8 text-center shadow-soft">
        <p className="text-lg font-medium text-cream-dark dark:text-cream">
          Thank you! Your inquiry has been received.
        </p>
        <p className="text-coral dark:text-cream mt-2">
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto text-left">
      {error && (
        <div className="p-4 bg-cream-light dark:bg-gray-900/20 border-2 border-dusty-rose dark:border-gray-700 rounded-2xl text-cream-dark dark:text-cream text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-cream-dark dark:text-cream mb-2">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-2xl border-2 border-dusty-rose dark:border-gray-700 bg-white dark:bg-gray-800 text-cream-dark dark:text-cream focus:ring-2 focus:ring-coral dark:focus:ring-coral focus:border-coral transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-cream-dark dark:text-cream mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-2xl border-2 border-dusty-rose dark:border-gray-700 bg-white dark:bg-gray-800 text-cream-dark dark:text-cream focus:ring-2 focus:ring-coral dark:focus:ring-coral focus:border-coral transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-cream-dark dark:text-cream mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-2xl border-2 border-dusty-rose dark:border-gray-700 bg-white dark:bg-gray-800 text-cream-dark dark:text-cream focus:ring-2 focus:ring-coral dark:focus:ring-coral focus:border-coral transition-all"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-cream-dark dark:text-cream mb-2">
            Event Date
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            className="w-full px-4 py-3 rounded-2xl border-2 border-dusty-rose dark:border-gray-700 bg-white dark:bg-gray-800 text-cream-dark dark:text-cream focus:ring-2 focus:ring-coral dark:focus:ring-coral focus:border-coral transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="event_type" className="block text-sm font-medium text-cream-dark dark:text-cream mb-2">
          Type of Session
        </label>
        <select
          id="event_type"
          name="event_type"
          className="w-full px-4 py-3 rounded-2xl border-2 border-dusty-rose dark:border-gray-700 bg-white dark:bg-gray-800 text-cream-dark dark:text-cream focus:ring-2 focus:ring-coral dark:focus:ring-coral focus:border-coral transition-all"
        >
          <option value="">Select...</option>
          <option value="Wedding">Wedding</option>
          <option value="Portrait">Portrait</option>
          <option value="Family">Family</option>
          <option value="Event">Event</option>
          <option value="Commercial">Commercial</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-cream-dark dark:text-cream mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 rounded-2xl border-2 border-dusty-rose dark:border-gray-700 bg-white dark:bg-gray-800 text-cream-dark dark:text-cream focus:ring-2 focus:ring-coral dark:focus:ring-coral focus:border-coral transition-all resize-none"
          placeholder="Tell us about your vision..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 px-4 bg-coral text-white font-medium rounded-2xl hover:bg-coral-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-soft-lg transform hover:scale-[1.02]"
      >
        {submitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}


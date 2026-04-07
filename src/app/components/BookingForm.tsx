'use client';

import { useRef, useState } from 'react';

const PHOTOGRAPHER_EMAIL =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_EMAIL ?? 'hello@taylorrosereels.com';

/** E.164-style number for sms: links (e.g. +15551234567). */
const PHOTOGRAPHER_SMS_NUMBER =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_PHONE ?? '+1234567890';

function getField(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === 'string' ? v.trim() : '';
}

function buildInquiryBody(formData: FormData): string {
  const name = getField(formData, 'name');
  const email = getField(formData, 'email');
  const phone = getField(formData, 'phone');
  const eventDate = getField(formData, 'event_date');
  const eventType = getField(formData, 'event_type');
  const message = getField(formData, 'message');

  return [
    'New inquiry from the website contact form',
    '',
    `Name: ${name || '—'}`,
    `Email: ${email || '—'}`,
    `Phone: ${phone || '—'}`,
    `Event date: ${eventDate || '—'}`,
    `Type of session: ${eventType || '—'}`,
    '',
    'Message:',
    message || '—',
  ].join('\n');
}

function buildMailtoUrl(formData: FormData): string {
  const name = getField(formData, 'name');
  const subject = `Photography inquiry from ${name || 'website'}`;
  const body = buildInquiryBody(formData);
  return `mailto:${PHOTOGRAPHER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildSmsUrl(formData: FormData): string {
  const body = buildInquiryBody(formData);
  const digits = PHOTOGRAPHER_SMS_NUMBER.replace(/[^\d+]/g, '');
  return `sms:${digits}?body=${encodeURIComponent(body)}`;
}

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [successKind, setSuccessKind] = useState<'email' | 'sms' | null>(null);

  const validate = (formData: FormData): string | null => {
    if (!getField(formData, 'name')) return 'Please enter your name.';
    if (!getField(formData, 'email')) return 'Please enter your email.';
    return null;
  };

  const openEmail = () => {
    const form = formRef.current;
    if (!form) return;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const v = validate(formData);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    const url = buildMailtoUrl(formData);
    if (url.length > 1800) {
      setError('Your message is too long for email links. Please shorten it or email us directly.');
      return;
    }
    window.location.href = url;
    setSuccessKind('email');
  };

  const openSms = () => {
    const form = formRef.current;
    if (!form) return;
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const v = validate(formData);
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    const url = buildSmsUrl(formData);
    if (url.length > 1800) {
      setError('Your message is too long for a text link. Please shorten it or text us a shorter note.');
      return;
    }
    window.location.href = url;
    setSuccessKind('sms');
  };

  if (successKind) {
    return (
      <div className="bg-cream-light dark:bg-gray-900/20 border-2 border-dusty-rose dark:border-gray-700 rounded-3xl p-8 text-center shadow-soft">
        <p className="text-lg font-medium text-cream-dark dark:text-cream">
          {successKind === 'email'
            ? 'Your email app should open with your message ready to send.'
            : 'Your messaging app should open with your text ready to send.'}
        </p>
        <p className="text-coral dark:text-cream mt-2 text-sm">
          If nothing opened, check that you have a default mail or SMS app set, or contact us directly at{' '}
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}`}
            className="underline hover:text-coral-dark"
          >
            {PHOTOGRAPHER_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSuccessKind(null)}
          className="mt-6 px-6 py-2 rounded-2xl border-2 border-dusty-rose dark:border-gray-600 text-cream-dark dark:text-cream text-sm font-medium hover:bg-cream dark:hover:bg-gray-800 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="space-y-6 max-w-xl mx-auto text-left">
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

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={openEmail}
          className="flex-1 py-3 px-4 bg-coral text-white font-medium rounded-2xl hover:bg-coral-dark transition-all shadow-soft hover:shadow-soft-lg transform hover:scale-[1.02]"
        >
          Send via email
        </button>
        <button
          type="button"
          onClick={openSms}
          className="flex-1 py-3 px-4 border-2 border-coral text-coral dark:text-coral font-medium rounded-2xl hover:bg-coral/10 transition-all"
        >
          Send via text
        </button>
      </div>
      <p className="text-xs text-cream-dark/80 dark:text-cream/70 text-center">
        Opens your email or messages app with this form filled in—you send the message from your device.
      </p>
    </form>
  );
}

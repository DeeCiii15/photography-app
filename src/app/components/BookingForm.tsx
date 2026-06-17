'use client';

import { useRef, useState } from 'react';
import { PHOTOGRAPHER_EMAIL } from '@/lib/siteConfig';

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

function buildSubject(formData: FormData): string {
  const name = getField(formData, 'name');
  return `Photography inquiry from ${name || 'website'}`;
}

function buildMailtoUrl(formData: FormData): string {
  const subject = buildSubject(formData);
  const body = buildInquiryBody(formData);
  return `mailto:${PHOTOGRAPHER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildGmailComposeUrl(formData: FormData): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: PHOTOGRAPHER_EMAIL,
    su: buildSubject(formData),
    body: buildInquiryBody(formData),
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Programmatic mailto — more reliable than assigning window.location.href */
function triggerMailto(url: string) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

type BookingFormProps = {
  className?: string;
};

const fieldClass =
  'font-body box-border w-full min-w-0 max-w-full rounded-xl border border-boho-sage/35 bg-white/80 px-5 py-4 text-lg leading-normal text-cream-dark shadow-sm transition-all focus:border-coral focus:outline-none focus:ring-2 focus:ring-boho-sage/20 dark:border-boho-stone/55 dark:bg-boho-stone/80 dark:text-cream dark:focus:ring-coral/30';

const fieldWrapClass = 'min-w-0 w-full max-w-full';

const labelClass =
  'font-display mb-3 block text-xl leading-snug text-cream-dark dark:text-cream md:text-2xl';

export default function BookingForm({ className }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [gmailUrl, setGmailUrl] = useState('');

  const validate = (formData: FormData): string | null => {
    if (!getField(formData, 'name')) return 'I’d love to know your name.';
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
    const mailto = buildMailtoUrl(formData);
    if (mailto.length > 1800) {
      setError('Your message is too long for email links. Please shorten it or email us directly.');
      return;
    }
    const gmail = buildGmailComposeUrl(formData);
    setMailtoUrl(mailto);
    setGmailUrl(gmail);
    triggerMailto(mailto);
    window.setTimeout(() => setSent(true), 100);
  };

  if (sent) {
    return (
      <div
        className={`rounded-2xl border border-boho-sage/30 bg-cream-light/95 p-10 text-center shadow-soft backdrop-blur-sm dark:border-boho-stone/50 dark:bg-boho-bark/45 ${className ?? ''}`}
      >
        <p className="font-display text-2xl leading-relaxed text-cream-dark dark:text-cream md:text-3xl">
          Your email should pop open with your note ready—I can’t wait to read it.
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-cream-dark/88 dark:text-cream/85 md:text-lg">
          If nothing opened, use one of the buttons below or email me at{' '}
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}`}
            className="text-coral underline decoration-coral/40 underline-offset-2 hover:text-coral-dark dark:text-[#e8b896]"
          >
            {PHOTOGRAPHER_EMAIL}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={mailtoUrl}
            className="font-display inline-flex min-h-12 w-full max-w-xs touch-manipulation items-center justify-center rounded-full border border-boho-bark/10 bg-coral px-8 py-4 text-xl text-white shadow-soft transition hover:bg-coral-dark hover:shadow-soft-lg sm:w-auto sm:text-2xl"
          >
            Open in email app
          </a>
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display inline-flex min-h-12 w-full max-w-xs touch-manipulation items-center justify-center rounded-full border border-coral/50 bg-white/60 px-8 py-4 text-xl text-coral backdrop-blur-sm transition hover:bg-coral/10 dark:bg-boho-bark/40 dark:text-coral sm:w-auto sm:text-2xl"
          >
            Open in Gmail
          </a>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="font-display mt-8 rounded-full border border-boho-sage/35 px-10 py-4 text-xl text-cream-dark transition hover:bg-cream sm:text-2xl dark:border-boho-stone/50 dark:text-cream dark:hover:bg-boho-stone"
        >
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className={`mx-auto min-w-0 w-full max-w-xl space-y-8 text-left ${className ?? ''}`}
    >
      {error && (
        <div className="font-body rounded-xl border border-boho-sage/35 bg-white/85 p-5 text-base leading-relaxed text-cream-dark dark:border-boho-stone/55 dark:bg-boho-bark/40 dark:text-cream">
          {error}
        </div>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="min-w-0">
          <label htmlFor="name" className={labelClass}>
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={fieldClass}
            placeholder="What should I call you?"
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={fieldClass}
            placeholder="So I can reply (optional)"
          />
        </div>
      </div>

      <div className="grid min-w-0 w-full max-w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        <div className={fieldWrapClass}>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={fieldClass}
            placeholder="Optional"
          />
        </div>
        <div className={`booking-form-date-field ${fieldWrapClass}`}>
          <label htmlFor="event_date" className={labelClass}>
            Dream date or season
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            className={`${fieldClass} booking-form-date-input [color-scheme:light] dark:[color-scheme:dark]`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="event_type" className={labelClass}>
          What are we celebrating?
        </label>
        <select id="event_type" name="event_type" className={fieldClass}>
          <option value="">Choose one…</option>
          <option value="Wedding">Wedding</option>
          <option value="Couples / Engagement">Couples / Engagement</option>
          <option value="Motherhood">Motherhood</option>
          <option value="Family">Family</option>
          <option value="Portraits">Portraits</option>
          <option value="Event">Event or brand</option>
          <option value="Other">Something else lovely</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          The heart of it
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${fieldClass} resize-none`}
          placeholder="Tell me all the details. What is your vibe, vision & style? What is your location?"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={openEmail}
          className="font-display min-h-12 w-full max-w-md touch-manipulation rounded-full border border-boho-bark/10 bg-coral px-8 py-4 text-xl text-white shadow-soft transition hover:bg-coral-dark hover:shadow-soft-lg sm:w-auto sm:text-2xl"
        >
          Send by email
        </button>
      </div>
    </form>
  );
}

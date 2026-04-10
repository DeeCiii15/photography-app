'use client';

import { useRef, useState } from 'react';

const PHOTOGRAPHER_EMAIL =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_EMAIL ?? 'hello@taylorrosereels.com';

/** E.164-style number for sms: links (e.g. +15551234567). */
const PHOTOGRAPHER_SMS_NUMBER =
  process.env.NEXT_PUBLIC_PHOTOGRAPHER_PHONE ?? '+1234567890';

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw.trim() || PHOTOGRAPHER_SMS_NUMBER;
}

function telHref(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) return `tel:${cleaned}`;
  const digits = cleaned.replace(/\D/g, '');
  return digits ? `tel:+${digits}` : `tel:${raw}`;
}

const PHONE_DISPLAY = formatPhoneDisplay(PHOTOGRAPHER_SMS_NUMBER);

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

type BookingFormProps = {
  className?: string;
};

const fieldClass =
  'font-body w-full rounded-xl border border-boho-sage/35 bg-white/80 px-5 py-4 text-lg leading-normal text-cream-dark shadow-sm transition-all focus:border-coral focus:outline-none focus:ring-2 focus:ring-boho-sage/20 dark:border-boho-stone/55 dark:bg-boho-stone/80 dark:text-cream dark:focus:ring-coral/30';

const labelClass =
  'font-display mb-3 block text-xl leading-snug text-cream-dark dark:text-cream md:text-2xl';

export default function BookingForm({ className }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [successKind, setSuccessKind] = useState<'email' | 'sms' | null>(null);

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
      <div
        className={`rounded-2xl border border-boho-sage/30 bg-cream-light/95 p-10 text-center shadow-soft backdrop-blur-sm dark:border-boho-stone/50 dark:bg-boho-bark/45 ${className ?? ''}`}
      >
        <p className="font-display text-2xl leading-relaxed text-cream-dark dark:text-cream md:text-3xl">
          {successKind === 'email'
            ? 'Your email should pop open with your note ready—I can’t wait to read it.'
            : 'Your messages app should open with your text drafted for you.'}
        </p>
        <p className="mt-4 font-body text-base leading-relaxed text-coral dark:text-cream/90 md:text-lg">
          If nothing happens, make sure you have mail or SMS set up—or reach me
          directly at{' '}
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}`}
            className="underline decoration-coral/40 underline-offset-2 hover:text-coral-dark"
          >
            {PHOTOGRAPHER_EMAIL}
          </a>{' '}
          or{' '}
          <a
            href={telHref(PHOTOGRAPHER_SMS_NUMBER)}
            className="whitespace-nowrap underline decoration-coral/40 underline-offset-2 hover:text-coral-dark"
          >
            {PHONE_DISPLAY}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSuccessKind(null)}
          className="font-display mt-8 rounded-full border border-boho-sage/35 px-10 py-3.5 text-xl text-cream-dark transition hover:bg-cream dark:border-boho-stone/50 dark:text-cream dark:hover:bg-boho-stone"
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

      <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="min-w-0">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={fieldClass}
            placeholder="If you’d rather I text you"
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="event_date" className={labelClass}>
            Dream date or season
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            className={`${fieldClass} box-border min-w-0 max-w-full [color-scheme:light] dark:[color-scheme:dark]`}
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
          <option value="Portrait">Portrait</option>
          <option value="Maternity or newborn">Maternity or newborn</option>
          <option value="Family">Family</option>
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
          placeholder="Tell me about your people, your place, or what makes your story feel like home…"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <button
          type="button"
          onClick={openEmail}
          className="font-display min-h-12 flex-1 touch-manipulation rounded-full border border-boho-bark/10 bg-coral px-6 py-4 text-xl text-white shadow-soft transition hover:bg-coral-dark hover:shadow-soft-lg"
        >
          Send by email
        </button>
        <button
          type="button"
          onClick={openSms}
          className="font-display min-h-12 flex-1 touch-manipulation rounded-full border border-coral/50 bg-white/60 px-6 py-4 text-xl text-coral backdrop-blur-sm transition hover:bg-coral/10 dark:bg-boho-bark/40 dark:text-coral"
        >
          Send by text
        </button>
      </div>
      <p className="font-body text-center text-sm leading-relaxed text-cream-dark/65 dark:text-cream/65 md:text-base">
        This opens your own email or messages app with your note ready—you tap
        send when it feels right.
      </p>
    </form>
  );
}

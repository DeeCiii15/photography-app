'use client';

import { useState, useCallback, createContext, useContext, ReactNode, useMemo } from 'react';
import { InlineWidget } from 'react-calendly';

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string | null;
};

function normalizeCalendlyUrl(raw: string | undefined): string | null {
  const u = raw?.trim();
  if (!u) return null;
  if (u.includes('your-username')) return null;
  try {
    const parsed = new URL(u);
    if (!parsed.hostname.endsWith('calendly.com')) return null;
    return u.replace(/\/$/, '');
  } catch {
    return null;
  }
}

function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="presentation"
    >
      <div
        className="relative m-4 flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Schedule a time"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors hover:bg-white cursor-pointer"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="min-h-0 flex-1 pt-14">
          {url ? (
            <InlineWidget
              url={url}
              styles={{ width: '100%', height: '100%', minHeight: 'min(70vh, 640px)' }}
              iframeTitle="Calendly scheduling"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-8 pb-12 text-center">
              <p className="text-lg font-medium text-gray-900">Calendly link not configured</p>
              <p className="max-w-md text-sm text-gray-600">
                Add your scheduling URL to <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">.env.local</code> as{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                  NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-name
                </code>
                , then restart the dev server.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type CalendlyContextType = {
  openCalendly: () => void;
  closeCalendly: () => void;
  isOpen: boolean;
};

const CalendlyContext = createContext<CalendlyContextType | null>(null);

export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const calendlyUrl = useMemo(
    () => normalizeCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL),
    []
  );

  const openCalendly = useCallback(() => {
    setIsOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeCalendly = useCallback(() => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, []);

  return (
    <CalendlyContext.Provider value={{ openCalendly, closeCalendly, isOpen }}>
      {children}
      <CalendlyModal isOpen={isOpen} onClose={closeCalendly} url={calendlyUrl} />
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const context = useContext(CalendlyContext);
  if (!context) {
    throw new Error('useCalendly must be used within CalendlyProvider');
  }
  return {
    openCalendly: context.openCalendly,
    closeCalendly: context.closeCalendly,
  };
}

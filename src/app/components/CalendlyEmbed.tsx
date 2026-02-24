'use client';

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
};

function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 9999
      }}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl m-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6 text-gray-700"
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

        {/* Calendly iframe */}
        <iframe
          src={`${url}?embed_domain=${typeof window !== 'undefined' ? window.location.hostname : ''}&embed_type=Inline`}
          width="100%"
          height="100%"
          frameBorder="0"
          className="w-full h-full"
          title="Calendly Scheduling"
        />
      </div>
    </div>
  );
}

// Create a context to share modal state
type CalendlyContextType = {
  openCalendly: () => void;
  closeCalendly: () => void;
  isOpen: boolean;
};

const CalendlyContext = createContext<CalendlyContextType | null>(null);

// Provider component
export function CalendlyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username';

  const openCalendly = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeCalendly = useCallback(() => {
    setIsOpen(false);
    // Restore body scroll
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

// Hook to use Calendly context
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

// Component for backward compatibility (not used anymore)
export default function CalendlyEmbed({ url }: { url?: string }) {
  return null;
}


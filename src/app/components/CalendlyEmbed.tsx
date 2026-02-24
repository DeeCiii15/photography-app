'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

type CalendlyEmbedProps = {
  url?: string;
};

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  // Use environment variable or prop, fallback to placeholder
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username';

  useEffect(() => {
    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="calendly.com"]');
      const existingLink = document.querySelector('link[href*="calendly.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <div className="w-full" style={{ minHeight: '700px' }}>
      <div
        className="calendly-inline-widget"
        data-url={calendlyUrl}
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  );
}


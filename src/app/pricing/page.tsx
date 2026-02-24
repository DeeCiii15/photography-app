import Navigation from '../components/Navigation';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-gray-950">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-cream-dark dark:text-cream mb-4">
              Pricing
            </h1>
            <p className="text-lg md:text-xl text-cream-dark dark:text-cream max-w-2xl mx-auto">
              Custom packages tailored to your needs. Contact us for a personalized quote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-3xl p-8 border-2 border-dusty-rose dark:border-gray-700 shadow-soft">
              <h3 className="text-2xl font-display font-bold text-cream-dark dark:text-cream mb-4">
                Basic
              </h3>
              <p className="text-cream-dark dark:text-cream mb-6">
                Perfect for small events and sessions
              </p>
              <a
                href="/#contact"
                className="inline-block px-6 py-3 bg-coral text-white rounded-2xl font-medium hover:bg-coral-dark transition-all shadow-soft hover:shadow-soft-lg transform hover:scale-105"
              >
                Get Quote
              </a>
            </div>
            <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 rounded-3xl p-8 border-2 border-coral dark:border-coral shadow-soft-lg ring-2 ring-dusty-rose/50 dark:ring-coral/30">
              <h3 className="text-2xl font-display font-bold text-cream-dark dark:text-cream mb-4">
                Premium
              </h3>
              <p className="text-cream-dark dark:text-cream mb-6">
                Comprehensive coverage for special occasions
              </p>
              <a
                href="/#contact"
                className="inline-block px-6 py-3 bg-coral text-white rounded-2xl font-medium hover:bg-coral-dark transition-all shadow-soft hover:shadow-soft-lg transform hover:scale-105"
              >
                Get Quote
              </a>
            </div>
            <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-3xl p-8 border-2 border-dusty-rose dark:border-gray-700 shadow-soft">
              <h3 className="text-2xl font-display font-bold text-cream-dark dark:text-cream mb-4">
                Custom
              </h3>
              <p className="text-cream-dark dark:text-cream mb-6">
                Tailored packages for your unique vision
              </p>
              <a
                href="/#contact"
                className="inline-block px-6 py-3 bg-coral text-white rounded-2xl font-medium hover:bg-coral-dark transition-all shadow-soft hover:shadow-soft-lg transform hover:scale-105"
              >
                Get Quote
              </a>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-3xl p-8 md:p-12 border-2 border-dusty-rose dark:border-gray-700 shadow-soft-lg">
            <h2 className="text-3xl font-display font-bold text-cream-dark dark:text-cream mb-6">
              What&apos;s Included
            </h2>
            <ul className="space-y-4 text-cream-dark dark:text-cream">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cream-dark dark:text-cream flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Professional photography coverage</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cream-dark dark:text-cream flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Edited high-resolution images</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cream-dark dark:text-cream flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Personalized online gallery for viewing and downloading</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cream-dark dark:text-cream flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Digital delivery within 2-3 weeks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


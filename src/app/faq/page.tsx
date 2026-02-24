import Navigation from '../components/Navigation';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 2-4 weeks in advance, especially for weddings and special events. However, we\'re happy to accommodate last-minute requests when possible.',
    },
    {
      question: 'What\'s included in a session?',
      answer: 'Each package includes professional photography, edited high-resolution images, and a personalized online gallery for viewing and downloading your photos.',
    },
    {
      question: 'Do you travel for shoots?',
      answer: 'Yes! We\'re available for travel. Travel fees may apply depending on location. Contact us to discuss your destination.',
    },
    {
      question: 'How long until I receive my photos?',
      answer: 'Typically, edited photos are delivered within 2-3 weeks after your session. Rush delivery options are available for an additional fee.',
    },
    {
      question: 'What should I wear for my session?',
      answer: 'We recommend wearing clothing that makes you feel comfortable and confident. Solid colors and classic styles tend to photograph well. We\'ll provide detailed styling guidance after booking.',
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans for larger packages. A deposit is required to secure your date, with the balance due before or on the day of your event.',
    },
    {
      question: 'Can I request specific shots or poses?',
      answer: 'Absolutely! We encourage you to share your vision, inspiration photos, or a shot list. We\'ll work together to capture the moments that matter most to you.',
    },
    {
      question: 'What happens if the weather is bad for an outdoor shoot?',
      answer: 'We always have a backup plan! For outdoor sessions, we can reschedule or move to an indoor location. We\'ll work with you to ensure you get beautiful photos regardless of conditions.',
    },
  ];

  return (
    <div className="min-h-screen bg-cream-light dark:bg-gray-950">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-cream-dark dark:text-cream mb-4">
              FAQ
            </h1>
            <p className="text-lg md:text-xl text-cream-dark dark:text-cream max-w-2xl mx-auto">
              Frequently asked questions about our photography services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-3xl p-6 md:p-8 border-2 border-dusty-rose dark:border-gray-700 hover:shadow-soft-lg transition-all shadow-soft"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-cream-dark dark:text-cream mb-3">
                  {faq.question}
                </h3>
                <p className="text-cream-dark dark:text-cream leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 rounded-3xl p-8 border-2 border-dusty-rose dark:border-gray-700 shadow-soft-lg">
            <h2 className="text-2xl font-display font-bold text-cream-dark dark:text-cream mb-4">
              Still have questions?
            </h2>
            <p className="text-cream-dark dark:text-cream mb-6">
              We&apos;re here to help! Reach out and we&apos;ll get back to you as soon as possible.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3 bg-coral text-white rounded-2xl font-medium hover:bg-coral-dark transition-all shadow-soft hover:shadow-soft-lg transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


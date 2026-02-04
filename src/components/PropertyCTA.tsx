'use client';

const WHATSAPP_LINK = 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0';
const PHONE_NUMBER = '+34 634 044 970';

interface PropertyCTAProps {
  propertyType?: string;
  town?: string;
  reference?: string;
  variant?: 'primary' | 'urgent' | 'subtle';
}

export function PropertyCTA({
  propertyType = 'property',
  town = 'Costa Blanca',
  reference,
  variant = 'primary'
}: PropertyCTAProps) {

  if (variant === 'urgent') {
    return (
      <div className="bg-primary-900 rounded-xl p-8 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium bg-accent-500/20 text-accent-400 px-3 py-1 rounded-full">
              High Demand Area
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold mb-3">
            Don't Miss This {propertyType}
          </h3>

          <p className="text-lg text-warm-300 mb-6 max-w-2xl">
            Properties in {town} are selling fast. Contact us now to get the
            latest availability and pricing – secure your viewing before the best units are gone.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-4 rounded-md font-medium text-lg transition-all"
            >
              WhatsApp Us Now
            </a>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-white text-primary-900 px-6 py-4 rounded-md font-medium text-lg hover:bg-warm-100 transition-all"
            >
              Call {PHONE_NUMBER}
            </a>
          </div>

          {reference && (
            <p className="mt-4 text-sm text-warm-400">
              Reference: {reference} • Response within 2 hours
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className="bg-warm-100 border border-warm-300 rounded-lg p-6 text-center">
        <p className="text-warm-700 mb-3">
          Have questions about this {propertyType.toLowerCase()}?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-900 hover:text-accent-600 font-medium"
          >
            WhatsApp
          </a>
          <span className="text-warm-400">|</span>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-primary-900 hover:text-accent-600 font-medium"
          >
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    );
  }

  // Primary (default)
  return (
    <div className="bg-primary-900 rounded-xl p-8 text-white">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold mb-3">
          Get the Latest Availability & Pricing
        </h3>

        <p className="text-lg text-warm-300 mb-6">
          Interested in this {propertyType.toLowerCase()} in {town}? Contact us today to:
        </p>

        <ul className="space-y-2 mb-6 text-warm-200">
          <li className="flex items-center gap-2">
            <span className="text-accent-500">✓</span>
            Get current pricing and available units
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent-500">✓</span>
            Schedule a viewing (in-person or video call)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent-500">✓</span>
            Receive floor plans and full property details
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent-500">✓</span>
            Get help with mortgages and legal process
          </li>
        </ul>

        <div className="flex flex-wrap gap-4">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md font-medium transition-all"
          >
            WhatsApp Us
          </a>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-white text-primary-900 px-6 py-3 rounded-md font-medium hover:bg-warm-100 transition-all"
          >
            Call Now
          </a>
        </div>

        <p className="mt-4 text-sm text-warm-400">
          We respond to all inquiries within 2 hours during business hours
        </p>
      </div>
    </div>
  );
}

// Sticky mobile CTA bar
export function StickyMobileCTA({ price, reference }: { price: number; reference?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-300 shadow-lift p-4 z-50 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-primary-900">€{price.toLocaleString()}</p>
          {reference && <p className="text-xs text-warm-500">Ref: {reference}</p>}
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="bg-warm-200 text-primary-900 p-3 rounded-md"
            aria-label="Call"
          >
            📞
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-500 text-white px-6 py-3 rounded-md font-medium"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// Inline text CTA
export function InlineCTA({ town }: { town?: string }) {
  return (
    <div className="bg-warm-100 border border-warm-300 rounded-lg p-4 my-6">
      <p className="text-warm-800">
        <strong>Interested in properties in {town || 'this area'}?</strong>{' '}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-600 hover:text-accent-700 underline"
        >
          Message us on WhatsApp
        </a>{' '}
        or call{' '}
        <a
          href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
          className="text-accent-600 hover:text-accent-700 underline"
        >
          {PHONE_NUMBER}
        </a>{' '}
        for the latest availability.
      </p>
    </div>
  );
}

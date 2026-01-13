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
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="animate-pulse">🔥</span>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              High Demand Area
            </span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Don't Miss This {propertyType}!
          </h3>
          
          <p className="text-lg opacity-90 mb-6 max-w-2xl">
            Properties in {town} are selling fast. Contact us now to get the 
            <strong> latest availability and pricing</strong> – secure your viewing 
            before the best units are gone!
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              📱 WhatsApp Us Now
            </a>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-lg"
            >
              📞 Call {PHONE_NUMBER}
            </a>
          </div>
          
          {reference && (
            <p className="mt-4 text-sm opacity-75">
              Reference: {reference} • Response within 2 hours
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        <p className="text-gray-600 mb-3">
          Have questions about this {propertyType.toLowerCase()}?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            📱 WhatsApp
          </a>
          <span className="text-gray-300">|</span>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            📞 {PHONE_NUMBER}
          </a>
        </div>
      </div>
    );
  }

  // Primary (default)
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold mb-3">
          📞 Get the Latest Availability & Pricing
        </h3>
        
        <p className="text-lg opacity-90 mb-6">
          Interested in this {propertyType.toLowerCase()} in {town}? Contact us today to:
        </p>
        
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            Get current pricing and available units
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            Schedule a viewing (in-person or video call)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            Receive floor plans and full property details
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            Get help with mortgages and legal process
          </li>
        </ul>
        
        <div className="flex flex-wrap gap-4">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
          >
            📱 WhatsApp Us
          </a>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
          >
            📞 Call Now
          </a>
        </div>
        
        <p className="mt-4 text-sm opacity-75">
          We respond to all inquiries within 2 hours during business hours
        </p>
      </div>
    </div>
  );
}

// Sticky mobile CTA bar
export function StickyMobileCTA({ price, reference }: { price: number; reference?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 z-50 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-blue-600">€{price.toLocaleString()}</p>
          {reference && <p className="text-xs text-gray-500">Ref: {reference}</p>}
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
            className="bg-blue-600 text-white p-3 rounded-xl"
            aria-label="Call"
          >
            📞
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold"
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
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
      <p className="text-gray-700">
        <strong>💡 Interested in properties in {town || 'this area'}?</strong>{' '}
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Message us on WhatsApp
        </a>{' '}
        or call{' '}
        <a 
          href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          {PHONE_NUMBER}
        </a>{' '}
        for the latest availability.
      </p>
    </div>
  );
}

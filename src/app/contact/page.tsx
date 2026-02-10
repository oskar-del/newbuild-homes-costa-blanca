import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { localBusinessSchema, breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Us | New Build Homes Costa Blanca',
  description: 'Get in touch with New Build Homes Costa Blanca. Expert guidance for buying new build properties in Spain. WhatsApp, phone, email or contact form.',
  openGraph: {
    title: 'Contact Us | New Build Homes Costa Blanca',
    description: 'Get in touch with our expert team. WhatsApp, phone, or contact form. Free consultation for your property search.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/contact',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | New Build Homes Costa Blanca',
    description: 'Get in touch for expert guidance on buying new build properties in Costa Blanca.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/contact',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/contact',
      'sv': 'https://newbuildhomescostablanca.com/sv/contact',
      'nl': 'https://newbuildhomescostablanca.com/nl/contact',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/contact',
      'fr': 'https://newbuildhomescostablanca.com/fr/contact',
      'no': 'https://newbuildhomescostablanca.com/no/contact',
      'de': 'https://newbuildhomescostablanca.com/de/contact',
      'pl': 'https://newbuildhomescostablanca.com/pl/contact',
      'ru': 'https://newbuildhomescostablanca.com/ru/contact',
      'x-default': 'https://newbuildhomescostablanca.com/contact',
    },
  },
};

export default function ContactPage() {
  // Schemas
  const businessSchema = localBusinessSchema();
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Contact', url: 'https://newbuildhomescostablanca.com/contact/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">Contact Us</h1>
        <p className="text-xl text-warm-600 max-w-2xl mx-auto">
          Ready to find your dream property in Costa Blanca? We're here to help with expert guidance every step of the way.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Methods */}
        <div>
          {/* Quick Contact Cards */}
          <div className="space-y-4 mb-8">
            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-success-50 hover:bg-success-100 border border-success-200 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-primary-900">WhatsApp Us</div>
                <div className="text-sm text-warm-600">Fastest response - usually within minutes</div>
              </div>
              <svg className="w-5 h-5 text-warm-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Phone */}
            <a
              href="tel:+34634044970"
              className="flex items-center gap-4 p-4 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-primary-900">+34 634 044 970</div>
                <div className="text-sm text-warm-600">Call us - English, Swedish, Spanish</div>
              </div>
              <svg className="w-5 h-5 text-warm-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:oskar@hanssonhertzell.com"
              className="flex items-center gap-4 p-4 bg-warm-50 hover:bg-warm-100 border border-warm-200 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-warm-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-primary-900">oskar@hanssonhertzell.com</div>
                <div className="text-sm text-warm-600">Email us anytime</div>
              </div>
              <svg className="w-5 h-5 text-warm-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Office Info */}
          <div className="bg-white border border-warm-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">Our Office</h2>
            <div className="space-y-3 text-warm-600">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-warm-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  Calle Caballero de Rodas 31<br />
                  03181 Torrevieja, Alicante<br />
                  Spain
                </span>
              </p>
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-warm-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon-Fri: 9:00 - 18:00<br />Sat: By appointment</span>
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="p-6 bg-primary-50 rounded-xl">
            <h2 className="text-lg font-semibold text-primary-900 mb-3">About Hansson & Hertzell</h2>
            <p className="text-warm-600 text-sm leading-relaxed">
              New Build Homes Costa Blanca is part of the Hansson & Hertzell Group, serving 
              Scandinavian and international buyers in Spain since 2006. We specialize in new 
              build properties across Costa Blanca, offering expert guidance in English, Swedish, 
              Spanish, French, and Dutch.
            </p>
          </div>
        </div>

        {/* Right Column - Lead Form */}
        <div>
          <LeadForm
            title="Send Us a Message"
            subtitle="Fill out the form below and we'll get back to you within 24 hours"
          />

          {/* Mortgage CTA */}
          <div className="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-xl">
            <h3 className="font-semibold text-primary-900 mb-2">Need Mortgage Financing?</h3>
            <p className="text-warm-600 text-sm mb-4">
              Get pre-approved for your Spanish mortgage with our partner Habeno. 
              Compare rates from multiple banks.
            </p>
            <a
              href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get Mortgage Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-primary-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-warm-200 rounded-xl p-6">
            <h3 className="font-semibold text-primary-900 mb-2">What areas do you cover?</h3>
            <p className="text-warm-600 text-sm">
              We specialize in new build properties across Costa Blanca, from Dénia and Jávea in 
              the north to Torrevieja and Orihuela Costa in the south.
            </p>
          </div>
          <div className="bg-white border border-warm-200 rounded-xl p-6">
            <h3 className="font-semibold text-primary-900 mb-2">What languages do you speak?</h3>
            <p className="text-warm-600 text-sm">
              Our team speaks English, Swedish, Spanish, French, and Dutch. We can assist 
              international buyers throughout the entire purchase process.
            </p>
          </div>
          <div className="bg-white border border-warm-200 rounded-xl p-6">
            <h3 className="font-semibold text-primary-900 mb-2">Can you help with mortgages?</h3>
            <p className="text-warm-600 text-sm">
              Yes! We work with Habeno, specialist mortgage brokers who help international buyers 
              secure financing from Spanish banks at competitive rates.
            </p>
          </div>
          <div className="bg-white border border-warm-200 rounded-xl p-6">
            <h3 className="font-semibold text-primary-900 mb-2">Do you charge fees?</h3>
            <p className="text-warm-600 text-sm">
              Our services are free for buyers. We're compensated by the developers we work with, 
              so you get expert guidance at no extra cost.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

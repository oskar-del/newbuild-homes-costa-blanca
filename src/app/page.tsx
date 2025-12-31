import { Metadata } from 'next';
import Link from 'next/link';
import { getStats, getAllDevelopments, formatPrice } from '@/lib/property-service';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';
import LeadForm from '@/components/LeadForm';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'New Build Homes Costa Blanca | Modern Properties from 199000 EUR',
  description: 'Discover new build apartments, villas and townhouses in Costa Blanca, Spain. Expert guidance for international buyers. Contact us for latest availability.',
};

const homeFaqs = [
  {
    question: 'Can foreigners buy property in Costa Blanca?',
    answer: 'Yes, foreigners can buy property in Spain without restrictions. Non-EU citizens need an NIE number (tax identification) which we help you obtain. The buying process typically takes 6-8 weeks from reservation to completion.',
  },
  {
    question: 'What are the costs of buying a new build in Spain?',
    answer: 'Approximately 13-14% on top of the purchase price. This includes 10% IVA (VAT), 1.5% stamp duty (AJD), plus notary, registry, and legal fees. We provide a full cost breakdown before you commit.',
  },
  {
    question: 'Do I need a Spanish bank account to buy property?',
    answer: 'Yes, a Spanish bank account is required for the purchase and ongoing costs. We can recommend banks experienced with international buyers and help you through the account opening process.',
  },
  {
    question: 'Can I get a mortgage as a non-resident?',
    answer: 'Yes, Spanish banks offer mortgages to non-residents, typically up to 70% of the property value. Our partner Habeno compares rates from multiple banks to find you the best deal.',
  },
  {
    question: 'What is included in a new build property?',
    answer: 'New builds in Costa Blanca typically include fitted kitchen, bathrooms, air conditioning pre-installation, and often a parking space. Many developments also offer furniture packages. Each listing details exactly what is included.',
  },
  {
    question: 'How do I arrange a viewing?',
    answer: 'Contact us via WhatsApp or phone and we will arrange viewings at your convenience. We offer in-person tours, video calls, and can coordinate multiple development visits in a single trip.',
  },
];

export default async function HomePage() {
  const stats = await getStats();
  const developments = await getAllDevelopments();
  const featured = developments.slice(0, 6);

  const breadcrumbs = [{ name: 'Home', url: '/' }];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(homeFaqs)) }}
      />

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            New Build Homes in Costa Blanca
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Modern apartments, villas and townhouses from trusted Spanish developers. 
            Expert guidance for international buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              WhatsApp Us
            </a>
            <Link
              href="/developments"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50"
            >
              View All Developments
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{stats.totalDevelopments}</div>
            <div className="text-gray-600">Developments</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{stats.totalProperties}</div>
            <div className="text-gray-600">Properties</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{stats.totalAreas}</div>
            <div className="text-gray-600">Locations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">From {stats.priceFromFormatted}</div>
            <div className="text-gray-600">Starting Price</div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Developments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((dev) => (
              <Link
                key={dev.slug}
                href={`/developments/${dev.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-200 relative">
                  {dev.images[0] ? (
                    <img
                      src={dev.images[0]}
                      alt={`${dev.name} new build development in ${dev.town}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {dev.propertyCount} units
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{dev.name}</h3>
                  <p className="text-gray-600 mb-3">{dev.town}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      From {dev.priceFrom ? formatPrice(dev.priceFrom) : 'TBA'}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {dev.propertyCount} units
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/developments"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              View All {stats.totalDevelopments} Developments
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Buy Through Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🏗️
              </div>
              <h3 className="text-xl font-bold mb-3">Direct Developer Access</h3>
              <p className="text-gray-600">
                We work directly with trusted developers, giving you access to the best new builds 
                before they hit the open market.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🌍
              </div>
              <h3 className="text-xl font-bold mb-3">International Buyer Experts</h3>
              <p className="text-gray-600">
                Fluent in English, Swedish, Spanish, French, and Dutch. We guide you through 
                every step of buying property in Spain.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ✅
              </div>
              <h3 className="text-xl font-bold mb-3">Full Purchase Support</h3>
              <p className="text-gray-600">
                From NIE applications to mortgage arrangements, we handle the paperwork 
                so you can focus on choosing your dream home.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Golf Properties Section */}
      <section className="py-16 bg-gradient-to-br from-green-800 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Golf Property Specialists</h2>
              <p className="text-green-100 text-lg mb-6">Costa Blanca is home to over 20 championship golf courses, with year-round sunshine making it one of Europe&#39;s premier golf destinations.</p>
              <a href="/golf" className="inline-block bg-white text-green-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors">Explore Golf Properties</a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-2">20+</div><div className="text-green-200">Golf Courses</div></div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-2">300+</div><div className="text-green-200">Sunny Days</div></div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-2">E30</div><div className="text-green-200">Green Fees From</div></div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center"><div className="text-4xl font-bold mb-2">15C</div><div className="text-green-200">Winter Average</div></div>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {homeFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get Property Recommendations</h2>
            <p className="text-gray-600">Tell us what you're looking for and we'll send you matching properties</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <LeadForm
              propertyInterest="General Inquiry - Homepage"
              title="Request Information"
              subtitle="We'll get back to you within 24 hours"
              compact={false}
              formName="lead-inquiry"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for the latest availability and prices. No obligation, just honest advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              WhatsApp Us Now
            </a>
            <a
              href="tel:+34634044970"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50"
            >
              +34 634 044 970
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Golf Properties Costa Blanca | Frontline Golf Apartments & Villas',
  description: 'Discover new build golf properties across Costa Blanca. Frontline apartments and villas at La Finca, Villamartin, Las Colinas and more. From €200,000.',
};

const golfDevelopments = [
  {
    slug: 'oasis-golf-la-finca',
    name: 'Oasis Golf La Finca',
    resort: 'La Finca Golf',
    location: 'Algorfa',
    status: 'key-ready',
    statusLabel: 'Key Ready',
    priceFrom: 261000,
    bedrooms: '2-3',
    features: ['Frontline Golf', 'Pool', 'Fully Furnished'],
    highlight: 'Walk to 1st Tee',
  },
];

const golfResorts = [
  {
    name: 'La Finca Golf',
    location: 'Algorfa',
    holes: 18,
    designer: 'Justo Vecino Quesada',
    style: 'Championship',
    developments: 1,
    priceFrom: 261000,
  },
  {
    name: 'Vistabella Golf',
    location: 'Orihuela Costa',
    holes: 18,
    designer: 'Manuel Piñero',
    style: 'Links-style',
    developments: 0,
    priceFrom: null,
  },
  {
    name: 'Villamartin Golf',
    location: 'Orihuela Costa',
    holes: 18,
    designer: 'Putman & Ramirez',
    style: 'Championship',
    developments: 0,
    priceFrom: null,
  },
  {
    name: 'Las Colinas Golf',
    location: 'Campoamor',
    holes: 18,
    designer: 'Cabell B. Robinson',
    style: 'Championship (Award-winning)',
    developments: 0,
    priceFrom: null,
  },
  {
    name: 'La Marquesa Golf',
    location: 'Ciudad Quesada',
    holes: 18,
    designer: 'Justo Vecino Quesada',
    style: 'Mediterranean',
    developments: 0,
    priceFrom: null,
  },
];

const rentalYields = [
  { season: 'Spring (Mar-May)', weekly: '€800-1,200', occupancy: '65-75%' },
  { season: 'Summer (Jun-Aug)', weekly: '€900-1,400', occupancy: '80-90%' },
  { season: 'Autumn (Sep-Nov)', weekly: '€800-1,100', occupancy: '60-70%' },
  { season: 'Winter (Dec-Feb)', weekly: '€600-900', occupancy: '50-65%' },
];

const faqs = [
  {
    question: 'What makes Costa Blanca ideal for golf property investment?',
    answer: 'Costa Blanca offers over 300 days of sunshine annually, making it perfect for year-round golf. The region has 20+ courses within easy reach, two international airports (Alicante and Murcia), and property prices significantly below equivalent golf destinations in Portugal or southern France. Strong rental demand from golf tourists creates excellent investment returns.',
  },
  {
    question: 'What rental yields can I expect from a golf property?',
    answer: 'Well-managed golf properties in Costa Blanca typically achieve 5-7% gross rental yields. Properties at established resorts like La Finca Golf can see 60-75% annual occupancy when professionally marketed, with peak rates of €900-1,400 per week during summer and golf season.',
  },
  {
    question: 'Can I use the property myself and still rent it out?',
    answer: 'Absolutely. Most owners use their golf property for 4-8 weeks per year and rent it out the rest of the time. Professional property management companies handle all rental logistics, guest services, and maintenance. You simply block out your personal use dates in advance.',
  },
  {
    question: 'Do I need a tourist license to rent out my golf property?',
    answer: "Yes, holiday rentals in the Valencia region require a tourist license (Licencia Turística). The application process takes 2-4 months. Some new build developments, like Oasis Laguna II, come with tourist licenses already included. We can advise on the requirements for each property.",
  },
  {
    question: 'What are the typical community fees for golf properties?',
    answer: 'Community fees for golf properties in Costa Blanca typically range from €40-100 per month for apartments, depending on the amenities (pool, gym, gardens, security). This does not include golf club membership, which is usually separate and optional.',
  },
  {
    question: 'Is golf club membership included with the property?',
    answer: "Golf club membership is typically separate from property ownership. However, living on a golf resort often provides discounted green fees or preferential booking. Some resorts offer annual membership packages. We can provide details for each specific development.",
  },
];

export default function GolfPropertiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-hero-pattern text-white py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-2 bg-accent-500 rounded-full text-sm font-semibold mb-6">
              ⛳ Golf Properties
            </span>
            <h1 className="heading-1 text-white mb-6">
              Live on the Fairway in Costa Blanca
            </h1>
            <p className="lead text-primary-100 mb-8">
              Discover frontline golf apartments and villas at Costa Blanca's premier 
              resorts. Wake up to stunning course views, walk to the first tee, and 
              enjoy year-round golfing weather.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#developments" className="btn-accent">
                View Golf Properties
              </a>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600">8+</div>
              <div className="text-slate-600">Golf Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">300+</div>
              <div className="text-slate-600">Days of Sunshine</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">5-7%</div>
              <div className="text-slate-600">Rental Yield</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600">€261k</div>
              <div className="text-slate-600">From</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Golf Developments */}
      <section id="developments" className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Golf Property Developments
            </h2>
            <p className="lead max-w-2xl mx-auto">
              New build properties at Costa Blanca's finest golf resorts
            </p>
          </div>

          {golfDevelopments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {golfDevelopments.map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/developments/${dev.slug}`}
                  className="property-card group"
                >
                  <div className="relative h-56 bg-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                      <span className="text-white/50 text-lg">⛳ {dev.resort}</span>
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="badge-key-ready">{dev.statusLabel}</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-accent-500 text-white">
                        {dev.highlight}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-primary-600 font-medium mb-1">{dev.resort}</p>
                    <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-primary-600 transition-colors mb-1">
                      {dev.name}
                    </h3>
                    <p className="text-slate-500 mb-4">{dev.location}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dev.features.map((feature) => (
                        <span key={feature} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-slate-500">From</span>
                        <span className="price-tag ml-2">€{dev.priceFrom.toLocaleString()}</span>
                      </div>
                      <span className="text-primary-600 font-medium group-hover:underline">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <p className="text-slate-600 mb-4">More golf properties coming soon!</p>
              <a href={siteConfig.contact.whatsapp} className="btn-primary">
                Get Notified of New Listings
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Golf Resorts Overview */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Golf Resorts in Costa Blanca South
            </h2>
            <p className="lead max-w-2xl mx-auto">
              Over 8 championship courses within 30 minutes of each other
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Golf Course</th>
                  <th>Location</th>
                  <th>Holes</th>
                  <th>Style</th>
                  <th>Properties</th>
                </tr>
              </thead>
              <tbody>
                {golfResorts.map((resort) => (
                  <tr key={resort.name}>
                    <td className="font-semibold">{resort.name}</td>
                    <td>{resort.location}</td>
                    <td>{resort.holes}</td>
                    <td>{resort.style}</td>
                    <td>
                      {resort.developments > 0 ? (
                        <span className="text-success-600 font-semibold">
                          {resort.developments} available from €{resort.priceFrom?.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400">Coming soon</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-slate-900 mb-6">
                Golf Property Investment Returns
              </h2>
              <p className="text-slate-600 mb-6">
                Golf properties in Costa Blanca offer excellent rental potential, 
                attracting golfers from across Europe year-round. The combination 
                of 300+ days of sunshine, affordable green fees, and two international 
                airports makes this region a premier golf tourism destination.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-slate-900 mb-4">Typical Rental Performance</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-600">
                      <th className="pb-2">Season</th>
                      <th className="pb-2">Weekly Rate</th>
                      <th className="pb-2">Occupancy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalYields.map((row) => (
                      <tr key={row.season} className="border-t border-slate-200">
                        <td className="py-2">{row.season}</td>
                        <td className="py-2 font-semibold">{row.weekly}</td>
                        <td className="py-2">{row.occupancy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 bg-success-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-success-700">5-7%</div>
                  <div className="text-sm text-success-600">Net Yield</div>
                </div>
                <div className="flex-1 bg-primary-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-700">60-75%</div>
                  <div className="text-sm text-primary-600">Occupancy</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h3 className="font-display font-bold text-xl mb-2">
                Interested in Golf Properties?
              </h3>
              <p className="text-slate-600 mb-6">
                Get the latest availability and pricing for frontline golf homes.
              </p>
              <LeadForm propertyInterest="Golf Properties" source="golf-properties-page" />
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage CTA */}
      <section className="py-12 bg-success-600">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="font-display font-bold text-2xl mb-2">
                Need Financing for Your Golf Property?
              </h3>
              <p className="text-success-100">
                We partner with Habeno to help international buyers secure Spanish mortgages.
              </p>
            </div>
            <a
              href={siteConfig.partners.habeno}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-white !text-success-700 hover:!bg-success-50 whitespace-nowrap"
            >
              Start Mortgage Application
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-slate-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-slate-900 mb-4">
              Golf Property FAQs
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-primary-900 text-white">
        <div className="container-wide text-center">
          <h2 className="heading-2 text-white mb-6">
            Ready to Live on the Fairway?
          </h2>
          <p className="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to discuss golf properties across Costa Blanca. 
            We'll help you find the perfect home at your favorite course.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.contact.phoneClean}`}
              className="btn-outline !border-white !text-white hover:!bg-white/10"
            >
              📞 {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

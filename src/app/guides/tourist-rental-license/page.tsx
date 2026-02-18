import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd, faqSchema, howToSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Tourist Rental License Valencia 2026 | Complete Guide to Holiday Letting in Costa Blanca',
  description: 'Everything you need to know about tourist rental licenses in Valencia region. New 2025 regulations, requirements, costs, and how to legally rent your Costa Blanca property to holidaymakers.',
  keywords: 'tourist rental license Valencia, holiday let license Spain, VT number Costa Blanca, rental license Alicante, Airbnb license Spain 2026',
  openGraph: {
    title: 'Tourist Rental License Valencia 2026 | Holiday Letting Guide',
    description: 'Complete guide to legally renting your Costa Blanca property. New regulations, requirements, and costs explained.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tourist Rental License Valencia 2026 | Holiday Letting Guide',
    description: 'Everything you need to know about holiday letting licenses in Costa Blanca.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/tourist-rental-license',
      'x-default': 'https://newbuildhomescostablanca.com/guides/tourist-rental-license',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const rentalFaqs = [
  {
    question: 'Do I need a license to rent my property on Airbnb in Spain?',
    answer: 'Yes, in the Valencia region (which includes Costa Blanca), you need a Tourist Rental License (Vivienda Turística or VT number) to legally advertise and rent your property to holidaymakers on any platform including Airbnb, Booking.com, and VRBO. Operating without a license can result in significant fines.',
  },
  {
    question: 'How long does it take to get a tourist rental license in Valencia?',
    answer: 'The application process typically takes 2-4 weeks for approval once all documentation is submitted. However, gathering the required certificates and ensuring your property meets all requirements can take additional time. Using a professional service can speed up the process significantly.',
  },
  {
    question: 'Can any property get a tourist rental license in Costa Blanca?',
    answer: 'Not all properties qualify. Your property must meet minimum standards for size, safety, and amenities. Some municipalities have restrictions on tourist rentals, particularly in areas with housing shortages. New build properties typically meet the requirements more easily than older properties.',
  },
  {
    question: 'How much does a tourist rental license cost in Valencia?',
    answer: 'The license itself is free - there is no government fee for registration. However, you will need to pay for required certificates (energy certificate, habitability certificate) and potentially professional help with the application. Total costs typically range from €300-€800 depending on your property and what certificates you already have.',
  },
  {
    question: 'Do I need to pay taxes on rental income from my Spanish property?',
    answer: 'Yes, rental income is taxable in Spain. Non-residents pay a flat 19% tax on net rental income (24% for non-EU residents). You can deduct legitimate expenses including management fees, insurance, utilities, and maintenance. We recommend working with a Spanish tax advisor.',
  },
  {
    question: 'What happens if I rent without a license?',
    answer: 'Fines for illegal tourist rentals in Valencia range from €10,000 to €600,000 depending on the severity. Platforms like Airbnb are now required to verify license numbers and can remove unlicensed listings. It is not worth the risk - get properly licensed.',
  },
  {
    question: 'Can I manage the rental myself or do I need a company?',
    answer: 'You can self-manage, but many owners prefer professional management. A good property manager handles guest communications, check-ins, cleaning, maintenance, and legal compliance. This is especially useful if you do not live near the property. We offer full property management services.',
  },
  {
    question: 'What are the new 2025 regulations for tourist rentals?',
    answer: 'The Valencia region introduced stricter requirements in 2025 including mandatory registration on the Regional Tourism Register, enhanced safety requirements, and stricter enforcement. Some municipalities have also introduced limits on new licenses in certain areas. The regulations aim to balance tourism with housing availability for residents.',
  },
];

export default function TouristRentalLicensePage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/guides/' },
    { name: 'Tourist Rental License', url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/' },
  ]);

  const faqSchemaData = faqSchema(rentalFaqs);

  const howToSchemaData = howToSchema({
    name: 'How to Get a Tourist Rental License in Valencia',
    description: 'Complete guide to obtaining a Tourist Rental License (Vivienda Turística) for your Costa Blanca property. New 2025 regulations, requirements, costs, and application process.',
    totalTime: 'PT4W',
    steps: [
      {
        name: 'Understand the Requirements',
        text: 'Your property must have a valid Habitability Certificate (Cédula de Habitabilidad), Energy Performance Certificate (minimum E rating), minimum room sizes, direct ventilation and natural light, hot and cold water, and air conditioning. New build properties typically meet these easily.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#requirements'
      },
      {
        name: 'Obtain Required Certificates',
        text: 'Get an Energy Performance Certificate (€100-200) and Habitability Certificate (€100-300). New build properties may already have energy certificates. Total cost typically €200-500 for certificates.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#costs'
      },
      {
        name: 'Gather Documentation',
        text: 'Collect property deeds, both certificates, community approval (if applicable), and proof of ownership or authorization to rent. Ensure all documents are properly prepared and any translations are certified.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#process'
      },
      {
        name: 'Complete the Declaración Responsable',
        text: 'Fill out the Declaración Responsable (responsible declaration) application form with your property details, owner information, and certification that your property meets all requirements.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#process'
      },
      {
        name: 'Submit Your Application',
        text: 'Submit the completed Declaración Responsable and all documents to the Valencia Tourism Registry online or in person. Include all required certificates and proof of ownership.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#process'
      },
      {
        name: 'Receive Your VT Number',
        text: 'Once approved (typically 2-4 weeks), you receive your official VT registration number. This is your Tourist Rental License number (Vivienda Turística).',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#process'
      },
      {
        name: 'Display License on All Listings',
        text: 'Your VT number must appear on all advertisements, booking platforms (Airbnb, Booking.com, VRBO), websites, and at the property entrance. Since 2024, platforms verify VT numbers with the regional database.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/#process'
      },
      {
        name: 'Set Up Property Management',
        text: 'Choose whether to self-manage or use a professional property manager. Many owners prefer professional management for guest communications, check-ins, cleaning, maintenance, and legal compliance, especially if they do not live near the property.',
        url: 'https://newbuildhomescostablanca.com/guides/tourist-rental-license/'
      }
    ]
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(howToSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <nav className="text-warm-200 text-sm mb-4">
                <Link href="/guides" className="hover:text-white">Guides</Link>
                <span className="mx-2">›</span>
                <span>Tourist Rental License</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tourist Rental License in Valencia Region: The Complete 2026 Guide
              </h1>
              <p className="text-xl text-warm-300">
                Everything you need to know about legally renting your Costa Blanca property to holidaymakers — including the new 2025 regulations, requirements, and how we can help.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-warm-200">
                <span>📖 8 min read</span>
                <span>•</span>
                <span>Updated February 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                <h2 className="font-bold text-lg mb-3 text-primary-900">Key Points at a Glance</h2>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-accent-600">✓</span>
                    <span><strong>License Required</strong> — mandatory for all holiday rentals</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-600">✓</span>
                    <span><strong>VT Number</strong> — must be displayed on all listings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-600">✓</span>
                    <span><strong>2-4 Weeks</strong> — typical approval timeline</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-600">✓</span>
                    <span><strong>€300-€800</strong> — total costs for certificates</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-600">✓</span>
                    <span><strong>New Builds</strong> — typically meet requirements easily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent-600">✓</span>
                    <span><strong>Heavy Fines</strong> — €10,000+ for unlicensed rentals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Intro */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-warm-700 leading-relaxed">
                Planning to rent out your Costa Blanca property to holidaymakers? Whether for occasional weeks or year-round holiday letting, you need a <strong>Tourist Rental License</strong> (Licencia de Vivienda Turística) from the Valencia regional government. Here is everything you need to know.
              </p>
            </div>

            {/* What is a Tourist Rental License */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">What is a Tourist Rental License?</h2>
              <p className="text-warm-700 mb-4">
                A Tourist Rental License — known locally as a <strong>Licencia VT</strong> (Vivienda Turística) — is the official authorization required to legally rent your property to tourists in the Valencia region, which includes all of Costa Blanca (Alicante province).
              </p>
              <p className="text-warm-700 mb-4">
                Once approved, you receive a <strong>VT registration number</strong> that must be displayed on all advertising, including Airbnb, Booking.com, and any other platforms or websites where you list your property.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800">Important:</p>
                <p className="text-yellow-700">
                  Since 2024, platforms like Airbnb are legally required to verify VT numbers before allowing listings. Unlicensed properties can be removed, and owners face significant fines.
                </p>
              </div>
            </section>

            {/* New 2025 Regulations */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">New 2025 Regulations: What Changed?</h2>
              <p className="text-warm-700 mb-4">
                The Valencia regional government introduced updated regulations in 2025 to address housing concerns and improve the quality of tourist accommodation:
              </p>
              <div className="bg-white rounded-xl border border-warm-200 p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Stricter Registration Requirements</h4>
                    <p className="text-warm-600 text-sm">All properties must be registered on the Regional Tourism Register with verified documentation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Municipal Zoning Controls</h4>
                    <p className="text-warm-600 text-sm">Some towns now limit new licenses in areas with high tourist rental density. Check local rules.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Enhanced Safety Standards</h4>
                    <p className="text-warm-600 text-sm">Updated requirements for fire safety, first aid kits, and emergency information.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Platform Verification</h4>
                    <p className="text-warm-600 text-sm">Booking platforms must now verify license numbers with the regional database.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">License Requirements: What You Need</h2>

              <h3 className="text-lg font-semibold text-primary-900 mt-6 mb-3">Property Requirements</h3>
              <div className="bg-warm-50 rounded-xl p-6 mb-6">
                <ul className="space-y-2 text-warm-700">
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Valid <strong>Habitability Certificate</strong> (Cédula de Habitabilidad)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Current <strong>Energy Performance Certificate</strong> (minimum E rating)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Minimum room sizes met (living room, bedrooms, kitchen)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Direct ventilation and natural light in habitable rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Hot and cold water supply</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Air conditioning (heating and cooling)</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-primary-900 mt-6 mb-3">Equipment & Furnishing Requirements</h3>
              <div className="bg-warm-50 rounded-xl p-6 mb-6">
                <ul className="space-y-2 text-warm-700">
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Fully equipped kitchen with refrigerator, hob, and basic utensils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Bed linen and towels for maximum occupancy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Cleaning supplies and waste bins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>First aid kit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Emergency contact information displayed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success-500">✓</span>
                    <span>Tourist information about the local area</span>
                  </li>
                </ul>
              </div>

              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Good News for New Build Buyers:</p>
                <p className="text-success-700">
                  New build properties typically meet all these requirements out of the box — modern construction, energy-efficient, properly sized rooms, and air conditioning included. This makes obtaining a license much simpler than with older properties.
                </p>
              </div>
            </section>

            {/* The Process */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">The Application Process</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Gather Documentation</h4>
                    <p className="text-warm-600 text-sm">Obtain property deeds, habitability certificate, energy certificate, community approval (if applicable), and proof of ownership or authorization to rent.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Complete the Application</h4>
                    <p className="text-warm-600 text-sm">Submit the Declaración Responsable (responsible declaration) to the Valencia Tourism Registry online or in person.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Receive Your VT Number</h4>
                    <p className="text-warm-600 text-sm">Once approved (typically 2-4 weeks), you will receive your official VT registration number.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-primary-900">Display Your License</h4>
                    <p className="text-warm-600 text-sm">Your VT number must appear on all advertisements, booking platforms, and at the property entrance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Service CTA */}
            <section className="mb-12">
              <div className="bg-primary-900 text-white rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">We Handle Everything For You</h2>
                <p className="mb-4 text-warm-300">
                  As part of our <strong>After Sales Service</strong>, we help our clients obtain their tourist rental license and set up their property for successful holiday letting.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-accent-400">✓</span>
                    <span className="text-warm-200">License application assistance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-400">✓</span>
                    <span className="text-warm-200">Certificate coordination</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-400">✓</span>
                    <span className="text-warm-200">Property management setup</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-400">✓</span>
                    <span className="text-warm-200">Listing optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-400">✓</span>
                    <span className="text-warm-200">Furniture pack options</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-accent-400">✓</span>
                    <span className="text-warm-200">Interior styling services</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/after-sales"
                    className="bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors text-center"
                  >
                    Explore After Sales Services
                  </Link>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                  >
                    Ask Us About Licensing
                  </a>
                </div>
              </div>
            </section>

            {/* Costs */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Costs Breakdown</h2>
              <div className="bg-white rounded-xl border border-warm-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-warm-100">
                    <tr>
                      <th className="p-4 text-left font-semibold text-primary-900">Item</th>
                      <th className="p-4 text-right font-semibold text-primary-900">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-warm-200">
                      <td className="p-4 text-warm-700">License Registration Fee</td>
                      <td className="p-4 text-right font-medium text-success-600">Free</td>
                    </tr>
                    <tr className="border-t border-warm-200 bg-warm-50">
                      <td className="p-4 text-warm-700">Energy Performance Certificate</td>
                      <td className="p-4 text-right font-medium text-primary-900">€100-€200</td>
                    </tr>
                    <tr className="border-t border-warm-200">
                      <td className="p-4 text-warm-700">Habitability Certificate</td>
                      <td className="p-4 text-right font-medium text-primary-900">€100-€300</td>
                    </tr>
                    <tr className="border-t border-warm-200 bg-warm-50">
                      <td className="p-4 text-warm-700">Professional Application Help (optional)</td>
                      <td className="p-4 text-right font-medium text-primary-900">€200-€400</td>
                    </tr>
                    <tr className="border-t-2 border-primary-200 bg-primary-50">
                      <td className="p-4 font-semibold text-primary-900">Typical Total</td>
                      <td className="p-4 text-right font-bold text-primary-900">€300-€800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-warm-600 text-sm mt-3">
                * New build properties often come with energy certificates already, reducing costs.
              </p>
            </section>

            {/* FAQs */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {rentalFaqs.map((faq, i) => (
                  <details key={i} className="bg-warm-50 border border-warm-200 rounded-xl p-4 group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-primary-900">
                      {faq.question}
                      <span className="transform group-open:rotate-180 transition-transform text-warm-500">▼</span>
                    </summary>
                    <p className="mt-4 text-warm-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <section className="bg-accent-50 border border-accent-200 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">Need Help With Your Rental License?</h2>
              <p className="text-warm-700 mb-6 max-w-xl mx-auto">
                We help our clients navigate the licensing process and set up successful holiday rental businesses. From paperwork to property management — we have got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  className="bg-primary-900 hover:bg-primary-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Contact Form
                </Link>
              </div>
            </section>

          </div>
        </article>

        {/* Consultation CTA */}
        <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-center md:text-left">
                <h3 className="text-xl font-semibold mb-1">Need Personal Advice?</h3>
                <p className="text-accent-100">Book a free 30-minute consultation with our experienced property experts — 12+ years on the Costa Blanca</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/consultation" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-warm-50 text-accent-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Book Consultation
                </Link>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-primary-900">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/guides/costs-taxes" className="bg-warm-50 p-6 rounded-xl border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-bold text-primary-900 mb-2">Costs & Taxes</h3>
                <p className="text-warm-600 text-sm">Full breakdown of buying costs in Spain</p>
              </Link>
              <Link href="/after-sales" className="bg-warm-50 p-6 rounded-xl border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-bold text-primary-900 mb-2">After Sales Services</h3>
                <p className="text-warm-600 text-sm">Property management, styling & more</p>
              </Link>
              <Link href="/guides/why-new-build" className="bg-warm-50 p-6 rounded-xl border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="font-bold text-primary-900 mb-2">Why New Build?</h3>
                <p className="text-warm-600 text-sm">Benefits of buying new construction</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

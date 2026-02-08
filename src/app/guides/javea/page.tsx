import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { javeaZones, javeaFaqs, javeaCostOfLiving, javeaBeaches, javeaEvents, javeaSchools, javeaActivities } from '@/data/javea-zones';
import { heroImage, secondaryImage, zoneBanners, nearbyAreaImages } from '@/data/javea-images';
import JaveaGuideClient, { BeachesCarousel, Accordion, BackToTop } from './JaveaGuideClient';

export const metadata: Metadata = {
  title: 'Living in Jávea 2026: Complete Guide to All 4 Neighborhoods | New Build Costa Blanca',
  description: 'The most comprehensive Jávea guide online. Explore Arenal, Old Town, Port & Montañar neighborhoods with aerial photography, property prices, beaches, cost of living, and insider tips for international buyers.',
  keywords: [
    'Jávea property guide', 'living in Jávea', 'Xàbia property', 'buy property Jávea',
    'Arenal beach Jávea', 'Montgó mountain', 'Costa Blanca North property',
    'Jávea neighborhoods', 'expat life Jávea', 'Jávea real estate 2026',
    'luxury villa Jávea', 'Cap Martí property', 'Jávea old town',
  ],
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/javea',
  },
  openGraph: {
    title: 'Living in Jávea 2026: Complete Neighborhood Guide',
    description: 'Explore all 4 neighborhoods of Jávea with aerial photography, property prices, beaches, and insider tips.',
    type: 'article',
    url: 'https://newbuildhomescostablanca.com/guides/javea',
  },
};

// Schema markup
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://newbuildhomescostablanca.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://newbuildhomescostablanca.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Jávea Guide', item: 'https://newbuildhomescostablanca.com/guides/javea' },
  ],
};

const placeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Jávea (Xàbia)',
  description: 'Premium coastal town on Costa Blanca North with Montgó mountain, three beaches, and 50% international population',
  geo: { '@type': 'GeoCoordinates', latitude: 38.7834, longitude: 0.1672 },
  address: { '@type': 'PostalAddress', addressLocality: 'Jávea', addressRegion: 'Alicante', addressCountry: 'ES' },
  hasMap: 'https://maps.google.com/?q=38.7834,0.1672',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Sandy Beach (Arenal)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Montgó Natural Park', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Marina & Yacht Club', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Golf Course', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'International Schools', value: true },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '340', bestRating: '5' },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Living in Jávea 2026: Complete Guide to All 4 Neighborhoods',
  datePublished: '2026-02-08',
  dateModified: '2026-02-08',
  author: { '@type': 'Organization', name: 'New Build Homes Costa Blanca' },
  publisher: { '@type': 'Organization', name: 'New Build Homes Costa Blanca', url: 'https://newbuildhomescostablanca.com' },
  description: 'Comprehensive guide to living in Jávea covering all 4 neighborhoods, property prices, beaches, cost of living, and lifestyle.',
  mainEntityOfPage: 'https://newbuildhomescostablanca.com/guides/javea',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: javeaFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function JaveaGuidePage() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Schema markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumbs */}
      <nav className="bg-primary-900 border-b border-white/10 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-warm-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li className="text-warm-600">/</li>
            <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
            <li className="text-warm-600">/</li>
            <li className="text-accent-400">Jávea</li>
          </ol>
        </div>
      </nav>

      {/* Hero — Full viewport */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-end">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16 w-full">
          <div className="max-w-3xl">
            <div className="text-accent-400 text-sm font-bold tracking-widest uppercase mb-3">Complete Destination Guide</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
              The Complete Guide to Living in <span className="font-bold">Jávea</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-200 mb-8 max-w-2xl">
              Four distinct neighborhoods, seven beaches, one legendary mountain — everything you need to know about
              Costa Blanca North&apos;s most sought-after address.
            </p>
          </div>
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { value: '27,000+', label: 'Population' },
              { value: '7', label: 'Beaches & Coves' },
              { value: '320+', label: 'Sunny Days/Year' },
              { value: '50%', label: 'International' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-warm-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone Navigator (sticky) */}
      <JaveaGuideClient />

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-6">
            Why <span className="font-bold">Jávea</span>?
          </h2>
          <div className="prose prose-lg max-w-none text-warm-700 space-y-4">
            <p>
              Jávea (Xàbia in Valencian) is the crown jewel of Costa Blanca North. Sheltered by the 753-meter Montgó mountain
              and blessed with a microclimate that the World Health Organization has recognized as one of the healthiest in the world,
              this town of 27,000 permanent residents has been drawing discerning international buyers for decades. Roughly half the
              population is foreign — predominantly British, German, Dutch, and Scandinavian — creating a cosmopolitan, multilingual
              community that feels worlds apart from the mass-tourism resorts further south.
            </p>
            <p>
              What makes Jávea unique is its three distinct faces. The medieval old town perched on a hill, where Gothic church bells
              ring over the Thursday market. The working fishing port, where boats still come in at dawn with the day&apos;s catch. And
              the Arenal, a sweeping sandy bay that transforms into an outdoor living room each evening as families, friends, and lovers
              stroll the promenade in the golden light. Behind it all, the Montgó towers like a protective sentinel, its nature reserve
              trails offering panoramic views from a summit where you can see Ibiza on a clear day.
            </p>
            <p>
              Properties range from €120,000 for a renovated townhouse in the old town to over €4.5 million for a cliff-top villa
              on Cap Martí — and the town rewards buyers at every price point with a quality of life that is genuinely difficult to
              find anywhere else on the Mediterranean.
            </p>
          </div>

          {/* Quick zone overview */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {javeaZones.map((zone) => (
              <div key={zone.id} className="bg-warm-50 rounded-lg p-4 text-center border border-warm-200">
                <div className="text-sm text-warm-500 mb-1">{zone.stats.character}</div>
                <div className="font-bold text-primary-900 text-sm mb-1">{zone.name.split(' (')[0].split(' &')[0]}</div>
                <div className="text-accent-600 text-sm font-semibold">{zone.stats.avgPrice}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone Sections */}
      {javeaZones.map((zone, index) => (
        <section
          key={zone.id}
          id={zone.id}
          className={index % 2 === 0 ? 'bg-warm-50' : 'bg-white'}
        >
          {/* Zone Banner */}
          <div className="relative h-[300px] md:h-[500px] overflow-hidden">
            <div
              className="hidden md:block absolute inset-0"
              style={{
                backgroundImage: `url(${zoneBanners[zone.id]?.src || heroImage.src})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
            <div className="md:hidden relative h-full w-full">
              <Image
                src={zoneBanners[zone.id]?.src || heroImage.src}
                alt={zoneBanners[zone.id]?.alt || `Aerial view of ${zone.name}`}
                fill
                className="object-cover"
                loading="lazy"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-7xl mx-auto">
                <div className="text-accent-400 text-xs font-bold tracking-widest uppercase mb-2">
                  Zone {index + 1} of {javeaZones.length}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2">
                  {zone.name}
                </h2>
                <p className="text-warm-200 text-lg max-w-2xl">{zone.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Zone Content */}
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl">
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-primary-900">{zone.stats.avgPrice}</div>
                <div className="text-warm-500 text-sm">Avg. Price Range</div>
              </div>
              <div className="text-center border-x border-warm-200">
                <div className="text-lg md:text-xl font-bold text-primary-900">{zone.stats.distanceToBeach}</div>
                <div className="text-warm-500 text-sm">To Beach</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-primary-900">{zone.stats.character}</div>
                <div className="text-warm-500 text-sm">Character</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main content — 2 cols */}
              <div className="lg:col-span-2 space-y-5">
                {zone.description.map((paragraph, i) => (
                  <p key={i} className="text-warm-700 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}

                {/* Highlights */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary-900 mb-4">What Makes {zone.name.split(' (')[0].split(' &')[0]} Special</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {zone.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-warm-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Amenities */}
                <div className="bg-white rounded-xl p-6 border border-warm-200 shadow-sm">
                  <h3 className="font-bold text-primary-900 mb-4">Nearby Amenities</h3>
                  <div className="space-y-3">
                    {zone.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-warm-400">
                            {amenity.type === 'beach' && '🏖️'}
                            {amenity.type === 'shopping' && '🛍️'}
                            {amenity.type === 'dining' && '🍽️'}
                            {amenity.type === 'healthcare' && '🏥'}
                            {amenity.type === 'transport' && '🚌'}
                            {amenity.type === 'park' && '🌿'}
                            {amenity.type === 'school' && '🏫'}
                            {amenity.type === 'sport' && '⛵'}
                            {amenity.type === 'golf' && '⛳'}
                          </span>
                          <span className="text-warm-700">{amenity.name}</span>
                        </div>
                        {amenity.distance && (
                          <span className="text-warm-400 text-xs">{amenity.distance}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property types */}
                <div className="bg-accent-500/10 rounded-xl p-6 border border-accent-500/20">
                  <h3 className="font-bold text-primary-900 mb-3">Property Types</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {zone.propertyTypes.map((type, i) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-warm-700 border border-warm-200">
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-warm-600 mb-4">
                    Price range: <span className="font-bold text-primary-900">{zone.priceRange}</span>
                  </div>
                  <Link
                    href={zone.propertyLink}
                    className="block text-center bg-accent-500 hover:bg-accent-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm"
                  >
                    View Properties in {zone.name.split(' (')[0].split(' &')[0]}
                  </Link>
                </div>

                {/* Related articles */}
                {zone.blogLinks.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-warm-200 shadow-sm">
                    <h3 className="font-bold text-primary-900 mb-3">Related Articles</h3>
                    <div className="space-y-2">
                      {zone.blogLinks.map((link, i) => (
                        <Link key={i} href={`/blog/${link.slug}`} className="block text-accent-600 hover:text-accent-700 text-sm font-medium">
                          {link.title} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Beaches Section */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-accent-400 text-sm font-bold tracking-widest uppercase mb-2">7 Beaches & Coves</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Jávea&apos;s <span className="font-bold">Beaches</span>
            </h2>
            <p className="text-warm-300 mt-3 max-w-2xl mx-auto">
              From the wide sandy sweep of the Arenal to hidden cliff coves only reachable by kayak —
              Jávea&apos;s coastline rivals any in the Mediterranean.
            </p>
          </div>
          <BeachesCarousel>
            {javeaBeaches.map((beach) => (
              <div
                key={beach.name}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{beach.name}</h3>
                    {beach.blueFlag && (
                      <span className="bg-blue-500/30 text-blue-300 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">Blue Flag</span>
                    )}
                  </div>
                  <p className="text-warm-300 text-sm mb-3">{beach.character}</p>
                  <div className="flex items-center justify-between text-xs text-warm-400">
                    <span>Length: {beach.length}</span>
                    <span className="capitalize">{beach.zone.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </BeachesCarousel>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-primary-900 mb-8">
            Events & <span className="font-bold">Festivals</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {javeaEvents.map((event) => (
              <div key={event.name} className="bg-warm-50 rounded-lg p-5 border border-warm-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-primary-900">{event.name}</h3>
                  <span className="text-accent-600 text-sm font-semibold whitespace-nowrap ml-2">{event.month}</span>
                </div>
                <p className="text-warm-600 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info Section */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-primary-900 mb-8">
            Practical <span className="font-bold">Information</span>
          </h2>
          <div className="space-y-3">
            <Accordion title="Cost of Living in Jávea" defaultOpen>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-warm-200">
                      <th className="text-left py-2 text-warm-500 font-medium">Category</th>
                      <th className="text-left py-2 text-warm-500 font-medium">Cost</th>
                      <th className="text-left py-2 text-warm-500 font-medium hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {javeaCostOfLiving.map((item) => (
                      <tr key={item.category} className="border-b border-warm-100">
                        <td className="py-2.5 text-primary-900 font-medium">{item.category}</td>
                        <td className="py-2.5 text-accent-600 font-semibold">{item.cost}</td>
                        <td className="py-2.5 text-warm-500 hidden sm:table-cell">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Accordion>

            <Accordion title="Healthcare">
              <div className="space-y-3 text-warm-700">
                <p>
                  Jávea is served by the <strong>Centro de Salud de Jávea</strong> for primary care, with the main hospital —
                  <strong>Hospital de Dénia-Marina Salud</strong> — just 12km north. This modern public-private hospital has
                  emergency services, specialist departments, and an excellent reputation for both Spanish and international patients.
                </p>
                <p>
                  Several private clinics in Jávea offer specialist care, dentistry, and physiotherapy. Many practitioners
                  speak English, German, and Dutch. The ASSSA and Sanitas insurance networks have strong coverage in the area,
                  and private consultations are affordable by Northern European standards (€40-€80 for a specialist visit).
                </p>
                <p>
                  The nearest pharmacy is never more than a few minutes away, with multiple locations in the old town,
                  port, and Arenal zones. Spain&apos;s public healthcare system (Seguridad Social) covers registered residents,
                  and the Valencia region has bilingual patient support services.
                </p>
              </div>
            </Accordion>

            <Accordion title="Schools & Education">
              <div className="space-y-4">
                {javeaSchools.map((school) => (
                  <div key={school.name} className="bg-warm-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-bold text-primary-900">{school.name}</h4>
                      <span className="text-accent-600 text-xs font-semibold whitespace-nowrap ml-2">{school.type}</span>
                    </div>
                    <p className="text-warm-600 text-sm">{school.curriculum}</p>
                    <p className="text-warm-500 text-xs mt-1">{school.notes}</p>
                  </div>
                ))}
                <p className="text-warm-600 text-sm">
                  Additional international schools are available in nearby Dénia (The Lady Elizabeth School, British curriculum)
                  and Benidorm (Elian&apos;s British School). University-level education is accessible in Alicante (90 min)
                  and Valencia (2 hours).
                </p>
              </div>
            </Accordion>

            <Accordion title="Nature & Activities">
              <div className="grid sm:grid-cols-2 gap-4">
                {javeaActivities.map((activity) => (
                  <div key={activity.name} className="flex gap-3">
                    <div className="text-accent-500 text-lg mt-0.5">
                      {activity.type === 'Hiking' && '🥾'}
                      {activity.type === 'Walking' && '🚶'}
                      {activity.type === 'Water Sports' && '🚣'}
                      {activity.type === 'Golf' && '⛳'}
                      {activity.type === 'Sailing' && '⛵'}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary-900 text-sm">{activity.name}</h4>
                      <p className="text-warm-600 text-sm">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion title="Transport & Getting Around">
              <div className="space-y-3 text-warm-700">
                <p>
                  <strong>Airports:</strong> Alicante-Elche Airport (ALC) is 100km south (90 minutes by car via AP-7).
                  Valencia Airport (VLC) is 120km north (110 minutes). Both have extensive European connections year-round.
                  Private transfer services operate from both airports for approximately €100-€140 each way.
                </p>
                <p>
                  <strong>Ferries:</strong> Denia port (12km north) has daily Baleària ferries to Ibiza (2.5 hours) and
                  Mallorca (3.5 hours), making island-hopping a realistic weekend activity.
                </p>
                <p>
                  <strong>Local transport:</strong> Jávea&apos;s local bus service connects the old town, port, and Arenal.
                  Inter-city buses run to Denia, Calpe, and Alicante. Many residents use cars for daily life, though the
                  Arenal and port zones are walkable. Electric bikes are increasingly popular for the hilly terrain.
                  The AP-7 motorway connects to the N-332 coastal road for north-south travel.
                </p>
                <p>
                  <strong>Driving:</strong> A car is recommended for exploring the wider region. Roads are well-maintained
                  and scenic. Parking in the Arenal can be challenging in summer — the old town and port have more space.
                </p>
              </div>
            </Accordion>

            <Accordion title="Climate & Weather">
              <div className="space-y-3 text-warm-700">
                <p>
                  Jávea enjoys one of the healthiest microclimates in the world, officially recognized by the World Health Organization.
                  The Montgó mountain shields the town from cold northern winds, creating a natural sun trap that delivers
                  320+ sunny days per year.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                  {[
                    { season: 'Spring', temp: '18-24°C', detail: 'Warm, perfect for hiking' },
                    { season: 'Summer', temp: '26-32°C', detail: 'Hot, sea breezes' },
                    { season: 'Autumn', temp: '18-25°C', detail: 'Warm, occasional rain' },
                    { season: 'Winter', temp: '10-18°C', detail: 'Mild, sunny days' },
                  ].map((s) => (
                    <div key={s.season} className="bg-warm-50 rounded-lg p-3 text-center">
                      <div className="font-bold text-primary-900">{s.season}</div>
                      <div className="text-accent-600 font-semibold">{s.temp}</div>
                      <div className="text-warm-500 text-xs">{s.detail}</div>
                    </div>
                  ))}
                </div>
                <p>
                  Rainfall averages just 350mm per year, concentrated in September-November. Summer sea temperatures
                  reach 25-27°C, making swimming comfortable from May to October. Winter rarely drops below 8°C,
                  and snow on the Montgó is a once-in-a-decade event that locals celebrate with photos.
                </p>
              </div>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Nearby Areas — Costa Blanca North Context */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-accent-500 text-sm font-bold tracking-widest uppercase mb-2">Explore the Region</div>
            <h2 className="text-3xl font-light text-primary-900">
              Costa Blanca <span className="font-bold">North</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Jávea is the jewel of a stunning coastline. Discover its neighboring towns, each with a distinctive character.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nearbyAreaImages.map((area) => {
              const areaName = area.alt.replace('Aerial view of ', '').replace(' coastline', '').replace(' and Peñón de Ifach', '').replace(' castle and coastline', '').replace(' old town', '').replace(' coast', '').replace(' cliffs', '');
              const slug = areaName.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link key={area.src} href={`/areas/${slug}`} className="group">
                  <div className="relative h-40 rounded-xl overflow-hidden mb-2">
                    <Image
                      src={area.src}
                      alt={area.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white font-bold text-sm">{areaName}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-primary-900 mb-8">
            Frequently Asked <span className="font-bold">Questions</span>
          </h2>
          <div className="space-y-3">
            {javeaFaqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-lg border border-warm-200 group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-warm-50 transition-colors">
                  <span className="font-semibold text-primary-900 pr-4">{faq.question}</span>
                  <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-warm-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Ready to Explore <span className="font-bold">Jávea</span> Properties?
          </h2>
          <p className="text-warm-200 mb-8 max-w-2xl mx-auto">
            From beachfront apartments at the Arenal to luxury villas on Cap Martí — browse our curated
            selection of new build properties in Jávea and Costa Blanca North.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/developments?town=javea"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Jávea Properties
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-white/20"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/torrevieja" className="bg-warm-50 rounded-xl p-6 border border-warm-200 hover:shadow-lg transition-shadow group">
              <div className="text-3xl mb-3">🚁</div>
              <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Torrevieja Guide</h3>
              <p className="text-warm-600 text-sm">7 neighborhoods, 104+ drone photos. The complete guide to Costa Blanca South&apos;s most popular city.</p>
            </Link>
            <Link href="/guides/north-vs-south" className="bg-warm-50 rounded-xl p-6 border border-warm-200 hover:shadow-lg transition-shadow group">
              <div className="text-3xl mb-3">🧭</div>
              <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">North vs South</h3>
              <p className="text-warm-600 text-sm">Compare the two regions — prestigious northern coast vs affordable southern beaches.</p>
            </Link>
            <Link href="/guides/buying-process" className="bg-warm-50 rounded-xl p-6 border border-warm-200 hover:shadow-lg transition-shadow group">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Buying Process</h3>
              <p className="text-warm-600 text-sm">Step-by-step guide to purchasing property in Spain, from reservation to completion.</p>
            </Link>
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';
import { breadcrumbSchema, faqSchema, articleSchema, placeSchema, toJsonLd } from '@/lib/schema';
import { torreviejaZones, torreviejaFaqs, costOfLiving, torreviejaBeaches } from '@/data/torrevieja-zones';
import { heroImage, zoneBanners, zoneGalleries, beachImages } from '@/data/torrevieja-images';
import TorreviejaGuideClient, { BeachesCarousel, Accordion, BackToTop } from './TorreviejaGuideClient';

export const metadata: Metadata = {
  title: 'Living in Torrevieja 2026: Complete Guide to All 7 Neighborhoods | Aerial Photos',
  description:
    'The most comprehensive guide to living in Torrevieja, Spain. Explore all 7 neighborhoods with exclusive helicopter drone photos, property prices, beaches, cost of living, and expert advice for buyers and expats.',
  keywords:
    'Torrevieja guide, living in Torrevieja, Torrevieja neighborhoods, property Torrevieja, buy apartment Torrevieja, Torrevieja beaches, La Mata, Los Balcones, Cabo Cervera, Costa Blanca guide, expat Torrevieja, retire Torrevieja',
  openGraph: {
    title: 'Living in Torrevieja 2026 — The Definitive Neighborhood Guide',
    description:
      'Explore all 7 neighborhoods of Torrevieja with exclusive aerial drone photography. Property prices, beaches, cost of living, and insider tips.',
    type: 'article',
    images: [{ url: heroImage.src, width: 1200, height: 630, alt: heroImage.alt }],
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/torrevieja',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/torrevieja',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/torrevieja',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/torrevieja',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/torrevieja',
      'x-default': 'https://newbuildhomescostablanca.com/guides/torrevieja',
    },
  },
};

export default function TorreviejaGuidePage() {
  // Get related blog articles
  const articles = getBlogPostsForArea('torrevieja', 3);

  // Schema markup
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/' },
    { name: 'Guides', url: 'https://newbuildhomescostablanca.com/guides/' },
    { name: 'Torrevieja Guide', url: 'https://newbuildhomescostablanca.com/guides/torrevieja/' },
  ]);

  const place = placeSchema({
    name: 'Torrevieja',
    description:
      'Torrevieja is a coastal city in the Alicante province of Spain, known for its salt lakes, beaches, and large international community. One of the most popular destinations on the Costa Blanca for property buyers and expats.',
    url: 'https://newbuildhomescostablanca.com/guides/torrevieja',
    image: `https://newbuildhomescostablanca.com${heroImage.src}`,
    address: { region: 'Alicante', country: 'ES' },
    geo: { lat: 37.9786, lng: -0.6823 },
    containedIn: 'Costa Blanca South, Spain',
    population: 80000,
    amenities: ['Beaches', 'Salt Lakes', 'International Hospital', 'Marina', 'Golf Courses', 'Shopping Centers'],
    touristAttractions: [
      'Laguna de Torrevieja (Pink Salt Lake)',
      'Playa del Cura Beach',
      'Torre del Moro Watchtower',
      'Parque de las Naciones',
      'Laguna de La Mata Natural Park',
    ],
  });

  const article = articleSchema({
    headline: 'Living in Torrevieja 2026: Complete Guide to All 7 Neighborhoods',
    description:
      'The most comprehensive guide to living in Torrevieja, Spain. Explore neighborhoods, property prices, beaches, and expat life with exclusive drone photography.',
    datePublished: '2026-01-15',
    author: 'New Build Homes Costa Blanca',
    url: 'https://newbuildhomescostablanca.com/guides/torrevieja',
    image: `https://newbuildhomescostablanca.com${heroImage.src}`,
  });

  const faqSchemaData = faqSchema(torreviejaFaqs);

  return (
    <>
      {/* Schema markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(place) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="bg-warm-50">
        {/* ========================================= */}
        {/* HERO — Full viewport with drone photo */}
        {/* ========================================= */}
        <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-end overflow-hidden">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-primary-900/10" />

          {/* Hero content */}
          <div className="relative z-10 w-full pb-12 md:pb-20 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-white/60">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/guides" className="hover:text-white transition-colors">
                      Guides
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-white/90">Torrevieja</li>
                </ol>
              </nav>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
                The Complete Guide to
                <br />
                <span className="font-semibold">Living in Torrevieja</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 font-light leading-relaxed">
                Explore every neighborhood, beach, and hidden gem — with exclusive aerial drone photography
                no other guide can offer.
              </p>

              {/* Stats bar */}
              <div className="flex flex-wrap gap-6 md:gap-10">
                {[
                  { label: 'Population', value: '80,000+' },
                  { label: 'Beaches', value: '10+' },
                  { label: 'Avg. Temperature', value: '20°C' },
                  { label: 'Airport', value: '40 min' },
                  { label: 'Sunny Days', value: '320+/yr' },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl md:text-3xl font-semibold text-white">{value}</div>
                    <div className="text-sm text-white/60 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </section>

        {/* ========================================= */}
        {/* STICKY ZONE NAVIGATOR */}
        {/* ========================================= */}
        <TorreviejaGuideClient />

        {/* ========================================= */}
        {/* INTRODUCTION */}
        {/* ========================================= */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-8 leading-tight">
              Why <span className="font-semibold">Torrevieja</span>?
            </h2>
            <div className="space-y-5 text-warm-700 text-lg leading-relaxed">
              <p>
                Torrevieja is not just another coastal resort town. With over 80,000 year-round residents, it is a
                fully functioning Mediterranean city that happens to have some of the best beaches, the healthiest
                microclimate, and the most affordable property prices on the Costa Blanca.
              </p>
              <p>
                The World Health Organization has recognized Torrevieja&apos;s unique microclimate — created by
                two ancient salt lakes — as one of the healthiest in Europe. That same climate delivers 320+ sunny
                days per year, winter temperatures that rarely drop below 10°C, and sea breezes that keep summer
                nights comfortable.
              </p>
              <p>
                But what truly sets Torrevieja apart is its diversity. Each neighborhood has its own character, its
                own community, and its own price point. From the urban buzz of the city center to the natural beauty
                of La Mata, from the expat communities of Los Balcones to the dramatic cliffs of Cabo Cervera — you
                can find exactly the lifestyle you are looking for, at a fraction of what you would pay in Northern
                Europe or even the northern Costa Blanca.
              </p>
              <p className="text-primary-900 font-medium">
                This guide takes you through every neighborhood, with exclusive helicopter drone photography that
                shows you each area as you have never seen it before.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* ZONE SECTIONS — 7 neighborhoods */}
        {/* ========================================= */}
        {torreviejaZones.map((zone, index) => {
          const banner = zoneBanners[zone.id];
          const gallery = zoneGalleries[zone.id] || [];
          const isEven = index % 2 === 0;

          return (
            <section
              key={zone.id}
              id={zone.id}
              className="scroll-mt-16"
            >
              {/* Parallax banner */}
              <div className="relative h-[350px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <div
                  className="absolute inset-0 hidden md:block"
                  style={{
                    backgroundImage: `url('${banner?.src}')`,
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
                {/* Mobile: regular image (no parallax for performance) */}
                <div className="absolute inset-0 md:hidden">
                  {banner && (
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      fill
                      className="object-cover"
                      unoptimized
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />

                {/* Zone title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2">
                      Zone {index + 1} of 7
                    </div>
                    <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-3">
                      {zone.name}
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl font-light">{zone.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Zone content */}
              <div className={`py-12 md:py-20 px-4 ${isEven ? 'bg-white' : 'bg-warm-50'}`}>
                <div className="max-w-6xl mx-auto">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 pb-10 border-b border-warm-200">
                    <div>
                      <div className="text-sm text-warm-500 mb-1">Avg. Price Range</div>
                      <div className="text-lg md:text-xl font-semibold text-primary-900">{zone.stats.avgPrice}</div>
                    </div>
                    <div>
                      <div className="text-sm text-warm-500 mb-1">Distance to Beach</div>
                      <div className="text-lg md:text-xl font-semibold text-primary-900">{zone.stats.distanceToBeach}</div>
                    </div>
                    <div>
                      <div className="text-sm text-warm-500 mb-1">Character</div>
                      <div className="text-lg md:text-xl font-semibold text-primary-900">{zone.stats.character}</div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
                    {/* Main content — 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                      {zone.description.map((para, i) => (
                        <p key={i} className="text-warm-700 text-lg leading-relaxed">
                          {para}
                        </p>
                      ))}

                      {/* Highlights */}
                      <div className="mt-10 pt-8 border-t border-warm-200">
                        <h3 className="text-xl font-semibold text-primary-900 mb-5">What Makes {zone.name.split('&')[0].trim()} Special</h3>
                        <ul className="space-y-3">
                          {zone.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                              <span className="text-warm-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Drone gallery */}
                      {gallery.length > 0 && (
                        <div className="mt-10 pt-8 border-t border-warm-200">
                          <h3 className="text-xl font-semibold text-primary-900 mb-5">Aerial Views of {zone.name.split('&')[0].trim()}</h3>
                          <div className={`grid ${gallery.length > 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'} gap-3`}>
                            {gallery.slice(0, 6).map((img, i) => (
                              <div key={i} className={`relative rounded-sm overflow-hidden ${i === 0 && gallery.length > 3 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-[3/2]'}`}>
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  className="object-cover hover:scale-105 transition-transform duration-500"
                                  unoptimized
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                      {/* Amenities */}
                      <div className="bg-warm-50 border border-warm-200 rounded-sm p-6">
                        <h3 className="font-semibold text-primary-900 mb-4">Nearby Amenities</h3>
                        <ul className="space-y-3">
                          {zone.amenities.map((amenity, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                              <div>
                                <div className="font-medium text-primary-900">{amenity.name}</div>
                                {amenity.distance && (
                                  <div className="text-warm-500">{amenity.distance}</div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Property types & price */}
                      <div className="bg-primary-900 text-white rounded-sm p-6">
                        <h3 className="font-semibold mb-3">Property in {zone.name.split('&')[0].trim()}</h3>
                        <div className="text-white/70 text-sm mb-4">
                          <div className="mb-2">
                            <span className="text-white/50">Types:</span>{' '}
                            {zone.propertyTypes.join(', ')}
                          </div>
                          <div>
                            <span className="text-white/50">Price range:</span>{' '}
                            <span className="text-accent-400 font-semibold">{zone.priceRange}</span>
                          </div>
                        </div>
                        <Link
                          href={zone.propertyLink}
                          className="block text-center bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-sm transition-colors text-sm"
                        >
                          View Properties in {zone.name.split('&')[0].trim()}
                        </Link>
                      </div>

                      {/* Related articles */}
                      {zone.blogLinks.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-primary-900 mb-3 text-sm uppercase tracking-wider">Related Reads</h4>
                          <div className="space-y-2">
                            {zone.blogLinks.map((link) => (
                              <Link
                                key={link.slug}
                                href={`/blog/${link.slug}`}
                                className="block text-accent-600 hover:text-accent-700 text-sm font-medium hover:underline"
                              >
                                {link.title} →
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ========================================= */}
        {/* BEACHES CAROUSEL */}
        {/* ========================================= */}
        <section className="py-16 md:py-24 bg-primary-900 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                Over <span className="font-semibold">10 Beaches</span> to Explore
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                From wide golden sands to hidden rocky coves — every stretch of Torrevieja&apos;s coastline
                has its own personality.
              </p>
            </div>

            <BeachesCarousel>
              {torreviejaBeaches.map((beach, i) => {
                const img = beachImages[i];
                return (
                  <div
                    key={beach.name}
                    className="flex-shrink-0 w-[280px] md:w-[350px] snap-start"
                  >
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-3">
                      {img ? (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          unoptimized
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-800" />
                      )}
                      {beach.blueFlag && (
                        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-sm">
                          Blue Flag
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-white text-lg">{beach.name}</h3>
                    <p className="text-white/50 text-sm mt-1">{beach.character}</p>
                    {beach.length && (
                      <p className="text-accent-400 text-sm mt-1 font-medium">{beach.length}</p>
                    )}
                  </div>
                );
              })}
            </BeachesCarousel>
          </div>
        </section>

        {/* ========================================= */}
        {/* PRACTICAL INFORMATION */}
        {/* ========================================= */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-4 text-center">
              Practical <span className="font-semibold">Information</span>
            </h2>
            <p className="text-warm-500 text-center mb-12 text-lg">
              Everything you need to know about daily life in Torrevieja.
            </p>

            <div className="space-y-3">
              <Accordion title="Cost of Living" defaultOpen>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-warm-200">
                        <th className="text-left py-3 font-semibold text-primary-900">Category</th>
                        <th className="text-left py-3 font-semibold text-primary-900">Cost</th>
                        <th className="text-left py-3 font-semibold text-primary-900 hidden md:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costOfLiving.map((item) => (
                        <tr key={item.category} className="border-b border-warm-100">
                          <td className="py-3 text-warm-700">{item.category}</td>
                          <td className="py-3 font-medium text-primary-900">{item.cost}</td>
                          <td className="py-3 text-warm-500 hidden md:table-cell">{item.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-warm-500 text-sm mt-4">
                  Total estimated monthly cost for a couple (excluding rent): €1,200–€1,800. Torrevieja is 30-50% cheaper than northern Costa Blanca and 60%+ cheaper than Scandinavian or British equivalents.
                </p>
              </Accordion>

              <Accordion title="Healthcare">
                <div className="space-y-4 text-warm-700">
                  <p>
                    <strong className="text-primary-900">Hospital de Torrevieja</strong> is a modern public hospital located
                    on Carretera CV-95, serving the entire southern Costa Blanca. It has emergency services, oncology,
                    cardiology, maternity, and all major specialist departments.
                  </p>
                  <p>
                    EU citizens with an EHIC/GHIC card can access emergency care. Registered residents (with padron)
                    get a Spanish health card (tarjeta sanitaria) for full public healthcare. Many expats also carry
                    private health insurance (€50-€150/month) for faster access and English-speaking doctors.
                  </p>
                  <p>
                    Private clinics including Clinica IMED, Dental clinics, and international medical practices
                    are spread throughout the city, many with staff fluent in English, German, Swedish, and Dutch.
                  </p>
                </div>
              </Accordion>

              <Accordion title="Schools & Education">
                <div className="space-y-4 text-warm-700">
                  <p>
                    Torrevieja has both Spanish public schools and international options. Public schools welcome
                    international children with integration support programs — many expat children become bilingual
                    within a year.
                  </p>
                  <p>
                    <strong className="text-primary-900">International schools nearby:</strong> El Limonar International School
                    (British curriculum, in Villamartin, 10 min drive), Newton College (Campoamor, 15 min), and several
                    smaller private academies. In the city, CEIP Inmaculada, CEIP La Mata, and CEIP Las Culturas are among
                    the well-regarded public primaries.
                  </p>
                </div>
              </Accordion>

              <Accordion title="Transport & Getting Around">
                <div className="space-y-4 text-warm-700">
                  <p>
                    <strong className="text-primary-900">By air:</strong> Alicante-Elche Airport (ALC) is 40 minutes by car with
                    year-round flights to most European capitals. Murcia-Corvera Airport (RMU) is 30 minutes south.
                  </p>
                  <p>
                    <strong className="text-primary-900">Local buses:</strong> Torrevieja has a reliable network of urban bus routes
                    connecting all neighborhoods to the center and beaches. The inter-city bus service links to Alicante,
                    Orihuela, Cartagena, and Murcia.
                  </p>
                  <p>
                    <strong className="text-primary-900">By car:</strong> The AP-7 motorway (toll-free since 2020) connects Torrevieja
                    to Alicante (50 min) and Murcia (40 min). Ample parking is available in most neighborhoods.
                  </p>
                  <p>
                    <strong className="text-primary-900">On foot and bike:</strong> The city center and beachfront are highly walkable.
                    The Greenway cycling path and coastal promenades make cycling a practical option for daily errands.
                  </p>
                </div>
              </Accordion>

              <Accordion title="Climate & Weather">
                <div className="space-y-4 text-warm-700">
                  <p>
                    Torrevieja enjoys a semi-arid Mediterranean climate with over 320 sunny days per year. The salt lakes
                    create a unique microclimate that regulates humidity and has been recognized by the WHO for its health
                    benefits. Average temperatures: spring 18-24°C, summer 28-34°C, autumn 18-26°C, winter 10-18°C.
                  </p>
                  <p>
                    Rainfall is minimal (270mm/year), mostly falling in short, intense bursts in October-November.
                    Sea water temperatures range from 15°C in February to 27°C in August, with comfortable swimming
                    from May through November.
                  </p>
                </div>
              </Accordion>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* FAQ SECTION */}
        {/* ========================================= */}
        <section className="py-16 md:py-24 px-4 bg-warm-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-4 text-center">
              Frequently Asked <span className="font-semibold">Questions</span>
            </h2>
            <p className="text-warm-500 text-center mb-12 text-lg">
              Everything buyers and expats ask about Torrevieja — answered in detail.
            </p>

            <div className="space-y-4">
              {torreviejaFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white border border-warm-200 rounded-sm overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-warm-50 transition-colors list-none">
                    <h3 className="font-medium text-primary-900 pr-4">{faq.question}</h3>
                    <svg
                      className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-warm-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* LATEST ARTICLES */}
        {/* ========================================= */}
        {articles.length > 0 && (
          <section className="py-16 bg-warm-50">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Latest Articles About Torrevieja</h2>
              <p className="text-warm-500 mb-8">Expert insights and guides for this area</p>
              <div className="grid md:grid-cols-3 gap-6">
                {articles.map((article: any) => (
                  <a key={article.slug} href={`/blog/${article.slug}`} className="bg-white rounded-sm border border-warm-200 overflow-hidden hover:shadow-lg hover:border-accent-500 transition-all">
                    <div className="p-6">
                      <span className="text-xs font-medium text-accent-600 uppercase tracking-wider">{article.category}</span>
                      <h3 className="text-lg font-semibold text-primary-900 mt-2 line-clamp-2">{article.title}</h3>
                      <p className="text-warm-500 text-sm mt-2 line-clamp-3">{article.description}</p>
                      <span className="text-accent-600 text-sm font-medium mt-4 inline-block">Read more →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========================================= */}
        {/* CTA — Find Properties */}
        {/* ========================================= */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Ready to Find Your Home in <span className="font-semibold">Torrevieja</span>?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Browse new build apartments, townhouses, and villas from trusted developers across every
              neighborhood in Torrevieja. Our team is based here — we know every street.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/developments?town=torrevieja"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-semibold py-4 px-10 rounded-sm transition-colors text-lg"
              >
                Browse Torrevieja Properties
              </Link>
              <Link
                href="/contact"
                className="inline-block border border-white/30 hover:bg-white/10 text-white font-medium py-4 px-10 rounded-sm transition-colors text-lg"
              >
                Speak to Our Team
              </Link>
            </div>

            <p className="text-white/40 text-sm mt-8">
              New Build Homes Costa Blanca — Calle Canonigo Torres 8, Torrevieja
            </p>
          </div>
        </section>

        {/* ========================================= */}
        {/* RELATED GUIDES */}
        {/* ========================================= */}
        <section className="py-16 px-4 bg-warm-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-primary-900 mb-8 text-center">Continue Your Research</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'The Complete Buying Process',
                  description: 'Step-by-step guide from reservation to keys, including NIE numbers, bank accounts, and notary completion.',
                  href: '/guides/buying-process',
                  readTime: '12 min read',
                },
                {
                  title: 'Costs & Taxes',
                  description: 'Every cost explained — IVA, stamp duty, notary fees, legal fees, and ongoing expenses for property owners.',
                  href: '/guides/costs-taxes',
                  readTime: '8 min read',
                },
                {
                  title: 'All Areas & Towns',
                  description: 'Explore every area we cover on the Costa Blanca — from Torrevieja to Javea, with property insights for each.',
                  href: '/areas',
                  readTime: 'Browse areas',
                },
              ].map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="block bg-white border border-warm-200 rounded-sm p-6 hover:shadow-md hover:border-accent-300 transition-all group"
                >
                  <div className="text-xs text-accent-500 font-semibold uppercase tracking-wider mb-2">
                    {guide.readTime}
                  </div>
                  <h3 className="font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-warm-500 text-sm leading-relaxed">{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Back to top */}
        <BackToTop />
      </main>
    </>
  );
}

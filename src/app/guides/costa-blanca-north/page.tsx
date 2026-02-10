import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';

export const metadata: Metadata = {
  title: 'Costa Blanca North Guide 2026: Jávea, Moraira, Altea, Calpe & Denia | Property & Lifestyle',
  description: 'The definitive guide to Costa Blanca North. Explore Jávea, Moraira, Altea, Calpe, and Denia with aerial photography, property prices from €220k, lifestyle insights, and expert advice for international buyers.',
  keywords: [
    'Costa Blanca North property', 'Jávea real estate', 'Moraira property', 'Altea property',
    'Calpe property guide', 'Denia property', 'buy property Costa Blanca North',
    'luxury villa north Costa Blanca', 'Montgó', 'Peñón de Ifach',
  ],
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/costa-blanca-north',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/costa-blanca-noord',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/costa-blanca-noord',
      'x-default': 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
    },
  },
  openGraph: {
    title: 'Costa Blanca North Guide 2026: Complete Property & Lifestyle Guide',
    description: 'Explore Jávea, Moraira, Altea, Calpe, and Denia. Property prices, lifestyle, and expert advice.',
    type: 'article',
    url: 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
  },
};

const towns = [
  {
    name: 'Jávea (Xàbia)',
    slug: 'javea',
    image: '/images/Area canvas/Javea.png',
    description: 'Three distinct zones — historic old town, bustling port, and the family-friendly Arenal sandy beach. Home to 50% international population with established infrastructure and year-round lifestyle. WHO-recognized microclimate beneath the mighty Montgó mountain.',
    priceRange: '€280,000–€4,500,000',
    bestFor: 'Families, permanent residents, established communities',
    character: 'Premium & cosmopolitan',
    hasGuide: true,
    guideLink: '/guides/javea',
    areaLink: '/areas/javea-xabia',
    highlights: ['Sandy beach (rare in the north)', 'Montgó Natural Park', '50% international population', 'La Granadella — Spain\'s best cove'],
  },
  {
    name: 'Moraira',
    slug: 'moraira',
    image: '/images/Area canvas/Moraira.png',
    description: 'Boutique coastal town with an upmarket feel, picturesque marina, and quality restaurants lining a small golden-sand beach. Popular with German and Scandinavian buyers seeking refinement without pretension. Moraira\'s Castle of Moraira and El Portet cove define the town\'s charm.',
    priceRange: '€350,000–€3,000,000',
    bestFor: 'Quality seekers, sailing enthusiasts, discerning buyers',
    character: 'Boutique & refined',
    hasGuide: false,
    guideLink: null,
    areaLink: '/areas/moraira',
    highlights: ['Intimate sandy beach', 'El Portet cove', 'Upmarket dining scene', 'German & Scandinavian community'],
  },
  {
    name: 'Altea',
    slug: 'altea',
    image: '/images/Area canvas/altea.png',
    description: 'The most beautiful old town on Costa Blanca — white-washed buildings cascading down a hillside toward the sea, crowned by the blue-domed Nuestra Señora del Consuelo church. Artists, musicians, and culture lovers gravitate to Altea\'s year-round events, galleries, and authentic Mediterranean atmosphere.',
    priceRange: '€300,000–€1,500,000',
    bestFor: 'Culture lovers, old town living, artists',
    character: 'Cultural & artistic',
    hasGuide: false,
    guideLink: null,
    areaLink: '/areas/altea',
    highlights: ['Most photogenic old town', 'Blue-domed church', 'Artists\' quarter', 'Year-round cultural events'],
  },
  {
    name: 'Calpe',
    slug: 'calpe',
    image: '/images/Area canvas/Calpe.png',
    description: 'Dominated by the iconic Peñón de Ifach — a 332-meter rock jutting from the sea that is the symbol of Costa Blanca. Calpe offers excellent sandy beaches, a lively restaurant scene centred on its fishing port, and the most accessible pricing on the northern coast. The dramatic rock creates a unique visual identity.',
    priceRange: '€220,000–€1,200,000',
    bestFor: 'Beach lovers, foodies, value in the north',
    character: 'Beach & active',
    hasGuide: false,
    guideLink: null,
    areaLink: '/areas/calpe',
    highlights: ['Peñón de Ifach — iconic landmark', 'Sandy beaches both sides', 'Best value in the north', 'Fish restaurants at the port'],
  },
  {
    name: 'Denia',
    slug: 'denia',
    image: '/images/Area canvas/Denia.png',
    description: 'Historic port town guarded by an 11th-century Moorish castle, with ferry connections to Ibiza and Mallorca. Denia is the UNESCO Creative City of Gastronomy — home to Michelin-starred restaurants and the gateway to Montgó Natural Park. Less touristy than its coastal neighbors, with a strong local identity.',
    priceRange: '€250,000–€1,500,000',
    bestFor: 'History lovers, boating, authentic Spain, gastronomy',
    character: 'Historic & gastronomic',
    hasGuide: false,
    guideLink: null,
    areaLink: '/areas/denia',
    highlights: ['Moorish castle', 'Ferry to Ibiza & Mallorca', 'UNESCO gastronomy city', 'Montgó hiking'],
  },
  {
    name: 'Benissa',
    slug: 'benissa',
    image: '/images/Area canvas/Benissa.png',
    description: 'Between Calpe and Moraira, Benissa offers a spectacular 4km coastal path along dramatic cliffs with hidden coves. The inland old town retains medieval charm with Gothic architecture. A quieter, more authentic alternative for buyers who want coast access without the tourist infrastructure.',
    priceRange: '€280,000–€1,800,000',
    bestFor: 'Privacy seekers, cliff-top villas, nature lovers',
    character: 'Hidden gem',
    hasGuide: false,
    guideLink: null,
    areaLink: '/areas/benissa',
    highlights: ['4km coastal walking path', 'Dramatic cliff coves', 'Medieval old town', 'Between Calpe and Moraira'],
  },
];

const naturalHighlights = [
  { name: 'Montgó Natural Park', location: 'Jávea–Denia', description: '753m mountain with hiking trails and 360° views to Ibiza. Protected endemic plant species and dramatic cliff faces.' },
  { name: 'Peñón de Ifach', location: 'Calpe', description: '332m iconic rock — symbol of Costa Blanca. Nature reserve with hiking path to the summit.' },
  { name: 'Cabo de la Nao', location: 'Jávea', description: 'Easternmost point of mainland Spain. Lighthouse, cliff walks, and Mediterranean views stretching to the Balearic Islands.' },
  { name: 'La Granadella Beach', location: 'Jávea', description: 'Pristine cliff cove consistently rated among Spain\'s most beautiful beaches. Crystal water and pine-backed scenery.' },
  { name: 'Serra Gelada', location: 'Benidorm–Altea', description: 'Cliff-side natural park with walking trails, fossil dunes, and sea views between the two towns.' },
  { name: 'Les Fonts de l\'Algar', location: 'Callosa d\'en Sarrià', description: 'Mountain waterfalls and natural pools inland — a refreshing day trip from any coastal town.' },
];

const propertyPrices = [
  { type: 'Apartments', range: '€220,000–€600,000', notes: 'Sea views command premiums, quality generally higher than south' },
  { type: 'Townhouses', range: '€300,000–€800,000', notes: 'Old town properties in Altea/Jávea highly sought' },
  { type: 'Villas', range: '€450,000–€3,500,000', notes: 'Sea-view villas in Moraira/Jávea at the premium end' },
  { type: 'Luxury Estates', range: '€2,000,000+', notes: 'Exceptional cliff-top positions with infinity pools' },
];

const golfCourses = [
  { name: 'La Sella Golf Resort', town: 'Denia', holes: 27, designer: 'José María Olazábal', link: '/golf/la-sella-golf' },
  { name: 'Villaitana Golf', town: 'Benidorm', holes: 36, designer: 'Jack Nicklaus', link: '/golf/villaitana-golf' },
  { name: 'Club de Golf Jávea', town: 'Jávea', holes: 9, designer: 'Classic', link: '/golf/javea-golf' },
  { name: 'Club de Golf Ifach', town: 'Benissa', holes: 9, designer: 'Classic (est. 1974)', link: '/golf/ifach-golf' },
  { name: 'Bonalba Golf', town: 'Mutxamel', holes: 18, designer: 'Ramón Espinosa', link: '/golf/bonalba-golf' },
  { name: 'Don Cayo / Bernia Golf', town: 'Altea', holes: 9, designer: 'Hilltop mountain', link: '/golf/bernia-golf' },
];

const faqs = [
  {
    question: 'Why is Costa Blanca North more expensive than Costa Blanca South?',
    answer: 'The north developed earlier, has more dramatic scenery with mountains meeting the sea, stronger Spanish character, and limited developable land. Established communities and infrastructure maintain premium prices. Many buyers consider it worth the premium for the landscape, authenticity, and lifestyle quality.',
  },
  {
    question: 'What is the best town in Costa Blanca North?',
    answer: 'Jávea offers the best all-round package: three distinct areas, excellent infrastructure, 50% international community, and year-round lifestyle. Moraira suits those seeking boutique refinement. Altea appeals to culture lovers. Calpe offers the best value. Denia attracts history and gastronomy enthusiasts. Each town has a distinct character — visits are essential before deciding.',
  },
  {
    question: 'Is Costa Blanca North suitable for year-round living?',
    answer: 'Excellent for permanent residence. Towns like Jávea and Denia have large year-round populations, full services, established communities, and a mild climate. Winters are warmer than Northern Europe (12–18°C) with some rain. Summer is warm (25–32°C) but less intense than further south. The international community ensures English-speaking services, social activities, and cultural events throughout the year.',
  },
  {
    question: 'How far is Costa Blanca North from Alicante Airport?',
    answer: 'Drive times from Alicante-Elche Airport (ALC): Benidorm 50 minutes, Altea 60 minutes, Calpe 70 minutes, Jávea and Moraira 75–80 minutes, Denia 90 minutes via the AP-7 motorway. Valencia Airport (VLC) offers an alternative for Denia (60 minutes) and Jávea (90 minutes).',
  },
  {
    question: 'Can I live without a car in Costa Blanca North?',
    answer: 'A car is strongly recommended. Towns are spread across hilly terrain, public transport is limited between towns, and many properties are in hillside urbanizations. The TRAM connects Benidorm to Alicante, and local buses exist within larger towns, but for the lifestyle Costa Blanca North offers, driving is essential.',
  },
  {
    question: 'How does Costa Blanca North compare to the French Riviera or Mallorca?',
    answer: 'Costa Blanca North offers similar dramatic coastline and premium lifestyle at a fraction of the price. Properties are 50–70% less expensive than equivalent positions on the Côte d\'Azur and 30–40% less than prime Mallorca. The climate is comparable, the infrastructure is excellent, and the international community is well-established.',
  },
  {
    question: 'What is the rental potential in Costa Blanca North?',
    answer: 'Holiday rentals perform well in summer, with quality villas commanding €1,500–€4,000 per week. However, the market is less investment-driven than the south — most buyers seek lifestyle rather than yield. Long-term rental demand exists from established residents. Gross yields of 3–5% are typical for quality properties.',
  },
  {
    question: 'Are there international schools?',
    answer: 'Yes. Xàbia International College (XIC) in Jávea offers British curriculum (GCSE, A-Levels). The Lady Elizabeth School near Denia is another British curriculum option. Laude Newton College serves the wider region. Spanish public schools throughout the area welcome international children with integration support programs.',
  },
];

// Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://newbuildhomescostablanca.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://newbuildhomescostablanca.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Costa Blanca North', item: 'https://newbuildhomescostablanca.com/guides/costa-blanca-north' },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Costa Blanca North Guide 2026: Complete Property & Lifestyle Guide',
  datePublished: '2026-02-08',
  dateModified: '2026-02-08',
  author: { '@type': 'Organization', name: 'New Build Homes Costa Blanca' },
  publisher: { '@type': 'Organization', name: 'New Build Homes Costa Blanca', url: 'https://newbuildhomescostablanca.com' },
  description: 'The definitive guide to Costa Blanca North covering Jávea, Moraira, Altea, Calpe, Denia, and Benissa.',
  mainEntityOfPage: 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function CostaBlancaNorthGuidePage() {
  // Get related blog articles for Costa Blanca North region
  // The function will look for articles tagged with the area slug and fall back to general guides
  const articles = getBlogPostsForArea('costa-blanca-north', 3);

  return (
    <main className="min-h-screen bg-warm-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            <li className="text-accent-400">Costa Blanca North</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[700px] flex items-end">
        <Image
          src="/images/Area canvas/Calpe.png"
          alt="Aerial view of Calpe and Peñón de Ifach on Costa Blanca North"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
          <div className="max-w-3xl">
            <div className="text-accent-400 text-sm font-bold tracking-widest uppercase mb-3">Region Guide</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
              Costa Blanca <span className="font-bold">North</span>
            </h1>
            <p className="text-lg md:text-xl text-warm-200 mb-8 max-w-2xl">
              Where mountains meet the Mediterranean. Jávea, Moraira, Altea, Calpe, Denia — Spain&apos;s most prestigious
              coastal address with properties from €220,000 to €3.5M+.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { value: '6', label: 'Major Towns' },
              { value: '€220k–€3.5M', label: 'Price Range' },
              { value: '320+', label: 'Sunny Days' },
              { value: '50-90 min', label: 'From Airport' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 text-center">
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-warm-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-6">
            Spain&apos;s Most <span className="font-bold">Prestigious Coast</span>
          </h2>
          <div className="prose prose-lg max-w-none text-warm-700 space-y-4">
            <p>
              Costa Blanca North stretches from Denia south to Benidorm, where the mountains of the Marina Alta
              and Marina Baixa plunge dramatically into the Mediterranean. This is not mass-tourism territory — this is
              where discerning buyers seek authentic Mediterranean living among traditional villages, dramatic cliffs,
              and some of Europe&apos;s most beautiful coastline.
            </p>
            <p>
              From the old town charm of Altea to the sailing haven of Jávea, from the boutique sophistication of
              Moraira to the iconic Peñón de Ifach in Calpe, Costa Blanca North offers a Mediterranean lifestyle
              that has attracted international residents for decades. The region combines Spanish authenticity with
              international convenience, natural beauty with cultural richness.
            </p>
            <p>
              Prices are higher here than in the south — but for many, the dramatic landscapes, established communities,
              and refined atmosphere justify the premium. Properties hold value well and the quality of life is genuinely
              exceptional.
            </p>
          </div>
        </div>
      </section>

      {/* Towns Grid */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-accent-500 text-sm font-bold tracking-widest uppercase mb-2">Choose Your Town</div>
            <h2 className="text-3xl md:text-4xl font-light text-primary-900">
              Six <span className="font-bold">Distinct Destinations</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Each town on Costa Blanca North has its own personality. From cosmopolitan Jávea to gastronomic Denia —
              explore them all with aerial photography and insider knowledge.
            </p>
          </div>

          <div className="space-y-8">
            {towns.map((town, index) => (
              <div
                key={town.slug}
                className={`bg-white rounded-xl overflow-hidden border border-warm-200 shadow-sm hover:shadow-lg transition-shadow ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                } md:flex`}
              >
                {/* Image */}
                <div className="relative h-64 md:h-auto md:w-2/5 flex-shrink-0">
                  <Image
                    src={town.image}
                    alt={`Aerial view of ${town.name}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-900/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                      {town.character}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">{town.name}</h3>
                  <p className="text-warm-700 mb-4">{town.description}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {town.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-sm text-warm-600">
                        <svg className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-5 text-sm">
                    <div>
                      <span className="text-warm-500">Price range: </span>
                      <span className="font-bold text-primary-900">{town.priceRange}</span>
                    </div>
                    <div>
                      <span className="text-warm-500">Best for: </span>
                      <span className="text-warm-700">{town.bestFor}</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    {town.hasGuide && town.guideLink && (
                      <Link
                        href={town.guideLink}
                        className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors"
                      >
                        Read Full Guide →
                      </Link>
                    )}
                    <Link
                      href={town.areaLink}
                      className="bg-primary-900 hover:bg-primary-800 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors"
                    >
                      View Properties
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Beauty */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-accent-400 text-sm font-bold tracking-widest uppercase mb-2">Natural Beauty</div>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Mountains, Cliffs & <span className="font-bold">Hidden Coves</span>
            </h2>
            <p className="text-warm-300 mt-3 max-w-2xl mx-auto">
              The dramatic landscape is what sets Costa Blanca North apart. Protected natural parks,
              cliff walks, and mountain trails create scenery that rivals any Mediterranean coastline.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {naturalHighlights.map((highlight) => (
              <div key={highlight.name} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-accent-400 text-xs font-bold uppercase tracking-wider mb-2">{highlight.location}</div>
                <h3 className="text-lg font-bold text-white mb-2">{highlight.name}</h3>
                <p className="text-warm-300 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Market */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-primary-900 mb-6">
            Property <span className="font-bold">Market Overview</span>
          </h2>
          <p className="text-warm-700 mb-8">
            Costa Blanca North is the premium end of the market. Prices reflect desirable locations,
            established infrastructure, and limited supply. Properties here tend to be larger, better-built,
            and hold value well. The market attracts quality-focused buyers rather than bargain hunters.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-warm-200">
                  <th className="text-left py-3 text-warm-500 font-medium">Property Type</th>
                  <th className="text-left py-3 text-warm-500 font-medium">Price Range</th>
                  <th className="text-left py-3 text-warm-500 font-medium hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {propertyPrices.map((item) => (
                  <tr key={item.type} className="border-b border-warm-100">
                    <td className="py-3 font-medium text-primary-900">{item.type}</td>
                    <td className="py-3 text-accent-600 font-semibold">{item.range}</td>
                    <td className="py-3 text-warm-500 hidden sm:table-cell">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href="/properties?region=costa-blanca-north"
            className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm"
          >
            Browse All Costa Blanca North Properties →
          </Link>
        </div>
      </section>

      {/* Golf Section */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-light text-primary-900">
              Golf on the <span className="font-bold">Northern Coast</span>
            </h2>
            <p className="text-warm-600 mt-3 max-w-2xl mx-auto">
              Quality golfing in spectacular settings with sea and mountain views. From Olazábal&apos;s La Sella to
              Nicklaus&apos;s Villaitana — world-class design meets Mediterranean scenery.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {golfCourses.map((course) => (
              <Link
                key={course.name}
                href={course.link}
                className="bg-white rounded-xl p-5 border border-warm-200 hover:shadow-lg hover:border-accent-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-primary-900 group-hover:text-accent-600 transition-colors">{course.name}</h3>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">{course.holes}H</span>
                </div>
                <div className="text-warm-500 text-sm mb-1">{course.town}</div>
                <div className="text-warm-600 text-sm">{course.designer}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/golf" className="text-accent-600 hover:text-accent-700 text-sm font-semibold transition-colors">
              View All Golf Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-light text-primary-900 mb-8">
            Frequently Asked <span className="font-bold">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-warm-50 rounded-lg border border-warm-200 group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-warm-100 transition-colors">
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

      {/* Latest Articles Section */}
      {articles.length > 0 && (
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">Latest Articles About Costa Blanca North</h2>
            <p className="text-warm-500 mb-8">Expert insights and guides for this region</p>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Ready to Explore <span className="font-bold">Costa Blanca North</span>?
          </h2>
          <p className="text-warm-200 mb-8 max-w-2xl mx-auto">
            From beachfront apartments in Calpe to cliff-top villas in Jávea — browse our curated
            selection of new build properties across Costa Blanca North.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties?region=costa-blanca-north"
              className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Properties
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
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-primary-900 mb-6">Destination Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/javea" className="bg-white rounded-xl p-6 border border-warm-200 hover:shadow-lg transition-shadow group">
              <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Living in Jávea</h3>
              <p className="text-warm-600 text-sm">4 neighborhoods, 7 beaches. The complete guide to Costa Blanca North&apos;s most popular town.</p>
            </Link>
            <Link href="/guides/torrevieja" className="bg-white rounded-xl p-6 border border-warm-200 hover:shadow-lg transition-shadow group">
              <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">Living in Torrevieja</h3>
              <p className="text-warm-600 text-sm">7 neighborhoods, 104+ drone photos. The definitive guide to Costa Blanca South.</p>
            </Link>
            <Link href="/guides/north-vs-south" className="bg-white rounded-xl p-6 border border-warm-200 hover:shadow-lg transition-shadow group">
              <h3 className="font-bold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">North vs South</h3>
              <p className="text-warm-600 text-sm">Compare the two regions side by side — pricing, lifestyle, and which suits you best.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Buying Guides | New Build Property in Spain | Costa Blanca 2026',
  description: 'Complete guides to buying new build property in Costa Blanca. NIE numbers, mortgages, taxes, costs and step-by-step buying process for international buyers.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

/* ─── SVG Icon Components (thin-line, elegant) ─── */

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  );
}

function IdCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
    </svg>
  );
}

function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
    </svg>
  );
}

function BankIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

const essentialGuides = [
  {
    title: 'The Buying Process',
    slug: 'buying-process',
    description: 'Step-by-step guide to purchasing new build property in Spain. From reservation to completion.',
    IconComponent: ClipboardIcon,
    readTime: '12 min read',
    category: 'Essential',
  },
  {
    title: 'NIE Number Guide',
    slug: 'nie-number',
    description: 'How to obtain your NIE — essential for buying property in Spain.',
    IconComponent: IdCardIcon,
    readTime: '8 min read',
    category: 'Essential',
  },
  {
    title: 'Costs & Taxes',
    slug: 'costs-taxes',
    description: 'Complete breakdown of purchase costs, taxes, and ongoing expenses.',
    IconComponent: CalculatorIcon,
    readTime: '10 min read',
    category: 'Essential',
  },
  {
    title: 'Mortgages for Foreigners',
    slug: 'mortgages',
    description: 'How to get a Spanish mortgage as a non-resident. Banks, rates, and requirements.',
    IconComponent: BankIcon,
    readTime: '10 min read',
    category: 'Essential',
  },
];

const decisionGuides = [
  {
    title: 'Why Buy New Build?',
    slug: 'why-new-build',
    description: 'The advantages of new build over resale — guarantees, energy efficiency, modern design.',
    IconComponent: BuildingIcon,
    readTime: '6 min read',
    category: 'Decision',
  },
  {
    title: 'Key-Ready vs Off-Plan',
    slug: 'key-ready-vs-off-plan',
    description: 'Should you buy completed or off-plan? Pros and cons for international buyers.',
    IconComponent: KeyIcon,
    readTime: '8 min read',
    category: 'Decision',
  },
  {
    title: 'North vs South Costa Blanca',
    slug: 'north-vs-south',
    description: 'Compare the two regions — prestigious north vs affordable south.',
    IconComponent: MapIcon,
    readTime: '10 min read',
    category: 'Decision',
  },
  {
    title: 'Tourist Rental License',
    slug: 'tourist-rental-license',
    description: 'Holiday rental licenses in Valencia — requirements, process, and income potential.',
    IconComponent: DocumentIcon,
    readTime: '8 min read',
    category: 'Investment',
  },
];

const destinationGuides = [
  {
    title: 'Living in Torrevieja',
    description: '7 neighborhoods with helicopter drone photography. The definitive guide.',
    href: '/guides/torrevieja',
    image: '/images/Drone 2/Areas & Zones/Torrevieja/La Mata/La Mata .jpg',
    alt: 'Aerial drone view of Torrevieja La Mata beach and coastline',
    badges: ['104+ photos', '7 zones'],
    tag: 'Super Guide',
  },
  {
    title: 'Living in Jávea',
    description: '4 neighborhoods from Arenal beach to Montgó mountain.',
    href: '/guides/javea',
    image: '/images/Area canvas/Javea.png',
    alt: 'Aerial view of Jávea coastline with Montgó mountain',
    badges: ['4 neighborhoods', '7 beaches'],
    tag: 'Super Guide',
  },
  {
    title: 'Costa Blanca North',
    description: '6 towns compared with aerial photography.',
    href: '/guides/costa-blanca-north',
    image: '/images/Area canvas/Calpe.png',
    alt: 'Aerial view of Calpe and Peñón de Ifach rock formation',
    badges: ['6 towns', 'Region guide'],
    tag: 'Region Guide',
  },
  {
    title: 'Orihuela Costa',
    description: 'Golf paradise — La Zenia, Villamartin, Cabo Roig & more.',
    href: '/guides/orihuela-costa',
    image: '/images/Drone 2/Areas & Zones/Orihuela Costa/La Fuente Center .jpg',
    alt: 'Aerial drone view of Orihuela Costa developments and coastline',
    badges: ['6 areas', 'Golf focus'],
    tag: 'Area Guide',
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Spain\'s most dynamic coastal city and its mountain neighbor.',
    href: '/guides/benidorm-finestrat',
    image: '/images/Area canvas/Benidorm.png',
    alt: 'Aerial view of Benidorm skyline and beaches',
    badges: ['2 zones', 'City guide'],
    tag: 'City Guide',
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-warm-50">
      {/* Hero — refined, editorial */}
      <section className="relative bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-medium tracking-[0.2em] uppercase">Expert Guides</span>
            <div className="w-12 h-px bg-accent-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            Your Guide to Buying <br className="hidden md:block" />
            <span className="font-semibold">Property in Spain</span>
          </h1>
          <p className="text-lg text-warm-300 max-w-2xl mx-auto leading-relaxed">
            From NIE numbers to mortgages — everything international buyers need to know,
            written by experts based on the Costa Blanca.
          </p>
        </div>
      </section>

      {/* ─── Destination Guides — with drone photos ─── */}
      <section className="py-section-sm px-6 bg-primary-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-[0.2em] uppercase">Explore Areas</span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white">
              Destination <span className="font-semibold">Guides</span>
            </h2>
            <p className="text-warm-400 mt-2 max-w-lg mx-auto text-sm">
              In-depth neighborhood guides with aerial photography and local insights.
            </p>
          </div>

          {/* Top row: 2 featured guides side by side */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {destinationGuides.slice(0, 2).map((dest) => (
              <Link key={dest.href} href={dest.href} className="group">
                <div className="relative bg-white/5 rounded-sm overflow-hidden border border-white/10 hover:border-accent-500/50 transition-all h-full">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wide">
                        {dest.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-400 text-sm mb-3 leading-relaxed">{dest.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row: 3 guides */}
          <div className="grid md:grid-cols-3 gap-5">
            {destinationGuides.slice(2).map((dest) => (
              <Link key={dest.href} href={dest.href} className="group">
                <div className="relative bg-white/5 rounded-sm overflow-hidden border border-white/10 hover:border-accent-500/50 transition-all h-full">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-500/90 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                        {dest.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-400 text-sm mb-3">{dest.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-white/10 text-warm-300 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/areas" className="text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors">
              View All Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Essential Buyer Guides — refined cards with SVG icons ─── */}
      <section className="py-section-sm px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-500 text-xs font-medium tracking-[0.2em] uppercase">Must-Read</span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Essential <span className="font-semibold">Buyer Guides</span>
            </h2>
            <p className="text-warm-600 max-w-lg mx-auto mt-2 text-sm">
              The four guides every property buyer must read before purchasing in Spain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                <div className="bg-white border border-warm-200 rounded-sm p-6 hover:border-accent-500 hover:shadow-lift transition-all h-full">
                  <div className="w-10 h-10 bg-accent-50 rounded-sm flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors">
                    <guide.IconComponent className="w-5 h-5 text-accent-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-accent-500 tracking-[0.15em] uppercase">{guide.category}</span>
                  <h3 className="text-base font-semibold text-primary-900 mt-1 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-accent-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Decision & Planning Guides ─── */}
      <section className="py-section-sm px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-10 h-px bg-primary-400" />
              <span className="text-primary-600 text-xs font-medium tracking-[0.2em] uppercase">Planning</span>
              <div className="w-10 h-px bg-primary-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Decision <span className="font-semibold">Guides</span>
            </h2>
            <p className="text-warm-600 max-w-lg mx-auto mt-2 text-sm">
              Make informed choices about location, property type, and investment strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                <div className="bg-white border border-warm-200 rounded-sm p-6 hover:border-primary-500 hover:shadow-lift transition-all h-full">
                  <div className="w-10 h-10 bg-primary-50 rounded-sm flex items-center justify-center mb-4 group-hover:bg-primary-700 transition-colors">
                    <guide.IconComponent className="w-5 h-5 text-primary-700 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-primary-600 tracking-[0.15em] uppercase">{guide.category}</span>
                  <h3 className="text-base font-semibold text-primary-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-primary-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Finance CTA ─── */}
      <section className="py-section-sm px-6 bg-primary-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-[0.2em] uppercase">Finance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                Compare <span className="font-semibold">Mortgage Rates</span>
              </h2>
              <p className="text-warm-300 mb-6 leading-relaxed">
                Compare rates from 15+ Spanish banks, see current market data, and explore finance options
                for both standard and luxury properties.
              </p>
              <Link
                href="/finance"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-sm font-medium transition-colors group"
              >
                Compare Mortgages
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '~3.15%', label: 'Avg Fixed Rate' },
                { value: '70%', label: 'Non-Resident LTV' },
                { value: '15+', label: 'Banks Compared' },
                { value: '€800k+', label: 'Luxury Options' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-sm p-5 text-center">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="text-warm-400 text-xs mt-1 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Trust Us ─── */}
      <section className="py-section-sm px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-light text-primary-900">
              Why Trust <span className="font-semibold">Our Guides?</span>
            </h2>
            <p className="text-warm-600 mt-2 text-sm">Expert knowledge combined with international understanding.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Local Expertise',
                text: 'Based in Costa Blanca with years of experience helping international buyers navigate the Spanish property market.',
              },
              {
                title: 'Up-to-Date',
                text: 'Regularly updated to reflect current Spanish property laws, tax regulations, and market conditions.',
              },
              {
                title: 'International Focus',
                text: 'Written for international buyers — covering NIE numbers, foreign mortgages, and non-resident taxes.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-sm p-8 border border-warm-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-500" />
                <h3 className="text-base font-semibold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-warm-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-section-sm px-6 bg-accent-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Have <span className="font-semibold">Questions?</span>
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Our team is here to guide you through the buying process. Get in touch for personalized advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-sm font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/60 text-sm mt-6">
            Quick response within 24 hours — often much faster.
          </p>
        </div>
      </section>
    </main>
  );
}

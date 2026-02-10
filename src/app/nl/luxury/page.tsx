import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { formatPrice } from '@/lib/unified-property';
import { breadcrumbSchema, toJsonLd, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Luxe Villa\'s Costa Blanca | Premium Woningen vanaf €800k',
  description: 'Ontdek luxe villa\'s en exclusieve woningen op Costa Blanca vanaf 800.000 euro. Zeeuitzicht, privé zwembaden en premium locaties in Jávea, Moraira en exclusieve enclaves. Nederlands service.',
  openGraph: {
    title: 'Luxe Villa\'s Costa Blanca | Premium Woningen €800k+',
    description: 'Ontdek luxe villa\'s en exclusieve woningen op Costa Blanca. Zeeuitzicht, privé zwembaden, premium locaties.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl/luxury',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
    },
  },
};

// Contact info
const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Luxury areas for internal linking
const luxuryAreas = [
  {
    name: 'Jávea',
    slug: 'javea',
    description: 'Historische haven met zandstranden, jachthaven en berg op de achtergrond. Premium villagebieden omvatten Cap Martí en Monte Olimpo.',
    priceRange: '€800k - €5M+',
    highlights: ['Arenal Beach', 'Michelin-restaurants', '300+ dagen zon per jaar'],
  },
  {
    name: 'Moraira',
    slug: 'moraira',
    description: 'Exclusieve enclave met ongerepte baaitjes, jachtclub en internationale gemeenschap. Rustig gevoel met uitzonderlijke privacy.',
    priceRange: '€1M - €8M+',
    highlights: ['Privé baaien', 'Jachtclub', 'Lage bouwdichtheid'],
  },
  {
    name: 'Altea',
    slug: 'altea',
    description: 'Kunstenaarsdorp met witgekalkte oude stad, culturele scene en fantastische zonsondergangsuitzichten. Heuvels erboven met spectaculair zeeuitzicht.',
    priceRange: '€700k - €3M+',
    highlights: ['Culturele hub', 'Oude stad charme', 'Kunstgalerijen'],
  },
  {
    name: 'Cumbre del Sol',
    slug: 'cumbre-del-sol',
    description: 'Bergbouw tussen Jávea en Moraira met dramatische zeeuitzichten en moderne infrastructuur. Gated community.',
    priceRange: '€600k - €2M+',
    highlights: ['Bergzicht', 'Gated community', 'Moderne infrastructuur'],
  },
];

// Dutch FAQs for SEO
const luxuryFaqs = [
  {
    question: 'Welke gebieden hebben de beste luxe villa\'s op Costa Blanca?',
    answer: 'De meest prestigieuze luxe villagebieden zijn Jávea (vooral Cap Martí en Monte Olimpo), Moraira, Altea Hills, Cumbre del Sol en Benissa coast. Deze gebieden bieden de beste combinatie van zeeuitzicht, privacy en kwaliteitsinfrastructuur.',
  },
  {
    question: 'Hoeveel kost een luxe villa op Costa Blanca vergeleken met Nederland?',
    answer: 'Een luxe villa van €1,5-2 miljoen op Costa Blanca met zeeuitzicht en zwembad zou €4-6 miljoen kosten in of rond Amsterdam. Costa Blanca biedt vaak 50% beter waarde voor dezelfde specificaties en meestal beter weer het hele jaar door.',
  },
  {
    question: 'Zijn nieuw gebouwde luxe villa\'s een goede investering?',
    answer: 'Ja, Costa Blanca\'s luxe onroerend goed heeft consistent waardegroei laten zien, vooral in het €1M+ segment. Nieuwbouw biedt moderne energie-efficiëntie, lager onderhoud en garanties van de bouwer. De huurmarkt voor luxe villa\'s is sterk, vooral in het hoogseizoen.',
  },
  {
    question: 'Welke belastingen gelden bij aankoop van luxe onroerend goed in Spanje?',
    answer: 'Voor nieuwbouw geldt 21% BTW (IVA) en 1,5% stempelbelasting. Bedrijfskosten omvatten IBI (onroerendgoedbelasting), meestal 0,4-1,1% van getaxeerde waarde jaarlijks, en als je niet verhuurt betaal je niet-inwonerbelasting op huuropbrengsten.',
  },
  {
    question: 'Kan ik als Nederlandse koper een hypotheek krijgen?',
    answer: 'Ja, Spaanse banken bieden hypotheken aan niet-inwoners, meestal tot 60-70% lening-waarderatio voor luxe onroerend goed. We werken met hypotheekspecialisten die competitieve financiering kunnen regelen voor internationale kopers.',
  },
  {
    question: 'Hoe lang duurt het proces om vastgoed in Spanje te kopen?',
    answer: 'Het koopproces duurt meestal 6-8 weken vanaf ondertekening van reserveringscontract tot voltooiing. Voor bouw van luxe villa\'s variëren bouwperioden van 12-24 maanden afhankelijk van het project.',
  },
];

export default async function LuxuryPageNL() {
  const allProperties = await fetchXMLFeed();

  // Filter luxury properties (€800k+)
  const luxuryProperties = allProperties
    .filter(p => p.price && p.price >= 800000 && p.images?.[0])
    .sort((a, b) => (b.price || 0) - (a.price || 0));

  // Separate into tiers
  const bespokeProperties = luxuryProperties.filter(p => p.price && p.price >= 2000000);
  const premiumProperties = luxuryProperties.filter(p => p.price && p.price >= 800000 && p.price < 2000000);

  // Schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl/' },
    { name: 'Luxe', url: 'https://newbuildhomescostablanca.com/nl/luxury/' },
  ]);

  const faqSchemaData = faqSchema(luxuryFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        {/* STICKY CTA BAR - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
          <div className="flex">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a
              href="#consultation"
              className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium"
            >
              Boek Consult
            </a>
          </div>
        </div>

        {/* HERO SECTION - Editorial Style */}
        <section className="relative bg-primary-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <nav className="text-warm-400 text-sm mb-8">
              <Link href="/nl/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Luxe Collectie</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    Premium Woningen
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                  Luxe <span className="font-semibold">collectie</span>
                </h1>

                <p className="text-warm-200 text-lg leading-relaxed mb-4 max-w-2xl">
                  Uitzonderlijke woningen vanaf €800.000. Op maat gemaakte villa\'s, zeeuitzicht en premium locaties op Costa Blanca.
                  Elk eigendom zorgvuldig geselecteerd voor geestesverwanten kopers.
                </p>

                <p className="text-accent-300 text-base leading-relaxed mb-8 max-w-2xl font-medium">
                  Exclusieve woningen vanaf 800.000 euro — gelijk aan een tweekamer in Amsterdam centrum
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-semibold text-white">{luxuryProperties.length}</div>
                    <div className="text-warm-400 text-sm">Luxe Woningen</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">€800k</div>
                    <div className="text-warm-400 text-sm">Vanaf</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">{bespokeProperties.length}</div>
                    <div className="text-warm-400 text-sm">Op Maat €2M+</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/nl/luxury#collection"
                    className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
                  >
                    Verken Collectie
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Hero Lead Capture Form */}
              <div className="lg:col-span-2 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-1">Persoonlijk Advies</h3>
                  <p className="text-warm-300 text-sm mb-4">Ontvang op maat gemaakte luxe woningaanbevelingen</p>
                  <form
                    name="luxury-consultation-nl"
                    method="POST"
                    data-netlify="true"
                    className="space-y-3"
                  >
                    <input type="hidden" name="form-name" value="luxury-consultation-nl" />
                    <input type="hidden" name="source" value="luxury-hero-nl" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Je naam"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="E-mailadres"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    <select
                      name="budget"
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      <option value="800k-1.5m" className="text-primary-900">€800k - €1.5M</option>
                      <option value="1.5m-2.5m" className="text-primary-900">€1.5M - €2.5M</option>
                      <option value="2.5m-5m" className="text-primary-900">€2.5M - €5M</option>
                      <option value="5m+" className="text-primary-900">€5M+</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded transition-colors"
                    >
                      Boek Advies
                    </button>
                  </form>
                  <p className="text-warm-400 text-xs mt-3 text-center">
                    We reageren binnen 2 uur • Volledig discreet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LUXURY AREAS - Internal Linking Section */}
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">
                  Premium Locaties
                </span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">
                Costa Blanca\'s Luxe Gebieden
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                De meest gewenste locaties voor geestesverwante kopers die uitzonderlijke woningen zoeken met zeeuitzicht en Middellandse Zee-leven.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/nl/areas/${area.slug}`}
                  className="group bg-white rounded-lg p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4 line-clamp-3">
                    {area.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-accent-600 font-medium">{area.priceRange}</span>
                  </div>
                  <div className="space-y-1">
                    {area.highlights.map((highlight, i) => (
                      <div key={i} className="text-warm-500 text-xs flex items-center gap-2">
                        <svg className="w-3 h-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-warm-100 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                    Bekijk {area.name} Gids
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM TIER (€800k - €2M) */}
        <section className="py-14 md:py-18 bg-warm-50" id="collection">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Premium Collectie
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                  Luxe Villa\'s €800k – €2M
                </h2>
                <p className="text-warm-600 mt-1 text-sm">
                  {premiumProperties.length} premium woningen over Costa Blanca
                </p>
              </div>
              <Link
                href="/nl/properties?minPrice=800000&maxPrice=2000000"
                className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm"
              >
                Bekijk Alles
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {premiumProperties.slice(0, 12).map((property) => (
                <Link
                  key={property.ref}
                  href={`/nl/properties/${property.ref}`}
                  className="group"
                >
                  <div className="relative h-56 overflow-hidden rounded-sm mb-3">
                    <Image
                      src={property.images?.[0] || '/images/placeholder.jpg'}
                      alt={`${property.bedrooms} kamers ${property.propertyType} in ${property.town}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-1 text-sm">
                    {(property as any).aiContent?.title || `${property.bedrooms}-Kamer ${property.propertyType}`}
                  </h3>
                  <p className="text-sm text-warm-500 mb-1">{property.town}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-primary-900">
                      {formatPrice(property.price || 0)}
                    </span>
                    <span className="text-xs text-warm-400">
                      {property.bedrooms} kamers · {property.size}m²
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Personal Guidance */}
        <section className="py-16 bg-primary-900" id="consultation">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Klaar voor Persoonlijk Advies?
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Onze luxe woningspecialisten kunnen privébezoeken regelen, toegang geven tot verborgen lijsten en persoonlijke begeleiding door je aankoop.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-colors border border-white/20"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

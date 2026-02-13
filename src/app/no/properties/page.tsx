// ISR: Regenerate every hour
export const revalidate = 3600;

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { getRegionForTown, REGIONS, normalizeTownName } from '@/lib/feed-config';
import PropertyFilters from '@/components/PropertyFilters';
import SortDropdown from '@/components/SortDropdown';
import PropertySearch from '@/components/PropertySearch';
import { collectionPageSchema, breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kjøpe Nybygg Costa Blanca | Villaer & Leiligheter Til Salgs',
  description: 'Bla gjennom 1000+ nybyggede villaer og leiligheter til salgs på Costa Blanca. Fra solrike sydstranden til den prestisjøse nordkysten. Finn ditt spanske drømmehjem.',
  openGraph: {
    title: 'Kjøpe Nybygg Costa Blanca | Villaer & Leiligheter Til Salgs',
    description: 'Bla gjennom 1000+ nybyggede villaer og leiligheter til salgs på Costa Blanca. Fra solrike sydstranden til den prestisjøse nordkysten.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/properties',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kjøpe Nybygg Costa Blanca | Villaer & Leiligheter Til Salgs',
    description: 'Bla gjennom 1000+ nybyggede villaer og leiligheter til salgs på Costa Blanca.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/properties',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/properties',
      'sv': 'https://newbuildhomescostablanca.com/sv/properties',
      'nl': 'https://newbuildhomescostablanca.com/nl/properties',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/properties',
      'fr': 'https://newbuildhomescostablanca.com/fr/properties',
      'no': 'https://newbuildhomescostablanca.com/no/properties',
      'de': 'https://newbuildhomescostablanca.com/de/properties',
      'pl': 'https://newbuildhomescostablanca.com/pl/properties',
      'ru': 'https://newbuildhomescostablanca.com/ru/properties',
      'x-default': 'https://newbuildhomescostablanca.com/properties',
    },
  },
  keywords: ['kjøpe bolig spania', 'nybygg costa blanca', 'villa pris', 'nybyggede hus spania', 'boliger costa blanca'],
};

const NORWEGIAN_FAQS = [
  {
    question: 'Hvorfor kjøpe nybygg i Spania?',
    answer: 'Nybyggede eiendommer i Spania tilbyr moderne energieffektive design, 10-årig strukturgaranti, tilpasningsmuligheter under konstruksjon og lavere vedlikeholdskostnader. De inkluderer ofte felles fasiliteter som basseng og hager, kommer med komplette juridiske garantier gjennom bankstøttede innskudd, og stiger ofte raskere i verdi enn brukte eiendommer i de første årene.',
  },
  {
    question: 'Hvor mye koster det å kjøpe nybygg på Costa Blanca?',
    answer: 'Nybyggprisene på Costa Blanca varierer fra ca. €150.000 for leiligheter i sørlige områder som Torrevieja til over €2 millioner for luksusvillaer i Jávea eller Moraira. Planlegg for ytterligere 10-13% i tillegg til kjøpesummen for skatter, notarius gebyr, juridiske kostnader og registreringsgebyr. Ikke-bosatte kjøpere trenger vanligvis 30-40% depositum for boliglånfinansiering.',
  },
  {
    question: 'Hva er forskjellen mellom Costa Blanca Nord og Sør?',
    answer: 'Costa Blanca Sør (Torrevieja til Pilar de la Horadada) tilbyr mer prisverdige eiendommer, etablerte utenlandske samfunn og året rundt sol med mindre nedbør. Costa Blanca Nord (Jávea til Benidorm) er premiummarkedet med dramatisk bergkyst, høyere eiendomspriser, mer autentisk spansk kultur og grønnere landskap. Begge områder har 300+ soldager i året.',
  },
  {
    question: 'Hva betyr innflyttingsklar for nybygg?',
    answer: 'En innflyttingsklar eiendom er en nybygging som er helt ferdigstilt og klar for umiddelbar besettelse. Du kan se den ferdige eiendommen før kjøp, unngå byggeforseelser og flytte inn innen uker etter at kjøpet er gjennomført. Innflyttingsklare hjem kommer fortsatt med fullstendige nybygggarantier fra utbygger.',
  },
  {
    question: 'Kan ikke-EU-borgere kjøpe eiendom i Spania?',
    answer: 'Ja, det er ingen begrensninger for ikke-EU-borgere som kjøper eiendom i Spania. Du trenger et NIE-nummer (skatteidentifikasjonsnummer for utlendinger), som advokaten din kan ordne. Kjøp over €500.000 kan kvalifisere seg for Spanias Golden Visa-bosettingsprogram. Kjøpsprosessen tar vanligvis 4-8 uker fra reservasjon til avslutning.',
  },
  {
    question: 'Hvilke løpende kostnader bør jeg forvente som eiendomseier i Spania?',
    answer: 'Årlige kostnader inkluderer IBI eiendomsskatt (€300-€1.500 avhengig av verdi), fellesavgifter for delte fasiliteter (€50-€200/måned), husforsikring (€200-€500/år) og verktøytilkoblinger. Ikke-bosatte eiere betaler også årlig inntektsskatt på fastsatt leieintekt. Totale årlige driftskostnader ligger typisk mellom €2.000-€5.000 avhengig av eiendomsstørrelse og sted.',
  },
  {
    question: 'Er Costa Blanca eiendom en god investering?',
    answer: 'Costa Blanca eiendommer har vist konsekvent verdistigning på 3-6% årlig de siste årene, med leieavkastning på 5-8% i populære turistområder. Sterk etterspørsel fra nordeuropeiske kjøpere, begrenset ny tomt for utvikling, utmerkede transportforbindelser via Alicante-Elche lufthavn og året rundt leiepotensial gjør det til en attraktiv investering.',
  },
  {
    question: 'Hvordan er det å være norsk eier av spansk eiendom?',
    answer: 'Du må rapportere utenlandsk eiendom til norske skattemyndigheter (skatteetaten). Du kan bli underlagt formuesskatt på eiendommen (ca. 0,7-0,8% av beregnet verdi årlig), men dette avhenger av din totale nettoformue. Norske banker tilbyr gjerne boliglån for spansk eiendom. Mange nordmenn i Alfaz del Pi har etablert et sterkt fellesskap med norske tjenester tilgjengelig.',
  },
  {
    question: 'Hvilke norske banker tilbyr boliglån for spansk eiendom?',
    answer: 'DNB, Nordea, SpareBank 1 og Handelsbanken tilbyr alle lån for utenlandsk eiendom. Typisk rentesats er 3-4% for boliglån sikret med spansk eiendom. Du kan også søke om lån direkte fra spanske banker som BBVA, CaixaBank eller Santander, som ofte tilbyr 60-70% finansiering til ikke-bosatte kjøpere.',
  },
];

const SOUTH_TOWNS = ['torrevieja', 'orihuela costa', 'guardamar', 'pilar de la horadada', 'la zenia', 'cabo roig', 'playa flamenca', 'punta prima', 'villamartin', 'los montesinos', 'san miguel'];
const NORTH_TOWNS = ['javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'benissa', 'benitachell', 'cumbre del sol', 'teulada'];
const GOLF_KEYWORDS = ['golf', 'la finca', 'villamartin', 'las colinas', 'campoamor', 'las ramblas', 'vistabella', 'algorfa'];
const INLAND_TOWNS = ['algorfa', 'rojales', 'ciudad quesada', 'benijofar', 'san fulgencio', 'jalon', 'orba', 'pedreguer'];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function hasPool(property: ParsedProperty): boolean {
  const desc = (property.description || '').toLowerCase();
  return desc.includes('pool') || desc.includes('piscina');
}

function isPropertyKeyReady(property: ParsedProperty): boolean {
  const desc = (property.description || '').toLowerCase();
  const status = (property.status || '').toLowerCase();
  return desc.includes('key ready') || desc.includes('keys ready') || desc.includes('key-ready') ||
         desc.includes('ready to move') || desc.includes('immediate delivery') || desc.includes('entrega inmediata') ||
         desc.includes('keys in hand') || status.includes('key ready') || status.includes('key-ready');
}

function getFeaturedProperties(properties: ParsedProperty[], count: number = 6): ParsedProperty[] {
  const keyReady = properties.filter(p => isPropertyKeyReady(p));
  const others = properties.filter(p => !isPropertyKeyReady(p));
  const firstRow = keyReady.slice(0, Math.min(3, Math.ceil(count / 2)));
  const remaining = count - firstRow.length;
  const secondRow = [...others, ...keyReady.slice(firstRow.length)].slice(0, remaining);
  return [...firstRow, ...secondRow];
}

export default async function NOPropertiesPage({
  searchParams,
}: {
  searchParams: { town?: string; beds?: string; type?: string; sort?: string; region?: string };
}) {
  const allProperties = await fetchXMLFeed();

  const towns = [...new Set(allProperties.map(p => {
    const normalized = normalizeTownName(p.town || '');
    return normalized.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }).filter(Boolean))].sort();
  const types = [...new Set(allProperties.map(p => p.propertyType).filter(Boolean))].sort();
  const bedOptions = [...new Set(allProperties.map(p => p.bedrooms).filter((b): b is number => b !== null && b > 0))].sort((a, b) => a - b);

  const hasFilters = searchParams.town || searchParams.beds || searchParams.type || searchParams.region;

  let properties = allProperties;
  if (searchParams.town) {
    const normalizedFilter = normalizeTownName(searchParams.town);
    properties = properties.filter(p => normalizeTownName(p.town || '') === normalizedFilter);
  }
  if (searchParams.beds) {
    properties = properties.filter(p => p.bedrooms === parseInt(searchParams.beds as string));
  }
  if (searchParams.type) {
    properties = properties.filter(p => p.propertyType === searchParams.type);
  }
  if (searchParams.region) {
    const regionLower = searchParams.region.toLowerCase();
    if (regionLower === 'south') {
      properties = properties.filter(p => SOUTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
    } else if (regionLower === 'north') {
      properties = properties.filter(p => NORTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
    } else if (regionLower === 'golf') {
      properties = properties.filter(p =>
        GOLF_KEYWORDS.some(k => p.town?.toLowerCase().includes(k) || p.description?.toLowerCase().includes(k))
      );
    } else if (regionLower === 'inland') {
      properties = properties.filter(p => INLAND_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
    }
  }

  const sortBy = searchParams.sort || 'price-asc';
  properties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-desc': return (b.price || 0) - (a.price || 0);
      case 'price-asc': return (a.price || 0) - (b.price || 0);
      case 'beds-desc': return (b.bedrooms || 0) - (a.bedrooms || 0);
      case 'size-desc': return (b.size || 0) - (a.size || 0);
      default: return (a.price || 0) - (b.price || 0);
    }
  });

  const southProperties = allProperties.filter(p => SOUTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const northProperties = allProperties.filter(p => NORTH_TOWNS.some(t => p.town?.toLowerCase().includes(t)));
  const golfProperties = allProperties.filter(p => GOLF_KEYWORDS.some(k => p.town?.toLowerCase().includes(k) || p.description?.toLowerCase().includes('golf')));
  const inlandProperties = allProperties.filter(p => INLAND_TOWNS.some(t => p.town?.toLowerCase().includes(t)));

  const getTopTowns = (props: ParsedProperty[], limit: number = 5) => {
    const townCounts = props.reduce((acc, p) => {
      const town = p.town || 'Other';
      acc[town] = (acc[town] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(townCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([town, count]) => ({ town, count, avgPrice: Math.round(props.filter(p => p.town === town).reduce((sum, p) => sum + (p.price || 0), 0) / count) }));
  };

  const topSouthTowns = getTopTowns(southProperties, 8);
  const topNorthTowns = getTopTowns(northProperties, 8);
  const topGolfTowns = getTopTowns(golfProperties, 6);
  const topInlandTowns = getTopTowns(inlandProperties, 6);

  const southFeatured = getFeaturedProperties(southProperties);
  const northFeatured = getFeaturedProperties(northProperties);
  const golfFeatured = getFeaturedProperties(golfProperties);
  const inlandFeatured = getFeaturedProperties(inlandProperties);

  const keyReadyCount = allProperties.filter(isPropertyKeyReady).length;

  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Boliger', url: 'https://newbuildhomescostablanca.com/no/properties/' },
  ]);

  const collectionSchema = collectionPageSchema({
    name: 'Nybyggede Boliger Costa Blanca',
    description: 'Bla gjennom 1000+ nybyggede villaer og leiligheter til salgs på Costa Blanca.',
    url: 'https://newbuildhomescostablanca.com/no/properties/',
    items: properties.slice(0, 20).map(p => ({
      name: `${p.bedrooms} Soverom ${p.propertyType} i ${p.town}`,
      url: `https://newbuildhomescostablanca.com/no/properties/${p.ref || p.id}/`,
      price: p.price || undefined,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(NORWEGIAN_FAQS)) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero with Search */}
        <section className="relative bg-primary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Alle Nybygg på <span className="font-semibold text-accent-400">Costa Blanca</span>
              </h1>
              <p className="text-warm-300 text-lg mb-10">
                {allProperties.length.toLocaleString()} nybyggede boliger på Costa Blancas mest ettertraktede steder
              </p>

              <PropertySearch towns={towns} types={types} bedOptions={bedOptions} />

              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{allProperties.length.toLocaleString()}</div>
                  <div className="text-warm-400 text-sm">Boliger</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{towns.length}</div>
                  <div className="text-warm-400 text-sm">Steder</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{types.length}</div>
                  <div className="text-warm-400 text-sm">Boligtyper</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Filter Bar */}
        <section className="bg-white border-b border-warm-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/no/properties?status=key-ready"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Innflyttingsklar ({keyReadyCount})
              </Link>
              <Link
                href="/no/properties?type=apartment"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Leiligheter
              </Link>
              <Link
                href="/no/properties?type=villa"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Villaer
              </Link>
              <Link
                href="/no/properties?maxprice=300000"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Under 300 000€
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-10 text-center">
              Vanlige Spørsmål <span className="font-semibold">Og Svar</span>
            </h2>
            <div className="space-y-6">
              {NORWEGIAN_FAQS.map((faq, index) => (
                <div key={index} className="bg-warm-50 rounded-xl p-6 border border-warm-100">
                  <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                  <p className="text-warm-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Trenger du hjælp å finne din <span className="font-semibold">drømmebolig?</span>
            </h2>
            <p className="text-warm-300 mb-8">Våre lokale eksperter kjenner til hvert område og kan finne din ideale bolig.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/no/contact" className="bg-white text-primary-900 px-8 py-3 rounded-md font-medium hover:bg-warm-100 transition-colors">
                Kontakt Oss
              </Link>
              <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-md font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

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
  title: 'Koop Nieuwbouw Costa Blanca | Villa\'s & Appartementen Te Koop',
  description: 'Blader door 1000+ nieuwbouwvilla\'s en appartementen te koop op Costa Blanca. Van het zonnige zuiden tot de prestigieuze noordkust. Belgische expertise, Nederlands service.',
  openGraph: {
    title: 'Koop Nieuwbouw Costa Blanca | Villa\'s & Appartementen Te Koop',
    description: 'Blader door 1000+ nieuwbouwvilla\'s en appartementen te koop op Costa Blanca. Van het zonnige zuiden tot de prestigieuze noordkust.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/nl-be/properties',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Koop Nieuwbouw Costa Blanca | Villa\'s & Appartementen Te Koop',
    description: 'Blader door 1000+ nieuwbouwvilla\'s en appartementen te koop op Costa Blanca.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/properties',
    languages: {
      en: 'https://newbuildhomescostablanca.com/properties',
      sv: 'https://newbuildhomescostablanca.com/sv/properties',
      nl: 'https://newbuildhomescostablanca.com/nl/properties',
      'nl-be': 'https://newbuildhomescostablanca.com/nl-be/properties',
    },
  },
  keywords: ['koop huis costa blanca', 'nieuwbouw spanje', 'villa costa blanca prijs', 'nieuwbouw huizen spanje', 'woningen costa blanca', 'belgische koper'],
};

const TOWN_DATA: Record<string, { tagline: string; highlights: string[]; image: string }> = {
  'Javea': {
    tagline: 'Waar bergen de Middellandse Zee ontmoeten',
    highlights: ['Arenal zandstrand', 'Historische oude stad', 'Montgó nationaal park', '300+ zonnedagen'],
    image: '/images/areas/javea-hero.jpg',
  },
  'Moraira': {
    tagline: 'Exclusieve kustelegantie',
    highlights: ['Ongerepte baaien', 'Jachtclub marina', 'Michelin-ster restaurants', 'Lage bebouwing luxe'],
    image: '/images/areas/moraira-hero.jpg',
  },
  'Calpe': {
    tagline: 'Iconisch Penon, eindeloze mogelijkheden',
    highlights: ['Penon de Ifach oriëntatiepunt', 'Twee zandstranden', 'Levendige centrum', 'Goede waarde'],
    image: '/images/areas/calpe-hero.jpg',
  },
  'Torrevieja': {
    tagline: 'Zonnige zuidelijke levensstijl',
    highlights: ['Zoutwatermeren & natuur', 'Grote Vlaamse gemeenschap', 'Uitstekende zorg', 'Budgetvriendelijk'],
    image: '/images/areas/torrevieja-hero.jpg',
  },
  'Benidorm': {
    tagline: 'Costa Blancas hoofdstad',
    highlights: ['Levendig nachtleven', 'Bekroonde stranden', 'Pretparken', 'Goed openbaar vervoer'],
    image: '/images/areas/benidorm-hero.jpg',
  },
  'Altea': {
    tagline: 'Het hart van kunst aan de kust',
    highlights: ['Witgekalkte oude stad', 'Kunstgaleries', 'Zonsondergangvistanden', 'Culturele evenementen'],
    image: '/images/areas/altea-hero.jpg',
  },
  'Orihuela Costa': {
    tagline: 'Golf, stranden & gemeenschap',
    highlights: ['5 golfbanen', 'Blauwe vlaggen stranden', 'Gevestigde gemeenschap', 'Uitstekende faciliteiten'],
    image: '/images/areas/orihuela-costa-hero.jpg',
  },
};

const SOUTH_TOWNS = ['torrevieja', 'orihuela costa', 'guardamar', 'pilar de la horadada', 'la zenia', 'cabo roig', 'playa flamenca', 'punta prima', 'villamartin', 'los montesinos', 'san miguel'];
const NORTH_TOWNS = ['javea', 'moraira', 'calpe', 'altea', 'benidorm', 'denia', 'benissa', 'benitachell', 'cumbre del sol', 'teulada'];
const GOLF_KEYWORDS = ['golf', 'la finca', 'villamartin', 'las colinas', 'campoamor', 'las ramblas', 'vistabella', 'algorfa'];
const INLAND_TOWNS = ['algorfa', 'rojales', 'ciudad quesada', 'benijofar', 'san fulgencio', 'jalon', 'orba', 'pedreguer'];

const BELGIAN_FAQS = [
  {
    question: 'Waarom nieuwbouw kopen in Spanje?',
    answer: 'Nieuwbouwwoningen in Spanje bieden moderne energiezuinige ontwerpen, 10-jarige structuurgarantie, aanpassingsmogelijkheden tijdens de bouw en lagere onderhoudskosten. Ze includeren vaak gemeenschappelijke voorzieningen zoals zwembaden en tuinen, komen met volledige juridische garanties via bankgestuurde deposito\'s en stijgen vaak sneller in waarde dan bestaande woningen in de eerste jaren.'
  },
  {
    question: 'Hoeveel kost het kopen van nieuwbouw op Costa Blanca?',
    answer: 'Nieuwbouwprijzen op Costa Blanca variëren van ongeveer €150.000 voor appartementen in zuidelijke gebieden zoals Torrevieja tot meer dan €2 miljoen voor luxe villa\'s in Jávea of Moraira. Budget voor extra 10-13% bovenop koopprijs voor belastingen, notariskosten, juridische kosten en registratiekosten. Belgische kopers hebben doorgaans 30-40% aanbetaling nodig voor hypotheekfinanciering.'
  },
  {
    question: 'Wat is het verschil tussen Costa Blanca Noord en Zuid?',
    answer: 'Costa Blanca Zuid (Torrevieja tot Pilar de la Horadada) biedt meer betaalbare woningen, gevestigde buitenlandse gemeenschappen en het hele jaar zon met minder regen. Costa Blanca Noord (Jávea tot Benidorm) is de premiummarkt met dramatische bergkust, hogere vastgoedprijzen, meer authentieke Spaanse cultuur en groener landschap. Beide gebieden hebben 300+ zonnedagen per jaar.'
  },
  {
    question: 'Wat betekent direct inzetbaar voor nieuwbouw?',
    answer: 'Een direct inzetbare woning is een nieuwbouw die volledig gereedgesteld is en onmiddellijk bewoonbaar is. U kunt de voltooide woning voor aankoop zien, bouwvertragingen voorkomen en binnen weken na voltooiing van de aankoop verhuizen. Direct inzetbare huizen hebben nog steeds volledige nieuwbouwgaranties van de ontwikkelaar.'
  },
  {
    question: 'Kunnen niet-EU-burgers vastgoed in Spanje kopen?',
    answer: 'Ja, er zijn geen beperkingen voor niet-EU-burgers om vastgoed in Spanje te kopen. U hebt een NIE-nummer nodig (belastingidentificatienummer voor buitenlanders), dat uw advocaat kan regelen. Aankopen boven €500.000 kunnen gekwalificeerd zijn voor Spaans Golden Visa residentieel programma. Het aankoopproces duurt doorgaans 4-8 weken van reservering tot afsluiting.'
  },
  {
    question: 'Welke lopende kosten moet ik verwachten als huiseigenaar in Spanje?',
    answer: 'Jaarlijkse kosten omvatten IBI onroerendgoedbelasting (€300-€1.500 afhankelijk van waarde), gemeenschapslasten voor gedeelde voorzieningen (€50-€200/maand), huisverzekerering (€200-€500/jaar) en nutsvoorzieningen. De belastingen in Spanje zijn veel lager dan in België waar u onroerende voorheffing zou betalen. Totale jaarlijkse operationele kosten liggen doorgaans tussen €2.000-€5.000 afhankelijk van woninggrootte en locatie.'
  },
  {
    question: 'Is Costa Blanca vastgoed een goede investering?',
    answer: 'Costa Blanca vastgoed heeft in recente jaren consistente waardegroei van 3-6% per jaar laten zien, met huurrendement van 5-8% in populaire toeristengebieden. Sterke vraag van Noord-Europese kopers, beperkte nieuwe grond voor ontwikkeling, uitstekende transportverbindingen via Alicante-Elche luchthaven en het hele jaar mogelijkheden om te verhuren maken dit een aantrekkelijke investering.'
  },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-BE', {
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

export default async function BEPropertiesPage({
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
    { name: 'Startpagina', url: 'https://newbuildhomescostablanca.com/nl-be/' },
    { name: 'Woningen', url: 'https://newbuildhomescostablanca.com/nl-be/properties/' },
  ]);

  const collectionSchema = collectionPageSchema({
    name: 'Nieuwbouw Costa Blanca',
    description: 'Blader door 1000+ nieuwbouwvilla\'s en appartementen te koop op Costa Blanca.',
    url: 'https://newbuildhomescostablanca.com/nl-be/properties/',
    items: properties.slice(0, 20).map(p => ({
      name: `${p.bedrooms} Kamer ${p.propertyType} in ${p.town}`,
      url: `https://newbuildhomescostablanca.com/nl-be/properties/${p.ref || p.id}/`,
      price: p.price || undefined,
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema(BELGIAN_FAQS)) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero with Search */}
        <section className="relative bg-primary-900 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Alle Nieuwbouw op <span className="font-semibold text-accent-400">Costa Blanca</span>
              </h1>
              <p className="text-warm-300 text-lg mb-10">
                {allProperties.length.toLocaleString()} nieuwbouwwoningen op Costa Blancas meest gewilde locaties
              </p>

              {/* Search Bar */}
              <PropertySearch towns={towns} types={types} bedOptions={bedOptions} />

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{allProperties.length.toLocaleString()}</div>
                  <div className="text-warm-400 text-sm">Woningen</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{towns.length}</div>
                  <div className="text-warm-400 text-sm">Locaties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{types.length}</div>
                  <div className="text-warm-400 text-sm">Woningtypen</div>
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
                href="/nl-be/properties?status=key-ready"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Direct Inzetbaar ({keyReadyCount})
              </Link>
              <Link
                href="/nl-be/properties?type=apartment"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Appartementen
              </Link>
              <Link
                href="/nl-be/properties?type=villa"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Villa's
              </Link>
              <Link
                href="/nl-be/properties?maxprice=300000"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-100 text-primary-900 rounded-full text-sm font-medium hover:bg-warm-200 transition-colors"
              >
                Onder 300.000€
              </Link>
            </div>
          </div>
        </section>

        {/* Costa Blanca Zuid Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Zon & Stranden</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  Costa Blanca <span className="font-semibold">Zuid</span>
                </h2>
                <p className="text-warm-500 mt-2">Zon het hele jaar door, golfbanen en populair bij Vlaamse kopers</p>
              </div>
              <Link href="/nl-be/properties?region=south" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                Toon alle {southProperties.length} woningen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {southFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} basePath="/nl-be" />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topSouthTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/nl-be/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/nl-be/properties?region=south" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              Toon alle {southProperties.length} woningen →
            </Link>
          </div>
        </section>

        {/* Costa Blanca Noord Section */}
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Premium Kustlijn</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  Costa Blanca <span className="font-semibold">Noord</span>
                </h2>
                <p className="text-warm-500 mt-2">Dramatische bergkust, prestigieuze villa\'s en mediterrane elegantie</p>
              </div>
              <Link href="/nl-be/properties?region=north" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                Toon alle {northProperties.length} woningen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {northFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} basePath="/nl-be" />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topNorthTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/nl-be/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-warm-50 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/nl-be/properties?region=north" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              Toon alle {northProperties.length} woningen →
            </Link>
          </div>
        </section>

        {/* Golf Properties Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Golfwonen</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  <span className="font-semibold">Golf</span> Woningen
                </h2>
                <p className="text-warm-500 mt-2">Premiumwoningen op of nabij kampioenschapsgolfbanen</p>
              </div>
              <Link href="/nl-be/properties?region=golf" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                Toon alle {golfProperties.length} woningen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {golfFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} basePath="/nl-be" />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topGolfTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/nl-be/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-warm-100 hover:bg-warm-200 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/nl-be/properties?region=golf" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              Toon alle {golfProperties.length} woningen →
            </Link>
          </div>
        </section>

        {/* Belgian Buyer Info Box */}
        <section className="py-8 px-4 bg-warm-50">
          <div className="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Zo koopt u een woning in Spanje als Belgische koper</h3>
            <p className="text-warm-600 mb-4">
              Als Belgische koper kunt u een Spaanse hypotheek aanvragen via verschillende banken. Wij adviseren u om:
            </p>
            <ul className="space-y-2 text-warm-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Een NIE-nummer (belastingidentificatienummer voor buitenlanders) aan te vragen voordat u met de aankoop begint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Een ervaren advocaat in te schakelen die Nederlands of Engels spreekt</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>10-13% extra kosten in te plannen voor belastingen en juridische kosten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-600 font-semibold mt-0.5">•</span>
                <span>Zowel Spaanse hypotheken als opties van Belgische banken te verkennen</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Inland Living Section */}
        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-accent-500 font-medium text-sm uppercase tracking-wide">Beste Waarde</span>
                <h2 className="text-3xl md:text-4xl font-light text-primary-900 mt-2">
                  <span className="font-semibold">Binnenland</span>
                </h2>
                <p className="text-warm-500 mt-2">Charmante dorpen met authentiek Spaans karakter en uitstekende waarde</p>
              </div>
              <Link href="/nl-be/properties?region=inland" className="hidden md:flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium">
                Toon alle {inlandProperties.length} woningen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>

            {/* Property Grid - 3x2 */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {inlandFeatured.slice(0, 6).map(property => (
                <LargePropertyCard key={property.id} property={property} basePath="/nl-be" />
              ))}
            </div>

            {/* Area Pills */}
            <div className="flex flex-wrap gap-2.5">
              {topInlandTowns.map(item => (
                <Link
                  key={item.town}
                  href={`/nl-be/properties?town=${encodeURIComponent(item.town)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-warm-50 rounded-full text-sm font-medium text-primary-900 transition-colors"
                >
                  {item.town}
                  <span className="text-warm-500">({item.count})</span>
                </Link>
              ))}
            </div>

            <Link href="/nl-be/properties?region=inland" className="md:hidden flex items-center justify-center gap-2 text-accent-600 hover:text-accent-700 font-medium mt-6">
              Toon alle {inlandProperties.length} woningen →
            </Link>
          </div>
        </section>

        {/* All Locations Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-8 text-center">
              Alle <span className="font-semibold">Locaties</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {towns
                .map(town => ({
                  town,
                  count: allProperties.filter(p => p.town === town).length,
                }))
                .filter(({ count }) => count > 0)
                .slice(0, 24)
                .map(({ town, count }) => (
                  <Link
                    key={town}
                    href={`/nl-be/properties?town=${encodeURIComponent(town)}`}
                    className="bg-warm-50 rounded-lg p-4 hover:shadow-md transition-shadow group"
                  >
                    <h3 className="font-medium text-primary-900 group-hover:text-accent-600 transition-colors">{town}</h3>
                    <p className="text-warm-500 text-sm">{count} {count === 1 ? 'woning' : 'woningen'}</p>
                  </Link>
                ))}
            </div>

            {towns.length > 24 && (
              <div className="text-center mt-8">
                <span className="text-warm-500">+ {towns.length - 24} meer locaties</span>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-10 text-center">
              Veelgestelde Vragen <span className="font-semibold">En Antwoorden</span>
            </h2>
            <div className="space-y-6">
              {BELGIAN_FAQS.map((faq, index) => (
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
              Hebt u hulp nodig om uw <span className="font-semibold">droomhuis te vinden?</span>
            </h2>
            <p className="text-warm-300 mb-8">Onze lokale experts kennen elk gebied en kunnen u matchen met uw ideale woning.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/nl-be/contact" className="bg-white text-primary-900 px-8 py-3 rounded-md font-medium hover:bg-warm-100 transition-colors">
                Neem Contact Op
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

function LargePropertyCard({ property, basePath = '/nl-be' }: { property: ParsedProperty; basePath?: string }) {
  const mainImage = property.images[0] || '/images/placeholder-property.jpg';
  const imageCount = property.images.length;
  const hasPoolFeature = hasPool(property);
  const keyReady = isPropertyKeyReady(property);
  const displayTown = (property.town || '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

  return (
    <Link
      href={`${basePath}/properties/${property.ref}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-warm-100"
    >
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={mainImage}
          alt={`${property.bedrooms} kamer ${property.propertyType} in ${property.town}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top badges row */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Nieuwbouw
            </span>
            {keyReady && (
              <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                Direct Inzetbaar
              </span>
            )}
            {property.propertyType && (
              <span className="bg-white/95 backdrop-blur-sm text-primary-900 text-xs font-medium px-3 py-1.5 rounded-full">
                {property.propertyType}
              </span>
            )}
          </div>
          {imageCount > 1 && (
            <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {imageCount}
            </span>
          )}
        </div>

        {/* Bottom overlay with price and location */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {property.price && property.price > 0 ? formatPrice(property.price) : 'Prijs op aanvraag'}
              </div>
              <div className="flex items-center gap-1.5 text-white/90 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {displayTown}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2 line-clamp-1">
          {(property as any).aiContent?.title || `${property.bedrooms && property.bedrooms > 0 ? `${property.bedrooms}-Kamer ` : ''}${property.propertyType}`}
          {property.developmentName && <span className="font-normal text-warm-500"> · {property.developmentName}</span>}
        </h3>

        {/* Key specs grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {property.bedrooms && property.bedrooms > 0 && (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.bedrooms}</div>
              <div className="text-xs text-warm-500">Kamers</div>
            </div>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.bathrooms}</div>
              <div className="text-xs text-warm-500">Badkamers</div>
            </div>
          )}
          {property.size && property.size > 0 && (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.size}</div>
              <div className="text-xs text-warm-500">m²</div>
            </div>
          )}
          {property.plotSize && property.plotSize > 0 ? (
            <div className="text-center p-2 bg-warm-50 rounded-lg">
              <div className="text-lg font-semibold text-primary-900">{property.plotSize}</div>
              <div className="text-xs text-warm-500">Plot m²</div>
            </div>
          ) : hasPoolFeature ? (
            <div className="text-center p-2 bg-accent-50 rounded-lg">
              <div className="text-lg font-semibold text-accent-600">✓</div>
              <div className="text-xs text-accent-600">Zwembad</div>
            </div>
          ) : null}
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hasPoolFeature && property.plotSize && property.plotSize > 0 && (
            <span className="bg-accent-50 text-accent-700 text-xs font-medium px-2 py-1 rounded">
              Zwembad
            </span>
          )}
          {property.size && property.size >= 150 && (
            <span className="bg-primary-50 text-primary-700 text-xs font-medium px-2 py-1 rounded">
              Ruim
            </span>
          )}
          {property.plotSize && property.plotSize >= 500 && (
            <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
              Grote Plot
            </span>
          )}
          {property.bedrooms && property.bedrooms >= 4 && (
            <span className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-1 rounded">
              Gezinshuis
            </span>
          )}
        </div>

        {/* Footer with ref and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-warm-100">
          <span className="text-warm-400 text-xs">Ref: {property.ref}</span>
          <span className="text-accent-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Bekijk Woning
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

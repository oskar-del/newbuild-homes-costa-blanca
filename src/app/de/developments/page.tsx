import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllDevelopments,
  getDevelopmentStats,
  getAllBuilders,
  Development,
} from '@/lib/development-service';
import { breadcrumbSchema, collectionPageSchema, toJsonLd } from '@/lib/schema';
import { getCardImages } from '@/lib/image-categorization';
import { filterDevelopmentsByTags, TaggedDevelopment } from '@/lib/tag-service';

export const metadata: Metadata = {
  title: 'Neubauprojekte Costa Blanca | Finden Sie Ihr perfektes Projekt',
  description: 'Entdecken Sie Neubauprojekte in Costa Blanca und Costa Calida. Schlüsselfertige Häuser, Golfimmobilien, Strandimmobilien. Finden Sie Ihr Traumhaus in Spanien.',
  openGraph: {
    title: 'Neubauprojekte Costa Blanca',
    description: 'Entdecken Sie Neubauprojekte in Costa Blanca. Schlüsselfertige Häuser von vertrauenswürdigen Bauträgern.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/de/developments',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neubauprojekte Costa Blanca | Finden Sie Ihr perfektes Projekt',
    description: 'Entdecken Sie Neubauprojekte in Costa Blanca. Schlüsselfertige Häuser, Golfimmobilien, Strandimmobilien.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/developments',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/developments',
      'sv': 'https://newbuildhomescostablanca.com/sv/developments',
      'nl': 'https://newbuildhomescostablanca.com/nl/developments',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/developments',
      'fr': 'https://newbuildhomescostablanca.com/fr/developments',
      'no': 'https://newbuildhomescostablanca.com/no/developments',
      'de': 'https://newbuildhomescostablanca.com/de/developments',
      'pl': 'https://newbuildhomescostablanca.com/pl/developments',
      'ru': 'https://newbuildhomescostablanca.com/ru/developments',
      'x-default': 'https://newbuildhomescostablanca.com/developments',
    },
  },
};

// Helper to format price
function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

// Development Card Component
function DevelopmentCard({ dev, variant = 'default' }: { dev: Development; variant?: 'default' | 'featured' }) {
  const isFeatured = variant === 'featured';
  const cardImages = getCardImages(dev.images || [], dev.name, dev.town);
  const hasMultipleImages = cardImages.secondary.length >= 2;
  const hasRealImages = dev.images && dev.images.length > 0 && !dev.images[0]?.includes('placeholder');

  return (
    <Link
      href={`/de/developments/${dev.slug}`}
      className={`group block overflow-hidden rounded-sm transition-all duration-300 ${
        isFeatured
          ? 'bg-primary-800/50 hover:bg-primary-800'
          : 'bg-white border border-warm-200 hover:shadow-xl hover:border-accent-500'
      }`}
    >
      <div className="relative">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={cardImages.main.url}
            alt={cardImages.main.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-3 left-3">
            {dev.status === 'key-ready' && (
              <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Bezugsbereit
              </span>
            )}
            {dev.status === 'under-construction' && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Im Bau
              </span>
            )}
            {dev.status === 'off-plan' && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                Nach Plan
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-sm">
              {dev.totalUnits} Einheiten
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white">
              <h3 className="font-semibold text-sm leading-tight mb-0.5 group-hover:text-accent-300 transition-colors">
                {dev.name}
              </h3>
              <p className="text-warm-300 text-xs">{dev.town}</p>
            </div>
          </div>
        </div>

        {hasMultipleImages && (
          <div className="grid grid-cols-2 gap-0.5 mt-0.5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImages.secondary[0].url}
                alt={cardImages.secondary[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 25vw, 15vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cardImages.secondary[1]?.url || cardImages.secondary[0].url}
                alt={cardImages.secondary[1]?.alt || cardImages.secondary[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 25vw, 15vw"
              />
              {dev.images && dev.images.length > 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">+{dev.images.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={`px-3 py-3 ${isFeatured ? 'bg-primary-900' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className={`text-base font-semibold ${isFeatured ? 'text-white' : 'text-primary-900'}`}>
            Ab {formatPrice(dev.priceFrom)}
          </div>
          {dev.deliveryQuarter && (
            <div className={`text-[10px] font-medium px-2 py-1 rounded-sm ${
              dev.status === 'key-ready'
                ? 'bg-accent-100 text-accent-700'
                : isFeatured
                  ? 'bg-white/10 text-warm-300'
                  : 'bg-accent-100 text-accent-700'
            }`}>
              {dev.status === 'key-ready' ? 'Jetzt Einziehen' : dev.deliveryQuarter}
            </div>
          )}
        </div>

        <div className={`text-xs mb-2 ${isFeatured ? 'text-warm-300' : 'text-warm-600'}`}>
          {dev.bedroomBreakdown?.length > 0
            ? dev.bedroomBreakdown.slice(0, 3).join(', ') + (dev.bedroomBreakdown.length > 3 ? ' +mehr' : '')
            : `${dev.bedroomRange} Schlafzimmer`
          }
          {dev.sizeRange && ` · ${dev.sizeRange}`}
        </div>

        {dev.amenities && dev.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {dev.hasPool && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-blue-50 text-blue-600'
              }`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Pool
              </span>
            )}
            {dev.hasGym && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-purple-50 text-purple-600'
              }`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4v12H4zM16 6h4v12h-4zM8 10h8v4H8z" />
                </svg>
                Fitnessstudio
              </span>
            )}
            {dev.hasSpa && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-teal-50 text-teal-600'
              }`}>
                ✨ Spa
              </span>
            )}
            {dev.hasSeaview && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-cyan-50 text-cyan-600'
              }`}>
                🌊 Meerblick
              </span>
            )}
            {dev.hasGolfview && (
              <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                isFeatured ? 'bg-white/10 text-warm-300' : 'bg-green-50 text-green-600'
              }`}>
                ⛳ Golf
              </span>
            )}
          </div>
        )}

        <div className={`text-[11px] ${isFeatured ? 'text-warm-400' : 'text-warm-500'}`}>
          {dev.developer}
          {dev.zone && ` · ${dev.zone}`}
        </div>
      </div>
    </Link>
  );
}

function WhatsAppCTA() {
  return (
    <a
      href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat auf WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default async function DevelopmentsPage() {
  const [rawDevelopments, stats, beachProperties] = await Promise.all([
    getAllDevelopments(),
    getDevelopmentStats(),
    filterDevelopmentsByTags({ beachOnly: true, sortBy: 'beach-distance', limit: 12 }),
  ]);

  const hasRealImages = (dev: Development) => {
    return dev.images &&
           dev.images.length > 0 &&
           !dev.images[0]?.includes('placeholder');
  };

  const allDevelopments = rawDevelopments.filter(hasRealImages);

  const smartSort = (devs: Development[]) => {
    return [...devs].sort((a, b) => {
      const aReady = a.status === 'key-ready' || a.status === 'completed' ? 0 : 1;
      const bReady = b.status === 'key-ready' || b.status === 'completed' ? 0 : 1;
      if (aReady !== bReady) return aReady - bReady;
      return a.priceFrom - b.priceFrom;
    });
  };

  const orihuelaCOASTALZones = [
    'la zenia', 'playa flamenca', 'cabo roig', 'campoamor', 'villamartin',
    'las filipinas', 'pau 26', 'la regia', 'dehesa de campoamor', 'aguamarina',
    'punta prima', 'la florida', 'los dolses', 'las ramblas', 'dream hills'
  ];
  const orihuelaCostaDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('orihuela costa')) return true;
      if (orihuelaCOASTALZones.some(z => zone.includes(z))) return true;
      if (town === 'orihuela' && !zone.includes('costa')) return false;
      return false;
    })
  );

  const torreviejaZones = ['aguas nuevas', 'los balcones', 'el chaparral', 'la siesta', 'el limonar', 'acequion'];
  const torreviejaDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('torrevieja')) return true;
      if (torreviejaZones.some(z => zone.includes(z))) return true;
      return false;
    })
  );

  const pilarZones = ['mil palmeras', 'torre de la horadada', 'lo romero', 'el mojon'];
  const pilarDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('pilar')) return true;
      if (pilarZones.some(z => zone.includes(z) || town.includes(z))) return true;
      return false;
    })
  );

  const guardamarDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('guardamar')) return true;
      if (zone.includes('el raso')) return true;
      return false;
    })
  );

  const rojalesZones = ['doña pepa', 'ciudad quesada', 'quesada', 'benijofar', 'formentera'];
  const rojalesDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const town = (d.town || '').toLowerCase();
      if (town.includes('rojales') || town.includes('quesada') || town.includes('benijofar')) return true;
      if (rojalesZones.some(z => zone.includes(z))) return true;
      return false;
    })
  );

  const calidaDevelopments = allDevelopments.filter(d => d.region === 'Costa Calida');

  const finestratDevelopments = smartSort(
    allDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      return ['finestrat', 'benidorm', 'villajoyosa', 'la nucia', 'alfaz', 'el campello'].some(t => town.includes(t));
    })
  );

  const javeaDevelopments = smartSort(
    allDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      const zone = (d.zone || '').toLowerCase();
      return ['javea', 'xabia', 'benitachell', 'moraira'].some(t => town.includes(t)) ||
             zone.includes('cumbre del sol');
    })
  );

  const calpeDevelopments = smartSort(
    allDevelopments.filter(d => {
      const town = (d.town || '').toLowerCase();
      return ['calpe', 'altea', 'benissa', 'teulada'].some(t => town.includes(t));
    })
  );

  const golfDevelopments = smartSort(
    allDevelopments.filter(d => {
      const zone = (d.zone || '').toLowerCase();
      const name = (d.name || '').toLowerCase();
      return zone.includes('golf') ||
             zone.includes('vistabella') ||
             zone.includes('la finca') ||
             zone.includes('las colinas') ||
             zone.includes('lo romero golf') ||
             name.includes('golf');
    })
  );

  const keyReady = allDevelopments.filter(d => d.status === 'key-ready' || d.status === 'completed');
  const premiumLuxury = allDevelopments.filter(d => d.priceFrom >= 800000);

  const newLaunches = allDevelopments.filter(d => {
    if (!d.deliveryDate) return false;
    const parts = d.deliveryDate.split(/[-/]/);
    const year = parts[0].length === 4 ? parseInt(parts[0]) : parseInt(parts[2]);
    return year >= 2027 && d.status === 'off-plan';
  }).sort((a, b) => {
    if (!a.deliveryDate || !b.deliveryDate) return 0;
    return b.deliveryDate.localeCompare(a.deliveryDate);
  });

  const beachfrontDevelopments = allDevelopments.filter(d =>
    d.hasSeaview ||
    d.zone?.toLowerCase().includes('beach') ||
    d.zone?.toLowerCase().includes('playa') ||
    d.zone?.toLowerCase().includes('mar ')
  );

  const breadcrumbs = breadcrumbSchema([
    { name: 'Startseite', url: 'https://newbuildhomescostablanca.com/de/' },
    { name: 'Neubauprojekte Costa Blanca', url: 'https://newbuildhomescostablanca.com/de/developments/' },
  ]);

  const collectionSchema = collectionPageSchema({
    name: 'Neubauprojekte Costa Blanca',
    description: 'Entdecken Sie Neubauprojekte in Costa Blanca und Costa Calida. Schlüsselfertige Häuser, Golfimmobilien, Strandimmobilien.',
    url: 'https://newbuildhomescostablanca.com/de/developments/',
    items: allDevelopments.slice(0, 20).map(d => ({
      name: d.name,
      url: `https://newbuildhomescostablanca.com/developments/${d.slug}/`,
      price: d.priceFrom,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(collectionSchema) }}
      />

      <main className="min-h-screen bg-warm-50">
        <section className="relative bg-primary-900 py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <nav className="text-warm-400 text-sm mb-6">
                <Link href="/de" className="hover:text-white transition-colors">Startseite</Link>
                <span className="mx-2">›</span>
                <span className="text-white">Neubauprojekte</span>
              </nav>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Ihr Neues Zuhause erwartet Sie
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
                Finden Sie Ihr perfektes
                <span className="font-semibold block">Neubau-Projekt</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8 max-w-2xl">
                Von den sonnigen Stränden der Costa Blanca im Süden bis zu den charmanten Buchten im Norden entdecken Sie {stats.totalDevelopments}+ sorgfältig ausgewählte Projekte von vertrauenswürdigen lokalen Bauträgern.
              </p>

              <div className="flex flex-wrap gap-6 mb-10">
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{stats.totalDevelopments}+</div>
                  <div className="text-warm-400 text-sm">Neubauprojekte</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-accent-400">{keyReady.length}</div>
                  <div className="text-warm-400 text-sm">Bezugsbereit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-semibold text-white">{stats.builderCount}+</div>
                  <div className="text-warm-400 text-sm">Bauträger</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-sm p-2 border border-white/20">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Projekte nach Name, Stadt oder Bauträger durchsuchen..."
                    className="flex-1 bg-white/10 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-warm-400 focus:outline-none focus:border-accent-500"
                  />
                  <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors">
                    Suchen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {keyReady.length > 0 && (
          <section className="py-14 bg-gradient-to-b from-accent-50 to-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Jetzt Einziehen
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Bezugsbereit</span> Projekte
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Keine Wartezeiten, keine Verzögerungen. Diese Projekte sind fertig gestellt und bezugsbereit. Perfekt für Käufer, die sofort ihr mediterranes Leben beginnen möchten—einen Kaffee auf der Terrasse genießen oder ins Pool abtauchen.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/de/developments?status=key-ready"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                  >
                    Alle {keyReady.length} Bezugsbereit ansehen
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {keyReady.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {beachProperties.length > 0 && (
          <section className="py-14 bg-gradient-to-br from-cyan-900 to-primary-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-cyan-400" />
                    <span className="text-cyan-300 text-xs font-medium tracking-widest uppercase">
                      Strandleben
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Schritte vom <span className="font-semibold">Mittelmeer</span>
                  </h2>
                  <p className="text-cyan-100 leading-relaxed mb-4">
                    Wachen Sie in kristallklarem Wasser auf und laufen Sie in Minuten zum Strand.
                    Von La Zenia bis Torrevieja platzieren diese Projekte Sie direkt an Costa Blancas berühmten Blaue-Flaggen-Stränden.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'beachfront').length} Strandfront
                    </span>
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'walking').length} Zu Fuß
                    </span>
                    <span className="bg-cyan-800/50 px-3 py-1 rounded-full text-sm text-cyan-200 border border-cyan-700">
                      {beachProperties.filter(d => d.beachDistance === 'short-drive').length} Kurze Fahrt
                    </span>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-sm p-6 text-white border border-white/10">
                  <h3 className="font-semibold text-lg mb-4 text-cyan-200">Warum Strandleben?</h3>
                  <ul className="space-y-3 text-cyan-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>15+ Blaue-Flaggen-Strände</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>320+ Sonnentage im Jahr</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Kristallklares Mittelmeer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Starkes Vermietungspotential</span>
                    </li>
                  </ul>
                  <Link
                    href="/de/beach"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Alle Strandimmobilien entdecken
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {beachProperties.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {torreviejaDevelopments.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Am beliebtesten
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Torrevieja</span> und Umgebung
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Spaniens beliebtestes Reiseziel für internationale Käufer. Mit seinen berühmten Salzseen, lebendigem Stadtzentrum und hervorragenden Immobilien bietet Torrevieja den kompletten mediterranen Lebensstil. Nur 30 Minuten vom Flughafen Alicante entfernt.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/de/areas/torrevieja"
                    className="inline-flex items-center gap-2 text-accent-600 font-medium hover:text-accent-700 transition-colors group"
                  >
                    Torrevieja erkunden
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {torreviejaDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto bg-warm-50 border border-warm-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-primary-900 font-medium text-lg">Auf der Suche nach Ihrer Traumimmobilie?</p>
              <p className="text-warm-500 text-sm mt-1">Kontaktieren Sie uns für die neuesten Verfügbarkeiten, Grundrisse oder um einen Besichtigungstermin zu vereinbaren</p>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/34634044970" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-primary-900 text-white rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors">
                WhatsApp
              </a>
              <a href="/de/contact" className="px-5 py-2.5 border border-primary-900 text-primary-900 rounded-sm text-sm font-medium hover:bg-primary-900 hover:text-white transition-colors">
                Kontakt
              </a>
            </div>
          </div>
        </section>

        {orihuelaCostaDevelopments.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-primary-900" />
                    <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                      Golf- und Strandleben
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Orihuela Costa</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Heimat einiger der schönsten Golfplätze und Blaue-Flaggen-Strände der Costa Blanca.
                    Von der pulsierenden La Zenia Boulevard zur ruhigen Küste von Campoamor,
                    Orihuela Costa bietet Premium-Lebensstil zu erschwinglichen Preisen.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Villamartín Golf</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Las Colinas</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">La Zenia</span>
                    <span className="bg-white px-3 py-1 rounded-full text-sm text-warm-600 border border-warm-200">Cabo Roig</span>
                  </div>
                </div>
                <div className="bg-primary-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Warum Orihuela Costa?</h3>
                  <ul className="space-y-3 text-warm-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>5 Meisterschaftsgolfplätze</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Blaue-Flaggen-Strände & Yachthäfen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>La Zenia Boulevard Shopping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Starker Mietmarkt</span>
                    </li>
                  </ul>
                  <Link
                    href="/de/areas/orihuela-costa"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Die Region erkunden
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {orihuelaCostaDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {pilarDevelopments.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-primary-900" />
                    <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                      Südliche Küstenstädte
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Pilar de la Horadada</span> und Umgebung
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Das südlichste Ende der Costa Blanca, wo makellose Strände auf authentischen spanischen Charme treffen.
                    Pilar de la Horadada bietet ausgezeichnetes Preis-Leistungs-Verhältnis mit atemberaubender Küstenlinie, dem Lo Romero Golf Resort,
                    und leichtem Zugang zu den Flughäfen Alicante und Murcia.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Mil Palmeras</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Torre de la Horadada</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-600">Lo Romero Golf</span>
                  </div>
                </div>
                <div className="bg-teal-800 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Warum Pilar de la Horadada?</h3>
                  <ul className="space-y-3 text-teal-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>6 km makellose Sandstrände</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Authentisches spanisches Stadtflair</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Lo Romero Golf Resort</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Ausgezeichnetes Preis-Leistungs-Verhältnis für Strandleben</span>
                    </li>
                  </ul>
                  <Link
                    href="/de/areas/pilar-de-la-horadada"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Die Region erkunden
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {pilarDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {golfDevelopments.length > 0 && (
          <section className="py-14 bg-primary-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                      Golfleben
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Golf-<span className="font-semibold">Projekte</span>
                  </h2>
                  <p className="text-warm-300 leading-relaxed">
                    Wachen Sie auf mit spektakulärem Fairway-Ausblick und sind in Minuten auf dem ersten Abschlag.
                    Diese Projekte sind perfekt an oder in der Nähe von Meisterschaftsgolfplätzen positioniert,
                    und bieten den ultimativen Lebensstil für Golfer.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/de/golf-properties"
                    className="inline-flex items-center gap-2 text-accent-400 font-medium hover:text-accent-300 transition-colors group"
                  >
                    Golfleben erkunden
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {golfDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        {finestratDevelopments.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-primary-900" />
                    <span className="text-primary-900 text-xs font-medium tracking-widest uppercase">
                      Berge treffen das Meer
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    <span className="font-semibold">Finestrat</span> und Benidorm-Region
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Das Beste aus beiden Welten: die Ruhe von Bergdörfern mit Benidorms Stränden und Annehmlichkeiten nur Minuten entfernt. Finestrat ist ein Hotspot für moderne Luxusprojekte
                    mit spektakulären Panoramablicken geworden. Terra Mítica Freizeitpark und Puig Campana Wanderwege
                    bieten das ganze Jahr über Aktivitäten.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/de/areas/finestrat"
                    className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group"
                  >
                    Finestrat erkunden
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {finestratDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {(javeaDevelopments.length > 0 || calpeDevelopments.length > 0) && (
          <section className="py-14 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Exklusive Nordküste
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Jávea, Moraira und <span className="font-semibold">Calpe</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Die Kronjuwelen der Costa Blanca Nord. Diese prestigeträchtigen Bereiche bieten dramatische Landschaften,
                    charmante Yachthäfen und raffiniertes Leben. Berühmt für das ikonische Peñón de Ifach,
                    kristallklare Buchten und preisgekrönte Restaurants.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Jávea Altstadt</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Moraira Marina</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Calpe Strand</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Cumbre del Sol</span>
                  </div>
                </div>
                <div className="bg-primary-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Premium-Leben im Norden</h3>
                  <ul className="space-y-3 text-warm-300">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Spektakuläre Meer- und Bergblicke</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Michelin-Sterne-Restaurants</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Yachting und Wassersport</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Exklusive geschlossene Wohngemeinschaften</span>
                    </li>
                  </ul>
                  <Link
                    href="/de/costa-blanca-north"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Den Norden entdecken
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {[...javeaDevelopments, ...calpeDevelopments].slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {calidaDevelopments.length > 0 && (
          <section className="py-14 bg-white border-y border-warm-200">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-px bg-accent-500" />
                    <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                      Die warme Küste · Murcia-Region
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Costa <span className="font-semibold">Calida</span> & Mar Menor
                  </h2>
                  <p className="text-warm-600 leading-relaxed mb-4">
                    Südlich der Costa Blanca liegt die Costa Calida—Murcias atemberaubender Küstenstrich mit dem einzigartigen Mar Menor Lagunengewässer.
                    Europas größtes Salzwasserlagunengewässer bietet warme, ruhige Gewässer perfekt für Wassersport, während es einige der besten Immobilienwerte in Spanien beibehält.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Los Alcázares</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">San Javier</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">La Manga</span>
                    <span className="bg-warm-100 px-3 py-1 rounded-full text-sm text-warm-700">Mar Menor Golf</span>
                  </div>
                </div>
                <div className="bg-cyan-900 rounded-sm p-6 text-white">
                  <h3 className="font-semibold text-lg mb-4">Warum Costa Calida?</h3>
                  <ul className="space-y-3 text-cyan-100">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mar Menor - Europas größte Lagune</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Ausgezeichnetes Preis-Leistungs-Verhältnis vs Costa Blanca</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>In der Nähe des internationalen Flughafens Corvera</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Weltklasse-Wassersportzentrum</span>
                    </li>
                  </ul>
                  <Link
                    href="/de/areas/costa-calida"
                    className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-2 rounded-sm transition-colors"
                  >
                    Costa Cálida entdecken
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {calidaDevelopments.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {newLaunches.length > 0 && (
          <section className="py-14 bg-gradient-to-b from-blue-50 to-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Frühbucher-Preisgestaltung
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                    Neue <span className="font-semibold">Launches</span>
                  </h2>
                  <p className="text-warm-600 leading-relaxed">
                    Kommen Sie früh in diese kürzlich gestarteten Projekte. Off-Plan-Käufe bieten die besten Preise—
                    typischerweise 15-20% unter den abgeschlossenen Immobilienwerten. Sichern Sie Ihre Einheit jetzt mit einer 30% Anzahlung
                    und zahlen Sie den Rest bei Fertigstellung. Je früher Sie kaufen, desto besser Ihre Position und Preis.
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <Link
                    href="/de/developments?status=off-plan"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors group"
                  >
                    Alle Nach-Plan-Projekte anzeigen
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {newLaunches.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} />
                ))}
              </div>
            </div>
          </section>
        )}

        {premiumLuxury.length > 0 && (
          <section className="py-14 bg-primary-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                    €800,000+
                  </span>
                  <div className="w-10 h-px bg-accent-500" />
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Premium <span className="font-semibold">Luxus</span>
                </h2>
                <p className="text-warm-300 max-w-2xl mx-auto">
                  Exklusive Projekte für anspruchsvolle Käufer. Prime Locations, außergewöhnliche Spezifikationen,
                  und unvergleichliche Qualität an Spaniens renommiertesten Adressen.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {premiumLuxury.slice(0, 3).map((dev) => (
                  <DevelopmentCard key={dev.slug} dev={dev} variant="featured" />
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/de/luxury"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
                >
                  Luxus-Kollektion anzeigen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-accent-500">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Unsicher, wo zu beginnen?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Mit {stats.totalDevelopments}+ Projekten zur Auswahl kann das Finden des richtigen überwältigend wirken.
              Sagen Sie uns Ihre Anforderungen—Budget, Standort, Einzugsdatum—und wir werden Sie mit den perfekten Projekten abgleichen.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-accent-600 hover:bg-warm-50 font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <Link
                href="/de/contact"
                className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Kontaktformular
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}

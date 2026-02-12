import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { formatPrice } from '@/lib/unified-property';
import { breadcrumbSchema, toJsonLd, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Luksusowe Nieruchomości Costa Blanca | Prestiżowe Wille i Apartamenty',
  description: 'Odkryj luksusowe wille i nieruchomości na zamówienie Costa Blanca od €800 000. Widoki na morze, prywatne baseny i prestiżowe lokalizacje w Jávea, Moraira oraz ekskluzywnymi enklawach.',
  openGraph: {
    title: 'Luksusowe Nieruchomości Costa Blanca | Prestiżowe Wille i Apartamenty',
    description: 'Odkryj luksusowe wille i nieruchomości na zamówienie Costa Blanca. Widoki na morze, prywatne baseny, prestiżowe lokalizacje.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/pl/luxury',
    siteName: 'New Build Homes Costa Blanca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luksusowe Nieruchomości Costa Blanca | Prestiżowe Wille i Apartamenty',
    description: 'Odkryj luksusowe wille Costa Blanca od €800 000+. Ekskluzywne wille z widokami na morze.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'de': 'https://newbuildhomescostablanca.com/de/luxury',
      'pl': 'https://newbuildhomescostablanca.com/pl/luxury',
      'ru': 'https://newbuildhomescostablanca.com/ru/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const featuredMiralbo = [
  {
    slug: 'villa-atlantis',
    title: 'Villa Atlantis',
    town: 'Jávea',
    zone: 'Cap Martí',
    price: 1550000,
    bedrooms: 4,
    bathrooms: 5,
    builtArea: 235,
    plotArea: 1000,
    image: '/images/developments/atlantis.jpeg',
    developer: 'Miralbo Urbana',
  },
  {
    slug: 'villa-posidonia',
    title: 'Villa Posidonia',
    town: 'Jávea',
    zone: 'Monte Olimpo',
    price: 1425000,
    bedrooms: 4,
    bathrooms: 4,
    builtArea: 165,
    plotArea: 1000,
    image: '/images/developments/posidionia.jpg',
    developer: 'Miralbo Urbana',
  },
  {
    slug: 'villa-mir0159',
    title: 'Villa MIR0159',
    town: 'Jávea',
    zone: 'Montgó',
    price: 2565000,
    bedrooms: 4,
    bathrooms: 5,
    builtArea: 280,
    plotArea: 1200,
    image: '/images/developments/miro159.jpg',
    developer: 'Miralbo Urbana',
  },
];

const luxuryAreas = [
  {
    name: 'Jávea',
    slug: 'javea',
    description: 'Historyczny port z piaszczystymi plażami, mariną i górą Montgó w tle. Strefy prestiżowych willi obejmują Cap Martí i Monte Olimpo.',
    priceRange: '€800k - €5M+',
    highlights: ['Piaszczysty Arenal', 'Restauracje Michelin', '300+ dni słońca rocznie'],
  },
  {
    name: 'Moraira',
    slug: 'moraira',
    description: 'Ekskluzywna enklawa z nieskalanymi zatokami, klubem żeglarskim i międzynarodową społecznością. Bardziej spokojna niż Jávea z wyjątkową prywatnością.',
    priceRange: '€1M - €8M+',
    highlights: ['Prywatne zatoki', 'Klub żeglarski', 'Niska gęstość zabudowy'],
  },
  {
    name: 'Altea',
    slug: 'altea',
    description: 'Wioska artystów z białą starówką, sceną kulturalną i spektakularnymi widokami na zachód słońca. Wzgórza oferują wyjątkowe widoki na morze.',
    priceRange: '€700k - €3M+',
    highlights: ['Centrum kulturalne', 'Urok starego miasta', 'Galerie sztuki'],
  },
  {
    name: 'Cumbre del Sol',
    slug: 'cumbre-del-sol',
    description: 'Zabudowa na klifach między Jávea a Moraira z dramatycznymi widokami na morze i nowoczesną infrastrukturą. Atmosfera prywatnej grodzkej wspólnoty.',
    priceRange: '€600k - €2M+',
    highlights: ['Widoki na klify', 'Komunalna osada zamknięta', 'Nowoczesna infrastruktura'],
  },
];

const luxuryFaqs = [
  {
    question: 'Które strefy mają najlepsze luksusowe wille na Costa Blanca?',
    answer: 'Najbardziej prestiżowe strefy willi luksusowych to Jávea (szczególnie Cap Martí i Monte Olimpo), Moraira, Altea Hills, Cumbre del Sol i wybrzeże Benissa. Te strefy oferują najlepszą kombinację widoków na morze, prywatności i infrastruktury wysokiej jakości.',
  },
  {
    question: 'Jaka jest typowa cena luksusowej willi na Costa Blanca?',
    answer: 'Luksusowe wille Costa Blanca zwykle zaczynają się od €800 000 i mogą przekraczać €5 milionów za wyjątkowe nieruchomości. Nowe projekty budowlane na zamówienie w prestiżowych lokalizacjach takich jak Jávea czy Moraira zwykle kosztują między €1,5M a €3M dla willi 4-5 pokojowych z basenami i widokami na morze.',
  },
  {
    question: 'Czy nowe luksusowe wille to dobra inwestycja w Hiszpanii?',
    answer: 'Tak, nieruchomości luksusowe Costa Blanca wykazują stały wzrost wartości, szczególnie w segmencie €1M+. Nowe projekty budowlane oferują nowoczesną efektywność energetyczną, zmniejszoną konserwację i gwarancje konstruktora. Rynek wynajmu luksusowych willi jest silny, zwłaszcza w szczycie letnich miesięcy.',
  },
  {
    question: 'Jakie podatki stosuje się przy zakupie luksusowej nieruchomości w Hiszpanii?',
    answer: 'W przypadku nowych projektów budowlanych obowiązuje VAT (IVA) 10% plus podatek przeniesienia własności 1,5%. Opłaty operacyjne obejmują IBI (podatek nieruchomościowy), zwykle 0,4-1,1% rocznej wartości katastralnej, oraz podatek dochodowy od nierezydentów, jeśli nie wynajmujesz.',
  },
  {
    question: 'Czy mogę uzyskać hipotekę na luksusową nieruchomość jako nierezydent?',
    answer: 'Tak, hiszpańskie banki oferują hipoteki dla nierezydentów zwykle do 60-70% wskaźnika LTV dla nieruchomości luksusowych. Współpracujemy ze specjalistami od hipotecznych Habeno, którzy mogą zorganizować konkurencyjne finansowanie dla międzynarodowych kupujących.',
  },
  {
    question: 'Ile czasu zajmuje zakup nieruchomości w Hiszpanii?',
    answer: 'Proces zakupu trwa zwykle 6-8 tygodni od podpisania umowy rezerwacyjnej do finalizacji. W przypadku luksusowych willi poza planem okresy budowy wahają się od 12-24 miesięcy w zależności od projektu.',
  },
];

export default async function LuxuryPage() {
  const allProperties = await fetchXMLFeed();

  const luxuryProperties = allProperties
    .filter(p => p.price && p.price >= 800000 && p.images?.[0])
    .sort((a, b) => (b.price || 0) - (a.price || 0));

  const bespokeProperties = luxuryProperties.filter(p => p.price && p.price >= 2000000);
  const premiumProperties = luxuryProperties.filter(p => p.price && p.price >= 800000 && p.price < 2000000);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Strona główna', url: 'https://newbuildhomescostablanca.com/pl/' },
    { name: 'Luksus', url: 'https://newbuildhomescostablanca.com/pl/luxury/' },
  ]);

  const faqSchemaData = faqSchema(luxuryFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
          <div className="flex">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="#consultation" className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium">
              Uzyskaj Konsultację
            </a>
          </div>
        </div>

        <section className="relative bg-primary-900">
          <div className="absolute inset-0">
            <Image src={featuredMiralbo[0].image} alt="Luksusowa willa na Costa Blanca" fill className="object-cover opacity-40" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <nav className="text-warm-400 text-sm mb-8">
              <Link href="/pl" className="hover:text-white transition-colors">Strona główna</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Kolekcja Luksus</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Nieruchomości Premium</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">Kolekcja <span className="font-semibold">Luksus</span></h1>

                <p className="text-warm-200 text-lg leading-relaxed mb-8 max-w-2xl">
                  Wyjątkowe nieruchomości od €800 000. Wille na zamówienie, widoki na morze i prestiżowe lokalizacje w Costa Blanca Północ i Południe. Każda nieruchomość wybrana dla wymagających kupujących.
                </p>

                <div className="flex flex-wrap gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-semibold text-white">{luxuryProperties.length}</div>
                    <div className="text-warm-400 text-sm">Luksusowe Nieruchomości</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">€800k</div>
                    <div className="text-warm-400 text-sm">Od</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">{bespokeProperties.length}</div>
                    <div className="text-warm-400 text-sm">Na Zamówienie €2M+</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="#collection" className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2">
                    Przeglądaj Kolekcję
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-1">Konsultacja Prywatna</h3>
                  <p className="text-warm-300 text-sm mb-4">Uzyskaj spersonalizowane rekomendacje nieruchomościowe</p>
                  <form name="luxury-consultation" method="POST" data-netlify="true" className="space-y-3">
                    <input type="hidden" name="form-name" value="luxury-consultation" />
                    <input type="hidden" name="source" value="luxury-hero" />
                    <input type="text" name="name" required placeholder="Twoje imię" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500" />
                    <input type="email" name="email" required placeholder="Adres e-mail" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500" />
                    <select name="budget" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option value="800k-1.5m" className="text-primary-900">€800k - €1.5M</option>
                      <option value="1.5m-2.5m" className="text-primary-900">€1.5M - €2.5M</option>
                      <option value="2.5m-5m" className="text-primary-900">€2.5M - €5M</option>
                      <option value="5m+" className="text-primary-900">€5M+</option>
                    </select>
                    <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded transition-colors">
                      Poproś o Konsultację
                    </button>
                  </form>
                  <p className="text-warm-400 text-xs mt-3 text-center">Odpowiadamy w 2 godziny • Bez zobowiązań</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="bg-primary-900 py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Miralbo Urbana</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">Wyróżnione Wille na Zamówienie</h2>
              <p className="text-warm-400 mt-2 text-sm">Doskonałość architektoniczna w najbardziej prestiżowych lokalizacjach Jávea</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 h-[500px]">
            {featuredMiralbo.slice(0, 2).map((villa) => (
              <Link key={villa.slug} href={`/developments/${villa.slug}`} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${villa.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary-700/90 text-white text-xs px-2 py-1 rounded-sm">{villa.developer}</span>
                    <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">{villa.zone}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{villa.title}</h3>
                  <p className="text-warm-300 text-sm mb-3">{villa.town}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-white">{formatPrice(villa.price)}</span>
                    <span className="text-warm-300 text-sm">{villa.bedrooms} sypialnie · {villa.builtArea}m² · {villa.plotArea}m² działka</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Zobacz Nieruchomość
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href={`/developments/${featuredMiralbo[2].slug}`} className="group relative block h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${featuredMiralbo[2].image})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-transparent group-hover:via-primary-900/60 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 md:right-1/2 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-700/90 text-white text-xs px-3 py-1.5 rounded-sm">{featuredMiralbo[2].developer}</span>
                <span className="bg-accent-500/90 text-white text-xs px-3 py-1.5 rounded-sm">{featuredMiralbo[2].zone}</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-sm backdrop-blur-sm">Widok Morski i Montgó</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-accent-300 transition-colors">{featuredMiralbo[2].title}</h3>
              <p className="text-warm-300 text-sm mb-4">{featuredMiralbo[2].town} — Współczesne Śródziemne Życie</p>
              <div className="flex items-center gap-6 mb-4">
                <span className="text-2xl font-semibold text-white">{formatPrice(featuredMiralbo[2].price)}</span>
                <span className="text-warm-300 text-sm">{featuredMiralbo[2].bedrooms} sypialnie · {featuredMiralbo[2].bathrooms} łazienki · {featuredMiralbo[2].builtArea}m²</span>
              </div>
              <div className="flex items-center gap-2 text-accent-400 font-medium group-hover:gap-3 transition-all">
                Odkryj Tę Willę
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </section>

        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Prestiżowe Lokalizacje</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">Gorące Punkty Luksusów Costa Blanca</h2>
              <p className="text-warm-600 max-w-2xl mx-auto">Najbardziej poszukiwane lokalizacje przez wymagających kupujących szukających wyjątkowych nieruchomości z widokami na morze i śródziemnym stylem życia.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryAreas.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="group bg-white rounded-lg p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">{area.name}</h3>
                  <p className="text-warm-600 text-sm mb-4 line-clamp-3">{area.description}</p>
                  <div className="mb-4"><span className="text-accent-600 font-medium">{area.priceRange}</span></div>
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
                    Zobacz Przewodnik {area.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {bespokeProperties.length > 0 && (
          <section className="py-14 md:py-18 bg-white" id="bespoke">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-px bg-primary-700" />
                    <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Kolekcja na Zamówienie</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">Ultra Luksus €2M+</h2>
                  <p className="text-warm-600 mt-1 text-sm">{bespokeProperties.length} wyjątkowych posiadłości dla najbardziej wymagających kupujących</p>
                </div>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-5 py-2.5 rounded-sm transition-colors text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Poproś przez WhatsApp
                </a>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bespokeProperties.slice(0, 6).map((property) => (
                  <Link key={property.ref} href={`/properties/${property.ref}`} className="group bg-warm-50 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-200">
                    <div className="relative h-64 overflow-hidden">
                      <Image src={property.images?.[0] || '/images/placeholder.jpg'} alt={`${property.bedrooms} sypialnie ${property.propertyType} w ${property.town}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-primary-900 text-white text-xs px-2 py-1 rounded-sm">Na Zamówienie</span>
                        {(property.description || '').toLowerCase().includes('pool') && (
                          <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Basen</span>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="text-2xl font-semibold text-white">{formatPrice(property.price || 0)}</div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
                        {(property as any).aiContent?.title || `${property.bedrooms}-Pokojowy ${property.propertyType}`}
                      </h3>
                      <p className="text-sm text-warm-500 mb-3">
                        <Link href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-accent-600">{property.town}</Link>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-warm-600">
                        <span>{property.bedrooms} sypialnie</span>
                        <span className="text-warm-300">•</span>
                        <span>{property.bathrooms} łazienki</span>
                        <span className="text-warm-300">•</span>
                        <span>{property.size}m²</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {bespokeProperties.length > 6 && (
                <div className="text-center mt-8">
                  <Link href="/properties?minPrice=2000000" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group">
                    Zobacz Wszystkie {bespokeProperties.length} Nieruchomości na Zamówienie
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="py-14 md:py-18 bg-warm-50" id="collection">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">Kolekcja Premium</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">Luksusowe Wille €800k – €2M</h2>
                <p className="text-warm-600 mt-1 text-sm">{premiumProperties.length} nieruchomości premium w Costa Blanca</p>
              </div>
              <Link href="/properties?minPrice=800000&maxPrice=2000000" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm">
                Zobacz Wszystkie
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {premiumProperties.slice(0, 12).map((property) => (
                <Link key={property.ref} href={`/properties/${property.ref}`} className="group">
                  <div className="relative h-56 overflow-hidden rounded-sm mb-3">
                    <Image src={property.images?.[0] || '/images/placeholder.jpg'} alt={`${property.bedrooms} sypialnie ${property.propertyType} w ${property.town}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized />
                    <div className="absolute top-3 left-3">
                      {(property.description || '').toLowerCase().includes('pool') && (
                        <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Basen</span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-1 text-sm">
                    {(property as any).aiContent?.title || `${property.bedrooms}-Pokojowy ${property.propertyType}`}
                  </h3>
                  <p className="text-sm text-warm-500 mb-1">{property.town}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-primary-900">{formatPrice(property.price || 0)}</span>
                    <span className="text-xs text-warm-400">{property.bedrooms} sypialnie · {property.size}m²</span>
                  </div>
                </Link>
              ))}
            </div>

            {premiumProperties.length > 12 && (
              <div className="text-center mt-10">
                <Link href="/properties?minPrice=800000&maxPrice=2000000" className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                  Zobacz Wszystkie {premiumProperties.length} Nieruchomości Premium
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" id="build-your-own">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Ostateczna Personalizacja</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Zbuduj Swoją <span className="font-semibold">Willę Marzeń</span></h2>
                <p className="text-warm-200 text-lg leading-relaxed mb-8">
                  Będź właścicielem prestiżowego terenu na Costa Blanca i stwórz willę na zamówienie zaprojektowaną dokładnie według twoich specyfikacji. Oferujemy pełne wsparcie pod klucz od nabycia terenu do wydania kluczy.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Wybór Terenu</h3>
                      <p className="text-warm-300 text-sm">Prestiżowe tereny z widokami morskimi, frontem pola golfowego lub prywatnymi parametrami</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Architekt i Design</h3>
                      <p className="text-warm-300 text-sm">Pracuj z laureatami architektury na swój projekt na zamówienie</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Zarządzanie Projektem</h3>
                      <p className="text-warm-300 text-sm">Pełny nadzór budowy, kontrola jakości i przestrzeganie harmonogramu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Prawo i Finanse</h3>
                      <p className="text-warm-300 text-sm">Pełne wsparcie prawne, zezwolenia i finansowanie budowy</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/properties?type=Land&minPrice=500000" className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-md transition-colors">
                    Zobacz Prestiżowe Tereny €500k+
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-md transition-colors border border-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Omów Swój Projekt
                  </a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-white text-xl font-medium mb-6">Dlaczego Budować na Zamówienie?</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-accent-400">01</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Pełna Kontrola</h4>
                      <p className="text-warm-300 text-sm">Zaprojektuj każdy pokój, wybierz każde wykończenie i stwórz przestrzenie które idealnie pasują do Twojego stylu życia.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-accent-400">02</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Prestiżowe Lokalizacje</h4>
                      <p className="text-warm-300 text-sm">Uzyskaj dostęp do ekskluzywnychTerenów w Jávea, Moraira i Altea które nie są dostępne z gotowymi nieruchomościami.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-accent-400">03</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Lepsza Wartość</h4>
                      <p className="text-warm-300 text-sm">Budowa na zamówienie często kosztuje 15-20% mniej niż zakup równoważnych gotowych nieruchomości luksusowych.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-bold text-accent-400">04</div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Przyjazne Przyszłości</h4>
                      <p className="text-warm-300 text-sm">Integruj inteligentny dom, funkcje zrównoważone i nowoczesną efektywność energetyczną od początku.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-warm-300 text-sm mb-3">Typowy harmonogram budowy:</p>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent-500 text-white text-sm font-medium px-3 py-1 rounded-full">12-18 miesięcy</span>
                    <span className="text-warm-400 text-sm">od terenu do ukończenia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white" id="faqs">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Popularne Pytania</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Najczęściej Zadawane Pytania o Luksusowe Nieruchomości</h2>
            </div>

            <div className="space-y-3">
              {luxuryFaqs.map((faq, i) => (
                <details key={i} className="group bg-warm-50 border border-warm-200 rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-primary-900 hover:bg-warm-100 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-200 pt-4">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-900 py-16 pb-24 lg:pb-16" id="consultation">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Ekskluzywna Usługa</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">Prywatna Konsultacja Nieruchomościowa</h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Szukasz czegoś szczególnego? Nasi specjaliści nieruchomości luksusowych mogą zorganizować prywatne wizyty, uzyskać dostęp do list poza rynkiem i zapewnić spersonalizowane doradztwo na całej drodze do zakupu.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">15+ lat doświadczenia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">5 języków</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">100% niezależny</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Dostęp poza rynkiem</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm transition-colors border border-white/20">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Poproś o Konsultację</h3>
                <p className="text-warm-500 text-sm mb-5">Skontaktujemy się w ciągu 2 godzin</p>
                <form name="luxury-consultation-footer" method="POST" data-netlify="true" className="space-y-4">
                  <input type="hidden" name="form-name" value="luxury-consultation-footer" />
                  <input type="hidden" name="source" value="luxury-footer" />

                  <div>
                    <label htmlFor="name-footer" className="block text-sm font-medium text-primary-900 mb-1">Imię *</label>
                    <input type="text" name="name" id="name-footer" required placeholder="Twoje pełne imię" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <div>
                    <label htmlFor="email-footer" className="block text-sm font-medium text-primary-900 mb-1">E-mail *</label>
                    <input type="email" name="email" id="email-footer" required placeholder="twoj@email.com" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <div>
                    <label htmlFor="phone-footer" className="block text-sm font-medium text-primary-900 mb-1">Telefon</label>
                    <input type="tel" name="phone" id="phone-footer" placeholder="+48 XXX XXX XXX" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <div>
                    <label htmlFor="budget-footer" className="block text-sm font-medium text-primary-900 mb-1">Zakres Budżetu</label>
                    <select name="budget" id="budget-footer" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white">
                      <option value="800k-1.5m">€800k - €1.5M</option>
                      <option value="1.5m-2.5m">€1.5M - €2.5M</option>
                      <option value="2.5m-5m">€2.5M - €5M</option>
                      <option value="5m+">€5M+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="areas-footer" className="block text-sm font-medium text-primary-900 mb-1">Preferowane Strefy</label>
                    <input type="text" name="areas" id="areas-footer" placeholder="np., Jávea, Moraira, Altea" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded transition-colors">
                    Poproś o Konsultację
                  </button>

                  <p className="text-xs text-warm-400 text-center">
                    Przesyłając, wyrażasz zgodę na naszą politykę prywatności.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

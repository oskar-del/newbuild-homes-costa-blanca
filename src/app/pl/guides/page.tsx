import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Przewodniki Kupującego | Kupno Nieruchomości na Costa Blanca | 2026',
  description: 'Kompleksowe przewodniki kupującego dla polskich nabywców. Numer NIE, podatki, kredyt hipoteczny, proces zakupu i destinacje.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/pl/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const essentialGuides = [
  {
    title: 'Proces Zakupu',
    slug: 'proces-zakupu',
    description: 'Przewodnik krok po kroku do kupna nowej nieruchomości w Hiszpanii. Od rezerwacji do przekazania kluczy.',
    icon: '📋',
    readTime: '12 min czytania',
    category: 'Istotne',
  },
  {
    title: 'Numer NIE Guide',
    slug: 'numer-nie',
    description: 'Jak uzyskać swój numer NIE — wymagany do kupna nieruchomości w Hiszpanii.',
    icon: '🪪',
    readTime: '8 min czytania',
    category: 'Istotne',
  },
  {
    title: 'Koszty i Podatki',
    slug: 'koszty-podatki',
    description: 'Kompletny przegląd kosztów zakupu, podatków i bieżących wydatków dla właścicieli nieruchomości.',
    icon: '💰',
    readTime: '10 min czytania',
    category: 'Istotne',
  },
  {
    title: 'Kredyt Hipoteczny',
    slug: 'kredyt-hipoteczny',
    description: 'Jak uzyskać kredyt hipoteczny jako polski nabywca w Hiszpanii. Wymagania i procedura.',
    icon: '🏦',
    readTime: '10 min czytania',
    category: 'Istotne',
  },
];

const decisionGuides = [
  {
    title: 'Dlaczego Nowy Budynek?',
    slug: 'dlaczego-nowy-budynek',
    description: 'Zalety nowych budynków w porównaniu ze starszymi nieruchomościami — gwarancje, efektywność energetyczna i nowoczesny design.',
    icon: '🏗️',
    readTime: '6 min czytania',
    category: 'Decyzja',
  },
  {
    title: 'Pod Klucz vs Plan',
    slug: 'pod-klucz-vs-plan',
    description: 'Czy powinienem kupić nieruchomość pod klucz czy w fazie planowania? Zalety i wady dla polskich kupujących.',
    icon: '🔑',
    readTime: '8 min czytania',
    category: 'Decyzja',
  },
  {
    title: 'Północ vs Południe Costa Blanca',
    slug: 'polnoc-vs-poludnie',
    description: 'Porównanie obu regionów — ekskluzywna północ vs przystępna cena południa. Znajdź swoją idealną lokalizację.',
    icon: '🗺️',
    readTime: '10 min czytania',
    category: 'Decyzja',
  },
  {
    title: 'Licencja Wynajmu Turystycznego',
    slug: 'licencja-wynajmu-turystycznego',
    description: 'Wszystko o certyfikatach wynajmu turystycznego w Wspólnocie Walencji — wymagania, procedura i potencjał.',
    icon: '📜',
    readTime: '8 min czytania',
    category: 'Inwestycja',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 dzielnic z fotografią dronem. Kompletny przewodnik Costa Blanca Południowej.',
    href: '/pl/guides/torrevieja',
    icon: '🏖️',
    badges: ['100+ Zdjęć', '7 Stref'],
  },
  {
    title: 'Jávea',
    description: '4 dzielnice od plaży Arenal do góry Montgó. Życie na wyłącznym wybrzeżu północnym.',
    href: '/pl/guides/javea',
    icon: '⛵',
    badges: ['4 Dzielnice', '7 Plaż'],
  },
  {
    title: 'Costa Blanca Północ',
    description: '6 miast porównanych — Jávea, Moraira, Altea, Calpe, Dénia i Benissa z fotografią dronem.',
    href: '/pl/guides/costa-blanca-polnoc',
    icon: '🏔️',
    badges: ['6 Miast', 'Przewodnik Regionu'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Raj golfowy z La Zenia, Villamartin, Cabo Roig i więcej. Przystępne życie na południowym wybrzeżu.',
    href: '/pl/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 Obszarów', 'Fokus Golf'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'Najbardziej dynamiczne miasta przybrzeżne Hiszpanii — plaże, życie nocne i zaskakujący potencjał inwestycyjny.',
    href: '/pl/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 Strefy', 'Przewodnik Miasta'],
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Przewodniki Ekspertów</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Przewodniki Kupującego</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Wszystko o kupnie nieruchomości na Costa Blanca.
            Przewodniki ekspertów napisane dla polskich kupujących.
          </p>
          <p className="text-warm-300">
            Od numeru NIE do kredytu hipotecznego, prowadzimy Cię przez każdy etap procesu.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Obowiązkowe</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Istotne Przewodniki Kupującego</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Cztery przewodniki, które każdy kupujący powinien przeczytać przed zakupem w Hiszpanii</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/pl/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-500 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-accent-500 text-sm font-semibold flex items-center gap-1">
                      Czytaj
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Destination Guides */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Odkryj Obszary</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Przewodniki Destinacji</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Kompleksowe przewodniki po najlepszych obszarach na Costa Blanca</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinationGuides.map((dest) => (
              <Link key={dest.href} href={dest.href}>
                <div className="bg-primary-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow h-full group">
                  <div className="h-32 bg-gradient-to-br from-accent-500/30 to-primary-800 flex items-center justify-center">
                    <span className="text-5xl">{dest.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-300 text-sm mb-3">{dest.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision & Planning Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planowanie</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Przewodniki Decyzji</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Podejmij świadome decyzje dotyczące lokalizacji, typu nieruchomości i strategii inwestycyjnej</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/pl/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-primary-600 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                      Czytaj
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Finance CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Finansowanie & Kredyty Hipoteczne</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Gotowy do porównania stóp procentowych kredytów hipotecznych?</h2>
              <p className="text-warm-200 mb-6">
                Porównaj stawki z ponad 15 bankami hiszpańskimi, zobacz aktualne dane rynkowe i odkryj opcje finansowania
                dla standardowych i luksusowych nieruchomości.
              </p>
              <Link
                href="/pl/guides/kredyt-hipoteczny"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Porównaj Kredyty Hipoteczne &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Średnia stopa stała</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">LTV dla nie-rezydenta</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Porównywalne banki</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">€800k+</div>
                <div className="text-warm-300 text-sm mt-1">Opcje luksusowe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Dlaczego Ufać Naszym Przewodnikom?</h2>
            <p className="text-warm-600">Lokalna ekspertyza połączona ze zrozumieniem międzynarodowym</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Lokalna Ekspertyza</h3>
              <p className="text-warm-600">Zamieszkały na Costa Blanca z latami doświadczenia w pomaganiu polskim kupującym w radzeniu sobie z hiszpańskim rynkiem nieruchomości.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Aktualne Informacje</h3>
              <p className="text-warm-600">Regularnie aktualizowany, aby odzwierciedlać bieżące dane rynku nieruchomości Hiszpanii, przepisy podatkowe i warunki rynkowe.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Międzynarodowe Podejście</h3>
              <p className="text-warm-600">Napisane specjalnie dla międzynarodowych kupujących — poruszające unikalne wyzwania takie jak numery NIE, kredyty hipoteczne za granicą i podatki dla nie-rezydentów.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Masz Pytania?</h2>
          <p className="text-xl text-white/90 mb-8">
            Nasz zespół jest tutaj, aby poprowadzić Cię przez proces zakupu. Skontaktuj się z nami w celu uzyskania porady osobistej.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pl/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Skontaktuj się z Nami
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Szybka odpowiedź w ciągu 24 godzin — często znacznie szybciej
          </p>
        </div>
      </section>
    </main>
  );
}

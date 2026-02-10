import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Wonen in Torrevieja | Gids voor Nederlanders 2026',
  description: 'Overzicht van Torrevieja voor Nederlanders. Stranden, klimaat, gezondheidszorg, kosten van leven en eigendomprijzen. Beginnershuis gids.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/torrevieja',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/torrevieja',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/torrevieja',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/torrevieja',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/torrevieja',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

const faqs = [
  {
    question: 'Hoe veel Nederlanders wonen in Torrevieja?',
    answer: 'Torrevieja heeft een grote Nederlandse gemeenschap, schat ongeveer 3.000-5.000 Nederlanders. Het is een echte Hollandse enclave met Neder landse winkels, restaurants en vrijetijdsactiviteiten.',
  },
  {
    question: 'Wat is het klimaat in Torrevieja?',
    answer: 'Torrevieja heeft meer dan 300 zonnige dagen per jaar. Gemiddelde temperatuur: 18°C winter, 27-28°C zomer. Prachtig! Minder regen dan veel van Europa.',
  },
  {
    question: 'Hoe duur is het leven?',
    answer: 'Veel goedkoper dan Nederland. Eigendom begint rond €150k. Voeding, restaurants, bierje: allemaal 20-30% goedkoper dan NL.',
  },
  {
    question: 'Hoe is de gezondheidszorg?',
    answer: 'Spaanse gezondheidszorg is goed. Als EU-ingezetene kun je je aanmelden met je Nederlands EHIC-kaart. Private klinieken ook beschikbaar.',
  },
  {
    question: 'Welke stranden zijn er?',
    answer: 'Torrevieja heeft prachtige stranden: Playa del Cura, Playa Acequión, Playa del Torresalado. Allemaal schoon en goed onderhouden.',
  },
  {
    question: 'Wat zijn de woonwijken?',
    answer: 'Centro (centrum), La Mata (familiegebied), Los Balcones (strand nah), Punta Prima (stranddicht). Elk met eigen karakter.',
  },
  {
    question: 'Is Torrevieja goed voor verhuur?',
    answer: 'Ja. Veel toeristen, goed voor seizoenshuur. Ook veel expatriate lange termijn huurders. Opbrengsten 4-7% per jaar mogelijk.',
  },
];

export default function TorrevijaPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Torrevieja', url: 'https://newbuildhomescostablanca.com/nl/guides/torrevieja' },
  ]);

  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4 text-warm-200">
              <Link href="/nl/guides" className="hover:text-white">Gidsen</Link>
              <span className="mx-2">→</span>
              <span>Torrevieja</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Wonen in Torrevieja
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Overzicht van deze populaire zuidelijke kustplaats voor Nederlanders. Stranden, leven en vastgoed.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>7 min lezen</span>
              <span>•</span>
              <span>Bijgewerkt februari 2026</span>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Intro */}
            <div className="mb-12">
              <p className="text-xl text-warm-700 leading-relaxed mb-4">
                Torrevieja is een gezellige kustplaats in Zuid Costa Blanca, dé thuishaven voor veel Nederlanders. Mooie stranden, groot Nederlands netwerk, en betaalbare vastgoed.
              </p>
            </div>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Waarom kiezen Nederlanders voor Torrevieja?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Groot Nederlands netwerk</h3>
                  <p className="text-warm-700 text-sm">3.000-5.000 Nederlanders, Nederlandse winkels, restaurants, vrienden</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Betaalbare vastgoed</h3>
                  <p className="text-warm-700 text-sm">Appartement vanaf €150k, villa\'s €250k+</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Prachtige stranden</h3>
                  <p className="text-warm-700 text-sm">5+ schone stranden, zwemmen, watersporten</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Golf & sport</h3>
                  <p className="text-warm-700 text-sm">30+ golfbanen dichtbij, voetbal, tennis</p>
                </div>
              </div>
            </section>

            {/* De buurt */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Buurten in Torrevieja</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">Centro</h3>
                  <p className="text-warm-700 text-sm">Centrum, dichter bij winkels/restaurants. Drukker, maar alles binnen handbereik.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">La Mata</h3>
                  <p className="text-warm-700 text-sm">Familiebuurt, rustig, meer groen. Iets verder van centrum.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">Los Balcones</h3>
                  <p className="text-warm-700 text-sm">Strand dichtbij, hoge bouwwerken, veel toeristen.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">Punta Prima</h3>
                  <p className="text-warm-700 text-sm">Even zuidelijker, meer natuur, nog rustig.</p>
                </div>
              </div>
            </section>

            {/* Leven */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Leven in Torrevieja</h2>
              <div className="space-y-6">
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Eten & drinken</h3>
                  <p className="text-warm-700 text-sm">Veel Spaanse restaurants, maar ook Nederlandse. Bier goedkoop, paella authentiek.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Transport</h3>
                  <p className="text-warm-700 text-sm">Auto handig (Alicante 50km), busverbinding goed, taxi beschikbaar.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Winkels</h3>
                  <p className="text-warm-700 text-sm">Supermarkt, veel internationale winkels. Minder keuze dan grote steden maar prima.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Sport & vrijetijd</h3>
                  <p className="text-warm-700 text-sm">Golf, tennis, zwemmen, wandelen. Veel clubs met Nederlandse leden.</p>
                </div>
              </div>
            </section>

            {/* Praktisch */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Praktische info</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Eigendom prijs</span>
                  <span>€150k - €500k</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Jaarlijkse kosten</span>
                  <span>€1.500 - €3.000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Huurinkomsten</span>
                  <span>4-7% per jaar</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Klimaat</span>
                  <span>300+ zon/jaar, 18-28°C</span>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Torrevieja woningen ontdekken</h2>
              <p className="text-warm-300 mb-6">
                We hebben veel nieuwbouw projecten in Torrevieja, zowel op tekening als kant-en-klaar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/nl/properties"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Zie beschikbare woningen
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-accent-500 text-accent-500 px-6 py-3 rounded-sm font-semibold hover:bg-accent-500/10 transition-colors text-center"
                >
                  WhatsApp ons
                </a>
              </div>
            </section>

          </div>
        </article>

        {/* FAQs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-semibold text-center mb-8">Veelgestelde vragen</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-warm-50 rounded-sm border border-warm-200 overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-100 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-200 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">Gerelateerde gidsen</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/nl/guides/noord-vs-zuid" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Noord vs Zuid</h3>
                <p className="text-warm-600 text-sm">Welke regio past bij jou?</p>
              </Link>
              <Link href="/nl/guides/koopproces" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Koopproces</h3>
                <p className="text-warm-600 text-sm">Hoe koop je?</p>
              </Link>
              <Link href="/nl/guides" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border-2 border-accent-200">
                <h3 className="font-semibold mb-2">Alle gidsen</h3>
                <p className="text-warm-600 text-sm">Meer informatie</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

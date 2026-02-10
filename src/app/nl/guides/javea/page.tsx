import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Wonen in Jávea | Gids voor Nederlanders 2026',
  description: 'Overzicht van Jávea aan de noordkust van Costa Blanca. Berg Montgo, drie stranden, internationaal, luxe wonen en eigendomprijzen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/javea',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/javea',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/javea',
    },
  },
};

const faqs = [
  {
    question: 'Hoe ver is Jávea van Amsterdam?',
    answer: 'Direct vlucht naar Alicante (~2,5 uur), dan 90 min auto. Ook mogelijk via andere vliegvelden (Valencia, Málaga).',
  },
  {
    question: 'Wat is Montgo?',
    answer: 'Berg van 753 meter met prachtig uitzicht. Populair voor wandelen. UNESCO beschermde natuurgebied, heel mooi.',
  },
  {
    question: 'Wat zijn de drie stranden?',
    answer: 'Playa Arenal (groot, family), Playa Granadella (klein, naturist), Playa Portixol (verstopt, rustig). Allen prachtig.',
  },
  {
    question: 'Is Jávea duur?',
    answer: 'Ja, noordelijk en premium. Appartementen €350k-€700k, villa\'s €1M+. Bestaande bouw is goedkoper dan nieuwbouw.',
  },
  {
    question: 'Veel Nederlanders in Jávea?',
    answer: 'Minder dan in Torrevieja. Meer gemengde internationale gemeenschap (Zweden, Duitsers, Franse, Britten).',
  },
  {
    question: 'Is Jávea goed voor winterverblijf?',
    answer: 'Ja! Veel seizoensgebruikers. Winters mild (15-18°C), perfect voor Europese winters. Golf dicht bij.',
  },
  {
    question: 'Welke huizen zijn er?',
    answer: 'Mix van alles: traditionale Spaanse villa\'s, moderne appartementen, huizen met zee. Elk budget beschikbaar.',
  },
];

export default function JavaPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Jávea', url: 'https://newbuildhomescostablanca.com/nl/guides/javea' },
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
              <span>Jávea</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Wonen in Jávea
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Premium locatie aan Noord Costa Blanca. Berg Montgo, prachtige stranden, internationale gemeenschap.
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
                Jávea is het juweel van Noord Costa Blanca. Met de imposante Berg Montgo, drie prachtige stranden en een internationaal karakter, trekt het de meer luxe-zoeker aan.
              </p>
            </div>

            {/* Highlights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Waarom Jávea kiezen?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Berg Montgo</h3>
                  <p className="text-warm-700 text-sm">753 meter, wandelpaden, uitzicht, natuurgebied</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Drie stranden</h3>
                  <p className="text-warm-700 text-sm">Arenal, Granadella, Portixol - allemaal mooi</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Luxe voorzieningenen</h3>
                  <p className="text-warm-700 text-sm">Premium restaurants, marina, jachtclubs</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Zeezicht</h3>
                  <p className="text-warm-700 text-sm">Veel huizen met directe zee view</p>
                </div>
              </div>
            </section>

            {/* Stranden */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">De drie stranden</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">Playa Arenal</h3>
                  <p className="text-warm-700 text-sm">Groot, zandstrand, goed ingericht, families, restaurants langs strand. Meest populair.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">Playa Granadella</h3>
                  <p className="text-warm-700 text-sm">Klein, intiem, kristalhelder water, snorkelen, naturist zones. Pittoresk.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold">Playa Portixol</h3>
                  <p className="text-warm-700 text-sm">Verborgen gem, rustig, minder toeris, locals, perfect voor stille dagen.</p>
                </div>
              </div>
            </section>

            {/* Oud centrum */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Oud centrum vs moderne wijken</h2>
              <div className="space-y-4">
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Oud centrum (Pueblo)</h3>
                  <p className="text-warm-700 text-sm">Traditionele Spaanse dorpssfeer, smalle straatjes, bar taps, restaurants. Karaktervol maar kan vol zijn.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Moderne wijken</h3>
                  <p className="text-warm-700 text-sm">Nieuwbouw richting Arenal strand, moderne apartments, goed voorzien. Herkend type wonen.</p>
                </div>
              </div>
            </section>

            {/* Leven */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Leven in Jávea</h2>
              <div className="space-y-6">
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Eten & drinken</h3>
                  <p className="text-warm-700 text-sm">Veel toprestaurants, visgerechten, lokale paella. Marina vol bars. Meer premium dan Torrevieja.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Transport</h3>
                  <p className="text-warm-700 text-sm">Auto nuttig (meer verspreiding). Busverbinding naar Alicante (90 min). Walkie-afstanden in centrum.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Sport</h3>
                  <p className="text-warm-700 text-sm">Zeilen, duiken, wandelen Montgo, tennisclubs. Watersportparadijs.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Internationale gemeenschap</h3>
                  <p className="text-warm-700 text-sm">Zweden, Duitsers, Fransen, Britten. Minder Nederlands dan Torrevieja.</p>
                </div>
              </div>
            </section>

            {/* Praktisch */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Praktische info</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Eigendom prijs</span>
                  <span>€300k - €2M+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Jaarlijkse kosten</span>
                  <span>€2.000 - €5.000</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Klimaat</span>
                  <span>Mild (15-26°C), iets koeler dan Zuid</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Naar Alicante</span>
                  <span>90 min auto</span>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Jávea woningen verkennen</h2>
              <p className="text-warm-300 mb-6">
                We hebben luxe nieuwbouwprojecten en bestaande eigendom opties in Jávea.
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
              <Link href="/nl/guides/costa-blanca-noord" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Costa Blanca Noord</h3>
                <p className="text-warm-600 text-sm">Alle noordelijk gebieden</p>
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

import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Noord vs Zuid Costa Blanca | Welke Regio Past Bij Jou? 2026',
  description: 'Vergelijking Noord (Jávea, Moraira, Altea) vs Zuid (Torrevieja, Guardamar) Costa Blanca. Prijzen, levensstijl, klimaat en Nederlanders.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/noord-vs-zuid',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/north-vs-south',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/noord-vs-zuid',
    },
  },
};

const faqs = [
  {
    question: 'Wat is het verschil in prijzen Noord vs Zuid?',
    answer: 'Noord (Jávea, Altea, Moraira): €350k-€2M+. Zuid (Torrevieja, Guardamar): €150k-€500k. Zuid is veel betaalbaarder.',
  },
  {
    question: 'Waar is meer Nederlandse gemeenschap?',
    answer: 'Zuid, vooral rond Torrevieja en Guardamar, heeft meer Nederlanders. Noord heeft meer gemengde internationale gemeenschap.',
  },
  {
    question: 'Welk klimaat is beter?',
    answer: 'Beide hebben excellent klimaat. Noord is iets koeler (bergen), Zuid meer constant warm. Het verschil is klein.',
  },
  {
    question: 'Welk gebied heeft betere faciliteiten?',
    answer: 'Zuid heeft meer golf, winkels, nachtleven. Noord heeft meer natuur, wandelen, berglandschap.',
  },
  {
    question: 'Welk is beter voor verhuur?',
    answer: 'Beide goed. Noord trekt premium gasten, Zuid volume en lange termijn verhuurders. Hangt van jouw strategy af.',
  },
  {
    question: 'Hoe ver is het naar Alicante luchthaven?',
    answer: 'Noord: 80-100 km (1,5-2 uur). Zuid: 50-60 km (45 min-1 uur). Zuid is dichterbij.',
  },
  {
    question: 'Welk heeft betere voedingswaarde?',
    answer: 'Beide hebben uitstekende restaurants. Noord meer trendy/fine dining, Zuid meer casual/traditioneel.',
  },
];

export default function NoordVsZuidPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Noord vs Zuid', url: 'https://newbuildhomescostablanca.com/nl/guides/noord-vs-zuid' },
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
              <span>Noord vs Zuid</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Noord of Zuid Costa Blanca?
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Vergelijking van beide regio\'s. Welke past het best bij jouw wensen?
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>10 min lezen</span>
              <span>•</span>
              <span>Bijgewerkt februari 2026</span>
            </div>
          </div>
        </section>

        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Intro */}
            <div className="mb-12 text-xl text-warm-700 leading-relaxed">
              <p>
                Costa Blanca kun je grofweg verdelen in Noord en Zuid. Elk gebied heeft eigen karakter, prijzen en voordelen.
              </p>
            </div>

            {/* Comparison Grid */}
            <section className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Noord */}
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h2 className="text-2xl font-semibold mb-4">NOORD</h2>
                  <div className="space-y-4 text-warm-700 text-sm">
                    <div>
                      <p className="font-semibold">Steden</p>
                      <p>Jávea, Moraira, Altea, Calpe, Benidorm, Dénia</p>
                    </div>
                    <div>
                      <p className="font-semibold">Karakteristiek</p>
                      <p>Bergachtig, prestigieus, natuur</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prijs woning</p>
                      <p>€350k - €2M+</p>
                    </div>
                    <div>
                      <p className="font-semibold">Type kopers</p>
                      <p>Mix internationaal, woningzoekers premium</p>
                    </div>
                    <div>
                      <p className="font-semibold">Landschap</p>
                      <p>Bergen, vallei, wandelgebied</p>
                    </div>
                    <div>
                      <p className="font-semibold">Golf</p>
                      <p>Enkele aanwezige</p>
                    </div>
                  </div>
                </div>

                {/* Zuid */}
                <div className="bg-white rounded-sm p-6 border-l-4 border-primary-600">
                  <h2 className="text-2xl font-semibold mb-4">ZUID</h2>
                  <div className="space-y-4 text-warm-700 text-sm">
                    <div>
                      <p className="font-semibold">Steden</p>
                      <p>Torrevieja, Orihuela Costa, Guardamar, Pilar de Horadada</p>
                    </div>
                    <div>
                      <p className="font-semibold">Karakteristiek</p>
                      <p>Vlak, betaalbaar, social</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prijs woning</p>
                      <p>€150k - €500k</p>
                    </div>
                    <div>
                      <p className="font-semibold">Type kopers</p>
                      <p>Veel Nederlanders, families, expats</p>
                    </div>
                    <div>
                      <p className="font-semibold">Landschap</p>
                      <p>Vlak, strand, meer</p>
                    </div>
                    <div>
                      <p className="font-semibold">Golf</p>
                      <p>Veel golfbanen, golfoord reputatie</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Noord Uitgebreid */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">NOORD Costa Blanca uitgebreid</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-2">Voordelen</h3>
                  <ul className="text-warm-700 space-y-1 ml-4 text-sm">
                    <li>Bergachtig landschap, spectaculaire zeezichten</li>
                    <li>Dorp sfeer met luxe voorzieningeneen</li>
                    <li>Premium eigendomwaarden behouden goed</li>
                    <li>Wandelen, trekking, buitenleven</li>
                    <li>Internationale gemeenschap</li>
                  </ul>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-warm-400">
                  <h3 className="font-semibold mb-2">Overwegingen</h3>
                  <ul className="text-warm-700 space-y-1 ml-4 text-sm">
                    <li>Hogere prijzen (€350k-€2M+)</li>
                    <li>Bergige wegen, meer verkeer naar Benidorm</li>
                    <li>Minder Nederlandse gemeenschap</li>
                    <li>Winters iets koeler</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Zuid Uitgebreid */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">ZUID Costa Blanca uitgebreid</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-primary-600">
                  <h3 className="font-semibold mb-2">Voordelen</h3>
                  <ul className="text-warm-700 space-y-1 ml-4 text-sm">
                    <li>Veel goedkoper (€150k-€500k)</li>
                    <li>Vlak terrein, makkelijker bereikbaar</li>
                    <li>Grote Nederlandse gemeenschap</li>
                    <li>Golf hotspot (30+ banen)</li>
                    <li>Meer Engelse sprekers/voorzieningeneen</li>
                    <li>Sterke expat infra</li>
                  </ul>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-warm-400">
                  <h3 className="font-semibold mb-2">Overwegingen</h3>
                  <ul className="text-warm-700 space-y-1 ml-4 text-sm">
                    <li>Minder spektakulair landschap</li>
                    <li>Toerisme-gericht, vooral in zomer druk</li>
                    <li>Prijs eigendom stabieler maar minder groei</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Lifestyle */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Levensstijl vergelijking</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-warm-800 text-white">
                    <th className="p-3 text-left">Aspect</th>
                    <th className="p-3 text-left">Noord</th>
                    <th className="p-3 text-left">Zuid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3 font-semibold">Bruisendheid</td><td className="p-3">Kalm, dorp-achtig</td><td className="p-3">Actief, vol leven</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">Restaurants</td><td className="p-3">Premium, fine dining</td><td className="p-3">Casual, traditioneel</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">Nachtleven</td><td className="p-3">Subtiel, bars</td><td className="p-3">Actief, clubs</td></tr>
                  <tr className="border-b"><td className="p-3 font-semibold">Sport</td><td className="p-3">Wandelen, zeilen</td><td className="p-3">Golf, zwemmen</td></tr>
                  <tr><td className="p-3 font-semibold">Gemeenschap</td><td className="p-3">Cosmopolitaan</td><td className="p-3">Veel Nederlands</td></tr>
                </tbody>
              </table>
            </section>

            {/* Voor Nederlanders */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Voor Nederlanders specifiek</h2>
              <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500 text-warm-700 space-y-4">
                <p>
                  <strong>Zuid:</strong> Hoger concentratie Nederlanders. Winkels, restaurants, vrienden uit Nederland. Makkelijker om aan te passen.
                </p>
                <p>
                  <strong>Noord:</strong> Meer naar buitenlandse gemeenschap, minder Nederlands comfort. Beter als je aanpassingsvermogen hebt.
                </p>
                <p>
                  <strong>Praktisch:</strong> Zuid closer bij Alicante vliegveld (45 min). Noord verder weg (90 min).
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Wil je beide verkennen?</h2>
              <p className="text-warm-300 mb-6">
                Ons team helpt je beide regio\'s ontdekken. We organiseren viewings in Noord en Zuid.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/nl/guides/torrevieja"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Torrevieja gids
                </Link>
                <Link
                  href="/nl/guides/javea"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Jávea gids
                </Link>
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
            <h2 className="text-2xl font-semibold mb-8 text-center">Gebiedsgidsen</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/nl/guides/torrevieja" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Torrevieja</h3>
                <p className="text-warm-600 text-sm">Zuid gidsoverzicht</p>
              </Link>
              <Link href="/nl/guides/javea" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Jávea</h3>
                <p className="text-warm-600 text-sm">Noord gidsoverzicht</p>
              </Link>
              <Link href="/nl/guides/costa-blanca-noord" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Costa Blanca Noord</h3>
                <p className="text-warm-600 text-sm">Alle Noord gebieden</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

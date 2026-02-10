import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Costa Blanca Noord | Gids voor Nederlandse Kopers 2026',
  description: 'Compleet overzicht van Noord Costa Blanca. Jávea, Moraira, Altea, Calpe. Berglandschap, luxe wonen, natuur en premium eigendommen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/costa-blanca-noord',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/costa-blanca-north',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/costa-blanca-noord',
    },
  },
};

const faqs = [
  {
    question: 'Wat is eigenlijk Costa Blanca Noord?',
    answer: 'Noord Costa Blanca is het bergachtige deel in het noorden: Jávea, Moraira, Altea, Calpe, Benidorm, Dénia. Berglandschap, natuur, meer luxe dan zuid.',
  },
  {
    question: 'Wat is het beste kleine dorp?',
    answer: 'Moraira: klein, rustig, jachtclub. Altea: künstlerisch, heuvelachtig. Calpe: Peñón de Ifach (beroemde rots). Elk met eigen sfeer.',
  },
  {
    question: 'Veel Nederlanders in Noord?',
    answer: 'Minder dan Zuid. Meer gemengde internationale gemeenschap. Dit kan voordeel zijn als je meer lokale Spaanse ervaringenen wilt.',
  },
  {
    question: 'Wat is Moraira bekend om?',
    answer: 'Kleine jachtclub, Michelin restaurants, chique sfeer. Meer luxe, minder volume dan Jávea.',
  },
  {
    question: 'Wandelpaden?',
    answer: 'Veel! Berg Montgo, Peñón de Ifach in Calpe, kustpaden. Noord is wandel-paradijs.',
  },
  {
    question: 'Is Noord beter dan Zuid voor investering?',
    answer: 'Ander profiel. Noord: hoogte waarde, minder groei. Zuid: groei-potentieel, meer rental. Hangt af van strategie.',
  },
  {
    question: 'Klimaat Noord?',
    answer: 'Iets koeler (bergen), meer wind soms. Winters 15-18°C, zomers 24-26°C. Perfect voor Duitse/Noord-Europese winters.',
  },
];

export default function CostaBblancaNoordPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Costa Blanca Noord', url: 'https://newbuildhomescostablanca.com/nl/guides/costa-blanca-noord' },
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
              <span>Costa Blanca Noord</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Costa Blanca Noord
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Compleet overzicht van de bergachtige noordkust. Jávea, Moraira, Altea, Calpe en meer.
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
            <div className="mb-12">
              <p className="text-xl text-warm-700 leading-relaxed mb-4">
                Costa Blanca Noord is bergachtig, prestigieus en gericht op natuur. Dit gebied trekt diegenen aan die zoeken naar luxe, rust en landschappenenen.
              </p>
            </div>

            {/* Gebieden */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">De belangrijkste gebieden</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-1">Jávea (Xàbia)</h3>
                  <p className="text-warm-700 text-sm">Grootste stad Noord, Berg Montgo, 3 stranden, 300m hoogte. Populair, heel wat nieuwbouw.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-1">Moraira</h3>
                  <p className="text-warm-700 text-sm">Klein, exclusive, jachtclub, Michelin restaurants, veel villa\'s, stil. Premium segment.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-1">Altea</h3>
                  <p className="text-warm-700 text-sm">Kunstenaarsplaats, witte huizen heuvelachtig, galeries, ateliers, bohemian sfeer.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-1">Calpe (Polop)</h3>
                  <p className="text-warm-700 text-sm">Peñón de Ifach (520m rotsformatie), toeristen attractie, meer families, affordable.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-1">Benidorm</h3>
                  <p className="text-warm-700 text-sm">Groot toeristencentrum, torenflats, druk, families. Minder voor rustige koper.</p>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-1">Dénia</h3>
                  <p className="text-warm-700 text-sm">Havenstad, rots, strand, restaurants. Gateway naar Ibiza ferry. Levendig.</p>
                </div>
              </div>
            </section>

            {/* Karakteristieken */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Noord kenmerken</h2>
              <div className="space-y-4">
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Landschap</h3>
                  <p className="text-warm-700 text-sm">Bergachtig, bergwandel mogelijkheden, natuurgebieden. Spektaculair als je nature-minnaar bent.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Eigendom</h3>
                  <p className="text-warm-700 text-sm">Veel villa\'s met zee view, berghuisjes, luxe apartments. Nieuwbouw en traditioneel gemengd.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Voorzieningenen</h3>
                  <p className="text-warm-700 text-sm">Golf clubs, restaurants, jachtmarinas. Meer premium aanbod dan Zuid.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Eigendomprijzen</h3>
                  <p className="text-warm-700 text-sm">€350k-€2M+ aanzienlijk hoger dan Zuid. Investment appreciation stabiel.</p>
                </div>
                <div className="bg-warm-50 rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Gemeenschap</h3>
                  <p className="text-warm-700 text-sm">Internationaal: Zweedse, Duitse, Franse, Britse expats. Minder Nederlands dan Zuid.</p>
                </div>
              </div>
            </section>

            {/* Voordelen Nord */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Voordelen Noord vs Zuid</h2>
              <div className="space-y-3">
                <div className="bg-success-50 border-l-4 border-success-500 p-3 rounded-sm">
                  <p className="text-success-800"><strong>Landschap:</strong> Bergen, natuur, wandelen</p>
                </div>
                <div className="bg-success-50 border-l-4 border-success-500 p-3 rounded-sm">
                  <p className="text-success-800"><strong>Premium:</strong> Betere restaurants, luxe</p>
                </div>
                <div className="bg-success-50 border-l-4 border-success-500 p-3 rounded-sm">
                  <p className="text-success-800"><strong>Privacy:</strong> Meer ruimte, minder toerisme</p>
                </div>
                <div className="bg-success-50 border-l-4 border-success-500 p-3 rounded-sm">
                  <p className="text-success-800"><strong>Beurs:</strong> Minder rente gangen</p>
                </div>
              </div>
            </section>

            {/* Wandelen */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Wandelen & Sport</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  <strong>Montgo:</strong> Berg nabij Jávea, 753m, veel paden, uitzicht zee
                </p>
                <p>
                  <strong>Ifach:</strong> Spectaculaire rotsformatie Calpe, 320m, gesport/wandelen
                </p>
                <p>
                  <strong>Kustpaden:</strong> Veel voetpaden langs kust, rustig, mooi
                </p>
                <p>
                  <strong>Zeilen:</strong> Jachthavens in Moraira, Dénia. Wind ideaal
                </p>
              </div>
            </section>

            {/* Praktisch */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Praktische info Noord</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Gemiddelde eigendom prijs</span>
                  <span>€600k - €1,5M</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Jaarlijkse kosten</span>
                  <span>€2.500 - €5.000+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Klimaat</span>
                  <span>15-26°C (iets koeler)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-sm border-l-4 border-accent-500">
                  <span className="font-semibold">Naar Alicante</span>
                  <span>80-100 km (1,5-2 uur)</span>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Noord verkennen</h2>
              <p className="text-warm-300 mb-6">
                We hebben luxe eigendommen en nieuwbouw projecten door heel Noord Costa Blanca.
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
              <Link href="/nl/guides/javea" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Jávea</h3>
                <p className="text-warm-600 text-sm">Grootste stad Noord</p>
              </Link>
              <Link href="/nl/guides/noord-vs-zuid" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Noord vs Zuid</h3>
                <p className="text-warm-600 text-sm">Vergelijking regio\'s</p>
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

import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hypotheek in Spanje voor Nederlanders | Financieringsguide 2026',
  description: 'Hoe krijg je een hypotheek in Spanje als niet-ingezetene. 60-70% LTV, ~3-4% rente. Nederlandse banken, Spaanse banken, requirements en aanvraging.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/mortgages',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/bolan-spanien',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
      'no': 'https://newbuildhomescostablanca.com/no/guides/boliglan',
    },
  },
};

const faqs = [
  {
    question: 'Kunnen Nederlanders een hypotheek krijgen in Spanje?',
    answer: 'Ja. Spaanse banken lenen graag aan buitenlanders, ook niet-ingezetenen. Als Nederlander heb je dezelfde kansen als andere EU-burgers. Je moet wel meer borg (30-40% in plaats van 20%) betalen dan Spaanse ingezetenen.',
  },
  {
    question: 'Wat is de maximale LTV voor niet-ingezetenen?',
    answer: 'EU/EEA niet-ingezetenen kunnen tot 70% LTV krijgen (30% borg). UK-burgers en niet-EU-burgers: 60-70% LTV (30-40% borg). LTV wordt berekend op basis van het laagste van koopprijs of bankschatting.',
  },
  {
    question: 'Wat zijn de huidige rentestanden?',
    answer: 'Vaste rente: ongeveer 3,5-4,5% voor 25 jaar. Variabele rente: Euribor + 1-2%. Gemengde rente: vast voor 3-10 jaar, daarna variabel. Prijzen schommelen; vraag je bank voor actuele aanbiedingen.',
  },
  {
    question: 'Hoeveel inkomsten moet ik hebben voor het goed te keuren?',
    answer: 'Je maandelijkse hypotheekbetaling mag meestal niet meer zijn dan 30-35% van je maandelijkse netto-inkomsten. Dit worden strikter getoetst dan in Nederland.',
  },
  {
    question: 'Kunnen Nederlandse banken ook hypotheken geven?',
    answer: 'Sommige Nederlandse banken werken met Spaanse partners voor financiering. ING en ABN AMRO hebben mogelijkheden. Meestal gaat het beter via Spaanse banken of een Spaanse hypotheekmakelaar.',
  },
  {
    question: 'Hoeveel documenten heb ik nodig?',
    answer: 'Veel. Paspoort, NIE, 2-3 jaar belastingaangiften, salarisbrieven (3-6 maanden), bankafschriften (3-6 maanden), werkcontract, bankgarantie beurs, schuldenverklaring. Alles moet naar het Spaans vertaald zijn.',
  },
  {
    question: 'Hoe lang duurt het hypotheekproces?',
    answer: 'Van aanvraag tot sleutelhandover: 6-10 weken. Pre-approval: 1-2 weken. Volledige aanvraag review: 2-4 weken. Taxatie: 1-2 weken. Formele aanbieding: 1 week. Dit kan sneller of langzamer gaan.',
  },
];

export default function HypotheekPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Hypotheek', url: 'https://newbuildhomescostablanca.com/nl/guides/hypotheek' },
  ]);

  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <nav className="text-sm mb-4 text-warm-200">
              <Link href="/nl/guides" className="hover:text-white">Gidsen</Link>
              <span className="mx-2">→</span>
              <span>Hypotheek</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Hypotheek in Spanje voor Nederlanders
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Alles wat je moet weten over financiering in Spanje. Rente, LTV, requirements en hoe je aanvraagt.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>10 min lezen</span>
              <span>•</span>
              <span>Bijgewerkt februari 2026</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Key Facts */}
            <div className="bg-primary-900 text-white rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4">Belangrijke feiten niet-ingezetenen (februari 2026)</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-warm-50 bg-opacity-10 rounded-sm p-4">
                  <div className="text-sm text-warm-300">Maximale LTV</div>
                  <div className="text-2xl font-light text-accent-500">60-70%</div>
                </div>
                <div className="bg-warm-50 bg-opacity-10 rounded-sm p-4">
                  <div className="text-sm text-warm-300">Gem. vaste rente (25jr)</div>
                  <div className="text-2xl font-light text-accent-500">~3,5-4%</div>
                </div>
                <div className="bg-warm-50 bg-opacity-10 rounded-sm p-4">
                  <div className="text-sm text-warm-300">Maximale looptijd</div>
                  <div className="text-2xl font-light text-accent-500">20-25 jaar</div>
                </div>
                <div className="bg-warm-50 bg-opacity-10 rounded-sm p-4">
                  <div className="text-sm text-warm-300">12-maands Euribor</div>
                  <div className="text-2xl font-light text-accent-500">~2,5%</div>
                </div>
              </div>
            </div>

            {/* Can Foreigners */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Kunnen buitenlanders een hypotheek krijgen?</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  <strong>Ja.</strong> Spaanse banken lenen graag aan buitenlanders, ook niet-ingezetenen. Of je uit het VK, EU, of elders komt, je kunt financiering krijgen.
                </p>
                <p>
                  Maar de voorwaarden zijn strikter dan in Nederland:
                </p>
                <ul className="space-y-2 ml-4">
                  <li><strong>Lagere LTV:</strong> Je moet 30-40% borg geven in plaats van 20%</li>
                  <li><strong>Meer documentatie:</strong> Banken willen veel bewijzen van stabiel inkomen</li>
                  <li><strong>Striktere betaalbaarheidscheck:</strong> Maandelijkse betaling max 30-35% van inkomsten</li>
                  <li><strong>Hogere rente:</strong> Iets hoger dan voor ingezetenen, maar nog steeds competitief</li>
                </ul>
              </div>
            </section>

            {/* LTV Limits */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Maximale lening-waarde ratio (LTV)</h2>
              <div className="bg-white rounded-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-warm-800 text-white">
                    <tr>
                      <th className="p-4 text-left">Type koper</th>
                      <th className="p-4 text-right">Maximale LTV</th>
                      <th className="p-4 text-right">Min. borg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Spaanse ingezetene</td>
                      <td className="p-4 text-right font-semibold">80%</td>
                      <td className="p-4 text-right">20%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">EU/EEA niet-ingezetene</td>
                      <td className="p-4 text-right font-semibold">70%</td>
                      <td className="p-4 text-right">30%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4">UK niet-ingezetene (post-Brexit)</td>
                      <td className="p-4 text-right font-semibold">60-70%</td>
                      <td className="p-4 text-right">30-40%</td>
                    </tr>
                    <tr>
                      <td className="p-4">Andere niet-EU (USA, Canada, etc.)</td>
                      <td className="p-4 text-right font-semibold">60-70%</td>
                      <td className="p-4 text-right">30-40%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-warm-600 text-sm">
                Opmerking: LTV is gebaseerd op het <strong>laagste</strong> van koopprijs of bankschatting. Als de bank het lager waardeert, krijg je minder geleend.
              </p>
            </section>

            {/* Interest Rates */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Rentestanden 2026</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Spaanse rentestanden zijn gestegen met ECB-renteverhogingen maar blijven competitief. Je kiest typisch tussen:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Vaste rente</h3>
                <ul className="space-y-2 ml-4">
                  <li>Rente blijft gelijk hele looptijd</li>
                  <li>Huidige bereik: <strong>3,5% - 4,5%</strong></li>
                  <li>Populair voor budgetzekerheid</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Variabele rente</h3>
                <ul className="space-y-2 ml-4">
                  <li>Gebaseerd op Euribor + bankmarges</li>
                  <li>Huidge bereik: <strong>Euribor + 1% tot 2%</strong></li>
                  <li>Lager initieel maar kan stijgen</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">Gemengde rente</h3>
                <ul className="space-y-2 ml-4">
                  <li>Vast voor eerste 3-10 jaar, daarna variabel</li>
                  <li>Goed compromis</li>
                </ul>
              </div>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Vereiste documenten</h2>
              <div className="bg-white rounded-sm p-6">
                <h3 className="font-semibold mb-4">Voor werknemers:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Geldig paspoort (kopie alle pagina\'s)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>NIE-nummer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Laatste 2-3 jaar belastingaangiften</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Laatste 3-6 maanden salarisbrieven</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Werkcontract of werkgeversbrief</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Laatste 3-6 maanden bankafschriften</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Bewijs van borgbeschikbaarheid</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Gegevens bestaande schulden/hypotheken</span>
                  </li>
                </ul>

                <h3 className="font-semibold mb-4">Voor zelfstandigen:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Alles bovenstaande, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Laatste 2-3 jaar bedrijfsrekeningen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Belastingaangiften bedrijf (2-3 jaar)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <span>Referentiebrief boekhoudkundig advies</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Dutch vs Spanish */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Spaanse hypotheek vs Nederlandse</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Als Nederlander ken je het NHG-systeem en hypotheekrenteaftrek. In Spanje werkt het anders:
                </p>
                <ul className="space-y-3 ml-4">
                  <li><strong>Geen NHG-equivalent:</strong> Maar wel bankgarantie voor nieuwbouw</li>
                  <li><strong>Geen hypotheekrenteaftrek:</strong> Je mag rente niet aftrekken (tenzij als zelfstandige)</li>
                  <li><strong>Lagere LTV norm:</strong> Voor niet-ingezetenen veel lager dan in Nederland</li>
                  <li><strong>Korter maximum:</strong> Meestal 20-25 jaar tegen NL 30-40 jaar</li>
                  <li><strong>Minder hypotheekmarkt:</strong> Minder aanbieders dan in Nederland</li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Wil je hypotheekvoorstel?</h2>
              <p className="text-warm-300 mb-6">
                We werken met hypotheekmakelaar Habeno die 15+ Spaanse banken vergelijkt. Zij vinden de beste voorwaarden voor jouw situatie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://habeno.com/form?hypido=1&partnerId=9f927d6f-7293-4f06-0de0-08dabb4ac15e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Hypotheek aanvragen
                </a>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-accent-500 text-accent-500 px-6 py-3 rounded-sm font-semibold hover:bg-accent-500/10 transition-colors text-center"
                >
                  WhatsApp
                </a>
              </div>
            </section>

          </div>
        </article>

        {/* FAQs Section */}
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

        {/* Related Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">Gerelateerde gidsen</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/nl/guides/koopproces" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Koopproces</h3>
                <p className="text-warm-600 text-sm">Stap-voor-stap aankoopgids</p>
              </Link>
              <Link href="/nl/guides/kosten-belasting" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Kosten & belastingen</h3>
                <p className="text-warm-600 text-sm">Volledige kostenbreuk</p>
              </Link>
              <Link href="/nl/guides/nie-nummer" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">NIE-nummer</h3>
                <p className="text-warm-600 text-sm">Je Spaanse belastingnummer</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

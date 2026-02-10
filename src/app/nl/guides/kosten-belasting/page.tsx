import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kosten en Belastingen bij Aankoop in Spanje | Nederlandse Gids 2026',
  description: 'Volledige gids voor alle kosten en belastingen bij het kopen van eigendom in Spanje. IVA 10%, zegelbelasting, notaris, advocaat. Nederlandse box 3 info.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/kosten-belasting',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/costs-taxes',
      nl: 'https://newbuildhomescostablanca.com/nl/guides/kosten-belasting',
    },
  },
};

const faqs = [
  {
    question: 'Hoeveel moet ik extra budgetteren boven de koopprijs?',
    answer: 'Voor nieuwbouw in Spanje budget je ongeveer 13-14% extra. Dit omvat IVA (10%), zegelbelasting (1,5%) en professionele kosten. Een eigendom van €300.000 kost dus ongeveer €339.000-€342.000 totaal.',
  },
  {
    question: 'Betaal ik IVA of overdrachtsbelasting?',
    answer: 'Bij nieuwbouw betaal je IVA (VAT) van 10%. Bij bestaande bouw betaal je overdrachtsbelasting (ITP) van 10%. Dit verschilt per aankoop type.',
  },
  {
    question: 'Moet ik als Nederlands eigenaar belastingen in Spanje betalen?',
    answer: 'Ja. Als niet-ingezetene betaal je jaarlijks vermogensbelasting (non-resident tax) op basis van de kadastrale waarde, ook als je het niet verhuurt. Dit is ongeveer €200-600/jaar.',
  },
  {
    question: 'Hoe rapporteer ik mijn Spaanse eigendom aan de Nederlandse Belastingdienst?',
    answer: 'Buitenlands vermogen boven bepaalde grenzen moet in box 3 worden gerapporteerd. Je geeft de waarde op van je eigendom in je jaarlijkse aangifte. Vraag je belastingadviseur voor details.',
  },
  {
    question: 'Welke jaarlijkse kosten heb ik?',
    answer: 'IBI (gemeentebelasting): €300-800/jaar. Gemeentelijke afvalverwijdering: €50-150/jaar. Gemeenschapskosten: €600-2.400/jaar. Niet-inwonerbelasting: €200-600/jaar. Verzekering: €200-500/jaar.',
  },
  {
    question: 'Kan mijn advocaat de notariskosten onderhandelen?',
    answer: 'Nee, notariskosten zijn vastgesteld door de regering volgens een officiële schaal. Daar kun je niet onderhandelen. Wel kun je de advocaatkosten bespreken.',
  },
  {
    question: 'Betaal ik inkomstenbelasting als ik het pand verhuur?',
    answer: 'Ja. Als niet-ingezetene betaal je 24% inkomstenbelasting over bruto-huuropbrengst (geen aftrekken mogelijk). EU-ingezetenen (waaronder Nederlanders) kunnen 19% betalen op netto-winst met inkomstenaftrekken.',
  },
];

export default function KostenBelastingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Kosten & belastingen', url: 'https://newbuildhomescostablanca.com/nl/guides/kosten-belasting' },
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
              <span>Kosten & belastingen</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Kosten en Belastingen Eigendom Spanje
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Volledige kostenbreuk voor het kopen van nieuwbouw. Weet precies wat je buiten de koopprijs betaalt.
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

            {/* Summary Box */}
            <div className="bg-primary-900 text-white rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-4">Snelle samenvatting: Totale kosten</h2>
              <p className="mb-4">
                Bij aankoop van <strong>nieuwbouw in Spanje</strong>, budget ongeveer <strong>13-14%</strong> extra op de koopprijs voor belastingen, kosten en advocaat.
              </p>
              <div className="text-3xl font-light text-accent-500">
                €300.000 eigendom = ~€339.000-€342.000 totaal
              </div>
            </div>

            {/* Purchase Taxes */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Aanschaffingsbelastingen</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  De belastingen hangen af of je <strong>nieuwbouw</strong> of <strong>bestaande bouw</strong> koopt. Voor nieuwbouw betaal je IVA en zegelbelasting.
                </p>

                <div className="bg-white rounded-sm p-6 my-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-4">Nieuwbouw</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3"><strong>IVA (BTW)</strong></td>
                        <td className="py-3 text-right"><strong>10%</strong></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">
                          <strong>AJD (Zegelbelasting)</strong>
                          <p className="text-sm text-warm-500">Valencia-regio</p>
                        </td>
                        <td className="py-3 text-right"><strong>1,5%</strong></td>
                      </tr>
                      <tr className="bg-accent-50">
                        <td className="py-3 font-bold">Totale belasting</td>
                        <td className="py-3 text-right font-bold text-accent-600">11,5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="font-semibold text-yellow-800">Let op:</p>
                  <p className="text-yellow-700">Belastingtarieven verschillen per regio. Bovenstaande geldt voor Valencia (Costa Blanca). Andere regio\'s kunnen afwijken.</p>
                </div>
              </div>
            </section>

            {/* Professional Fees */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Professionele kosten</h2>

              <div className="space-y-6">
                {/* Notary */}
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-2">Notariskosten</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisch bereik:</span>
                    <span className="font-bold text-lg">€600 - €1.500</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Vastgesteld door overheid volgens officiële schaal. Omvat voorbereiding en getuigenis van de eigendomsdocumenten.
                  </p>
                </div>

                {/* Land Registry */}
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-2">Landsregister inschrijving</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisch bereik:</span>
                    <span className="font-bold text-lg">€400 - €800</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Officiële inschrijving van je eigendom. Ook gebaseerd op overheidsschaal.
                  </p>
                </div>

                {/* Legal Fees */}
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-2">Advocaatkosten</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisch tarief:</span>
                    <span className="font-bold text-lg">1% - 1,5% + IVA</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Onafhankelijke juridische vertegenwoordiging. Sterk aanbevolen. Minimum €1.500.
                  </p>
                </div>

                {/* Gestoría */}
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-2">Gestoría (administratief agent)</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-warm-700">Typisch bereik:</span>
                    <span className="font-bold text-lg">€300 - €500</span>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Regelt papierwerk zoals belastingen, nutsvoorzieningen, NIE-aanvragen. Vaak in advocaatkosten inbegrepen.
                  </p>
                </div>
              </div>
            </section>

            {/* Complete Cost Breakdown */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Volledige kostenbreuk voorbeeld</h2>
              <div className="bg-white border border-warm-200 rounded-sm overflow-hidden">
                <div className="bg-warm-800 text-white p-4">
                  <h3 className="font-semibold">Voorbeeld: €300.000 nieuwbouw appartement</h3>
                </div>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">Koopprijs</td>
                      <td className="p-4 text-right font-semibold">€300.000</td>
                    </tr>
                    <tr className="border-b bg-warm-50">
                      <td className="p-4 font-semibold">Belastingen</td>
                      <td className="p-4 text-right font-semibold"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">IVA (10%)</td>
                      <td className="p-4 text-right">€30.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">AJD zegelbelasting (1,5%)</td>
                      <td className="p-4 text-right">€4.500</td>
                    </tr>
                    <tr className="border-b bg-warm-50">
                      <td className="p-4 font-semibold">Professionele kosten</td>
                      <td className="p-4 text-right font-semibold"></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Notaris</td>
                      <td className="p-4 text-right">€1.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Landsregister</td>
                      <td className="p-4 text-right">€600</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Advocaatkosten (1% + IVA)</td>
                      <td className="p-4 text-right">€3.630</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 pl-8">Gestoría</td>
                      <td className="p-4 text-right">€400</td>
                    </tr>
                    <tr className="bg-accent-600 text-white">
                      <td className="p-4 font-bold">TOTAAL</td>
                      <td className="p-4 text-right font-bold text-xl">€340.130</td>
                    </tr>
                    <tr className="bg-primary-50">
                      <td className="p-4 text-primary-900">Extra kosten als % van prijs</td>
                      <td className="p-4 text-right font-bold text-primary-900">13,4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ongoing Costs */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Jaarlijkse kosten</h2>
              <div className="text-warm-700 mb-6">
                <p>Zodra je eigendom hebt in Spanje, heb je jaarlijkse kosten:</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-sm border-l-4 border-accent-500">
                  <div>
                    <strong>IBI (Gemeentebelasting)</strong>
                    <p className="text-sm text-warm-600">Onroerend goedsbelasting</p>
                  </div>
                  <span className="font-semibold">€300-800/jaar</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-sm border-l-4 border-accent-500">
                  <div>
                    <strong>Afvalverwijdering</strong>
                    <p className="text-sm text-warm-600">Jaarlijkse vuilnisbakvergoeding</p>
                  </div>
                  <span className="font-semibold">€50-150/jaar</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-sm border-l-4 border-accent-500">
                  <div>
                    <strong>Gemeenschapskosten</strong>
                    <p className="text-sm text-warm-600">Onderhoud, zwembad, tuinen, etc.</p>
                  </div>
                  <span className="font-semibold">€600-2.400/jaar</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-sm border-l-4 border-accent-500">
                  <div>
                    <strong>Huisverzekering</strong>
                    <p className="text-sm text-warm-600">Opstal en inventaris</p>
                  </div>
                  <span className="font-semibold">€200-500/jaar</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white rounded-sm border-l-4 border-accent-500">
                  <div>
                    <strong>Niet-inwonerbelasting</strong>
                    <p className="text-sm text-warm-600">Als je het niet verhuurt</p>
                  </div>
                  <span className="font-semibold">€200-600/jaar</span>
                </div>
              </div>
            </section>

            {/* Dutch Tax Info */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Nederlandse belastingmeldingen</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Als Nederlander heb je extra belastingverplichtingen in Nederland waar je kennis van moet hebben:
                </p>
                <ul className="space-y-3 ml-4">
                  <li><strong>Box 3 vermogensbelasting:</strong> Buitenlands vermogen boven bepaalde grenzen moet in box 3 worden gerapporteerd. Het Spaanse eigendom kan hier onder vallen.</li>
                  <li><strong>Opgave buitenlands vermogen:</strong> Bedragen boven bepaalde drempels (meestal €50.000) moet je opgeven in je jaarlijkse aangifte.</li>
                  <li><strong>Eigenwoningforfait:</strong> Je kunt geen eigenwoningforfait claimen als je het pand niet permanent bewoont.</li>
                  <li><strong>Inkomstenbelasting verhuur:</strong> Huurinkomsten zijn belast in box 1 tegen uw marginale belastingtarief.</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-900 p-4 my-6">
                  <p className="font-semibold text-primary-900">Advies:</p>
                  <p className="text-primary-800">Raadpleeg een Nederlandse belastingadviseur voordat je koopt om volledige inzicht in alle verplichtingen te krijgen.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Wil je een persoonlijke kostenbegroting?</h2>
              <p className="text-warm-300 mb-6">
                Krijg een nauwkeurige berekening van alle kosten voor jouw specifieke eigendom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/nl/contact"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Kosten aanvragen
                </Link>
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
              <Link href="/nl/guides/nie-nummer" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">NIE-nummer</h3>
                <p className="text-warm-600 text-sm">Je Spaanse belastingnummer</p>
              </Link>
              <Link href="/nl/guides/hypotheek" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Hypotheek</h3>
                <p className="text-warm-600 text-sm">Financiering voor buitenlanders</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

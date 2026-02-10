import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kosten en Belastingen | Gids voor Belgische Kopers 2026',
  description: 'Volledige uitsplitsing van kosten voor aankoop van Spaans vastgoed voor Belgische kopers. IVA, AJD, notariskosten, en Belgische belastingverplichtingen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/kosten-belasting',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/costs-taxes',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kosten-belasting',
    },
  },
};

const faqs = [
  {
    question: 'Hoeveel kost het totaal om vastgoed in Spanje te kopen?',
    answer: 'Naast de koopprijs, kunt u verwachten: 6-8% voor IVA en AJD (nieuwe bouw), 2-3% notariskosten, 1-2% juridische kosten, en ongeveer 0,5% inschrijvingskosten. Voor resale: ongeveer 6-7% aanvullende kosten. Totaal: plan voor 8-11% extra op de koopprijs.',
  },
  {
    question: 'Wat is IVA en waarom betaal ik dit?',
    answer: 'IVA is de Spaanse btw (Impuesto sobre el Valor Añadido). Voor nieuwbouw is dit 10% (voor primaire woningen). Dit wordt berekend op de koopprijs en betaald bij eigendomsoverdracht. Dit is standaard in Spanje en vergelijkbaar met btw in België.',
  },
  {
    question: 'Wat is AJD en waarom is dit extra?',
    answer: 'AJD (Actos Jurídicos Documentados) is een Spaanse stempel/registratiebelasting. Dit is ongeveer 0,5-1% en betaalt u op het notariële document. Dit is een Spaanse provinciale belasting.',
  },
  {
    question: 'Moet ik belasting betalen in België op mijn Spaanse woning?',
    answer: 'Ja, als Belgische inwoner moet u de Spaanse woning aangeven bij FOD Financiën. U betaalt belasting over het kadastraal inkomen (waarderingsstelsel). Wat u precies betaalt hangt af van uw totale Belgische inkomsten en het Dubbelbelastingverdrag België-Spanje.',
  },
  {
    question: 'Wat is kadastraal inkomen?',
    answer: 'Kadastraal inkomen is de geschatte huurwaarde van uw Spaanse woning volgens Spaanse belastingmiddelen. Dit is niet de werkelijke huurwaarde, maar een theoretische waarde. U betaalt belasting over dit bedrag, zelfs als u het niet verhuurt.',
  },
  {
    question: 'Hoe wordt mijn Belgische belasting berekend?',
    answer: 'FOD Financiën ziet het kadastraal inkomen als inkomsten. Dit wordt bij uw totale Belgische inkomsten opgeteld. U betaalt daarover de gebruikelijke personenbelasting. Het Dubbelbelastingverdrag voorkomt dubbele belasting - u kunt Spaanse belasting die u betaalt aftrekken.',
  },
  {
    question: 'Wat als ik mijn Spaanse woning verhuurt?',
    answer: 'Dan moet u de werkelijke huurinkomsten aangeven in België. Dit wordt ook belast. U kunt onderhoudskosten en hypotheekrenten aftrekken. U moet ook in Spanje belasting betalen over de huurinkomsten (IVA en inkomstenbelasting).',
  },
  {
    question: 'Hoeveel kosten notariskosten ongeveer?',
    answer: 'Notariskosten zijn doorgaans 0,3-0,5% van de koopprijs. Dit is vastgesteld tarief in Spanje. Voor woning van 300.000 euro: ongeveer 900-1.500 euro.',
  },
];

export default function KostenBelastingPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Kosten & Belastingen', url: 'https://newbuildhomescostablanca.com/nl-be/guides/kosten-belasting' },
  ]);
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Kosten & Belastingen</h1>
            <p className="text-xl text-warm-200 mb-4">Volledige breakdown voor Belgische kopers</p>
            <p className="text-lg text-warm-300">
              Begrijp exact wat u zult betalen - van aankoop tot jaarlijkse belastingen in België en Spanje.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Purchase Costs */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Aankoopkosten (Éénmalig)</h2>

              <div className="space-y-4 mb-8">
                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">IVA (Impuesto sobre el Valor Añadido)</h3>
                    <span className="text-accent-600 font-semibold">10% (nieuwbouw)</span>
                  </div>
                  <p className="text-warm-700 text-sm">
                    Spaanse btw op nieuwe woningen. Dit is 10% voor primaire woningen, 21% voor investeringsvastgoed. Dit wordt berekend op de koopprijs en betaald bij eigendomsoverdracht.
                  </p>
                  <p className="text-accent-600 text-sm mt-2 font-semibold">Voorbeeld: 300.000 woning = 30.000 euro IVA</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">AJD (Stempel/Registratiebelasting)</h3>
                    <span className="text-accent-600 font-semibold">0,5-1%</span>
                  </div>
                  <p className="text-warm-700 text-sm">
                    Provinciale stempelbelasting in Spanje. Dit is vastgesteld en hangt af van de Spaanse provincie. Betaald bij eigendomsoverdracht.
                  </p>
                  <p className="text-accent-600 text-sm mt-2 font-semibold">Voorbeeld: 300.000 woning = 1.500-3.000 euro</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Notariskosten</h3>
                    <span className="text-accent-600 font-semibold">0,3-0,5%</span>
                  </div>
                  <p className="text-warm-700 text-sm">
                    Vastgestelde tarief in Spanje voor notariële akte (schrijver van eigendomsoverdracht). Dit is onderdeel van het notariële proces.
                  </p>
                  <p className="text-accent-600 text-sm mt-2 font-semibold">Voorbeeld: 300.000 woning = 900-1.500 euro</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Juridische & Advieskosten</h3>
                    <span className="text-accent-600 font-semibold">1-2%</span>
                  </div>
                  <p className="text-warm-700 text-sm">
                    Kosten voor juridisch vertegenwoordiger, eigendomsonderzoek, advies en coördinatie. Dit hangt af van wat u laat doen.
                  </p>
                  <p className="text-accent-600 text-sm mt-2 font-semibold">Voorbeeld: 300.000 woning = 3.000-6.000 euro</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Inschrijvingskosten</h3>
                    <span className="text-accent-600 font-semibold">0,3-0,5%</span>
                  </div>
                  <p className="text-warm-700 text-sm">
                    Kosten voor inschrijving in het Spaanse eigendomsregister (Registro de la Propiedad). Dit formaliseert uw eigendom.
                  </p>
                  <p className="text-accent-600 text-sm mt-2 font-semibold">Voorbeeld: 300.000 woning = 900-1.500 euro</p>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Bankkosten (Hypotheek)</h3>
                    <span className="text-accent-600 font-semibold">0,3-1%</span>
                  </div>
                  <p className="text-warm-700 text-sm">
                    Bankkosten voor hypotheekverwerking (taxatie, proceskosten). Dit hangt af van uw bank en hypotheekbedrag.
                  </p>
                  <p className="text-accent-600 text-sm mt-2 font-semibold">Voorbeeld: 300.000 woning = 900-3.000 euro</p>
                </div>
              </div>

              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                <h3 className="font-semibold text-primary-900 mb-4">Totale Aankoopkosten Voorbeeld</h3>
                <div className="space-y-2 text-warm-700">
                  <div className="flex justify-between border-b border-accent-200 pb-2">
                    <span>Koopprijs</span>
                    <span className="font-semibold">300.000</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-200 pb-2">
                    <span>IVA (10%)</span>
                    <span className="font-semibold">30.000</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-200 pb-2">
                    <span>AJD (0,75%)</span>
                    <span className="font-semibold">2.250</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-200 pb-2">
                    <span>Notaris + Juridisch (2%)</span>
                    <span className="font-semibold">6.000</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-200 pb-2">
                    <span>Overige kosten (1%)</span>
                    <span className="font-semibold">3.000</span>
                  </div>
                  <div className="flex justify-between pt-2 text-accent-600 font-bold">
                    <span>TOTAAL BETALING</span>
                    <span>341.250</span>
                  </div>
                  <p className="text-sm text-warm-600 pt-4">Dit is ongeveer 13.8% extra op de koopprijs</p>
                </div>
              </div>
            </div>

            {/* Jaarlijkse Belastingen */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Jaarlijkse Belastingen</h2>

              <div className="bg-primary-50 rounded-sm p-6 border border-primary-200 mb-6">
                <h3 className="font-semibold text-primary-900 mb-3">Spaanse Belastingen (Jaarlijks):</h3>
                <div className="space-y-3 text-warm-700">
                  <p>
                    <span className="font-semibold">IBI (Impuesto sobre Bienes Inmuebles):</span> Spaanse onroerendgoedbelasting. Dit is ongeveer 0,4-0,8% van de geschatte waarde per jaar. Voor woning van 300.000: ongeveer 1.200-2.400 euro/jaar.
                  </p>
                  <p>
                    <span className="font-semibold">Gemeentelijke Lasten:</span> Afvalbeheer, water, riolering. Dit varieert per gemeente. Tussen 300-800 euro/jaar voor normale woning.
                  </p>
                </div>
              </div>

              <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                <h3 className="font-semibold text-primary-900 mb-3">Belgische Belastingen (Jaarlijks):</h3>
                <div className="space-y-3 text-warm-700">
                  <p>
                    <span className="font-semibold">Personenbelasting over Kadastraal Inkomen:</span> U moet Spaanse eigendom aangeven bij FOD Financiën. Het kadastraal inkomen wordt belast. Dit varieert sterk naar inkomens schaal, maar komt doorgaans neer op 20-30% van het kadastraal inkomen. Voor woning met kadastraal inkomen van 5.000 euro: ongeveer 1.000-1.500 euro/jaar.
                  </p>
                  <p>
                    <span className="font-semibold">Dubbelbelastingverdrag:</span> België en Spanje hebben verdrag om dubbele belasting te voorkomen. Wat u in Spanje betaalt, kunt u in België aftrekken (tot bepaalde limiet).
                  </p>
                </div>
              </div>
            </div>

            {/* Belgian Tax Reporting */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Belgische Belastingmeldingen</h2>
              <p className="text-warm-700 mb-4">
                Dit is belangrijk en vaak vergeten door Belgische kopers. U bent verplicht dit aan FOD Financiën te melden:
              </p>
              <ul className="list-disc list-inside space-y-3 text-warm-700 ml-4 mb-6">
                <li>
                  <span className="font-semibold">Aankoop zelf:</span> Binnen enkele maanden na aankoop moet u de aankoop melden bij FOD Financiën. Dit gebeurt via aangifte van buitenlandse waarden.
                </li>
                <li>
                  <span className="font-semibold">Jaarlijkse aangifte:</span> In uw jaarlijkse belastingaangifte (formulier 401) moet u het kadastraal inkomen vermelden. Dit wordt belast als inkomsten.
                </li>
                <li>
                  <span className="font-semibold">Box 3 vermogen:</span> De waarde van uw Spaanse eigendom moet soms ook gerapporteerd worden in Box 3 vermogen (afhankelijk van totale vermogen).
                </li>
              </ul>

              <div className="bg-warm-100 rounded-sm p-6 border border-warm-300">
                <h3 className="font-semibold text-primary-900 mb-3">Wij Adviseren:</h3>
                <p className="text-warm-700">
                  Werk met uw Belgische belastingconsulent of accountant. Laat hen alle documenten van de aankoop zien. Zij kunnen zorgen dat u correct aangeeft en eventuele voordelen van het dubbelbelastingverdrag maximaliseert.
                </p>
              </div>
            </div>

            {/* Resale vs New Build */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Nieuwbouw vs Resale - Kostenverschil</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Nieuwbouw Kosten:</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li className="flex justify-between">
                      <span>IVA (10%)</span>
                      <span>10%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>AJD</span>
                      <span>0,5-1%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Notaris & Juridisch</span>
                      <span>1,5-2%</span>
                    </li>
                    <li className="flex justify-between border-t border-warm-200 pt-2 font-bold">
                      <span>Totaal</span>
                      <span>12-13%</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Resale Kosten:</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li className="flex justify-between">
                      <span>Transferbelasting (6-8%)</span>
                      <span>6-8%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>AJD</span>
                      <span>0,5-1%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Notaris & Juridisch</span>
                      <span>1,5-2%</span>
                    </li>
                    <li className="flex justify-between border-t border-warm-200 pt-2 font-bold">
                      <span>Totaal</span>
                      <span>8-11%</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-warm-700 text-sm mt-6">
                Nieuwbouw heeft meestal iets hoger aankoopkosten (IVA 10%), maar geen transferbelasting. Resale heeft lagere IVA (inbegrepen), maar lagere transferbelasting. Het verschil is klein.
              </p>
            </div>

            {/* FAQs */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-8">Veelgestelde Vragen</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-warm-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                    <p className="text-warm-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Planning */}
            <div className="bg-primary-50 rounded-sm p-8 shadow-sm mb-12 border border-primary-200">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Planning: Budget Checklist</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold">1</div>
                  <div>
                    <p className="font-semibold text-primary-900">Bereken totale aankoop budget</p>
                    <p className="text-sm text-warm-600">Koopprijs × 1,10 tot 1,15 voor alle aankoopkosten</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold">2</div>
                  <div>
                    <p className="font-semibold text-primary-900">Controleer jaarlijkse kosten</p>
                    <p className="text-sm text-warm-600">IBI + gemeentelijke lasten + Belgische belasting = jaarlijkse verplichting</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold">3</div>
                  <div>
                    <p className="font-semibold text-primary-900">Werk met belastingadviseur</p>
                    <p className="text-sm text-warm-600">Laat uw Belgische accountant alles controleren</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold">4</div>
                  <div>
                    <p className="font-semibold text-primary-900">Zorg voor liquide middelen</p>
                    <p className="text-sm text-warm-600">Plan alle betalingen, inclusief notaris en juridische kosten</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Advies Over Kosten & Belastingen</h2>
              <p className="text-warm-200 mb-6">
                Onze experts helpen u begrijpen wat u precies zult betalen en hoe dit uw Belgische belastingen beïnvloedt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/nl-be/contact">
                  <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                    Plan Adviesgesprek
                  </button>
                </Link>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white hover:bg-warm-100 text-primary-900 font-semibold py-3 px-8 rounded-sm transition-colors">
                    WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Guides */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-warm-200">
          <div className="max-w-4xl mx-auto">
            <Link href="/nl-be/guides" className="text-accent-600 hover:text-accent-700 font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Gidsen
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

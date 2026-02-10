import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Woonkrediet in Spanje voor Belgen | Financieringsgids 2026',
  description: 'Hoe krijg u een woonkrediet (hypotheek) in Spanje als Belgische koper? Vergelijk Belgische banken (KBC, Belfius, BNP Paribas Fortis) en Spaanse financiering.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/mortgages',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/bolan-spanien',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/hypotheek',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/hypotheque',
      'no': 'https://newbuildhomescostablanca.com/no/guides/boliglan',
      'x-default': 'https://newbuildhomescostablanca.com/guides/mortgages',
    },
  },
};

const faqs = [
  {
    question: 'Kan ik als Belgische koper een woonkrediet krijgen in Spanje?',
    answer: 'Ja, zeker. Veel Belgische banken financieren aankopen in Spanje (KBC, Belfius, BNP Paribas Fortis, ING België). U kunt ook rechtstreeks met Spaanse banken werken (CaixaBank, BBVA, Santander). U moet wel alle vereisten van de bank vervullen.',
  },
  {
    question: 'Hoeveel hypotheek kan ik maximaal krijgen?',
    answer: 'Dit hangt af van uw inkomens en de waarde van de eigendom. Doorgaans financieren banken tot 70-80% van de waarde. U moet zelf 20-30% inbrengen. Dit varieert per bank en uw persoonlijke financiële situatie.',
  },
  {
    question: 'Welke documenten heeft de bank nodig?',
    answer: 'Bankuittreksels van laatste 3 maanden, aanslagbiljet personenbelasting (vorig jaar), loonfiches van laatste 3 maanden (of belastingaangifte als zelfstandige), identificatiedocumenten, en soms werkgeversverklaring. Spaanse banken vragen soms extra bewijzen van vermogen.',
  },
  {
    question: 'Hoe lang duurt de hypotheekgoedkeuring?',
    answer: 'Doorgaans 2-4 weken. Dit hangt af van hoe snel u alle documenten inlevert en hoe snel de bank de beoordeling afrondt. Zorg dat u dit vroeg in het koopproces aanvraagt.',
  },
  {
    question: 'Wat zijn typische rentevoeten?',
    answer: 'Voor Belgische banken: 3.2-4.8%. Voor Spaanse banken: vergelijkbaar (3.0-4.5%). Dit varieert met marktrente. Vast of variabel zijn beide beschikbaar. Vraag beide opties aan uw bank.',
  },
  {
    question: 'Moet ik volledige hypotheek in Spanje krijgen?',
    answer: 'Nee, u kunt ook een Belgische persoonlijke lening nemen en in contanten betalen. Sommige Belgische kopers doen dit. Dit kan voordelig zijn afhankelijk van rentevoeten en uw Belgische vermogenssituatie.',
  },
  {
    question: 'Wat is kadastraal inkomen en hoe beïnvloedt dit hypotheek?',
    answer: 'Kadastraal inkomen is geschatte huurwaarde volgens Spaanse belastingen. Dit beïnvloedt wat u in Spanje en België betaalt. Spaanse banken kijken hier soms naar voor hypotheekbeoordeling. Lagere kadastraal inkomen = beter voor uw belastingen.',
  },
  {
    question: 'Wat zijn andere kosten van hypotheek?',
    answer: 'Bankkosten voor verwerking (0,3-1%), taxatiekosten (300-600 euro), verzekering (doorgaans verplicht), en mogelijk juridische kosten. Vraag totale kosten vooraf aan uw bank.',
  },
];

export default function HypotheekPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Woonkrediet', url: 'https://newbuildhomescostablanca.com/nl-be/guides/hypotheek' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Woonkrediet in Spanje</h1>
            <p className="text-xl text-warm-200 mb-4">Financieringsgids voor Belgische kopers</p>
            <p className="text-lg text-warm-300">
              Begrijp hoe u een woonkrediet krijgt, welke banken beschikbaar zijn, en wat dit kost.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Belgische Banken */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Belgische Banken - Woonkrediet voor Spanje</h2>
              <p className="text-warm-700 mb-6">
                Veel Belgische banken bieden hypotheken voor buitenlands vastgoed. Dit kan voordelig zijn omdat u in uw eigen taal werkt en uw Belgische situatie goed kennen.
              </p>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">KBC Bank</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Hypotheken voor buitenlands vastgoed tot 80% LTV</li>
                    <li>Rentevoet: 3.5-4.5% (afhankelijk van voorwaarden)</li>
                    <li>Snelle verwerking (2-3 weken)</li>
                    <li>Vaste of variabele rente beschikbaar</li>
                    <li>Nederlandse sprekers beschikbaar</li>
                  </ul>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">Belfius Bank</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Ervaring met Belgische kopers in Spanje</li>
                    <li>Hypotheken tot 70% van eigendomswaarde</li>
                    <li>Rentevoet: 3.2-4.8% (variabel)</li>
                    <li>Flexibele voorwaarden</li>
                    <li>Goede ondersteuning in Nederlands</li>
                  </ul>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">BNP Paribas Fortis</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Internationale ervaring met buitenlands vastgoed</li>
                    <li>Hypotheken tot 80% LTV</li>
                    <li>Rentevoet: 3.8-4.6%</li>
                    <li>Vaste looptijden van 5 tot 30 jaar</li>
                    <li>Efficiënte verwerking</li>
                  </ul>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">ING België</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Hypotheken voor Spaans vastgoed</li>
                    <li>Tot 75% LTV</li>
                    <li>Rentevoet: 3.6-4.7%</li>
                    <li>Persoonlijke bediening</li>
                    <li>Flexibele aflossing mogelijk</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Spaanse Banken */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Spaanse Banken - Lokale Financiering</h2>
              <p className="text-warm-700 mb-6">
                U kunt ook rechtstreeks met Spaanse banken werken. Dit kan voordelen hebben, vooral voor lange termijn financiering. Veel Belgische kopers kiezen dit omdat de processen soepel verlopen.
              </p>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">CaixaBank</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Grote bank in Costa Blanca regio</li>
                    <li>Veel ervaring met buitenlanders</li>
                    <li>Hypotheken tot 80% voor primaire woning</li>
                    <li>Rentevoet: 3.0-4.2%</li>
                    <li>Snelle verwerking (2-3 weken)</li>
                  </ul>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">BBVA</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Landwijd netwerk in Spanje</li>
                    <li>Hypotheken voor buitenlanders</li>
                    <li>Tot 75% LTV</li>
                    <li>Rentevoet: 3.2-4.5%</li>
                    <li>Online bediening beschikbaar</li>
                  </ul>
                </div>

                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">Santander</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Grote Spaanse bank</li>
                    <li>Hypotheken tot 80% voor hoofd woningen</li>
                    <li>Rentevoet: 3.1-4.3%</li>
                    <li>Goed voor langetermijn financiering</li>
                    <li>Veel kantoren op Costa Blanca</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Vereisten voor Woonkrediet</h2>

              <div className="space-y-6">
                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Financiële Vereisten:</h3>
                  <ul className="list-disc list-inside space-y-3 text-warm-700 ml-2">
                    <li>Stabiel inkomen (werknemers of zelfstandigen)</li>
                    <li>Aanslagbiljet personenbelasting (vorig jaar) - dit is cruciaal</li>
                    <li>Bankuittreksels van laatste 3 maanden (tonen inkomsten)</li>
                    <li>Loonfiches van vorige 3 maanden (werknemers)</li>
                    <li>Belastingaangifte (zelfstandigen)</li>
                    <li>Geen grote schulden of negatieve kredietwaardigheid</li>
                  </ul>
                </div>

                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Documenten die U Moet Verzamelen:</h3>
                  <ul className="list-disc list-inside space-y-3 text-warm-700 ml-2">
                    <li>Kopie van identiteitskaart/paspoort</li>
                    <li>Bewijs van Belgisch adres (elektriciteitsnota)</li>
                    <li>Arbeidsovereenkomst of registratie als zelfstandige</li>
                    <li>Jaarlijkse balans (zelfstandigen)</li>
                    <li>Koopovereenkomst (ontvangen van vastgoedadviseur)</li>
                    <li>Taxatierapport van eigendom (bank zal dit aanvragen)</li>
                  </ul>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Wat Banken Controleren:</h3>
                  <ul className="list-disc list-inside space-y-3 text-warm-700 ml-2">
                    <li>Inkomens-schuldratio (doorgaans max 35-40% van netto-inkomen)</li>
                    <li>Krediethistorie (BKR controle, eventueel Spaanse equivalent)</li>
                    <li>Werkzekerheid (vaste contracten krijgen voorkeur)</li>
                    <li>Geplande betaling vs inkomsten</li>
                    <li>Totaal vermogen en bestaande schulden</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Stappen voor Woonkrediet Aanvragen</h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Contacteer Bank</h3>
                    <p className="text-warm-700">Bel uw bank (KBC, Belfius, etc.) en vraag naar hypotheken voor Spaans vastgoed. Vraag naar rentetarieven en voorwaarden.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Verzamel Documenten</h3>
                    <p className="text-warm-700">Zorg dat u alle vereiste documenten hebt. Dit zijn meestal: belastingpapieren, bankuittreksels, loonfiches, identiteitsdocumenten.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Dien Aanvraag in</h3>
                    <p className="text-warm-700">Dien alle documenten in bij uw bank. Veel banken accepteren dit online of per post. Zorg voor goede kopieën.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Taxatie van Eigendom</h3>
                    <p className="text-warm-700">De bank zal een taxatie van de Spaanse eigendom aanvragen. Dit duurt doorgaans 1-2 weken. De eigenaar of vastgoedadviseur regelt dit.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Hypotheekvoorstel Ontvangen</h3>
                    <p className="text-warm-700">De bank stuurt u een voorstel met exacte rentevoet, maandelijkse betaling, looptijd en voorwaarden. Lees dit zorgvuldig.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">6</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Onderteken Overeenkomst</h3>
                    <p className="text-warm-700">U ondertekent de hypotheekovereenkomst. Dit kan per post of via uw bank. Dit is bindend.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold">7</div>
                  <div>
                    <h3 className="font-semibold text-primary-900 mb-2">Notarieel Akkoord</h3>
                    <p className="text-warm-700">Bij eigendomsoverdracht (notariële akte) wordt de hypotheek formeel geregistreerd. Het bedrag wordt vervolgens uitbetaald.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kosten */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Kosten van Woonkrediet</h2>

              <div className="space-y-4 mb-6">
                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Afsluitkosten</h3>
                    <span className="text-accent-600 font-semibold">0,3-0,5%</span>
                  </div>
                  <p className="text-warm-700 text-sm">Eenmalige kosten van de bank voor beoordeling en verwerking van uw aanvraag.</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Taxatiekosten</h3>
                    <span className="text-accent-600 font-semibold">300-600</span>
                  </div>
                  <p className="text-warm-700 text-sm">Kosten voor onafhankelijke taxatie van de eigendom.</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Hypotheekbewijs</h3>
                    <span className="text-accent-600 font-semibold">100-200</span>
                  </div>
                  <p className="text-warm-700 text-sm">Kosten voor registratie van hypotheek in Spaans register.</p>
                </div>

                <div className="border-b border-warm-200 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Verzekeringen</h3>
                    <span className="text-accent-600 font-semibold">Jaarlijks</span>
                  </div>
                  <p className="text-warm-700 text-sm">Doorgaans verplicht: woonhuisverzekering, soms hypotheekbeschermingsverzekering. Dit wordt maandelijks betaald.</p>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary-900">Juridische Kosten (Spanje)</h3>
                    <span className="text-accent-600 font-semibold">400-800</span>
                  </div>
                  <p className="text-warm-700 text-sm">Kosten voor juridische voorbereiding van hypotheekstukken in Spanje.</p>
                </div>
              </div>

              <div className="bg-warm-100 rounded-sm p-6 border border-warm-300">
                <h3 className="font-semibold text-primary-900 mb-3">Voorbeeld Totale Kosten</h3>
                <div className="space-y-2 text-warm-700 text-sm">
                  <div className="flex justify-between border-b border-warm-300 pb-2">
                    <span>Hypotheekbedrag: 200.000 euro</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-300 pb-2">
                    <span>Afsluitkosten (0,4%)</span>
                    <span>800</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-300 pb-2">
                    <span>Taxatie</span>
                    <span>500</span>
                  </div>
                  <div className="flex justify-between border-b border-warm-300 pb-2">
                    <span>Juridische kosten</span>
                    <span>600</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold text-accent-600">
                    <span>TOTAAL EENMALIG</span>
                    <span>1.900</span>
                  </div>
                  <p className="text-warm-600 pt-2">Plus jaarlijkse verzekering (~100-200/jaar)</p>
                </div>
              </div>
            </div>

            {/* Vaste vs Variabel */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Vaste vs Variabele Rente</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Vaste Rente</h3>
                  <div className="space-y-3 text-sm text-warm-700">
                    <p>
                      <span className="font-semibold">Voordeel:</span> Maandelijkse betaling is onveranderlijk. U bent beschermd tegen rentestijgingen.
                    </p>
                    <p>
                      <span className="font-semibold">Nadeel:</span> Iets hogere rentevoet dan variabel. Als rente daalt, betaalt u nog steeds hoog.
                    </p>
                    <p className="pt-3">
                      <span className="font-semibold">Geschikt voor:</span> Voorzichtige beleggers die zekerheid willen. Lange termijn hypotheken.
                    </p>
                  </div>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Variabele Rente</h3>
                  <div className="space-y-3 text-sm text-warm-700">
                    <p>
                      <span className="font-semibold">Voordeel:</span> Lagere initiële rentevoet. Kan dalen als marktrente daalt.
                    </p>
                    <p>
                      <span className="font-semibold">Nadeel:</span> Betaling kan stijgen. Risico in opkomende rentemarkt.
                    </p>
                    <p className="pt-3">
                      <span className="font-semibold">Geschikt voor:</span> Aannemers van risico's. Korte termijn hypotheken. Goede economie.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-warm-700 mt-6">
                <span className="font-semibold">Ons advies:</span> Voor Belgische kopers die in Spanje investeren, adviseren wij meestal vaste rente. Dit geeft zekerheid over uw maandelijkse kosten.
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

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Hulp Met Woonkrediet Aanvragen</h2>
              <p className="text-warm-200 mb-6">
                Onze experts helpen u een hypotheek regelen die bij uw situatie past. Wij werken met beide Belgische en Spaanse banken.
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

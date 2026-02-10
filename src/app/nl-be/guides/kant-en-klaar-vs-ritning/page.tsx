import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kant-en-klaar vs Op Ritning | Wat Past Bij U? 2026',
  description: 'Vergelijk kant-en-klaar (key ready) en op ritning (off-plan) woningen. Voordelen, risico\'s, en wat beste voor u is als Belgische koper.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/kant-en-klaar-vs-ritning',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kant-en-klaar-vs-ritning',
    },
  },
};

const faqs = [
  {
    question: 'Wat is het verschil tussen kant-en-klaar en op ritning?',
    answer: 'Kant-en-klaar betekent dat de woning al gebouwd en afgewerkt is. U ziet wat u krijgt. Op ritning betekent dat u koopt van tekening, voordat bouw begint. U betaalt voor iets dat nog niet gebouwd is.',
  },
  {
    question: 'Welke is veiliger voor een Belgische koper?',
    answer: 'Beide zijn veilig als u goed advies krijgt. Kant-en-klaar is meer "wat je ziet is wat je krijgt". Op ritning vereist meer vertrouwen in bouwer en wettelijke bescherming. Met modern escrow systemen, zijn beide veilig.',
  },
  {
    question: 'Hoe lang moet ik wachten bij op ritning?',
    answer: 'Doorgaans 18-36 maanden van aankoop tot sleuteloverdracht. Dit hangt af van project fase wanneer u koopt. Als project half gebouwd is, duurt het minder. Dit is duidelijk in contract.',
  },
  {
    question: 'Betaal ik meer voor kant-en-klaar?',
    answer: 'Niet noodzakelijk. Prijzen zijn vergelijkbaar. Sommige kant-en-klaar project kosten meer (vanwege locatie), andere minder. Op ritning gebouwen hebben soms kleine premies voor vroege vogels.',
  },
  {
    question: 'Kan ik aanpassingen doen bij kant-en-klaar?',
    answer: 'Beperkt. U ziet de woning zoals deze is. Kleine aanpassingen soms mogelijk (verf kleuren, etc.), maar grote veranderingen niet. Dit is standaard.',
  },
  {
    question: 'Wat als de op ritning woning niet klaar is op afgesproken tijd?',
    answer: 'Dit is beschermd in Spaans recht. Als bouwer vertraging oploopt, moet u compensatie krijgen (doorgaans 0,5% van koopprijs per maand vertraging). Dit staat in contract.',
  },
  {
    question: 'Kan ik mijn mening veranderen als ik op ritning koop?',
    answer: 'U bent juridisch gebonden zodra u koopovereenkomst tekent. Annulering voor niet-essentiële redenen kost u depositoregeling (doorgaans 10-20%). Wettelijke bescherming is beperkt na akkoord.',
  },
  {
    question: 'Welke heeft betere financiering?',
    answer: 'Banken geven vaak iets betere voorwaarden voor kant-en-klaar (omdat risico lager is). Op ritning kan voorkomen dat bank niet volledig wil financieren totdat bouw zichtbare vooruitgang maakt.',
  },
];

export default function KantEnKlaarVsRitningPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Kant-en-klaar vs Op Ritning', url: 'https://newbuildhomescostablanca.com/nl-be/guides/kant-en-klaar-vs-ritning' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Kant-en-Klaar vs Op Ritning</h1>
            <p className="text-xl text-warm-200 mb-4">Welke optie past bij u?</p>
            <p className="text-lg text-warm-300">
              Begrijp de verschillen en bepaal welke koopstrategie best voor u is.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Quick Comparison */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Snelle Vergelijking</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-primary-900">
                      <th className="text-left py-3 px-4 font-semibold text-primary-900">Aspect</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-900">Kant-en-Klaar</th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-900">Op Ritning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Bouwfase</td>
                      <td className="py-3 px-4">100% voltooid</td>
                      <td className="py-3 px-4">Nog niet gebouwd of bouwing</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Wanneer sleutels</td>
                      <td className="py-3 px-4">Enkele weken</td>
                      <td className="py-3 px-4">18-36 maanden</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Aanpassingen</td>
                      <td className="py-3 px-4">Beperkt mogelijk</td>
                      <td className="py-3 px-4">Vaak mogelijk</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Risico</td>
                      <td className="py-3 px-4">Laag (ziet wat u krijgt)</td>
                      <td className="py-3 px-4">Middel (betaalt voor plan)</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Prijs</td>
                      <td className="py-3 px-4">Marktprijs</td>
                      <td className="py-3 px-4">Vaak iets lager</td>
                    </tr>
                    <tr className="border-b border-warm-200">
                      <td className="py-3 px-4 font-semibold text-primary-900">Hypotheek</td>
                      <td className="py-3 px-4">Makkelijker</td>
                      <td className="py-3 px-4">Kan lastiger zijn</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-primary-900">Voor wie</td>
                      <td className="py-3 px-4">Voorzichtigen</td>
                      <td className="py-3 px-4">Geduldigeren</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Ready */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Kant-en-Klaar (Key Ready)</h2>

              <p className="text-warm-700 mb-6">
                Kant-en-klaar betekent dat de woning volledig gebouwd en afgewerkt is. U betaalt, u inspiceert, u krijgt sleutels. Dit is het meest eenvoudige koopmodel.
              </p>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Voordelen:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>U ziet wat u koopt - geen verassingen</li>
                    <li>U kunt de woning inspiceren voordat u betaalt</li>
                    <li>Snelle overdracht (paar weken tot eigenaar)</li>
                    <li>U kunt onmiddellijk genieten van uw woning</li>
                    <li>Banken geven makkelijker hypotheken</li>
                    <li>Geen risico van bouwvertragingen</li>
                  </ul>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Nadelen:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Weinig mogelijkheid aanpassingen</li>
                    <li>Kan duurder zijn dan op ritning</li>
                    <li>Keuze is beperkt (alleen beschikbare woningen)</li>
                    <li>Geen premie voor vroege vogels</li>
                    <li>Lagere appreciatie (woning oud zodra gekocht)</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Voor wie geschikt?</h3>
                  <p className="text-warm-700">
                    Belgische kopers die voorzichtig zijn, niet lang kunnen wachten, of onmiddellijke woonstabiliteit willen. Perfect voor pensionautars of mensen met vaste vakantieplannen.
                  </p>
                </div>
              </div>
            </div>

            {/* Off-Plan */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Op Ritning (Off-Plan)</h2>

              <p className="text-warm-700 mb-6">
                Op ritning betekent dat u koopt van een plan (architectonische tekening), voordat de woning gebouwd wordt. Dit is meer gefinancialiseerd dan kant-en-klaar.
              </p>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Voordelen:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Vaak lagere prijs (bouwer geeft rabat)</li>
                    <li>U kunt aanpassingen doen (indeling, materialen)</li>
                    <li>Betere keus van locatie in project</li>
                    <li>Mogelijke appreciatie (stijging waarde terwijl gebouwd)</li>
                    <li>Gedeelde betalingen (niet alles nu)</li>
                    <li>Deel van bouwvoordelen geniet</li>
                  </ul>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-4">Nadelen:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Moet lang wachten (18-36 maanden)</li>
                    <li>Risico van bouwvertragingen</li>
                    <li>Risico van project annulering (laag, maar mogelijk)</li>
                    <li>Banken kunnen voorzichtiger zijn</li>
                    <li>Kan niet direct genieten van woning</li>
                    <li>Afhankelijk van bouwerkwaliteit</li>
                  </ul>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Voor wie geschikt?</h3>
                  <p className="text-warm-700">
                    Belgische beleggers, kopers met geduld, of degenen die investeringsvoordelen willen. Perfect als u eigendom wilt verhuren en eerste jaren nog niet gebruikt.
                  </p>
                </div>
              </div>
            </div>

            {/* Process Comparison */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Het Koopproces Stap-voor-Stap</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4 pb-2 border-b-2 border-primary-900">Kant-en-Klaar</h3>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">1.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Inspectie</p>
                        <p className="text-sm text-warm-700">Bezoek woning, controleer alles</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">2.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Reservering</p>
                        <p className="text-sm text-warm-700">Betaal depositoregeling (3-5%)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">3.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Onderzoek</p>
                        <p className="text-sm text-warm-700">Juridisch controle (1 week)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">4.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Financiering</p>
                        <p className="text-sm text-warm-700">Hypotheek goedkeuring (2-3 weken)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">5.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Notarieel</p>
                        <p className="text-sm text-warm-700">Eigendomsoverdracht tekenen</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">6.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Sleutels</p>
                        <p className="text-sm text-warm-700">Direct beschikbaar</p>
                      </div>
                    </li>
                  </ol>
                  <p className="text-sm text-accent-600 font-semibold mt-4 pt-4 border-t border-warm-200">Totaal: 6-8 weken</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-4 pb-2 border-b-2 border-primary-900">Op Ritning</h3>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">1.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Plan Controle</p>
                        <p className="text-sm text-warm-700">Review architectuurplan</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">2.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Aanpassingen</p>
                        <p className="text-sm text-warm-700">Kies finalisering (1-2 weken)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">3.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Reservering</p>
                        <p className="text-sm text-warm-700">Betaal depositoregeling (10-20%)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">4.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Bouw Monitoring</p>
                        <p className="text-sm text-warm-700">Volg voortgang (18-36 mnd)</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">5.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Aflevering Controle</p>
                        <p className="text-sm text-warm-700">Inspectie voltooide woning</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-bold text-accent-600 flex-shrink-0">6.</span>
                      <div>
                        <p className="font-semibold text-primary-900">Sleutels</p>
                        <p className="text-sm text-warm-700">Na notarieel handelen</p>
                      </div>
                    </li>
                  </ol>
                  <p className="text-sm text-accent-600 font-semibold mt-4 pt-4 border-t border-warm-200">Totaal: 18-36 maanden + 2 weken</p>
                </div>
              </div>
            </div>

            {/* Risk & Protection */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Risico en Bescherming</h2>

              <div className="space-y-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Kant-en-Klaar Risico's:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2 text-sm">
                    <li>Verborgen gebreken (maar 1 jaar garantie)</li>
                    <li>Beperkte aanpassingsmogelijkheden</li>
                    <li>Prijs hoger dan op ritning</li>
                  </ul>
                  <p className="text-warm-700 text-sm mt-4">
                    <span className="font-semibold">Bescherming:</span> 1 jaar bouwers garantie, inspectie vooraf, grondige juridische controle
                  </p>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Op Ritning Risico's:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2 text-sm">
                    <li>Bouwvertragingen (kan maanden uitlopen)</li>
                    <li>Project annulering (zeer zeldzaam, maar mogelijk)</li>
                    <li>Bouwerkwaliteit onbekend vooraf</li>
                    <li>Lange wachttijd (18-36 maanden)</li>
                  </ul>
                  <p className="text-warm-700 text-sm mt-4">
                    <span className="font-semibold">Bescherming:</span> Escrow rekening, gedeelde betalingen gekoppeld aan bouwfasen, 10 jaar garantie, contractstraffen voor vertraging
                  </p>
                </div>
              </div>
            </div>

            {/* Financial Comparison */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Financieel Verschil</h2>

              <div className="space-y-4 mb-6">
                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Kant-en-Klaar Financiering:</h3>
                  <p className="text-warm-700 text-sm mb-3">Voor woning van 300.000 euro:</p>
                  <div className="space-y-1 text-sm text-warm-700">
                    <p>Depositoregeling: 9.000 euro (3%)</p>
                    <p>Overige kosten: 33.000 euro (11%)</p>
                    <p className="font-bold text-accent-600 border-t border-warm-300 pt-2">TOTAAL: 342.000 euro</p>
                    <p className="text-warm-600">Betaald nu, direct eigenaar</p>
                  </div>
                </div>

                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Op Ritning Financiering:</h3>
                  <p className="text-warm-700 text-sm mb-3">Voor woning van 280.000 euro (15% korting):</p>
                  <div className="space-y-1 text-sm text-warm-700">
                    <p>Depositoregeling nu: 28.000 euro (10%)</p>
                    <p>Bouwfase 1 (30%): 84.000</p>
                    <p>Bouwfase 2 (30%): 84.000</p>
                    <p>Bouwfase 3 (30%): 84.000</p>
                    <p>Overige kosten: 28.000 euro (10%)</p>
                    <p className="font-bold text-accent-600 border-t border-accent-300 pt-2">TOTAAL: 308.000 euro over 2 jaar</p>
                    <p className="text-warm-600">Betaald in stappen, geleidelijk eigenaar</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                <p className="text-warm-700">
                  <span className="font-semibold">Conclusie:</span> Op ritning is 34.000 euro goedkoper (11% besparing), maar u wacht 2 jaar. Kant-en-klaar kost meer, maar u geniet nu.
                </p>
              </div>
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

            {/* Decision Helper */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-6">Welke Kiezen?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3 text-lg">Kant-en-Klaar Kiezen Als:</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>U voorzichtig bent en risico wilt vermijden</li>
                    <li>U onmiddellijk woning wilt gebruiken</li>
                    <li>U bankhypotheken wilt (gemakkelijker)</li>
                    <li>U niet lang wilt wachten</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-sm p-6">
                  <p className="font-semibold mb-3 text-lg">Op Ritning Kiezen Als:</p>
                  <ul className="space-y-2 text-sm text-warm-200">
                    <li>U geduldig bent en kunt wachten</li>
                    <li>U geld wilt besparen (15% korting)</li>
                    <li>U wil aanpassingen (indeling, materialen)</li>
                    <li>U investeringsvoordelen wilt genoten</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Hulp Kiezen?</h2>
              <p className="text-warm-200 mb-6">
                Onze experts helpen u bepalen welke optie best voor u is op basis van uw situatie.
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

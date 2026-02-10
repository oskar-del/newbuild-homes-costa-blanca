import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Koopproces Spanje | Stap-voor-Stap Gids voor Belgen 2026',
  description: 'Volledige uitleg van het koopproces in Spanje voor Belgische kopers. Van voorkeuren tot sleuteloverdracht - alles stap-voor-stap met Belgische informatie.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/koopproces',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/buying-process',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/kopprocessen',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/koopproces',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/koopproces',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/processus-achat',
      'no': 'https://newbuildhomescostablanca.com/no/guides/kjopsprosessen',
      'x-default': 'https://newbuildhomescostablanca.com/guides/buying-process',
    },
  },
};

const faqs = [
  {
    question: 'Hoe lang duurt het koopproces in Spanje?',
    answer: 'Het totale proces duurt doorgaans 3-6 maanden. Voor kant-en-klaar woningen kan dit sneller gaan (2-3 maanden). Voor nieuwbouw op ritning hangt dit af van de bouwfase - doorgaans duurt dit langer omdat de woning eerst moet worden gebouwd.',
  },
  {
    question: 'Wat is het verschil tussen een Spaanse notaris en een Belgische notaris?',
    answer: 'Beide notarissen hebben gelijkwaardige rollen. De Spaanse notarius cumple een vergelijkbare functie als de Belgische notaris. Zij controleren eigendomsoverdracht en waarborgen dat de transactie juridisch geldig is. Als Belgische koper bent u vertrouwd met het notariële systeem, dus dit zal u bekend voorkomen.',
  },
  {
    question: 'Moet ik aanwezig zijn bij het tekenen van de akte?',
    answer: 'Nee, u kunt de akte via volmacht laten ondertekenen. Dit is heel gebruikelijk voor buitenlandse kopers. Uw notaris in België kan u hiermee helpen. U moet wel fysiek aanwezig zijn voor bepaalde stappen, maar uw juridisch vertegenwoordiger kan het meeste namens u doen.',
  },
  {
    question: 'Wat moet ik doen met FOD Financiën na aankoop?',
    answer: 'Als Belgische koper moet u de Spaanse eigendommen aanmelden bij FOD Financiën voor de personenbelasting. Dit is verplicht. U kunt dit samen met uw Belgische belastingconsulent regelen. Dit heeft betrekking op het kadastraal inkomen van uw Spaanse eigendom.',
  },
  {
    question: 'Wat is een voorkeurbod en waarom is dit belangrijk?',
    answer: 'Bij nieuwbouw op ritning kunt u een voorkeurbod plaatsen. Dit betekent dat u de woning reserveert voordat de bouw begint. Dit geeft u prioriteit over andere kopers. De depositoregeling verschilt per project - doorgaans is dit 10-20% van de koopprijs.',
  },
  {
    question: 'Kan ik het koopproces via mijn Belgische bankier afhandelen?',
    answer: 'Ja, veel Belgische banken (KBC, Belfius, BNP Paribas Fortis) bieden internationale overboekingen en kunnen financieringen coördineren. Voor de rechtstreekse Spaanse transactie werkt u echter met lokale professionals in Spanje en uw notaris.',
  },
  {
    question: 'Wat gebeurt er als het project wordt geannuleerd?',
    answer: 'Bij aankoop op ritning moet de bouwer garanties geven. Als het project wordt geannuleerd, krijgt u uw depositoregeling terug. Dit staat in het koopcontract. Zorg ervoor dat dit duidelijk in uw contract staat voordat u tekent.',
  },
  {
    question: 'Hoe werkt de timing van betalingen bij nieuwbouw?',
    answer: 'Typisch betaalt u in stappen: depositoregeling bij reservering (10-20%), vervolgbetalingen bij bouwmijlpalen (30%, 30%, 40% of vergelijkbare verdeling). Het exacte schema hangt af van het project en de bouwer.',
  },
];

export default function KoopprocesPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Koopproces', url: 'https://newbuildhomescostablanca.com/nl-be/guides/koopproces' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Koopproces in Spanje</h1>
            <p className="text-xl text-warm-200 mb-4">Stap-voor-stap uitleg voor Belgische kopers</p>
            <p className="text-lg text-warm-300">
              Het kopen van vastgoed in Spanje volgt een vastgesteld proces. Als Belgische koper bent u vertrouwd met notariële procedures - het Spaanse systeem is vergelijkbaar en meestal eenvoudiger.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 1: Eigendomsonderzoek en Reservering</h2>
              <p className="text-warm-700 mb-4">
                Voordat u iets koopt, voert uw juridisch vertegenwoordiger (eigendomsadviseur) een grondige controle uit. Wij controleren het Spaanse eigendomsregister (Registro de la Propiedad), ook wel het kadastraal register. Dit vertoont wie eigenaar is, eventuele schulden, erfdienstbaarheden en hypotheken.
              </p>
              <p className="text-warm-700 mb-4">
                Na akkoord gaat u een reserveringsovereenkomst ondertekenen. Dit is een bindend document dat aangeeft dat u serieus bent. Hierbij betaalt u doorgaans 3.000-5.000 euro depositoregeling. Dit bedrag wordt later in mindering gebracht op uw eindbetaling.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>Volledig eigendomsonderzoek door gekwalificeerde professionals</li>
                <li>Reserveringsovereenkomst ondertekenen</li>
                <li>Eerste depositoregeling betalen (doorgaans 3-5% van koopprijs)</li>
                <li>Terugstuurperiode om alles nog eens goed door te nemen</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 2: NIE-Nummer en Rechtspositie</h2>
              <p className="text-warm-700 mb-4">
                U moet een NIE-nummer aanvragen. Dit is uw Spaanse fiscaal identificatienummer. Als Belgische koper kunt u dit aanvragen bij de Spaanse ambassade in Brussel of in Antwerpen. Sommige kopers wachten tot ze in Spanje zijn en vragen het daar aan.
              </p>
              <p className="text-warm-700 mb-4">
                U kunt ook volmacht geven aan uw juridisch vertegenwoordiger in Spanje om dit voor u aan te vragen. Dit bespaart u reis naar ambassade.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>NIE-nummer aanvragen bij ambassade of in Spanje</li>
                <li>Paspoort of identiteitkaart nodig als ID</li>
                <li>Volmacht mogelijk via uw juridisch vertegenwoordiger</li>
                <li>Normaal duurt dit 1-2 weken</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 3: Financiering en Hypotheekgoedkeuring</h2>
              <p className="text-warm-700 mb-4">
                Als u een woonkrediet (hypotheek) nodig hebt, moet u dit nu van uw bank regelen. Veel Belgische banken (KBC, Belfius, BNP Paribas Fortis) financieren aankopen in Spanje. U kunt ook met Spaanse banken werken (CaixaBank, BBVA).
              </p>
              <p className="text-warm-700 mb-4">
                Uw bank zal een taxatie van de eigendom aanvragen en uw financiële situatie controleren. Dit duurt doorgaans 2-4 weken.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>Hypotheekvoorstel aanvragen bij uw bank</li>
                <li>Bankuittreksels van laatste 3 maanden voorbereiden</li>
                <li>Aanslagbiljet personenbelasting (vorig jaar) indienen</li>
                <li>Loonfiches of inkomstenbewijzen voorbereiden</li>
                <li>Taxatie van de eigendom door bankevaluateur</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 4: Koopovereenkomst en Juridische Voorbereiding</h2>
              <p className="text-warm-700 mb-4">
                Zodra uw financiering is goedgekeurd en alles gecontroleerd is, stelt uw juridisch vertegenwoordiger de koopovereenkomst op. Dit is een volledige juridische overeenkomst met alle voorwaarden en verplichtingen.
              </p>
              <p className="text-warm-700 mb-4">
                U ontvangt een kopie ter controle. U kunt dit ter beoordeling meegeven aan uw Belgische notaris of juridisch adviseur. Dit is sterk aan te bevelen voor grote aankopen.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>Koopovereenkomst opstellen door juridisch vertegenwoordiger</li>
                <li>Kopie naar uw Belgische juridisch adviseur voor controle</li>
                <li>Alle voorwaarden nakijken (afleveringsdata, voorwaarden, betaling)</li>
                <li>Vragen stellen en aanpassingen aanvragen indien nodig</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 5: Betaling Depositoregeling en Voorwaardelijke Clausules</h2>
              <p className="text-warm-700 mb-4">
                Voor nieuwbouw betaalt u in stappen. De eerste betaling is doorgaans 10-20% van de koopprijs. Dit bedrag wordt verzameld door de vastgoedadviseur in een erfgoedrekening.
              </p>
              <p className="text-warm-700 mb-4">
                Bij kant-en-klaar wordt doorgaans meer betaald voordat de eigendom wordt geregistreerd. Bij nieuwbouw op ritning bent u beschermd - het geld gaat naar escrow tot bepaalde bouwmijlpalen zijn bereikt.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>Eerste betaling (doorgaans 10-20%) overmaken naar escrowrekening</li>
                <li>Voor nieuwbouw: betalingen gekoppeld aan bouwfasen</li>
                <li>Voor kant-en-klaar: meer betaling vlak voor eigendomsoverdracht</li>
                <li>Zorg voor documentatie van alle betalingen</li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 6: Eigendomsoverdracht en Notariële Akte</h2>
              <p className="text-warm-700 mb-4">
                Dit is de belangrijkste stap. U meldt zich aan bij de notarius met uw juridisch vertegenwoordiger en tekent de escritura de compraventa (notariële koopakte). Dit document maakt u juridisch eigenaar.
              </p>
              <p className="text-warm-700 mb-4">
                U kunt dit via volmacht doen. Uw juridisch vertegenwoordiger kan dit namens u ondertekenen, wat u reiskosten bespaart. Dit is heel gebruikelijk voor internationale kopers.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>Notariële akte ondertekenen (persoonlijk of via volmacht)</li>
                <li>Definitieve betaling overboeken (meestal via bankrekening van notaris)</li>
                <li>Notaris registreert eigendom in Registro de la Propiedad</li>
                <li>U ontvangt notarieel exemplaar van akte</li>
              </ul>
            </div>

            {/* Step 7 */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Stap 7: Inschrijving in Eigendomsregister en Sleuteloverdracht</h2>
              <p className="text-warm-700 mb-4">
                Na notariële ondertekening laat de notaris de eigendom inschrijven in het Spaanse eigendomsregister. Dit duurt doorgaans 2-4 weken. U bent juridisch al eigenaar, maar de formele registratie voltooit het proces.
              </p>
              <p className="text-warm-700 mb-4">
                Zodra alles is geregistreerd, ontvangt u de sleutels. Dit is het moment van daadwerkelijke bezitoverdracht.
              </p>
              <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                <li>Notaris dient inschrijving in Registro de la Propiedad in</li>
                <li>Wacht op bevestiging van registratie (2-4 weken)</li>
                <li>Ontvang bewijsstuk van registratie (nota simple)</li>
                <li>Ontvang sleutels van eigenaar of juridisch vertegenwoordiger</li>
              </ul>
            </div>

            {/* Belgian Tax & FOD */}
            <div className="mb-12 bg-accent-50 rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Na Aankoop: Belgische Belastingmeldingen</h2>
              <p className="text-warm-700 mb-4">
                Dit is belangrijk: als Belgische koper moet u bepaalde zaken bij FOD Financiën melden. Dit is verplicht en helpt u toekomstige problemen te voorkomen.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-3">Melden bij FOD Financiën:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Eigendomsaankoop van buitenlands vastgoed</li>
                    <li>Jaarlijkse personenbelasting (kadastraal inkomen)</li>
                    <li>Huur-inkomsten (als u verhuurt)</li>
                    <li>Dubbelbelastingverdrag België-Spanje gebruiken</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-3">Documenten die u krijgt:</h3>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-2">
                    <li>Notariële kopie van akte</li>
                    <li>Inschrijvingsbewijs (nota simple)</li>
                    <li>Certificaat kadastraal nummer</li>
                    <li>Nota van notaris met alle kosten</li>
                  </ul>
                </div>
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

            {/* Key Takeaways */}
            <div className="bg-warm-50 rounded-sm p-8 shadow-sm mb-12">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Belangrijkste Punten</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-3">Voor u begint:</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>Zorg voor goed juridisch vertegenwoordiging</li>
                    <li>Regel uw financiering vooraf</li>
                    <li>Laat volledig eigendomsonderzoek doen</li>
                    <li>Controleer alle documenten zorgvuldig</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-3">Als Belgische koper:</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>Notarieel systeem voelt vertrouwd</li>
                    <li>U kunt via volmacht ageren</li>
                    <li>Meld aan FOD Financiën</li>
                    <li>Controleer dubbelbelastingverdrag</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Begeleiding Bij Het Koopproces</h2>
              <p className="text-warm-200 mb-6">
                Ons Belgisch team begeleidt u door elke stap van het proces. Van eigendomsonderzoek tot sleuteloverdracht.
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

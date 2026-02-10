import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Koopproces Spanje | Stap-voor-Stap Gids 2026',
  description: 'Volledig stappenplan voor het kopen van nieuwbouw in Spanje. Van reservering tot sleutelhandover. Inclusief Nederlandse belastingzaken en proceskosten.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/koopproces',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/buying-process',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/kopprocessen',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/koopproces',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/koopproces',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/processus-achat',
      'no': 'https://newbuildhomescostablanca.com/no/guides/kjopsprosessen',
    },
  },
};

const faqs = [
  {
    question: 'Hoelang duurt het koopproces in Spanje?',
    answer: 'Het duurt doorgaans 8-12 weken van reservering tot eigendomsoverdracht voor kant-en-klare woningen. Voor op-tekening-aankopen onderteken je het contract binnen 30-60 dagen na reservering, waarna je 12-24 maanden wacht op afbouw.',
  },
  {
    question: 'Heb ik een advocaat nodig in Spanje?',
    answer: 'Dit is niet verplicht, maar we raden het sterk aan. Een onafhankelijke advocaat controleert het contract, verifiëert de rechtmatigheid, handelt je NIE-aanvraag af en vertegenwoordigt je bij de notaris. Verwacht 1-1,5% van de koopprijs.',
  },
  {
    question: 'Kan ik Nederlands geld naar Spanje transfereren?',
    answer: 'Ja, maar vermeld altijd het doel van de transfer (aankoop onroerend goed). De Spaanse belastingdienst moet inzicht hebben in de herkomst van het geld. Hou bewijzen van de transfer en omzetting naar euro\'s bij elkaar.',
  },
  {
    question: 'Hoe zit het met Nederlandse belastingmeldingen?',
    answer: 'Als Nederlander moet je buitenlands vermogen boven bepaalde grenzen opgeven (box 3). Een Spaans pand is een roerend bezit dat mag worden gerapporteerd in je jaarlijkse belastingaangifte. Raadpleeg een Nederlandse belastingadviseur.',
  },
  {
    question: 'Wat gebeurt er met mijn reserveringsgeld?',
    answer: 'Het reserveringsbedrag van €3.000-€10.000 wordt meestal in mindering gebracht op de koopprijs. Als je zonder geldige reden terugtrekt, kan dit bedrag niet-restituabel zijn. Lees de voorwaarden zorgvuldig.',
  },
  {
    question: 'Heb ik een Spaanse bankrekening nodig?',
    answer: 'Ja. Je hebt een Spaanse rekening nodig voor de betaling van de koopprijs, belastingen, nutsvoorzieningen en andere uitgaven. Je kunt deze openen met je NIE, paspoort en inkomstenbewijs.',
  },
  {
    question: 'Kan ik de koop financieren met een hypotheek?',
    answer: 'Ja. Spaanse banken lenen tot 60-70% LTV aan buitenlanders. Je hebt bewijzen van inkomsten, belastingaangiften en bankafschriften nodig. De huidige rentestanden liggen rond de 3-4%.',
  },
];

export default function KoopprocesPaginaPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Koopproces', url: 'https://newbuildhomescostablanca.com/nl/guides/koopproces' },
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
              <span>Koopproces</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Koopproces Spanje Stap voor Stap
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Alles wat je moet weten over het kopen van nieuwbouw in Spanje. Van reservering tot sleutelhandover, inclusief Nederlandse fiscale aspecten.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>12 min lezen</span>
              <span>•</span>
              <span>Bijgewerkt februari 2026</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Introduction */}
            <div className="mb-12">
              <p className="text-xl text-warm-700 leading-relaxed">
                Het kopen van een nieuwbouw in Spanje is voor veel Nederlanders een geweldig alternatief. Je krijgt een modern pand met garanties, energie-efficiëntie en je bent niet afhankelijk van renovaties. Deze gids leidt je door het hele proces.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-sm p-6 mb-12 border-l-4 border-accent-500">
              <h2 className="text-lg font-semibold mb-4">In deze gids</h2>
              <ol className="space-y-2 text-warm-700">
                <li><a href="#stap-1" className="text-accent-600 hover:underline">1. Zoeken en selectie</a></li>
                <li><a href="#stap-2" className="text-accent-600 hover:underline">2. Reserveringsovereenkomst</a></li>
                <li><a href="#stap-3" className="text-accent-600 hover:underline">3. NIE-nummer aanvragen</a></li>
                <li><a href="#stap-4" className="text-accent-600 hover:underline">4. Spaanse bankrekening openen</a></li>
                <li><a href="#stap-5" className="text-accent-600 hover:underline">5. Koopcontract ondertekenen</a></li>
                <li><a href="#stap-6" className="text-accent-600 hover:underline">6. Fasebetalingen</a></li>
                <li><a href="#stap-7" className="text-accent-600 hover:underline">7. Kwaliteitsinspectie</a></li>
                <li><a href="#stap-8" className="text-accent-600 hover:underline">8. Sleutelhandover bij notaris</a></li>
              </ol>
            </div>

            {/* Step 1 */}
            <section id="stap-1" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">1</span>
                Zoeken en selectie van de juiste woning
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Begin met het bepalen van je wensen: locatie, eigendomstype, budget en tijdlijn. Voor nieuwbouw heb je meestal de keuze uit:
                </p>
                <ul className="space-y-3 ml-4">
                  <li><strong>Op tekening:</strong> Koop voor afbouw (12-24 maanden). Lagere prijs, mogelijkheid tot aanpassingen.</li>
                  <li><strong>In aanbouw:</strong> Bouw is begonnen, klaar binnen 6-12 maanden.</li>
                  <li><strong>Kant-en-klaar:</strong> Afgebouwd en klaar om in te trekken. Wat je ziet is wat je krijgt.</li>
                </ul>
                <p>
                  Een bezoek aan Costa Blanca is waardevol. Ons team kan bezichtigingen organiseren of videotours verzenden.
                </p>
              </div>
            </section>

            {/* Step 2 */}
            <section id="stap-2" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">2</span>
                Reserveringsovereenkomst ondertekenen
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Zodra je het juiste pand hebt gevonden, onderteken je een reserveringsovereenkomst en betaal je een borg:
                </p>
                <ul className="space-y-2 ml-4">
                  <li><strong>€3.000 - €10.000</strong> afhankelijk van de prijs</li>
                  <li>Meestal geldig voor <strong>30-60 dagen</strong></li>
                  <li>Wordt meestal <strong>in mindering gebracht</strong> op de koopprijs</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                  <p className="font-semibold text-yellow-800">Let op:</p>
                  <p className="text-yellow-700">De reserveringsgeld kan niet-restituabel zijn als je zonder geldige reden terugtrekt. Lees de voorwaarden zorgvuldig.</p>
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section id="stap-3" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">3</span>
                NIE-nummer aanvragen
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Het <strong>NIE (Número de Identificación de Extranjero)</strong> is je Spaanse belastingnummer. Dit is verplicht voor elke aankoop.
                </p>
                <p>Je kunt dit aanvragen:</p>
                <ul className="space-y-2 ml-4">
                  <li><strong>In Spanje:</strong> Bij de Vreemdelingenkantoor (Oficina de Extranjería)</li>
                  <li><strong>Vanuit het buitenland:</strong> Bij de Spaanse ambassade of consulaat</li>
                </ul>
                <p>
                  De verwerking duurt doorgaans 1-4 weken. Veel advocaten kunnen dit via volmacht voor je regelen.
                </p>
                <Link href="/nl/guides/nie-nummer" className="text-accent-600 font-semibold hover:underline">
                  → Lees onze complete NIE-gids
                </Link>
              </div>
            </section>

            {/* Step 4 */}
            <section id="stap-4" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">4</span>
                Spaanse bankrekening openen
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>Je hebt een Spaanse rekening nodig voor:</p>
                <ul className="space-y-2 ml-4">
                  <li>Betaling van de koopprijs en belastingen</li>
                  <li>Instellingen van automatische betalingen voor nutsvoorzieningen en gemeentelijke kosten</li>
                  <li>Hypotheekbetalingen (indien van toepassing)</li>
                </ul>
                <p>
                  Grote banken zoals Sabadell, CaixaBank en Santander hebben ervaring met buitenlandse kopers. Je hebt je NIE, paspoort en inkomstenbewijs nodig.
                </p>
              </div>
            </section>

            {/* Step 5 */}
            <section id="stap-5" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">5</span>
                Koopcontract ondertekenen
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Het <strong>Contrato de Compraventa</strong> is het bindende koopcontract. Bij ondertekening betaal je:
                </p>
                <ul className="space-y-2 ml-4">
                  <li><strong>20-30% van de koopprijs</strong> (minus de reservering)</li>
                </ul>
                <p>Het contract moet bevatten:</p>
                <ul className="space-y-2 ml-4">
                  <li>Volledige eigendomsspecificaties en plannen</li>
                  <li>Betalingsschema</li>
                  <li>Verwachte opleverdatum</li>
                  <li>Strafbepalingen bij vertraging</li>
                  <li>Bankgarantiegegevens (verplicht in Spanje)</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-900 p-4 my-6">
                  <p className="font-semibold text-primary-900">Bankgarantie bescherming</p>
                  <p className="text-primary-800">Spaanse wet verplicht ontwikkelaars bankgaranties of verzekeringen voor alle betalingen. Bij faillissement krijg je je geld terug.</p>
                </div>
              </div>
            </section>

            {/* Step 6 */}
            <section id="stap-6" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">6</span>
                Fasebetalingen tijdens bouw
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Voor op-tekening-aankopen betaal je in fases gekoppeld aan bouwmijlpalen:
                </p>
                <table className="w-full border-collapse my-6">
                  <thead>
                    <tr className="bg-warm-100">
                      <th className="border p-3 text-left">Fase</th>
                      <th className="border p-3 text-left">Typisch %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-3">Reservering</td><td className="border p-3">€3.000-10.000</td></tr>
                    <tr><td className="border p-3">Contractondertekening</td><td className="border p-3">20-30%</td></tr>
                    <tr><td className="border p-3">Tijdens bouw</td><td className="border p-3">20-30%</td></tr>
                    <tr><td className="border p-3">Oplevering</td><td className="border p-3">40-50%</td></tr>
                  </tbody>
                </table>
                <p>
                  Bewaar alle betalingsbewijzen en bankgarantiebrieven zorgvuldig.
                </p>
              </div>
            </section>

            {/* Step 7 */}
            <section id="stap-7" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">7</span>
                Kwaliteitsinspectie voorafgaand
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Voor oplevering controleer je (of een inspecteur doet dit) op gebreken:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>Verfwerk en afwerking</li>
                  <li>Deuren, ramen en sloten</li>
                  <li>Leidingen en drainage</li>
                  <li>Elektrische installaties</li>
                  <li>Tegels en vloeren</li>
                  <li>Airconditioner en apparaten</li>
                </ul>
                <p>
                  De ontwikkelaar moet gebreken voor oplevering herstellen of dit aftrekken van de slotbetaling.
                </p>
              </div>
            </section>

            {/* Step 8 */}
            <section id="stap-8" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-500 text-white w-10 h-10 rounded-sm flex items-center justify-center text-lg font-light">8</span>
                Sleutelhandover bij de notaris
              </h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  De laatste stap vindt plaats bij de notaris waar je:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>De <strong>Escritura</strong> (eigendomsdocument) ondertekent</li>
                  <li>De slotbetaling doet</li>
                  <li>IVA en zegelbelasting betaalt</li>
                  <li>De sleutels ontvangt</li>
                </ul>
                <p>
                  Je kunt persoonlijk verschijnen of je advocaat volmacht geven. Na ondertekening inschrijving in het Landsregister.
                </p>
              </div>
            </section>

            {/* Dutch Tax Considerations */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Nederlandse belastingzaken</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Als Nederlands eigenaar van een Spaans pand moet je enkele belastingverplichtingen in Nederland kennen:
                </p>
                <ul className="space-y-3 ml-4">
                  <li><strong>Box 3 vermogensbelasting:</strong> Je Spaans pand is buitenlands vermogen dat in box 3 valt (bij bepaalde drempels).</li>
                  <li><strong>Opgave buitenlands vermogen:</strong> Bedragen boven €50.000 moet je opgeven bij de Belastingdienst.</li>
                  <li><strong>Geen eigenwoningforfait:</strong> Als je het pand niet permanent bewoont, kun je geen eigenwoningforfait claimen.</li>
                  <li><strong>Inkomstenbelasting huur:</strong> Verhuur je het pand, dan is huurinkomsten belast in box 1.</li>
                </ul>
                <p className="mt-4 font-semibold">Advies: Raadpleeg een Nederlandse belastingadviseur voordat je koopt.</p>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Klaar om te beginnen?</h2>
              <p className="text-warm-300 mb-6">
                Ons team begeleidt je door elk stap van het koopproces. Van eigendommenzoeking tot sleutelhandover.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/nl/contact"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Neem contact op
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
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Link href="/nl/guides/nie-nummer" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">NIE-nummer</h3>
                <p className="text-warm-600 text-sm">Je Spaanse belastingnummer</p>
              </Link>
              <Link href="/nl/guides/kosten-belasting" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Kosten & belastingen</h3>
                <p className="text-warm-600 text-sm">Volledige kostenbreuk</p>
              </Link>
              <Link href="/nl/guides/hypotheek" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Hypotheek</h3>
                <p className="text-warm-600 text-sm">Financieringsmogelijkheden</p>
              </Link>
              <Link href="/nl/guides" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border-2 border-accent-200">
                <h3 className="font-semibold mb-2">Meer gidsen</h3>
                <p className="text-warm-600 text-sm">Alle gidsen bekijken</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'NIE-nummer Aanvragen | Gids voor Nederlanders 2026',
  description: 'Volledige gids voor het aanvragen van je NIE-nummer (Spaans belastingnummer). Via Spaans consulaat of in Spanje. Documenten, kosten en tijdlijn.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/nie-number',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/nie-nummer',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides/nie',
      'no': 'https://newbuildhomescostablanca.com/no/guides/nie-nummer',
    },
  },
};

const faqs = [
  {
    question: 'Verloopt het NIE-nummer ooit af?',
    answer: 'Het NIE-nummer zelf nooit - dit is van je voor het leven. Het papieren certificaat kan een vervaldatum hebben, maar je kunt altijd een nieuw certificaat met hetzelfde nummer aanvragen.',
  },
  {
    question: 'Kan ik een huis kopen zonder NIE?',
    answer: 'Nee. Het NIE is verplicht om de eigendomsdocumenten (escritura) bij de notaris te ondertekenen. Je kunt wel reservering tekenen, maar moet het hebben voor sleutelhandover.',
  },
  {
    question: 'Hebben beide partners aparte NIE\'s nodig?',
    answer: 'Ja. Als je samen koopt en beide naam op de eigendomsdocumenten staat, heeft ieder z\'n eigen NIE-nummer nodig.',
  },
  {
    question: 'Wat is het verschil tussen NIE en TIE?',
    answer: 'Het NIE is alleen een nummer. De TIE (Tarjeta de Identidad de Extranjero) is een fysieke identiteitskaart voor ingezetenen. Als niet-ingezetene heb je alleen het NIE-certificaat nodig.',
  },
  {
    question: 'Kan ik via mijn advocaat NIE aanvragen?',
    answer: 'Ja. Je kunt volmacht (Poder Notarial) aan een Spaanse advocaat geven. Zij dienen de aanvraag in en halen je certificaat. Dit gebeurt vaak automatisch bij aankoop van onroerend goed.',
  },
  {
    question: 'Hoe snel krijg ik mijn NIE?',
    answer: 'In Spanje: dezelfde dag tot 2 weken. Van buitenland: 2-4 weken. Via advocaat: 2-4 weken. Het hangt af van werkbelasting van het kantoor.',
  },
  {
    question: 'Zijn er kosten verbonden aan het NIE-nummer?',
    answer: 'Minimaal ongeveer €12 voor het overheid-leges (Modelo 790). Via advocaat betaal je €100-200 extra voor hun diensten.',
  },
];

export default function NIENummerPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'NIE-nummer', url: 'https://newbuildhomescostablanca.com/nl/guides/nie-nummer' },
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
              <span>NIE-nummer</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              NIE-nummer Aanvragen voor Nederlanders
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Alles wat je moet weten over het aanvragen van je Spaanse belastingnummer. Essentieel voor het kopen van eigendom in Spanje.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>8 min lezen</span>
              <span>•</span>
              <span>Bijgewerkt februari 2026</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* What is NIE */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Wat is een NIE-nummer?</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Het <strong>NIE (Número de Identificación de Extranjero)</strong> is een uniek identificatienummer voor buitenlanders in Spanje. Het is je Spaanse belastingnummer en is vereist voor vrijwel elke financiële of juridische transactie.
                </p>
                <p>Je hebt het NIE nodig voor:</p>
                <ul className="space-y-2 ml-4">
                  <li>Kopen of verkopen van onroerend goed</li>
                  <li>Openen van een Spaanse bankrekening</li>
                  <li>Ondertekenen van contracten (nutsvoorzieningen, telefoon, internet)</li>
                  <li>Betalen van belastingen</li>
                  <li>Werken in Spanje</li>
                  <li>Kopen van een auto</li>
                  <li>Opzetten van een bedrijf</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-900 p-4 my-6">
                  <p className="font-semibold text-primary-900">Belangrijk:</p>
                  <p className="text-primary-800">Een NIE is <strong>niet</strong> hetzelfde als inwonerschap. Het is gewoon een belastingnummer. Je kunt een NIE hebben zonder Spaanse inwoner te zijn.</p>
                </div>
              </div>
            </section>

            {/* How to Apply */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Hoe aanvragen?</h2>
              <div className="text-warm-700 space-y-4">
                <p>Er zijn twee manieren om je NIE aan te vragen:</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Optie 1: In Spanje</h3>
                <p>Je kunt persoonlijk aanvragen bij:</p>
                <ul className="space-y-2 ml-4">
                  <li><strong>Oficina de Extranjería</strong> (Vreemdelingenkantoor)</li>
                  <li><strong>Comisaría de Policía</strong> (Politiebureau met vreemdelingenafdeling)</li>
                </ul>
                <p>
                  In Costa Blanca zijn grote kantoren in Alicante, Benidorm en Torrevieja. Je moet online een afspraak boeken via het Spaanse overheidsysteem.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Optie 2: Vanuit je thuisland</h3>
                <p>
                  Je kunt aanvragen bij de Spaanse ambassade of consulaat in Nederland. Dit is vaak makkelijker omdat afspraken beter beschikbaar zijn en het personeel Engels spreekt.
                </p>
              </div>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Vereiste documenten</h2>
              <div className="bg-white rounded-sm p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <div>
                      <strong>EX-15 formulier</strong>
                      <p className="text-warm-600 text-sm">Officieel NIE-aanvraagformulier, ingevuld en ondertekend</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <div>
                      <strong>Geldig paspoort</strong>
                      <p className="text-warm-600 text-sm">Original plus kopie van alle pagina\'s</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <div>
                      <strong>Paspoto</strong>
                      <p className="text-warm-600 text-sm">Recent, paspoortgrootte</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <div>
                      <strong>Reden voor NIE</strong>
                      <p className="text-warm-600 text-sm">Document met reden (bijv. reserveringscontract eigendom)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 text-xl font-light">✓</span>
                    <div>
                      <strong>Modelo 790 Código 012</strong>
                      <p className="text-warm-600 text-sm">Belastingformulier met legesbetaling (ongeveer €12)</p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Costs and Timeline */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Kosten en tijdlijn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-3">Kosten</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>Overheidleges: <strong>~€12</strong></li>
                    <li>Via advocaat: <strong>€100-200</strong></li>
                  </ul>
                </div>
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="font-semibold mb-3">Tijdlijn</h3>
                  <ul className="space-y-2 text-warm-700">
                    <li>In Spanje: <strong>Dezelfde dag - 2 weken</strong></li>
                    <li>Vanuit buitenland: <strong>2-4 weken</strong></li>
                    <li>Via advocaat: <strong>2-4 weken</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Via Lawyer */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">NIE aanvragen via volmacht</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Als je niet naar Spanje kunt gaan of moeite hebt met afspraken, kunt je <strong>volmacht (Poder Notarial)</strong> aan een Spaanse advocaat geven.
                </p>
                <p>Dit houdt in:</p>
                <ol className="space-y-2 ml-4 list-decimal">
                  <li>Ondertekenen van een volmachtdocument (kan bij Spaans consulaat of genotarieerd)</li>
                  <li>Originele documenten naar je advocaat sturen</li>
                  <li>De advocaat dient aanvraag in en haalt je certificaat</li>
                </ol>
                <p>
                  Dit is de handiegste optie voor buitenlandse kopers en wordt vaak automatisch gedaan bij onroerendgoedaankoop.
                </p>
              </div>
            </section>

            {/* Dutch-specific info */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Voor Nederlanders specifiek</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Als Nederlander moet je extra informatie in gedachten houden:
                </p>
                <ul className="space-y-3 ml-4">
                  <li><strong>Consulaat aanvraag:</strong> Het Nederlandse Consulaat in Alicante of ambassade in Madrid kan helpen met referentie, maar stuurt niet rechtstreeks naar Spanje.</li>
                  <li><strong>Nederlandse vertalingen:</strong> Als je documenten van de gemeente hebt, worden deze soms niet erkend. Beter is het om rechtstreeks Spaanse originelen aan te vragen.</li>
                  <li><strong>Dubbelwoning:</strong> Je hoeft geen Spaanse inwoner te worden. Je NIE werkt voor niet-ingezetenen.</li>
                  <li><strong>Nederlands belastingkantoor:</strong> Meld je NIE-aanvraag NIET aan de Belastingdienst; dit gebeurt automatisch als je eigendom in Spanje koopt.</li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Hulp nodig met je NIE?</h2>
              <p className="text-warm-300 mb-6">
                Bij aankoop via ons kunnen we je NIE-aanvraag via onze juridische partners regelen. Één zorgen minder.
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
                  className="bg-success-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-success-600 transition-colors text-center"
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
                <p className="text-warm-600 text-sm">Volledige stap-voor-stap gids</p>
              </Link>
              <Link href="/nl/guides/kosten-belasting" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Kosten & belastingen</h3>
                <p className="text-warm-600 text-sm">Volledige kostenbreuk</p>
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

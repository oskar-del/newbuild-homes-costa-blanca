import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kant-en-klaar vs Op Tekening | Wat Past Bij Jou? 2026',
  description: 'Verschil tussen kant-en-klaar en op-tekening woningen in Spanje. Voordelen, risico\'s, prijzen en betalingsschema\'s.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/kant-en-klaar-vs-ritning',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/nyckelfardigt-eller-ritning',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/kant-en-klaar-vs-ritning',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/kant-en-klaar-vs-ritning',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

const faqs = [
  {
    question: 'Wat is kant-en-klaar eigenlijk?',
    answer: 'Kant-en-klaar betekent dat de woning volledig afgebouwd is en gereed voor ingebruikname. Je ziet precies wat je koopt en kunt direct intrekken na sleutelhandover.',
  },
  {
    question: 'Wat betekent op tekening?',
    answer: 'Op tekening betekent dat je een woning koopt die nog niet is gebouwd. Je koopt het baseren op plannen en modellen. De bouw duurt typisch 12-24 maanden.',
  },
  {
    question: 'Hoeveel goedkoper is op-tekening?',
    answer: 'Doorgaans 10-20% goedkoper dan kant-en-klaar. Dit is omdat de ontwikkelaar geld verdient met fase betaling en jij betaalt voor die financieringsvoordeel.',
  },
  {
    question: 'Kan ik op-tekening aanpassingen doen?',
    answer: 'Ja, maar het hangt van het moment af. Hoe vroeger in het project, hoe meer je kunt veranderen (indeling, kleuren, materialen). Naarmate de bouw vordert, minder mogelijkheden.',
  },
  {
    question: 'Wat als het project vertraging oploopt?',
    answer: 'Dit gebeurt soms. De wet geeft ontwikkelaars wat speelruimte (meestal enkele maanden). Als excessief, kun je compensatie eisen of terugtreden. Contracttermen zijn belangrijk.',
  },
  {
    question: 'Is op-tekening riskanter?',
    answer: 'Meer risico is er wat timing betreft, maar minder wat kwaliteit betreft omdat je garanties hebt. Bankgaranties beschermen je betalingen. Lees contracts zorgvuldig.',
  },
  {
    question: 'Wat zijn de betalingsschema\'s?',
    answer: 'Op tekening: Reservering (€3-10k), contract ondertekening (20-30%), fase betalingen (20-30%), oplevering (40-50%). Kant-en-klaar: Reservering en dan slotbetaling na aflevering inspectie.',
  },
];

export default function KantEnKlaarVsRitningPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Kant-en-klaar vs op tekening', url: 'https://newbuildhomescostablanca.com/nl/guides/kant-en-klaar-vs-ritning' },
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
              <span>Kant-en-klaar vs op tekening</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Kant-en-klaar of Op Tekening?
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Wat is het verschil en welke past het beste bij jou? Voordelen, risico\'s en prijzen vergeleken.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>8 min lezen</span>
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
                Een van de grote keuzes bij het kopen van nieuwbouw is: wil je een kant-en-klaar eigendom of bespaar je geld door op tekening te kopen? Allebei hebben voordelen.
              </p>
            </div>

            {/* Comparison Grid */}
            <section className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h2 className="text-2xl font-semibold mb-4">Kant-en-klaar</h2>
                  <div className="space-y-4 text-warm-700">
                    <div>
                      <p className="font-semibold">Wat je krijgt</p>
                      <p className="text-sm">Volledig afgebouwde woning, gereed om in te wonen</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prijs</p>
                      <p className="text-sm">10-20% hoger dan op tekening</p>
                    </div>
                    <div>
                      <p className="font-semibold">Beschikbaarheid</p>
                      <p className="text-sm">Direct na ondertekening</p>
                    </div>
                    <div>
                      <p className="font-semibold">Aanpassingen</p>
                      <p className="text-sm">Wat je ziet is wat je krijgt</p>
                    </div>
                    <div>
                      <p className="font-semibold">Wachten</p>
                      <p className="text-sm">Nul weken</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-sm p-6 border-l-4 border-primary-600">
                  <h2 className="text-2xl font-semibold mb-4">Op Tekening</h2>
                  <div className="space-y-4 text-warm-700">
                    <div>
                      <p className="font-semibold">Wat je krijgt</p>
                      <p className="text-sm">Woning volgens plan en specificaties</p>
                    </div>
                    <div>
                      <p className="font-semibold">Prijs</p>
                      <p className="text-sm">10-20% korting vs kant-en-klaar</p>
                    </div>
                    <div>
                      <p className="font-semibold">Beschikbaarheid</p>
                      <p className="text-sm">Na afbouw (12-24 maanden)</p>
                    </div>
                    <div>
                      <p className="font-semibold">Aanpassingen</p>
                      <p className="text-sm">Veel keuzes (kleuren, materialen, layout)</p>
                    </div>
                    <div>
                      <p className="font-semibold">Wachten</p>
                      <p className="text-sm">12-24 maanden typisch</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Voordelen Kant-en-klaar */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Voordelen kant-en-klaar</h2>
              <div className="space-y-4">
                <div className="bg-success-50 rounded-sm p-4 border-l-4 border-success-500">
                  <p><strong>Je ziet wat je koopt</strong> - Geen verrassingen, je inspectie geeft zekerheid</p>
                </div>
                <div className="bg-success-50 rounded-sm p-4 border-l-4 border-success-500">
                  <p><strong>Direct intrekken</strong> - Geen wachten, direct je leven beginnen</p>
                </div>
                <div className="bg-success-50 rounded-sm p-4 border-l-4 border-success-500">
                  <p><strong>Volledig garantie</strong> - Inspectie en snagging kunnen gelijk afgehandeld worden</p>
                </div>
                <div className="bg-success-50 rounded-sm p-4 border-l-4 border-success-500">
                  <p><strong>Geen projectrisico</strong> - Geen gedoe met vertraging of kwaliteitsproblemen</p>
                </div>
              </div>
            </section>

            {/* Voordelen Op Tekening */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Voordelen op tekening</h2>
              <div className="space-y-4">
                <div className="bg-primary-50 rounded-sm p-4 border-l-4 border-primary-600">
                  <p><strong>Lagere prijs</strong> - 10-20% besparing, kan duizenden euros schelen</p>
                </div>
                <div className="bg-primary-50 rounded-sm p-4 border-l-4 border-primary-600">
                  <p><strong>Aanpassingen mogelijk</strong> - Jij bepaalt kleuren, materialen, indeling (tot op zekere mate)</p>
                </div>
                <div className="bg-primary-50 rounded-sm p-4 border-l-4 border-primary-600">
                  <p><strong>Gefaseerde betaling</strong> - Je betaalt niet alles direct, maar gekoppeld aan bouwfasen</p>
                </div>
                <div className="bg-primary-50 rounded-sm p-4 border-l-4 border-primary-600">
                  <p><strong>Geld besparen</strong> - De besparing kan voor renovaties of inrichting gebruikt worden</p>
                </div>
              </div>
            </section>

            {/* Risico's */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Potentiële risico\'s</h2>
              <div className="bg-yellow-50 rounded-sm p-6 border-l-4 border-yellow-500">
                <h3 className="font-semibold mb-4 text-yellow-900">Op tekening specifiek:</h3>
                <ul className="space-y-3 text-yellow-800">
                  <li><strong>Vertraging:</strong> Bouw kan vertraging oplopen. Dit gebeurt soms.</li>
                  <li><strong>Kwaliteitsverschillen:</strong> Snagging problemen bij oplevering (hoewel rare bij nieuwbouw)</li>
                  <li><strong>Marktveranderingen:</strong> Rente, omstandigheden kunnen veranderen terwijl je wacht</li>
                  <li><strong>Wachtpijn:</strong> 12-24 maanden wachten is lang voor sommige kopers</li>
                </ul>
              </div>
              <div className="bg-yellow-50 rounded-sm p-6 border-l-4 border-yellow-500 mt-4">
                <h3 className="font-semibold mb-4 text-yellow-900">Kant-en-klaar specifiek:</h3>
                <ul className="space-y-3 text-yellow-800">
                  <li><strong>Hogere prijs:</strong> Je betaalt meer voor immediacy</li>
                  <li><strong>Geen keuze:</strong> Je neemt wat er is, aanpassingen zijn jezelf</li>
                </ul>
              </div>
            </section>

            {/* Betalingsschema */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Betalingsschema\'s</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold mb-4">Op tekening</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Reservering</td>
                        <td className="py-2 text-right">€3-10k</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Contract onderteken</td>
                        <td className="py-2 text-right">20-30%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Fase 1 bouw</td>
                        <td className="py-2 text-right">20%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Fase 2 bouw</td>
                        <td className="py-2 text-right">10-15%</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Oplevering</td>
                        <td className="py-2 text-right font-semibold">35-45%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold mb-4">Kant-en-klaar</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Reservering</td>
                        <td className="py-2 text-right">€3-10k</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Inspectieverslag</td>
                        <td className="py-2 text-right">Gelijk gevoerd</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Sleutelhandover</td>
                        <td className="py-2 text-right font-semibold">90-100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Decision Guide */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Welke kies jij?</h2>
              <div className="space-y-4">
                <div className="bg-accent-50 rounded-sm p-6">
                  <p className="font-semibold text-accent-900 mb-2">Kies kant-en-klaar als:</p>
                  <ul className="text-accent-800 space-y-1 ml-4">
                    <li>Je wilt direct intrekken</li>
                    <li>Je zekerheid belangrijk vindt</li>
                    <li>Je geld minder belangrijk is dan snelheid</li>
                    <li>Je het eigendom direct wilt verhuren</li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-sm p-6">
                  <p className="font-semibold text-primary-900 mb-2">Kies op tekening als:</p>
                  <ul className="text-primary-800 space-y-1 ml-4">
                    <li>Je besparing wilt</li>
                    <li>Je geduld hebt voor 12-24 maanden</li>
                    <li>Je aanpassingen wilt (kleur, materialen)</li>
                    <li>Je flexibel bent met timing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Help mij kiezen</h2>
              <p className="text-warm-300 mb-6">
                Onzeker welk type het beste voor je is? Ons team helpt je alle opties verkennen.
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
              <Link href="/nl/guides/waarom-nieuwbouw" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Waarom nieuwbouw</h3>
                <p className="text-warm-600 text-sm">Voordelen en nadelen</p>
              </Link>
              <Link href="/nl/guides/koopproces" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Koopproces</h3>
                <p className="text-warm-600 text-sm">Stap voor stap</p>
              </Link>
              <Link href="/nl/guides" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border-2 border-accent-200">
                <h3 className="font-semibold mb-2">Meer gidsen</h3>
                <p className="text-warm-600 text-sm">Alle gidsen</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

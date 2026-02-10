import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Waarom Nieuwbouw Kopen in Spanje? | Voordelen en Nadelen 2026',
  description: 'Waarom kiezen voor nieuwbouw in plaats van bestaande bouw? Garanties, energieefficiëntie, aanpassingsmogelijkheden en lage onderhoudskosten.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl/guides/waarom-nieuwbouw',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides/why-new-build',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides/varfor-nybyggd',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides/waarom-nieuwbouw',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/waarom-nieuwbouw',
      'x-default': 'https://newbuildhomescostablanca.com',
    },
  },
};

const faqs = [
  {
    question: 'Hoe lang gelden de garanties op nieuwbouw?',
    answer: 'Spaanse wet verplicht 10 jaar structurele garantie (dak, muren, fundamenten), 3 jaar technische elementen, en 1 jaar afwerking. Dit is veel langer dan in bestaande bouw.',
  },
  {
    question: 'Is nieuwbouw duurder dan bestaande bouw?',
    answer: 'Niet altijd. Op tekening is nieuwbouw often goedkoper per vierkante meter. Je betaalt IVA 10% in plaats van overdrachtsbelasting 10%, dus dezelfde belastinglast. Bestaande bouw is grondvoorraad en locatie, nieuwbouw is modern.',
  },
  {
    question: 'Kan ik aangesloten worden op duurzame energie?',
    answer: 'Ja. Nieuwbouw voldoet aan moderne BENG-normen (gelijk aan Nederlandse eisen). Veel ontwikkelingen hebben zonnepanelen, warmtepompen en geavanceerde isolatie.',
  },
  {
    question: 'Hoeveel onderhoudskosten heb ik?',
    answer: 'Veel lager dan bestaande bouw. Geen vervanging ramen, dak of leidingen nodig. Je betaalt gemeenschapskosten maar geen grote renovaties. Schat €50-150/maand.',
  },
  {
    question: 'Wat als het project niet af wordt?',
    answer: 'Spaanse wet verplicht bankgaranties voor alle betalingen. Als faillissement, krijg je je geld terug. Zelden voorkomend, maar die bescherming bestaat.',
  },
  {
    question: 'Kan ik de indeling of afwerking veranderen?',
    answer: 'Ja, tot zekere mate. Bij op-tekening heb je meestal veel keuze. Bij in-aanbouw minder. Details en kleuren kun je bij meeste projecten nog aanpassen.',
  },
  {
    question: 'Hoe lang moet ik wachten op oplevering?',
    answer: 'Op tekening: 12-24 maanden. In aanbouw: 6-12 maanden. Kant-en-klaar: direct intrekbaar. Het hangt van je geduld af en wil je lagere prijs of snellere oplevering.',
  },
];

export default function WaaromNieuwbouwPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl/guides' },
    { name: 'Waarom nieuwbouw', url: 'https://newbuildhomescostablanca.com/nl/guides/waarom-nieuwbouw' },
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
              <span>Waarom nieuwbouw</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Waarom Kiezen voor Nieuwbouw?
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Voordelen van nieuwbouw in Spanje. Garanties, energieefficiëntie, aanpassingsmogelijkheden en lage onderhoudskosten.
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

            {/* Intro */}
            <div className="mb-12">
              <p className="text-xl text-warm-700 leading-relaxed">
                Het verschil tussen nieuwbouw en bestaande bouw in Spanje is niet zo groot als je misschien denkt. Maar er zijn aanzienlijke voordelen die nieuwbouw voor veel Nederlanders aantrekkelijker maken.
              </p>
            </div>

            {/* Voordelen */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Voordelen van nieuwbouw</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-3">10-jarige structurele garantie</h3>
                  <p className="text-warm-700">
                    Spaanse bouwwet verplicht ontwikkelaars 10 jaar garantie op structurele elementen (fundering, muren, dak). Plus 3 jaar op technische systemen en 1 jaar op afwerking. Bij bestaande bouw krijg je niets.
                  </p>
                </div>

                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-3">Moderne energiestandaarden</h3>
                  <p className="text-warm-700">
                    Nieuwbouw voldoet aan actuele BENG-normen (gelijk aan Nederlandse eisen). Betere isolatie, moderne verwarmingssystemen, soms al zonnepanelen. Lagere energierekeningen en meer comfort.
                  </p>
                </div>

                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-3">Lage onderhoudskosten</h3>
                  <p className="text-warm-700">
                    Geen vervanging van ramen, daken of oude leidingen nodig. Je gemeenschapskosten zijn voor onderhoud, maar geen grote renovaties. Schat 50-150 euro per maand extra kosten.
                  </p>
                </div>

                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-3">Bankgarantie bescherming</h3>
                  <p className="text-warm-700">
                    Spaanse wet verplicht ontwikkelaars bankgaranties voor alle betalingen. Mocht een project failliet gaan, je krijgt je geld terug. Dit risico is veel lager.
                  </p>
                </div>

                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-3">Aanpassingsmogelijkheden</h3>
                  <p className="text-warm-700">
                    Bij op-tekening kun je meestal kleur, materialen en indeling kiezen (tot op zekere hoogte). Bij bestaande bouw krijg je wat je ziet.
                  </p>
                </div>

                <div className="bg-white rounded-sm p-6 border-l-4 border-accent-500">
                  <h3 className="text-xl font-semibold mb-3">Moderne design</h3>
                  <p className="text-warm-700">
                    Nieuwbouw volgt huideige trends en technieken. Open plannen, duurzame materialen, moderne badkamers/keukens. Aantrekkelijker voor toekomst verhuur of verkoop.
                  </p>
                </div>
              </div>
            </section>

            {/* Nadelen */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Overwegingen/nadelen</h2>
              <div className="space-y-6">
                <div className="bg-warm-50 rounded-sm p-6 border-l-4 border-warm-400">
                  <h3 className="text-xl font-semibold mb-3">Wachten op oplevering</h3>
                  <p className="text-warm-700">
                    Op-tekening kan 12-24 maanden duren. Je ziet je woning pas klaar. Dit kan voor sommige kopers lastig zijn.
                  </p>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border-l-4 border-warm-400">
                  <h3 className="text-xl font-semibold mb-3">Vertrouwen in ontwikkelaar</h3>
                  <p className="text-warm-700">
                    Je rekent op dat het project op tijd en naar kwaliteit wordt afgemaakt. Een goede advocaat controleert dit voor je.
                  </p>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border-l-4 border-warm-400">
                  <h3 className="text-xl font-semibold mb-3">Kleine gemeenschappen</h3>
                  <p className="text-warm-700">
                    Nieuwe projecten hebben nog weinig geschiedenis. Gemeenschapssfeer moet nog groeien. Onderhoud kan in eerste jaren wat chaotisch zijn.
                  </p>
                </div>
              </div>
            </section>

            {/* Nieuwbouw vs Bestaande */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Nieuwbouw vs bestaande bouw</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-warm-800 text-white">
                      <th className="p-3 text-left">Aspect</th>
                      <th className="p-3 text-left">Nieuwbouw</th>
                      <th className="p-3 text-left">Bestaande bouw</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Garanties</td>
                      <td className="p-3">10 jaar structureel</td>
                      <td className="p-3">Geen</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Energie-efficiëntie</td>
                      <td className="p-3">Modern (A/B label)</td>
                      <td className="p-3">Veel variatie (F/G)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Onderhoudskosten</td>
                      <td className="p-3">Laag (jaar 1-15)</td>
                      <td className="p-3">Variabel tot hoog</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Renovatie nodig?</td>
                      <td className="p-3">Nee</td>
                      <td className="p-3">Soms</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Directe beschikbaarheid</td>
                      <td className="p-3">Nee (wachtijd)</td>
                      <td className="p-3">Ja (direct)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-semibold">Lokatie keuze</td>
                      <td className="p-3">Beperkt</td>
                      <td className="p-3">Veel meer</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Aanpassingen</td>
                      <td className="p-3">Mogelijk (op-tekening)</td>
                      <td className="p-3">Jezelf doen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* For Dutch buyers */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Voor Nederlanders specifiek</h2>
              <div className="text-warm-700 space-y-4">
                <p>
                  Waar veel Nederlanders in Nederland gewend zijn aan strenge bouwkwaliteit (NEN-normen), is Spaanse nieuwbouw ook goed geregeld:
                </p>
                <ul className="space-y-3 ml-4">
                  <li><strong>BENG-vergelijkbaar:</strong> Energiecertificaten net zo streng als in Nederland</li>
                  <li><strong>Geen kwaliteitsverschil:</strong> Spaanse bouw is modern en onderhouden volgens EU-richtlijnen</li>
                  <li><strong>Geen makelaar gedoe:</strong> Anders dan in Nederland geen biedingen waarbij makelaars procedures manipuleren</li>
                  <li><strong>Risico beperkter:</strong> Bankgaranties geven meer bescherming dan Nederlandse bouwfonds</li>
                </ul>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-900 rounded-sm p-8 mb-12 text-white">
              <h2 className="text-2xl font-semibold mb-4">Ontdek nieuwbouw projecten</h2>
              <p className="text-warm-300 mb-6">
                Wil je nieuwbouw in Costa Blanca verkennen? We hebben projecten in alle prijsklassen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/nl/properties"
                  className="bg-accent-500 text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition-colors text-center"
                >
                  Zie projecten
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
              <Link href="/nl/guides/kant-en-klaar-vs-ritning" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Kant-en-klaar vs op tekening</h3>
                <p className="text-warm-600 text-sm">Wat is het verschil?</p>
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

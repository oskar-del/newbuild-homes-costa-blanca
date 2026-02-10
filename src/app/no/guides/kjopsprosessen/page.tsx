import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Kjøpsprosessen i Spania | Komplett Guide 2026',
  description: 'Steg-for-steg guide til å kjøpe nybyggen i Spania. Reservasjon, NIE-nummer, kontrakt, notarius — alt du trenger å vite for norske kjøpere.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/kjopsprosessen',
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
    question: 'Hvor lang tid tar det å kjøpe eiendom i Spania?',
    answer: 'For innflyttingsklar eiendom tar kjøp typisk 8-12 uker fra reservasjon til fullføring. For på tegning-kjøp signerer du kontrakt innen 30-60 dager, deretter venter du 12-24 måneder på ferdigstillelse.',
  },
  {
    question: 'Trenger jeg en advokat?',
    answer: 'Det er ikke juridisk påkrevd, men vi sterkt anbefaler det. En uavhengig advokat sjekker kontrakter, verifiserer at eiendommen er lovlig, håndterer NIE-søknaden og representerer deg hos notarius. Kostnad typisk 1-1,5% av kjøpesum.',
  },
  {
    question: 'Kan jeg kjøpe eiendom uten NIE-nummer?',
    answer: 'Nei. NIE (Número de Identificación de Extranjero) er obligatorisk for alle eiendomskjøp i Spania. Du trenger det også for å åpne bankkonto, inngå kontraktene og betale skatter. Søk tidlig — prosessen tar 1-4 uker.',
  },
  {
    question: 'Hvor stort depositum må jeg betale?',
    answer: 'Du betaler typisk 3.000-10.000 euro som reservasjonsdeposit, deretter 20-30% ved kontraktsignering. For på tegning-eiendommer betales ytterligere 20-30% under konstruksjon, med 40-50% ved fullføring.',
  },
  {
    question: 'Er depositummet mitt sikret?',
    answer: 'Ja. Spansk lov (LOV 20/2015) krever at utviklere gir bankgaranti eller forsikring for alle betalinger før fullføring. Hvis utvikleren mislykkes, får du full refusjon med renter.',
  },
  {
    question: 'Hva slags skatter betaler jeg ved kjøp?',
    answer: 'Nybygg: 10% IVA pluss cirka 1,5% stempelavgift (AJD). Totale kostnader inkludert skatter, notarius og juridiske gebyrer er typisk 13-14% av kjøpesummen.',
  },
  {
    question: 'Kan jeg få boliglån i Spania?',
    answer: 'Ja. Spanske banker låner til ikke-bosatte, typisk opptil 60-70% av eiendomsverdien. Du trenger innteksbevis, skatteselvangivelse og kontoutskrifter. Gjeldende fast rente ligger rundt 3-4%.',
  },
];

export default function KjopsProcessenPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'Kjøpsprosessen', url: 'https://newbuildhomescostablanca.com/no/guides/kjopsprosessen' },
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
              <Link href="/no/guides" className="hover:text-white">Guider</Link>
              <span className="mx-2">→</span>
              <span>Kjøpsprosessen</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Kjøpsprosessen i Spania — Komplett Guide
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Steg-for-steg guide til å kjøpe nybyggen i Spania. Fra reservasjon til nøkler — alt norske kjøpere trenger å vite.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>Oppdatert Februar 2026</span>
              <span>•</span>
              <span className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded-sm">Norsk Fokus</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-warm-700 leading-relaxed">
                Å kjøpe nybyggen i Spania kan virke komplisert som norsk kjøper, men prosessen er faktisk ganske tydelig når du vet hva som skal skje. Denne guiden leder deg gjennom hvert steg — fra valg av eiendom til du mottar nøklene.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-warm-50 rounded-sm p-6 mb-12 border border-warm-200">
              <h2 className="text-lg font-semibold mb-4">I denne guiden</h2>
              <ol className="space-y-2 text-warm-700">
                <li><a href="#steg-1" className="text-accent-600 hover:underline">1. Søk og Valg av Eiendom</a></li>
                <li><a href="#steg-2" className="text-accent-600 hover:underline">2. Reservasjonsavtale</a></li>
                <li><a href="#steg-3" className="text-accent-600 hover:underline">3. NIE-nummer</a></li>
                <li><a href="#steg-4" className="text-accent-600 hover:underline">4. Spansk Bankkonto</a></li>
                <li><a href="#steg-5" className="text-accent-600 hover:underline">5. Kjøpskontrakt</a></li>
                <li><a href="#steg-6" className="text-accent-600 hover:underline">6. Etappebetaling Under Konstruksjon</a></li>
                <li><a href="#steg-7" className="text-accent-600 hover:underline">7. Inspeksjon Før Fullføring</a></li>
                <li><a href="#steg-8" className="text-accent-600 hover:underline">8. Fullføring hos Notarius</a></li>
              </ol>
            </div>

            {/* Step 1 */}
            <section id="steg-1" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">1</span>
                Søk og Valg av Eiendom
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Start med å definere dine behov: lokasjon, eiendomstype, budsjett og tidslinje. For nybygg velger du typisk mellom:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>På tegning:</strong> Kjøp før konstruksjon ferdigstilles (ofte 12-24 måneder). Lavere inngang, flere valg av finales.</li>
                  <li><strong>Under konstruksjon:</strong> Bygget har startet, ferdigstillelse innen 6-12 måneder.</li>
                  <li><strong>Innflyttingsklar:</strong> Ferdig og klar til bruk. Det du ser er det du får.</li>
                </ul>
                <p>
                  Vi anbefaler å besøke Costa Blanca for å se utviklinger personlig. Vi tilbyr visningsturer for norske kjøpere.
                </p>
              </div>
            </section>

            {/* Step 2 */}
            <section id="steg-2" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">2</span>
                Reservasjonsavtale
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Når du har funnet din eiendom, signerer du en reservasjonsavtale og betaler et depositum for å ta eiendommen av markedet. Dette er typisk:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>3.000 - 10.000 euro</strong> avhengig av eiendomsverdi</li>
                  <li>Vanligvis holdt for <strong>30-60 dager</strong> mens du ordner finansiering og papirer</li>
                  <li>Normalt <strong>trukket fra kjøpesummen</strong></li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
                  <p className="font-semibold text-yellow-800">Viktig:</p>
                  <p className="text-yellow-700">Reservasjonsdepositum kan være ikke-refunderbart hvis du trekker deg uten gyldig grunn. Les vilkårene nøye før du signerer.</p>
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section id="steg-3" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">3</span>
                NIE-nummer
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  <strong>NIE (Número de Identificación de Extranjero)</strong> er ditt spanske skatteid-nummer. Du kan ikke kjøpe eiendom, åpne bankkonto eller knytte strøm uten det.
                </p>
                <p>Du kan søke:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>I Spania:</strong> Hos Extranjería (Utlendingsmyndigheten) eller politistasjonen</li>
                  <li><strong>Fra Norge:</strong> Hos spansk ambassade eller konsulat</li>
                </ul>
                <p>
                  Behandlingstiden er typisk 1-4 uker. Mange advokater kan håndtere dette for deg via fullmakt.
                </p>
                <p className="mt-4">
                  <Link href="/no/guides/nie-nummer" className="text-accent-600 font-semibold hover:underline">
                    → Les vår komplette NIE-nummer Guide
                  </Link>
                </p>
              </div>
            </section>

            {/* Step 4 */}
            <section id="steg-4" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">4</span>
                Spansk Bankkonto
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Du trenger en spansk bankkonto for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Betale kjøpesummen og skatter</li>
                  <li>Lage fast betaling for strøm og fellesgebyrer</li>
                  <li>Boliglånsbetalinger (hvis aktuelt)</li>
                </ul>
                <p>
                  Større banker som Sabadell, CaixaBank og Santander har erfaring med internasjonale kjøpere. Du trenger NIE-nummer, pass og inntektsbevis.
                </p>
              </div>
            </section>

            {/* Step 5 */}
            <section id="steg-5" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">5</span>
                Kjøpskontrakt
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  <strong>Contrato de Compraventa</strong> er den bindende kjøpskontrakten mellom deg og utvikleren. Ved signering betaler du:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>20-30% av kjøpesummen</strong> (minus reservasjonsdepositum)</li>
                </ul>
                <p>Kontrakten skal inkludere:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full eiendomsbeskrivelse og planer</li>
                  <li>Betalingsplan</li>
                  <li>Forventet fullføringsdato</li>
                  <li>Straffeklausuler for forsinkelser</li>
                  <li>Bankgarantidetaljor (obligatorisk i Spania)</li>
                </ul>
                <div className="bg-primary-50 border-l-4 border-primary-600 p-4 my-6">
                  <p className="font-semibold text-primary-800">Bankgarantibeskyttelse</p>
                  <p className="text-primary-700">Spansk lov krever at utviklere gir bankgaranti eller forsikring for alle etappebetalinger. Hvis utvikleren ikke leverer, får du full refusjon av betalinger gjort.</p>
                </div>
              </div>
            </section>

            {/* Step 6 */}
            <section id="steg-6" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">6</span>
                Etappebetaling Under Konstruksjon
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  For på tegning-eiendommer betaler du knyttet til konstruksjonsmerkeposter. En typisk plan:
                </p>
                <table className="w-full border-collapse my-6">
                  <thead>
                    <tr className="bg-warm-100">
                      <th className="border p-3 text-left">Etappe</th>
                      <th className="border p-3 text-left">Typisk %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-3">Reservasjon</td><td className="border p-3">3.000-10.000 euro</td></tr>
                    <tr><td className="border p-3">Kontraktsignering</td><td className="border p-3">20-30%</td></tr>
                    <tr><td className="border p-3">Under konstruksjon</td><td className="border p-3">20-30%</td></tr>
                    <tr><td className="border p-3">Fullføring</td><td className="border p-3">40-50%</td></tr>
                  </tbody>
                </table>
                <p>
                  Oppbevar alle betalingskvitteringer og bankgarantisertifikater på et sikkert sted.
                </p>
              </div>
            </section>

            {/* Step 7 */}
            <section id="steg-7" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">7</span>
                Inspeksjon Før Fullføring
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Før fullføring bør du (eller en profesjonell inspektør) sjekke eiendommen og lage en <strong>manglerliste</strong> over eventuelle defekter:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maling og finales</li>
                  <li>Dører, vinduer og låser</li>
                  <li>Rørleggerarbeid og drenering</li>
                  <li>Elektriske installasjoner</li>
                  <li>Fliser og gulv</li>
                  <li>Klimaanlegg og apparater</li>
                </ul>
                <p>
                  Utvikleren må fikse mangler før fullføring eller godta tilbakeholdelse fra siste betaling.
                </p>
              </div>
            </section>

            {/* Step 8 */}
            <section id="steg-8" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <span className="bg-accent-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg">8</span>
                Fullføring hos Notarius
              </h2>
              <div className="text-warm-700 space-y-3">
                <p>
                  Det siste steget skjer hos en spansk notarius der du:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Signerer <strong>Escritura</strong> (eiendomsdeed)</li>
                  <li>Betaler siste saldo</li>
                  <li>Betaler IVA (mva) og stempelavgift</li>
                  <li>Mottar nøklene!</li>
                </ul>
                <p>
                  Du kan møte personlig eller gi fullmakt til din advokat. Etter signering registrerer advokaten eiendommen hos Tinglysingskontoret.
                </p>
              </div>
            </section>

            {/* Costs Summary */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Totale Kostnader — Oversikt</h2>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Kostnadstype</th>
                      <th className="text-right py-3">Beløp</th>
                    </tr>
                  </thead>
                  <tbody className="text-warm-700">
                    <tr className="border-b"><td className="py-3">Kjøpesum</td><td className="text-right">100%</td></tr>
                    <tr className="border-b"><td className="py-3">IVA (mva) — nybygg</td><td className="text-right">10%</td></tr>
                    <tr className="border-b"><td className="py-3">Stempelavgift (AJD)</td><td className="text-right">1,5%</td></tr>
                    <tr className="border-b"><td className="py-3">Notariusgebyrer</td><td className="text-right">800-1.500 euro</td></tr>
                    <tr className="border-b"><td className="py-3">Tinglysing</td><td className="text-right">400-800 euro</td></tr>
                    <tr className="border-b"><td className="py-3">Juridiske gebyrer</td><td className="text-right">1-1,5%</td></tr>
                    <tr className="font-semibold"><td className="py-3">Totale tilleggskostnader</td><td className="text-right">~13-14%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-warm-600">
                <Link href="/no/guides/kostnader-skatt" className="text-accent-600 font-semibold hover:underline">
                  → Les vår detaljerte Kostnader & Skatter Guide
                </Link>
              </p>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Klar til å Starte Søket?</h2>
              <p className="text-warm-700 mb-6">
                Vårt norske team spesialiserer seg i nybygg på Costa Blanca. Vi leder deg gjennom hvert steg av kjøpsprosessen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/no/contact"
                  className="bg-accent-600 text-white px-6 py-3 rounded-sm font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Kontakt Oss
                </Link>
                <a
                  href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                  className="border-2 border-accent-600 text-accent-600 px-6 py-3 rounded-sm font-semibold hover:bg-primary-50 transition-colors text-center"
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
            <h2 className="text-3xl font-semibold text-center mb-8">Ofte Stilte Spørsmål</h2>
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
        <section className="py-16 bg-warm-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">Andre Guider</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/no/guides/nie-nummer" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">NIE-nummer Guide</h3>
                <p className="text-warm-600 text-sm">Hvordan du får ditt spanske skatteid-nummer</p>
              </Link>
              <Link href="/no/guides/kostnader-skatt" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kostnader & Skatter</h3>
                <p className="text-warm-600 text-sm">Full oversikt over alle kostnader</p>
              </Link>
              <Link href="/no/guides/boliglan" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Boliglån</h3>
                <p className="text-warm-600 text-sm">Finansiering for norske kjøpere</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

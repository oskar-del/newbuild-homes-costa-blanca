import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Innflyttingsklar vs På Tegning | Hva Passer Best? 2026',
  description: 'Sammenlign innflyttingsklar og på tegning-eiendom. Priser, betalingsplaner, ventetid, risiko — hvilken passer din situasjon?',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides/innflyttingsklar-tegning',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/key-ready-vs-off-plan',
      no: 'https://newbuildhomescostablanca.com/no/guides/innflyttingsklar-tegning',
    },
  },
};

const faqs = [
  {
    question: 'Hva betyr innflyttingsklar?',
    answer: 'Innflyttingsklar betyr at eiendommen er helt ferdig bygget, har alle lisenser, og du kan flytte inn nesten umiddelbart etter kjøp. Du kjøper et ferdig produkt.',
  },
  {
    question: 'Hva betyr på tegning?',
    answer: 'På tegning betyr at du kjøper en eiendom før eller under konstruksjon. Du kjøper basert på arkitekturplaner, 3D-renderinger, og eventuelt visningsboliger.',
  },
  {
    question: 'Hvor stor prisforskjell er det?',
    answer: 'Typisk 20-40% billigere på tegning ved lansering. En 3-romsvilla på 400.000 euro innflyttingsklar kan koste 320.000 euro som første fase på tegning.',
  },
  {
    question: 'Er pengene mine sikre når jeg kjøper på tegning?',
    answer: 'Ja. Spansk lov krever bankgaranti for alle betalinger før fullføring. Hvis utvikleren mislykkes, får du full refusjon med renter.',
  },
  {
    question: 'Kan jeg få boliglån for på tegning-eiendom?',
    answer: 'Ja. Du får typisk pre-godkjenning tidlig, deretter finaliseres lånet når eiendommen nærmer seg ferdigstillelse. Boliglånet finansierer den siste betalingen (50-60%).',
  },
  {
    question: 'Hva hvis konstruksjonen blir forsinket?',
    answer: 'Forsinkelser på 3-6 måneder dekkes vanligvis av kontraktsbestemmelser. Større forsinkelser kan gi rett til kompensasjon eller kontraktsoppløsning.',
  },
  {
    question: 'Er det bedre for utleie?',
    answer: 'For utleie avhenger det. Innflyttingsklar gir umiddelbar inntekt, men høyere innledende investering. På tegning er lavere kostnad, men du venter på inntekt.',
  },
  {
    question: 'Kan jeg velge finales på tegning?',
    answer: 'Ofte ja, spesielt hvis du kjøper i fase 1. Jo tidligere, jo flere valg av gulv, kjøkken, fliser og armaturer.',
  },
];

export default function InnflyttingsklarTegningPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no' },
    { name: 'Guider', url: 'https://newbuildhomescostablanca.com/no/guides' },
    { name: 'Innflyttingsklar vs Tegning', url: 'https://newbuildhomescostablanca.com/no/guides/innflyttingsklar-tegning' },
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
              <span>Innflyttingsklar vs Tegning</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              Innflyttingsklar vs På Tegning — Hva Passer Deg?
            </h1>
            <p className="text-xl text-warm-300 max-w-2xl">
              Flytte inn nå eller spare penger? Forstå fordeler, ulemper og betalingsplaner for hvert alternativ.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warm-200">
              <span>Oppdatert Februar 2026</span>
              <span>•</span>
              <span className="bg-accent-500/20 text-accent-300 px-2 py-1 rounded-sm">Norsk Guide</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Quick Comparison */}
            <div className="bg-primary-50 border-2 border-primary-200 rounded-sm p-6 mb-12">
              <h2 className="text-xl font-semibold mb-3 text-primary-900">Hurtig Sammenligning</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-success-50 rounded-sm p-4">
                  <h3 className="font-bold text-success-800 mb-2">Innflyttingsklar</h3>
                  <ul className="text-success-700 space-y-1">
                    <li>Flytt inn innen uker</li>
                    <li>Du ser akkurat hva du kjøper</li>
                    <li>Full betaling ved kjøp</li>
                    <li>Høyere pris per enhet</li>
                    <li>Ingen konstruksjonsrisiko</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-sm p-4">
                  <h3 className="font-bold text-blue-800 mb-2">På Tegning</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>Vent 12-24 måneder</li>
                    <li>Kjøp fra planer/renderinger</li>
                    <li>Etappebetalinger</li>
                    <li>Lanserings-prisfordel</li>
                    <li>Bankgaranti-beskyttelse</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Innflyttingsklar */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Innflyttingsklar — Fordeler og Ulemper</h2>

              <h3 className="text-xl font-semibold mb-3 text-success-800">Fordeler</h3>
              <ul className="space-y-2 text-warm-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Umiddelbar tilgjengelighet</strong> — flytt inn innen 4-8 uker</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Ingen konstruksjonsrisiko</strong> — ingen forsinkelser, ingen overraskelser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Se akkurat hva du kjøper</strong> — besøk og inspiser den faktiske enheten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">✓</span>
                  <span><strong>Umiddelbar utleie-inntekt</strong> — start å tjene fra dag 1</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-orange-800">Ulemper</h3>
              <ul className="space-y-2 text-warm-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Høyere pris</strong> — du betaler det endelige markedsprisen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Begrenset utvalg</strong> — beste enheter ofte allerede solgt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Ingen tilpassing</strong> — finales er faste</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Full betaling påkrevd</strong> — behov for alle midler på en gang</span>
                </li>
              </ul>
            </section>

            {/* På Tegning */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">På Tegning — Fordeler og Ulemper</h2>

              <h3 className="text-xl font-semibold mb-3 text-blue-800">Fordeler</h3>
              <ul className="space-y-2 text-warm-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Lanserings-priser</strong> — typisk 20-40% under ferdigstillelse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Beste enhetvalg</strong> — velg din foretrukne plot/etasje/orientering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Etappebetalinger</strong> — spread kostnad over 12-24 måneder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Tilpassing av finales</strong> — velg gulv, kjøkken, fliser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Tid til finansiering</strong> — boliglån trengs bare ved fullføring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span><strong>Innebygd egenkapitalvinst</strong> — prisøkning under konstruksjon</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-orange-800">Ulemper</h3>
              <ul className="space-y-2 text-warm-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Venteperiode</strong> — typisk 12-24 måneder til fullføring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Kjøp "blind"</strong> — kan bare se planer og renderinger</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Mulige forsinkelser</strong> — konstruksjon kan ta lengre tid</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✗</span>
                  <span><strong>Markedsrisiko</strong> — eiendomsverdier kan endre seg</span>
                </li>
              </ul>
            </section>

            {/* Payment Comparison */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Betalingsplaner Sammenlignet</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-sm shadow p-5 border border-warm-200">
                  <h3 className="font-bold text-success-800 mb-4">Innflyttingsklar Betaling</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Reservasjon</span>
                      <span className="font-semibold">3.000-10.000 euro</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kontraktsignering</span>
                      <span className="font-semibold">10% (minus reservasjon)</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>Fullføring (4-8 uker)</span>
                      <span className="font-semibold">Resten 90%</span>
                    </div>
                  </div>
                  <p className="text-warm-600 text-xs mt-4">
                    Plus ~13% for skatter, notarius, gebyrer
                  </p>
                </div>

                <div className="bg-white rounded-sm shadow p-5 border border-warm-200">
                  <h3 className="font-bold text-blue-800 mb-4">På Tegning Betaling</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Reservasjon</span>
                      <span className="font-semibold">3.000-10.000 euro</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kontrakt (30 dager)</span>
                      <span className="font-semibold">20-30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Under konstruksjon</span>
                      <span className="font-semibold">20-30%</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span>Fullføring (12-24 måneder)</span>
                      <span className="font-semibold">30-50%</span>
                    </div>
                  </div>
                  <p className="text-warm-600 text-xs mt-4">
                    Nøyaktig plan varierer etter utvikler
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800">Viktig:</p>
                <p className="text-yellow-700">
                  Betalinger før fullføring må være beskyttet av <strong>bankgaranti</strong>. Hvis utvikleren mislykkes, får du pengene tilbake med renter. Verifiser alltid denne garantien før betaling.
                </p>
              </div>
            </section>

            {/* Price Example */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Eksempel: Faktiske Prisforskjeller</h2>
              <p className="text-warm-700 mb-4">
                Slik prises typisk samme bygging:
              </p>

              <div className="bg-white rounded-sm shadow overflow-hidden border border-warm-200 mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-warm-100">
                    <tr>
                      <th className="p-4 text-left">Kjøpestadium</th>
                      <th className="p-4 text-center">3-Romsvilla Pris</th>
                      <th className="p-4 text-center">Sparing vs Innflyttingsklar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-4">Fase 1 Lansering (fundament)</td>
                      <td className="p-4 text-center font-semibold text-success-600">320.000 euro</td>
                      <td className="p-4 text-center text-success-600">-20% (80.000 euro)</td>
                    </tr>
                    <tr className="border-t bg-warm-50">
                      <td className="p-4">Fase 2 (struktur ferdig)</td>
                      <td className="p-4 text-center font-semibold">350.000 euro</td>
                      <td className="p-4 text-center text-success-600">-12,5% (50.000 euro)</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4">Fase 3 (nær ferdig)</td>
                      <td className="p-4 text-center font-semibold">380.000 euro</td>
                      <td className="p-4 text-center text-success-600">-5% (20.000 euro)</td>
                    </tr>
                    <tr className="border-t bg-warm-50">
                      <td className="p-4 font-bold">Innflyttingsklar (ferdig)</td>
                      <td className="p-4 text-center font-bold">400.000 euro</td>
                      <td className="p-4 text-center">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-success-50 border-l-4 border-success-500 p-4">
                <p className="font-semibold text-success-800">Matematikken:</p>
                <p className="text-success-700">
                  Fase 1-kjøp sparer 80.000 euro sammenlignet med innflyttingsklar — det er penger for møbler, bil og flere år med fellesgebyrer.
                </p>
              </div>
            </section>

            {/* Decision Guide */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Hvilken Skal Du Velge?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-success-50 rounded-sm p-6 border border-success-200">
                  <h3 className="font-bold text-success-800 text-lg mb-4">Velg Innflyttingsklar Hvis:</h3>
                  <ul className="space-y-2 text-success-700">
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 mt-1">✓</span>
                      <span>Du må flytte snart (relokasjon, pensjon)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 mt-1">✓</span>
                      <span>Du vil ha umiddelbar leie-inntekt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 mt-1">✓</span>
                      <span>Du foretrekker å se det du kjøper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 mt-1">✓</span>
                      <span>Du har penger tilgjengelig nå</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 mt-1">✓</span>
                      <span>Du er risikoavers for konstruksjon</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-sm p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 text-lg mb-4">Velg På Tegning Hvis:</h3>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Verdi for pengene er prioritet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Du kan vente 12-24 måneder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Du vil velge din eksakte enhet/plot</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Du trenger tid til å spare penger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Du vil tilpasse finales</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary-50 rounded-sm p-8 mb-12 border border-primary-200">
              <h2 className="text-2xl font-semibold mb-4">Trenger du Hjelp til å Bestemme?</h2>
              <p className="text-warm-700 mb-6">
                Vi har både innflyttingsklar og på tegning-eiendommer på Costa Blanca. Beskriv dine prioriteringer og vi anbefaler beste alternativene for deg.
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

        {/* FAQs */}
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
              <Link href="/no/guides/hvorfor-nybygg" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Hvorfor Nybygg?</h3>
                <p className="text-warm-600 text-sm">Fordeler med nybygg</p>
              </Link>
              <Link href="/no/guides/kjopsprosessen" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kjøpsprosessen</h3>
                <p className="text-warm-600 text-sm">Steg-for-steg guide</p>
              </Link>
              <Link href="/no/guides/kostnader-skatt" className="bg-white p-6 rounded-sm shadow hover:shadow-lg transition-shadow border border-warm-200">
                <h3 className="font-semibold mb-2">Kostnader & Skatter</h3>
                <p className="text-warm-600 text-sm">Kostnadsberegning</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

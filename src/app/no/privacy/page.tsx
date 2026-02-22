import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Personvernpolicy | New Build Homes Costa Blanca',
  description: 'Personvernpolicy for New Build Homes Costa Blanca. Lær hvordan vi samler inn, bruker og beskytter dine personlige data.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/privacy',
  },
};

export default function PrivacyPageNo() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Personvernpolicy', url: 'https://newbuildhomescostablanca.com/no/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/no/" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Personvernpolicy</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Personvernpolicy
            </h1>
            <p className="text-warm-300 mt-4">
              Sist oppdatert: Februar 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Innledning</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;vi,&quot; &quot;vår,&quot; eller &quot;oss&quot;) er forpliktet til å beskytte ditt personvern.
                Denne personvernpolicyen forklarer hvordan vi samler inn, bruker, avslører og beskytter informasjonen din når du
                besøker nettsiden vår newbuildhomescostablanca.com.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Informasjon vi samler inn</h2>

              <h3 className="text-lg font-semibold text-primary-900">Personlig informasjon</h3>
              <p className="text-warm-700">
                Når du fyller ut kontaktskjemaene eller forespørselsskjemaene våre, kan vi samle inn:
              </p>
              <ul className="text-warm-700">
                <li>Navn</li>
                <li>E-postadresse</li>
                <li>Telefonnummer</li>
                <li>Eiendomspreferanser og krav</li>
                <li>Budsjettintervall</li>
                <li>Tidsplan for kjøp</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Automatisk innsamlet informasjon</h3>
              <p className="text-warm-700">
                Når du besøker nettsiden vår, kan vi automatisk samle inn viss informasjon inkludert:
              </p>
              <ul className="text-warm-700">
                <li>IP-adresse</li>
                <li>Nettlesertype og versjon</li>
                <li>Besøkte sider og tid brukt</li>
                <li>Refererende nettsted</li>
                <li>Enhetsinformasjon</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Informasjonskapsler</h2>
              <p className="text-warm-700">
                Vi bruker informasjonskapsler og lignende sporingsteknikker for å forbedre nettleseropplevelsen din.
                Du kan kontrollere cookie-innstillinger gjennom informasjonskapsel-samtykkesbanneret vårt.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Typer informasjonskapsler vi bruker</h3>
              <ul className="text-warm-700">
                <li><strong>Essensielle informasjonskapsler:</strong> Nødvendig for at nettstedet skal fungere korrekt</li>
                <li><strong>Analyseinformasjonskapsler:</strong> Hjelper oss å forstå hvordan besøkende bruker nettstedet vårt (Google Analytics)</li>
                <li><strong>Markedsføringsinformasjonskapsler:</strong> Brukes til å spore besøkende på tvers av nettsteder for annonseringsformål</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Hvordan vi bruker informasjonen din</h2>
              <p className="text-warm-700">Vi bruker informasjonen vi samler inn til å:</p>
              <ul className="text-warm-700">
                <li>Svare på dine spørsmål og eiendomsforespørsler</li>
                <li>Sende deg informasjon om eiendommer som oppfyller dine kriterier</li>
                <li>Forbedre nettsiden og tjenestene våre</li>
                <li>Analysere bruksmønstre på nettstedet</li>
                <li>Oppfylle juridiske forpliktelser</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Datadeling</h2>
              <p className="text-warm-700">
                Vi kan dele informasjonen din med:
              </p>
              <ul className="text-warm-700">
                <li>Eiendomsutviklere og bygherrer når du viser interesse for spesifikke utviklingsprosjekter</li>
                <li>Våre pålitelige partnere (advokater, boliglånsrådgivere) når det er anmodet</li>
                <li>Tjenesteleverandører som hjelper oss å drive nettsiden vår</li>
                <li>Juridiske myndigheter når det er påkrevd av lov</li>
              </ul>
              <p className="text-warm-700">
                Vi vil aldri selge dine personlige opplysninger til tredjeparter.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Dine rettigheter (GDPR)</h2>
              <p className="text-warm-700">
                Under den generelle datapersonvernforordningen (GDPR) har du rett til:
              </p>
              <ul className="text-warm-700">
                <li><strong>Tilgang:</strong> Be om en kopi av dine personlige opplysninger</li>
                <li><strong>Retting:</strong> Be om korrigering av unøyaktige data</li>
                <li><strong>Sletting:</strong> Be om sletting av dine personlige opplysninger</li>
                <li><strong>Begrensning av behandling:</strong> Be om begrensning av hvordan vi bruker dataene dine</li>
                <li><strong>Dataportabilitet:</strong> Få dataene dine i et bærbart format</li>
                <li><strong>Invending:</strong> Gjør invending mot behandling av dine personlige opplysninger</li>
                <li><strong>Trekk tilbake samtykke:</strong> Trekk tilbake samtykke når som helst</li>
              </ul>
              <p className="text-warm-700">
                For å utøve noen av disse rettighetene, vennligst kontakt oss på{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Datasikkerhet</h2>
              <p className="text-warm-700">
                Vi implementerer passende tekniske og organisatoriske tiltak for å beskytte dine personlige
                opplysninger mot uautorisert tilgang, endring, avsløring eller ødeleggelse. Imidlertid
                er ingen sendingsmetode over Internett 100 % sikker.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Dataoppbevaring</h2>
              <p className="text-warm-700">
                Vi oppbevarer dine personlige opplysninger så lenge det er nødvendig for å oppfylle formålene
                som er angitt i denne policyen, med mindre en lengre oppbevaringsperiode kreves av lov. Forespørselsdata
                oppbevares vanligvis i 3 år etter din siste interaksjon med oss.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Tjenester fra tredjeparter</h2>
              <p className="text-warm-700">
                Nettsiden vår kan bruke tjenester fra tredjeparter inkludert:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (nettstedsanalyse)</li>
                <li>Google Tag Manager (kodeadministrasjon)</li>
                <li>Netlify (nettstedhosting og skjematabehandling)</li>
                <li>WhatsApp (meldingstjeneste)</li>
              </ul>
              <p className="text-warm-700">
                Disse tjenestene har sine egne personvernpolicyer som styrer bruken av informasjonen din.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Barns personvern</h2>
              <p className="text-warm-700">
                Nettsiden vår er ikke beregnet på barn under 16 år. Vi samler ikke bevisst inn personlige opplysninger
                fra barn under 16 år.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Endringer av denne policyen</h2>
              <p className="text-warm-700">
                Vi kan oppdatere denne personvernpolicyen fra tid til annen. Vi vil informere deg om endringer
                ved å publisere den nye personvernpolicyen på denne siden og oppdatere datoen &quot;Sist oppdatert&quot;.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Kontakt oss</h2>
              <p className="text-warm-700">
                Hvis du har spørsmål om denne personvernpolicyen, vennligst kontakt oss:
              </p>
              <ul className="text-warm-700">
                <li>E-post: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Telefon: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Send oss melding</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

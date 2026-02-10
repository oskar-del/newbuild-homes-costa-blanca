import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'NIE-nummer Aanvragen | Gids voor Belgische Kopers 2026',
  description: 'Hoe u uw NIE-nummer krijgt voor aankoop van Spaans vastgoed. Stap-voor-stap instructies voor Belgische kopers, met en zonder reis naar Spanje.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/nie-number',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer',
    },
  },
};

const faqs = [
  {
    question: 'Wat is een NIE-nummer precies?',
    answer: 'Een NIE-nummer (Número de Identidad de Extranjero) is uw Spaanse fiscaal identificatienummer voor buitenlanders. U heeft dit nodig voor alle Spaanse belastingmiddelen, bankrekeningen, eigendomsregistratie en vastgoedtransacties. Het is een permanent nummer dat u voor het leven behouden.',
  },
  {
    question: 'Kan ik mijn woning kopen zonder NIE-nummer?',
    answer: 'Nee, u kunt geen eigendom in Spanje registreren zonder NIE-nummer. U moet dit hebben voordat u de notariële akte tekent. U kunt dit wel aanvragen terwijl u andere voorbereidingen treft, maar het moet voor eigendomsoverdracht gereed zijn.',
  },
  {
    question: 'Hoe lang duurt het om een NIE-nummer te krijgen?',
    answer: 'Als u direct aan de Spaanse ambassade in Brussel of Antwerpen gaat: doorgaans 1-2 weken. Als u volmacht geeft aan uw juridisch vertegenwoordiger in Spanje: ook ongeveer 1-2 weken. In sommige gemeenten kan het wat sneller gaan (paar dagen).',
  },
  {
    question: 'Kan ik via mijn juridisch vertegenwoordiger een NIE-nummer aanvragen?',
    answer: 'Ja, dit is heel gebruikelijk. U geeft volmacht aan uw juridisch vertegenwoordiger in Spanje, en zij vragen het aan namens u. Zorg ervoor dat u alle vereiste documenten per post of e-mail naar hun kantoor stuurt.',
  },
  {
    question: 'Kan ik naar de Spaanse ambassade in Brussel gaan?',
    answer: 'Ja, de Spaanse ambassade in Brussel kan NIE-nummers aanvragen. Dit is soms sneller dan in Spanje. U hebt uw paspoort en ingevuld aanvraagformulier nodig. U kunt ook naar het Spaanse consulaat in Antwerpen gaan.',
  },
  {
    question: 'Kan ik online een NIE-nummer aanvragen?',
    answer: 'Nee, u moet persoonlijk verschijnen of volmacht geven. U kunt niet volledig online een NIE-nummer aanvragen. Dit is door Spaanse wet vastgesteld.',
  },
  {
    question: 'Wat kost een NIE-nummer?',
    answer: 'Het NIE-nummer zelf is gratis. Als u door een juridisch vertegenwoordiger laat aanvragen, betaalt u doorgaans hun bureaucraciekosten (ongeveer 50-100 euro). Reis naar ambassade is uiteraard op uw kosten.',
  },
  {
    question: 'Blijft mijn NIE-nummer geldig als ik niet in Spanje woon?',
    answer: 'Ja, het NIE-nummer blijft permanent geldig. U hoeft niet in Spanje te wonen. U kunt het gebruiken voor alle toekomstige vastgoedtransacties, belastingmiddelen en als u Spaanse inkomsten hebt.',
  },
];

export default function NieNummerPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'NIE-nummer', url: 'https://newbuildhomescostablanca.com/nl-be/guides/nie-nummer' },
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
            <h1 className="text-5xl sm:text-6xl font-light mb-6">NIE-nummer Aanvragen</h1>
            <p className="text-xl text-warm-200 mb-4">Uw Spaanse fiscaal identificatienummer</p>
            <p className="text-lg text-warm-300">
              Het NIE-nummer is verplicht voor alle vastgoedtransacties in Spanje. Dit gids laat u zien hoe u dit aanvraagt als Belgische koper.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* What is NIE */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Wat Is Een NIE-Nummer?</h2>
              <p className="text-warm-700 mb-4">
                NIE staat voor "Número de Identidad de Extranjero" (Buitenlandersnummer). Dit is uw unieke identificatienummer dat de Spaanse belastingdiensten (Agencia Tributaria) u toekennen. Het duidt u aan als buitenlander die belastingverplichtingen in Spanje heeft.
              </p>
              <p className="text-warm-700 mb-4">
                U heeft dit nummer nodig voor vrijwel elke transactie in Spanje: eigendomsaankoop, hypotheken, bankrekeningen, belastingaangiften en nog veel meer. Het is een permanent nummer dat u voor het leven behouden.
              </p>
              <div className="bg-primary-50 rounded-sm p-6 border border-primary-200 mt-6">
                <h3 className="font-semibold text-primary-900 mb-3">Het NIE-nummer bestaat uit:</h3>
                <p className="text-warm-700">Een letter (meestal X, Y of Z), gevolgd door 7 nummers, en weer een letter. Voorbeeld: X1234567Z. Dit is uw levenslang nummer.</p>
              </div>
            </div>

            {/* Option 1: Via Ambassade */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Optie 1: NIE-Nummer Aanvragen bij Spaanse Ambassade Brussel</h2>
              <p className="text-warm-700 mb-4">
                Dit is vaak de snelste manier voor Belgische kopers. De Spaanse ambassade in Brussel kan NIE-nummers aanvragen. U kunt ook naar het Spaanse consulaat in Antwerpen gaan.
              </p>

              <div className="bg-accent-50 rounded-sm p-6 mb-6 border border-accent-200">
                <h3 className="font-semibold text-primary-900 mb-4">Ambassade Locaties:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-primary-900 mb-2">Ambassade (Brussel)</p>
                    <p className="text-warm-700 text-sm">
                      Spaanse Ambassade<br/>
                      Calle del Prado 55<br/>
                      Brussel<br/>
                      Telefoon: +32 (0)2 509 9700
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-2">Consulaat (Antwerpen)</p>
                    <p className="text-warm-700 text-sm">
                      Spaans Consulaat<br/>
                      Frankrijkstraat<br/>
                      Antwerpen<br/>
                      Telefoon: +32 (0)3 213 9500
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-primary-900 mb-4">Vereiste Documenten:</h3>
              <ul className="list-disc list-inside space-y-3 text-warm-700 ml-4 mb-6">
                <li>Originele paspoort (niet verlopen)</li>
                <li>Kopie van paspoort (twee kopieën)</li>
                <li>NIE-aanvraagformulier (formulier EX-13) - verkrijgbaar op ambassade of online</li>
                <li>Bewijs van Belgisch adres (bijv. recente elektriciteitsnota)</li>
                <li>Bewijs van vastgoedtransactie (optioneel, maar helpt)</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900 mb-4">Procedure:</h3>
              <ol className="list-decimal list-inside space-y-3 text-warm-700 ml-4">
                <li>Bel ambassade voor openingsuren en controleer of u deze dag kunt langsgaan</li>
                <li>Zorg dat u alle documenten heeft</li>
                <li>Ga naar ambassade of consulaat met originele paspoort</li>
                <li>Vul aanvraagformulier in ter plaatse (zij helpen u graag)</li>
                <li>Betaal geen enkele vergoeding (NIE-nummer zelf is gratis)</li>
                <li>U ontvangt meestal dezelfde dag of volgende dag uw NIE-nummer</li>
              </ol>
            </div>

            {/* Option 2: Via Spanje */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Optie 2: NIE-Nummer Aanvragen in Spanje</h2>
              <p className="text-warm-700 mb-4">
                U kunt ook rechtstreeks naar Spanje gaan en het daar aanvragen. Dit is handig als u toch naar Costa Blanca gaat om de woning te zien. U kunt naar het lokale kantoor van de Agencia Tributaria gaan of via uw juridisch vertegenwoordiger.
              </p>

              <h3 className="text-lg font-semibold text-primary-900 mb-4">Rechtstreeks Aanvragen bij Agencia Tributaria:</h3>
              <ul className="list-disc list-inside space-y-3 text-warm-700 ml-4 mb-6">
                <li>Ga naar lokaal kantoor van Agencia Tributaria (belastingkantoor)</li>
                <li>In Costa Blanca: kantoren in Alicante, Benidorm, Torrevieja en Jávea</li>
                <li>U krijgt daar het formulier (EX-13 of EX-14) en kunt het direct invullen</li>
                <li>Normaal krijgt u uw NIE-nummer dezelfde dag of volgende dag</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900 mb-4">Via Juridisch Vertegenwoordiger:</h3>
              <p className="text-warm-700 mb-4">
                Dit is het meest gebruikelijk. Uw juridisch vertegenwoordiger in Spanje kan dit namens u aanvragen. U hoeft alleen volmacht te geven en documenten in te sturen.
              </p>
              <ul className="list-disc list-inside space-y-3 text-warm-700 ml-4">
                <li>Geef volmacht aan juridisch vertegenwoordiger</li>
                <li>Stuur kopie paspoort per e-mail of post</li>
                <li>Zij vragen het aan op uw naam</li>
                <li>U ontvangt NIE-nummer per post of e-mail</li>
                <li>Duurt doorgaans 1-2 weken</li>
              </ul>
            </div>

            {/* Option 3: Remote */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Optie 3: Via Volmacht aan Juridisch Vertegenwoordiger</h2>
              <p className="text-warm-700 mb-4">
                Dit is de meest praktische optie voor drukke Belgische kopers. U hoeft nergens heen en uw juridisch vertegenwoordiger regelt alles.
              </p>

              <h3 className="text-lg font-semibold text-primary-900 mb-4">Wat U Moet Doen:</h3>
              <ol className="list-decimal list-inside space-y-3 text-warm-700 ml-4 mb-6">
                <li>Contacteer juridisch vertegenwoordiger in Spanje (wij kunnen u helpen)</li>
                <li>Geef schriftelijke volmacht (notarieel gewaarmerkt uit België)</li>
                <li>Stuur kopie van paspoort (voorkant en achterkant)</li>
                <li>Stuur kopie van bewijs van Belgisch adres</li>
                <li>Stuur kopie van koopovereenkomst (als u die al hebt)</li>
                <li>Zij vragen het NIE-nummer aan namens u</li>
                <li>U ontvangt NIE-nummer per post of e-mail</li>
              </ol>

              <div className="bg-warm-100 rounded-sm p-6 border border-warm-300">
                <h3 className="font-semibold text-primary-900 mb-3">Tip: Volmacht</h3>
                <p className="text-warm-700">
                  U kunt volmacht geven bij uw lokale gemeente in België. Dit document moet notarieel gewaarmerkt zijn. Uw juridisch vertegenwoordiger in Spanje weet precies welk format zij nodig hebben.
                </p>
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="bg-primary-50 rounded-sm p-8 shadow-sm mb-12 border border-primary-200">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Checklist: Documenten Voorbereiden</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">✓</div>
                  <div className="pt-1">
                    <p className="font-semibold text-primary-900">Paspoort (origineel + kopieën)</p>
                    <p className="text-sm text-warm-600">Zorg dat u geldige paspoort hebt. Kopieën van voorkant en achterkant.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">✓</div>
                  <div className="pt-1">
                    <p className="font-semibold text-primary-900">Belgisch Adresbewijs</p>
                    <p className="text-sm text-warm-600">Kopie van recente elektriciteitsnota, waterbedrijfsnota of telefoonrekening.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">✓</div>
                  <div className="pt-1">
                    <p className="font-semibold text-primary-900">Aanvraagformulier (EX-13)</p>
                    <p className="text-sm text-warm-600">Verkrijgbaar op ambassade, consulaat of online van Spaanse belastingdienst.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">✓</div>
                  <div className="pt-1">
                    <p className="font-semibold text-primary-900">Volmacht (indien nodig)</p>
                    <p className="text-sm text-warm-600">Notarieel gewaarmerkte volmacht als u dit via juridisch vertegenwoordiger doet.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-semibold text-sm">✓</div>
                  <div className="pt-1">
                    <p className="font-semibold text-primary-900">Koopovereenkomst</p>
                    <p className="text-sm text-warm-600">Kopie van koopovereenkomst (helpt, niet altijd verplicht).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Timing: Wanneer NIE-Nummer Aanvragen?</h2>
              <div className="space-y-4">
                <div className="border-b border-warm-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-primary-900 mb-2">Ideale Timeline:</h3>
                  <p className="text-warm-700">
                    Begin met NIE-nummer aanvragen zodra u weet dat u Spaanse woning wilt kopen. Dit is best voordat u de koopovereenkomst tekent. Zo hebt u dit gereed wanneer u nodig hebt.
                  </p>
                </div>
                <div className="border-b border-warm-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-primary-900 mb-2">Minimaal vereist:</h3>
                  <p className="text-warm-700">
                    U moet NIE-nummer hebben voordat u de notariële akte tekent (de eigendomsoverdracht). Dit is meestal 1-2 weken voordat dit plaatsvindt. Als u dit niet hebt, kan de eigendomsoverdracht niet doorgaan.
                  </p>
                </div>
                <div className="border-b border-warm-200 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-primary-900 mb-2">Hoe lang duurt het:</h3>
                  <p className="text-warm-700">
                    Bij ambassade in België: 1-2 weken. In Spanje: vaak dezelfde dag of volgende dag. Via juridisch vertegenwoordiger: 1-2 weken.
                  </p>
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
              <h2 className="text-3xl font-light text-primary-900 mb-6">Kernpunten</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold text-primary-900 mb-3">Onthoud:</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>NIE-nummer is verplicht voor vastgoedkoop</li>
                    <li>NIE-nummer is gratis</li>
                    <li>Drie opties: ambassade, Spanje, juridisch vertegenwoordiger</li>
                    <li>Begin vroeg, niet aan het eind</li>
                  </ul>
                </div>
                <div className="bg-white rounded-sm p-4 border-l-4 border-accent-500">
                  <h3 className="font-semibold text-primary-900 mb-3">Wij Adviseren:</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>Laat juridisch vertegenwoordiger dit aanvragen</li>
                    <li>Dit scheelt u tijd en gedoe</li>
                    <li>Dit is onderdeel van standaard service</li>
                    <li>Het kost u weinig extra (50-100 euro)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Hulp Met NIE-Nummer Aanvragen</h2>
              <p className="text-warm-200 mb-6">
                Onze juridische partners helpen u graag met het aanvragen van uw NIE-nummer. Dit maakt het hele proces makkelijker.
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

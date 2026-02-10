import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kjøpsgidser | Norsk Guide for Kjøp av Eiendom i Spania',
  description: 'Omfattende guider for norske kjøpere av nybyggen i Spania. NIE-nummer, boliglån, kostnader, skatter og kjøpsprosessen forklart.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

interface BuyerGuide {
  id: string;
  title: string;
  description: string;
  href: string;
}

const buyerGuides: BuyerGuide[] = [
  {
    id: 'buying-process',
    title: 'Kjøpsprosessen',
    description: 'Steg-for-steg guide for å kjøpe nybyggen i Spania',
    href: '/no/guides/kjopsprosessen',
  },
  {
    id: 'nie-number',
    title: 'NIE-nummer Guide',
    description: 'Hvordan du får NIE-nummer — obligatorisk for eiendomskjøp',
    href: '/no/guides/nie-nummer',
  },
  {
    id: 'costs-taxes',
    title: 'Kostnader & Skatter',
    description: 'Full oversikt over kostnader ved kjøp, skatter og løpende utgifter',
    href: '/no/guides/kostnader-skatt',
  },
  {
    id: 'mortgages',
    title: 'Boliglån for Nordmenn',
    description: 'Hvordan du får boliglån i Spania som norsk kjøper. Norske og spanske banker.',
    href: '/no/guides/boliglan',
  },
  {
    id: 'why-new-build',
    title: 'Hvorfor Kjøpe Nybygg?',
    description: 'Fordelene med nybygg versus brukt eiendom',
    href: '/no/guides/hvorfor-nybygg',
  },
  {
    id: 'key-ready-vs-off-plan',
    title: 'Innflyttingsklar vs Tegning',
    description: 'Kjøper du innflyttingsklar eller på tegning?',
    href: '/no/guides/innflyttingsklar-tegning',
  },
  {
    id: 'north-vs-south',
    title: 'Nord vs Sør Costa Blanca',
    description: 'Sammenlign de to regionene — eksklusiv nord vs prisværdig sør',
    href: '/no/guides/nord-vs-sor',
  },
  {
    id: 'torrevieja',
    title: 'Torrevieja',
    description: 'Fullstendig guide til Torrevieja for norske kjøpere og bosettere',
    href: '/no/guides/torrevieja',
  },
  {
    id: 'javea',
    title: 'Jávea',
    description: 'Ekslusiv guide til Jávea for norske investorer',
    href: '/no/guides/javea',
  },
  {
    id: 'costa-blanca-nord',
    title: 'Costa Blanca Nord',
    description: 'Komplett guide til Nord Costa Blanca for norske kjøpere',
    href: '/no/guides/costa-blanca-nord',
  },
];

const trustPoints = [
  {
    title: 'Lokal Ekspertise',
    description: 'Mer enn 15 år erfaring på Costa Blanca eiendomsmarkedet',
  },
  {
    title: 'Oppdatert Informasjon',
    description: 'Reglene endrer seg — vi holder alt aktuelt for norske kjøpere',
  },
  {
    title: 'Norsk Fokus',
    description: 'Skrevet for norske kjøpere, av mennesker som forstår situasjonen din',
  },
];

export default function NorwegianGuidesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Kjøpsgidser</h1>
            <p className="text-xl text-warm-200 mb-8 max-w-3xl mx-auto">
              Alt du trenger å vite for å kjøpe nybyggen i Spania — spesielt oppsatt for norske kjøpere
            </p>
            <p className="text-lg text-warm-300">
              Fra NIE-nummer til boliglån, vi leder deg gjennom hvert steg av prosessen
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Guides Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Kjøpsgidser for Nordmenn</h2>
            <p className="text-lg text-warm-600">Alt fra kjøpsprosessen til skatter og boliglån</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyerGuides.map((guide) => (
              <Link key={guide.id} href={guide.href}>
                <div className="bg-white border-2 border-warm-100 rounded-sm p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-sm flex items-center justify-center group-hover:bg-accent-500 transition-colors text-xl">
                    </div>
                  </div>
                  <h3 className="text-lg font-light text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center text-accent-600 text-sm font-semibold">
                    Les Mer <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Norwegian-Specific Service Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Norsk Service & Støtte</h2>
            <p className="text-lg text-warm-600">Vi forstår behovet til norske kjøpere</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-sm p-8 shadow-sm border border-warm-200">
              <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-4 text-2xl">
              </div>
              <h3 className="text-xl font-light text-primary-900 mb-3">Norsktalende Rådgivere</h3>
              <p className="text-warm-600">
                Vårt team snakker norsk og forstår utfordringene og preferansene til norske kjøpere. Vi er her for deg på ditt eget språk.
              </p>
            </div>

            <div className="bg-white rounded-sm p-8 shadow-sm border border-warm-200">
              <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-4 text-2xl">
              </div>
              <h3 className="text-xl font-light text-primary-900 mb-3">Juridisk Ekspertise</h3>
              <p className="text-warm-600">
                Vi samarbeider med juridiske eksperter som kjenner norsk beslutningsprosess og kan navigere deg gjennom spansk lov.
              </p>
            </div>

            <div className="bg-white rounded-sm p-8 shadow-sm border border-warm-200">
              <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-4 text-2xl">
              </div>
              <h3 className="text-xl font-light text-primary-900 mb-3">Skatter & Myndigheter</h3>
              <p className="text-warm-600">
                Veiledning om norsk skatteplikt for utenlandsk eiendom og hvordan det påvirker økonomien din hjemme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Finance CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-sm p-12 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-light mb-6">Sammenlign Boliglånsrenter</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-warm-200 mb-2">Gjennomsnittlig Rente</p>
                <p className="text-3xl font-light">3.0 - 4.5%</p>
              </div>
              <div>
                <p className="text-warm-200 mb-2">Norske Banker</p>
                <p className="text-3xl font-light">DNB, Nordea, SpareBank 1</p>
              </div>
              <div>
                <p className="text-warm-200 mb-2">Spanske Banker</p>
                <p className="text-3xl font-light">CaixaBank, BBVA</p>
              </div>
            </div>
            <Link href="/no/guides/boliglan">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                Se Boliglånsalternativer
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Hvorfor Stole På Våre Guider?</h2>
            <p className="text-lg text-warm-600">Ekspertkunnskap kombinert med norsk forståelse</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
                <h3 className="text-xl font-light text-primary-900 mb-3">{point.title}</h3>
                <p className="text-warm-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">Har Du Spørsmål?</h2>
          <p className="text-xl text-white/90 mb-8">
            Vårt norske team er her for å svare på alle dine spørsmål om kjøp av eiendom i Spania
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/no/contact">
              <button className="bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 px-8 rounded-sm transition-colors inline-flex items-center justify-center gap-2">
                Kontakt Oss
              </button>
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-warm-100 text-primary-900 font-semibold py-3 px-8 rounded-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

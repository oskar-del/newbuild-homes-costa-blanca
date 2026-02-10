import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Köpguider | Svenska Köpares Guide till Spansk Fastighet',
  description: 'Komprehensiva guider för svenska köpare av nybygge i Spanien. NIE-nummer, bolån, kostnader, och köpprocessen förklarad.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/guides',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides',
      sv: 'https://newbuildhomescostablanca.com/sv/guides',
      nl: 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-BE/guides',
      fr: 'https://newbuildhomescostablanca.com/fr/guides',
      no: 'https://newbuildhomescostablanca.com/no/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

interface DestinationCard {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: string;
}

interface BuyerGuide {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

const destinationGuides: DestinationCard[] = [
  {
    title: 'Torrevieja Guide',
    description: 'Utforska strandparadiset med fantastisk växtlighet och vibrerande gemenskap',
    image: '/images/destinations/torrevieja.jpg',
    href: '/sv/guides/torrevieja',
    icon: '🏖️',
  },
  {
    title: 'Jávea Guide',
    description: 'Klassisk medelhavscharm med bergsutsikt och exklusiva strandplatser',
    image: '/images/destinations/javea.jpg',
    href: '/sv/guides/javea',
    icon: '⛵',
  },
  {
    title: 'Costa Blanca Nord',
    description: 'Giftiga naturskönhet och lyxiga projekt i den exklusiva nordregionen',
    image: '/images/destinations/costa-blanca-north.jpg',
    href: '/sv/guides/costa-blanca-north',
    icon: '🏔️',
  },
];

const buyerGuides: BuyerGuide[] = [
  {
    id: 'buying-process',
    title: 'Köpprocessen',
    description: 'Steg-för-steg guide till att köpa nybygge i Spanien',
    icon: '📖',
    href: '/sv/guides/kopprocessen',
  },
  {
    id: 'nie-number',
    title: 'NIE-nummer Guide',
    description: 'Hur du skaffar ditt NIE-nummer — obligatoriskt för fastighetsköp',
    icon: '✓',
    href: '/sv/guides/nie-nummer',
  },
  {
    id: 'costs-taxes',
    title: 'Kostnader & Skatter',
    description: 'Komplett uppdelning av köpkostnader, skatter och löpande utgifter',
    icon: '📈',
    href: '/sv/guides/kostnader-skatter',
  },
  {
    id: 'mortgages',
    title: 'Bolån för Utländska Köpare',
    description: 'Hur du får bolån i Spanien som svensk. SBAB, Skandia och spanska banker.',
    icon: '📞',
    href: '/sv/guides/bolan-spanien',
  },
  {
    id: 'why-new-build',
    title: 'Varför Köpa Nybygge?',
    description: 'Fördelarna med nybygge jämfört med begagnat',
    icon: '📈',
    href: '/sv/guides/why-new-build',
  },
  {
    id: 'key-ready-vs-off-plan',
    title: 'Inflyttningsklart vs Ritning',
    description: 'Ska du köpa färdigt eller på ritning?',
    icon: '🏠',
    href: '/sv/guides/key-ready-vs-off-plan',
  },
  {
    id: 'north-vs-south',
    title: 'Norr vs Söder Costa Blanca',
    description: 'Jämför de två regionerna — exklusiva norr vs prisvärda söder',
    icon: '🗺️',
    href: '/sv/guides/north-vs-south',
  },
];

const trustPoints = [
  {
    title: 'Lokal Expertis',
    description: 'Över 15 år av erfarenhet på Costa Blanca fastighetsmarknaden',
  },
  {
    title: 'Uppdaterad Information',
    description: 'Reglerna ändras — vi håller allt aktuellt för svenska köpare',
  },
  {
    title: 'Svenska Fokus',
    description: 'Skrivna för svenska köpare, av personer som förstår din situation',
  },
];

export default function SwedishGuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-primary-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">Köpguider</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Allt du behöver veta för att köpa nybygge i Spanien — speciellt framtaget för svenska köpare
            </p>
            <p className="text-lg text-blue-200">
              Från NIE-nummer till bolån, vi guidar dig genom varje steg av processen
            </p>
          </div>
        </div>
      </section>

      {/* Destination Guides Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">Destinationsguider</h2>
            <p className="text-lg text-gray-600">Utforska de bästa områdena på Costa Blanca</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinationGuides.map((destination) => (
              <Link key={destination.title} href={destination.href}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-48 bg-gradient-to-br from-blue-400 to-accent-500 flex items-center justify-center">
                    <span className="text-6xl">{destination.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary-900 mb-3">{destination.title}</h3>
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="flex items-center text-accent-500 font-semibold group">
                      Läs Guide <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Guides Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">Köparguider för Svenska</h2>
            <p className="text-lg text-gray-600">Allt från köpprocessen till skatter och bolån</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyerGuides.map((guide) => (
              <Link key={guide.id} href={guide.href}>
                <div className="bg-white border-2 border-gray-100 rounded-lg p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-accent-500 transition-colors text-xl">
                      {guide.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-primary-900 mb-2 group-hover:text-accent-500 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center text-accent-500 text-sm font-semibold">
                    Läs Mer <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Swedish-Specific Service Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-accent-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">Svensk Service & Support</h2>
            <p className="text-lg text-gray-600">Vi förstår svenska köpares behov</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                👥
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">Svenska-Talande Rådgivare</h3>
              <p className="text-gray-600">
                Vår team talar svenska och förstår svenska köpares utmaningar och preferenser. Vi är här för dig på ditt eget språk.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                ⚖️
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">Svenska Jurister</h3>
              <p className="text-gray-600">
                Vi arbetar med juridiska experter som är familj med svenska fastighetslagstiftning och kan vägleda dig genom spansk lag.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-2xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">Skatteverket & Myndigheter</h3>
              <p className="text-gray-600">
                Vägledning kring svenska skattekrav för utlandsfastigheter och hur detta påverkar din ekonomi hemma i Sverige.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Finance CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-900 to-blue-800 rounded-lg p-12 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Jämför Bolåneräntor</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-blue-100 mb-2">Genomsnittlig Räntesats</p>
                <p className="text-3xl font-bold">3.2 - 4.8%</p>
              </div>
              <div>
                <p className="text-blue-100 mb-2">Svenska Banker</p>
                <p className="text-3xl font-bold">SBAB, Skandia</p>
              </div>
              <div>
                <p className="text-blue-100 mb-2">Spanska Banker</p>
                <p className="text-3xl font-bold">CaixaBank, BBVA</p>
              </div>
            </div>
            <Link href="/sv/guides/bolan-spanien">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Se Bolånealternativ
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">Varför Lita på Våra Guider?</h2>
            <p className="text-lg text-gray-600">Expertkunskap kombinerad med svenska förståelse</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
                <h3 className="text-xl font-bold text-primary-900 mb-3">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Har Du Frågor?</h2>
          <p className="text-xl text-white/90 mb-8">
            Vår svenska team är här för att besvara alla dina frågor om att köpa i Spanien
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sv/contact">
              <button className="bg-primary-900 hover:bg-primary-800 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                📞
                Kontakta Oss
              </button>
            </Link>
            <a href="https://wa.me/34123456789">
              <button className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                💬
                WhatsApp
              </button>
            </a>
          </div>

          <p className="text-white/80 text-sm mt-6">
            Snabb respons inom 24 timmar — ofta mycket snabbare
          </p>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-primary-900 mb-4">Svenska Destinationer</h3>
              <ul className="space-y-2">
                {destinationGuides.map((dest) => (
                  <li key={dest.title}>
                    <Link href={dest.href} className="text-blue-600 hover:text-accent-500 transition-colors">
                      {dest.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-primary-900 mb-4">Köparguider</h3>
              <ul className="space-y-2">
                {buyerGuides.slice(0, 4).map((guide) => (
                  <li key={guide.id}>
                    <Link href={guide.href} className="text-blue-600 hover:text-accent-500 transition-colors">
                      {guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Koopgidsen | Belgische Kopers Gids voor Spaans Onroerend Goed',
  description: 'Omvattende gidsen voor Belgische kopers van nieuwbouw in Spanje. NIE-nummer, hypotheek, kosten en het koopproces uitgelegd voor Vlaamse en Waalse kopers.',
  alternates: {
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-be': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
    },
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides',
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
    title: 'Torrevieja Gids',
    description: 'Ontdek het strandparadijs met prachtige flora en populair onder Belgische expats',
    image: '/images/destinations/torrevieja.jpg',
    href: '/nl-be/guides/torrevieja',
    icon: '',
  },
  {
    title: 'Jávea Gids',
    description: 'Klassieke mediterrane charme met bergzicht en exclusieve stranden',
    image: '/images/destinations/javea.jpg',
    href: '/nl-be/guides/javea',
    icon: '',
  },
  {
    title: 'Costa Blanca Noord',
    description: 'Betoverend natuurschoon en luxe projecten in de exclusieve noordregio',
    image: '/images/destinations/costa-blanca-north.jpg',
    href: '/nl-be/guides/costa-blanca-noord',
    icon: '',
  },
];

const buyerGuides: BuyerGuide[] = [
  {
    id: 'buying-process',
    title: 'Koopproces',
    description: 'Stap-voor-stap gids voor het kopen van nieuwbouw in Spanje',
    icon: '',
    href: '/nl-be/guides/koopproces',
  },
  {
    id: 'nie-number',
    title: 'NIE-nummer Gids',
    description: 'Hoe u uw NIE-nummer krijgt - verplicht voor vastgoedaankoop',
    icon: '',
    href: '/nl-be/guides/nie-nummer',
  },
  {
    id: 'costs-taxes',
    title: 'Kosten & Belastingen',
    description: 'Volledige uitsplitsing van kosten voor aankoop, belastingen en lopende uitgaven',
    icon: '',
    href: '/nl-be/guides/kosten-belasting',
  },
  {
    id: 'mortgages',
    title: 'Hypotheken voor Buitenlandse Kopers',
    description: 'Hoe u een hypotheek in Spanje krijgt. KBC, BNP Paribas Fortis en Spaanse banken.',
    icon: '',
    href: '/nl-be/guides/hypotheek',
  },
  {
    id: 'why-new-build',
    title: 'Waarom Nieuwbouw Kopen?',
    description: 'De voordelen van nieuwbouw versus bestaande bouw',
    icon: '',
    href: '/nl-be/guides/waarom-nieuwbouw',
  },
  {
    id: 'key-ready-vs-off-plan',
    title: 'Kant-en-klaar vs Op Ritning',
    description: 'Koopt u kant-en-klaar of op tekening?',
    icon: '',
    href: '/nl-be/guides/kant-en-klaar-vs-ritning',
  },
  {
    id: 'north-vs-south',
    title: 'Noord vs Zuid Costa Blanca',
    description: 'Vergelijk de twee regio\'s - exclusieve noorden vs betaalbare zuiden',
    icon: '',
    href: '/nl-be/guides/noord-vs-zuid',
  },
];

const trustPoints = [
  {
    title: 'Lokale Expertise',
    description: 'Meer dan 15 jaar ervaring op de Costa Blanca vastgoedmarkt',
  },
  {
    title: 'Bijgewerkte Informatie',
    description: 'De regels veranderen - we houden alles actueel voor Belgische kopers',
  },
  {
    title: 'Belgisch Focus',
    description: 'Geschreven voor Belgische kopers, door mensen die uw situatie begrijpen',
  },
];

export default function BelgianGuidesPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Koopgidsen</h1>
            <p className="text-xl text-warm-200 mb-8 max-w-3xl mx-auto">
              Alles wat u moet weten om nieuwbouw in Spanje te kopen - speciaal opgesteld voor Belgische en Vlaamse kopers
            </p>
            <p className="text-lg text-warm-300">
              Van NIE-nummer tot hypotheek, wij leiden u door elke stap van het proces
            </p>
          </div>
        </div>
      </section>

      {/* Destination Guides Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Bestemmingsgidsen</h2>
            <p className="text-lg text-warm-600">Verken de beste gebieden op Costa Blanca</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinationGuides.map((destination) => (
              <Link key={destination.title} href={destination.href}>
                <div className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow h-full border border-warm-200">
                  <div className="relative h-48 bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
                    <span className="text-6xl">{destination.icon || ''}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-light text-primary-900 mb-3">{destination.title}</h3>
                    <p className="text-warm-600 mb-4">{destination.description}</p>
                    <div className="flex items-center text-accent-600 font-semibold group">
                      Lees Gids <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Koopgidsen voor Belgen</h2>
            <p className="text-lg text-warm-600">Alles van het koopproces tot belastingen en hypotheken</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyerGuides.map((guide) => (
              <Link key={guide.id} href={guide.href}>
                <div className="bg-white border-2 border-warm-100 rounded-sm p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-sm flex items-center justify-center group-hover:bg-accent-500 transition-colors text-xl">
                      {guide.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-light text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center text-accent-600 text-sm font-semibold">
                    Lees Meer <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Belgian-Specific Service Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Belgische Service & Ondersteuning</h2>
            <p className="text-lg text-warm-600">We begrijpen de behoeften van Belgische en Vlaamse kopers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-sm p-8 shadow-sm border border-warm-200">
              <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-4 text-2xl">
              </div>
              <h3 className="text-xl font-light text-primary-900 mb-3">Nederlands Sprekende Adviseurs</h3>
              <p className="text-warm-600">
                Ons team spreekt Nederlands en begrijpt de uitdagingen en voorkeuren van Belgische kopers. We zijn hier voor u in uw eigen taal.
              </p>
            </div>

            <div className="bg-white rounded-sm p-8 shadow-sm border border-warm-200">
              <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-4 text-2xl">
              </div>
              <h3 className="text-xl font-light text-primary-900 mb-3">Belgische Juristen</h3>
              <p className="text-warm-600">
                We werken met juridische experts die bekend zijn met Belgische vastgoedbesluitvorming en kunnen u door Spaanse wet leiden.
              </p>
            </div>

            <div className="bg-white rounded-sm p-8 shadow-sm border border-warm-200">
              <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-4 text-2xl">
              </div>
              <h3 className="text-xl font-light text-primary-900 mb-3">Belastingen & Autoriteiten</h3>
              <p className="text-warm-600">
                Begeleiding omtrent Belgische belastingvereisten voor buitenlandse eigendommen en hoe dit uw economie thuis beïnvloedt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Finance CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-sm p-12 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-light mb-6">Vergelijk Hypotheekrentals</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-warm-200 mb-2">Gemiddelde Rentevoet</p>
                <p className="text-3xl font-light">3.2 - 4.8%</p>
              </div>
              <div>
                <p className="text-warm-200 mb-2">Belgische Banken</p>
                <p className="text-3xl font-light">KBC, BNP Paribas</p>
              </div>
              <div>
                <p className="text-warm-200 mb-2">Spaanse Banken</p>
                <p className="text-3xl font-light">Belfius, BBVA</p>
              </div>
            </div>
            <Link href="/nl-be/guides/hypotheek">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                Zie Hypotheekopties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-primary-900 mb-4">Waarom Onze Gidsen Vertrouwen?</h2>
            <p className="text-lg text-warm-600">Deskundige kennis gecombineerd met Belgisch begrip</p>
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
          <h2 className="text-3xl sm:text-4xl font-light mb-6">Heeft u Vragen?</h2>
          <p className="text-xl text-white/90 mb-8">
            Ons Belgisch team is hier om al uw vragen over het kopen in Spanje te beantwoorden
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/nl-be/contact">
              <button className="bg-primary-900 hover:bg-primary-800 text-white font-semibold py-3 px-8 rounded-sm transition-colors inline-flex items-center justify-center gap-2">
                Neem Contact Op
              </button>
            </Link>
            <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer">
              <button className="bg-white hover:bg-warm-100 text-primary-900 font-semibold py-3 px-8 rounded-sm transition-colors inline-flex items-center justify-center gap-2">
                WhatsApp
              </button>
            </a>
          </div>

          <p className="text-white/80 text-sm mt-6">
            Snelle reactie binnen 24 uur - meestal veel sneller
          </p>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-warm-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-primary-900 mb-4">Belgische Bestemmingen</h3>
              <ul className="space-y-2">
                {destinationGuides.map((dest) => (
                  <li key={dest.title}>
                    <Link href={dest.href} className="text-accent-600 hover:text-accent-700 transition-colors">
                      {dest.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-4">Koopgidsen</h3>
              <ul className="space-y-2">
                {buyerGuides.slice(0, 4).map((guide) => (
                  <li key={guide.id}>
                    <Link href={guide.href} className="text-accent-600 hover:text-accent-700 transition-colors">
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

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import carouselData from '@/content/homepage-carousels.json';

export const metadata: Metadata = {
  title: 'Luxury Villen Costa Blanca | Premium Neubauten',
  description: 'Erkunden Sie exklusive Luxusvillas an der Costa Blanca. Hochwertige Bauweise, Meerblick, private Pools und Top-Lagen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'de': 'https://newbuildhomescostablanca.com/de/luxury',
      'pl': 'https://newbuildhomescostablanca.com/pl/luxury',
      'ru': 'https://newbuildhomescostablanca.com/ru/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function LuxuryPage() {
  const featured = carouselData.carousels['north-luxury'].properties.slice(0, 6);

  const luxuryFeatures = [
    'Architektur von Weltklasse-Designern',
    'Meerblick von mehreren Räumen',
    'Private Pools und Spas',
    'Concierge und Sicherheitsdienste',
    'Fahrstuhl und Smarthome-Technologie',
    'Weinkeller und Heimkino',
    'Tennisplätze und Fitnessstudios',
    'Private Gärten und Terrassen',
  ];

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative h-[60vh] min-h-[400px] bg-primary-900 flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">
            Luxury Villen an der<br />
            <span className="font-semibold">Costa Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Die anspruchsvollsten Neubau-Villen mit Meerblick, privatem Pool und weltklasse Ausstattung.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-light text-primary-900 mb-6">
                Was macht diese Villen <span className="font-semibold">Luxury?</span>
              </h2>
              <ul className="space-y-3">
                {luxuryFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-3 text-warm-700">
                    <span className="text-accent-500 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-accent-500 to-primary-900 rounded-sm h-96 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-5xl font-light mb-2">Exklusive</div>
                <p className="text-accent-100">Premium Neubauten</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Verfügbare <span className="font-semibold">Luxury Villen</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((property) => (
                <Link
                  key={property.reference}
                  href={`/de/properties/${property.reference}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-2xl transition-all border border-warm-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                        LUXURY
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                    <h3 className="text-lg font-semibold text-primary-900 mt-2 group-hover:text-accent-600 transition-colors line-clamp-2">
                      {property.title}
                    </h3>
                    <p className="text-warm-600 text-sm mt-2">{property.bedrooms} Zimmer • {property.builtArea}m² • Meerblick</p>
                    <div className="mt-4 pt-4 border-t border-warm-100">
                      <span className="text-2xl font-bold text-primary-900">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-white text-center mb-12">
            Warum Luxury an der <span className="font-semibold">Costa Blanca?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">Mediterranean</div>
              <p className="text-warm-300">
                Entfliehen Sie dem deutschen Winter. 300+ Sonnentage, Meer und bergige Landschaft.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">Investment</div>
              <p className="text-warm-300">
                Stabile Wertsteigerung, 5-8% Mietrendite in beliebten Gegenden, sichere Geldanlage.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">Lifestyle</div>
              <p className="text-warm-300">
                Golf, Tennis, Segeln, Wandern. Großes deutsches Netzwerk für Freizeitaktivitäten.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-sm p-8 border-l-4 border-accent-500">
            <h3 className="text-2xl font-light text-primary-900 mb-4">
              Luxury Villa <span className="font-semibold">Kaufberatung</span>
            </h3>
            <p className="text-warm-700 mb-4">
              Der Kauf eines Luxushauses ist eine anspruchsvolle Transaktion. Unsere Experten verstehen die besonderen Anforderungen hochwertiger Immobilien und können Ihnen bei jedem Schritt helfen.
            </p>
            <ul className="space-y-2 text-warm-700 text-sm mb-6">
              <li className="flex gap-2">
                <span className="text-accent-500">•</span>
                Finanzierungsberatung für Luxusimmobilien
              </li>
              <li className="flex gap-2">
                <span className="text-accent-500">•</span>
                Rechtsberatung zu deutschen Steuerfragen
              </li>
              <li className="flex gap-2">
                <span className="text-accent-500">•</span>
                Virtuelle oder persönliche Besichtigungen
              </li>
              <li className="flex gap-2">
                <span className="text-accent-500">•</span>
                Verhandlung der bestmöglichen Bedingungen
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-primary-900 mb-4">
            Bereit, Ihre <span className="font-semibold">Luxury Villa</span> zu finden?
          </h2>
          <p className="text-warm-600 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns Ihnen helfen, die perfekte Luxusvilla zu finden. Von der ersten Besichtigung bis zur Schlüsselübergabe, wir sind bei Ihnen.
          </p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
          >
            Konsultation Anfragen
          </Link>
        </div>
      </section>
    </main>
  );
}

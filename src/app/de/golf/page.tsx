import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import carouselData from '@/content/homepage-carousels.json';

export const metadata: Metadata = {
  title: 'Golf Immobilien Costa Blanca | Villen am Golfplatz',
  description: 'Entdecken Sie Luxusvillen mit Golfplatz-Zugang an der Costa Blanca. Villamartin, La Finca, Las Colinas, Campoamor und mehr.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/golf',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/golf',
      'sv': 'https://newbuildhomescostablanca.com/sv/golf',
      'nl': 'https://newbuildhomescostablanca.com/nl/golf',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/golf',
      'fr': 'https://newbuildhomescostablanca.com/fr/golf',
      'no': 'https://newbuildhomescostablanca.com/no/golf',
      'de': 'https://newbuildhomescostablanca.com/de/golf',
      'pl': 'https://newbuildhomescostablanca.com/pl/golf',
      'ru': 'https://newbuildhomescostablanca.com/ru/golf',
      'x-default': 'https://newbuildhomescostablanca.com/golf',
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

const golfCourses = [
  {
    name: 'Villamartin Golf Club',
    holes: 18,
    par: 72,
    handicap: 'Willkommen',
    description: 'Der legendäre Villamartin Platz. Größte Golfgemeinschaft an der Costa Blanca mit ausgezeichneten Einrichtungen.',
  },
  {
    name: 'La Finca Golf Club',
    holes: 18,
    par: 73,
    handicap: 'Willkommen',
    description: 'Spektakulärer Platz in den Bergen. Dramatische Aussichten und anspruchsvolle Löcher.',
  },
  {
    name: 'Las Colinas Golf Club',
    holes: 18,
    par: 72,
    handicap: 'Willkommen',
    description: 'Championship-Kurs mit modernem Club-House. Perfekt für alle Spielstärken.',
  },
  {
    name: 'Campoamor Golf Club',
    holes: 18,
    par: 72,
    handicap: 'Willkommen',
    description: 'Klassischer englischer Stil Platz. Gepflegte Fairways und grüne sowie freundliche Umgebung.',
  },
];

export default function GolfPage() {
  const featured = carouselData.carousels['south-golf'].properties.slice(0, 6);

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Golf Immobilien an der <span className="font-semibold">Costa Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Luxusvillen mit direktem Golfplatz-Zugang. Die besten Golfgemeinschaften für Golfer jeden Niveaus.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10">Top Golfplätze</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {golfCourses.map((course) => (
              <div key={course.name} className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-2xl font-light text-primary-900 mb-2">{course.name}</h3>
                <div className="flex gap-6 mb-4 text-sm text-warm-700">
                  <span><strong>{course.holes}</strong> Löcher</span>
                  <span><strong>Par {course.par}</strong></span>
                  <span><strong>Handicap:</strong> {course.handicap}</span>
                </div>
                <p className="text-warm-700">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10">
            Golf <span className="font-semibold">Villen zum Verkauf</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <Link
                key={property.reference}
                href={`/de/properties/${property.reference}`}
                className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm">
                      Golf
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-accent-600 font-medium">{property.zone}</span>
                  <h3 className="text-primary-900 font-semibold mt-2 group-hover:text-accent-600 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-warm-600 text-sm mt-1">{property.bedrooms} Zimmer • {property.builtArea}m²</p>
                  <div className="mt-3 pt-3 border-t border-warm-100">
                    <span className="text-lg font-bold text-primary-900">
                      {formatPrice(property.price)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-warm-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-accent-50 rounded-sm p-8 border border-accent-200">
            <h3 className="text-2xl font-light text-primary-900 mb-4">Warum Golf an der Costa Blanca?</h3>
            <ul className="space-y-3 text-warm-700">
              <li className="flex gap-3">
                <span className="text-accent-600 font-bold">✓</span>
                <span>300 Sonnentage pro Jahr — golf das ganze Jahr</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-600 font-bold">✓</span>
                <span>10+ Championship-Golfplätze — für alle Spielstärken</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-600 font-bold">✓</span>
                <span>Ausgezeichnete Golfgemeinschaften — mit Clubhouse und Annehmlichkeiten</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-600 font-bold">✓</span>
                <span>Großes deutsches Golfer-Netzwerk — leicht Spielpartner finden</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-600 font-bold">✓</span>
                <span>Verschwinden Sie nicht in den deutschen Winter</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Möchten Sie eine <span className="font-semibold">Golf Villa</span> erkunden?
          </h2>
          <p className="text-warm-300 mb-8">Unser Team kann Ihnen helfen, die perfekte Golfgemeinschaft und Villa zu finden.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
          >
            Jetzt Konsultieren
          </Link>
        </div>
      </section>
    </main>
  );
}

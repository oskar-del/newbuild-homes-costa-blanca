import { Metadata } from 'next';
import Link from 'next/link';
import {
  GOLF_COURSES,
  GolfCourse,
  getTotalGolfProperties,
} from '@/lib/golf-courses';

export const metadata: Metadata = {
  title: 'Golf Costa Blanca | Villas de Golf à Proximité des Meilleurs Terrains',
  description: 'Découvrez des villas neuves près de 22 terrains de golf sur la Costa Blanca. Lifestyle golfique à partir de 150 000 €.',
  openGraph: {
    title: 'Golf Costa Blanca | Villas de Golf Premium',
    description: 'Maisons neuves près des terrains de golf les plus prestigieux de la Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/golf',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/golf',
    languages: {
      en: 'https://newbuildhomescostablanca.com/golf',
      fr: 'https://newbuildhomescostablanca.com/fr/golf',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function GolfPageFR() {
  const totalProperties = getTotalGolfProperties();

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Vivez le <span className="font-semibold">Rêve du Golf</span> en Espagne
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl">
            Réveillez-vous avec vue sur le fairway. Jouez sur des terrains de classe mondiale. Profitez du soleil méditerranéen toute l'année.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl">
            <div>
              <div className="text-3xl font-bold text-white">{GOLF_COURSES.length}</div>
              <div className="text-warm-400 text-sm">Terrains de Golf</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{totalProperties}+</div>
              <div className="text-warm-400 text-sm">Villas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">150k</div>
              <div className="text-warm-400 text-sm">À partir de</div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Voir les Villas de Golf
            </a>
            <Link
              href="/fr/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm font-medium transition-colors border border-white/20"
            >
              En Savoir Plus
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-8">
            Pourquoi Acheter une Villa de <span className="font-semibold">Golf?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Croissance Stable de la Valeur</h3>
              <p className="text-warm-600">Les villas de golf surpassent les moyennes du marché. L'offre limitée aux meilleurs terrains pousse la valorisation.</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Environnement Premium</h3>
              <p className="text-warm-600">Les resorts de golf sont entretenus selon des normes élevées avec paysagisme, sécurité et équipements exceptionnels.</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Communauté de Golf Établie</h3>
              <p className="text-warm-600">Les resorts attirent des joueurs internationaux. Clubs, compétitions et événements créent des amitiés durables.</p>
            </div>
            <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
              <h3 className="font-semibold text-primary-900 mb-3">Revenus Locatifs Forts</h3>
              <p className="text-warm-600">Les touristes cherchent des hébergements qualité près des terrains. Rendement de 4-6% sur la saison de golf.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
            Trouvez Votre <span className="font-semibold">Villa de Golf Parfaite</span>
          </h2>
          <p className="text-warm-300 mb-8">
            Que vous cherchiez une vue directe sur le fairway, un petit appartement ou une villa familiale, nous pouvons vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
            >
              Nous Contacter via WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-colors border border-white/20"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

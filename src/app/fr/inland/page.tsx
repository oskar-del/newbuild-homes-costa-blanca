import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Propriétés Intérieures Costa Blanca | Villages Authentiques',
  description: 'Découvrez des maisons neuves dans les charmants villages intérieurs de la Costa Blanca avec authenticité espagnole et excellent rapport qualité-prix.',
  openGraph: {
    title: 'Propriétés Intérieures Costa Blanca | Villages Villageois Espagnols',
    description: 'Maisons neuves dans les plus beaux villages intérieurs avec vie authentique espagnole.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/inland',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/inland',
    languages: {
      en: 'https://newbuildhomescostablanca.com/inland',
      fr: 'https://newbuildhomescostablanca.com/fr/inland',
    },
  },
};

export default function FRInlandPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Intérieur', url: 'https://newbuildhomescostablanca.com/fr/inland/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Propriétés de <span className="font-semibold">l'Intérieur</span> Costa Blanca
              </h1>
              <p className="text-warm-300 text-lg">
                Découvrez des villages espagnols authentiques avec charme, communauté et meilleur rapport qualité-prix.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Pourquoi Choisir <span className="font-semibold">l'Intérieur?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Meilleur Rapport Qualité-Prix</h3>
                <p className="text-warm-600">Moins cher que la côte tout en gardant la qualité. Plus d'espace pour votre argent.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Authenticité Espagnole</h3>
                <p className="text-warm-600">Vraie vie villageoise avec marchés locaux, restaurants familiaux et culture vivante.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Communauté Établie</h3>
                <p className="text-warm-600">Villages agricoles avec communautés établies d'expatriés et réseaux solides.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Nature & Tranquillité</h3>
                <p className="text-warm-600">Campagne verdoyante, sentiers de randonnée et vie paisible loin de l'agitation côtière.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Potentiel d'Investissement</h3>
                <p className="text-warm-600">Zone en croissance avec infrastructure améliorée et préservation du caractère traditionnel.</p>
              </div>
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">Proximité de la Côte</h3>
                <p className="text-warm-600">À seulement 20-30 minutes des plages du sud de la Costa Blanca.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-8">
              Villages Populaires de <span className="font-semibold">l'Intérieur</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Algorfa</h3>
                <p className="text-warm-600 mb-3">Zone de golf populaire avec excellente infrastructure, restaurants et accès aux terrains de golf.</p>
                <p className="text-sm text-accent-600 font-medium">À partir de €180k</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Rojales</h3>
                <p className="text-warm-600 mb-3">Ville agricole charmante avec vie villageoise authentique et communauté d'expatriés établie.</p>
                <p className="text-sm text-accent-600 font-medium">À partir de €150k</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Ciudad Quesada</h3>
                <p className="text-warm-600 mb-3">Développement planifié avec équipements, communauté internationale et excellent rapport qualité-prix.</p>
                <p className="text-sm text-accent-600 font-medium">À partir de €165k</p>
              </div>
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Jalon</h3>
                <p className="text-warm-600 mb-3">Village viticole traditionnel dans les montagnes avec vue spectaculaire et vie tranquille.</p>
                <p className="text-sm text-accent-600 font-medium">À partir de €175k</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Découvrez la Vie <span className="font-semibold">de l'Intérieur</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Parlons de ce qui correspond à votre style de vie. Authentique, tranquille, accessible et encore authentiquement espagnol.
            </p>
            <Link
              href="/fr/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              Contactez-Nous
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

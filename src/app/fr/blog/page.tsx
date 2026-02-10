import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog | Conseils Immobilier Costa Blanca',
  description: 'Conseils et astuces pour acheter du neuf en Espagne. Guides complets sur les taxes, les frais d\'hypothèque et le processus d\'achat.',
  openGraph: {
    title: 'Blog | Conseils Immobilier Costa Blanca',
    description: 'Découvrez nos articles informatifs sur l\'immobilier neuf.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/fr/blog',
    siteName: 'Maisons Neuves Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/blog',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/blog',
      'sv': 'https://newbuildhomescostablanca.com/sv/blog',
      'nl': 'https://newbuildhomescostablanca.com/nl/blog',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/blog',
      'fr': 'https://newbuildhomescostablanca.com/fr/blog',
      'no': 'https://newbuildhomescostablanca.com/no/blog',
      'x-default': 'https://newbuildhomescostablanca.com/blog',
    },
  },
};

const blogPosts = [
  {
    slug: 'acheter-neuf-espagne',
    title: 'Pourquoi Acheter du Neuf en Espagne?',
    excerpt: 'Découvrez les avantages des maisons neuves par rapport aux propriétés existantes.',
    category: 'Guide',
  },
  {
    slug: 'frais-taxes-espagne',
    title: 'Tous les Frais et Taxes d\'Achat en Espagne',
    excerpt: 'Comprendre les 10-13% de frais supplémentaires lors d\'un achat immobilier.',
    category: 'Finances',
  },
  {
    slug: 'hypotheque-etrangers',
    title: 'Hypothèques pour les Étrangers en Espagne',
    excerpt: 'Comment obtenir un financement hypothécaire en tant qu\'acheteur français.',
    category: 'Financement',
  },
  {
    slug: 'nie-numero',
    title: 'Obtenir Votre Numéro NIE en Espagne',
    excerpt: 'Guide complet du numéro d\'identification fiscale pour les étrangers.',
    category: 'Documentation',
  },
  {
    slug: 'costa-blanca-sud-nord',
    title: 'Costa Blanca Sud vs Nord: Quelle Région Choisir?',
    excerpt: 'Comparaison détaillée des deux régions principales de la Costa Blanca.',
    category: 'Régions',
  },
  {
    slug: 'processus-achat-spagne',
    title: 'Étapes du Processus d\'Achat en Espagne',
    excerpt: 'Guide étape par étape du processus d\'acquisition immobilière en Espagne.',
    category: 'Guide',
  },
];

export default function FRBlogPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/fr/blog/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        <section className="bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Blog & Conseils <span className="font-semibold">Immobiliers</span>
              </h1>
              <p className="text-warm-300 text-lg">
                Tout ce que vous devez savoir pour acheter une maison neuve en Espagne
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/fr/blog/${post.slug}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-warm-200"
                >
                  <div className="bg-gradient-to-br from-primary-900 to-primary-800 h-40 flex items-end p-4">
                    <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-3">
                      {post.title}
                    </h3>
                    <p className="text-warm-600 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-accent-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire l'Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-primary-900 mb-6">
              Vous ne Trouvez Pas Ce <span className="font-semibold">Que Vous Cherchez?</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Contactez notre équipe pour des questions spécifiques sur l'achat immobilier en Espagne.
            </p>
            <Link
              href="/fr/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center gap-2"
            >
              Nous Contacter
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

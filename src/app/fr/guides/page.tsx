import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides d\'Achat | Comment Acheter une Maison en Espagne | Costa Blanca 2026',
  description: 'Guides complets pour les acheteurs français. Processus d\'achat, NIE, frais, hypothèques, taxes et tout ce que vous devez savoir.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/guides',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/guides',
      'sv': 'https://newbuildhomescostablanca.com/sv/guides',
      'nl': 'https://newbuildhomescostablanca.com/nl/guides',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides',
      'fr': 'https://newbuildhomescostablanca.com/fr/guides',
      'de': 'https://newbuildhomescostablanca.com/de/guides',
      'no': 'https://newbuildhomescostablanca.com/no/guides',
      'pl': 'https://newbuildhomescostablanca.com/pl/guides',
      'ru': 'https://newbuildhomescostablanca.com/ru/guides',
      'x-default': 'https://newbuildhomescostablanca.com/guides',
    },
  },
};

const essentialGuides = [
  {
    title: 'Processus d\'Achat',
    slug: 'processus-achat',
    description: 'Guide étape par étape pour acheter une maison neuve en Espagne. De la réservation à la signature finale.',
    icon: '📋',
    readTime: '12 min de lecture',
    category: 'Essentiel',
  },
  {
    title: 'Numéro NIE',
    slug: 'nie',
    description: 'Comment obtenir votre NIE — obligatoire pour acheter un bien immobilier en Espagne.',
    icon: '🪪',
    readTime: '8 min de lecture',
    category: 'Essentiel',
  },
  {
    title: 'Frais & Impôts',
    slug: 'frais-impots',
    description: 'Décomposition complète des frais d\'achat, impôts et dépenses courantes pour les propriétaires.',
    icon: '💰',
    readTime: '10 min de lecture',
    category: 'Essentiel',
  },
  {
    title: 'Hypothèques pour Étrangers',
    slug: 'hypotheque',
    description: 'Comment obtenir un financement hypothécaire en tant qu\'acheteur français. Exigences et processus.',
    icon: '🏦',
    readTime: '10 min de lecture',
    category: 'Essentiel',
  },
];

const decisionGuides = [
  {
    title: 'Pourquoi Acheter Neuf?',
    slug: 'pourquoi-neuf',
    description: 'Avantages de la maison neuve par rapport à la revente — garanties, efficacité énergétique et design moderne.',
    icon: '🏗️',
    readTime: '6 min de lecture',
    category: 'Décision',
  },
  {
    title: 'Clé en Main vs Sur Plan',
    slug: 'cle-en-main-vs-sur-plan',
    description: 'Faut-il acheter fini ou en construction? Avantages et inconvénients pour les acheteurs français.',
    icon: '🔑',
    readTime: '8 min de lecture',
    category: 'Décision',
  },
  {
    title: 'Nord vs Sud Costa Blanca',
    slug: 'nord-vs-sud',
    description: 'Comparez les deux régions — côte nord exclusive vs côte sud abordable. Trouvez votre endroit parfait.',
    icon: '🗺️',
    readTime: '10 min de lecture',
    category: 'Décision',
  },
  {
    title: 'Licence de Location Touristique',
    slug: 'tourist-rental-license',
    description: 'Tout sur les licences de location saisonnière en Communauté valencienne — conditions, processus et potentiel.',
    icon: '📜',
    readTime: '8 min de lecture',
    category: 'Investissement',
  },
];

const destinationGuides = [
  {
    title: 'Torrevieja',
    description: '7 quartiers avec photographie aérienne. Le guide complet Costa Blanca Sud.',
    href: '/fr/guides/torrevieja',
    icon: '🏖️',
    badges: ['100+ photos', '7 zones'],
  },
  {
    title: 'Jávea',
    description: '4 quartiers de la plage d\'Arenal à la montagne Montgó. Vie côtière premium.',
    href: '/fr/guides/javea',
    icon: '⛵',
    badges: ['4 quartiers', '7 plages'],
  },
  {
    title: 'Costa Blanca Nord',
    description: '6 villes comparées — Jávea, Moraira, Altea, Calpe, Dénia & Benissa avec photographie aérienne.',
    href: '/fr/guides/costa-blanca-nord',
    icon: '🏔️',
    badges: ['6 villes', 'Guide région'],
  },
  {
    title: 'Orihuela Costa',
    description: 'Paradis du golf avec La Zenia, Villamartin, Cabo Roig et plus. Vie côtière abordable.',
    href: '/fr/guides/orihuela-costa',
    icon: '⛳',
    badges: ['6 zones', 'Focus golf'],
  },
  {
    title: 'Benidorm & Finestrat',
    description: 'La ville côtière la plus dynamique d\'Espagne — plages, vie nocturne et potentiel d\'investissement surprenant.',
    href: '/fr/guides/benidorm-finestrat',
    icon: '🌇',
    badges: ['2 zones', 'Guide ville'],
  },
];

export default function FRGuidesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-accent-500" />
            <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Guides Experts</span>
            <div className="w-10 h-px bg-accent-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Guides d'Achat</h1>
          <p className="text-xl text-warm-200 max-w-2xl mx-auto mb-4">
            Tout ce que vous devez savoir pour acheter une maison neuve à Costa Blanca.
            Guides experts écrits pour les acheteurs français.
          </p>
          <p className="text-warm-300">
            Du numéro NIE aux hypothèques, nous vous guidons à travers chaque étape du processus.
          </p>
        </div>
      </section>

      {/* Essential Buyer Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">À Lire</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Guides Essentiels pour l'Acheteur</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Les quatre guides que tout acheteur doit lire avant d'acheter en Espagne</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {essentialGuides.map((guide) => (
              <Link key={guide.slug} href={`/fr/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-accent-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-accent-500 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-accent-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-accent-500 text-sm font-semibold flex items-center gap-1">
                      Lire
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Guides */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Explorer les Zones</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Guides des Destinations</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Guides approfondis pour les meilleurs secteurs de Costa Blanca</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinationGuides.map((dest) => (
              <Link key={dest.href} href={dest.href}>
                <div className="bg-primary-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow h-full group">
                  <div className="h-32 bg-gradient-to-br from-accent-500/30 to-primary-800 flex items-center justify-center">
                    <span className="text-5xl">{dest.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                      {dest.title}
                    </h3>
                    <p className="text-warm-300 text-sm mb-3">{dest.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.badges.map((badge, i) => (
                        <span key={i} className="text-xs bg-accent-500/20 text-accent-400 px-2 py-0.5 rounded">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Decision & Planning Guides */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent-500 text-xs font-bold tracking-widest uppercase">Planification</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-2 mb-4">Guides de Décision</h2>
            <p className="text-warm-600 max-w-xl mx-auto">Prenez des décisions éclairées sur la localisation, le type de propriété et la stratégie d'investissement</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decisionGuides.map((guide) => (
              <Link key={guide.slug} href={`/fr/guides/${guide.slug}`}>
                <div className="bg-white border-2 border-warm-100 rounded-lg p-6 hover:border-primary-500 hover:shadow-lg transition-all h-full group">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors text-xl">
                    {guide.icon}
                  </div>
                  <span className="text-xs font-bold text-primary-600 tracking-wider uppercase">{guide.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1 mb-2 group-hover:text-primary-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-warm-600 text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-warm-400">{guide.readTime}</span>
                    <span className="text-primary-600 text-sm font-semibold flex items-center gap-1">
                      Lire
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finance CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent-400 text-xs font-bold tracking-widest uppercase">Financement & Hypothèques</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">Prêt à Comparer les Taux d'Hypothèques?</h2>
              <p className="text-warm-200 mb-6">
                Comparez les taux de plus de 15 banques espagnoles, consultez les données de marché actuelles et explorez les options de financement
                pour les propriétés standard et de luxe.
              </p>
              <Link
                href="/fr/guides/hypotheque"
                className="inline-block bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Comparer les Hypothèques &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">~3.15%</div>
                <div className="text-warm-300 text-sm mt-1">Taux fixe moyen</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-warm-300 text-sm mt-1">LTV non-résidents</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-warm-300 text-sm mt-1">Banques comparées</div>
              </div>
              <div className="bg-white/10 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-white">&euro;800k+</div>
                <div className="text-warm-300 text-sm mt-1">Options de luxe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Pourquoi Faire Confiance à Nos Guides?</h2>
            <p className="text-warm-600">Expertise locale combinée avec compréhension internationale</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Expertise Locale</h3>
              <p className="text-warm-600">Établis à Costa Blanca avec des années d'expérience aidant les acheteurs français à naviguer le marché immobilier espagnol.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Informations Actualisées</h3>
              <p className="text-warm-600">Régulièrement mise à jour pour refléter les lois immobilières espagnoles actuelles, les réglementations fiscales et les conditions du marché.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-accent-500">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Focus Français</h3>
              <p className="text-warm-600">Spécialement conçu pour les acheteurs français — couvrant les défis uniques tels que les numéros NIE, les hypothèques étrangères et les impôts non-résidents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Des Questions?</h2>
          <p className="text-xl text-white/90 mb-8">
            Notre équipe est là pour vous guider à travers le processus d'achat. Contactez-nous pour des conseils personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fr/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Contactez-Nous
            </Link>
            <a
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              WhatsApp
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Réponse rapide dans les 24 heures — souvent bien plus vite
          </p>
        </div>
      </section>
    </main>
  );
}

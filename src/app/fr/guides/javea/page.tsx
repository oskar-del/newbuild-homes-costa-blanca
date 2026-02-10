import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/fr/guides/javea`

export const metadata: Metadata = {
  title: 'Jávea - Guide Premium pour Acheteurs Français 2026',
  description: 'Guide complet de Jávea: luxe, prestige, falaises spectaculaires, prix élevés. Idéal pour investisseurs et couples actifs cherchant excellence.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/javea`,
      sv: `${baseUrl}/sv/guides/javea`,
      nl: `${baseUrl}/nl/guides/javea`,
      'nl-BE': `${baseUrl}/nl-be/guides/javea`,
      fr: currentUrl,
      no: `${baseUrl}/no/guides/javea`,
      de: `${baseUrl}/de/guides/javea`,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/javea`,
    },
  },
  openGraph: {
    title: 'Jávea - Guide Premium Costa Blanca',
    description: 'Luxe, prestige, falaises spectaculaires - pour les meilleurs investisseurs',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'fr_FR',
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: `${baseUrl}/fr` },
  { name: 'Guides', url: `${baseUrl}/fr/guides` },
  { name: 'Jávea', url: currentUrl },
]

const faqs = [
  {
    question: 'Pourquoi Jávea est-elle la destination premium de la Costa Blanca?',
    answer: 'Jávea offre paysage spectaculaire (falaises emblématiques), population cosmopolite active, loisirs premium (golf, yacht club), restaurants excellence, et sécurité immobilière via appréciation rapide. C\'est la "Riviera française" de l\'Espagne.',
  },
  {
    question: 'Combien coûte l\'immobilier à Jávea?',
    answer: 'Villa 150m² neuve: 425.000€ - 550.000€. Apartment 90m²: 300.000€ - 400.000€. Luxe: 600.000€+. Environ 2x plus cher qu\'au Sud (Torrevieja). Appréciation 5-8% annuels vs 2-3% ailleurs.',
  },
  {
    question: 'Est-ce bon investissement pour rendement locatif?',
    answer: 'Excellent pour rendement: 6-8% annuels vs 5-7% au Sud. Clientèle haut de gamme paie plus. Mais marché plus compétitif. Idéal si cherchez prestige + rendement.',
  },
  {
    question: 'Y a-t-il communauté française à Jávea?',
    answer: 'Moins dense qu\'au Sud mais présente (2.000-3.000 Français). Plutôt cosmopolite/internationale. Avantage: pas insulaire, culture locale forte. Inconvénient: moins infrastructure française.',
  },
  {
    question: 'Quel est le meilleur quartier à Jávea?',
    answer: 'Arenal: promenade maritime, vie active. Granadella: plage privée, prestige. Portitxol: calme familial. El Bol Nou: résidentiel économique. Totalement dépend profil: actif = Arenal, calme = Granadella.',
  },
  {
    question: 'Comment est accessibilité aéroport?',
    answer: 'Alicante: 90 km (90-120 min voiture). Plus loin que Torrevieja. Mais vol Paris-Alicante = 2h15. Vaut la peine si cherchez investissement prestige à long terme.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function JavaeaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <div key={crumb.url} className="flex items-center">
                {idx > 0 && <span className="mx-2 text-gray-400">/</span>}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-primary-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="text-accent-500 hover:text-accent-600">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-primary-900 mb-4 leading-tight">
            Jávea - Guide Premium pour Acheteurs Français
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Jávea est la destination premium de la Costa Blanca. Falaises spectaculaires, vie cosmopolite, loisirs prestige, et appréciation immobilière rapide. C'est le choix des investisseurs sérieux et couples actifs cherchant excellence.
          </p>
        </div>

        {/* Section: Overview */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Vue d'Ensemble de Jávea</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Faits Clés</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Population: 28.000 habitants</li>
                <li>Français: 2.000-3.000</li>
                <li>Distance Alicante: 90 km (120 min)</li>
                <li>Climat: 300 jours soleil/an</li>
                <li>Côte: Falaises spectaculaires</li>
                <li>Prix moyen: 4.000€ - 5.500€/m²</li>
                <li>Appréciation: 5-8%/an</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Pourquoi Jávea?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Paysage spectaculaire unique</li>
                <li>Population cosmopolite active</li>
                <li>Loisirs et restaurants prestige</li>
                <li>Sécurité investissement (appréciation)</li>
                <li>Rendement locatif excellent (6-8%)</li>
                <li>Vie internationale pas insulaire</li>
                <li>Golf haut de gamme</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Neighborhoods */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Quartiers Principaux</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Arenal - Centre Vibrant</h3>
              <p className="text-gray-700 text-sm mb-3">
                Promenade maritime avec restaurants chic, bars à tapas, vie animée jour et nuit. Centre de gravité de Jávea.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 4.500€ - 5.500€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Actifs, couples jeunes, vie animée</p>
                <p><span className="font-semibold">Avantages:</span> Restaurants excellents, plage proche, vue mer</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Granadella - Prestige Côtier</h3>
              <p className="text-gray-700 text-sm mb-3">
                Plage privée exclusive, villas de prestige, calme avec légère vida animée. Le quartier PLUS prestige.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 5.000€ - 6.500€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Couples aisés, prestige, prestige</p>
                <p><span className="font-semibold">Avantages:</span> Plage exclusive, calme, vue falaise, prestige</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Portitxol - Familial Calme</h3>
              <p className="text-gray-700 text-sm mb-3">
                Village côtier traditionnel, calme et authentique. Familles et retraités cherchant tranquillité.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 3.500€ - 4.500€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Familles, retraités, tranquillité</p>
                <p><span className="font-semibold">Avantages:</span> Calme, authenticité, prix meilleur que Arenal</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">El Bol Nou - Résidentiel Économique</h3>
              <p className="text-gray-700 text-sm mb-3">
                Quartier résidentiel inland, moderne, sans vue mer mais bien aménagé et moins cher.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 2.800€ - 3.800€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Budget limité, investisseurs rendement</p>
                <p><span className="font-semibold">Avantages:</span> Plus abordable, résidentiel calme, accès Arenal facile</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Pricing */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Prix Immobiliers 2026</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Villas (Type Prime)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Villa 150m² vue mer (Arenal/Granadella):</p>
                  <p className="text-gray-700">425.000€ - 550.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Villa 180m² prestige (Granadella):</p>
                  <p className="text-gray-700">600.000€ - 800.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Villa 120m² Portitxol/El Bol Nou:</p>
                  <p className="text-gray-700">300.000€ - 400.000€</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Apartments</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Apartment 90m² vue mer (Arenal):</p>
                  <p className="text-gray-700">300.000€ - 400.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Penthouse 120m² prestige (Granadella):</p>
                  <p className="text-gray-700">450.000€ - 600.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Apartment 70m² Portitxol:</p>
                  <p className="text-gray-700">200.000€ - 280.000€</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Comparaison Nord-Sud</h3>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Jávea (Nord):</span> 425.000€ - 550.000€ (villa 150m²)</p>
                <p><span className="font-semibold">Torrevieja (Sud):</span> 225.000€ - 325.000€ (villa 150m²)</p>
                <p><span className="font-semibold">Différence:</span> Jávea 85-95% plus cher</p>
                <p><span className="font-semibold">Justification:</span> Prestige, rendement meilleur, appréciation rapide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Lifestyle */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Style de Vie Premium</h2>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Restaurants & Gastronomie</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea est centre gastronomique Costa Blanca. 50+ restaurants allant de traditionnel à étoilé Michelin.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Restaurants français (5+)</li>
                <li>Méditerranéen excellence</li>
                <li>Fruits de mer frais quotidiens</li>
                <li>Paella authentic</li>
                <li>Prix: 25€ - 80€ par personne</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Loisirs Premium</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <div>
                  <p className="font-semibold">Golf:</p>
                  <p>Club prestige 18 trous, handicap requis, green fees élevés (80€-120€)</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Yacht Club:</p>
                  <p>Marina moderne, voile, location bateaux, bar exclusif</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Sports nautiques:</p>
                  <p>Jet ski, plongée, voile, kayak, windsurf</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-semibold">Shopping:</p>
                  <p>Boutiques prestige, designer, marché haut de gamme samedi</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Paysage Naturel</h3>
              <p className="text-gray-700 text-sm">
                Paysage est l'atout clé de Jávea. Falaises spectaculaires (Punta Ifach), plages isolées, cabo San Antonio, sentiers rando magnifiques. Tous les 5km nouvelle surprise.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Investment */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Potentiel d'Investissement</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rendement Locatif (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><span className="font-semibold">Rendement brut:</span> 6-8% annuel</p>
                <p><span className="font-semibold">Clientèle:</span> Haut de gamme, couples aisés, executives</p>
                <p><span className="font-semibold">Saison:</span> Avril-septembre actif, oct-mars modéré</p>
                <p><span className="font-semibold">Prix nuit moyen:</span> 150€ - 300€ (apartment), 200€ - 400€ (villa)</p>
                <p><span className="font-semibold">Occupancy annuel:</span> 50-60% fiable</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Exemple Rendement: Villa 500.000€</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Scénario conservateur (55% occupation):</span></p>
                <p>201 nuits/an × 250€ = 50.250€</p>
                <p>Moins charges (gestion, nettoyage): 12.000€</p>
                <p>Rendement net: 38.250€ (7,65%)</p>
                <p className="border-t pt-2 font-semibold">Appréciation immobilière estimée:</p>
                <p>5-8% annuel = 25.000€ - 40.000€/an additionnel</p>
                <p className="font-semibold text-accent-600">Retour total: 12-15% annuel!</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Appréciation Immobilière</h3>
              <p className="text-gray-700 text-sm mb-3">
                L'appréciation est clé à Jávea. Propriétés appréciées 5-8% annuels vs 2-3% au Sud.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Demande pour prestige = stable</li>
                <li>Supply limité = prix montent</li>
                <li>Investisseurs étrangers = competition prix</li>
                <li>Sur 10 ans: +60-110% appréciée</li>
              </ul>
            </div>

            <div className="border-l-4 border-accent-500 pl-4">
              <p className="text-gray-700 text-sm">
                <strong>Verdict:</strong> Jávea excellent pour investisseurs sérieux. Combinaison rendement locatif (6-8%) + appréciation rapide (5-8%) = retour total 12-15%/an. Mais nécessite capital initial élevé (400.000€+).
              </p>
            </div>
          </div>
        </section>

        {/* Section: Community */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Communauté et Culture</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Communauté Française</h3>
              <p className="text-gray-700 text-sm mb-3">
                Moins dense qu'au Sud (2.000-3.000 vs 5.000 à Torrevieja) mais présente et active. Population plutôt cosmopolite/internationale.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Français: 7-10% population étrangère</li>
                <li>Restaurants français (5+)</li>
                <li>Services en français disponibles</li>
                <li>Club français moins actif qu'au Sud</li>
                <li>Avantage: culture locale forte, pas insulaire</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Population</h3>
              <p className="text-gray-700 text-sm mb-3">
                Jávea attire population cosmopolite et active. Moins "retraités", plus "entrepreneurs/exécutives/jeunes couples aisés".
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Britanniques:</span> 25% étrangers (principale groupe)</p>
                <p><span className="font-semibold">Allemands:</span> 15%</p>
                <p><span className="font-semibold">Français:</span> 10%</p>
                <p><span className="font-semibold">Autres:</span> Espagnols + mélange international</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Culture & Événements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Festival musique (Arenal Sound en août)</li>
                <li>Fiestas Jávea (mai, 10 jours)</li>
                <li>Marathons et sports</li>
                <li>Marchés locaux (samedi)</li>
                <li>Vie culturelle active</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Infrastructure */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastructure et Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Santé & Services</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Hospital privé (Clínica Marina)</li>
                <li>Médecins francophones</li>
                <li>Dentistes excellents</li>
                <li>Pharmacies</li>
                <li>Services d'urgence 24/7</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Shopping & Loisirs</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Shopping prestige (Arenal)</li>
                <li>Supermarchés (Mercadona, etc)</li>
                <li>Boutiques designer</li>
                <li>Restaurants 50+</li>
                <li>Cinéma</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Transport</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Bus local</li>
                <li>Taxi plentiful</li>
                <li>Gare train côtière</li>
                <li>Port marina</li>
                <li>Voiture recommandée</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Accès Aéroport</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Alicante 90 km (120 min)</li>
                <li>Vols directs France</li>
                <li>Service voiture location</li>
                <li>Taxi/Uber disponible</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-primary-900 mb-8">Foire aux Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border rounded-sm p-6 border-gray-200">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-900 text-white rounded-sm p-8 mt-12">
          <h2 className="text-2xl font-light mb-4">Investisseur Premium? Jávea Est Pour Vous</h2>
          <p className="mb-6 text-gray-100">
            Découvrez nos propriétés prestige à Jávea avec rendement 6-8% et appréciation 5-8%/an. Portfolio exclusif pour investisseurs sérieux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent-500 text-white px-6 py-3 rounded-sm font-semibold hover:bg-accent-600 transition"
            >
              Contacter par WhatsApp
            </Link>
            <Link
              href="/fr/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition"
            >
              Demander Consultation
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/fr/guides"
            className="text-accent-500 hover:text-accent-600 font-semibold flex items-center"
          >
            Retour à tous les Guides
          </Link>
        </div>
      </main>
    </div>
  )
}

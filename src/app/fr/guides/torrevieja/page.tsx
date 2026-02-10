import { Metadata } from 'next'
import Link from 'next/link'
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema'

const baseUrl = 'https://newbuildhomescostablanca.com'
const currentUrl = `${baseUrl}/fr/guides/torrevieja`

export const metadata: Metadata = {
  title: 'Torrevieja - Guide Complet pour Acheteurs Français 2026',
  description: 'Guide détaillé de Torrevieja: prix immobiliers, communauté française, style de vie, infrastructure, quartiers. Le meilleur choix pour retraités français.',
  alternates: {
    canonical: currentUrl,
    languages: {
      en: `${baseUrl}/guides/torrevieja`,
      sv: `${baseUrl}/sv/guides/torrevieja`,
      nl: `${baseUrl}/nl/guides/torrevieja`,
      'nl-BE': `${baseUrl}/nl-be/guides/torrevieja`,
      fr: currentUrl,
      no: `${baseUrl}/no/guides/torrevieja`,
      de: `${baseUrl}/de/guides/torrevieja`,
      pl: `${baseUrl}/pl/guides`,
      ru: `${baseUrl}/ru/guides`,
      'x-default': `${baseUrl}/guides/torrevieja`,
    },
  },
  openGraph: {
    title: 'Torrevieja - Guide Complet pour Acheteurs Français',
    description: 'Prix, quartiers, communauté française et infrastructure à Torrevieja',
    url: currentUrl,
    siteName: 'Newbuild Homes Costa Blanca',
    locale: 'fr_FR',
  },
}

const breadcrumbs = [
  { name: 'Accueil', url: `${baseUrl}/fr` },
  { name: 'Guides', url: `${baseUrl}/fr/guides` },
  { name: 'Torrevieja', url: currentUrl },
]

const faqs = [
  {
    question: 'Pourquoi Torrevieja est populaire pour les Français?',
    answer: 'Torrevieja est le centre français de la Costa Blanca avec 5.000+ Français. Infrastructure complète (médecins français, restaurants, services), coûts inférieurs, plages longues, et vie établie. Parfait pour retraités cherchant communauté française.',
  },
  {
    question: 'Combien coûte une maison à Torrevieja en 2026?',
    answer: 'Apartments: 140.000€ - 250.000€ (80-100m²). Villas: 225.000€ - 350.000€ (150m²). Penthouses: 280.000€ - 450.000€. Tarifs 40-50% moins chers qu\'au Nord, très accessible pour retraités.',
  },
  {
    question: 'Quel quartier est meilleur pour vivre?',
    answer: 'Paseo Maritimo (centre): lively, proche plage, mais cher. La Mata: calme, familial, 5km nord, très populaire. Punta Prima: résidentiel, modern. El Remo: bon marché, pas cher.',
  },
  {
    question: 'Quel est le rendement locatif à Torrevieja?',
    answer: 'Torrevieja offre 5-7% rendement brut. Tourisme important de septembre à mars (retraités hivernants). Locations longues durée aussi possibles avec clientèle stable.',
  },
  {
    question: 'Combien coûte vivre à Torrevieja par mois?',
    answer: 'Couple retraité: 1.800€ - 2.500€/mois (loyer/charges, nourriture, loisirs). Très abordable. Inférieur de 30-40% au Nord. Budget retraite suffisant pour vivre confortablement.',
  },
  {
    question: 'Y a-t-il une bonne infrastructure française?',
    answer: 'Oui, excellente. Médecins français, restaurants français partout, Association Française active, écoles françaises, services notaires français. Plus grande concentration française d\'Espagne.',
  },
]

const breadcrumbJsonLd = toJsonLd(breadcrumbSchema(breadcrumbs))
const faqJsonLd = toJsonLd(faqSchema(faqs))

export default function TorreviejaPage() {
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
            Torrevieja - Guide Complet pour Acheteurs Français
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Torrevieja est le cœur de la communauté française de la Costa Blanca. Avec 5.000+ Français établis, infrastructure adaptée, et prix accessibles, c'est le choix idéal pour les retraités français cherchant vie établie en Espagne.
          </p>
        </div>

        {/* Section: Overview */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Vue d'Ensemble de Torrevieja</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Faits Rapides</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Population: 80.000 habitants</li>
                <li>Français: 5.000+ (6% population)</li>
                <li>Distance Alicante: 50 km (45 min)</li>
                <li>Climat: 310 jours soleil/an</li>
                <li>Plages: 8 km longues plages</li>
                <li>Saison touristique: sept-mars</li>
                <li>Prix moyen: 2.000€ - 3.500€/m²</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Pourquoi Torrevieja?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Plus grande communauté française</li>
                <li>Prix 40-50% moins cher qu'au Nord</li>
                <li>Infrastructure complète française</li>
                <li>Retraités français partout</li>
                <li>Services adaptés à retraites</li>
                <li>Proche aéroport Alicante</li>
                <li>Vie sociale très active</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Neighborhoods */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Quartiers Principaux</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Paseo Maritimo (Centre Ville)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Le cœur vibrant de Torrevieja. Promenade maritime avec restaurants, bars, vie active jour et nuit. Proche plage, port, vie touristique.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 3.000€ - 4.000€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Actifs, couples jeunes, investisseurs</p>
                <p><span className="font-semibold">Avantages:</span> Vie animée, restaurants, plage proche</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">La Mata (5 km Nord)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Village côtier calme et familial. Plage magnifique, restaurants traditionnels, vie tranquille. TRÈS populaire parmi Français.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 2.200€ - 3.000€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Retraités, familles, vie tranquille</p>
                <p><span className="font-semibold">Avantages:</span> Plage superbe, calm, restaurants locaux, accès Torrevieja facile</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Punta Prima (Sud)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Quartier résidentiel moderne et balnéaire. Urbanisations planifiées, services complets, prestige modéré.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 2.500€ - 3.500€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Familles, propriétaires cherchant calme avec confort</p>
                <p><span className="font-semibold">Avantages:</span> Modern, piscines communautaires, accès plage, services variés</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">El Remo & Los Naufragos (Inland)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Quartiers résidentiels inland, sans plage mais calmes et économiques. Beaucoup de Français y vivent pour coûts réduits.
              </p>
              <div className="text-gray-700 text-sm space-y-1">
                <p><span className="font-semibold">Prix moyen:</span> 1.500€ - 2.200€/m²</p>
                <p><span className="font-semibold">Ideal pour:</span> Budget serré, retraités cherchant coûts bas</p>
                <p><span className="font-semibold">Avantages:</span> Très abordable, résidentiel paisible, accès Torrevieja 10 min</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Pricing */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Prix Immobiliers 2026</h2>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Apartments (Locations Populaires)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">80-90m² Centre/La Mata:</p>
                  <p className="text-gray-700">180.000€ - 250.000€ (neuf)</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">100-110m² Punta Prima:</p>
                  <p className="text-gray-700">250.000€ - 350.000€ (neuf)</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Apartments anciens (bon marché):</p>
                  <p className="text-gray-700">100.000€ - 180.000€ (rénovation possible)</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Villas (Idéales Retraités)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-700 font-semibold">Villa 150m² neuve (Punta Prima/La Mata):</p>
                  <p className="text-gray-700">225.000€ - 325.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Villa 180m² neuve prestige:</p>
                  <p className="text-gray-700">300.000€ - 450.000€</p>
                </div>
                <div className="border-t pt-3">
                  <p className="text-gray-700 font-semibold">Villa ancienne bon marché (El Remo):</p>
                  <p className="text-gray-700">150.000€ - 220.000€ (rénovation)</p>
                </div>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Exemple Budget (Retraité France)</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Budget: 250.000€</span></p>
                <p>→ Villa 150m² neuve clé-en-main (Punta Prima/La Mata)</p>
                <p>→ 3 chambres, 2 salles de bains, terrasse, jardin</p>
                <p>→ Prêt: 200.000€ (80%), apport: 50.000€</p>
                <p>→ Mensualités: ~1.000€ hypothèque (30 ans @ 3,8%)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Living Costs */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Coût de Vie Mensuel</h2>

          <div className="border rounded-sm p-6 border-gray-200 mb-6">
            <h3 className="font-semibold text-primary-900 mb-3">Budget Mensuel pour Couple Retraité (2026)</h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Hypothèque/Charges si propriétaire</span>
                <span className="font-semibold">800€ - 1.200€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Électricité, eau, gaz</span>
                <span className="font-semibold">100€ - 150€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Nourriture & restaurants (50/50)</span>
                <span className="font-semibold">400€ - 550€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Voiture & transport</span>
                <span className="font-semibold">150€ - 250€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Assurance santé complémentaire</span>
                <span className="font-semibold">150€ - 200€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Activités, loisirs, golf</span>
                <span className="font-semibold">150€ - 300€</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Vêtements & divers</span>
                <span className="font-semibold">100€ - 150€</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>TOTAL MENSUEL</span>
                <span>1.900€ - 2.800€</span>
              </div>
            </div>
          </div>

          <div className="bg-warm-50 rounded-sm p-6">
            <h3 className="font-semibold text-primary-900 mb-3">Économies vs France</h3>
            <p className="text-gray-700 text-sm mb-3">
              Le coût de vie à Torrevieja est 30-40% moins cher qu'en France (sauf loyer initial).
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Nourriture 20-30% moins cher</li>
              <li>Restaurants 25-35% moins cher</li>
              <li>Électricité 40-50% moins cher (climat mild, peu chauffage)</li>
              <li>Impôts locaux 60-70% moins cher</li>
              <li>Services (coiffeur, etc) 30% moins cher</li>
            </ul>
          </div>
        </section>

        {/* Section: French Community */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Communauté Française</h2>

          <div className="space-y-6">
            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Infrastructure Française Complète</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Médecins français:</strong> 15+ médecins francophone ou français</li>
                <li><strong>Dentistes:</strong> Services en français, niveaux bons</li>
                <li><strong>Restaurants français:</strong> 20+ restaurants avec chefs français</li>
                <li><strong>Services:</strong> Notaires français, comptables, assurance</li>
                <li><strong>Association Française:</strong> Très active, activités régulières</li>
                <li><strong>Clubs loisirs:</strong> Pétanque, bridge, danse, chorale, rando</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Vie Sociale Française</h3>
              <p className="text-gray-700 text-sm mb-3">
                Torrevieja a une vie sociale française très active. Vous trouverez facilement amis et communauté.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Événements français réguliers (Bastille, Noël, etc.)</li>
                <li>Repas France-Espagne mensuels</li>
                <li>Sorties organisées (musées, villes)</li>
                <li>Groupes de marche et activités</li>
                <li>Messes françaises à l'église</li>
              </ul>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Intégration Locale</h3>
              <p className="text-gray-700 text-sm">
                Espagnols très tolérants de la forte présence française. Beaucoup parlent français. Vous pouvez vivre pleinement français ET espagnol simultanement.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Infrastructure */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Infrastructure et Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Santé & Bien-être</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Hospital public (Torre Salud)</li>
                <li>15+ médecins francophones</li>
                <li>Pharmacies nombreuses</li>
                <li>Cliniques dentaires</li>
                <li>Fisioterapia (physio)</li>
                <li>Opticiens</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Transports & Accessibilité</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Bus local extensif</li>
                <li>Bus Alicante direct (45 min)</li>
                <li>Train côtier</li>
                <li>Taxis plentiful</li>
                <li>Uber/Cabify disponibles</li>
                <li>Gare centrale près centre-ville</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Shopping & Loisirs</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Centre Carrefour (grand mall)</li>
                <li>Mercadona, Lidl, Hipercor</li>
                <li>Marché semaine (Samedi)</li>
                <li>Restaurants excellents (20+)</li>
                <li>Bars et discothèques</li>
                <li>Cinémas</li>
              </ul>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Loisirs & Sports</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Golf (2 parcours, 18 trous)</li>
                <li>Sports nautiques (Jet ski, voile)</li>
                <li>Piscine municipal</li>
                <li>Salles fitness</li>
                <li>Marche/rando</li>
                <li>Yacht club</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Rental Market */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Rendement Locatif et Investissement</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Rendement Locatif Torrevieja (2026)</h3>
              <div className="space-y-3 text-gray-700 text-sm">
                <p><span className="font-semibold">Rendement moyen brut:</span> 5-7% annuel</p>
                <p><span className="font-semibold">Saison haute:</span> Septembre-mars (retraités hivernants)</p>
                <p><span className="font-semibold">Saison basse:</span> Avril-août (moins touristes)</p>
                <p><span className="font-semibold">Prix nuit moyen:</span> 60€ - 120€ (apartment), 100€ - 180€ (villa)</p>
                <p><span className="font-semibold">Taux occupation annuel:</span> 50-65% (fiable)</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Exemple Rendement: Apartment 200.000€</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Scénario conservateur (55% occupation):</span></p>
                <p>100 nuits/an × 80€ = 8.000€</p>
                <p>Moins charges (nettoyage, gestion): 3.000€</p>
                <p>Rendement net: 5.000€ (2,5%)</p>
                <p className="border-t pt-2 font-semibold">Scénario optimiste (65% occupation):</p>
                <p>237 nuits/an × 80€ = 18.960€</p>
                <p>Moins charges: 5.000€</p>
                <p>Rendement net: 13.960€ (7%)</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Avis pour Investisseurs</h3>
              <p className="text-gray-700 text-sm mb-3">
                Torrevieja est viable pour petit investisseur ou retraité cherchant compléments revenus. Marché locatif fiable. Gestion simple via agences locales.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Demande stable (retraités hivernants)</li>
                <li>Agences gestion profesionnelles</li>
                <li>Convention France-Espagne couvre fiscalité</li>
                <li>Amortissement déductible (3-3.33% annuels)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Getting There */}
        <section className="mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-2xl font-light text-primary-900 mb-6">Accès et Vols France</h2>

          <div className="space-y-6">
            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Vols Paris Orly/CDG → Alicante</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Compagnies:</span> Vueling, Ryanair, Air France, EasyJet</p>
                <p><span className="font-semibold">Fréquence:</span> 3-6 vols quotidiens</p>
                <p><span className="font-semibold">Durée vol:</span> 2h15</p>
                <p><span className="font-semibold">Prix aller-retour:</span> 100€ - 250€ (prévoyance)</p>
              </div>
            </div>

            <div className="border rounded-sm p-6 border-gray-200">
              <h3 className="font-semibold text-primary-900 mb-3">Alicante → Torrevieja</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><span className="font-semibold">Distance:</span> 50 km</p>
                <p><span className="font-semibold">Voiture (A-37 autoroute):</span> 45-60 minutes</p>
                <p><span className="font-semibold">Bus direct:</span> 60-90 minutes, €5-8</p>
                <p><span className="font-semibold">Taxi/Uber:</span> €45-60</p>
                <p><span className="font-semibold">Train:</span> 50 min, €5</p>
              </div>
            </div>

            <div className="bg-warm-50 rounded-sm p-6">
              <h3 className="font-semibold text-primary-900 mb-3">Autres Vols Utiles (France)</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li><strong>Lyon:</strong> 1 vol quotidien, 2h vol</li>
                <li><strong>Marseille:</strong> Quelques vols semaine, 2h15 vol</li>
                <li><strong>Toulouse:</strong> 2-3 vols semaine, 2h45 vol</li>
                <li><strong>Bordeaux:</strong> Moins fréquent, 3h vol</li>
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
          <h2 className="text-2xl font-light mb-4">Prêt à Investir à Torrevieja?</h2>
          <p className="mb-6 text-gray-100">
            Découvrez notre portefeuille exclusif de maisons neuves à Torrevieja et La Mata. Financement français disponible. Consultation gratuite avec nos experts français.
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
              Formulaire de Contact
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

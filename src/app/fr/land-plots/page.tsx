import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchLandPlots, formatPrice, ParsedProperty } from '@/lib/xml-parser';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terrains à Bâtir Costa Blanca | Achetez des Terres & Construisez Votre Villa de Rêve',
  description: 'Terrains à bâtir premium à vendre à Costa Blanca à partir de €200 000+. Construisez votre villa de rêve avec nos architectes et constructeurs de confiance. Service entièrement personnalisé de l\'achat du terrain à la remise des clés.',
  openGraph: {
    title: 'Terrains à Bâtir Costa Blanca | Construisez Votre Villa de Rêve',
    description: 'Terrains à bâtir premium avec service de construction entièrement personnalisé. Architectes, constructeurs, aspects juridiques - nous nous occupons de tout.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/fr/land-plots',
    languages: {
      en: 'https://newbuildhomescostablanca.com/land-plots',
      sv: 'https://newbuildhomescostablanca.com/sv/land-plots',
      de: 'https://newbuildhomescostablanca.com/de/land-plots',
      nl: 'https://newbuildhomescostablanca.com/nl/land-plots',
      'nl-be': 'https://newbuildhomescostablanca.com/nl-be/land-plots',
      fr: 'https://newbuildhomescostablanca.com/fr/land-plots',
      no: 'https://newbuildhomescostablanca.com/no/land-plots',
      pl: 'https://newbuildhomescostablanca.com/pl/land-plots',
      ru: 'https://newbuildhomescostablanca.com/ru/land-plots',
      'x-default': 'https://newbuildhomescostablanca.com/land-plots',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

// Plot Card Component
function PlotCard({ plot }: { plot: ParsedProperty }) {
  const mainImage = plot.images?.[0] || '/images/placeholder-plot.jpg';

  return (
    <Link
      href={`/properties/${plot.ref}`}
      className="group block bg-white rounded-sm border border-warm-200 overflow-hidden hover:shadow-xl hover:border-accent-500 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={mainImage}
          alt={`Terrain à bâtir à ${plot.town}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Location badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-sm uppercase">
            Terrain à Bâtir
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-semibold text-lg">
            {plot.price ? formatPrice(plot.price) : 'POA'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-primary-900 mb-2 line-clamp-1 group-hover:text-accent-600 transition-colors">
          {plot.title || `Terrain à bâtir à ${plot.town}`}
        </h3>

        <div className="flex items-center gap-4 text-warm-600 text-sm mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {plot.town}
          </span>
          {plot.plotSize && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {plot.plotSize.toLocaleString()}m² terrain
            </span>
          )}
        </div>

        <p className="text-sm text-warm-500 line-clamp-2">{plot.description?.slice(0, 100)}...</p>
      </div>
    </Link>
  );
}

// WhatsApp CTA
function WhatsAppCTA() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default async function LandPlotsPageFr() {
  // Fetch plots over €200k
  const plots = await fetchLandPlots(200000);

  // Sort by price
  const sortedPlots = [...plots].sort((a, b) => (a.price || 0) - (b.price || 0));

  // Stats
  const prices = plots.map(p => p.price).filter((p): p is number => p !== null && p > 0);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 200000;
  const plotSizes = plots.map(p => p.plotSize).filter((s): s is number => s !== null && s > 0);
  const avgPlotSize = plotSizes.length > 0 ? Math.round(plotSizes.reduce((a, b) => a + b, 0) / plotSizes.length) : 0;

  // Breadcrumb schema
  const breadcrumbs = breadcrumbSchema([
    { name: 'Accueil', url: 'https://newbuildhomescostablanca.com/fr/' },
    { name: 'Terrains à Bâtir', url: 'https://newbuildhomescostablanca.com/fr/land-plots/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }}
      />

      <main className="min-h-screen bg-warm-50">
        {/* HERO */}
        <section className="relative bg-primary-900 py-16 md:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-950" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/fr/" className="hover:text-white transition-colors">Accueil</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Terrains à Bâtir</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Construisez Votre Rêve
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Terrains à Bâtir
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Terrains à bâtir premium à Costa Blanca pour ceux qui souhaitent concevoir et construire leur propre villa de rêve. Nous offrons un service entièrement personnalisé - de la recherche du terrain parfait à la remise des clés de votre villa finalisée.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-2xl font-semibold text-white">{plots.length}</div>
                  <div className="text-warm-400 text-sm">Terrains Disponibles</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">À partir de {formatPrice(lowestPrice)}</div>
                  <div className="text-warm-400 text-sm">Prix de Départ</div>
                </div>
                {avgPlotSize > 0 && (
                  <div>
                    <div className="text-2xl font-semibold text-white">{avgPlotSize.toLocaleString()}m²</div>
                    <div className="text-warm-400 text-sm">Taille Moyenne du Terrain</div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-sm font-medium transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Discutez Construction Personnalisée
                </a>
                <Link
                  href="/fr/developments"
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-sm font-medium transition-colors border border-white/20 text-sm"
                >
                  Voir les Développements
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BESPOKE SERVICE */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Service Complet
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-6">
                  Notre <span className="font-semibold">Service de Construction Personnalisée</span>
                </h2>
                <p className="text-warm-600 leading-relaxed mb-6">
                  Construire votre propre maison en Espagne ne doit pas être compliqué. Nous travaillons avec des architectes, constructeurs et professionnels juridiques de confiance qui vous guident à chaque étape - de la recherche du terrain parfait à la remise des clés.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Notre équipe a aidé des dizaines de clients à construire leurs villas de rêve à Costa Blanca. Nous gérons la complexité de la réglementation espagnole, coordonnons avec les autorités locales et veillons à ce que votre projet reste dans les délais et le budget.
                </p>
              </div>

              <div className="bg-primary-50 p-8 rounded-sm border border-primary-100">
                <h3 className="font-semibold text-primary-900 text-xl mb-6">Ce qui est Inclus</h3>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'Sélection du Terrain', desc: 'Trouvez le terrain parfait pour vos besoins et votre budget' },
                    { step: '2', title: 'Diligence Juridique', desc: 'Vérification juridique complète, permis et documentation' },
                    { step: '3', title: 'Architecture & Design', desc: 'Travaillez avec nos architectes pour concevoir votre maison de rêve' },
                    { step: '4', title: 'Sélection du Constructeur', desc: 'Constructeurs vérifiés avec antécédents éprouvés' },
                    { step: '5', title: 'Gestion de Projet', desc: 'Mises à jour régulières, visites et contrôle de qualité' },
                    { step: '6', title: 'Remise des Clés', desc: 'Inspection finale et clés de votre nouvelle maison' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-medium text-primary-900">{item.title}</h4>
                        <p className="text-warm-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AVAILABLE PLOTS */}
        {plots.length > 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-sm uppercase">
                      Disponible Maintenant
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                    Terrains à Bâtir
                  </h2>
                  <p className="text-warm-600 mt-1">
                    {plots.length} terrains premium à partir de {formatPrice(lowestPrice)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="text-warm-500 text-sm">Trié par prix (bas à haut)</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPlots.map((plot) => (
                  <PlotCard key={plot.ref} plot={plot} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* NO PLOTS FALLBACK */}
        {plots.length === 0 && (
          <section className="py-14 bg-warm-50">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-4">
                Vous Cherchez des Terrains à Bâtir?
              </h2>
              <p className="text-warm-600 leading-relaxed mb-8">
                Nous avons accès à de nombreux terrains à bâtir qui ne sont pas répertoriés en ligne. Contactez-nous pour discuter de vos besoins et nous vous aiderons à trouver le terrain parfait pour votre projet de construction.
              </p>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Discutez de Vos Besoins
              </a>
            </div>
          </section>
        )}

        {/* WHY BUILD */}
        <section className="py-14 bg-white border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-3">
                Pourquoi <span className="font-semibold">Construire Votre Propre Maison?</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Construire votre propre maison vous donne un contrôle total sur la conception, les spécifications et les finitions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Personnalisation Complète</h3>
                <p className="text-warm-600 text-sm">
                  Concevez chaque aspect de votre maison exactement comme vous le souhaitez. Choisissez votre disposition, finitions et équipements.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Meilleure Valeur</h3>
                <p className="text-warm-600 text-sm">
                  La construction peut coûter 20-30% moins cher que l\'achat d\'une propriété équivalente finie, surtout pour les plus grandes villas.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Contrôle de Qualité</h3>
                <p className="text-warm-600 text-sm">
                  Supervisez chaque étape de la construction et assurez les matériaux et la qualité supérieurs d\'exécution.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Choisissez Votre Emplacement</h3>
                <p className="text-warm-600 text-sm">
                  Sélectionnez le terrain exact qui correspond à votre style de vie - vue sur la mer, première ligne golf, campagne tranquille ou ville animée.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Efficacité Énergétique</h3>
                <p className="text-warm-600 text-sm">
                  Incorporez dès le départ les derniers panneaux solaires, isolation et technologie domotique.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Rendez-le Vôtre</h3>
                <p className="text-warm-600 text-sm">
                  Créez une maison qui correspond parfaitement aux besoins de votre famille, de l\'accessibilité au bureau à domicile.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL/TRUST */}
        <section className="py-14 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-10 h-px bg-accent-500" />
              <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                Conseils d\'Expert
              </span>
              <div className="w-10 h-px bg-accent-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
              Prêt à Construire Votre Villa de Rêve?
            </h2>
            <p className="text-warm-300 leading-relaxed mb-8">
              Nous avons aidé des clients à construire tout, des modestes maisons familiales aux somptueuses villas de plusieurs millions d\'euros. Notre réseau d\'architectes, constructeurs et experts juridiques garantit que votre projet se déroule sans problème du début à la fin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Démarrer Votre Projet
              </a>
              <Link
                href="/fr/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Formulaire de Contact
              </Link>
              <a
                href={`tel:${CONTACT.phone}`}
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-colors border border-white/20"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
    </>
  );
}

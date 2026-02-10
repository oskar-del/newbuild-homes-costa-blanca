import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Luksusvillaer Costa Blanca | Eksklusiv Boliger',
  description: 'Finn eksklusive luksusvillaer på Costa Blanca. Fra €500k-€5M. Sammenlikn med Oslo vestside: €8-12M for tilsvarende.',
  openGraph: {
    title: 'Luksusvillaer Costa Blanca | Eksklusiv Boliger',
    description: 'Eksklusiv luksusvillaer på Costa Blanca fra €500.000.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/luxury',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'sv': 'https://newbuildhomescostablanca.com/sv/luxury',
      'nl': 'https://newbuildhomescostablanca.com/nl/luxury',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

export default function NOLuxuryPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Luksus', url: 'https://newbuildhomescostablanca.com/no/luxury/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="relative bg-primary-900 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/no" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Luksus</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Eksklusiv
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Luksusvillaer <span className="font-semibold">Costa Blanca Nord</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed">
                Eksklusive villaer på Costa Blancas mest prestisjøse plasser. Fra €500k-€5M. Sammenlikn med Oslo vestside.
              </p>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Pris: <span className="font-semibold">Oslo Vestside vs Costa Blanca</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Oslo Vestside</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">5-rom villa, 200m²</span>
                    <span className="font-bold text-primary-900">€8-10M</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">6-rom villa, 250m²</span>
                    <span className="font-bold text-primary-900">€10-12M</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">Pris per m²</span>
                    <span className="font-bold text-primary-900">€40k-50k</span>
                  </div>
                  <p className="text-warm-600 text-sm pt-4">
                    Høye kostnader for konstruksjon, lite nybygg, kort byggesesong.
                  </p>
                </div>
              </div>

              <div className="bg-accent-50 rounded-sm p-8 border border-accent-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Costa Blanca Nord</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-accent-200">
                    <span className="text-warm-600">5-rom villa, 200m²</span>
                    <span className="font-bold text-accent-600">€1-1.5M</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-accent-200">
                    <span className="text-warm-600">6-rom villa, 250m²</span>
                    <span className="font-bold text-accent-600">€1.5-2.5M</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-accent-200">
                    <span className="text-warm-600">Pris per m²</span>
                    <span className="font-bold text-accent-600">€5k-10k</span>
                  </div>
                  <p className="text-warm-600 text-sm pt-4">
                    Moderne design, langsom byggestur, golf og strander år-rundt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-900 rounded-sm p-8 text-center text-white">
              <p className="text-lg mb-2">
                <span className="font-semibold">Du sparer 75-85%</span> på samme standard
              </p>
              <p className="text-warm-300">
                For prisen på en 6-roms villa på Oslo vestside kan du kjøpe 5-10 luksusvillaer på Costa Blanca.
              </p>
            </div>
          </div>
        </section>

        {/* Luxury Features */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Luksusvillaer: <span className="font-semibold">Hva Får Du</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Moderne Design</h3>
                <p className="text-warm-600 text-sm">
                  Arkitektur designet av topparkitekter. Åpne planlösninger, minimalistisk stil, smart home teknologi.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Premium Basseng</h3>
                <p className="text-warm-600 text-sm">
                  Uendelig pool, varmeoverføring, automatisk rensing. Noen med jacuzzi, sprudelbad og vannfall.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Havutsikter</h3>
                <p className="text-warm-600 text-sm">
                  Panoramavinduer med middelhavsutsikter. Terasser på flere nivåer for maksimal sol og utsikt.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Hjemmegym & Spa</h3>
                <p className="text-warm-600 text-sm">
                  Rom for fitness, massage rom, sauna. Noen har private tennisbaner eller golfbaner.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Smart Home</h3>
                <p className="text-warm-600 text-sm">
                  Automatisert belysning, klima, sikkerhet. Kontroller alt fra telefonen — hjemme eller ute.
                </p>
              </div>

              <div className="bg-white rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-3">Golfnærhet</h3>
                <p className="text-warm-600 text-sm">
                  Mange villaer ligger på eller nær golfbaner. Noen har direkte tilgang til fairwayer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Populære <span className="font-semibold">Luksuslokasjoner</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Jávea</h3>
                <p className="text-warm-600 text-sm">Dramatisk bergskyst med mediterran karakter. Eksklusiv, etablert, pris fra €1-3M.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Moraira</h3>
                <p className="text-warm-600 text-sm">Elitist ytterst på kystlinjen. Småskala luksusutvikling. Pris fra €1.5-4M.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Altea</h3>
                <p className="text-warm-600 text-sm">Kunstnerisk by med kultur og charm. Vakre strander, fristilt utsikt. Pris fra €800k-2M.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Calpe</h3>
                <p className="text-warm-600 text-sm">Ikonisk Peñón-fjell som landemerke. Blanding av luksus og verdi. Pris fra €600k-2M.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Las Colinas Golf</h3>
                <p className="text-warm-600 text-sm">Etablert golfresort nær San Miguel. 18-hulls Championship kurs. Pris fra €500k-1.5M.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Benitachell</h3>
                <p className="text-warm-600 text-sm">Rolig, grønt område med nye luksusvillaer. Høyere terreng, utsikt. Pris fra €600k-1.8M.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Finn Din <span className="font-semibold">Luksusbolig</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Vil du ikke betale Oslo-priser for luksus? Vi hjelper deg å finne din drømmevilla på Costa Blanca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/no/properties?region=north"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Se Luksusvillaer
              </Link>
              <Link
                href="/no/contact"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-sm transition-all border border-white/20"
              >
                Kontakt Oss
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

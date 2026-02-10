import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Innland Costa Blanca | Hytte & Landlige Villaer',
  description: 'Finn moderne hytte og villaer i innlandet Costa Blanca. Autentisk spansk kultur, stille, fra €200k. Sammenlikn med norske hytte-priser.',
  openGraph: {
    title: 'Innland Costa Blanca | Hytte & Landlige Villaer',
    description: 'Moderne boliger i spansk innland fra €200.000.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/inland',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/inland',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/inland',
      'sv': 'https://newbuildhomescostablanca.com/sv/inland',
      'nl': 'https://newbuildhomescostablanca.com/nl/inland',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/inland',
      'fr': 'https://newbuildhomescostablanca.com/fr/inland',
      'no': 'https://newbuildhomescostablanca.com/no/inland',
      'x-default': 'https://newbuildhomescostablanca.com/inland',
    },
  },
};

export default function NOInlandPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Innland', url: 'https://newbuildhomescostablanca.com/no/inland/' },
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
              <span className="text-white">Innland</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Autentisk Spania
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Innland Costa Blanca <span className="font-semibold">- Hytte & Villaer</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed">
                Moderne boliger i det autentiske spanske innlandet. Friske luft, stillehet, tradisjonell kultur. Fra €200k.
              </p>
            </div>
          </div>
        </section>

        {/* Price Comparison */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Pris: <span className="font-semibold">Norsk Hytte vs Spansk Innland</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-50 rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Norsk Hytte (Buskerud/Telemark)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">100m², grunnlag</span>
                    <span className="font-bold text-primary-900">€200-300k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">150m², moderne</span>
                    <span className="font-bold text-primary-900">€400-500k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-warm-200">
                    <span className="text-warm-600">Brukes</span>
                    <span className="font-bold text-primary-900">4-5 mnd/år</span>
                  </div>
                  <p className="text-warm-600 text-sm pt-4">
                    Kald og snø halve året. Omfattende vedlikehold og varmeregninger.
                  </p>
                </div>
              </div>

              <div className="bg-accent-50 rounded-sm p-8 border border-accent-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Spansk Innland (Algorfa, Rojales)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-accent-200">
                    <span className="text-warm-600">120m², moderne</span>
                    <span className="font-bold text-accent-600">€200-250k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-accent-200">
                    <span className="text-warm-600">180m², villa</span>
                    <span className="font-bold text-accent-600">€350-450k</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-accent-200">
                    <span className="text-warm-600">Brukes</span>
                    <span className="font-bold text-accent-600">Hele året</span>
                  </div>
                  <p className="text-warm-600 text-sm pt-4">
                    300+ soldager. Lav vedlikehold. Kan leies ut for inntekt.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-900 rounded-sm p-8 text-center text-white">
              <p className="text-lg mb-2">
                <span className="font-semibold">Samme pris</span> — men brukt året rundt
              </p>
              <p className="text-warm-300">
                For prisen på en kald, snøig norsk hytte kan du få en moderne villa med sol året rundt i Spania.
              </p>
            </div>
          </div>
        </section>

        {/* Inland Lifestyle */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Innlandets <span className="font-semibold">Livsstil & Fordeler</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Autentisk Spania</h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Tradisjonell kultur</strong> — Lokale fester, tradisjonell mat, spansk språk naturlig</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Etablert gemenskap</strong> — Norske familier etablert i områder som Algoritma og Rojales</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Fredfull miljø</strong> — Mindre turisme, grønnere landskap, stillehet</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Praktiske Fordeler</h3>
                <ul className="space-y-3 text-warm-700">
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Billigste området</strong> — Priser fra €200k for moderne boliger</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Laveste driftskostnader</strong> — Flest sol betyr lave stromregninger</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent-500 font-bold">✓</span>
                    <span><strong>Leiepotensial</strong> — Uthyring til turister eller langtidsleie</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Inland Towns */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">
              Populære <span className="font-semibold">Innlandsbyer</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Algorfa</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">€200k-400k</p>
                <p className="text-warm-600 text-sm">Norsksentrum med norsk skole. Moderne bygninger, fredelig, 20 min til strand.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Rojales</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">€180k-350k</p>
                <p className="text-warm-600 text-sm">Etablert by med butikker, kafeer. Moderne villaer. Tilgjengelig fra stranden.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Ciudad Quesada</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">€200k-450k</p>
                <p className="text-warm-600 text-sm">Planlagt by med golf, butikker. Moderne bygninger. Rolig og organisert.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Jalon</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">€250k-500k</p>
                <p className="text-warm-600 text-sm">Vestlandskult i høyere terreng. Små, autentisk. For de som søker fred.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Benijofar</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">€180k-320k</p>
                <p className="text-warm-600 text-sm">Små by med moderne boligprosjekter. Billigste området. Veldig fredelig.</p>
              </div>

              <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                <h3 className="font-semibold text-primary-900 mb-2">Pedreguer</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">€220k-400k</p>
                <p className="text-warm-600 text-sm">Autentisk spansk flair. Moderne villaer. Kort til både strand og fjell.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Finn Din <span className="font-semibold">Innlandsvilla</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Søker du autentisitet, ro og verdi? Innlandet er perfekt for deg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/no/properties?region=inland"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Se Innlandsvillaer
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

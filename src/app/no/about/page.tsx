import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Om Oss | New Build Homes Costa Blanca',
  description: 'Lær om vårt team av eksperter som hjelper norske kjøpere med å finne drømmeboligen på Costa Blanca siden 2009.',
  openGraph: {
    title: 'Om Oss | New Build Homes Costa Blanca',
    description: 'Ekspertteam som hjelper norske kjøpere med nybyggen på Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/about',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/about',
    languages: {
      en: 'https://newbuildhomescostablanca.com/about',
      no: 'https://newbuildhomescostablanca.com/no/about',
    },
  },
};

export default function NOAboutPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Om Oss', url: 'https://newbuildhomescostablanca.com/no/about/' },
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
              <span className="text-white">Om Oss</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Om <span className="font-semibold">New Build Homes Costa Blanca</span>
              </h1>
              <p className="text-warm-300 text-lg leading-relaxed">
                Vi er ditt tillitelige partner for å kjøpe nybyggen på Costa Blanca. Med 15+ års erfaring og tusenvis av tilfredse norske kjøpere, vet vi nøyaktig hvordan vi hjelper deg.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-light text-primary-900 mb-4">Vår Misjon</h2>
                <p className="text-warm-600 leading-relaxed mb-4">
                  Vi gjør det enkelt, trygt og gjennomsiktig for norske kjøpere å finne og kjøpe drømmeboligen på Costa Blanca. Uten komplisert prosess. Uten skjulte gebyrer. Bare eksperthjælp på norsk.
                </p>
                <p className="text-warm-600 leading-relaxed">
                  Siden 2009 har vi hjelpt tusenvis av nordmenn med å realisere sin drøm om sol og middelhavslivsstil. Vi er her for deg i hver fase av prosessen.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-light text-primary-900 mb-4">Våre Verdier</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-accent-500 font-bold text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-primary-900">Transparens</h3>
                      <p className="text-warm-600 text-sm">Full åpenhet om priser, prosesser og risiko.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent-500 font-bold text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-primary-900">Norsk Service</h3>
                      <p className="text-warm-600 text-sm">Hele prosessen på norsk med mennesker som forstår deg.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent-500 font-bold text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-primary-900">Lokal Ekspertise</h3>
                      <p className="text-warm-600 text-sm">15+ år erfaring med hver stedlig marked og utgiver.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent-500 font-bold text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-primary-900">Kundeorientert</h3>
                      <p className="text-warm-600 text-sm">Vi fokuserer på hva som er best for deg, ikke provisjoner.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-primary-900 mb-4">Hvorfor Velge Oss</h2>
              <p className="text-warm-600">15 år erfaring gjør en forskel</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">Norsktalende Team</h3>
                <p className="text-warm-600">
                  Alle våre rådgivere snakker flytende norsk. Ikke dårlig engelsk eller oversettelse — direkte norsk kommunikasjon.
                </p>
              </div>

              <div className="bg-white rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">Markedslokal Kunnskap</h3>
                <p className="text-warm-600">
                  Vi kjenner verdiene, trendene, utbyggerne og områdene bedre enn noen. Lokalkunnskap som betyr alt.
                </p>
              </div>

              <div className="bg-white rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">500+ Nybygde</h3>
                <p className="text-warm-600">
                  Mer enn 500 nybyggede boliger i hele Costa Blanca. Fra Torrevieja til Jávea, vi har det du ser etter.
                </p>
              </div>

              <div className="bg-white rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">Juridisk Støtte</h3>
                <p className="text-warm-600">
                  Vi samarbeider med erfarne jurister som forsvarer norske kjøperes rettigheter gjennom hele prosessen.
                </p>
              </div>

              <div className="bg-white rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">Gratis Rådgivning</h3>
                <p className="text-warm-600">
                  Første konsultasjon og veiledning er helt gratis. Vi forteller deg hva du trenger å vite — intet skjult.
                </p>
              </div>

              <div className="bg-white rounded-sm p-8 border border-warm-200">
                <h3 className="text-xl font-semibold text-primary-900 mb-3">Norges Miljø Forståelse</h3>
                <p className="text-warm-600">
                  Vi forstår norsk økonomi, norske skatter og norske bankgebyrer. Vi taler ditt språk — også finansielt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* By The Numbers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-light text-primary-900 mb-12 text-center">By The Numbers</h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent-500 mb-2">15+</div>
                <p className="text-warm-600">År Erfaring</p>
                <p className="text-sm text-warm-500 mt-1">Siden 2009</p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-accent-500 mb-2">3000+</div>
                <p className="text-warm-600">Norske Kjøpere</p>
                <p className="text-sm text-warm-500 mt-1">Tilfredse kunder</p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-accent-500 mb-2">500+</div>
                <p className="text-warm-600">Nybygge Boliger</p>
                <p className="text-sm text-warm-500 mt-1">I hele Costa Blanca</p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-accent-500 mb-2">4.9★</div>
                <p className="text-warm-600">Google Rating</p>
                <p className="text-sm text-warm-500 mt-1">127 anmeldelser</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Klar til å <span className="font-semibold">få i gang?</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Kontakt oss i dag for gratis konsultasjon om din drømmebolig på Costa Blanca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/no/contact"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                Kontakt Oss
              </Link>
              <a
                href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

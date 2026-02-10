import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllDevelopments, Development } from '@/lib/development-service';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Boligprosjekter Costa Blanca | Nybyggutbyggere',
  description: 'Se alle våre nybyggprosjekter og utbyggere på Costa Blanca. Finner din drømmebolig fra ledende spanske utbyggere.',
  openGraph: {
    title: 'Boligprosjekter Costa Blanca | Nybyggutbyggere',
    description: 'Utforsk nybyggprosjekter fra de beste utbyggerne på Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/developments',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/developments',
    languages: {
      en: 'https://newbuildhomescostablanca.com/developments',
      no: 'https://newbuildhomescostablanca.com/no/developments',
    },
  },
};

export default async function NODevelopmentsPage() {
  const developments = await getAllDevelopments();

  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Prosjekter', url: 'https://newbuildhomescostablanca.com/no/developments/' },
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
              <span className="text-white">Prosjekter</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Utbyggere
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
                Boligprosjekter <span className="font-semibold">- Utbyggere</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed">
                Utforsk {developments.length}+ boligprosjekter fra de beste utbyggerne på Costa Blanca.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developments.map((dev) => (
                <Link
                  key={dev.slug}
                  href={`/no/developments/${dev.slug}`}
                  className="group bg-white rounded-sm overflow-hidden hover:shadow-xl transition-all border border-warm-100"
                >
                  <div className="relative h-48 overflow-hidden bg-warm-200">
                    {dev.mainImage && (
                      <Image
                        src={dev.mainImage}
                        alt={dev.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent-600 font-medium">{dev.town}</span>
                    <h3 className="text-primary-900 font-semibold mt-1 group-hover:text-accent-600 transition-colors">
                      {dev.name}
                    </h3>
                    <p className="text-warm-600 text-sm mt-2 line-clamp-2">{dev.description}</p>
                    <div className="mt-4 pt-3 border-t border-warm-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-accent-600 font-medium">
                          {String(dev.totalUnits || '0')} boliger
                        </span>
                        <span className="text-warm-400 group-hover:text-accent-600 transition-colors">
                          Se prosjekt →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {developments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-warm-600">Ingen prosjekter funnet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Trenger Du <span className="font-semibold">Eksperthjælp?</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Vi hjelper deg å finne det rette prosjektet og den rette boligen for deg.
            </p>
            <Link
              href="/no/contact"
              className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
            >
              Kontakt Oss
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

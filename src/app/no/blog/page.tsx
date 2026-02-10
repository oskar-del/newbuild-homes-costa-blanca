import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Blog | New Build Homes Costa Blanca',
  description: 'Les artikler om å kjøpe eiendom på Costa Blanca, tips for nordmenn, markedstrends og livsstil i Spania.',
  openGraph: {
    title: 'Blog | New Build Homes Costa Blanca',
    description: 'Alt du trenger å vite om å kjøpe eiendom på Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/blog',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/blog',
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
    title: 'Hvordan får du NIE-nummer? Komplett guide for nordmenn',
    excerpt: 'Et NIE-nummer (Número de Identidad de Extranjero) er nødvendig for å kjøpe eiendom i Spania. Her er det komplette prosessen.',
    date: 'Januar 2025',
    category: 'Juridisk',
    readTime: '5 min',
  },
  {
    title: 'Kostnader ved boligkjøp: Alle gebyrene du må vite om',
    excerpt: 'Kjøp av bolig i Spania koster mer enn bare kjøpesummen. Vi bryter ned alle kostnadene.',
    date: 'Januar 2025',
    category: 'Økonomi',
    readTime: '6 min',
  },
  {
    title: 'Boliglån fra norske banker — Hva betyr det?',
    excerpt: 'DNB, Nordea og SpareBank 1 tilbyr lån for spansk eiendom. Slik fungerer det.',
    date: 'Desember 2024',
    category: 'Finansiering',
    readTime: '7 min',
  },
  {
    title: 'Alfaz del Pi — Norske bygden på Costa Blanca',
    excerpt: 'Over 30% av befolkningen i Alfaz del Pi er norske. Lær om norsksenteret, skolen og samfunnet.',
    date: 'Desember 2024',
    category: 'Samfunn',
    readTime: '5 min',
  },
  {
    title: 'Costa Blanca Nord vs Sør — Hva er forskjellen?',
    excerpt: 'Søk eller nord? En detaljert sammenligning av prisene, kulturen og livsstilen i hver region.',
    date: 'Desember 2024',
    category: 'Områder',
    readTime: '8 min',
  },
  {
    title: 'Formuesskatt på utenlandsk eiendom — Norske skatter forklart',
    excerpt: 'Som norsk eier av spansk bolig skal du rapportere eiendommen til skatteetaten og betale formuesskatt.',
    date: 'November 2024',
    category: 'Skatt',
    readTime: '6 min',
  },
];

export default function NOBlogPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Blog', url: 'https://newbuildhomescostablanca.com/no/blog/' },
  ]);

  const categoryColors: Record<string, string> = {
    'Juridisk': 'bg-blue-100 text-blue-700',
    'Økonomi': 'bg-green-100 text-green-700',
    'Finansiering': 'bg-purple-100 text-purple-700',
    'Samfunn': 'bg-pink-100 text-pink-700',
    'Områder': 'bg-orange-100 text-orange-700',
    'Skatt': 'bg-red-100 text-red-700',
  };

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
              <span className="text-white">Blog</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                Blog: Tips & Innsikt
              </h1>
              <p className="text-warm-300 text-lg leading-relaxed">
                Lær om å kjøpe eiendom på Costa Blanca, tips for nordmenn, juridisk veiledning og markedstrender.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-sm border border-warm-200 overflow-hidden hover:shadow-lg transition-all">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <span className="text-warm-500 text-xs">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-primary-900 mb-3 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-warm-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-warm-100">
                      <span className="text-warm-500 text-xs">{post.date}</span>
                      <Link href="#" className="text-accent-600 hover:text-accent-700 font-semibold text-sm">
                        Les Mer →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
              Få Tips I Din <span className="font-semibold">Innboks</span>
            </h2>
            <p className="text-warm-300 mb-8">
              Abonnér på nyhetsbrevet vårt for tips om eiendomskjøp, markjedstrender og nyheter fra Costa Blanca.
            </p>
            <form className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Din e-post"
                className="flex-1 px-4 py-3 rounded-sm text-primary-900"
                required
              />
              <button
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-all"
              >
                Abonnér
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-primary-900 mb-4">
              Trenger Du <span className="font-semibold">Eksperthjælp?</span>
            </h2>
            <p className="text-warm-600 mb-8">
              Har du spørsmål om å kjøpe eiendom på Costa Blanca? Kontakt oss for gratis rådgivning.
            </p>
            <Link
              href="/no/contact"
              className="bg-primary-900 hover:bg-primary-800 text-white font-medium px-8 py-3 rounded-sm transition-all inline-flex items-center justify-center gap-2"
            >
              Kontakt Oss
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

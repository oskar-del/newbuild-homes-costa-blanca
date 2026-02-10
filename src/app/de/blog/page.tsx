import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Costa Blanca Blog | Tipps & Leitfäden für Käufer',
  description: 'Lesen Sie die neuesten Tipps und Leitfäden für den Hauskauf an der Costa Blanca. Expertenrat für deutsche Käufer.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/blog',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/blog',
      'sv': 'https://newbuildhomescostablanca.com/sv/blog',
      'nl': 'https://newbuildhomescostablanca.com/nl/blog',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/blog',
      'fr': 'https://newbuildhomescostablanca.com/fr/blog',
      'no': 'https://newbuildhomescostablanca.com/no/blog',
      'de': 'https://newbuildhomescostablanca.com/de/blog',
      'pl': 'https://newbuildhomescostablanca.com/pl/blog',
      'ru': 'https://newbuildhomescostablanca.com/ru/blog',
      'x-default': 'https://newbuildhomescostablanca.com/blog',
    },
  },
};

const blogPosts = [
  {
    title: 'Steuern beim Immobilienkauf in Spanien - Alles was Sie wissen müssen',
    excerpt: 'Ein Leitfaden durch die spanischen Steuern für deutsche Käufer. Verstehen Sie AJD, Grunderwerbsteuer und jährliche Steuerverpflichtungen.',
    category: 'Steuern',
    date: '15. Januar 2024',
  },
  {
    title: 'Costa Blanca Nord vs. Süd - Welche Region passt zu Ihnen?',
    excerpt: 'Vergleichen Sie die besten Aspekte der Nord- und Südküste. Klima, Preise, Lebensstil und Gemeinschaften erklärt.',
    category: 'Regionen',
    date: '10. Januar 2024',
  },
  {
    title: 'Hypotheken für Ausländer in Spanien - Schritt für Schritt',
    excerpt: 'Wie deutsche Käufer in Spanien eine Hypothek bekommen. Anforderungen, Dokumente und Top-Banken erklärt.',
    category: 'Finanzen',
    date: '5. Januar 2024',
  },
  {
    title: 'NIE-Nummer für Ausländer in Spanien beantragen',
    excerpt: 'Der vollständige Leitfaden zur Beantragung Ihrer NIE-Nummer - Ihre Steuernummer in Spanien. Erforderliche Dokumente und Schritte.',
    category: 'Rechtlich',
    date: '28. Dezember 2023',
  },
  {
    title: 'Schlüsselfertig vs. Planverkauf - Was Sie kaufen sollten',
    excerpt: 'Verstehen Sie die Unterschiede zwischen schlüsselfertigen Häusern und Off-Plan-Käufen. Vorteile, Risiken und was für Sie passt.',
    category: 'Kaufberatung',
    date: '20. Dezember 2023',
  },
  {
    title: 'Die besten Golfgemeinschaften an der Costa Blanca',
    excerpt: 'Entdecken Sie die Top-Golfplätze und Gemeinschaften an der Costa Blanca. Villamartin, La Finca, Las Colinas und mehr.',
    category: 'Golf',
    date: '15. Dezember 2023',
  },
];

export default function BlogPage() {
  const categories = [...new Set(blogPosts.map(p => p.category))];

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Costa Blanca <span className="font-semibold">Blog</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Expertenrat und Tipps für deutsche Käufer. Erfahren Sie alles über den Hauskauf an der Costa Blanca.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-light text-primary-900 mb-6">Kategorien</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-block bg-warm-100 text-primary-900 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-warm-50 rounded-sm p-6 border border-warm-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block bg-accent-100 text-accent-700 text-xs font-bold px-2.5 py-1 rounded-sm">
                    {post.category}
                  </span>
                  <span className="text-xs text-warm-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-light text-primary-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-warm-700 text-sm mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium text-sm cursor-pointer">
                  Weiterlesen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Haben Sie eine <span className="font-semibold">Frage?</span>
          </h2>
          <p className="text-warm-300 mb-8">Unser Team ist bereit, Ihre Fragen zu beantworten und Sie zu unterstützen.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
          >
            Jetzt Kontaktieren
          </Link>
        </div>
      </section>
    </main>
  );
}

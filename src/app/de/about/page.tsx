import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Uber Uns | Neubau Costa Blanca',
  description: 'Mehr als 15 Jahre Erfahrung mit deutschen Käufern an der Costa Blanca. Experten in Neubauten, Steuern und Finanzierung.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/de/about',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/about',
      'sv': 'https://newbuildhomescostablanca.com/sv/about',
      'nl': 'https://newbuildhomescostablanca.com/nl/about',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/about',
      'fr': 'https://newbuildhomescostablanca.com/fr/about',
      'no': 'https://newbuildhomescostablanca.com/no/about',
      'de': 'https://newbuildhomescostablanca.com/de/about',
      'pl': 'https://newbuildhomescostablanca.com/pl/about',
      'ru': 'https://newbuildhomescostablanca.com/ru/about',
      'x-default': 'https://newbuildhomescostablanca.com/about',
    },
  },
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Michael Schmidt',
      role: 'Geschäftsführer',
      expertise: 'Finanzierungen, Deutsche Steuern',
    },
    {
      name: 'Sandra Klein',
      role: 'Kundenbetreuer',
      expertise: 'Immobilienkauf, Besichtigungen',
    },
    {
      name: 'Carlos Ruiz',
      role: 'Immobilienanwalt',
      expertise: 'Rechtliche Beratung, Verträge',
    },
  ];

  const achievements = [
    { number: '127', label: 'Google Bewertungen', rating: '4.9/5' },
    { number: '500+', label: 'Immobilien', description: 'In unserem Portfolio' },
    { number: '15+', label: 'Jahre Erfahrung', description: 'Mit deutschen Käufern' },
  ];

  return (
    <main className="min-h-screen bg-warm-50">
      <section className="bg-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Uber Uns | <span className="font-semibold">Neubau Costa Blanca</span>
          </h1>
          <p className="text-warm-300 text-lg max-w-2xl mx-auto">
            Ihre vertrauenswürdigen Partner beim Hauskauf an der Costa Blanca. Mehr als 15 Jahre Erfahrung mit deutschen Käufern.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light text-primary-900 mb-6">
                Unsere <span className="font-semibold">Geschichte</span>
              </h2>
              <div className="space-y-4 text-warm-700">
                <p>
                  Neubau Costa Blanca wurde 2009 gegründet, um deutschen Käufern bei der Suche nach ihrem Traumhaus an der Costa Blanca zu helfen. Seitdem haben wir Hunderte glücklicher Kunden begleitet.
                </p>
                <p>
                  Wir verstehen die einzigartigen Bedürfnisse deutscher Käufer: Sprachbarrieren, Steuerfragen, Hypotheken und rechtliche Komplexität. Unser Team spricht Deutsch, Englisch und Spanisch.
                </p>
                <p>
                  Heute sind wir stolz darauf, dass 90% unserer Kunden uns Freunden und Familie empfehlen. Ihre Zufriedenheit ist unsere Leidenschaft.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-sm h-96 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-5xl font-light mb-2">15+</div>
                <p className="text-accent-100">Jahre Erfahrung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">Unsere Erfolge</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="bg-white rounded-sm p-8 border border-warm-200 text-center">
                <div className="text-4xl font-bold text-primary-900 mb-2">{achievement.number}</div>
                <p className="text-primary-900 font-semibold mb-2">{achievement.label}</p>
                {achievement.rating && <p className="text-accent-600 text-sm">{achievement.rating}</p>}
                {achievement.description && <p className="text-warm-600 text-sm">{achievement.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-warm-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-primary-900 mb-10 text-center">Unser Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-warm-50 rounded-sm p-6 border border-warm-200 text-center">
                <h3 className="text-xl font-semibold text-primary-900">{member.name}</h3>
                <p className="text-accent-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-warm-700 text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-white text-center mb-10">
            Warum mit uns <span className="font-semibold">kaufen?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-warm-300">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-accent-400 font-bold text-lg">1.</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Deutsche Sprachexperten</h4>
                  <p className="text-sm">Keine Sprachbarrieren. Wir verstehen deutsche Käufer.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-accent-400 font-bold text-lg">2.</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Steuerberater an Bord</h4>
                  <p className="text-sm">Vollständige Anleitung zu deutschen Steuerverpflichtungen.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-accent-400 font-bold text-lg">3.</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Hypotheken-Hilfe</h4>
                  <p className="text-sm">Unterstützung bei deutschen und spanischen Banken.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-accent-400 font-bold text-lg">4.</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Vollständige Unterstützung</h4>
                  <p className="text-sm">Von der Besichtigung bis zum Umzug - wir helfen Ihnen.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-accent-400 font-bold text-lg">5.</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Große Auswahl</h4>
                  <p className="text-sm">500+ Neubauten in unserem Portfolio.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-accent-400 font-bold text-lg">6.</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Vertrauenswürdig</h4>
                  <p className="text-sm">4.9 Sterne auf Google von 127 echten Bewertungen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-accent-50 rounded-sm p-8 border border-accent-200">
            <h3 className="text-2xl font-light text-primary-900 mb-4">
              Unser <span className="font-semibold">Versprechen</span>
            </h3>
            <p className="text-warm-700 mb-4">
              Wir verpflichten uns, Ihnen bei jedem Schritt des Hauskaufes ehrlich und professionell zu unterstützen. Ihr Erfolg ist unser Erfolg.
            </p>
            <ul className="space-y-2 text-warm-700">
              <li className="flex gap-2">
                <span className="text-accent-600">✓</span>
                Vollständige Transparenz in allen Transaktionen
              </li>
              <li className="flex gap-2">
                <span className="text-accent-600">✓</span>
                Keine versteckten Gebühren oder Provisionen
              </li>
              <li className="flex gap-2">
                <span className="text-accent-600">✓</span>
                Verfügbar 24/7 für Ihre Fragen
              </li>
              <li className="flex gap-2">
                <span className="text-accent-600">✓</span>
                Expertiser in deutschen Steuern und Finanzierung
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white mb-4">
            Bereit für Ihren <span className="font-semibold">neuen Start?</span>
          </h2>
          <p className="text-warm-300 mb-8">Lassen Sie uns Ihnen helfen, Ihr Traumhaus an der Costa Blanca zu finden.</p>
          <Link
            href="/de/contact"
            className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-all inline-block"
          >
            Kontakt Aufnehmen
          </Link>
        </div>
      </section>
    </main>
  );
}

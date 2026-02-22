import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacybeleid | New Build Homes Costa Blanca',
  description: 'Privacybeleid van New Build Homes Costa Blanca. Meer informatie over hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/privacy',
  },
};

export default function PrivacyPageNlBe() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be/' },
    { name: 'Privacybeleid', url: 'https://newbuildhomescostablanca.com/nl-be/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/nl-be/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Privacybeleid</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Privacybeleid
            </h1>
            <p className="text-warm-300 mt-4">
              Laatst bijgewerkt: februari 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Inleiding</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;wij,&quot; &quot;onze,&quot; of &quot;ons&quot;) zijn ervan overtuigd dat het beschermen van uw privacy belangrijk is.
                Dit privacybeleid legt uit hoe we uw informatie verzamelen, gebruiken, bekendmaken en beschermen wanneer u
                onze website newbuildhomescostablanca.com bezoekt.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Informatie die we verzamelen</h2>

              <h3 className="text-lg font-semibold text-primary-900">Persoonlijke gegevens</h3>
              <p className="text-warm-700">
                Wanneer u onze contactformulieren of aanvraagformulieren invult, kunnen we het volgende verzamelen:
              </p>
              <ul className="text-warm-700">
                <li>Naam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Voorkeur en vereisten voor onroerend goed</li>
                <li>Budgetbereik</li>
                <li>Tijdschema voor aankoop</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Automatisch verzamelde informatie</h3>
              <p className="text-warm-700">
                Wanneer u onze website bezoekt, kunnen we automatisch bepaalde informatie verzamelen, waaronder:
              </p>
              <ul className="text-warm-700">
                <li>IP-adres</li>
                <li>Browsertype en versie</li>
                <li>Bezochte pagina's en tijd doorgebracht</li>
                <li>Verwijzende website</li>
                <li>Apparaatgegevens</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Cookies</h2>
              <p className="text-warm-700">
                We gebruiken cookies en soortgelijke trackingtechnologieën om uw browserervaring te verbeteren.
                U kunt cookie-instellingen beheren via onze cookie-toestemmingsbanner.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Soorten cookies die we gebruiken</h3>
              <ul className="text-warm-700">
                <li><strong>Essentiële cookies:</strong> Nodig voor de juiste werking van de website</li>
                <li><strong>Analytische cookies:</strong> Helpen ons begrijpen hoe bezoekers onze site gebruiken (Google Analytics)</li>
                <li><strong>Marketingcookies:</strong> Gebruikt om bezoekers over websites heen te volgen voor reclamedoeleinden</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Hoe we uw informatie gebruiken</h2>
              <p className="text-warm-700">We gebruiken de verzamelde informatie voor het volgende:</p>
              <ul className="text-warm-700">
                <li>Antwoord geven op uw vragen en verzoeken om onroerend goed</li>
                <li>U informatie sturen over onroerend goed dat aan uw criteria voldoet</li>
                <li>Onze website en diensten verbeteren</li>
                <li>Websitegebruikspatronen analyseren</li>
                <li>Wettelijke verplichtingen nakomen</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Gegevens delen</h2>
              <p className="text-warm-700">
                We kunnen uw informatie delen met:
              </p>
              <ul className="text-warm-700">
                <li>Vastgoedontwikkelaars en bouwers als u interesse toont in specifieke ontwikkelingen</li>
                <li>Onze vertrouwde partners (advocaten, hypotheekadviseurs) wanneer hierom wordt gevraagd</li>
                <li>Dienstverleners die ons helpen onze website te beheren</li>
                <li>Juridische autoriteiten indien wettelijk vereist</li>
              </ul>
              <p className="text-warm-700">
                We zullen uw persoonlijke gegevens nooit aan derden verkopen.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Uw rechten (GDPR)</h2>
              <p className="text-warm-700">
                Onder de Algemene Verordening Gegevensbescherming (GDPR) heeft u het recht om:
              </p>
              <ul className="text-warm-700">
                <li><strong>Toegang:</strong> Vraag een kopie van uw persoonlijke gegevens aan</li>
                <li><strong>Rectificatie:</strong> Vraag correctie van onjuiste gegevens aan</li>
                <li><strong>Wissen:</strong> Vraag verwijdering van uw persoonlijke gegevens aan</li>
                <li><strong>Verwerking beperken:</strong> Vraag beperking aan van hoe we uw gegevens gebruiken</li>
                <li><strong>Gegevensportabiliteit:</strong> Ontvang uw gegevens in een draagbaar formaat</li>
                <li><strong>Bezwaar:</strong> Maak bezwaar tegen verwerking van uw persoonlijke gegevens</li>
                <li><strong>Toestemming intrekken:</strong> Trek toestemming op elk moment in</li>
              </ul>
              <p className="text-warm-700">
                Om een van deze rechten uit te oefenen, neem contact met ons op op{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Gegevensbeveiliging</h2>
              <p className="text-warm-700">
                We implementeren passende technische en organisatorische maatregelen om uw persoonlijke
                gegevens te beschermen tegen ongeautoriseerde toegang, wijziging, bekendmaking of vernietiging. Er
                is echter geen verzendmethode via het Internet die 100% veilig is.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Gegevensbehoud</h2>
              <p className="text-warm-700">
                We bewaren uw persoonlijke gegevens zo lang als nodig is om de doeleinden
                in dit beleid uit te voeren, tenzij een langere bewaartermijn wettelijk vereist is. Aanvraaggegevens
                worden doorgaans 3 jaar na uw laatste interactie met ons bewaard.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Services van derden</h2>
              <p className="text-warm-700">
                Onze website kan services van derden gebruiken, waaronder:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (website-analyses)</li>
                <li>Google Tag Manager (tagbeheer)</li>
                <li>Netlify (websitehosting en formulierverwerking)</li>
                <li>WhatsApp (berichtendienst)</li>
              </ul>
              <p className="text-warm-700">
                Deze services hebben hun eigen privacybeleid dat van toepassing is op het gebruik van uw gegevens.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Privacy van kinderen</h2>
              <p className="text-warm-700">
                Onze website is niet bedoeld voor kinderen onder de 16 jaar. We verzamelen bewust geen persoonlijke
                gegevens van kinderen onder de 16 jaar.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Wijzigingen in dit beleid</h2>
              <p className="text-warm-700">
                We kunnen dit privacybeleid van tijd tot tijd bijwerken. We zullen u op de hoogte stellen van wijzigingen
                door het nieuwe privacybeleid op deze pagina te plaatsen en de datum &quot;Laatst bijgewerkt&quot; bij te werken.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Neem contact met ons op</h2>
              <p className="text-warm-700">
                Als u vragen over dit privacybeleid hebt, neem dan contact met ons op:
              </p>
              <ul className="text-warm-700">
                <li>E-mail: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Telefoon: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Bericht sturen</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

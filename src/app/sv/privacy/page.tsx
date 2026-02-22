import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Integritetspolicy | New Build Homes Costa Blanca',
  description: 'Integritetspolicy för New Build Homes Costa Blanca. Läs hur vi samlar in, använder och skyddar dina personuppgifter.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/privacy',
  },
};

export default function PrivacyPageSv() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hem', url: 'https://newbuildhomescostablanca.com/sv/' },
    { name: 'Integritetspolicy', url: 'https://newbuildhomescostablanca.com/sv/privacy/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-primary-900 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-4">
              <Link href="/sv/" className="hover:text-white transition-colors">Hem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Integritetspolicy</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Integritetspolicy
            </h1>
            <p className="text-warm-300 mt-4">
              Senast uppdaterad: Februari 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 prose prose-warm max-w-none">

              <h2 className="text-2xl font-semibold text-primary-900 mt-0">1. Introduktion</h2>
              <p className="text-warm-700">
                New Build Homes Costa Blanca (&quot;vi,&quot; &quot;vår,&quot; eller &quot;oss&quot;) är engagerade i att skydda din integritet.
                Denna integritetspolicy förklarar hur vi samlar in, använder, avslöjar och skyddar din information när du
                besöker vår webbplats newbuildhomescostablanca.com.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">2. Information vi samlar in</h2>

              <h3 className="text-lg font-semibold text-primary-900">Personuppgifter</h3>
              <p className="text-warm-700">
                När du fyller i våra kontaktformulär eller förfrågningsformulär kan vi samla in:
              </p>
              <ul className="text-warm-700">
                <li>Namn</li>
                <li>E-postadress</li>
                <li>Telefonnummer</li>
                <li>Egenskapspreferenser och krav</li>
                <li>Budgetintervall</li>
                <li>Tidslinje för köp</li>
              </ul>

              <h3 className="text-lg font-semibold text-primary-900">Automatiskt insamlad information</h3>
              <p className="text-warm-700">
                När du besöker vår webbplats kan vi automatiskt samla in viss information inklusive:
              </p>
              <ul className="text-warm-700">
                <li>IP-adress</li>
                <li>Webbläsartyp och version</li>
                <li>Besökta sidor och tid som spenderades</li>
                <li>Hänvisande webbplats</li>
                <li>Enhetsinformation</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">3. Kakor</h2>
              <p className="text-warm-700">
                Vi använder kakor och liknande spårningsteknologier för att förbättra din surfupplevelse.
                Du kan kontrollera kakoinställningar genom vår kaksamtyckesbanner.
              </p>

              <h3 className="text-lg font-semibold text-primary-900">Typer av kakor vi använder</h3>
              <ul className="text-warm-700">
                <li><strong>Väsentliga kakor:</strong> Nödvändiga för att webbplatsen ska fungera korrekt</li>
                <li><strong>Analykakor:</strong> Hjälper oss att förstå hur besökare använder vår webbplats (Google Analytics)</li>
                <li><strong>Marknadsföringskakor:</strong> Används för att spåra besökare över webbplatser för reklamändamål</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">4. Hur vi använder din information</h2>
              <p className="text-warm-700">Vi använder informationen vi samlar in för att:</p>
              <ul className="text-warm-700">
                <li>Svara på dina förfrågningar och egendomsönskningar</li>
                <li>Skicka dig information om fastigheter som motsvarar dina kriterier</li>
                <li>Förbättra vår webbplats och tjänster</li>
                <li>Analysera webbplatskällemönster</li>
                <li>Uppfylla juridiska skyldigheter</li>
              </ul>

              <h2 className="text-2xl font-semibold text-primary-900">5. Datadelning</h2>
              <p className="text-warm-700">
                Vi kan dela din information med:
              </p>
              <ul className="text-warm-700">
                <li>Fastighetsutvecklare och byggare när du visar intresse för specifika utvecklingsprojekt</li>
                <li>Våra betrodda partners (advokater, bolåneadvisörer) när det efterfrågas</li>
                <li>Tjänsteleverantörer som hjälper oss att driva vår webbplats</li>
                <li>Juridiska myndigheter när det krävs enligt lag</li>
              </ul>
              <p className="text-warm-700">
                Vi säljer aldrig dina personuppgifter till tredje parter.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">6. Dina rättigheter (GDPR)</h2>
              <p className="text-warm-700">
                Enligt den allmänna dataskyddsförordningen (GDPR) har du rätt att:
              </p>
              <ul className="text-warm-700">
                <li><strong>Åtkomst:</strong> Begär en kopia av dina personuppgifter</li>
                <li><strong>Rättelse:</strong> Begär korrigering av felaktiga data</li>
                <li><strong>Radering:</strong> Begär radering av dina personuppgifter</li>
                <li><strong>Begränsa behandling:</strong> Begär begränsning av hur vi använder dina data</li>
                <li><strong>Dataportabilitet:</strong> Få dina data i ett portabelt format</li>
                <li><strong>Invända:</strong> Invända mot behandling av dina personuppgifter</li>
                <li><strong>Återkalla samtycke:</strong> Återkalla samtycke när som helst</li>
              </ul>
              <p className="text-warm-700">
                För att utöva någon av dessa rättigheter, kontakta oss på{' '}
                <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">
                  info@newbuildhomescostablanca.com
                </a>
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">7. Datasäkerhet</h2>
              <p className="text-warm-700">
                Vi implementerar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter
                mot obehörig åtkomst, ändring, avslöjande eller förstöring. Dock är ingen metod för överföring över Internet 100% säker.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">8. Datalagring</h2>
              <p className="text-warm-700">
                Vi behåller dina personuppgifter så länge det är nödvändigt för att uppfylla de syften som
                anges i denna policy, såvida inte en längre lagringsperiod krävs enligt lag. Förfrågningsdata lagras vanligtvis
                i 3 år efter din senaste interaktion med oss.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">9. Tjänster från tredje part</h2>
              <p className="text-warm-700">
                Vår webbplats kan använda tjänster från tredje part inklusive:
              </p>
              <ul className="text-warm-700">
                <li>Google Analytics (webbplatsanalytik)</li>
                <li>Google Tag Manager (tagghantering)</li>
                <li>Netlify (webbplatsvärdskap och formulärbearbetning)</li>
                <li>WhatsApp (meddelandetjänst)</li>
              </ul>
              <p className="text-warm-700">
                Dessa tjänster har sina egna integritetspolicyer som styr användningen av din information.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">10. Barnens integritet</h2>
              <p className="text-warm-700">
                Vår webbplats är inte avsedd för barn under 16 år. Vi samlar inte medvetet in personuppgifter
                från barn under 16 år.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">11. Ändringar av denna policy</h2>
              <p className="text-warm-700">
                Vi kan uppdatera denna integritetspolicy från tid till annan. Vi meddelar dig om ändringar
                genom att publicera den nya integritetspolicyn på denna sida och uppdatera &quot;Senast uppdaterad&quot; datum.
              </p>

              <h2 className="text-2xl font-semibold text-primary-900">12. Kontakta oss</h2>
              <p className="text-warm-700">
                Om du har några frågor om denna integritetspolicy, kontakta oss:
              </p>
              <ul className="text-warm-700">
                <li>E-post: <a href="mailto:info@newbuildhomescostablanca.com" className="text-accent-600 hover:underline">info@newbuildhomescostablanca.com</a></li>
                <li>Telefon: <a href="tel:+34634044970" className="text-accent-600 hover:underline">+34 634 044 970</a></li>
                <li>WhatsApp: <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Skicka meddelande</a></li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

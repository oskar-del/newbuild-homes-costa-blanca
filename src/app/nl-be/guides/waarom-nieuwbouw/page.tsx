import { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Waarom Nieuwbouw Kopen in Spanje? | Gids voor Belgen 2026',
  description: 'De voordelen van nieuwbouw versus bestaande bouw in Spanje. Garanties, moderne normen, lagere onderhoudskosten, en fiscale voordelen.',
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/nl-be/guides/waarom-nieuwbouw',
    languages: {
      en: 'https://newbuildhomescostablanca.com/guides/why-new-build',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-be/guides/waarom-nieuwbouw',
    },
  },
};

const faqs = [
  {
    question: 'Is nieuwbouw duurder dan bestaande bouw?',
    answer: 'Niet noodzakelijk. Nieuwbouw in Costa Blanca is often vergelijkbaar geprijsd met gelijkwaardige bestaande bouw. U betaalt meer voor kwaliteit, maar minder voor toekomstige reparaties. Over 10 jaar is nieuwbouw vaak goedkoper.',
  },
  {
    question: 'Hoeveel garantie heb ik op nieuwbouw?',
    answer: 'Standaard 10 jaar garantie op bouwkwaliteit (defecten in structuur). 3 jaar op installaties (elektrisch, sanitair). 1 jaar op resterende zaken. Dit is Spaanse wettelijke verplichting.',
  },
  {
    question: 'Welke moderne normen gelden in Spanje?',
    answer: 'Spaanse nieuwbouw volgt strenge bouwcodes (CTE - Código Técnico de la Edificación). Dit vergelijkt met Belgische EPB-normen. Modern isolatie, energieefficiëntie, veiligheidsnormen.',
  },
  {
    question: 'Hoeveel bespaar ik op onderhoudskosten?',
    answer: 'Veel. Nieuwe woningen hebben moderne systemen die weinig onderhoud nodig hebben. Geen renovaties nodig. Besparing van 3.000-5.000 euro per jaar in eerste 10 jaar vergeleken met bouw van 20-30 jaar oud.',
  },
  {
    question: 'Wat is het risico bij aankoop op ritning (off-plan)?',
    answer: 'Begrensd. In Spanje zijn sterke wetgevingen die bouwer beschermen. Depositoregeling wordt in escrow gehouden. Als bouwer failliet gaat, bent u beschermd. Dit is veel veiliger dan vroeger.',
  },
  {
    question: 'Kan ik de indeling aanpassen voordat het gebouwd wordt?',
    answer: 'Ja, bij veel projecten. U kunt vaak voordat bouw begint, wijzigingen aanvragen. Bijvoorbeeld andere kamer indeling, verschillende finalisering. Dit kost extra, maar is mogelijk.',
  },
  {
    question: 'Hoeveel IVA betaal ik op nieuwbouw?',
    answer: 'Voor primaire woning: 10% IVA. Dit is lager dan resale (6-8% transferbelasting). Voor investering: 21%. Dit maakt nieuwbouw voor primaire woning fiscaal voordelig.',
  },
  {
    question: 'Kan ik nieuwbouw verhuren?',
    answer: 'Ja, zeker. Veel Belgische kopers kopen nieuwbouw als investering. Hogere huurprijs vanwege moderne faciliteiten. Lagere onderhoudskosten = betere winstmarge.',
  },
];

export default function WaarumNieuwbouwPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://newbuildhomescostablanca.com/nl-be' },
    { name: 'Gidsen', url: 'https://newbuildhomescostablanca.com/nl-be/guides' },
    { name: 'Waarom Nieuwbouw', url: 'https://newbuildhomescostablanca.com/nl-be/guides/waarom-nieuwbouw' },
  ]);
  const faqSchemaData = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />
      <main className="min-h-screen bg-warm-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-light mb-6">Waarom Nieuwbouw?</h1>
            <p className="text-xl text-warm-200 mb-4">Voordelen van nieuwbouw in Spanje voor Belgische kopers</p>
            <p className="text-lg text-warm-300">
              Ontdek waarom steeds meer Belgische kopers kiezen voor nieuwbouw in plaats van bestaande bouw.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Core Benefits */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Kernvoordelen van Nieuwbouw</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-accent-500 pl-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">Garantie en Veiligheid</h3>
                  <p className="text-warm-700 mb-3">
                    Nieuwbouw in Spanje wordt geleverd met 10 jaar garantie op constructie. Dit betekent dat als er defecten zijn, de bouwer deze onder dekking van de garantie moet herstellen. Dit is geen keuze - het is Spaanse wettelijke verplichting.
                  </p>
                  <p className="text-warm-700">
                    Voor Belgische kopers is dit voordelig. U bent beschermd tegen verborgen gebreken. Met bestaande bouw van 30 jaar oud, bent u veel kwetsbaarder voor onverwachte problemen.
                  </p>
                </div>

                <div className="border-l-4 border-accent-500 pl-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">Moderne Bouwkwaliteit</h3>
                  <p className="text-warm-700 mb-3">
                    Spaanse nieuwbouw volgt strikte bouwcodes (CTE - Código Técnico de la Edificación). Dit zijn vergelijkbare normen als de Belgische EPB-vereisten. Dit betekent:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4 mb-3">
                    <li>Moderne isolatie en energieefficiëntie</li>
                    <li>Veiligheidsinstallaties die aan normen voldoen</li>
                    <li>Moderne ventilatie- en verwarmingssystemen</li>
                    <li>Waterdichte gevels en rioleringsystemen</li>
                  </ul>
                  <p className="text-warm-700">
                    Dit is een groot verschil vergeleken met veel oudere bouw in Spanje, die niet aan deze normen voldoet.
                  </p>
                </div>

                <div className="border-l-4 border-accent-500 pl-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">Lage Onderhoudskosten</h3>
                  <p className="text-warm-700 mb-3">
                    Een van de grootste voordelen van nieuwbouw: u hoeft jarenlang geen grote reparaties te doen. Vergelijk dit met bestaande bouw:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-warm-50 rounded-sm p-4 border border-warm-200">
                      <p className="font-semibold text-primary-900 mb-2">Nieuwbouw (0-10 jaar):</p>
                      <p className="text-sm text-warm-700">Bijna geen onderhoud nodig. Modern dak, ramen, installaties. Geschat onderhoud: 300-500 euro/jaar.</p>
                    </div>
                    <div className="bg-accent-50 rounded-sm p-4 border border-accent-200">
                      <p className="font-semibold text-primary-900 mb-2">Bestaande bouw (20-40 jaar):</p>
                      <p className="text-sm text-warm-700">Veel reparaties mogelijk. Dak, ramen, installaties kunnen kapot gaan. Onderhoud: 1.500-3.000 euro/jaar.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Benefits */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Financiële Voordelen</h2>

              <div className="space-y-6">
                <div className="bg-accent-50 rounded-sm p-6 border border-accent-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Lagere IVA (10% vs 6-8%)</h3>
                  <p className="text-warm-700 mb-3">
                    Dit is significant. Voor nieuwbouw primaire woning: 10% IVA. Voor bestaande bouw (resale): 6-8% transferbelasting. Op papier lijkt bestaande bouw beter, maar dit is het totale verhaal niet.
                  </p>
                  <p className="text-warm-700 text-sm">Voorbeeld: 300.000 euro woning:</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-warm-700">Nieuwbouw IVA: 30.000 (betaald nu)</p>
                    <p className="text-warm-700">Bestaande bouw transfer: 18.000-24.000 (betaald nu)</p>
                    <p className="text-accent-600 font-semibold mt-2">Verschil: 6.000-12.000 meer betaald voor nieuwbouw</p>
                    <p className="text-warm-700 mt-2">Maar: besparing op 10 jaar onderhoud = 7.000-20.000</p>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-sm p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Betere Hypotheekvoorwaarden</h3>
                  <p className="text-warm-700 mb-3">
                    Banken geven vaker betere voorwaarden voor nieuwbouw. Dit omdat:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-warm-700 ml-4">
                    <li>Hogere waarde behouden (bestaande bouw depreciëert sneller)</li>
                    <li>Lagere onderhoudsrisico's</li>
                    <li>Langere economische levensduur van de woning</li>
                  </ul>
                  <p className="text-warm-700 text-sm mt-3">Result: U kunt 80% LTV krijgen vs 70% voor bestaande bouw</p>
                </div>

                <div className="bg-warm-50 rounded-sm p-6 border border-warm-200">
                  <h3 className="font-semibold text-primary-900 mb-3">Hogere Huurwaarde (voor Investerders)</h3>
                  <p className="text-warm-700">
                    Moderne nieuwbouw beheert hogere huurprijzen in Costa Blanca. Toeristen en langetermijn huurders betalen graag extra voor modern comfort, airconditioning, moderne keuken en badkamer.
                  </p>
                  <p className="text-warm-700 text-sm mt-3">Typische huurverschil: 200-400 euro/maand hoger voor nieuwbouw vs bestaande</p>
                </div>
              </div>
            </div>

            {/* Quality & Design */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Kwaliteit en Design</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-warm-200 rounded-sm p-6">
                  <h3 className="font-semibold text-primary-900 mb-4">Moderne Afwerking</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>Open-plan lay-outs (populair in moderne huizen)</li>
                    <li>Moderne kitchenette en badkamers</li>
                    <li>Energiezuinige airconditioning</li>
                    <li>Volledig voorzien van ingebouwde kasten</li>
                    <li>Moderne vloertypen (niet verouderde tegels)</li>
                    <li>Binnencomfort: fris gerenoveerde look</li>
                  </ul>
                </div>

                <div className="border border-accent-200 rounded-sm p-6 bg-accent-50">
                  <h3 className="font-semibold text-primary-900 mb-4">Bestaande Bouw (vaak)</h3>
                  <ul className="space-y-2 text-warm-700 text-sm">
                    <li>Kleine, verdeelde kamers (ouderwets)</li>
                    <li>Verouderde keuken en badkamer</li>
                    <li>Oude airconditioning nodig renovatie</li>
                    <li>Weinig opslagruimte</li>
                    <li>Verouderde vloertypen</li>
                    <li>Vereist renovatie voor modern comfort</li>
                  </ul>
                </div>
              </div>

              <p className="text-warm-700 mt-6">
                Voor Belgische kopers is dit belangrijk. U bent gewend aan modere huizen in België. Nieuwbouw biedt dezelfde moderne comfort.
              </p>
            </div>

            {/* Safety for Off-Plan */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm border-l-4 border-accent-500">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Veiligheid Bij Aankoop Op Ritning</h2>

              <p className="text-warm-700 mb-6">
                Veel Belgische kopers zijn voorzichtig voor aankoop op ritning (off-plan). Dit is begrijpelijk - u betaalt voor iets dat nog niet gebouwd is. Maar de wettelijke bescherming in Spanje is veel beter dan vroeger:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Escrow/Erfgoedrekening</p>
                    <p className="text-warm-700 text-sm">Uw depositoregeling wordt op speciale erfgoedrekening gehouden, niet in zakken van bouwer. Dit betekent dat zelfs als bouwer failliet gaat, uw geld veilig is.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Gedeeltelijke Betalingen</p>
                    <p className="text-warm-700 text-sm">U betaalt in stappen gekoppeld aan bouwfasen. Pas als bepaalde bouwmijlpalen bereikt zijn, betaalt u volgende tranche. Dit geeft u controle.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Wettelijke Garantie</p>
                    <p className="text-warm-700 text-sm">10 jaar constructiegarantie is wettelijk verplicht. Dit kan niet ontzegd worden, ongeacht wat het contract zegt.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-sm bg-accent-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div>
                    <p className="font-semibold text-primary-900 mb-1">Juridische Controle</p>
                    <p className="text-warm-700 text-sm">Uw juridisch vertegenwoordiger controleert het project voordat u tekent. Dit vermindert risico's enorm.</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 rounded-sm p-6 border border-primary-200 mt-6">
                <p className="text-warm-700">
                  <span className="font-semibold">Korte versie:</span> Off-plan aankoop in Spanje is vandaag veel veiliger dan het ooit geweest is. Met moderne escrow systemen en wettelijke bescherming, is het risico beperkt.
                </p>
              </div>
            </div>

            {/* Customization */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-6">Aanpassingen & Personalisatie</h2>

              <p className="text-warm-700 mb-6">
                Bij veel nieuwbouwprojecten kunt u de woning aanpassen voordat bouw begint. Dit geeft u controle over hoe uw eigendom eruit ziet:
              </p>

              <div className="space-y-4">
                <div className="border border-warm-200 rounded-sm p-4">
                  <p className="font-semibold text-primary-900 mb-2">Keuzemodellen Kiezen</p>
                  <p className="text-warm-700 text-sm">Veel projecten bieden verschillende finalisering pakketten. Standaard, premium, luxe. U kiest wat u wilt.</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-4">
                  <p className="font-semibold text-primary-900 mb-2">Kamer Indeling Aanpassen</p>
                  <p className="text-warm-700 text-sm">Soms kunnen kamers samengevoegd of verdeeld worden. Extra slaapkamer ipv werkruimte, bijvoorbeeld.</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-4">
                  <p className="font-semibold text-primary-900 mb-2">Materialen Kiezen</p>
                  <p className="text-warm-700 text-sm">Vloertypen, tegels, verf, ramen - u kiest vaak uit opties. Dit kost extra, maar u krijgt wat u wilt.</p>
                </div>

                <div className="border border-warm-200 rounded-sm p-4">
                  <p className="font-semibold text-primary-900 mb-2">Balkon/Terras Grootte</p>
                  <p className="text-warm-700 text-sm">Soms kunnen buitenruimtes vergroot of verkleind worden voor extra kosten.</p>
                </div>
              </div>

              <p className="text-warm-700 mt-6">
                Dit geeft u vrijheid die u niet krijgt met bestaande bouw. U kunt de woning naar uw wensen vormgeven.
              </p>
            </div>

            {/* FAQs */}
            <div className="mb-12 bg-white rounded-sm p-8 shadow-sm">
              <h2 className="text-3xl font-light text-primary-900 mb-8">Veelgestelde Vragen</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-warm-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-primary-900 mb-3">{faq.question}</h3>
                    <p className="text-warm-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 mb-12">
              <h2 className="text-2xl font-light mb-6">Waarom Kiezen Belgische Kopers voor Nieuwbouw?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-sm p-4">
                  <p className="font-semibold mb-2">Kwaliteit</p>
                  <p className="text-warm-200 text-sm">Moderne bouw met garantie. Geen verassingen.</p>
                </div>
                <div className="bg-white/10 rounded-sm p-4">
                  <p className="font-semibold mb-2">Kosten</p>
                  <p className="text-warm-200 text-sm">Lager onderhoud op lange termijn. Betere financiering.</p>
                </div>
                <div className="bg-white/10 rounded-sm p-4">
                  <p className="font-semibold mb-2">Comfort</p>
                  <p className="text-warm-200 text-sm">Modern design. Wat ze kennen uit België.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white rounded-sm p-8 text-center">
              <h2 className="text-2xl font-light mb-4">Nieuwbouw Projecten Verkennen</h2>
              <p className="text-warm-200 mb-6">
                Onze experts helpen u de perfecte nieuwbouwwoning vinden op Costa Blanca.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/nl-be/contact">
                  <button className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-sm transition-colors">
                    Plan Adviesgesprek
                  </button>
                </Link>
                <a href="https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer">
                  <button className="bg-white hover:bg-warm-100 text-primary-900 font-semibold py-3 px-8 rounded-sm transition-colors">
                    WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Guides */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-warm-200">
          <div className="max-w-4xl mx-auto">
            <Link href="/nl-be/guides" className="text-accent-600 hover:text-accent-700 font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Terug naar Gidsen
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fetchXMLFeed, ParsedProperty } from '@/lib/xml-parser';
import { formatPrice } from '@/lib/unified-property';
import { breadcrumbSchema, toJsonLd, faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Luksusvillaer Costa Blanca | Premium Eiendommer €800k+',
  description: 'Oppdag luksusvillaer og skreddersydde eiendommer i Costa Blanca fra €800.000. Havutsikt, private bassenger og premiumplass i Jávea, Moraira og eksklusive enklaver.',
  openGraph: {
    title: 'Luksusvillaer Costa Blanca | Premium Eiendommer €800k+',
    description: 'Oppdag luksusvillaer og skreddersydde eiendommer. Havutsikt, private bassenger, premiumplass.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/no/luxury',
    siteName: 'New Build Homes Costa Blanca',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/no/luxury',
    languages: {
      'en': 'https://newbuildhomescostablanca.com/luxury',
      'fr': 'https://newbuildhomescostablanca.com/fr/luxury',
      'no': 'https://newbuildhomescostablanca.com/no/luxury',
      'de': 'https://newbuildhomescostablanca.com/de/luxury',
      'pl': 'https://newbuildhomescostablanca.com/pl/luxury',
      'ru': 'https://newbuildhomescostablanca.com/ru/luxury',
      'x-default': 'https://newbuildhomescostablanca.com/luxury',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
};

const featuredMiralbo = [
  { slug: 'villa-atlantis', title: 'Villa Atlantis', town: 'Jávea', zone: 'Cap Martí', price: 1550000, bedrooms: 4, bathrooms: 5, builtArea: 235, plotArea: 1000, image: '/images/developments/atlantis.jpeg', developer: 'Miralbo Urbana' },
  { slug: 'villa-posidonia', title: 'Villa Posidonia', town: 'Jávea', zone: 'Monte Olimpo', price: 1425000, bedrooms: 4, bathrooms: 4, builtArea: 165, plotArea: 1000, image: '/images/developments/posidionia.jpg', developer: 'Miralbo Urbana' },
  { slug: 'villa-mir0159', title: 'Villa MIR0159', town: 'Jávea', zone: 'Montgó', price: 2565000, bedrooms: 4, bathrooms: 5, builtArea: 280, plotArea: 1200, image: '/images/developments/miro159.jpg', developer: 'Miralbo Urbana' },
];

const luxuryAreas = [
  { name: 'Jávea', slug: 'javea', description: 'Historisk havn med sandstrender, marina og Montgó-fjellbakgrunn. Premium villasoner inkluderer Cap Martí og Monte Olimpo.', priceRange: '€800k - €5M+', highlights: ['Arenal sandstrand', 'Michelin-restauranter', '300+ soldager'] },
  { name: 'Moraira', slug: 'moraira', description: 'Eksklusiv enklave med pristine kåkr, yachtclub og internasjonalt samfunn. Roligere enn Jávea med eksepsjonell privatliv.', priceRange: '€1M - €8M+', highlights: ['Private strandkåkr', 'Yachtclub', 'Lav byggetetthet'] },
  { name: 'Altea', slug: 'altea', description: 'Kunstnerlandsby med hvitkalkisert gamle by, kulturscene og spektakulær solnedgangsutsikt. Åser tilbyr fantastisk havutsikt.', priceRange: '€700k - €3M+', highlights: ['Kultursentrum', 'Gamlebybilde', 'Kunstgallerier'] },
  { name: 'Cumbre del Sol', slug: 'cumbre-del-sol', description: 'Klippe-toppgang mellom Jávea og Moraira med dramatisk havutsikt og moderne infrastruktur. Privat kommunityfølelse.', priceRange: '€600k - €2M+', highlights: ['Klippe-topputsikt', 'Gated community', 'Moderne infrastruktur'] },
];

const luxuryFaqs = [
  { question: 'Hvilke områder har de beste luksusvillene i Costa Blanca?', answer: 'De mest prestisjefylte luksusvilleilandene er Jávea (spesielt Cap Martí og Monte Olimpo), Moraira, Altea Hills, Cumbre del Sol og Benissa kysten. Disse områdene tilbyr den beste kombinasjonen av havutsikt, privatliv og infrastrukturkvalitet.' },
  { question: 'Hva er typisk pris for en luksusvilla i Costa Blanca?', answer: 'Luksusvillaer i Costa Blanca starter vanligvis fra €800.000 og kan overstige €5 millioner for eksepsjonelle eiendommer. Skreddersydde nybygninger i premiumplass som Jávea eller Moraira koster vanligvis €1,5M til €3M for 4-5 soverom-villaer med bassenger og havutsikt.' },
  { question: 'Er nye luksusvillaer en god investering i Spania?', answer: 'Ja, Costa Blanca-luksuseiendommer viser konsistent appreciasjon, spesielt i €1M+-segmentet. Nybygninger tilbyr moderne energieffektivitet, lavere vedlikehold og byggegaranti. Utleiegmarkedet for luksusvillaer er sterkt, spesielt i høysesongen sommermåneder.' },
  { question: 'Hvilke skatter gjelder ved kjøp av luksuseiendommer i Spania?', answer: 'For nybygninger gjelder mva (IVA) på 10% pluss stempelavgift på 1,5%. Driftskostnader inkluderer IBI (eiendomsskatt), vanligvis 0,4-1,1% av grunnstedt årlig, og inntektsskatt for ikke-residenter hvis du ikke leier ut.' },
  { question: 'Kan jeg få boliglån for luksuseiendommer som ikke-bosatt?', answer: 'Ja, spanske banker tilbyr boliglån til ikke-residenter vanligvis opptil 60-70% låneverdi for luksuseiendommer. Vi arbeider med Habeno boliglånspesialister som kan ordne konkurransedyktig finansiering for internasjonale kjøpere.' },
  { question: 'Hvor lang tid tar det å kjøpe en eiendom i Spania?', answer: 'Kjøpsprosessen tar vanligvis 6-8 uker fra reservasjonskontrakt til fullføring. For off-plan luksusvillaer varierer byggperiodene 12-24 måneder avhengig av prosjekt.' },
];

export default async function LuxuryPage() {
  const allProperties = await fetchXMLFeed();
  const luxuryProperties = allProperties.filter(p => p.price && p.price >= 800000 && p.images?.[0]).sort((a, b) => (b.price || 0) - (a.price || 0));
  const bespokeProperties = luxuryProperties.filter(p => p.price && p.price >= 2000000);
  const premiumProperties = luxuryProperties.filter(p => p.price && p.price >= 800000 && p.price < 2000000);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Hjem', url: 'https://newbuildhomescostablanca.com/no/' },
    { name: 'Luksus', url: 'https://newbuildhomescostablanca.com/no/luxury/' },
  ]);

  const faqSchemaData = faqSchema(luxuryFaqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchemaData) }} />

      <main className="min-h-screen bg-warm-50">
        <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 z-50 lg:hidden">
          <div className="flex">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="#consultation" className="flex-1 flex items-center justify-center gap-2 bg-accent-500 text-white py-4 font-medium">
              Få Konsultasjon
            </a>
          </div>
        </div>

        <section className="relative bg-primary-900">
          <div className="absolute inset-0">
            <Image src={featuredMiralbo[0].image} alt="Luksus villa i Costa Blanca" fill className="object-cover opacity-40" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/60" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <nav className="text-warm-400 text-sm mb-8">
              <Link href="/no" className="hover:text-white transition-colors">Hjem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Luksuskoleksjon</span>
            </nav>

            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Premium Eiendommer</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                  Luksus<span className="font-semibold">koleksjon</span>
                </h1>

                <p className="text-warm-200 text-lg leading-relaxed mb-8 max-w-2xl">
                  Eksepsjonelle eiendommer fra €800.000. Skreddersydde villaer, havutsikt og premiumplass i Costa Blanca Nord og Sør. Hver eiendom håndplukket for diskriminerte kjøpere.
                </p>

                <div className="flex flex-wrap gap-8 mb-8">
                  <div>
                    <div className="text-3xl font-semibold text-white">{luxuryProperties.length}</div>
                    <div className="text-warm-400 text-sm">Luksuseiendommer</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">€800k</div>
                    <div className="text-warm-400 text-sm">Fra</div>
                  </div>
                  <div>
                    <div className="text-3xl font-semibold text-white">{bespokeProperties.length}</div>
                    <div className="text-warm-400 text-sm">Skreddersydd €2M+</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="#collection" className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2">
                    Se Koleksjon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-1">Privat Konsultasjon</h3>
                  <p className="text-warm-300 text-sm mb-4">Få personaliserte eiendomsanbefalinger</p>
                  <form name="luxury-consultation" method="POST" data-netlify="true" className="space-y-3">
                    <input type="hidden" name="form-name" value="luxury-consultation" />
                    <input type="hidden" name="source" value="luxury-hero" />
                    <input type="text" name="name" required placeholder="Ditt navn" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500" />
                    <input type="email" name="email" required placeholder="E-postadresse" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-accent-500" />
                    <select name="budget" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-accent-500">
                      <option value="800k-1.5m" className="text-primary-900">€800k - €1.5M</option>
                      <option value="1.5m-2.5m" className="text-primary-900">€1.5M - €2.5M</option>
                      <option value="2.5m-5m" className="text-primary-900">€2.5M - €5M</option>
                      <option value="5m+" className="text-primary-900">€5M+</option>
                    </select>
                    <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded transition-colors">
                      Be om Konsultasjon
                    </button>
                  </form>
                  <p className="text-warm-400 text-xs mt-3 text-center">Vi svarer innen 2 timer • Ingen forpliktelse</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="bg-primary-900 py-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Miralbo Urbana</span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">Fremhevede Skreddersydde Villaer</h2>
              <p className="text-warm-400 mt-2 text-sm">Arkitektonisk utmerkelse i Jávcas mest prestisjefylte plasser</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 h-[500px]">
            {featuredMiralbo.slice(0, 2).map((villa) => (
              <Link key={villa.slug} href={`/developments/${villa.slug}`} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${villa.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent group-hover:via-primary-900/50 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary-700/90 text-white text-xs px-2 py-1 rounded-sm">{villa.developer}</span>
                    <span className="bg-accent-500/90 text-white text-xs px-2 py-1 rounded-sm">{villa.zone}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-1 group-hover:text-accent-300 transition-colors">{villa.title}</h3>
                  <p className="text-warm-300 text-sm mb-3">{villa.town}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-white">{formatPrice(villa.price)}</span>
                    <span className="text-warm-300 text-sm">{villa.bedrooms} soverom · {villa.builtArea}m² · {villa.plotArea}m² eiendom</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-accent-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Se Eiendom
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href={`/developments/${featuredMiralbo[2].slug}`} className="group relative block h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${featuredMiralbo[2].image})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/50 to-transparent group-hover:via-primary-900/60 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 md:right-1/2 p-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary-700/90 text-white text-xs px-3 py-1.5 rounded-sm">{featuredMiralbo[2].developer}</span>
                <span className="bg-accent-500/90 text-white text-xs px-3 py-1.5 rounded-sm">{featuredMiralbo[2].zone}</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-sm backdrop-blur-sm">Hav- og Montgó-utsikt</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-accent-300 transition-colors">{featuredMiralbo[2].title}</h3>
              <p className="text-warm-300 text-sm mb-4">{featuredMiralbo[2].town} — Moderne Middelhavsleving</p>
              <div className="flex items-center gap-6 mb-4">
                <span className="text-2xl font-semibold text-white">{formatPrice(featuredMiralbo[2].price)}</span>
                <span className="text-warm-300 text-sm">{featuredMiralbo[2].bedrooms} soverom · {featuredMiralbo[2].bathrooms} bad · {featuredMiralbo[2].builtArea}m²</span>
              </div>
              <div className="flex items-center gap-2 text-accent-400 font-medium group-hover:gap-3 transition-all">
                Oppdag Denne Villa
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </section>

        <section className="py-16 bg-warm-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Premium Plasser</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900 mb-2">Costa Blancas Luksus Hotspots</h2>
              <p className="text-warm-600 max-w-2xl mx-auto">De mest etterspurte stedene for diskriminerte kjøpere som søker eksepsjonelle eiendommer med havutsikt og middelhavsleving.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {luxuryAreas.map((area) => (
                <Link key={area.slug} href={`/areas/${area.slug}`} className="group bg-white rounded-lg p-6 border border-warm-200 hover:border-accent-500 hover:shadow-lg transition-all">
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors mb-2">{area.name}</h3>
                  <p className="text-warm-600 text-sm mb-4 line-clamp-3">{area.description}</p>
                  <div className="mb-4"><span className="text-accent-600 font-medium">{area.priceRange}</span></div>
                  <div className="space-y-1">
                    {area.highlights.map((highlight, i) => (
                      <div key={i} className="text-warm-500 text-xs flex items-center gap-2">
                        <svg className="w-3 h-3 text-success-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-warm-100 flex items-center gap-2 text-accent-600 text-sm font-medium group-hover:gap-3 transition-all">
                    Se {area.name} Guide
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {bespokeProperties.length > 0 && (
          <section className="py-14 md:py-18 bg-white" id="bespoke">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-px bg-primary-700" />
                    <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Skreddersydd Koleksjon</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-primary-900">Ultra Luksus €2M+</h2>
                  <p className="text-warm-600 mt-1 text-sm">{bespokeProperties.length} unike eiendommer for de mest diskriminerte kjøperne</p>
                </div>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-5 py-2.5 rounded-sm transition-colors text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Forespørsel via WhatsApp
                </a>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bespokeProperties.slice(0, 6).map((property) => (
                  <Link key={property.ref} href={`/properties/${property.ref}`} className="group bg-warm-50 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-warm-200">
                    <div className="relative h-64 overflow-hidden">
                      <Image src={property.images?.[0] || '/images/placeholder.jpg'} alt={`${property.bedrooms} soverom ${property.propertyType} i ${property.town}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-primary-900 text-white text-xs px-2 py-1 rounded-sm">Skreddersydd</span>
                        {(property.description || '').toLowerCase().includes('pool') && (
                          <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Basseng</span>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="text-2xl font-semibold text-white">{formatPrice(property.price || 0)}</div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors">
                        {(property as any).aiContent?.title || `${property.bedrooms}-Soverom ${property.propertyType}`}
                      </h3>
                      <p className="text-sm text-warm-500 mb-3">
                        <Link href={`/areas/${property.town.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-accent-600">{property.town}</Link>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-warm-600">
                        <span>{property.bedrooms} soverom</span>
                        <span className="text-warm-300">•</span>
                        <span>{property.bathrooms} bad</span>
                        <span className="text-warm-300">•</span>
                        <span>{property.size}m²</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {bespokeProperties.length > 6 && (
                <div className="text-center mt-8">
                  <Link href="/properties?minPrice=2000000" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group">
                    Se Alle {bespokeProperties.length} Skreddersydde Eiendommer
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="py-14 md:py-18 bg-warm-50" id="collection">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">Premium Koleksjon</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-primary-900">Luksusvillaer €800k – €2M</h2>
                <p className="text-warm-600 mt-1 text-sm">{premiumProperties.length} premium-eiendommer i Costa Blanca</p>
              </div>
              <Link href="/properties?minPrice=800000&maxPrice=2000000" className="inline-flex items-center gap-2 text-primary-900 font-medium hover:text-accent-600 transition-colors group text-sm">
                Se Alle
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {premiumProperties.slice(0, 12).map((property) => (
                <Link key={property.ref} href={`/properties/${property.ref}`} className="group">
                  <div className="relative h-56 overflow-hidden rounded-sm mb-3">
                    <Image src={property.images?.[0] || '/images/placeholder.jpg'} alt={`${property.bedrooms} soverom ${property.propertyType} i ${property.town}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized />
                    <div className="absolute top-3 left-3">
                      {(property.description || '').toLowerCase().includes('pool') && (
                        <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-sm">Basseng</span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-medium text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-1 text-sm">
                    {(property as any).aiContent?.title || `${property.bedrooms}-Soverom ${property.propertyType}`}
                  </h3>
                  <p className="text-sm text-warm-500 mb-1">{property.town}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-primary-900">{formatPrice(property.price || 0)}</span>
                    <span className="text-xs text-warm-400">{property.bedrooms} soverom · {property.size}m²</span>
                  </div>
                </Link>
              ))}
            </div>

            {premiumProperties.length > 12 && (
              <div className="text-center mt-10">
                <Link href="/properties?minPrice=800000&maxPrice=2000000" className="inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-sm transition-colors">
                  Se Alle {premiumProperties.length} Premium Eiendommer
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="py-14 bg-white" id="faqs">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-px bg-primary-700" />
                <span className="text-primary-700 text-xs font-medium tracking-widest uppercase">Vanlige Spørsmål</span>
                <div className="w-10 h-px bg-primary-700" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-primary-900">Luksus Eiendom FAQ</h2>
            </div>

            <div className="space-y-3">
              {luxuryFaqs.map((faq, i) => (
                <details key={i} className="group bg-warm-50 border border-warm-200 rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-primary-900 hover:bg-warm-100 transition-colors">
                    {faq.question}
                    <svg className="w-5 h-5 text-warm-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-warm-700 border-t border-warm-200 pt-4">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-900 py-16 pb-24 lg:pb-16" id="consultation">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">Eksklusiv Service</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">Privat Eiendomskonsultasjon</h2>
                <p className="text-warm-300 leading-relaxed mb-6">
                  Søker etter noe spesifikt? Våre luksuseiendommspesialister kan ordne private visninger, gi tilgang til skjulte annonser og gi personalisert veiledning gjennom ditt kjøp.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">15+ års erfaring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">5 språk talt</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">100% uavhengig</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-success-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-warm-200 text-sm">Skjult markedstilgang</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-sm transition-colors inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-sm transition-colors border border-white/20">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">Be om Konsultasjon</h3>
                <p className="text-warm-500 text-sm mb-5">Vi kontakter deg innen 2 timer</p>
                <form name="luxury-consultation-footer" method="POST" data-netlify="true" className="space-y-4">
                  <input type="hidden" name="form-name" value="luxury-consultation-footer" />
                  <input type="hidden" name="source" value="luxury-footer" />

                  <div>
                    <label htmlFor="name-footer" className="block text-sm font-medium text-primary-900 mb-1">Navn *</label>
                    <input type="text" name="name" id="name-footer" required placeholder="Ditt fulle navn" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <div>
                    <label htmlFor="email-footer" className="block text-sm font-medium text-primary-900 mb-1">E-post *</label>
                    <input type="email" name="email" id="email-footer" required placeholder="din@epost.com" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <div>
                    <label htmlFor="phone-footer" className="block text-sm font-medium text-primary-900 mb-1">Telefon</label>
                    <input type="tel" name="phone" id="phone-footer" placeholder="+44 7XXX XXXXXX" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <div>
                    <label htmlFor="budget-footer" className="block text-sm font-medium text-primary-900 mb-1">Budsjett Område</label>
                    <select name="budget" id="budget-footer" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500 bg-white">
                      <option value="800k-1.5m">€800k - €1.5M</option>
                      <option value="1.5m-2.5m">€1.5M - €2.5M</option>
                      <option value="2.5m-5m">€2.5M - €5M</option>
                      <option value="5m+">€5M+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="areas-footer" className="block text-sm font-medium text-primary-900 mb-1">Foretrukne Områder</label>
                    <input type="text" name="areas" id="areas-footer" placeholder="f.eks. Jávea, Moraira, Altea" className="w-full px-4 py-2.5 border border-warm-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-500" />
                  </div>

                  <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 rounded transition-colors">
                    Be om Konsultasjon
                  </button>

                  <p className="text-xs text-warm-400 text-center">
                    Ved innlevering godtar du vår personvernerklæring.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

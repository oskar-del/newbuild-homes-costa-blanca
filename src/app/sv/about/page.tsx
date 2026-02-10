import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Om Oss | Nya Bostäder Costa Blanca — Vi Talar Svenska',
  description: 'Din partner för nya byggnadsfastigheter i Costa Blanca och Costa Calida. Expertvägledning för svenska, norska och skandinaviska köpare. Över 15 år av erfarenhet. Vi talar svenska!',
  openGraph: {
    title: 'Om Oss | Nya Bostäder Costa Blanca',
    description: 'Din pålitliga partner för nya byggnadsfastigheter i Costa Blanca.',
    type: 'website',
    url: 'https://newbuildhomescostablanca.com/sv/about',
    siteName: 'Nya Bostäder Costa Blanca',
  },
  twitter: {
    card: 'summary',
    title: 'Om Oss | Nya Bostäder Costa Blanca',
    description: '15+ år hjälper skandinaviska köpare hitta sin drömhemmet i Spanien. Kompletta urval av nybyggen.',
  },
  alternates: {
    canonical: 'https://newbuildhomescostablanca.com/sv/about',
    languages: {
      en: 'https://newbuildhomescostablanca.com/about',
      sv: 'https://newbuildhomescostablanca.com/sv/about',
      nl: 'https://newbuildhomescostablanca.com/nl/about',
      'nl-BE': 'https://newbuildhomescostablanca.com/nl-BE/about',
      fr: 'https://newbuildhomescostablanca.com/fr/about',
      no: 'https://newbuildhomescostablanca.com/no/about',
      'x-default': 'https://newbuildhomescostablanca.com/about',
    },
  },
};

const CONTACT = {
  whatsapp: 'https://api.whatsapp.com/message/TISVZ2WXY7ERN1?autoload=1&app_absent=0',
  phone: '+34 634 044 970',
  email: 'info@newbuildhomescostablanca.com',
};

// Team member component
function TeamMember({ name, role, description }: { name: string; role: string; description: string }) {
  return (
    <div className="bg-white rounded-sm border border-warm-200 p-6 hover:shadow-lg transition-shadow">
      <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-primary-900 text-center mb-1">{name}</h3>
      <p className="text-accent-600 text-sm text-center mb-3">{role}</p>
      <p className="text-warm-600 text-sm text-center">{description}</p>
    </div>
  );
}

// Value proposition card
function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-primary-900 mb-2">{title}</h3>
      <p className="text-warm-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function AboutPageSv() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Hem', url: 'https://newbuildhomescostablanca.com/sv/' },
    { name: 'Om Oss', url: 'https://newbuildhomescostablanca.com/sv/about/' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />

      <main className="min-h-screen bg-warm-50">
        {/* Hero Section */}
        <section className="relative bg-primary-900 py-20 md:py-28">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/costa-blanca-aerial.jpg"
              alt="Costa Blanca kustlinje"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 to-primary-900" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="text-warm-400 text-sm mb-6">
              <Link href="/sv" className="hover:text-white transition-colors">Hem</Link>
              <span className="mx-2">›</span>
              <span className="text-white">Om Oss</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">
                  Vilka Vi Är
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
                Din Partner för Att Hitta Det Perfekta <span className="font-semibold">Nybyggda Hemmet</span>
              </h1>

              <p className="text-warm-300 text-lg leading-relaxed mb-8">
                Vi specialiserar oss uteslutande på nya byggnader över Costa Blanca och Costa Calida.
                Vår djupa kunskap om den lokala marknaden, betrodda utvecklarrelationer och engagemang för
                personlig service gör oss till favoritalet för skandinaviska köpare som söker sitt drömhem i soliga Spanien.
              </p>

              {/* Swedish emphasis */}
              <div className="bg-white/10 border border-white/20 rounded-sm p-4 mb-8">
                <p className="text-warm-200 text-sm font-semibold">
                  VI TALAR SVENSKA! • Hundratals skandinaviska familjer har redan hittat sitt drömhem med vår hjälp.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chatta Med Oss
                </a>
                <Link
                  href="/sv/developments"
                  className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-sm font-medium transition-colors"
                >
                  Bläddra Fastigheter
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Vår Historia
                  </span>
                </div>
                <h2 className="text-3xl font-light text-primary-900 mb-6">
                  Tillgång till <span className="font-semibold">Alla Nybyggen</span>
                </h2>
                <div className="space-y-4 text-warm-700 leading-relaxed">
                  <p>
                    Vi tillhandahåller tillgång till den <strong>kompletta urvalet av nya byggnader</strong> över
                    Costa Blanca och Costa Calida. Om det bygger i regionen kan vi visa det för dig.
                  </p>
                  <p>
                    Under 15+ år har vi byggt relationer med varje större developer i regionen.
                    Detta innebär att du ser allt - från exklusiva villprojekt till storskalig resort-utveckling
                    - allt på ett ställe.
                  </p>
                  <p>
                    Men vi är mer än bara fastighetsförmedlare. Vi har samlat ett nätverk av betrodda
                    proffs för att stödja din hela resa: <strong>byggnadsarbetare, arkitekter, inredningsarkitekter,
                    advokater, skatterådgivare och bolånespecs</strong>. Komplettutbudet för att köpa
                    ditt hem i Spanien.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                    alt="Modern ny villa"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl font-bold mb-1">100+</div>
                    <div className="text-warm-200">Betrodda Utvecklare</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white p-6 rounded-sm shadow-xl">
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-sm">År Erfarenhet</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-10 h-px bg-accent-500" />
                <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                  Varför Välja Oss
                </span>
                <div className="w-10 h-px bg-accent-500" />
              </div>
              <h2 className="text-3xl font-light text-primary-900">
                Det Som Gör Oss <span className="font-semibold">Unika</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
                title="Komplett Utbud"
                description="Tillgång till varje nybygge i Costa Blanca och Costa Calida. Om det bygger, kan vi visa det."
              />
              <ValueCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Pålitligt Nätverk"
                description="Byggnadsarbetare, arkitekter, advokater, skatterådgivare - vi har samlat det kompletta team du behöver."
              />
              <ValueCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="Granskade Byggherrar"
                description="Varje byggare vi arbetar med har granskas grundligt för kvalitet och pålitlighet."
              />
              <ValueCard
                icon={
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                title="Helhetslösning"
                description="Från första visning till nyckelöverlämning och därefter - vi är med dig varje steg på vägen."
              />
            </div>

            {/* Swedish-specific highlights */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Svenska Advokater & Skatterådgivare</h3>
                <p className="text-warm-600 text-sm">
                  Vi arbetar med svenska-talande advokater och skatterådgivare som förstår den svenska
                  juridiska situationen och skatteaspekter för expats. De flesta av våra advokater talar flytande svenska.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-sm p-6">
                <h3 className="font-semibold text-primary-900 mb-2">Svenska Bolånealternativ</h3>
                <p className="text-warm-600 text-sm">
                  Vi har relationer med svenska banker som erbjuder bolån för spanska fastigheter,
                  vilket gör processen mycket enklare för svenska köpare.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-16 bg-white border-y border-warm-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-primary-900 mb-4">
                Så Hjälper Vi <span className="font-semibold">Dig</span>
              </h2>
              <p className="text-warm-600 max-w-2xl mx-auto">
                Att köpa en ny byggnation i Spanien är en spännande resa. Här är hur vi gör det smidigt och stressfritt.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center mb-4 font-bold">1</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Bostadssökning</h3>
                <p className="text-warm-600 text-sm">
                  Berätta för oss dina krav och budget. Vi gör en förlista över de bästa nya byggalternativen från vår omfattande portfölj.
                </p>
              </div>

              <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center mb-4 font-bold">2</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Visningar</h3>
                <p className="text-warm-600 text-sm">
                  Vi ordnar och följer med dig på visningar, och ger expertinsikter om varje projekt och område.
                </p>
              </div>

              <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center mb-4 font-bold">3</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Expertråd</h3>
                <p className="text-warm-600 text-sm">
                  Vi hanterar all förhandling och pappersarbete på dina vägnar, med hjälp av vår starka utvecklarrelationer.
                </p>
              </div>

              <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center mb-4 font-bold">4</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Juridiskt Stöd</h3>
                <p className="text-warm-600 text-sm">
                  Vi kopplar dig med betrodda svenska-talande advokater som specialiserar sig på spanska fastighetstransaktioner.
                </p>
              </div>

              <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center mb-4 font-bold">5</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Byggnadsuppdateringar</h3>
                <p className="text-warm-600 text-sm">
                  För off-plan-köp håller vi dig uppdaterad om byggframsteg med regelbundna foton och rapporter.
                </p>
              </div>

              <div className="bg-warm-50 p-6 rounded-sm border border-warm-200">
                <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center mb-4 font-bold">6</div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">Nyckelöverlämning</h3>
                <p className="text-warm-600 text-sm">
                  Vi deltar i slutbesiktning och nyckelöverlämning med dig och säkerställer att allt är perfekt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Area */}
        <section className="py-16 bg-warm-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-px bg-accent-500" />
                  <span className="text-accent-500 text-xs font-medium tracking-widest uppercase">
                    Vårt Område
                  </span>
                </div>
                <h2 className="text-3xl font-light text-primary-900 mb-6">
                  Costa Blanca & <span className="font-semibold">Costa Calida</span>
                </h2>
                <p className="text-warm-700 mb-6 leading-relaxed">
                  Vi täcker hela Costa Blanca från Denia i norr till Torrevieja i söder,
                  plus Costa Calida-regionen omkring Murcia. Detta inkluderar alla populära områden för
                  internationella köpare.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">Costa Blanca Norr</h4>
                    <ul className="text-warm-600 text-sm space-y-1">
                      <li>• Jávea & Moraira</li>
                      <li>• Calpe & Altea</li>
                      <li>• Benidorm & Finestrat</li>
                      <li>• Villajoyosa</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">Costa Blanca Söder</h4>
                    <ul className="text-warm-600 text-sm space-y-1">
                      <li>• Torrevieja</li>
                      <li>• Orihuela Costa</li>
                      <li>• Guardamar</li>
                      <li>• Ciudad Quesada</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">Costa Calida</h4>
                    <ul className="text-warm-600 text-sm space-y-1">
                      <li>• Mar Menor</li>
                      <li>• Los Alcázares</li>
                      <li>• San Pedro del Pinatar</li>
                      <li>• Mazarrón</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-2">Golfresort</h4>
                    <ul className="text-warm-600 text-sm space-y-1">
                      <li>• Las Colinas</li>
                      <li>• Villamartín</li>
                      <li>• La Finca</li>
                      <li>• Vistabella</li>
                    </ul>
                  </div>
                </div>

                {/* Swedish communities note */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-sm">
                  <p className="text-warm-700 text-sm">
                    <span className="font-semibold">Svenska gemenskaper:</span> Vega Baja (söder) och Jalon Valley (norr)
                    har många svenska expats och etablerade svenska gemenskaper.
                  </p>
                </div>
              </div>

              <div className="bg-primary-900 p-8 rounded-sm text-white">
                <h3 className="text-xl font-semibold mb-4">Kontakta Oss</h3>
                <p className="text-warm-300 mb-6">
                  Redo att börja din bostadssökning? Kontakta oss idag för en gratis, icke-bindande konsultation.
                </p>

                <div className="space-y-4">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-accent-400 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span>WhatsApp Oss</span>
                  </a>

                  <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-white hover:text-accent-400 transition-colors">
                    <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span>{CONTACT.phone}</span>
                  </a>

                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white hover:text-accent-400 transition-colors">
                    <div className="w-10 h-10 bg-warm-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>{CONTACT.email}</span>
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-warm-400 text-sm">
                    Öppettider: Måndag - Fredag, 9:00 - 18:00 (CET)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Redo Att Hitta Ditt Drömhem i Spanien?
            </h2>
            <p className="text-warm-300 mb-8 max-w-2xl mx-auto">
              Bläddra genom vår omfattande portfölj av nya byggnader eller kontakta oss för personliga rekommendationer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/sv/developments"
                className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Bläddra Projekt
              </Link>
              <Link
                href="/sv/properties"
                className="bg-white text-primary-900 hover:bg-warm-50 font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Visa Alla Fastigheter
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-8 py-3 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chatta på WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp CTA */}
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group"
          aria-label="Chatta på WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </main>
    </>
  );
}

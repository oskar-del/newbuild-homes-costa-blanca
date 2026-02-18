import Image from 'next/image';
import Link from 'next/link';
import { AreaContent, CONTACT } from '@/lib/area-utils';
import { AreaPageStrings } from '@/lib/area-i18n';
import { LifestyleBanner, ImageGrid } from '@/components/area/SectionImage';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';
import { getVideosForArea } from '@/lib/video-mapping';
import VideoCard from '@/components/VideoCard';
import AreaDevelopments from '@/components/area/AreaDevelopments';
import DayInTheLife from '@/components/area/DayInTheLife';
import {
  beachImages,
  golfImages,
  villaPoolImages,
  marketFoodImages,
  oldTownImages,
  marinaImages,
  getImageUrl,
} from '@/data/stock-images';
import { breadcrumbSchema, toJsonLd, articleSchema, placeSchema } from '@/lib/schema';
import LeadForm from '@/components/LeadForm';
import NewsletterCTA from '@/components/NewsletterCTA';

interface DevelopmentCard {
  name: string;
  slug: string;
  propertyType: string;
  price: number | null;
  bedrooms: number | null;
  image: string;
}

interface AreaPageContentProps {
  data: AreaContent;
  developments: DevelopmentCard[];
  heroImage: string;
  lang: string;
  strings: AreaPageStrings;
  langPrefix: string; // '' for English, '/sv' for Swedish, etc.
}

function t(template: string, name: string): string {
  return template.replace(/\{name\}/g, name);
}

export default function AreaPageContent({
  data,
  developments,
  heroImage,
  lang,
  strings: s,
  langPrefix,
}: AreaPageContentProps) {
  const { content, schema, schemaFAQ, externalLinks, golf } = data;

  // Get related blog articles for this area
  const relatedBlogPosts = getBlogPostsForArea(data.slug, 3);

  // Generate breadcrumb schema
  const baseUrl = 'https://newbuildhomescostablanca.com';
  const breadcrumbs = breadcrumbSchema([
    { name: s.home, url: `${baseUrl}/` },
    { name: s.areas, url: `${baseUrl}${langPrefix}/areas/` },
    { name: data.name, url: `${baseUrl}${langPrefix}/areas/${data.slug}/` },
  ]);

  // Generate article schema for SEO
  const pageArticleSchema = articleSchema({
    headline: content.metaTitle,
    description: content.metaDescription,
    datePublished: new Date().toISOString().split('T')[0],
    author: 'New Build Homes Costa Blanca',
    url: `${baseUrl}${langPrefix}/areas/${data.slug}/`,
    image: data.heroImage,
  });

  // Generate place schema if not in data
  const areaPlaceSchema = schema && Object.keys(schema).length > 0 ? schema : placeSchema({
    name: data.name,
    description: content.heroIntro.slice(0, 200),
    url: `${baseUrl}${langPrefix}/areas/${data.slug}/`,
    image: data.heroImage,
    address: {
      region: data.region || 'Costa Blanca',
    },
    containedIn: 'Costa Blanca, Spain',
  });

  // VideoObject schema for SEO rich snippets
  const areaVideos = getVideosForArea(data.slug, 3);
  const videoSchemaData = areaVideos.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: areaVideos[0].title,
    description: areaVideos[0].description,
    thumbnailUrl: `https://img.youtube.com/vi/${areaVideos[0].youtubeId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString().split('T')[0],
    duration: areaVideos[0].duration ? `PT${areaVideos[0].duration.replace(':', 'M')}S` : undefined,
    contentUrl: `https://www.youtube.com/watch?v=${areaVideos[0].youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${areaVideos[0].youtubeId}`,
    publisher: { '@type': 'Organization', name: 'New Build Homes Costa Blanca', url: 'https://newbuildhomescostablanca.com' },
    about: {
      '@type': 'Place',
      name: data.name,
      address: { '@type': 'PostalAddress', addressLocality: data.name, addressRegion: 'Alicante', addressCountry: 'ES' },
    },
  } : null;

  // Build nav sections based on available data
  const navSections: { id: string; label: string }[] = [
    { id: 'lifestyle', label: s.theLifestyle.replace('{name}', '').trim() || 'Lifestyle' },
  ];
  if (externalLinks?.beaches && externalLinks.beaches.length > 0) navSections.push({ id: 'beaches', label: s.beachesIn.replace('{name}', '').trim() || 'Beaches' });
  if (golf && golf.courses && golf.courses.length > 0) navSections.push({ id: 'golf', label: 'Golf' });
  if (developments && developments.length > 0) navSections.push({ id: 'developments', label: s.newBuildProperties.replace('{name}', '').trim() || 'Properties' });
  if (content.investmentAnalysis) navSections.push({ id: 'investment', label: s.investmentAnalysis || 'Investment' });
  if (content.costOfLiving) navSections.push({ id: 'costs', label: s.costOfLivingIn.replace('{name}', '').trim() || 'Costs' });
  if (content.schools?.schools?.length) navSections.push({ id: 'schools', label: s.schoolsNear.replace('{name}', '').trim() || 'Schools' });
  if (content.events?.events?.length) navSections.push({ id: 'events', label: s.eventsFiestas.replace('{name}', '').trim() || 'Events' });
  if (content.expatCommunity) navSections.push({ id: 'expat', label: s.expatCommunity.replace('{name}', '').trim() || 'Expat Life' });
  if (content.natureActivities?.activities?.length) navSections.push({ id: 'outdoor', label: s.natureActivities || 'Nature' });
  navSections.push({ id: 'faqs', label: s.faqAbout.replace('{name}', '').trim() || 'FAQs' });

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areaPlaceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(pageArticleSchema) }} />
      {schemaFAQ && Object.keys(schemaFAQ).length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      )}
      {videoSchemaData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemaData) }} />}

      <main className="min-h-screen">
        {/* ═══════════════════════════════════════════════════════════════
            HERO SECTION — Full viewport, dramatic overlay
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] flex items-center bg-primary-900">
          <div className="absolute inset-0">
            <Image src={heroImage} alt={data.name} fill className="object-cover opacity-40" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-primary-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <nav className="text-white/60 text-sm mb-8">
              <Link href={`${langPrefix}/`} className="hover:text-white transition-colors">{s.home}</Link>
              <span className="mx-2">&rsaquo;</span>
              <Link href={`${langPrefix}/areas`} className="hover:text-white transition-colors">{s.areas}</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white">{data.name}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                {data.region || 'Costa Blanca'}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
                {t(s.livingIn, '')} <span className="font-semibold">{data.name}</span>
              </h1>

              <p className="text-xl text-warm-300 mb-4 leading-relaxed">
                {content.heroIntro.split('\n\n')[0]?.slice(0, 200) || t(s.completeGuide, data.name)}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-white font-semibold mt-1">{data.propertyCount} {s.newBuilds}</p>
                  <p className="text-white/60 text-sm">{s.from} &euro;{data.priceRange.min.toLocaleString()}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <p className="text-white font-semibold mt-1">{data.region || 'Costa Blanca'}</p>
                  <p className="text-white/60 text-sm">Spain</p>
                </div>
                {golf && golf.courses && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <span className="text-2xl">&#9971;</span>
                    <p className="text-white font-semibold mt-1">{golf.courses.length} {s.golfCoursesNearby}</p>
                  </div>
                )}
                {externalLinks?.airport && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <p className="text-white font-semibold mt-1">{externalLinks.airport.name.split(' ')[0]}</p>
                    <p className="text-white/60 text-sm">{externalLinks.airport.driveTime}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#developments" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                  View Properties
                </a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors backdrop-blur-sm border border-white/20">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            STICKY NAVIGATION
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-warm-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1 overflow-x-auto py-3 text-sm font-medium">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="px-4 py-2 rounded-full hover:bg-accent-100 text-warm-600 hover:text-accent-700 whitespace-nowrap transition-colors"
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            LIFESTYLE OVERVIEW — Full-width, rich layout
        ═══════════════════════════════════════════════════════════════ */}
        <section id="lifestyle" className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">{s.theLifestyle.replace('{name}', '').trim() || 'The Lifestyle'}</span>
                <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                  Why People Choose <span className="font-semibold">{data.name}</span>
                </h2>

                <div className="prose prose-lg text-warm-700 max-w-none">
                  {(content.lifestyleSection?.intro || '').split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {(content.lifestyleSection?.highlights?.length ?? 0) > 0 && (
                  <div className="grid md:grid-cols-2 gap-3 mt-8">
                    {content.lifestyleSection.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-accent-50 rounded-xl">
                        <span className="text-accent-500 text-lg">&check;</span>
                        <span className="text-warm-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-6">
                {/* At a Glance Card */}
                <div className="bg-accent-50 rounded-2xl p-6">
                  <h3 className="font-bold text-primary-900 text-lg mb-4">At a Glance</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-warm-600">{s.region}</span><span className="font-semibold text-primary-900">{data.region || 'Costa Blanca'}</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">{s.newBuilds}</span><span className="font-semibold text-primary-900">{data.propertyCount}</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">{s.priceRange}</span><span className="font-semibold text-accent-600">&euro;{data.priceRange.min.toLocaleString()} - &euro;{data.priceRange.max.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-warm-600">{s.propertyTypes}</span><span className="font-semibold text-primary-900">{data.propertyTypes.slice(0, 3).join(', ')}</span></div>
                    {externalLinks?.airport && (
                      <div className="flex justify-between"><span className="text-warm-600">{s.transport}</span><span className="font-semibold text-primary-900">{externalLinks.airport.driveTime} to airport</span></div>
                    )}
                    {golf && golf.courses && (
                      <div className="flex justify-between"><span className="text-warm-600">{s.golfCourses}</span><span className="font-semibold text-primary-900">{golf.courses.length} {s.nearby}</span></div>
                    )}
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">Free 30-Min Consultation</h3>
                  <p className="text-warm-200 text-sm mb-4">
                    Speak with an experienced agent with 12+ years selling new builds on the Costa Blanca. Get honest advice about {data.name}.
                  </p>
                  <Link
                    href={`${langPrefix}/consultation`}
                    className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded-lg font-semibold transition-colors mb-3"
                  >
                    Book Free Consultation
                  </Link>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-lg font-medium transition-colors"
                  >
                    Or WhatsApp Us
                  </a>
                </div>

                {/* Tourism Link */}
                {externalLinks?.tourism?.url && (
                  <div className="bg-warm-50 rounded-2xl p-6">
                    <a href={externalLinks.tourism.url} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:underline font-medium text-sm">
                      {t(s.officialTourism, data.name)} &rarr;
                    </a>
                  </div>
                )}

                {/* Golf Courses Sidebar */}
                {golf && golf.courses && golf.courses.length > 0 && (
                  <div className="bg-warm-50 rounded-2xl p-6">
                    <h3 className="font-bold text-primary-900 text-lg mb-4">{s.golfCourses} {s.nearby}</h3>
                    <div className="space-y-2">
                      {golf.courses.slice(0, 4).map((course, i) => (
                        <div key={i} className="flex justify-between items-center hover:bg-warm-100 rounded-lg p-2 -mx-2 transition-colors">
                          <span className="text-warm-700">{course.name}</span>
                          <span className="text-warm-500 text-sm">{course.holes}H &bull; {course.distance}</span>
                        </div>
                      ))}
                    </div>
                    <Link href={`${langPrefix}/golf`} className="block text-center text-accent-600 hover:text-accent-700 font-medium text-sm mt-4 pt-3 border-t border-warm-200">
                      View All Golf Courses &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            BEACHES — with cards and Google Maps links
        ═══════════════════════════════════════════════════════════════ */}
        {externalLinks?.beaches && externalLinks.beaches.length > 0 && (
          <section id="beaches" className="scroll-mt-16">
            {/* Beach Image Banner */}
            <div className="relative h-64 md:h-80">
              <Image
                src={getImageUrl(beachImages[0], 1920)}
                alt={beachImages[0].alt}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-900/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <span className="text-accent-400 text-sm font-semibold uppercase tracking-wide">Coast & Sea</span>
                  <h2 className="text-3xl lg:text-4xl font-light text-white mt-2 mb-4">
                    {t(s.beachesIn, data.name)}
                  </h2>
                  <p className="text-warm-300 text-lg max-w-2xl">{content.amenitiesSection.beaches}</p>
                </div>
              </div>
            </div>

            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {externalLinks.beaches.map((beach, i) => (
                    <a key={i} href={beach.googleMaps || beach.url || '#'} target="_blank" rel="noopener noreferrer"
                      className="group bg-warm-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <Image src={getImageUrl(beachImages[i % beachImages.length], 600)} alt={`${beach.name} beach`} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute bottom-3 left-3 text-white font-semibold">{beach.name}</span>
                      </div>
                      <div className="p-4">
                        {beach.description && <p className="text-warm-600 text-sm mb-2">{beach.description}</p>}
                        <span className="text-accent-600 text-sm font-medium">{s.viewOnGoogleMaps} &rarr;</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            GOLF SECTION — Full-width courses
        ═══════════════════════════════════════════════════════════════ */}
        {golf && golf.courses && golf.courses.length > 0 && (
          <section id="golf" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Golf</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.golfNear, data.name)}
              </h2>
              {golf.intro && <p className="text-warm-600 text-lg mb-10 max-w-3xl">{golf.intro}</p>}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {golf.courses.map((course, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative h-40">
                      <Image src={getImageUrl(golfImages[i % golfImages.length], 600)} alt={`${course.name} golf course`} fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-bold text-white text-lg">{course.name}</h3>
                        <p className="text-white/80 text-sm">{course.holes} {s.holes} &bull; {course.distance}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      {course.description && <p className="text-warm-600 text-sm mb-3">{course.description}</p>}
                      <div className="flex gap-2">
                        {course.url && (
                          <a href={course.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {s.website}
                          </a>
                        )}
                        {course.googleMaps && (
                          <a href={course.googleMaps} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {s.directions}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            DEVELOPMENTS — Using rich AreaDevelopments component
        ═══════════════════════════════════════════════════════════════ */}
        {developments && developments.length > 0 && (
          <div id="developments" className="scroll-mt-16">
            <AreaDevelopments
              areaName={data.name}
              areaSlug={data.slug}
              maxDevelopments={6}
              showLifestyleGuide={true}
              relatedBlogPosts={relatedBlogPosts.map(post => ({
                slug: post.slug,
                title: post.title,
                description: post.description,
              }))}
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            AMENITIES — Healthcare, Transport, Shopping
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-warm-50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Essential Amenities</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
              {s.amenitiesServices}
            </h2>
            <p className="text-warm-600 text-lg mb-10 max-w-3xl">
              {t(s.diningMarketsDesc, data.name)}
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Dining Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#127860;</span>
                  <h3 className="font-bold text-primary-900 text-xl">{s.dining}</h3>
                </div>
                <p className="text-warm-600 text-sm">{content.amenitiesSection.dining}</p>
              </div>

              {/* Healthcare Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#127973;</span>
                  <h3 className="font-bold text-primary-900 text-xl">{s.healthcare}</h3>
                </div>
                <p className="text-warm-600 text-sm mb-3">{content.amenitiesSection.healthcare}</p>
                {externalLinks?.healthcare && (
                  <div className="bg-warm-50 rounded-xl p-3">
                    <p className="font-semibold text-primary-900 text-sm">{externalLinks.healthcare.name}</p>
                    <p className="text-warm-500 text-xs mb-2">{externalLinks.healthcare.distance}</p>
                    <a href={externalLinks.healthcare.googleMaps} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-xs font-medium">
                      View on Map &rarr;
                    </a>
                  </div>
                )}
              </div>

              {/* Transport Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">&#9992;&#65039;</span>
                  <h3 className="font-bold text-primary-900 text-xl">{s.transport}</h3>
                </div>
                <p className="text-warm-600 text-sm mb-3">{content.amenitiesSection.transport}</p>
                {externalLinks?.airport && (
                  <div className="bg-warm-50 rounded-xl p-3">
                    <p className="font-semibold text-primary-900 text-sm">{externalLinks.airport.name}</p>
                    <p className="text-warm-500 text-xs mb-2">{externalLinks.airport.distance} ({externalLinks.airport.driveTime})</p>
                    <a href={externalLinks.airport.googleMaps} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 text-xs font-medium">
                      View on Map &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Shopping row */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">&#128717;&#65039;</span>
                <h3 className="font-bold text-primary-900 text-xl">{s.shopping}</h3>
              </div>
              <p className="text-warm-600">{content.amenitiesSection.shopping}</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PROPERTY MARKET
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Property Market</span>
            <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
              {t(s.propertyMarketIn, data.name)}
            </h2>
            <div className="prose prose-lg max-w-none text-warm-700">
              {content.propertyMarketSection.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            INVESTMENT ANALYSIS — Rich card layout
        ═══════════════════════════════════════════════════════════════ */}
        {content.investmentAnalysis && (
          <section id="investment" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Investment</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                {s.investmentAnalysis}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl p-8 text-white">
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">{s.rentalYield}</p>
                  <p className="text-4xl font-bold mb-2">{content.investmentAnalysis.rentalYield}</p>
                  <p className="text-white/80 text-sm">Estimated annual return on rental income</p>
                </div>
                <div className="bg-gradient-to-br from-primary-800 to-primary-900 rounded-2xl p-8 text-white">
                  <p className="text-white/70 text-sm uppercase tracking-wide mb-1">{s.annualAppreciation}</p>
                  <p className="text-4xl font-bold mb-2">{content.investmentAnalysis.annualAppreciation}</p>
                  <p className="text-white/80 text-sm">Property value growth per year</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                <p className="text-warm-700 text-lg leading-relaxed">{content.investmentAnalysis.overview}</p>
              </div>

              {(content.investmentAnalysis?.highlights?.length ?? 0) > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {content.investmentAnalysis.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                      <span className="text-warm-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Investment CTA */}
              <div className="mt-10 bg-gradient-to-r from-accent-500 to-primary-800 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-light mb-3">Interested in investing in {data.name}?</h3>
                <p className="text-white/80 mb-6">Our team has 12+ years of experience helping investors find the right properties on the Costa Blanca.</p>
                <Link href={`${langPrefix}/consultation`} className="inline-flex items-center gap-2 bg-white text-primary-900 hover:bg-warm-50 px-8 py-4 rounded-lg font-semibold transition-colors">
                  Book Investment Consultation
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            COST OF LIVING — Card grid with summary
        ═══════════════════════════════════════════════════════════════ */}
        {content.costOfLiving && (
          <section id="costs" className="py-16 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Finances</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.costOfLivingIn, data.name)}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.costOfLiving.intro}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.costOfLiving.items.map((item, i) => (
                  <div key={i} className="bg-warm-50 rounded-xl p-5 shadow-sm">
                    <h3 className="font-semibold text-primary-900 mb-1">{item.category}</h3>
                    <p className="text-accent-600 font-bold text-lg mb-2">{item.cost}</p>
                    <p className="text-warm-500 text-sm">{item.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            LIFESTYLE TIMELINE (Day in the Life)
        ═══════════════════════════════════════════════════════════════ */}
        {(content.lifestyleTimeline?.entries?.length ?? 0) > 0 && (
          <DayInTheLife
            areaName={data.name}
            intro={content.lifestyleTimeline!.title || t(s.typicalDay, data.name)}
            timeline={content.lifestyleTimeline!.entries.map(entry => ({
              time: entry.time,
              title: entry.activity,
              description: entry.description,
              icon: '',
            }))}
            ctaText={`Find Your Home in ${data.name}`}
            ctaLink={`${langPrefix}/areas/${data.slug}#developments`}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════
            SCHOOLS — Rich card layout
        ═══════════════════════════════════════════════════════════════ */}
        {(content.schools?.schools?.length ?? 0) > 0 && (
          <section id="schools" className="py-16 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Education</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.schoolsNear, data.name)}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.schools!.intro}</p>

              <div className="grid md:grid-cols-2 gap-6">
                {content.schools!.schools.map((school, i) => (
                  <div key={i} className="bg-warm-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-primary-900 text-lg">{school.name}</h3>
                        <p className="text-accent-600 text-sm font-medium">{school.type}</p>
                      </div>
                      <span className="bg-white text-warm-600 text-sm px-3 py-1 rounded-full">{school.distance}</span>
                    </div>
                    <p className="text-warm-600 text-sm">{school.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            EVENTS & FIESTAS — Grid of event cards
        ═══════════════════════════════════════════════════════════════ */}
        {(content.events?.events?.length ?? 0) > 0 && (
          <section id="events" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Culture</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {t(s.eventsFiestas, data.name)}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.events!.intro}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.events!.events.map((event, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-accent-600 text-sm font-medium mb-2">{event.month}</p>
                    <h3 className="font-bold text-primary-900 text-lg mb-2">{event.name}</h3>
                    <p className="text-warm-600 text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            EXPAT COMMUNITY — Two-column rich layout
        ═══════════════════════════════════════════════════════════════ */}
        {content.expatCommunity && (
          <section id="expat" className="py-16 bg-white scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Community</span>
                  <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                    {t(s.expatCommunity, data.name)}
                  </h2>
                  <div className="prose prose-lg text-warm-700 max-w-none">
                    {(content.expatCommunity?.intro || '').split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {(content.expatCommunity?.nationalities?.length ?? 0) > 0 && (
                    <div className="bg-warm-50 rounded-2xl p-6">
                      <h3 className="font-bold text-primary-900 mb-4">{s.internationalCommunity}</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.expatCommunity!.nationalities.map((nat, i) => (
                          <span key={i} className="bg-white text-warm-700 text-sm px-3 py-1 rounded-full">
                            {nat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(content.expatCommunity?.highlights?.length ?? 0) > 0 && (
                    <div className="bg-warm-50 rounded-2xl p-6">
                      <h3 className="font-bold text-primary-900 mb-4">Community Highlights</h3>
                      <div className="space-y-3">
                        {content.expatCommunity!.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-accent-500">&#10003;</span>
                            <span className="text-warm-700 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            NATURE & OUTDOOR ACTIVITIES
        ═══════════════════════════════════════════════════════════════ */}
        {(content.natureActivities?.activities?.length ?? 0) > 0 && (
          <section id="outdoor" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Beyond the Property</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-4">
                {s.natureActivities}
              </h2>
              <p className="text-warm-600 text-lg mb-10 max-w-3xl">{content.natureActivities!.intro}</p>

              {/* Lifestyle Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[golfImages[0], beachImages[3], marinaImages[0], oldTownImages[0]].map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <Image
                      src={getImageUrl(img, 600)}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                      {['Golf', 'Beaches', 'Sailing', 'Old Towns'][i]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.natureActivities!.activities.map((activity, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-primary-900">{activity.name}</h3>
                      <span className="bg-accent-100 text-accent-700 text-xs px-2 py-1 rounded-full">{activity.type}</span>
                    </div>
                    <p className="text-warm-600 text-sm">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            MAP EMBED
        ═══════════════════════════════════════════════════════════════ */}
        {content.mapEmbed && (
          <section className="scroll-mt-16">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Location</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-6">
                {t(s.locationMap, data.name)}
              </h2>
              <div className="rounded-2xl overflow-hidden border border-warm-200 shadow-sm">
                <iframe
                  src={content.mapEmbed}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${data.name}`}
                />
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            VIDEO TOURS
        ═══════════════════════════════════════════════════════════════ */}
        {(() => {
          if (areaVideos.length === 0) return null;

          if (areaVideos.length === 1) {
            const video = areaVideos[0];
            return (
              <section className="py-16 bg-primary-900">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-accent-500" />
                        <span className="text-accent-400 text-xs font-medium tracking-widest uppercase">{s.videoTour}</span>
                      </div>
                      <h2 className="text-3xl font-light mb-4">{t(s.exploreInVideo, data.name)}</h2>
                      <p className="text-warm-200 mb-6 leading-relaxed">{video.description}</p>
                      <div className="flex items-center gap-2 text-warm-300 text-sm">
                        <span className="inline-block bg-accent-500 rounded-full px-3 py-1">{video.category}</span>
                        {video.duration && <span>{video.duration}</span>}
                      </div>
                    </div>
                    <div><VideoCard {...video} variant="hero" /></div>
                  </div>
                </div>
              </section>
            );
          }

          return (
            <section className="py-16 bg-warm-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-8">
                  <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">{s.videoTours}</span>
                  <h2 className="text-3xl font-light text-primary-900 mt-2">
                    {s.videoTours} {data.name}
                  </h2>
                </div>
                <div className={`grid grid-cols-1 ${areaVideos.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                  {areaVideos.map((video) => (
                    <VideoCard key={video.slug} {...video} variant="card" />
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════
            RELATED BLOG ARTICLES
        ═══════════════════════════════════════════════════════════════ */}
        {relatedBlogPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-2xl font-light text-primary-900 mb-8">
                {t(s.guidesForBuying, data.name)}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogPosts.map(post => (
                  <Link key={post.slug} href={`${langPrefix}/blog/${post.slug}`}
                    className="bg-warm-50 rounded-2xl p-6 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent-100 text-accent-800 px-2 py-0.5 rounded text-xs font-medium">{post.category}</span>
                      <span className="text-warm-400 text-xs">{post.readTime} {s.minRead}</span>
                    </div>
                    <h3 className="font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-warm-500 text-sm line-clamp-2">{post.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            WHY LIVE HERE
        ═══════════════════════════════════════════════════════════════ */}
        {(content.whyLiveHereSection?.length ?? 0) > 0 && (
          <section className="py-16 bg-warm-50">
            <div className="max-w-7xl mx-auto px-6">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Summary</span>
              <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2 mb-8">
                {t(s.whyLiveIn, data.name)}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {content.whyLiveHereSection.map((reason, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                    <span className="flex-shrink-0 w-10 h-10 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                    <span className="text-warm-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            INLINE LEAD FORM — Full-width
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Get In Touch</span>
              <h2 className="text-3xl font-light text-primary-900 mt-2">
                Interested in {data.name}?
              </h2>
              <p className="text-warm-600 mt-3">Tell us what you are looking for and we will get back to you within 24 hours.</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-8">
              <LeadForm
                area={data.name}
                language={lang}
                formType="Area Inquiry"
                sourcePage={`${langPrefix}/areas/${data.slug}`}
                budgetRange={`€${data.priceRange.min.toLocaleString()} - €${data.priceRange.max.toLocaleString()}`}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FAQs — Centered, dramatic
        ═══════════════════════════════════════════════════════════════ */}
        {(content.faqs?.length ?? 0) > 0 && (
          <section id="faqs" className="py-16 bg-warm-50 scroll-mt-16">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-accent-600 text-sm font-semibold uppercase tracking-wide">Questions Answered</span>
                <h2 className="text-3xl lg:text-4xl font-light text-primary-900 mt-2">
                  {t(s.faqAbout, data.name)}
                </h2>
              </div>

              <div className="space-y-4">
                {content.faqs.map((faq, i) => (
                  <details key={i} className="group border border-warm-200 rounded-xl overflow-hidden bg-white">
                    <summary className="flex justify-between items-center cursor-pointer p-5 font-semibold text-primary-900 hover:bg-warm-50 transition-colors">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-warm-400 group-open:rotate-180 transition-transform">&#9660;</span>
                    </summary>
                    <div className="px-5 pb-5 text-warm-700 leading-relaxed border-t border-warm-100 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            NEWSLETTER
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <NewsletterCTA
              type="area"
              areaName={data.name}
              language={lang}
              sourcePage={`${langPrefix}/areas/${data.slug}`}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FINAL CTA — Dramatic gradient
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
              Ready to Explore <span className="font-semibold">{data.name}?</span>
            </h2>
            <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto">
              {content.conclusion}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href={`${langPrefix}/consultation`} className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                Book Free Consultation
              </Link>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2">
                WhatsApp
              </a>
              <a href={`tel:${CONTACT.phone}`} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg transition-colors border border-white/20">
                {CONTACT.phone}
              </a>
            </div>

            <div className="pt-8 border-t border-white/20">
              <p className="text-warm-400 text-sm mb-4">{s.exploreOtherAreas}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href={`${langPrefix}/areas/torrevieja`} className="text-white/70 hover:text-white transition-colors">Torrevieja &rarr;</Link>
                <Link href={`${langPrefix}/areas/javea`} className="text-white/70 hover:text-white transition-colors">J&aacute;vea &rarr;</Link>
                <Link href={`${langPrefix}/areas/moraira`} className="text-white/70 hover:text-white transition-colors">Moraira &rarr;</Link>
                <Link href={`${langPrefix}/areas/benidorm`} className="text-white/70 hover:text-white transition-colors">Benidorm &rarr;</Link>
                <Link href={`${langPrefix}/areas/calpe`} className="text-white/70 hover:text-white transition-colors">Calpe &rarr;</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

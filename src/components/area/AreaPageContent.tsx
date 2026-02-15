import Image from 'next/image';
import Link from 'next/link';
import { AreaContent, CONTACT } from '@/lib/area-utils';
import { AreaPageStrings } from '@/lib/area-i18n';
import { LifestyleBanner, ImageGrid } from '@/components/area/SectionImage';
import { getBlogPostsForArea } from '@/lib/blog-area-mapping';
import { getVideosForArea } from '@/lib/video-mapping';
import VideoCard from '@/components/VideoCard';
import {
  beachImages,
  golfImages,
  villaPoolImages,
  marketFoodImages,
  oldTownImages,
  getImageUrl,
} from '@/data/stock-images';
import { breadcrumbSchema, toJsonLd, articleSchema, placeSchema } from '@/lib/schema';
import LeadForm from '@/components/LeadForm';

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

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areaPlaceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(pageArticleSchema) }} />
      {schemaFAQ && Object.keys(schemaFAQ).length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      )}

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative text-white py-20">
          <Image src={heroImage} alt={data.name} fill className="object-cover" priority unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/80" />
          <div className="relative max-w-6xl mx-auto px-4">
            <nav className="text-white/70 text-sm mb-4">
              <Link href={`${langPrefix}/`} className="hover:text-white">{s.home}</Link>
              <span className="mx-2">&rsaquo;</span>
              <Link href={`${langPrefix}/areas`} className="hover:text-white">{s.areas}</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white">{data.name}</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t(s.livingIn, data.name)}
            </h1>

            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              {t(s.completeGuide, data.name)}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {data.propertyCount} {s.newBuilds}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {s.from} &euro;{data.priceRange.min.toLocaleString()}
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {data.region || 'Costa Blanca'}
              </span>
              {golf && golf.courses && (
                <span className="bg-white/20 px-4 py-2 rounded-full">
                  {golf.courses.length} {s.golfCoursesNearby}
                </span>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Intro */}
              <section>
                <div className="prose prose-lg max-w-none">
                  {content.heroIntro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Lifestyle Section */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  {t(s.theLifestyle, data.name)}
                </h2>
                <div className="prose prose-lg max-w-none mb-6">
                  {content.lifestyleSection.intro.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700">{paragraph}</p>
                  ))}
                </div>

                <ImageGrid
                  images={[villaPoolImages[0], beachImages[1], marketFoodImages[0], oldTownImages[0]]}
                  columns={2}
                  gap="gap-4"
                  className="mb-6"
                />

                {content.lifestyleSection.highlights.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-3">
                    {content.lifestyleSection.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-accent-50 rounded-sm">
                        <span className="text-accent-500">&check;</span>
                        <span className="text-warm-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Beaches with External Links */}
              {externalLinks?.beaches && externalLinks.beaches.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.beachesIn, data.name)}
                  </h2>

                  <div className="relative h-64 rounded-sm overflow-hidden mb-6">
                    <Image src={getImageUrl(beachImages[0], 1200)} alt={beachImages[0].alt} fill className="object-cover" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-lg font-light">{content.amenitiesSection.beaches}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {externalLinks.beaches.map((beach, i) => (
                      <a key={i} href={beach.googleMaps || beach.url || '#'} target="_blank" rel="noopener noreferrer"
                        className="group block rounded-sm overflow-hidden border border-warm-200 hover:shadow-lg transition-shadow">
                        <div className="relative h-32">
                          <Image src={getImageUrl(beachImages[i % beachImages.length], 600)} alt={`${beach.name} beach`} fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-primary-900 mb-1">{beach.name}</h3>
                          {beach.description && <p className="text-warm-600 text-sm mb-2">{beach.description}</p>}
                          <span className="text-accent-600 text-sm font-medium">{s.viewOnGoogleMaps}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* Golf Section */}
              {golf && golf.courses && golf.courses.length > 0 && (
                <section>
                  <LifestyleBanner
                    image={golfImages[0]}
                    title={t(s.golfNear, data.name)}
                    description={golf.intro || `Discover world-class golf courses just minutes from ${data.name}. The Costa Blanca is a golfer's paradise with year-round sunshine.`}
                    alignment="left"
                  />
                  <div className="mt-8 space-y-4">
                    {golf.courses.map((course, i) => (
                      <div key={i} className="flex gap-4 border border-warm-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative w-32 md:w-48 flex-shrink-0">
                          <Image src={getImageUrl(golfImages[i % golfImages.length], 400)} alt={`${course.name} golf course`} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="font-bold text-primary-900 text-lg">{course.name}</h3>
                              <p className="text-warm-500">{course.holes} {s.holes} &bull; {course.distance} ({course.driveTime})</p>
                            </div>
                            <div className="flex gap-2">
                              {course.url && (
                                <a href={course.url} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-success-500 hover:bg-success-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                                  {s.website}
                                </a>
                              )}
                              {course.googleMaps && (
                                <a href={course.googleMaps} target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                                  {s.directions}
                                </a>
                              )}
                            </div>
                          </div>
                          {course.description && <p className="text-warm-700">{course.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Amenities Section */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.amenitiesServices}</h2>

                <LifestyleBanner
                  image={marketFoodImages[1]}
                  title={s.localDiningMarkets}
                  description={t(s.diningMarketsDesc, data.name)}
                  alignment="center"
                />

                <div className="mt-8 space-y-6">
                  <div className="border-l-4 border-accent-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">{s.dining}</h3>
                    <p className="text-warm-700">{content.amenitiesSection.dining}</p>
                  </div>

                  <div className="border-l-4 border-accent-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">{s.shopping}</h3>
                    <p className="text-warm-700">{content.amenitiesSection.shopping}</p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">{s.healthcare}</h3>
                    <p className="text-warm-700">{content.amenitiesSection.healthcare}</p>
                    {externalLinks?.healthcare && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a href={externalLinks.healthcare.googleMaps} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-accent-600 hover:underline text-sm">
                          📍 {externalLinks.healthcare.name} ({externalLinks.healthcare.distance})
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="border-l-4 border-success-500 pl-4">
                    <h3 className="font-bold text-primary-900 mb-2">{s.transport}</h3>
                    <p className="text-warm-700">{content.amenitiesSection.transport}</p>
                    {externalLinks?.airport && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a href={externalLinks.airport.googleMaps} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-accent-600 hover:underline text-sm">
                          📍 {externalLinks.airport.name} ({externalLinks.airport.distance}, {externalLinks.airport.driveTime})
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Property Market */}
              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  {t(s.propertyMarketIn, data.name)}
                </h2>
                <div className="prose prose-lg max-w-none">
                  {content.propertyMarketSection.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-warm-700">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Investment Analysis */}
              {content.investmentAnalysis && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.investmentAnalysis}</h2>
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-sm p-6 mb-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-accent-600">{content.investmentAnalysis.rentalYield}</p>
                        <p className="text-sm text-warm-600 mt-1">{s.rentalYield}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-primary-700">{content.investmentAnalysis.annualAppreciation}</p>
                        <p className="text-sm text-warm-600 mt-1">{s.annualAppreciation}</p>
                      </div>
                    </div>
                    <p className="text-warm-700">{content.investmentAnalysis.overview}</p>
                  </div>
                  {content.investmentAnalysis.highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {content.investmentAnalysis.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 border border-warm-200 rounded-sm">
                          <span className="text-accent-500 text-lg">&bull;</span>
                          <span className="text-warm-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Cost of Living */}
              {content.costOfLiving && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.costOfLivingIn, data.name)}
                  </h2>
                  <p className="text-warm-700 mb-6">{content.costOfLiving.intro}</p>
                  <div className="overflow-hidden border border-warm-200 rounded-sm">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-primary-900 text-white">
                          <th className="text-left px-4 py-3 font-medium">{s.category}</th>
                          <th className="text-left px-4 py-3 font-medium">{s.cost}</th>
                          <th className="text-left px-4 py-3 font-medium hidden md:table-cell">{s.notes}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.costOfLiving.items.map((item, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-warm-50'}>
                            <td className="px-4 py-3 text-warm-800 font-medium">{item.category}</td>
                            <td className="px-4 py-3 text-accent-600 font-bold">{item.cost}</td>
                            <td className="px-4 py-3 text-warm-600 text-sm hidden md:table-cell">{item.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Lifestyle Timeline */}
              {content.lifestyleTimeline && content.lifestyleTimeline.entries.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {content.lifestyleTimeline.title || t(s.typicalDay, data.name)}
                  </h2>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-accent-200" />
                    <div className="space-y-6">
                      {content.lifestyleTimeline.entries.map((entry, i) => (
                        <div key={i} className="relative flex gap-6 items-start">
                          <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                            {entry.time}
                          </div>
                          <div className="flex-1 bg-white border border-warm-200 rounded-sm p-4 shadow-sm">
                            <h3 className="font-bold text-primary-900 mb-1">{entry.activity}</h3>
                            <p className="text-warm-600 text-sm">{entry.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Events & Fiestas */}
              {content.events && content.events.events.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.eventsFiestas, data.name)}
                  </h2>
                  <p className="text-warm-700 mb-6">{content.events.intro}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.events.events.map((event, i) => (
                      <div key={i} className="border border-warm-200 rounded-sm p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                            {event.month}
                          </div>
                          <div>
                            <h3 className="font-bold text-primary-900 mb-1">{event.name}</h3>
                            <p className="text-warm-600 text-sm">{event.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Schools */}
              {content.schools && content.schools.schools.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.schoolsNear, data.name)}
                  </h2>
                  <p className="text-warm-700 mb-6">{content.schools.intro}</p>
                  <div className="space-y-3">
                    {content.schools.schools.map((school, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 border border-warm-200 rounded-sm">
                        <span className="flex-shrink-0 text-2xl">&bull;</span>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-primary-900">{school.name}</h3>
                            <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              {school.type}
                            </span>
                          </div>
                          <p className="text-warm-600 text-sm">{school.description}</p>
                          <p className="text-warm-500 text-xs mt-1">{school.distance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Nature & Activities */}
              {content.natureActivities && content.natureActivities.activities.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">{s.natureActivities}</h2>
                  <p className="text-warm-700 mb-6">{content.natureActivities.intro}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content.natureActivities.activities.map((activity, i) => (
                      <div key={i} className="bg-gradient-to-br from-warm-50 to-accent-50 rounded-sm p-4 border border-warm-100">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 text-xl">
                            {activity.type === 'Golf' ? '⛳' :
                             activity.type === 'Beach' || activity.type === 'Water Sports' ? '🏖️' :
                             activity.type === 'Hiking' || activity.type === 'Walking' ? '🥾' :
                             activity.type === 'Cycling' ? '🚴' :
                             activity.type === 'Nature Reserve' || activity.type === 'Nature' ? '🌿' :
                             activity.type === 'Bird Watching' ? '🦅' :
                             '🏞️'}
                          </span>
                          <div>
                            <h3 className="font-bold text-primary-900 mb-1">{activity.name}</h3>
                            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full">{activity.type}</span>
                            <p className="text-warm-600 text-sm mt-2">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Expat Community */}
              {content.expatCommunity && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.expatCommunity, data.name)}
                  </h2>
                  <div className="prose prose-lg max-w-none mb-6">
                    {content.expatCommunity.intro.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-warm-700">{paragraph}</p>
                    ))}
                  </div>
                  {content.expatCommunity.nationalities.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium text-primary-900 mb-3">{s.internationalCommunity}</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.expatCommunity.nationalities.map((nat, i) => (
                          <span key={i} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                            {nat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {content.expatCommunity.highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3">
                      {content.expatCommunity.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-warm-50 rounded-sm">
                          <span className="text-accent-500">&bull;</span>
                          <span className="text-warm-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Area Map */}
              {content.mapEmbed && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.locationMap, data.name)}
                  </h2>
                  <div className="rounded-sm overflow-hidden border border-warm-200">
                    <iframe
                      src={content.mapEmbed}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${data.name}`}
                    />
                  </div>
                </section>
              )}

              {/* Available Properties */}
              {developments && developments.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.newBuildProperties, data.name)}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {developments.map((dev) => (
                      <Link key={dev.slug} href={`/developments/${dev.slug}`}
                        className="group bg-white border border-warm-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[4/3]">
                          <Image src={dev.image} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                          {dev.price && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-primary-900 text-white px-3 py-1 rounded-sm text-sm font-bold">
                                {s.from} &euro;{dev.price.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-primary-900 group-hover:text-accent-600 transition-colors">{dev.name}</h3>
                          <p className="text-warm-600 text-sm">{dev.propertyType}</p>
                          {dev.bedrooms && <p className="text-warm-500 text-sm mt-1">{dev.bedrooms} bedrooms</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Video Tours Section */}
              {(() => {
                const areaVideos = getVideosForArea(data.slug, 3);
                if (areaVideos.length === 0) return null;

                if (areaVideos.length === 1) {
                  const video = areaVideos[0];
                  return (
                    <section className="bg-primary-900 rounded-sm p-8 md:p-12">
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
                            {video.price && <span className="text-accent-300 font-medium">From &euro;{video.price.toLocaleString()}</span>}
                          </div>
                        </div>
                        <div><VideoCard {...video} variant="hero" /></div>
                      </div>
                    </section>
                  );
                }

                return (
                  <section className="py-12 bg-warm-50">
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <div className="w-10 h-px bg-accent-500" />
                          <span className="text-accent-600 text-xs font-medium tracking-widest uppercase">{s.videoTours}</span>
                          <div className="w-10 h-px bg-accent-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-light text-primary-900">
                          {t(s.videoTours, data.name)} {data.name}
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

              {/* Related Blog Articles */}
              {relatedBlogPosts.length > 0 && (
                <section className="bg-accent-50 rounded-sm p-6">
                  <h2 className="font-bold text-primary-900 text-xl mb-4">
                    {t(s.guidesForBuying, data.name)}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {relatedBlogPosts.map(post => (
                      <Link key={post.slug} href={`${langPrefix}/blog/${post.slug}`}
                        className="bg-white rounded-sm p-4 hover:shadow-md transition-shadow group">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-accent-100 text-accent-800 px-2 py-0.5 rounded text-xs font-medium">{post.category}</span>
                          <span className="text-warm-400 text-xs">{post.readTime} {s.minRead}</span>
                        </div>
                        <h3 className="font-semibold text-primary-900 mb-1 group-hover:text-accent-600 transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-warm-500 text-sm line-clamp-2">{post.description}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Why Live Here */}
              {content.whyLiveHereSection.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.whyLiveIn, data.name)}
                  </h2>
                  <ul className="space-y-4">
                    {content.whyLiveHereSection.map((reason, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 bg-accent-50 rounded-sm">
                        <span className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                        <span className="text-warm-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQs */}
              {content.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">
                    {t(s.faqAbout, data.name)}
                  </h2>
                  <div className="space-y-4">
                    {content.faqs.map((faq, i) => (
                      <details key={i} className="group border border-warm-200 rounded-sm">
                        <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-primary-900 hover:bg-warm-50">
                          {faq.question}
                          <span className="ml-4 flex-shrink-0 text-warm-400 group-open:rotate-180 transition-transform">&#9660;</span>
                        </summary>
                        <div className="px-4 pb-4 text-warm-700">{faq.answer}</div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Conclusion CTA */}
              <section className="bg-gradient-to-r from-accent-500 to-primary-800 rounded-sm p-8 text-white">
                <p className="text-lg mb-6">{content.conclusion}</p>
                <div className="flex flex-wrap gap-4">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-sm font-medium transition-colors">
                    {s.whatsappUs}
                  </a>
                  <a href={`tel:${CONTACT.phone}`}
                    className="inline-flex items-center gap-2 bg-white text-accent-500 hover:bg-gray-100 px-6 py-3 rounded-sm font-medium transition-colors">
                    {CONTACT.phone}
                  </a>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-warm-200 rounded-sm p-6 shadow-lg sticky top-6">
                <h3 className="font-bold text-primary-900 text-xl mb-4">{data.name}</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-warm-500">{s.region}</p>
                    <p className="font-bold text-primary-900">{data.region || 'Costa Blanca'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">{s.newBuilds}</p>
                    <p className="font-bold text-primary-900">{data.propertyCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">{s.propertyTypes}</p>
                    <p className="font-bold text-primary-900">{data.propertyTypes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-warm-500">{s.priceRange}</p>
                    <p className="font-bold text-primary-900">
                      &euro;{data.priceRange.min.toLocaleString()} - &euro;{data.priceRange.max.toLocaleString()}
                    </p>
                  </div>
                  {golf && golf.courses && (
                    <div>
                      <p className="text-sm text-warm-500">{s.golfCourses}</p>
                      <p className="font-bold text-primary-900">{golf.courses.length} {s.nearby}</p>
                    </div>
                  )}
                </div>

                {externalLinks?.tourism?.url && (
                  <div className="mb-6 p-3 bg-warm-50 rounded-sm">
                    <a href={externalLinks.tourism.url} target="_blank" rel="noopener noreferrer"
                      className="text-accent-600 hover:underline font-medium text-sm">
                      {t(s.officialTourism, data.name)}
                    </a>
                  </div>
                )}

                <div className="space-y-3">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-center py-3 rounded-sm font-medium transition-colors">
                    WhatsApp
                  </a>
                  <a href={`tel:${CONTACT.phone}`}
                    className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-3 rounded-sm font-medium transition-colors">
                    {s.callNow}
                  </a>
                  <a href={CONTACT.habeno} target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-warm-700 text-center py-3 rounded-sm font-medium transition-colors">
                    {s.getMortgageQuote}
                  </a>
                </div>
              </div>

              {/* Lead Form in Sidebar */}
              <div className="bg-white border border-warm-200 rounded-sm p-6 shadow-lg">
                <LeadForm
                  area={data.name}
                  language={lang}
                  formType="Area Inquiry"
                  sourcePage={`${langPrefix}/areas/${data.slug}`}
                  budgetRange={`€${data.priceRange.min.toLocaleString()} - €${data.priceRange.max.toLocaleString()}`}
                  compact={true}
                />
              </div>

              <div className="bg-warm-50 rounded-sm p-6">
                <h3 className="font-bold text-primary-900 mb-4">{s.exploreOtherAreas}</h3>
                <div className="space-y-2">
                  <Link href={`${langPrefix}/areas/torrevieja`} className="block text-accent-600 hover:underline">Torrevieja</Link>
                  <Link href={`${langPrefix}/areas/javea`} className="block text-accent-600 hover:underline">Jávea</Link>
                  <Link href={`${langPrefix}/areas/moraira`} className="block text-accent-600 hover:underline">Moraira</Link>
                  <Link href={`${langPrefix}/areas/benidorm`} className="block text-accent-600 hover:underline">Benidorm</Link>
                  <Link href={`${langPrefix}/areas/calpe`} className="block text-accent-600 hover:underline">Calpe</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

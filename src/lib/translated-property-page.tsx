/**
 * Shared Translated Property Page Helper
 * =======================================
 * Provides generateMetadata and the page component for translated property pages.
 * Each language's property/[reference]/page.tsx imports from here with their lang code.
 *
 * This loads culturally-adapted AI content when available, falling back to English.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPropertyByRef, fetchXMLFeed, toUnifiedFormat } from '@/lib/xml-parser';
import { generatePropertyContent, generateRentalIncomeEstimate } from '@/lib/property-content-generator';
import { loadTranslatedAIContent, convertAIToPropertyContent } from '@/lib/ai-content-loader';
import { developments, developers } from '@/data/developments';
import { getVideoForProperty, getVideosForDevelopment, VideoCard } from '@/lib/video-mapping';
import fs from 'fs';
import path from 'path';
import PropertyPageClient from '@/app/properties/[reference]/PropertyPageClient';

// Locale metadata mappings
const LOCALE_MAP: Record<string, { ogLocale: string; label: string }> = {
  sv: { ogLocale: 'sv_SE', label: 'Swedish' },
  de: { ogLocale: 'de_DE', label: 'German' },
  nl: { ogLocale: 'nl_NL', label: 'Dutch' },
  'nl-be': { ogLocale: 'nl_BE', label: 'Flemish' },
  fr: { ogLocale: 'fr_FR', label: 'French' },
  no: { ogLocale: 'nb_NO', label: 'Norwegian' },
  pl: { ogLocale: 'pl_PL', label: 'Polish' },
  ru: { ogLocale: 'ru_RU', label: 'Russian' },
};

const BASE_URL = 'https://newbuildhomescostablanca.com';

export function createTranslatedMetadataGenerator(lang: string) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ reference: string }>;
  }): Promise<Metadata> {
    const { reference } = await params;
    const parsedProperty = await getPropertyByRef(reference);

    if (!parsedProperty) {
      return {
        title: 'Property Not Found | New Build Homes Costa Blanca',
        description: 'The property you are looking for could not be found.',
      };
    }

    const property = toUnifiedFormat(parsedProperty);
    const aiContent = loadTranslatedAIContent(reference, lang);
    const content = aiContent
      ? convertAIToPropertyContent(aiContent)
      : generatePropertyContent(property as any);

    const localeInfo = LOCALE_MAP[lang] || { ogLocale: 'en_GB', label: lang };

    return {
      title: `${content.seoTitle} | New Build Homes Costa Blanca`,
      description: content.metaDescription,
      openGraph: {
        title: content.seoTitle,
        description: content.metaDescription,
        images: property.images?.slice(0, 4).map((img: any, i: number) => ({
          url: img.url,
          width: 1200,
          height: 630,
          alt: content.imageAltTags?.[i] || `Property in ${property.town}`,
        })) || [],
        type: 'website',
        locale: localeInfo.ogLocale,
        siteName: 'New Build Homes Costa Blanca',
      },
      twitter: {
        card: 'summary_large_image',
        title: content.seoTitle,
        description: content.metaDescription,
        images: property.images?.[0]?.url ? [property.images[0].url] : [],
      },
      alternates: {
        canonical: `${BASE_URL}/${lang}/properties/${property.reference}`,
        languages: {
          'en': `${BASE_URL}/properties/${property.reference}`,
          'sv': `${BASE_URL}/sv/properties/${property.reference}`,
          'nl': `${BASE_URL}/nl/properties/${property.reference}`,
          'nl-BE': `${BASE_URL}/nl-be/properties/${property.reference}`,
          'fr': `${BASE_URL}/fr/properties/${property.reference}`,
          'no': `${BASE_URL}/no/properties/${property.reference}`,
          'de': `${BASE_URL}/de/properties/${property.reference}`,
          'pl': `${BASE_URL}/pl/properties/${property.reference}`,
          'ru': `${BASE_URL}/ru/properties/${property.reference}`,
          'x-default': `${BASE_URL}/properties/${property.reference}`,
        },
      },
      robots: { index: true, follow: true },
    };
  };
}

export function createTranslatedPropertyPage(lang: string) {
  return async function TranslatedPropertyPage({
    params,
  }: {
    params: Promise<{ reference: string }>;
  }) {
    const { reference } = await params;
    const parsedProperty = await getPropertyByRef(reference);

    if (!parsedProperty) {
      notFound();
    }

    const property = toUnifiedFormat(parsedProperty);

    // Load translated AI content — falls back to English if no translation exists
    const aiContent = loadTranslatedAIContent(reference, lang);
    const content = aiContent
      ? convertAIToPropertyContent(aiContent)
      : generatePropertyContent(property as any);

    content.rentalIncomeEstimate = generateRentalIncomeEstimate(property as any);

    // JSON-LD schemas (use translated content for descriptions)
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: content.seoTitle,
      description: content.metaDescription,
      image: property.images?.slice(0, 5).map((img: any) => img.url) || [],
      brand: { '@type': 'Brand', name: 'New Build Homes Costa Blanca' },
      offers: {
        '@type': 'Offer',
        url: `${BASE_URL}/${lang}/properties/${property.reference}`,
        priceCurrency: 'EUR',
        price: property.price || 0,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
      },
    };

    const faqSchema = content.faqs?.length ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    } : null;

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/${lang}` },
        { '@type': 'ListItem', position: 2, name: 'Properties', item: `${BASE_URL}/${lang}/properties` },
        { '@type': 'ListItem', position: 3, name: content.seoTitle },
      ],
    };

    // Internal linking
    const devName = property.developmentName || '';
    const matchedDevelopment = developments.find((d: any) =>
      d.name.toLowerCase() === devName.toLowerCase() ||
      (d.displayName && d.displayName.toLowerCase() === devName.toLowerCase())
    );
    const builderName = property.developer || '';
    const matchedBuilder = Object.values(developers).find((d: any) =>
      d.name.toLowerCase() === builderName.toLowerCase() ||
      d.displayName.toLowerCase() === builderName.toLowerCase()
    );
    const builderSlug = matchedBuilder
      ? Object.keys(developers).find(key => (developers as any)[key] === matchedBuilder) || ''
      : '';

    // Related articles (try translated, fall back to English)
    let relatedArticles: any[] = [];
    try {
      const langArticlesDir = path.join(process.cwd(), 'src/content/articles', lang);
      const articlesDir = fs.existsSync(langArticlesDir) ? langArticlesDir : path.join(process.cwd(), 'src/content/articles');
      const articleFiles = fs.readdirSync(articlesDir).filter((f: string) => f.endsWith('.json'));
      const townSlugForMatch = (property.town || '').toLowerCase().replace(/\s+/g, '-');

      for (const file of articleFiles) {
        const articleData = JSON.parse(fs.readFileSync(path.join(articlesDir, file), 'utf-8'));
        const areas: string[] = articleData.relatedAreas || [];
        const isAreaMatch = areas.some((a: string) =>
          a === townSlugForMatch || townSlugForMatch.includes(a) || a.includes(townSlugForMatch)
        );
        if (isAreaMatch) {
          relatedArticles.push({
            slug: articleData.slug,
            title: articleData.title,
            category: articleData.category,
            readTime: articleData.readTime,
          });
        }
      }
      relatedArticles = relatedArticles.slice(0, 3);
    } catch (error) {}

    // Video
    let propertyVideo: VideoCard | null = null;
    try {
      propertyVideo = getVideoForProperty(property.reference);
      if (!propertyVideo && matchedDevelopment) {
        const devVideos = getVideosForDevelopment(matchedDevelopment.slug, 1);
        if (devVideos.length > 0) propertyVideo = devVideos[0];
      }
    } catch (error) {}

    const linkingData = {
      development: matchedDevelopment ? {
        slug: matchedDevelopment.slug,
        name: (matchedDevelopment as any).displayName || matchedDevelopment.name,
        status: matchedDevelopment.status,
      } : null,
      builder: matchedBuilder ? {
        slug: builderSlug,
        name: (matchedBuilder as any).displayName || (matchedBuilder as any).name,
      } : null,
      relatedArticles,
      propertyVideo,
    };

    // Similar properties
    let similarProperties: any[] = [];
    try {
      const allProperties = await fetchXMLFeed();
      const sameTown = allProperties.filter((p: any) =>
        p.ref !== parsedProperty.ref &&
        p.town?.toLowerCase() === parsedProperty.town?.toLowerCase()
      );
      if (sameTown.length >= 4) {
        similarProperties = sameTown.slice(0, 4).map((p: any) => toUnifiedFormat(p));
      } else {
        const sameRegion = allProperties.filter((p: any) =>
          p.ref !== parsedProperty.ref &&
          p.town?.toLowerCase() !== parsedProperty.town?.toLowerCase() &&
          p.region === parsedProperty.region
        );
        similarProperties = [...sameTown, ...sameRegion].slice(0, 4).map((p: any) => toUnifiedFormat(p));
      }
    } catch (error) {}

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <PropertyPageClient
          property={property as any}
          content={content}
          similarProperties={similarProperties}
          linkingData={linkingData}
        />
      </>
    );
  };
}

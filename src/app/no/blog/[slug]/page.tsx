// ISR: Regenerate blog pages every 24 hours
export const revalidate = 86400;

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { breadcrumbSchema, faqSchema, toJsonLd } from '@/lib/schema';
import { getArticle, getSmartRelatedArticles, getAvailableProperties, getArticleSlugs } from '@/lib/blog-page-utils';
import { getBlogStrings, getDateLocale } from '@/lib/blog-strings';
import BlogArticleContent from '@/components/blog/BlogArticleContent';

const LANG = 'no';
const LANG_PREFIX = '/no';
const BASE_URL = 'https://newbuildhomescostablanca.com';

export async function generateStaticParams() {
  try {
    const slugs = getArticleSlugs(LANG);
    // Limit to first 5 to speed up build; rest use ISR
    return slugs.slice(0, 5).map(slug => ({ slug }));
  } catch { return []; }
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug, LANG);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article', publishedTime: article.publishedAt },
    alternates: {
      canonical: `${BASE_URL}${LANG_PREFIX}/blog/${slug}`,
      languages: {
        'en': `${BASE_URL}/blog/${slug}`,
        'sv': `${BASE_URL}/sv/blog/${slug}`,
        'nl': `${BASE_URL}/nl/blog/${slug}`,
        'nl-BE': `${BASE_URL}/nl-be/blog/${slug}`,
        'fr': `${BASE_URL}/fr/blog/${slug}`,
        'no': `${BASE_URL}/no/blog/${slug}`,
        'de': `${BASE_URL}/de/blog/${slug}`,
        'pl': `${BASE_URL}/pl/blog/${slug}`,
        'ru': `${BASE_URL}/ru/blog/${slug}`,
        'x-default': `${BASE_URL}/blog/${slug}`,
      },
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug, LANG);
  if (!article) notFound();

  const relatedArticles = getSmartRelatedArticles(slug, LANG, 6);
  const availableProperties = getAvailableProperties();
  const strings = getBlogStrings(LANG);
  const dateLocale = getDateLocale(LANG);

  return (
    <BlogArticleContent
      article={article}
      relatedArticles={relatedArticles}
      availableProperties={availableProperties}
      lang={LANG}
      langPrefix={LANG_PREFIX}
      strings={strings}
      dateLocale={dateLocale}
    />
  );
}

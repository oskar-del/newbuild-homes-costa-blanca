import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArea, getTranslatedAreaSlugs } from '@/lib/area-utils';
import { getAreaStrings } from '@/lib/area-i18n';
import { prepareAreaPageData } from '@/app/areas/[slug]/page';
import AreaPageContent from '@/components/area/AreaPageContent';

export async function generateStaticParams() {
  const slugs = getTranslatedAreaSlugs('ru');
  return slugs.map(slug => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArea(slug, 'ru');

  if (!data) {
    return { title: 'Area Not Found' };
  }

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/ru/areas/${slug}`,
      languages: {
        'en': `https://newbuildhomescostablanca.com/areas/${slug}`,
        'sv': `https://newbuildhomescostablanca.com/sv/areas/${slug}`,
        'nl': `https://newbuildhomescostablanca.com/nl/areas/${slug}`,
        'nl-BE': `https://newbuildhomescostablanca.com/nl-be/areas/${slug}`,
        'fr': `https://newbuildhomescostablanca.com/fr/areas/${slug}`,
        'no': `https://newbuildhomescostablanca.com/no/areas/${slug}`,
        'de': `https://newbuildhomescostablanca.com/de/areas/${slug}`,
        'pl': `https://newbuildhomescostablanca.com/pl/areas/${slug}`,
        'ru': `https://newbuildhomescostablanca.com/ru/areas/${slug}`,
        'x-default': `https://newbuildhomescostablanca.com/areas/${slug}`,
      },
    },
  };
}

export default async function LocalizedAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getArea(slug, 'ru');

  if (!data) {
    notFound();
  }

  const { developments, heroImage } = await prepareAreaPageData(data, slug);
  const strings = getAreaStrings('ru');

  return (
    <AreaPageContent
      data={data}
      developments={developments}
      heroImage={heroImage}
      lang="ru"
      strings={strings}
      langPrefix="/ru"
    />
  );
}

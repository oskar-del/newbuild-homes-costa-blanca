import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArea, getTranslatedAreaSlugs } from '@/lib/area-utils';
import { getAreaStrings } from '@/lib/area-i18n';
import { prepareAreaPageData } from '@/app/areas/[slug]/page';
import AreaPageContent from '@/components/area/AreaPageContent';

export async function generateStaticParams() {
  const slugs = getTranslatedAreaSlugs('de');
  return slugs.map(slug => ({ slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArea(slug, 'de');

  if (!data) {
    return { title: 'Area Not Found' };
  }

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    alternates: {
      canonical: `https://newbuildhomescostablanca.com/areas/${slug}`,
    },
  };
}

export default async function LocalizedAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getArea(slug, 'de');

  if (!data) {
    notFound();
  }

  const { developments, heroImage } = await prepareAreaPageData(data, slug);
  const strings = getAreaStrings('de');

  return (
    <AreaPageContent
      data={data}
      developments={developments}
      heroImage={heroImage}
      lang="de"
      strings={strings}
      langPrefix="/de"
    />
  );
}

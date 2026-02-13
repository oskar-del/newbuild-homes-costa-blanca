import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArea, getAllAreaSlugs } from '@/lib/area-utils';
import { getAreaStrings } from '@/lib/area-i18n';
import { prepareAreaPageData } from '@/app/areas/[slug]/page';
import AreaPageContent from '@/components/area/AreaPageContent';

export async function generateStaticParams() {
  const slugs = getAllAreaSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getArea(slug, 'fr');

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
  const data = getArea(slug, 'fr');

  if (!data) {
    notFound();
  }

  const { developments, heroImage } = await prepareAreaPageData(data, slug);
  const strings = getAreaStrings('fr');

  return (
    <AreaPageContent
      data={data}
      developments={developments}
      heroImage={heroImage}
      lang="fr"
      strings={strings}
      langPrefix="/fr"
    />
  );
}

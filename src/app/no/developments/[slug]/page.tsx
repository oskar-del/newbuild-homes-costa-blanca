import { redirect } from 'next/navigation';

export default async function LocalizedDevelopmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/developments/${slug}`);
}

import { redirect } from 'next/navigation';

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/regions/${slug}`);
}

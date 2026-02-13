import { redirect } from 'next/navigation';

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ filters: string[] }>;
}) {
  const { filters } = await params;
  redirect(`/properties/${filters.join('/')}`);
}

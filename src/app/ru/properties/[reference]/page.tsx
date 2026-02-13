import { redirect } from 'next/navigation';

export default async function LocalizedPropertyPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  redirect(`/properties/${reference}`);
}

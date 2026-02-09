import { redirect } from 'next/navigation';

export default function SVPropertyDetailPage({
  params,
}: {
  params: { reference: string };
}) {
  // Redirect Swedish property detail pages to English version for now
  // This prevents 404 errors and allows users to view properties via Swedish links
  redirect(`/properties/${params.reference}`);
}

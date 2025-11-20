import { Metadata } from 'next';

import { eventLocationDecode } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}): Promise<Metadata> {
  const { year, event } = await params;
  return {
    title: `${eventLocationDecode(event)} ${year}`,
  };
}

export default function MetadataLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

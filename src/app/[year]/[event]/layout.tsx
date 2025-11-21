import { Metadata } from 'next';

import { eventLocationDecode } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; event: string }>;
}): Promise<Metadata> {
  const { year, event } = await params;
  return {
    title: `${year} ${eventLocationDecode(event).replace('Grand Prix', 'GP')} - Slick Telemetry`,
    description: `See the results for ${eventLocationDecode(event)} in the ${year} F1 season`,
  };
}

export default function MetadataLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

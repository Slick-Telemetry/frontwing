import { Metadata } from 'next';

import { eventLocationDecode, sessionDecode } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; event: string; session: string }>;
}): Promise<Metadata> {
  const { year, event, session } = await params;
  return {
    title: `${sessionDecode(session).replace('_', ' ')} - ${year} ${eventLocationDecode(event).replace('Grand Prix', 'GP')} - Slick Telemetry`,
    description: `See the F1 results for ${sessionDecode(session).replace('_', ' ')} of the ${year} ${eventLocationDecode(event)}`,
  };
}

export default function MetadataLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

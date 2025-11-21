import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `${year} Map - Slick Telemetry`,
    description: `Explore world map of locations for the ${year} F1 season`,
  };
}

export default function MetadataLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Suspense } from 'react';

import { PreloadQuery } from '@/lib/client';
import { GET_STANDINGS } from '@/lib/queries';

import { FullHeightLoader } from '@/components/Loader';

import { Standings } from '.';

export default async function StandingsPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  return (
    <div className='container mx-auto'>
      <PreloadQuery
        query={GET_STANDINGS}
        variables={{
          season: year,
        }}
      >
        <Suspense
          fallback={<FullHeightLoader>Loading standings...</FullHeightLoader>}
        >
          <Standings season={parseInt(year)} />
        </Suspense>
      </PreloadQuery>
    </div>
  );
}

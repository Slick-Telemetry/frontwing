import { Suspense } from 'react';

import { PreloadQuery } from '@/lib/client';
import { GET_STANDINGS } from '@/lib/queries';

import { FullHeightLoader } from '@/components/Loader';

import { Standings } from '.';

export default async function StandingsPage() {
  return (
    <div className='container mx-auto px-4'>
      <PreloadQuery
        query={GET_STANDINGS}
        variables={{
          season: 2024,
        }}
      >
        <Suspense
          fallback={<FullHeightLoader>Loading standings...</FullHeightLoader>}
        >
          <Standings />
        </Suspense>
      </PreloadQuery>
    </div>
  );
}

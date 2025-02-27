import { Suspense } from 'react';

import { PreloadQuery } from '@/lib/client';
import { GET_DRIVER_STANDINGS } from '@/lib/queries';

import { FullHeightLoader } from '@/components/Loader';

import { Standings } from './Standings';

export default async function StandingsPage() {
  return (
    <div className='min-h-svh'>
      <div className='container mx-auto'>
        <PreloadQuery
          query={GET_DRIVER_STANDINGS}
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
    </div>
  );
}

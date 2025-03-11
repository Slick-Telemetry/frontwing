import { Suspense } from 'react';

import { PreloadQuery } from '@/lib/client';
import { GET_SESSION_RESULTS } from '@/lib/queries';

import { FullHeightLoader } from '@/components/Loader';

import { SessionResults } from '.';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className='container mx-auto'>
      <PreloadQuery
        query={GET_SESSION_RESULTS}
        variables={{
          id: id,
        }}
      >
        <Suspense
          fallback={<FullHeightLoader>Loading standings...</FullHeightLoader>}
        >
          <SessionResults id={id} />
        </Suspense>
      </PreloadQuery>
    </div>
  );
}

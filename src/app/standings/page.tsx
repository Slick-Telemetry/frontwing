import { Suspense } from 'react';

import { getClient, PreloadQuery } from '@/lib/client';
import { GET_SEASONS, GET_STANDINGS } from '@/lib/queries';

import { FullHeightLoader } from '@/components/Loader';

import { Standings } from '.';

export default async function StandingsPage({
  searchParams,
}: {
  searchParams: Promise<{ season?: string }>;
}) {
  const { season } = await searchParams;
  const apolloClient = getClient();
  // ✅ Initialize selectedSeason with URL param if available
  let selectedSeason = season ? Number(season) : undefined;

  // ✅ If no season is in the URL, fetch the latest season on the server
  if (!selectedSeason) {
    const { data: seasonsData } = await apolloClient.query({
      query: GET_SEASONS,
    });
    const availableSeasons = seasonsData?.seasons || [];
    selectedSeason = availableSeasons.length && availableSeasons[0].year;
  }

  return (
    <div className='container mx-auto'>
      <PreloadQuery
        query={GET_STANDINGS}
        variables={{
          season: selectedSeason,
        }}
      >
        <Suspense
          fallback={<FullHeightLoader>Loading standings...</FullHeightLoader>}
        >
          <Standings season={selectedSeason} />
        </Suspense>
      </PreloadQuery>
    </div>
  );
}

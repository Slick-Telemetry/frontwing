'use client';

import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { GET_SEASONS } from '@/lib/queries';

import { GetSeasonsQuery, GetSeasonsQueryVariables } from '@/generated/types';

const SeasonSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSeason = Number(searchParams.get('season')) || 2024;

  const { data, loading, error } = useQuery<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >(GET_SEASONS);
  const events = data?.events || [];

  if (loading) return <p>Loading seasons...</p>;
  if (error) return <p>Error loading seasons!</p>;

  const handleSeasonChange = (newSeason: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('season', newSeason);
    router.replace(`?${params.toString()}`);
  };

  return (
    <select
      value={currentSeason}
      onChange={(e) => handleSeasonChange(e.target.value)}
      className='rounded border p-2'
    >
      {events.map(
        ({ year }) =>
          year && (
            <option key={year} value={year}>
              {year}
            </option>
          ),
      )}
    </select>
  );
};

export default SeasonSelector;

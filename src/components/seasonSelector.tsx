'use client';

import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { GET_SEASONS } from '@/lib/queries';

import { GetSeasonsQuery, GetSeasonsQueryVariables } from '@/generated/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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
    <Select onValueChange={(val) => handleSeasonChange(val)}>
      <SelectTrigger className='w-24'>
        <SelectValue placeholder={currentSeason} />
      </SelectTrigger>
      <SelectContent>
        {events.map(
          ({ year }) =>
            year && (
              <SelectItem key={year} value={year + ''}>
                {year}
              </SelectItem>
            ),
        )}
      </SelectContent>
    </Select>
  );
};

export default SeasonSelector;

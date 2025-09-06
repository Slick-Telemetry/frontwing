'use client';

import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

import { GET_SEASONS } from '@/lib/queries';
import useUrlUpdater from '@/hooks/use-url-updater';

import {
  BaseSelector,
  SelectorDisabled,
  SelectorSkeleton,
} from '@/components/navigation/selector';

import { GetSeasonsQuery, GetSeasonsQueryVariables } from '@/types/graphql';

export function SeasonSelector() {
  const { year } = useParams<{ year: string }>();
  const updateUrl = useUrlUpdater();

  const { data, loading, error } = useQuery<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >(GET_SEASONS);
  const seasons = data?.events.map((e) => e.year?.toString()) || [];
  const value = seasons.includes(year) ? year : undefined;

  if (loading) return <SelectorSkeleton width='w-24' />;
  if (error) return <SelectorDisabled placeholder='Season' width='w-24' />;

  return (
    <BaseSelector
      value={value}
      placeholder='Season'
      items={seasons.map((y) => ({ label: y as string, value: y as string }))}
      onChange={(val) => updateUrl('year', val)}
      width='w-24'
    />
  );
}

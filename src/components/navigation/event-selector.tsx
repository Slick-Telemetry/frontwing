'use client';

import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

import { GET_SEASON_EVENTS } from '@/lib/queries';
import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';
import useUrlUpdater from '@/hooks/use-url-updater';

import {
  BaseSelector,
  SelectorDisabled,
  SelectorSkeleton,
} from '@/components/navigation/selector';

import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
} from '@/generated/types';

export function EventSelector() {
  const { year, event } = useParams<{ year: string; event?: string }>();
  const updateUrl = useUrlUpdater();

  const { data, loading, error } = useQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
    skip: !year,
  });

  if (loading) return <SelectorSkeleton width='w-48' />;
  if (error || !data?.schedule?.length)
    return <SelectorDisabled placeholder='Event' width='w-48' />;

  const items =
    data.schedule.map(({ location, event_name }) => ({
      label: event_name as string,
      value: location!,
    })) || [];

  return (
    <BaseSelector
      value={eventLocationDecode(event)}
      placeholder='Event'
      items={items}
      onChange={(val) => updateUrl('event', eventLocationEncode(val) as string)}
      width='w-48'
    />
  );
}

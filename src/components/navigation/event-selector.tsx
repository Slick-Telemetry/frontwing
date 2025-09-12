'use client';

import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';
import useUrlUpdater from '@/hooks/use-url-updater';

import {
  BaseSelector,
  SelectorDisabled,
  SelectorSkeleton,
} from '@/components/navigation/selector';

import { graphql } from '@/types';

export const GET_NAV_EVENTS = graphql(`
  query GetNavEvents($year: Int!) @cached {
    schedule(distinct_on: event_name, where: { year: { _eq: $year } }) {
      event_name
      location
    }
  }
`);

export function EventSelector() {
  const updateUrl = useUrlUpdater();

  const { year, event } = useParams<{ year: string; event?: string }>();
  const { data, loading, error } = useQuery(GET_NAV_EVENTS, {
    variables: { year: parseInt(year) },
    skip: !year,
  });

  if (loading) return <SelectorSkeleton width='w-48' />;
  if (error || !data?.schedule?.length)
    return <SelectorDisabled placeholder='Event' width='w-48' />;

  const items =
    data.schedule.map(({ location, event_name }) => ({
      label: event_name!,
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

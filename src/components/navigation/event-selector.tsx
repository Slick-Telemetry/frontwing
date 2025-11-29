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
import { Event_Format_Choices_Enum } from '@/types/graphql';

export const GET_NAV_EVENTS = graphql(`
  query GetNavEvents($year: Int!) @cached {
    schedule(order_by: { round_number: asc }, where: { year: { _eq: $year } }) {
      round_number
      event_name
      event_format
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
    data.schedule.map(({ round_number, event_name, event_format }) => ({
      label: (
        <span className='flex items-center gap-1'>
          <span>
            {round_number} | {event_name}
          </span>
          {event_format &&
          [
            Event_Format_Choices_Enum.Sprint,
            Event_Format_Choices_Enum.SprintShootout,
            Event_Format_Choices_Enum.SprintQualifying,
          ].includes(event_format as Event_Format_Choices_Enum) ? (
            <span className='inline-flex h-4 w-4 items-center justify-center rounded border border-yellow-400 text-[0.65rem] leading-none'>
              S
            </span>
          ) : null}
        </span>
      ),
      value: event_name!,
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

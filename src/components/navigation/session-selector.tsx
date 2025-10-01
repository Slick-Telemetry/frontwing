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

export const GET_NAV_SESSIONS = graphql(`
  query GetNavSessions($year: Int!, $event: String!) @cached {
    schedule(
      distinct_on: event_name
      where: { year: { _eq: $year }, event_name: { _eq: $event } }
      limit: 1
    ) {
      session1
      session2
      session3
      session4
      session5
    }
  }
`);

export function SessionSelector() {
  const { year, event, session } = useParams<{
    year: string;
    event?: string;
    session?: string;
  }>();
  const updateUrl = useUrlUpdater();

  const { data, loading, error } = useQuery(GET_NAV_SESSIONS, {
    variables: {
      year: parseInt(year),
      event: eventLocationDecode(event)!,
    },
    skip: !year || !event,
  });

  if (loading) return <SelectorSkeleton width='w-32' />;
  if (error || !data?.schedule?.[0])
    return <SelectorDisabled placeholder='Session' width='w-32' />;

  const eventDetails = data.schedule[0];
  const sessions = [
    eventDetails.session1,
    eventDetails.session2,
    eventDetails.session3,
    eventDetails.session4,
    eventDetails.session5,
  ].filter(Boolean) as string[];

  const items = sessions.map((s) => ({
    value: eventLocationEncode(s) as string,
    label: s.replace('_', ' '),
  }));

  return (
    <BaseSelector
      value={session}
      placeholder='Session'
      items={items}
      width='w-32'
      onChange={(val) => updateUrl('session', val)}
    />
  );
}

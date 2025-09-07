'use client';

import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

import { GET_EVENT_SCHEDULE } from '@/lib/queries';
import { eventLocationDecode, eventLocationEncode } from '@/lib/utils';
import useUrlUpdater from '@/hooks/use-url-updater';

import {
  BaseSelector,
  SelectorDisabled,
  SelectorSkeleton,
} from '@/components/navigation/selector';

import {
  GetEventScheduleQuery,
  GetEventScheduleQueryVariables,
} from '@/types/graphql';

export function SessionSelector() {
  const { year, event, session } = useParams<{
    year: string;
    event?: string;
    session?: string;
  }>();
  const updateUrl = useUrlUpdater();

  const { data, loading, error } = useQuery<
    GetEventScheduleQuery,
    GetEventScheduleQueryVariables
  >(GET_EVENT_SCHEDULE, {
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

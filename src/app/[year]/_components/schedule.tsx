'use client';
import { useQuery } from '@apollo/client/react';

import { GET_SEASON_EVENTS } from '@/lib/queries';
import { getTodayMidnightUTC } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

import { CheckboxToggle } from '@/components/Checkbox';
import { FullHeightLoader } from '@/components/Loader';
import { ServerPageError } from '@/components/ServerError';
import { Separator } from '@/components/ui/separator';

import NotFound from '@/app/not-found';

import { ScheduleEventItem } from './schedule-event';

import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
} from '@/types/graphql';

export function Schedule({ year }: { year: string }) {
  const [showSessions, setShowSessions] = useLocalStorage(
    'showSessions',
    false,
  );
  const [trackTime, setTrackTime] = useLocalStorage('trackTime', false);

  const { loading, error, data } = useQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
  });

  if (loading) return <FullHeightLoader />;
  if (error) return <ServerPageError />;
  if (!data?.schedule?.some((e) => e.event_name)) return <NotFound />;

  const now = getTodayMidnightUTC();
  const nextEvent = data.schedule.find(
    (evt) => new Date(evt.event_date as string) > new Date(now),
  );

  return (
    <>
      <div className='flex items-end justify-between'>
        <h1 className='text-4xl font-extrabold tracking-tight text-balance'>
          {year} Schedule
        </h1>
        <div className='flex items-center gap-2'>
          <CheckboxToggle
            toggle={() => setShowSessions((v) => !v)}
            checked={showSessions}
          >
            Show Sessions
          </CheckboxToggle>
          <Separator
            orientation='vertical'
            className='mx-2 data-[orientation=vertical]:h-4'
          />
          <CheckboxToggle
            toggle={() => setTrackTime((v) => !v)}
            checked={trackTime}
          >
            Track Time
          </CheckboxToggle>
        </div>
      </div>

      <ul className='grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {data.schedule.map((event) => (
          <ScheduleEventItem
            key={event.event_name as string}
            next={nextEvent?.round_number}
            trackTime={trackTime}
            details={showSessions}
            {...event}
          />
        ))}
      </ul>
    </>
  );
}

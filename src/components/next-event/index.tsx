'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';

import { GET_NEXT_EVENT } from '@/lib/queries';
import {
  eventLocationEncode,
  getCountryFlagByCountryName,
  getTodayMidnightUTC,
} from '@/lib/utils';

import { CircuitMap } from '@/components/circuit-map';
import { Countdown } from '@/components/countdown';
import { NextEventSkeleton } from '@/components/next-event/skeleton';
import { SprintBadge } from '@/components/sprint-badge';

import {
  Event_Format_Choices_Enum,
  GetNextEventQuery,
  GetNextEventQueryVariables,
} from '@/types/graphql';

const scheduleSessionKeys = [
  'session5_date_utc',
  'session4_date_utc',
  'session3_date_utc',
  'session2_date_utc',
  'session1_date_utc',
] as const;

export default function NextEvent() {
  const midnight = getTodayMidnightUTC();
  const { loading, data, error } = useQuery<
    GetNextEventQuery,
    GetNextEventQueryVariables
  >(GET_NEXT_EVENT, {
    variables: { today: midnight },
  });

  if (loading) return <NextEventSkeleton />;

  const nextEvent = data?.schedule?.[0];
  const lastSession = scheduleSessionKeys
    .map((key) => nextEvent?.[key])
    .find(Boolean);

  const isValidEvent =
    !error &&
    nextEvent &&
    lastSession &&
    new Date(lastSession) >= new Date(midnight);

  if (!isValidEvent) return null;

  return (
    <div className='grid items-center justify-center gap-4 lg:grid-cols-2'>
      <div className='flex w-fit flex-col rounded-lg py-4 lg:w-[250px] xl:w-[300px]'>
        {/* Subtitle */}
        <div className='flex justify-between gap-4'>
          <p className='text-accent text-sm font-light uppercase'>Next Race</p>
          {nextEvent.event_format && (
            <SprintBadge
              format={nextEvent.event_format as Event_Format_Choices_Enum}
            />
          )}
        </div>

        {/* Title */}
        <h2 className='text-2xl'>
          <Link
            className='line-clamp-1 text-inherit hover:underline'
            href={`/${nextEvent.year}/${eventLocationEncode(nextEvent?.location)}`}
            data-cy='next-event-name'
          >
            {[nextEvent.round_number, nextEvent.event_name]
              .filter(Boolean)
              .join('. ')}
          </Link>
        </h2>

        {/* Flag && Location */}
        <div className='flex items-center gap-2'>
          <div className='border-foreground flex h-4 w-full max-w-7 items-center justify-center overflow-hidden rounded border text-3xl'>
            {nextEvent.country &&
              getCountryFlagByCountryName(nextEvent.country)}
          </div>
          <p className='line-clamp-1 text-sm'>
            {nextEvent.location}, {nextEvent.country}
          </p>
        </div>

        {/* Coundown */}
        {lastSession && (
          <>
            <hr className='border-foreground mt-2 mb-4' />
            <Countdown targetDate={lastSession} data-cy='countdown-timer' />
          </>
        )}
      </div>

      {nextEvent.location && nextEvent.country && (
        <CircuitMap location={nextEvent.location} country={nextEvent.country} />
      )}
    </div>
  );
}

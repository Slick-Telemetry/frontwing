'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { GET_NEXT_EVENT } from '@/lib/queries';
import { eventLocationEncode, getCountryFlagByCountryName } from '@/lib/utils';

import { CircuitMap } from '@/components/CircuitMap';
import { Countdown } from '@/components/Countdown';
import { EventTypeBadge } from '@/components/EventTypeBadge';

import {
  Event_Format_Choices_Enum,
  GetNextEventQuery,
  GetNextEventQueryVariables,
} from '@/generated/types';

const sessionKeys = [
  'session5_date_utc',
  'session4_date_utc',
  'session3_date_utc',
  'session2_date_utc',
  'session1_date_utc',
] as const;

const getTodayMidnightUTC = () => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  return now.toISOString(); // Convert to ISO 8601 format
};

export default function NextEvent() {
  const midnight = getTodayMidnightUTC();
  const { loading, data, error } = useQuery<
    GetNextEventQuery,
    GetNextEventQueryVariables
  >(GET_NEXT_EVENT, {
    variables: { today: midnight },
  });

  if (loading)
    return (
      <div className='mx-auto flex w-[350px] animate-pulse flex-col items-center justify-center gap-1'>
        {/* <Loader /> */}
        <div className='bg-muted size-8 w-full rounded'></div>
        <div className='bg-muted size-8 w-full rounded'></div>
        <div className='my-2 flex w-full justify-evenly'>
          <div className='bg-muted size-12 animate-pulse rounded'></div>
          <div className='bg-muted size-12 animate-pulse rounded'></div>
          <div className='bg-muted size-12 animate-pulse rounded'></div>
          <div className='bg-muted size-12 animate-pulse rounded'></div>
        </div>
      </div>
    );

  const midnightDate = new Date(midnight);
  const nextEvent = data?.schedule?.[0];
  const lastSession = sessionKeys
    .map((key) => nextEvent?.[key])
    .find((date) => Boolean(date));

  if (
    error ||
    !nextEvent ||
    !lastSession ||
    new Date(lastSession) < midnightDate
  ) {
    return null;
  }

  return (
    <div className='flex gap-4'>
      <div className='flex w-fit max-w-[300px] flex-col rounded-lg'>
        {/* Subtitle */}
        <div className='flex justify-between gap-4'>
          <p className='text-accent text-sm font-light uppercase'>Next Race</p>
          {nextEvent.event_format && (
            <EventTypeBadge
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

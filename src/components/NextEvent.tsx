'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';

import { GET_NEXT_EVENT } from '@/lib/queries';
import {
  eventLocationEncode,
  getCountryFlagByCountryName,
  getTodayMidnightUTC,
} from '@/lib/utils';

import { CircuitMap } from '@/components/CircuitMap';
import { Countdown } from '@/components/Countdown';
import { EventTypeBadge } from '@/components/EventTypeBadge';

import {
  Event_Format_Choices_Enum,
  GetNextEventQuery,
  GetNextEventQueryVariables,
} from '@/generated/types';

const scheduleSessionKeys = [
  'session5_date_utc',
  'session4_date_utc',
  'session3_date_utc',
  'session2_date_utc',
  'session1_date_utc',
] as const;

function NextEventSkeleton() {
  return (
    <div className='mx-auto flex w-[300px] animate-pulse flex-col justify-center gap-2 py-4'>
      <p className='text-accent text-sm font-light uppercase'>Next Race</p>

      <div className='bg-muted size-6 w-full rounded' />
      <div className='bg-muted size-6 w-full rounded' />
      <div className='border-foreground flex w-full justify-evenly border-t py-4'>
        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
          <div key={unit} className='flex flex-col items-center justify-center'>
            <div className='bg-muted size-8 animate-pulse rounded' />
            <p className='font-space-grotesk text-xs leading-6 font-bold uppercase'>
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className='flex items-center justify-center gap-4'>
      <div className='flex w-[300px] flex-col rounded-lg py-8'>
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

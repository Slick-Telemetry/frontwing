'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { GET_NEXT_EVENT } from '@/lib/queries';
import { eventLocationEncode, getCountryFlagByCountryName } from '@/lib/utils';

import { EventTypeBadge } from '@/components/EventTypeBadge';

import {
  Event_Format_Choices_Enum,
  GetNextEventQuery,
  GetNextEventQueryVariables,
} from '@/generated/types';

const getTodayMidnightUTC = () => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  return now.toISOString(); // Convert to ISO 8601 format
};

const NextEvent = () => {
  const { loading, data, error } = useQuery<
    GetNextEventQuery,
    GetNextEventQueryVariables
  >(GET_NEXT_EVENT, {
    variables: { today: getTodayMidnightUTC() },
  });

  if (loading)
    return (
      <div className='mx-auto flex w-[350px] animate-pulse flex-col items-center justify-center gap-1'>
        {/* <Loader /> */}
        <div className='size-8 w-full rounded bg-gray-700'></div>
        <div className='size-8 w-full rounded bg-gray-700'></div>
        <div className='my-2 flex w-full justify-evenly'>
          <div className='size-12 animate-pulse rounded bg-gray-700'></div>
          <div className='size-12 animate-pulse rounded bg-gray-700'></div>
          <div className='size-12 animate-pulse rounded bg-gray-700'></div>
          <div className='size-12 animate-pulse rounded bg-gray-700'></div>
        </div>
      </div>
    );
  if (error || !data?.schedule[0]) return <></>;

  const nextEvent = data.schedule[0];

  // If session5_date_utc is older than today midnight UTC, don't show the event
  if (
    nextEvent.session5_date_utc &&
    new Date(nextEvent.session5_date_utc) < new Date(getTodayMidnightUTC())
  ) {
    return <></>;
  }

  return (
    <div className='mx-auto flex w-fit flex-col rounded-lg p-2'>
      {nextEvent.event_format && (
        <EventTypeBadge
          format={nextEvent.event_format as Event_Format_Choices_Enum}
        />
      )}
      <div>
        <h2 className='text-2xl font-black'>
          <Link
            className='hover:underline'
            href={`/${nextEvent.year}/${eventLocationEncode(nextEvent?.location)}`}
            data-cy='next-event-name'
          >
            {nextEvent.event_name}{' '}
            {nextEvent.country &&
              getCountryFlagByCountryName(nextEvent.country)}
          </Link>
        </h2>
        {nextEvent.session5_date_utc && (
          <p>
            {
              // Use user locale to format the date
              new Date(nextEvent.session5_date_utc).toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })
            }
          </p>
        )}
      </div>
      <hr className='mt-2 mb-4' />
      {nextEvent.session5_date_utc && (
        <Countdown targetDate={nextEvent.session5_date_utc} />
      )}
    </div>
  );
};

const Countdown = ({ targetDate }: { targetDate: string | Date }) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - now.getTime(); // Difference in milliseconds

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      day: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hour: Math.floor((diff / (1000 * 60 * 60)) % 24),
      min: Math.floor((diff / (1000 * 60)) % 60),
      sec: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [calculateTimeLeft]);

  return (
    <div className='grid w-full grid-cols-4 gap-2'>
      {Object.keys(timeLeft).map((key) => (
        <Digit
          key={key}
          time={timeLeft[key as keyof typeof timeLeft] ?? 0}
          name={key}
        />
      ))}
    </div>
  );
};

const Digit = ({ time, name }: { time: number; name: string }) => {
  return (
    <div className='grid w-[64px] text-center'>
      <p className='font-mono text-2xl leading-6'>{time}</p>
      <p className='text-xs leading-6 uppercase'>
        {name}
        {time > 1 && 's'}
      </p>
    </div>
  );
};

export default NextEvent;

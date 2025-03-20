'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { use, useCallback, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import { ServerPageError } from '@/components/ServerError';
import { SessionTime } from '@/components/SessionTime';

import { SeasonEvent } from '@/generated/customTypes';
import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
} from '@/generated/types';

const SeasonPage = ({ params }: { params: Promise<{ year: string }> }) => {
  const { year } = use(params);
  const [showSessions, setShowSessions] = useState(false);

  const { loading, error, data } = useQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
  });

  const toggleSessions = useCallback(() => {
    setShowSessions((prev) => !prev);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <ServerPageError />;

  return (
    <div className='container'>
      <h1 className='text-4xl font-black'>{year} Season</h1>
      <SessionToggle toggleSessions={toggleSessions} />

      <div className='my-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {data?.events.map((event) => (
          <EventContainer key={event.id} event={event}>
            {showSessions &&
              event.sessions.map((session) => (
                <SessionTime
                  key={session.id}
                  id={session.id}
                  time={session?.scheduled_start_time_utc}
                  name={session?.name}
                />
              ))}
          </EventContainer>
        ))}
      </div>
    </div>
  );
};

const EventContainer = ({
  event,
  children,
}: {
  event: SeasonEvent;
  children: React.ReactNode;
}) => {
  return (
    <div className='border-accent-foreground overflow-hidden rounded border p-4'>
      <div className='relative flex items-center justify-between'>
        {/* <FloatingNumber className='-left-8'>
          {event.round_number}
        </FloatingNumber> */}
        <div>
          {event.date && (
            <p className='text-sm'>
              {new Date(event.date).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
          <Link
            href={'/event/' + event.id}
            className='text-xl font-black hover:underline'
          >
            {event.name?.replace('Grand Prix', 'GP')}
          </Link>
          <p className='text-xs'>
            {event.location}, {event.country}
          </p>
        </div>
        {/* <div className='text-sm text-right'> */}
        {/* </div> */}
      </div>
      {children}
    </div>
  );
};

const SessionToggle = ({ toggleSessions }: { toggleSessions: () => void }) => {
  return (
    <div className='my-4 flex items-center rounded-lg border p-4'>
      <input
        onChange={toggleSessions}
        id='sessions-checkbox'
        type='checkbox'
        className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600'
      />
      <label htmlFor='sessions-checkbox' className='ms-2 text-sm font-medium'>
        Show Sessions
      </label>
    </div>
  );
};

export default SeasonPage;

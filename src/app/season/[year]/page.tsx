'use client';

import { useQuery } from '@apollo/client';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useCallback, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import { FloatingNumber } from '@/components/FloatingNumber';
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
      <h1 className='font-mono text-4xl'>{year} Season</h1>
      <SessionToggle toggleSessions={toggleSessions} />

      <div className='my-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {data?.events.map((event) => (
          <EventContainer key={event.id} event={event}>
            {showSessions &&
              event.sessions.map((session) => (
                <SessionContainer key={session.id} id={session.id}>
                  <SessionTime
                    id={session.id}
                    time={session?.scheduled_start_time_utc}
                    name={session?.name}
                  />
                </SessionContainer>
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
    <div className='overflow-hidden rounded-lg border border-r-4 border-b-4 border-current p-4'>
      <div className='relative flex items-center justify-between'>
        <FloatingNumber className='-left-8'>
          {event.round_number}
        </FloatingNumber>
        <Link
          href={'/event/' + event.id}
          className='text-3xl font-semibold hover:underline'
        >
          {event.name?.replace('Grand Prix', 'GP')}
        </Link>
        <div className='text-right text-sm'>
          <p>{moment(event.date).local().format('LL')}</p>
          <p>
            {event.location}, {event.country}
          </p>
        </div>
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

const SessionContainer = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <div
      className='mt-4 flex items-center gap-4 overflow-hidden rounded-xl border hover:border-current'
      onClick={() => router.push('/session/' + id)}
    >
      {children}
    </div>
  );
};

export default SeasonPage;

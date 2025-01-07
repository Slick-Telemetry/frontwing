'use client';

import { useQuery } from '@apollo/client';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

import { GET_SEASON_EVENTS } from '@/lib/queries';

import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
} from '@/generated/types';

const SeasonPage = ({ params }: { params: Promise<{ year: string }> }) => {
  const { year } = use(params);
  const [showSessions, setShowSessions] = useState(false);
  const router = useRouter();

  const { loading, error, data } = useQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GET_SEASON_EVENTS, {
    variables: { year: parseInt(year) },
  });

  const toggleSessions = () => {
    setShowSessions(!showSessions);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='container'>
      <h1 className='font-mono text-4xl'>{year} Season</h1>
      <div className='my-4 flex items-center rounded-lg border p-4'>
        <input
          onChange={toggleSessions}
          id='sessions-checkbox'
          type='checkbox'
          value=''
          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600'
        />
        <label htmlFor='sessions-checkbox' className='ms-2 text-sm font-medium'>
          Show Sessions
        </label>
      </div>
      <div className='my-4 grid grid-cols-2 gap-4 xl:grid-cols-3'>
        {data?.events.map((event) => (
          <div
            key={event.name}
            className='rounded-lg border border-b-4 border-r-4 border-current p-4'
          >
            <div className='relative flex items-center justify-between py-2'>
              <div className='absolute left-2 text-8xl font-bold italic opacity-25'>
                {event.round_number}
              </div>
              <Link
                href={'/event/' + event.id}
                className='text-3xl font-semibold hover:underline'
              >
                {event.name && event.name.replace('Grand Prix', 'GP')}
              </Link>
              <div className='text-right text-sm'>
                <p>{moment(event.date).local().format('LL')}</p>
                <p>
                  {event.location}, {event.country}
                </p>
              </div>
            </div>
            {showSessions &&
              event.sessions.map((session) => (
                <div
                  className='mt-4 flex items-center gap-4 overflow-hidden rounded-xl border hover:border-current'
                  key={session.name}
                  onClick={() => router.push('/session/' + session.id)}
                >
                  <div className='flex min-w-16 flex-col items-center bg-gray-300 p-2 dark:bg-gray-600'>
                    <p className='text-xs'>
                      {moment(session.scheduled_start_time_utc)
                        .local()
                        .format('ddd')}
                    </p>
                    <p className='text-2xl font-extrabold leading-6'>
                      {moment(session.scheduled_start_time_utc)
                        .local()
                        .format('D')}
                    </p>
                    <p className='text-xs'>
                      {moment(session.scheduled_start_time_utc)
                        .local()
                        .format('MMM')}
                    </p>
                  </div>
                  <div>
                    <p className='font-mono text-sm'>
                      {moment(session.scheduled_start_time_utc)
                        .local()
                        .format('LT')}
                    </p>
                    <p className='text-2xl font-semibold'>{session.name}</p>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonPage;

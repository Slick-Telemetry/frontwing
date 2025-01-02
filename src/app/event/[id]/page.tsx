'use client';

import { useQuery } from '@apollo/client';
import moment from 'moment';
import { use } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';

import { Button } from '@/components/ui/button';

import {
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables,
} from '@/generated/types';

const formatTime = (time: string) => {
  return moment(time).format('LT');
};

const EventPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { loading, data } = useQuery<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  >(GET_EVENT_DETAILS, {
    variables: { _id: id },
  });

  const event = loading ? null : data?.events[0];

  return (
    <div className='container'>
      {event && (
        <>
          <div className='relative mb-4 flex items-end justify-between'>
            <div className='absolute right-2 text-6xl font-bold italic opacity-25 group-hover:text-white dark:group-hover:text-black'>
              ROUND {event.round_number}
            </div>

            <h1 className='w-3/5 text-4xl font-semibold'>
              {event.official_name}
            </h1>
            <p className='text-xl'>
              {event.location}, {event.country}
            </p>
          </div>

          {event.sessions.map((session) => (
            <div
              className='mt-4 flex items-center justify-between gap-4 divide-x divide-current overflow-hidden rounded-xl border pr-4 hover:border-current'
              key={session.name}
              // onClick={() => router.push('/session/' + session.id)}
            >
              <div className='flex items-center gap-4'>
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
                <div className='min-w-36'>
                  <p className='font-mono text-sm'>
                    {moment(session.scheduled_start_time_utc)
                      .utc()
                      .format('LT')}
                  </p>
                  <p className='text-2xl font-semibold'>{session.name}</p>
                </div>
              </div>
              <div className='pl-4'>
                <p className='text-sm'>Chequered Flag:</p>
                <p className='text-xl'>
                  {formatTime(
                    session.race_control_messages.findLast(
                      (msg) => msg.flag === 'CHEQUERED',
                    )?.time || '',
                  )}
                </p>
              </div>
              <div className='flex gap-4 pl-4'>
                <Button variant='outline'>Results</Button>
                <Button variant='outline'>Lap Charts</Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EventPage;

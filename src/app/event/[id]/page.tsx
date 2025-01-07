'use client';

import { useQuery } from '@apollo/client';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';

import { Button, buttonVariants } from '@/components/ui/button';

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
            <div className='absolute bottom-2 right-2 text-6xl font-bold italic opacity-25 group-hover:text-white dark:group-hover:text-black'>
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
              className='mt-4 flex flex-wrap items-center justify-between gap-x-4 overflow-hidden rounded-xl border hover:border-current'
              key={session.scheduled_start_time_utc}
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
                  <Link
                    href={`/session/${session.id}`}
                    className='text-2xl font-semibold hover:underline'
                  >
                    {session.name}
                  </Link>
                </div>
              </div>
              <div className='px-4'>
                <p className='text-sm'>Chequered Flag:</p>
                <p className='text-xl'>
                  {formatTime(
                    session.race_control_messages.findLast(
                      (msg) => msg.flag === 'CHEQUERED',
                    )?.time || '',
                  )}
                </p>
              </div>
              <div className='flex gap-4 px-4'>
                <Link
                  href={`/session/${session.id}`}
                  className={buttonVariants({ variant: 'outline' })}
                >
                  Results
                </Link>
                <Button variant='outline'>Lap Charts</Button>
              </div>

              <div className='grid basis-full grid-cols-10 gap-2 border-t p-2'>
                {session.driver_sessions.map((ds) => (
                  <div
                    key={ds.driver?.full_name}
                    className='flex flex-col items-center justify-between text-center'
                  >
                    {ds.driver?.headshot_url && (
                      <Image
                        src={ds.driver?.headshot_url}
                        width={60}
                        height={60}
                        alt={ds.driver?.full_name || ''}
                      />
                    )}
                    <h3 className='font-semibold'>{ds.driver?.abbreviation}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default EventPage;

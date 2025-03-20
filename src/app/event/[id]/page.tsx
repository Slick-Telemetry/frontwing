'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { use, useMemo } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';

import { FloatingNumber } from '@/components/FloatingNumber';
import { ServerPageError } from '@/components/ServerError';
import { Button, buttonVariants } from '@/components/ui/button';

import {
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables,
} from '@/generated/types';

import circuit from '../../../../public/Bahrain_carbon.png';

const EventPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const { loading, data, error } = useQuery<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  >(GET_EVENT_DETAILS, {
    variables: { _id: id },
  });

  const event = useMemo(
    () => (loading ? null : data?.events[0]),
    [loading, data],
  );

  if (error) return <ServerPageError msg='Failed to load event details.' />;

  if (!event)
    return loading ? (
      <p>Loading...</p>
    ) : (
      <ServerPageError msg='Event not found.' />
    );

  return (
    <div className='container mt-8'>
      {/* Header */}
      <header className=''>
        <Image src={circuit} alt='' className='max-w-[300px]' />
        <div className='relative mb-4 flex items-end justify-between'>
          <FloatingNumber className='right-2 bottom-2'>
            ROUND {event.round_number}
          </FloatingNumber>

          <h1 className='w-4/5 text-2xl font-black lg:text-6xl'>
            {event.official_name?.replace(/[0-9]/g, '')}
          </h1>
          <p className='text-right lg:text-xl'>
            {event.location}, {event.country}
          </p>
        </div>
      </header>

      <main className='grid divide-y'>
        {/* Sessions */}
        {event.sessions.map((session) => (
          <EventSession key={session.id} session={session} />
        ))}
      </main>
    </div>
  );
};

const EventSession = ({
  session,
}: {
  session: GetEventDetailsQuery['events'][number]['sessions'][number];
}) => {
  const chequered =
    session.race_control_messages.findLast((msg) => msg.flag === 'CHEQUERED')
      ?.time || '';
  return (
    <div
      className='grid items-center gap-4 py-4 lg:grid-cols-2 lg:justify-between'
      key={session.scheduled_start_time_utc}
    >
      <div className='w-full'>
        <div className='flex items-center gap-4'>
          <div className='mr-auto'>
            {session.scheduled_start_time_utc && (
              <p>
                {new Date(session.scheduled_start_time_utc).toLocaleString(
                  undefined,
                  { month: 'long', day: 'numeric', year: 'numeric' },
                )}
              </p>
            )}
            <h2 className='text-4xl font-black'>
              {session.name?.replace(/_/g, ' ')}
            </h2>
          </div>
          <Link
            href={`/session/${session.id}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            Results
          </Link>
          <Button variant='outline'>Lap Charts</Button>
        </div>
        <div className='my-2 grid grid-cols-2 divide-x rounded border'>
          {session.scheduled_start_time_utc && (
            <p className='p-2'>
              Scheduled Start:{' '}
              {new Date(session.scheduled_start_time_utc).toLocaleString(
                undefined,
                { hour: 'numeric', minute: 'numeric', hour12: true },
              )}
            </p>
          )}
          {chequered && (
            <p className='p-2'>
              Chequered Flag:{' '}
              {new Date(chequered).toLocaleString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          )}
        </div>
      </div>

      {/* Driver Grid */}
      <div className='w-full'>
        <h3 className='text-center text-xl font-black'>Drivers</h3>
        <div className='grid basis-full grid-cols-10 gap-2 p-2'>
          {session.driver_sessions.slice(0, 20).map(({ driver }) => (
            <DriverHeadshot key={driver?.full_name} driver={driver} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DriverHeadshot = ({
  driver,
}: {
  driver: GetEventDetailsQuery['events'][0]['sessions'][0]['driver_sessions'][0]['driver'];
}) => {
  const { headshot_url, abbreviation } = driver || {};
  return (
    <div className='flex flex-col items-center justify-between text-center'>
      {headshot_url && (
        <Image
          src={headshot_url}
          width={60}
          height={60}
          alt={abbreviation || ''}
        />
      )}
      <h3 className='font-semibold'>{abbreviation}</h3>
    </div>
  );
};

export default EventPage;

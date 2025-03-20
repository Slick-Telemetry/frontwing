'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { use, useMemo } from 'react';

import { GET_EVENT_DETAILS } from '@/lib/queries';

import { FloatingNumber } from '@/components/FloatingNumber';
import { ServerPageError } from '@/components/ServerError';
import { SessionTime } from '@/components/SessionTime';
import { Button, buttonVariants } from '@/components/ui/button';

import {
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables,
} from '@/generated/types';

const formatTime = (time: string) => {
  return new Date(time).toLocaleString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

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
    <div className='container'>
      {/* Header */}
      <div className='relative mb-4 flex items-end justify-between'>
        <FloatingNumber className='right-2 bottom-2 group-hover:text-white dark:group-hover:text-black'>
          ROUND {event.round_number}
        </FloatingNumber>

        <h1 className='w-3/5 text-4xl font-semibold'>{event.official_name}</h1>
        <p className='text-xl'>
          {event.location}, {event.country}
        </p>
      </div>

      {event.sessions.map((session) => (
        <EventSession key={session.id} session={session} />
      ))}
    </div>
  );
};

const EventSession = ({
  session,
}: {
  session: GetEventDetailsQuery['events'][number]['sessions'][number];
}) => {
  return (
    <div
      className='mt-4 flex flex-wrap items-center justify-between gap-x-4 overflow-hidden rounded-xl border hover:border-current'
      key={session.scheduled_start_time_utc}
    >
      <div className='flex items-center gap-4'>
        <SessionTime
          id={session.id}
          time={session?.scheduled_start_time_utc}
          name={session?.name}
        />
      </div>

      {/* Endtime */}
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

      {/* Calls to Action */}
      <div className='flex gap-4 px-4'>
        <Link
          href={`/session/${session.id}`}
          className={buttonVariants({ variant: 'outline' })}
        >
          Results
        </Link>
        <Button variant='outline'>Lap Charts</Button>
      </div>

      {/* Driver Grid */}
      <div className='grid basis-full grid-cols-10 gap-2 border-t p-2'>
        {session.driver_sessions.map(({ driver }) => (
          <DriverHeadshot key={driver?.full_name} driver={driver} />
        ))}
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

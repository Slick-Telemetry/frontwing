'use client';

import { Flag } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { formatDuration } from '@/lib/helpers';

import { GetEventDetailsV2Query } from '@/generated/types';

const fastestLapFinder = (
  type: string,
  sessions:
    | GetEventDetailsV2Query['events'][number]['competition'][number]['driver_sessions']
    | GetEventDetailsV2Query['events'][number]['qualifying'][number]['driver_sessions']
    | GetEventDetailsV2Query['events'][number]['practices'][number]['driver_sessions'],
) => {
  switch (type) {
    case 'competition':
      return (
        sessions as GetEventDetailsV2Query['events'][number]['competition'][number]['driver_sessions']
      )[0].results[0].classified_position;
    case 'qualifying':
      return (
        sessions as GetEventDetailsV2Query['events'][number]['qualifying'][number]['driver_sessions']
      )[0].results[0].finishing_position;
    default:
      return (
        sessions as GetEventDetailsV2Query['events'][number]['practices'][number]['driver_sessions']
      )[0].fastest_lap[0].lap_time;
  }
};

const findSessionType = (sessionName: string) => {
  switch (sessionName) {
    case 'Sprint_Shootout':
    case 'Sprint_Qualifying':
    case 'Qualifying':
      return 'qualifying';

    case 'Practice_1':
    case 'Practice_2':
    case 'Practice_3':
      return 'practice';

    case 'Sprint':
    case 'Race':
      return 'competition';

    default:
      return 'unknown';
  }
};

export const EventSession = ({
  session,
  grid,
}: {
  grid: boolean;
  session: GetEventDetailsV2Query['events'][number][
    | 'competition'
    | 'qualifying'
    | 'practices'][number];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const sessionType = findSessionType(session.name || '');
  const fastestLap = fastestLapFinder(sessionType, session.driver_sessions);
  const startTime = session.scheduled_start_time_utc;
  const chequered =
    session.race_control_messages.findLast((msg) => msg.flag === 'CHEQUERED')
      ?.time || '';

  const driverSessions =
    sessionType !== 'practice'
      ? session.driver_sessions
      : (
          [
            ...session.driver_sessions,
          ] as GetEventDetailsV2Query['events'][number]['practices'][number]['driver_sessions']
        ).sort((a, b) => {
          return (
            Number(a.fastest_lap[0]?.lap_time || 0) -
            Number(b.fastest_lap[0]?.lap_time || 0)
          );
        });

  return (
    <div className='rounded border' key={startTime}>
      <div className='bg-secondary text-secondary-foreground flex w-full items-center justify-between p-4 py-2'>
        <div>
          <h2
            onClick={() =>
              router.push(`${pathname}/${session.name?.toLowerCase()}`)
            }
            className='mr-auto text-2xl font-black hover:underline'
          >
            {session.name?.replace(/_/g, ' ')}
          </h2>
          <p>Fastest Lap: {formatDuration(Number(fastestLap))}</p>
        </div>
        <div className='text-right'>
          {startTime && (
            <p>
              {new Date(startTime).toLocaleString(undefined, {
                timeZone: 'UTC',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
          <div className='grid grid-cols-2 gap-2'>
            {startTime && (
              <p>
                <Flag className='inline size-4 fill-green-600' />
                {new Date(startTime).toLocaleString(undefined, {
                  timeZone: 'UTC',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
            )}
            {chequered && (
              <p>
                <Flag className='inline size-4 fill-gray-200' />
                {new Date(chequered).toLocaleString(undefined, {
                  timeZone: 'UTC',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Driver Grid */}
      {grid && (
        <div className='grid flex-1 grid-flow-col grid-cols-10 grid-rows-2 gap-y-2 p-2'>
          {driverSessions.map(({ driver }, index) => (
            <DriverHeadshot
              driver={driver}
              position={index + 1}
              key={driver?.full_name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DriverHeadshot = ({
  driver,
  position,
}: {
  driver: GetEventDetailsV2Query['events'][0][
    | 'competition'
    | 'qualifying'
    | 'practices'][0]['driver_sessions'][0]['driver'];
  position: number;
}) => {
  const { headshot_url, abbreviation } = driver || {};
  return (
    <div className='border-muted flex items-center border-l-2 pl-1 text-center even:ml-4'>
      <p className='text-xl opacity-50'>{position}</p>
      <p className='ml-1 text-sm'>{abbreviation}</p>
      {headshot_url && (
        <Image
          src={headshot_url}
          width={30}
          height={30}
          alt={abbreviation || ''}
        />
      )}
    </div>
  );
};

'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { formatDuration } from '@/lib/helpers';
import { eventLocationEncode } from '@/lib/utils';

import { GetEventDetailsQuery } from '@/generated/types';

const fastestLapFinder = (
  type: string,
  sessions:
    | GetEventDetailsQuery['events'][number]['competition'][number]['driver_sessions']
    | GetEventDetailsQuery['events'][number]['qualifying'][number]['driver_sessions']
    | GetEventDetailsQuery['events'][number]['practices'][number]['driver_sessions'],
) => {
  switch (type) {
    case 'competition':
      return (
        sessions as GetEventDetailsQuery['events'][number]['competition'][number]['driver_sessions']
      )[0].results[0].classified_position;
    case 'qualifying':
      return (
        sessions as GetEventDetailsQuery['events'][number]['qualifying'][number]['driver_sessions']
      )[0].results[0].finishing_position;
    default:
      return (
        sessions as GetEventDetailsQuery['events'][number]['practices'][number]['driver_sessions']
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
  name,
  time,
  children,
}: {
  name: string;
  time: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='rounded border' key={time}>
      <div className='bg-secondary text-secondary-foreground flex w-full items-center justify-between p-4 py-2'>
        <div>
          <h2
            onClick={() =>
              router.push(`${pathname}/${eventLocationEncode(name)}`)
            }
            className='mr-auto text-2xl font-black hover:underline'
          >
            {name?.replace(/_/g, ' ')}
          </h2>
        </div>
        <div className='text-right'>
          {time && (
            <p>
              {/* <Flag className='inline size-4 fill-green-600' /> */}
              {new Date(time).toLocaleString(undefined, {
                timeZone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          )}
          {time && (
            <p>
              {new Date(time).toLocaleString(undefined, {
                timeZone: 'UTC',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {/* Driver Grid */}
      {children}
    </div>
  );
};

export const SessionProvisionalGrid = ({
  session,
}: {
  session: GetEventDetailsQuery['events'][number][
    | 'competition'
    | 'qualifying'
    | 'practices'][number];
}) => {
  const sessionType = findSessionType(session?.name || '');
  const fastestLap = fastestLapFinder(sessionType, session.driver_sessions);

  const driverSessions =
    sessionType !== 'practice'
      ? session.driver_sessions
      : (
          [
            ...session.driver_sessions,
          ] as GetEventDetailsQuery['events'][number]['practices'][number]['driver_sessions']
        ).sort((a, b) => {
          return (
            Number(a.fastest_lap[0]?.lap_time || 0) -
            Number(b.fastest_lap[0]?.lap_time || 0)
          );
        });

  return (
    <div className='p-2'>
      <p className='mb-2'>Fastest Lap: {formatDuration(Number(fastestLap))}</p>

      {/* Driver Grid */}
      <div className='grid flex-1 grid-flow-col grid-cols-10 grid-rows-2 gap-y-2'>
        {driverSessions.map(({ driver }, index) => (
          <DriverHeadshot
            key={driver?.abbreviation || driver?.full_name}
            driver={driver}
            position={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export const SkeletonProvisionalGrid = () => {
  return (
    <div className='animate-pulse overflow-hidden p-2'>
      <div className='mb-2 size-6 w-full rounded bg-gray-200'></div>
      <div className='grid w-full flex-1 grid-flow-col grid-cols-10 grid-rows-2 gap-y-2'>
        {Array.from({ length: 20 }).map(() => (
          <div key='placeholder' className='rounde w-full pr-4 pl-1 even:ml-4'>
            <div className='size-7 w-full rounded bg-gray-200'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DriverHeadshot = ({
  driver,
  position,
}: {
  driver: GetEventDetailsQuery['events'][0][
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  eventLocationEncode,
  fastestLapFinder,
  findSessionType,
  formatLapTime,
  sortFastestLaps,
  sortQuali,
} from '@/lib/utils';

import { Toggle } from '@/components/toggle';

import { GetEventDetailsQuery } from '@/types/graphql';

export const EventSession = ({
  name,
  time,
  children,
}: {
  name: string;
  time: string;
  children: React.ReactNode;
}) => {
  const [showGrid, setShowGrid] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(`showGrid-${time}`);
      return storedValue === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`showGrid-${time}`, String(showGrid));
    }
  }, [showGrid, time]);
  const pathname = usePathname();

  const url = `${pathname}/${eventLocationEncode(name)}`;

  return (
    <div className='rounded border' key={time}>
      <Link
        href={url}
        className='bg-secondary text-secondary-foreground flex w-full cursor-pointer items-center justify-between p-4 py-2'
      >
        <div>
          <h2 className='mr-auto text-2xl font-black hover:underline'>
            {name?.replace(/_/g, ' ')}
          </h2>
        </div>
        <div className='text-right'>
          {time && (
            <p>
              {/* <Flag className='inline size-4 fill-green-600' /> */}
              {new Date(time).toLocaleString(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          )}
          {time && (
            <p>
              {new Date(time).toLocaleString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </Link>
      {time && new Date(time) < new Date() && (
        <div className='m-2'>
          <label className='flex items-center gap-2'>
            <Toggle
              id='show-grid'
              toggle={() => setShowGrid((prev) => !prev)}
              checked={showGrid}
            >
              Show Provisional Results
            </Toggle>
          </label>
        </div>
      )}
      {/* Driver Grid */}
      {showGrid && children}
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

  let driverSessions;
  switch (sessionType) {
    case 'competition':
      driverSessions = session.driver_sessions;
      break;
    case 'qualifying':
      driverSessions = sortQuali([
        ...session.driver_sessions,
      ] as GetEventDetailsQuery['events'][number]['qualifying'][number]['driver_sessions']);
      break;
    case 'practice': // Sort for practice
      driverSessions = sortFastestLaps([
        ...session.driver_sessions,
      ] as GetEventDetailsQuery['events'][number]['practices'][number]['driver_sessions']);
      break;
    default:
      driverSessions = session.driver_sessions;
  }

  const fastestLap = fastestLapFinder(sessionType, driverSessions);

  return (
    <div className='p-2'>
      <p className='mb-2 inline-block border px-2 italic'>
        Fastest Lap: <strong>{formatLapTime(Number(fastestLap.time))}</strong>{' '}
        by <strong>{fastestLap.driver}</strong>
        {fastestLap.lap && ` on Lap ${fastestLap.lap}`}
      </p>

      {/* Driver Grid */}
      <div className='grid flex-1 grid-cols-2 grid-rows-10 justify-center gap-x-2 md:grid-flow-col md:grid-cols-10 md:grid-rows-2 md:gap-x-0 md:gap-y-2'>
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
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className='rounde w-full pr-4 pl-1 even:ml-4'
          >
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
    <div className='w-full items-center text-center even:mt-4 md:flex even:md:mt-0 md:even:ml-auto even:md:justify-end'>
      <p className='text-sm opacity-50'>{position}</p>
      <div className='border-muted flex flex-col items-center justify-center border-t-2 pt-1 md:ml-1 md:flex-row md:border-t-0 md:border-l-2 md:pt-0 md:pl-1'>
        {headshot_url && (
          <Image
            src={headshot_url}
            width={64}
            height={64}
            className='h-16 w-16 md:hidden xl:block xl:h-8 xl:w-8'
            alt={abbreviation || ''}
          />
        )}
        <p className='md:order-first'>{abbreviation}</p>
      </div>
    </div>
  );
};

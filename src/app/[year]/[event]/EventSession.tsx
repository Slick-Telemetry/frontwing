'use client';

import { Circle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  eventLocationEncode,
  findSessionType,
  sortFastestLaps,
  sortQuali,
} from '@/lib/utils';

import { CheckboxToggle } from '@/components/Checkbox';

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
      const storedValue = localStorage.getItem(`showGrid-${name}`);
      return storedValue === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`showGrid-${name}`, String(showGrid));
    }
  }, [showGrid, name]);
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
            <CheckboxToggle
              toggle={() => setShowGrid((prev) => !prev)}
              checked={showGrid}
            >
              Show Provisional Results
            </CheckboxToggle>
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
    | 'practice'][number];
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
      ] as GetEventDetailsQuery['events'][number]['practice'][number]['driver_sessions']);
      break;
    default:
      driverSessions = session?.driver_sessions;
  }

  return (
    <div className='grid grid-flow-col grid-cols-2 grid-rows-10 gap-x-4'>
      {driverSessions.map(({ driver }, index) => (
        <DriverHeadshot
          key={driver?.abbreviation || driver?.full_name}
          driver={driver}
          position={index + 1}
        />
      ))}
    </div>
  );
};

export const SkeletonProvisionalGrid = () => {
  return (
    <div className='animate-pulse overflow-hidden p-2'>
      <div className='mb-2 size-6 w-full rounded bg-gray-200'></div>
      <div className='grid-col-2 grid w-full flex-1 grid-flow-col grid-rows-10 gap-y-2'>
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className='w-full rounded pr-4 pl-1 even:ml-4'
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
    | 'practice'][0]['driver_sessions'][0]['driver'];
  position: number;
}) => {
  return (
    <div className='flex grid-cols-2 items-center justify-between gap-4 border-t py-2'>
      <div className='flex items-center gap-2'>
        <p>{position}</p>
        <p>{driver?.full_name}</p>

        <Circle
          fill='var(--accent)'
          className='hidden size-3 sm:block xl:hidden'
        />
      </div>
      <div className='flex items-center gap-2'>
        {/* {if sessions is race or sprint display points} */}
        <p className='text-secondary w-fit'>+25</p>
        <p>FL: 1:23.456</p>
      </div>
    </div>
  );
};

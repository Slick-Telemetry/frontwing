'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  eventLocationEncode,
  fastestLapFinder,
  findSessionType,
  formatLapTime,
} from '@/lib/utils';

import { CheckboxToggle } from '@/components/Checkbox';

import { GetEventDetailsQuery } from '@/generated/types';

export const EventSession = ({
  name,
  time,
  children,
}: {
  name: string;
  time: string;
  children: React.ReactNode;
}) => {
  const [showGrid, setShowGrid] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className='rounded border' key={time}>
      <div
        className='bg-secondary text-secondary-foreground flex w-full cursor-pointer items-center justify-between p-4 py-2'
        onClick={() => router.push(`${pathname}/${eventLocationEncode(name)}`)}
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
      </div>
      {time && new Date(time) < new Date() && (
        <div className='m-2'>
          <label className='flex items-center gap-2'>
            <CheckboxToggle toggle={() => setShowGrid((prev) => !prev)}>
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
    | 'practices'][number];
}) => {
  const sessionType = findSessionType(session?.name || '');

  const driverSessions =
    sessionType === 'competition'
      ? session.driver_sessions
      : sessionType === 'qualifying' // Sort for qualifying
        ? (
            [
              ...session.driver_sessions,
            ] as GetEventDetailsQuery['events'][number]['qualifying'][number]['driver_sessions']
          )
            .filter((driver) => !!driver.results[0].finishing_position)
            .sort((a, b) => {
              return (
                Number(a.results[0]?.finishing_position || 0) -
                Number(b.results[0]?.finishing_position || 0)
              );
            })
        : // Sort for practice
          (
            [
              ...session.driver_sessions,
            ] as GetEventDetailsQuery['events'][number]['practices'][number]['driver_sessions']
          )
            .filter((driver) => driver.fastest_lap.length !== 0)
            .sort((a, b) => {
              return (
                Number(a.fastest_lap[0]?.lap_time || 0) -
                Number(b.fastest_lap[0]?.lap_time || 0)
              );
            });

  const fastestLap = fastestLapFinder(sessionType, driverSessions);

  return (
    <div className='p-2'>
      <p className='mb-2'>
        Fastest Lap: {formatLapTime(Number(fastestLap.time))}{' '}
        {fastestLap.driver}
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
    <div className='items-center text-center even:mt-4 md:flex even:md:mt-0 md:even:ml-4'>
      <p className='opacity-50'>{position}</p>
      <div className='border-muted flex flex-col items-center justify-center gap-1 border-t-2 pt-1 md:ml-1 md:flex-row md:border-t-0 md:border-l-2 md:pt-0 md:pl-1'>
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

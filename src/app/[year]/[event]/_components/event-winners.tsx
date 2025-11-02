import clsx from 'clsx';
import { useEffect } from 'react';

import { useSessionStorage } from '@/hooks/use-storage';

import { ConstructorBadge } from '@/components/constructor-badge';

import { FragmentType, graphql, useFragment } from '@/types';
import type { EventWinnersFragment as EventWinnersFragmentType } from '@/types/graphql';

const EventWinnersFragment = graphql(`
  fragment EventWinners on drivers {
    driver_sessions(
      where: {
        session: { event: { name: { _eq: $event } }, name: { _eq: Race } }
        results: { classified_position: { _eq: "1" } }
      }
    ) {
      constructorByConstructorId {
        name
        color
      }
    }
    full_name
    year
  }
`);

type EventWinnersProps = {
  loading: boolean;
  drivers: FragmentType<typeof EventWinnersFragment>[];
  location?: string | null;
  name?: string | null;
};

export function EventWinners({
  loading,
  drivers: driverFragments,
  location,
  name,
}: EventWinnersProps) {
  const drivers = useFragment(EventWinnersFragment, driverFragments);

  return (
    <div className='rounded border p-4'>
      <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight'>
        Winners at {location?.replace('-', '\u2011')}
      </h2>
      <ul className='grid divide-y'>
        {loading ? (
          <EventWinnerSkeleton />
        ) : (
          drivers.map((driver) => (
            <EventWinner
              key={`${driver.year}_${driver.full_name}`}
              eventName={name}
              {...driver}
            />
          ))
        )}
        {drivers.length === 0 && !loading && (
          <li className='py-4 text-center text-sm text-gray-500'>
            No winners data available.
          </li>
        )}
      </ul>
    </div>
  );
}

function EventWinner({
  year,
  full_name,
  driver_sessions,
  eventName,
}: EventWinnersFragmentType & { eventName?: string | null }) {
  const team = driver_sessions?.[0]?.constructorByConstructorId;
  const key = `results-hidden-${year}-${eventName}`;
  const [hidden, setHidden, removeHidden] = useSessionStorage(key, true);

  useEffect(() => {
    // Remove outdated states
    if (new Date().getFullYear() !== year) removeHidden();
  }, [removeHidden, year]);

  return (
    <li
      onClick={() => setHidden(!hidden)}
      className={clsx(
        'flex items-center gap-2 py-1 last:pb-0',
        hidden && 'cursor-pointer blur',
      )}
    >
      <p className='w-10'>{year}</p>
      <p className='line-clamp-1 font-medium'>{full_name}</p>
      {team?.name && (
        <ConstructorBadge
          className='ml-auto'
          color={team.color}
          name={team.name}
        />
      )}
    </li>
  );
}

function EventWinnerSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className='flex items-center gap-2 py-1 last:pb-0'>
          <div className='h-5 w-10 animate-pulse rounded bg-gray-300 dark:bg-gray-700' />
          <div className='h-5 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700' />
          <div className='ml-auto h-6 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700' />
        </li>
      ))}
    </>
  );
}

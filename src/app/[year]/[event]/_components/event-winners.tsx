import clsx from 'clsx';
import { useEffect } from 'react';

import { shouldHideResults } from '@/lib/utils';
import { useReadLocalStorage, useSessionStorage } from '@/hooks/use-storage';

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
  drivers?: FragmentType<typeof EventWinnersFragment>[];
  location?: string | null;
  name?: string | null;
  session5_date_utc?: string | null;
};

export function EventWinners({
  loading,
  drivers: driverFragments,
  location,
  name,
  session5_date_utc,
}: EventWinnersProps) {
  const drivers = useFragment(EventWinnersFragment, driverFragments);

  return (
    <div>
      <h2 className='scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight'>
        {location?.replace('-', '\u2011')} Winners
      </h2>
      <ul className='grid divide-y'>
        {loading ? (
          <EventWinnerSkeleton />
        ) : (
          drivers?.map((driver) => (
            <EventWinner
              key={`${driver.year}_${driver.full_name}`}
              {...driver}
              eventName={name}
              session5_date_utc={session5_date_utc}
            />
          ))
        )}
        {drivers?.length === 0 && !loading && (
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
  session5_date_utc,
}: EventWinnersFragmentType & {
  eventName?: string | null;
  session5_date_utc?: string | null;
}) {
  const team = driver_sessions?.[0]?.constructorByConstructorId;
  const key = `results-hidden-${year}-${eventName}`;
  const alwaysShowResults = useReadLocalStorage('always-show-results');

  const hideResults =
    shouldHideResults(session5_date_utc) && new Date().getFullYear() === year;
  const [hidden, setHidden, removeHidden] = useSessionStorage(key, hideResults);

  useEffect(() => {
    if (alwaysShowResults) {
      setHidden(false);
      return;
    }
    // Remove outdated states
    if (!hideResults) removeHidden();
  }, [removeHidden, hideResults, alwaysShowResults, setHidden]);

  return (
    <li
      onClick={() => setHidden(false)}
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

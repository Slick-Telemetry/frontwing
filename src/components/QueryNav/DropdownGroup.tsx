'use client';

import { useAtom } from 'jotai/react';
import { useHydrateAtoms } from 'jotai/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { driverDefault, eventDefault, sessionDefault } from '@/lib/constants';
import { updateQueryState, updateSearchParams } from '@/lib/helpers';

import { INITIAL_SEASON } from '@/state-mgmt/constants';
import {
  driverDataLoadable,
  driverListLoadable,
  eventDataLoadable,
  eventListLoadable,
  queryState,
  seasonId,
  seasonList,
  sessionId,
  sessionListLoadable,
} from '@/state-mgmt/store';

// State effects/hooks
import { Dropdown, DropdownItem } from './Dropdown';

export const DropdownGroup = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // *** Param variables
  const seasonParam = searchParams.get('season') || INITIAL_SEASON;
  const eventParam = searchParams.get('event') || '';
  const sessionParam = searchParams.get('session') || '';
  const driversParam = searchParams.get('driver') || '';

  // *** Handles hydration on page load
  // Populate state from params
  useHydrateAtoms([
    [
      queryState,
      {
        season: seasonParam,
        event: eventParam,
        session: sessionParam,
        driver: driversParam,
      },
    ],
  ]);

  const [query, setQuery] = useAtom(queryState);
  const [season] = useAtom(seasonId);
  const [seasons] = useAtom(seasonList);
  const [event] = useAtom(eventDataLoadable);
  const [events] = useAtom(eventListLoadable);
  const [session] = useAtom(sessionId);
  const [sessions] = useAtom(sessionListLoadable);
  const [driver] = useAtom(driverDataLoadable);
  const [drivers] = useAtom(driverListLoadable);

  const dropdownAction = (name: string, value: string) => {
    // Update state
    // *** Possibly look into atomWithRest -> will rest to intial value
    setQuery(updateQueryState(query, name, value, true));

    // Initialize url params without readonly
    let params = new URLSearchParams(searchParams);

    // Update View Params
    params = updateSearchParams(params, 'view', name);

    // Update Query Params
    params = updateSearchParams(params, name, value, season, session);

    // Update URL
    router.push(pathname + '?' + params.toString());
  };

  return (
    <div id='queryNav' className='container flex gap-2 py-8 lg:gap-4'>
      <Dropdown
        value={season}
        action={(value) => dropdownAction('season', value)}
      >
        {seasons.map((season) => (
          <DropdownItem key={season} item={season} />
        ))}
      </Dropdown>
      <Dropdown
        value={
          (events.state === 'loading' && 'Loading') ||
          (event.state === 'hasData' && event.data.EventName) ||
          eventDefault
        }
        action={(value) => dropdownAction('event', value)}
      >
        {events.state === 'hasData' &&
          events.data.map((event: EventSchedule) => (
            <DropdownItem key={event.RoundNumber} item={event.EventName} />
          ))}
      </Dropdown>
      <Dropdown
        value={session || sessionDefault}
        action={(value) => dropdownAction('session', value)}
      >
        {sessions.state === 'hasData' &&
          sessions.data.map((session) => (
            <DropdownItem key={session.index} item={session.name} />
          ))}
      </Dropdown>
      <Dropdown
        value={
          (drivers.state === 'loading' && 'Loading') ||
          (driver.state === 'hasData' && driver.data.FullName) ||
          driverDefault
        }
        action={(value) => dropdownAction('driver', value)}
      >
        {drivers.state === 'hasData' &&
          drivers.data.map((driver: DriverResult) => (
            <DropdownItem key={driver.FullName} item={driver.FullName} />
          ))}
      </Dropdown>
    </div>
  );
};

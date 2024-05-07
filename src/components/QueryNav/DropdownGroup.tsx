'use client';

import { useAtom } from 'jotai/react';
import { useHydrateAtoms } from 'jotai/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// import { useCallback } from 'react';
import { driverDefault, eventDefault, sessionDefault } from '@/lib/constants';
import { updateSearchParams } from '@/lib/helpers';

// import { fetchDriverList } from '@/app/api/fetchDriversAndSessions';
// import { fetchEventList } from '@/app/api/fetchEvents';
// import { fetchLapData } from '@/app/api/fetchLaps';
// import { fetchSeasonList } from '@/app/api/fetchSeasons';
// State values
import {
  DataFetchAtom,
  DriverAtom,
  DriverListState,
  // DriverState,
  EventAtom,
  EventListState,
  // EventState,
  QueryAtom,
  SeasonAtom,
  SeasonListState,
  // SeasonState,
  serverErrorState,
  SessionAtom,
  SessionListState,
  updateQueryAndResetLists,
  // SessionState,
} from '@/state-mgmt/atoms';

// State effects/hooks
import { Dropdown } from './Dropdown';

export const DropdownGroup = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // *** Param variables
  const seasonParam = searchParams.get('season') || '';
  const eventParam = searchParams.get('event') || '';
  const sessionParam = searchParams.get('session') || '';
  const driversParam = searchParams.get('driver') || '';

  // *** Handles hydration on page load
  // Populate state from params
  useHydrateAtoms([
    [
      QueryAtom,
      {
        season: seasonParam,
        event: eventParam,
        session: sessionParam,
        driver: driversParam,
        lap: '',
      },
    ],
    // [SeasonState, seasonParam],
    // [EventState, eventParam],
    // [SessionState, sessionParam],
    // [DriverState, driversParam],
  ]);

  // Bring in effect that fetch list data now that atoms are hydrated
  // TODO: Migrate to one fetch that updates List atoms values now that they are hydrated
  // useAtom(fetchSeasonList);
  // useAtom(fetchEventList);
  // useAtom(fetchDriverList);
  // useAtom(fetchLapData);
  useAtom(DataFetchAtom);

  const [seasonList] = useAtom(SeasonListState);
  const [eventList, setEventList] = useAtom(EventListState);
  const [sessionList, setSessionList] = useAtom(SessionListState);
  const [driverList, setDriverList] = useAtom(DriverListState);

  // Use hydrated attoms
  const [, setQuery] = useAtom(QueryAtom);
  const [season] = useAtom(SeasonAtom);
  const [event] = useAtom(EventAtom);
  const [session] = useAtom(SessionAtom);
  const [driver] = useAtom(DriverAtom);

  // Todo: Migrate to Toast
  const [serverError] = useAtom(serverErrorState);

  const updateQuery = updateQueryAndResetLists(
    setQuery,
    setEventList,
    setSessionList,
    setDriverList,
  );

  const updateState = (name: string, value: string) => {
    // if season remove all params
    // console.log('updateState', name, value);
    switch (name) {
      case 'season':
        updateQuery({
          season: value,
        });
        break;
      case 'event':
        updateQuery({
          event: value,
        });
        break;

      case 'session':
        updateQuery({
          session: value,
        });
        break;

      case 'driver':
        updateQuery({
          driver: value,
        });
    }
  };

  const dropdownAction = (name: string, value: string) => {
    // Update state
    updateState(name, value);

    // Initialize url params without readonly
    let params = new URLSearchParams(searchParams);

    // Update Query Params
    params = updateSearchParams(params, name, value, season, session);

    // Update View Params
    params = updateSearchParams(params, 'view', name);

    // Update URL
    router.push(pathname + '?' + params.toString());
  };

  // console.log('query', query);
  // console.log('lists', eventList, sessionList, driverList);

  return (
    <div id='queryNav' className='container flex gap-2 py-8 lg:gap-4'>
      <Dropdown
        value={season}
        items={seasonList}
        action={(value) => dropdownAction('season', value)}
      />
      <Dropdown
        value={event || eventDefault}
        items={
          // Todo remove logic from jsx
          eventList.length <= 0
            ? []
            : [eventDefault, ...eventList.map((event) => event.EventName)]
        }
        action={(value) => dropdownAction('event', value)}
      />
      <Dropdown
        value={session || sessionDefault}
        items={sessionList}
        action={(value) => dropdownAction('session', value)}
      />
      <Dropdown
        value={driver || driverDefault}
        items={
          driverList.length <= 0
            ? []
            : ['All Drivers', ...driverList.map((driver) => driver.FullName)]
        }
        action={(value) => dropdownAction('driver', value)}
      />

      {serverError && <p className='text-destructive'>{serverError}</p>}
    </div>
  );
};

'use client';

import { useAtom } from 'jotai/react';
import { useHydrateAtoms } from 'jotai/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { driverDefault, eventDefault, sessionDefault } from '@/lib/constants';
import { updateSearchParams } from '@/lib/helpers';

import { fetchDriverList } from '@/app/api/fetchDriversAndSessions';
import { fetchEventList } from '@/app/api/fetchEvents';
import { fetchLapData } from '@/app/api/fetchLaps';
import { fetchSeasonList } from '@/app/api/fetchSeasons';
// State values
import {
  DriverListState,
  DriverState,
  EventListState,
  EventState,
  SeasonListState,
  SeasonState,
  serverErrorState,
  SessionListState,
  SessionState,
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
  const driversParam = searchParams.get('drivers') || '';

  // *** Handles hydration on page load
  // Populate state from params
  useHydrateAtoms([
    [SeasonState, seasonParam],
    [EventState, eventParam],
    [SessionState, sessionParam],
    [DriverState, driversParam],
  ]);

  // Bring in effect that fetch list data now that atoms are hydrated
  // TODO: Migrate to one fetch that updates List atoms values now that they are hydrated
  useAtom(fetchSeasonList);
  useAtom(fetchEventList);
  useAtom(fetchDriverList);
  useAtom(fetchLapData);

  const [season, setSeason] = useAtom(SeasonState);
  const [seasonList] = useAtom(SeasonListState);
  const [event, setEvent] = useAtom(EventState);
  const [eventList, setEventList] = useAtom(EventListState);
  const [session, setSession] = useAtom(SessionState);
  const [sessionList, setSessionList] = useAtom(SessionListState);
  const [driver, setDriver] = useAtom(DriverState);
  const [driverList, setDriverList] = useAtom(DriverListState);

  // Todo: Migrate to Selection Query List
  const [serverError] = useAtom(serverErrorState);

  const resetEvent = () => {
    setEvent(eventDefault);
    setEventList([]);
  };

  const resetSession = () => {
    setSession(sessionDefault);
    setSessionList([]);
  };

  const resetDriver = () => {
    setDriver(driverDefault);
    setDriverList([]);
  };

  const updateState = (name: string, value: string) => {
    // if season remove all params
    switch (name) {
      case 'season':
        setSeason(value);

        // Reset All but season List States
        resetEvent();
        resetSession();
        resetDriver();
        break;
      case 'event':
        setEvent(value);

        // Reset Session & DriverList States
        resetSession();
        resetDriver();
        break;

      case 'session':
        setSession(value);

        // Reset Driver List States
        resetDriver();
        break;

      case 'driver':
        setDriver(value);
    }
  };

  /// Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // *** Remove extra parameters
      switch (name) {
        case 'season':
          params.delete('event');
          params.delete('session');
          params.delete('driver');
          break;

        case 'event':
          if (season) {
            params.set('season', season);
          }
          params.delete('session');
          params.delete('driver');
          break;

        case 'session':
          params.delete('driver');
          break;

        case 'driver':
          if (session) {
            params.set('session', session);
          }
      }

      params.set(name, value);

      return params;
      // .toString();
    },
    [searchParams, session, season],
  );

  const dropdownAction = (name: string, value: string) => {
    updateState(name, value);
    const newQueryString = createQueryString(name, value);
    const newQueryView = updateSearchParams(newQueryString, 'view', name);
    router.push(pathname + '?' + newQueryView);
  };

  return (
    <div className='container flex gap-2 py-8 lg:gap-4'>
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

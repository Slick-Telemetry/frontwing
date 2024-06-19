import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { atomWithCache } from 'jotai-cache';
import { atomEffect } from 'jotai-effect';

import { fetchDrivers } from '@/app/api/fetchDrivers';
import { fetchEvents } from '@/app/api/fetchEvents';
import { healthFetch } from '@/app/api/fetchHealth';
import { f1Seasons } from '@/app/api/fetchSeasons';

import {
  DEFAULT_SESSION_DATA,
  EMPTY_DRIVER_DATA,
  EMPTY_ERROR,
  EMPTY_EVENT_DATA,
  INITIAL_SEASON,
} from './constants';

export const globalError = atom(EMPTY_ERROR);

export const healthStatus = atom(false);
export const incrementalHealthCheck = atomEffect((get, set) => {
  const toggleStates = (status: boolean) => {
    set(healthStatus, !!status);
    set(
      globalError,
      status ? EMPTY_ERROR : { type: 'server', message: 'Server Error' },
    );
  };

  healthFetch().then(toggleStates);

  const intervalId = setInterval(() => {
    healthFetch().then(toggleStates);
  }, 10000);
  return () => clearInterval(intervalId);
});

export const queryState = atom<QueryProps>({
  season: INITIAL_SEASON,
  event: '',
  session: '',
  driver: '',
});

// *** Start Season
export const seasonId = atom((get) => get(queryState).season);
export const seasonList = atom(f1Seasons());
// End Season

// *** Start Event
export const eventId = atom((get) => get(queryState).event);
export const eventData = atom(async (get) => {
  const id = get(eventId);

  if (!id) return EMPTY_EVENT_DATA;
  const events = await get(eventList);
  return events.find((event) => event.EventName === id) || EMPTY_EVENT_DATA;
});
export const eventList = atomWithCache(
  async (get): Promise<EventSchedule[]> => {
    // ! if (!get(healthStatus)) return [];

    const id = get(seasonId);

    const eventsFetched = await fetchEvents(id);
    return eventsFetched;
  },
);
// End Event

// *** Start Session
export const sessionId = atom((get) => get(queryState).session);
export const sessionData = atom(async (get) => {
  const id = get(sessionId);
  if (!id) return DEFAULT_SESSION_DATA;

  const sessions = await get(sessionList);
  return (
    sessions.find((session) => session.name === id) || DEFAULT_SESSION_DATA
  );
});
export const sessionList = atom(async (get): Promise<SessionBasics[]> => {
  const event = await get(eventData);
  if (!event.RoundNumber) return [];

  const sessionKeys = [
    'Session1',
    'Session2',
    'Session3',
    'Session4',
    'Session5',
  ];

  // Create array of session objects
  const sessions = sessionKeys.map((key, i) => {
    return {
      index: i + 1,
      name: event[key as keyof EventSchedule] as string,
      date: event[`${key}Date` as keyof EventSchedule] as string,
      dateUtc: event[`${key}DateUtc` as keyof EventSchedule] as string,
    };
  });

  return sessions;
});
// End Session

// *** Start Driver
export const driverId = atom((get) => get(queryState).driver);
export const driverData = atom(async (get) => {
  const id = get(driverId);

  if (!id) return EMPTY_DRIVER_DATA;
  const drivers = await get(driverList);
  return drivers.find((driver) => driver.FullName === id) || EMPTY_DRIVER_DATA;
});

export const driverList = atomWithCache(
  async (get): Promise<DriverResult[]> => {
    if (!get(healthStatus)) return [];

    const event = await get(eventData);
    const session = await get(sessionData);
    if (!event.RoundNumber) return [];
    if (!session.index) return [];

    const driversFetched = await fetchDrivers(
      get(seasonId),
      event.RoundNumber.toString(),
      session.index.toString(),
    );

    return driversFetched;
  },
);
// End Driver

// *** Add loadable state to fetch calls, similar to react query
// Return a state, loading, data, or error
export const eventListLoadable = loadable(eventList);
export const eventDataLoadable = loadable(eventData);
export const sessionListLoadable = loadable(sessionList);
export const driverListLoadable = loadable(driverList);
export const driverDataLoadable = loadable(driverData);

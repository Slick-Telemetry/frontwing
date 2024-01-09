import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { fetchAPI, ISchedule } from '../app/lib/utils';

export const raceAtom = atom('All Races');
export const seasonRacesAtom = atom<ISchedule[]>([]);
export const seasonAtom = atom('2023');
export const seasonsAtom = atom<string[]>([]);
export const driverAtom = atom('All Drivers');
export const driversAtom = atom<string[]>([]);
export const sessionAtom = atom('Race');
export const sessionsAtom = atom<string[]>([]);
export const telemetryDisableAtom = atom(true);
export const resultUrlAtom = atom('/results');

export const raceNamesDropdownAtom = atom((get) => {
  const data = get(seasonRacesAtom).map((race) => race.EventName);
  // Add All Races option
  data.unshift('All Races');
  return data;
});

export const fetchSeasons = atomEffect((get, set) => {
  if (get(seasonsAtom).length <= 0) {
    fetchAPI('seasons').then((data) => set(seasonsAtom, data));
  }
});

export const fetchRaces = atomEffect((get, set) => {
  fetchAPI('schedule/' + get(seasonAtom)).then((data) => {
    set(seasonRacesAtom, data);
  });
});

export const fetchDriver = atomEffect((get, set) => {
  fetchAPI('drivers').then((data) => set(driversAtom, data));
});
export const fetchSessions = atomEffect((get, set) => {
  fetchAPI('sessions').then((data) => set(sessionsAtom, data));
});

export const handleSeasonChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(seasonAtom, update);
    set(raceAtom, 'All Races');
    set(driverAtom, 'All Drivers');
    set(sessionAtom, 'Race');
    set(resultUrlAtom, '/results/' + update);

    return get(resultUrlAtom);
  },
);

export const handleRaceChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(raceAtom, update);
    set(driverAtom, 'All Drivers');
    set(resultUrlAtom, '/results/' + get(seasonAtom) + '/' + update);

    return get(resultUrlAtom);
  },
);

export const handleDriverChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(driverAtom, update);
    set(sessionAtom, 'Race');
    set(
      resultUrlAtom,
      '/results/' + get(seasonAtom) + '/' + get(raceAtom) + '/' + update,
    );

    return get(resultUrlAtom);
  },
);

export const handleSessionChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(sessionAtom, update);
    set(
      resultUrlAtom,
      '/results/' +
        get(seasonAtom) +
        '/' +
        get(raceAtom) +
        '/' +
        get(driverAtom) +
        '/' +
        update,
    );

    return get(resultUrlAtom);
  },
);

export const handleResultsAtom = atom(null, (get, set) => {
  set(seasonRacesAtom, get(seasonRacesAtom));
});

export const toggleTelemetryDisableAtom = atomEffect((get, set) => {
  // Telemetry is disabled if no race and driver are selected
  set(
    telemetryDisableAtom,
    get(raceAtom) === 'All Races' || get(driverAtom) === 'All Drivers',
  );
});

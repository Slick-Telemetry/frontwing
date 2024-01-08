import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { fetchAPI, ISchedule } from '../app/lib/utils';

export const raceAtom = atom('All Races');
export const racesAtom = atom<ISchedule[]>([]);
export const seasonAtom = atom('2023');
export const seasonsAtom = atom<string[]>([]);
export const driverAtom = atom('All Drivers');
export const driversAtom = atom<string[]>([]);
export const sessionAtom = atom('Race');
export const sessionsAtom = atom<string[]>([]);
export const telemetryDisableAtom = atom(true);
export const resultUrlAtom = atom('/results');

export const racesDropdownAtom = atom((get) =>
  get(racesAtom).map((race) => race.EventName),
);

export const fetchSeasons = atomEffect((get, set) => {
  fetchAPI('seasons').then((data) => set(seasonsAtom, data));
});

export const fetchRaces = atomEffect((get, set) => {
  fetchAPI('schedule/' + get(seasonAtom)).then((data) => set(racesAtom, data));
});

export const fetchDriver = atomEffect((get, set) => {
  fetchAPI('drivers').then((data) => set(driversAtom, data));
});
export const fetchSessions = atomEffect((get, set) => {
  fetchAPI('sessions').then((data) => set(sessionsAtom, data));
});

export const handleSeasonChangeAtom = atom(null, (get, set, update: string) => {
  set(seasonAtom, update);
  set(raceAtom, 'All Races');
  set(driverAtom, 'All Drivers');
  set(sessionAtom, 'Race');
  set(resultUrlAtom, '/results/' + update);

  // Todo: Update RacesAtom
});

export const handleRaceChangeAtom = atom(null, (get, set, update: string) => {
  set(raceAtom, update);
  set(driverAtom, 'All Drivers');
  set(resultUrlAtom, '/results/' + get(seasonAtom) + '/' + update);

  // Todo: Update DriversAtom
});

export const handleDriverChangeAtom = atom(null, (get, set, update: string) => {
  set(driverAtom, update);
  set(sessionAtom, 'Race');
  set(
    resultUrlAtom,
    '/results/' + get(seasonAtom) + '/' + get(raceAtom) + '/' + update,
  );

  // Todo: Update SessionsAtom
});

export const handleSessionChangeAtom = atom(
  null,
  (get, set, update: string) => {
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
  },
);

export const toggleTelemetryDisableAtom = atomEffect((get, set) => {
  // Telemetry is disabled if no race and driver are selected
  set(
    telemetryDisableAtom,
    get(raceAtom) === 'All Races' || get(driverAtom) === 'All Drivers',
  );
});

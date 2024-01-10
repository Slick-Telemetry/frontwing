import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import {
  fetchAPI,
  IConstructorStandings,
  IConstructorStandingsFetch,
  ISchedule,
} from '../app/lib/utils';

export const raceAtom = atom('All Races');
export const seasonRacesAtom = atom<ISchedule[]>([]);
export const seasonAtom = atom('2023');
export const allSeasonsAtom = atom<string[]>([]);
export const driverAtom = atom('All Drivers');
export const driversAtom = atom<string[]>([]);
export const sessionAtom = atom('Race');
export const sessionsAtom = atom<string[]>([]);
export const telemetryDisableAtom = atom(true);
export const resultUrlAtom = atom('/results');
export const constructorStandingsAtom = atom<IConstructorStandings[]>([]);

// Derived Atoms

// Dropdown values for races
// Returns string[] of race event names
export const raceNamesDropdownAtom = atom((get) => {
  const data = get(seasonRacesAtom).map((race) => race.EventName);
  // Add All Races option
  data.unshift('All Races');
  return data;
});

// Effect Atoms
// Get Seasons values, this is done clientside
// Dependencies: seasonsAtom
export const fetchSeasons = atomEffect((get, set) => {
  // Seasons do not change, only fetch if empty array
  if (get(allSeasonsAtom).length <= 0) {
    fetchAPI('seasons').then((data) => set(allSeasonsAtom, data));
  }
});

// Get Races per year
// Dependencies: seasonAtom
export const fetchRaces = atomEffect((get, set) => {
  fetchAPI('schedule?year=' + get(seasonAtom)).then((data) => {
    set(seasonRacesAtom, data);
  });
});

// Get Driver per ...season & race
export const fetchDriver = atomEffect((get, set) => {
  fetchAPI('drivers').then((data) => set(driversAtom, data));
});
// Get sessions per ...season & race
export const fetchSessions = atomEffect((get, set) => {
  fetchAPI('sessions').then((data) => set(sessionsAtom, data));
});

// Get Driver & Constructor Standings
export const fetchStandings = atomEffect((get, set) => {
  fetchAPI('standings').then((data) => {
    // Flatten constructor values
    const constructors = data.constructors.map(
      (con: IConstructorStandingsFetch) => ({
        pos: con.position,
        name: con.Constructor.name,
        points: con.points,
        wins: con.wins,
      }),
    );
    set(constructorStandingsAtom, constructors);
  });
});

// Telemetry is disabled if no race and driver are selected
export const toggleTelemetryDisableAtom = atomEffect((get, set) => {
  set(
    telemetryDisableAtom,
    get(raceAtom) === 'All Races' || get(driverAtom) === 'All Drivers',
  );
});

// Write only Atoms
// aka Update other atoms

// Update Values when a season changes
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

// Update Values when a Race changes
export const handleRaceChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(raceAtom, update);
    set(driverAtom, 'All Drivers');
    set(resultUrlAtom, '/results/' + get(seasonAtom) + '/' + update);

    return get(resultUrlAtom);
  },
);

// Update Values when a Driver changes
export const handleDriverChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(driverAtom, update);
    // set(sessionAtom, 'Race');
    set(
      resultUrlAtom,
      '/results/' + get(seasonAtom) + '/' + get(raceAtom) + '/' + update,
    );

    return get(resultUrlAtom);
  },
);

// Update Values when a session changes
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

// Handle click of results button in <MainFilters/>
export const handleResultsAtom = atom(null, (get, set) => {
  set(seasonRacesAtom, get(seasonRacesAtom));
});

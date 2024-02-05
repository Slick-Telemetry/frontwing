import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { f1Seasons } from '@/lib/fakerData';

import { allDriversAtom, driverAtom } from './drivers';
import { raceAtom, seasonRacesAtom } from './races';
import { allSessionsAtom, sessionAtom } from './sessions';

// Seasons
export const allSeasonsAtom = atom<string[]>([]);
export const seasonAtom = atom<string>('');

// Get Seasons values, this is done clientside
export const fetchSeasons = atomEffect(
  (get, set) => {
    // Seasons do not change, only fetch if empty array
    if (get(allSeasonsAtom).length <= 0) {
      set(allSeasonsAtom, f1Seasons());
    }
  },
  // Dependencies: allSeasonsAtom
);

export const handleSeasonChangeAtom = atom(
  null,
  async (_get, set, season: string) => {
    set(seasonAtom, season);

    // Reset other filter values
    set(raceAtom, 'All Races');
    set(seasonRacesAtom, []);
    set(driverAtom, 'All Drivers');
    set(allDriversAtom, []);
    set(sessionAtom, 'Race');
    set(allSessionsAtom, []);
  },
);

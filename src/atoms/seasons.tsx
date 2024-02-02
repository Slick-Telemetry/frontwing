import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { f1Seasons } from '@/app/lib/fakerData';

import { driverAtom } from './drivers';
import { raceAtom } from './races';
import { sessionAtom } from './sessions';

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
    set(driverAtom, 'All Drivers');
    set(sessionAtom, 'Race');

    // return navigation url
    return '/results/' + season;
  },
);

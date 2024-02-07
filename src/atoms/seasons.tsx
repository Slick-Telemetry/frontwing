import { atom } from 'jotai';

import { allDriversAtom, driverAtom } from './drivers';
import { raceAtom, seasonRacesAtom } from './races';
import { allSessionsAtom, sessionAtom } from './sessions';

export const allSeasonsAtom = atom<string[] | null>(null);
// ! Need to set initial season from server default
export const seasonAtom = atom<string>('');

export const handleSeasonChangeAtom = atom(
  null,
  async (_get, set, season: string) => {
    set(seasonAtom, season);

    // Reset other filter values
    set(raceAtom, 'All Races');
    set(seasonRacesAtom, null);
    set(driverAtom, 'All Drivers');
    set(allDriversAtom, []);
    set(sessionAtom, 'Race');
    set(allSessionsAtom, []);
  },
);

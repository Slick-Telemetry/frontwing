import { atom } from 'jotai';

import { raceAtom } from './races';
import { seasonAtom } from './seasons';

// Drivers
export const allDriversAtom = atom<DriverResult[]>([]);
export const driverAtom = atom('All Drivers');

export const handleDriverChangeAtom = atom(
  null,
  async (get, set, update: string) => {
    set(driverAtom, update);

    //   return nagivation url
    return '/' + get(seasonAtom) + '/' + get(raceAtom) + '/' + update;
  },
);

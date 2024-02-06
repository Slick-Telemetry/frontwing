import { atom } from 'jotai';

import { allDriversAtom, driverAtom } from './drivers';
import { allSessionsAtom } from './sessions';

export const seasonRacesAtom = atom<ScheduleSchema[] | null>(null);
export const raceAtom = atom<ScheduleSchema | 'All Races'>('All Races');

export const handleRaceChangeAtom = atom(
  null,
  async (get, set, raceEvent: ScheduleSchema) => {
    // Update race
    set(raceAtom, raceEvent);

    // Reset Driver
    set(driverAtom, 'All Drivers');
    set(allDriversAtom, null);
    set(allSessionsAtom, null);
  },
);

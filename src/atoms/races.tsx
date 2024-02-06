import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { fetchAPI } from '@/lib/utils';

import { allDriversAtom, driverAtom } from './drivers';
import { seasonAtom } from './seasons';
import { allSessionsAtom } from './sessions';

// Races
export const seasonRacesAtom = atom<ScheduleSchema[]>([]);
export const raceAtom = atom<ScheduleSchema | 'All Races'>('All Races');

// Get Races per season
export const fetchSchedule = atomEffect(
  (get, set) => {
    const params = get(seasonAtom) && `?year=${get(seasonAtom)}`;
    fetchAPI('schedule' + params).then((data) => {
      set(seasonRacesAtom, data.EventSchedule);

      // Sync default year with server
      set(seasonAtom, data.year);
    });
  },
  // Dependencies: seasonAtom
);

export const handleRaceChangeAtom = atom(
  null,
  async (get, set, raceEvent: ScheduleSchema) => {
    // Update race
    set(raceAtom, raceEvent);

    // Reset Driver
    set(driverAtom, 'All Drivers');
    set(allDriversAtom, []);
    set(allSessionsAtom, []);
  },
);

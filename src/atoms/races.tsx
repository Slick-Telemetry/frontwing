import { fetchAPI, lastSession, sessionTitles } from '@/app/lib/utils';
import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { seasonAtom } from './seasons';
import { driverAtom } from './drivers';
import { allSessionsAtom, sessionAtom } from './sessions';

// Races
export const seasonRacesAtom = atom<ScheduleSchema[]>([]);
export const raceAtom = atom<ScheduleSchema | 'All Races'>('All Races');

// Get Races per season
export const fetchRaces = atomEffect(
  (get, set) => {
    const params = get(seasonAtom) && `?year=${get(seasonAtom)}`;
    fetchAPI('schedule' + params).then((data) => {
      console.log('fetched schedule for season')
      // Sync default year with server
      set(seasonAtom, data.year);
      set(seasonRacesAtom, data.EventSchedule);
    });
  },
  // Dependencies: seasonAtom
);

export const handleRaceChangeAtom = atom(
  null,
  async (get, set, raceEvent: ScheduleSchema) => {
    // Reset Driver
    set(driverAtom, 'All Drivers');

    // Update race
    set(raceAtom, raceEvent);

    // Parse race data to get session titles
    set(allSessionsAtom, sessionTitles(raceEvent));
    // Set session to last session, ideally race
    set(sessionAtom, lastSession(raceEvent));

    // return navigation url
    return '/results/' + get(seasonAtom) + '/' + raceEvent.Location;
  },
);

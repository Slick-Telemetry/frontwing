import { fetchAPI } from '@/app/lib/utils';
import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';
import { allDriversAtom, driverAtom } from './drivers';
import { raceAtom } from './races';
import { seasonAtom } from './seasons';

// Sessions
export const allSessionsAtom = atom<string[]>([]);
export const sessionAtom = atom('Race');

// Get session results
// Set allDriversAtom to drivers from session
export const fetchSessionResults = atomEffect((get, set) => {
  const race = get(raceAtom);

  // Confirm race has been selected
  if (race && race !== 'All Races') {
    const sessions = get(sessionAtom);
    let url = `results/${get(seasonAtom)}/${race.RoundNumber}`;

    // If sessions find round and add to url
    if (sessions.length > 0) {
      const sessionRound = get(allSessionsAtom).indexOf(get(sessionAtom)) + 1;
      url += `?session=${sessionRound}`;
    }

    fetchAPI(url).then((data) => {
      set(allDriversAtom, data);
    });
  }
});

export const handleSessionChangeAtom = atom(
  null,
  async (get, set, session: string) => {
    set(sessionAtom, session);

    // return navigation url
    return `/results/${get(seasonAtom)}/${get(raceAtom)}/
    ${get(driverAtom)}/${session}`;
  },
);

import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { fetchAPI, lastSession, sessionTitles } from '@/lib/utils';

import { allConstructorAtom } from './constructors';
import { allDriversAtom } from './drivers';
import { raceAtom } from './races';
import { seasonAtom } from './seasons';

/**
 * @description Format constructors results based on Driver results from race
 * @param {DriverResult[]} drivers
 */
const formatConstructorResults = (drivers: DriverResult[]) =>
  drivers
    .reduce((cons, driver) => {
      // *** Find existint team from accumulator
      const existingTeamIndex = cons.findIndex(
        (team) => team.name === driver.TeamName,
      );

      // If:
      // 1. Team exists in accumulator
      // *** Update constructor values
      if (existingTeamIndex >= 0) {
        const update = { ...cons[existingTeamIndex] };
        const points = update.points + driver.Points;
        const conDrivers = [...update.drivers, driver];

        // *** Add Updated Constructor
        cons.push({
          ...update,
          points,
          drivers: conDrivers,
        });

        // *** Remove Old Constructor
        cons.splice(existingTeamIndex, 1);
      } else {
        // *** Add new Constructor
        cons.push({
          name: driver.TeamName,
          points: driver.Points,
          position: driver.Position, // Placeholder
          drivers: [driver],
        });
      }

      return cons;
    }, [] as ConstructorResult[])
    // Sort by points
    .sort((a, b) => (a.points > b.points ? -1 : 1))
    // Set proper position
    .map((con, i) => {
      con.position = i + 1;
      return con;
    });

// Sessions
export const allSessionsAtom = atom<string[]>([]);
export const sessionAtom = atom<string>('Race');

// Get session results
// Set allDriversAtom to drivers from session
export const fetchSessionResults = atomEffect((get, set) => {
  const race = get(raceAtom);

  // Confirm race has been selected
  if (race && race !== 'All Races') {
    // Make sure sessions match the race

    const sessions = sessionTitles(race);
    const session = lastSession(race);
    // Parse race data to get session titles
    // Set session to last session, ideally race
    set(sessionAtom, session);
    set(allSessionsAtom, sessions);

    // const sessions = get(allSessionsAtom);
    let url = `results/${get(seasonAtom)}/${race.RoundNumber + 1}`;

    // If sessions available find session round and add to url
    if (sessions.length > 0) {
      const sessionRound = sessions.indexOf(session) + 1;
      url += `?session=${sessionRound}`;
    }

    fetchAPI(url).then((drivers: DriverResult[]) => {
      // Formulate Constructors
      const constructors = formatConstructorResults(drivers);

      // Update atom values
      set(allDriversAtom, drivers);
      set(allConstructorAtom, constructors);
    });
  }
});

export const handleSessionChangeAtom = atom(
  null,
  async (get, set, session: string) => {
    set(sessionAtom, session);
  },
);

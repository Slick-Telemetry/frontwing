import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { fetchAPI } from '@/lib/utils';

import { allDriversAtom, driverAtom } from './drivers';
import { raceAtom } from './races';
import { seasonAtom } from './seasons';
import { allConstructorAtom } from './constructors';

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
export const sessionAtom = atom('Race');

// Get session results
// Set allDriversAtom to drivers from session
export const fetchSessionResults = atomEffect((get, set) => {
  const race = get(raceAtom);
  console.log('fetch', race)

  // Confirm race has been selected
  if (race && race !== 'All Races') {
    const sessions = get(sessionAtom);
    let url = `results/${get(seasonAtom)}/${race.RoundNumber}`;

    // If sessions available find session round and add to url
    if (sessions.length > 0) {
      const sessionRound = get(allSessionsAtom).indexOf(get(sessionAtom)) + 1;
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

    // return navigation url
    return `/${get(seasonAtom)}/${get(raceAtom)}/
    ${get(driverAtom)}/${session}`;
  },
);

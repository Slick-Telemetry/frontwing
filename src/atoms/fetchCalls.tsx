// Get session results

import { useAtom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { f1Seasons } from '@/utils/fakerData';
import { fetchAPI, lastSession, sessionTitles } from '@/utils/helpers';
import { formatConstructorResults } from '@/utils/transformers';

import { allConstructorAtom } from './constructors';
import { allDriversAtom } from './drivers';
import { raceAtom, seasonRacesAtom } from './races';
import { allSeasonsAtom, seasonAtom } from './seasons';
import { allSessionsAtom, sessionAtom } from './sessions';
import { constructorStandingsAtom, driverStandingsAtom } from './standings';

export const useMainFiltersAtomFetch = () => {
  useAtom(fetchSeasons);
  useAtom(fetchSchedule);
  useAtom(fetchSessionResults);
};

// Get Seasons values, this should be done once
export const fetchSeasons = atomEffect(
  (get, set) => {
    const seasons = get(allSeasonsAtom);
    // Seasons do not change, only fetch if empty array
    if (!seasons || seasons.length <= 0) {
      set(allSeasonsAtom, f1Seasons());
    }

    // This populates to show values are loaded
  },
  // Dependencies: allSeasonsAtom
);

// Based off season data
// If season value set fetch that seasons schedule
// otherwise get the default schedule
export const fetchSchedule = atomEffect(
  (get, set) => {
    set(seasonRacesAtom, null);
    const params = get(seasonAtom) && `?year=${get(seasonAtom)}`;

    fetchAPI('schedule' + params).then((data) => {
      set(seasonRacesAtom, data.EventSchedule);

      // Sync default year with server
      set(seasonAtom, data.year);
    });
  },
  // Dependencies:
  // seasonAtom
);

// Based off race data
// Set session and sessions from race sessions
// Fetch race results to get drivers in the session
export const fetchSessionResults = atomEffect((get, set) => {
  const race = get(raceAtom);

  // Confirm race has been selected
  if (race && race !== 'All Races') {
    // *** Base url for fetch
    let url = `results/${get(seasonAtom)}/${race.RoundNumber}`;

    // Parse race data to get session titles
    const sessions = sessionTitles(race);
    // Set session to last session, ideally race
    const session = lastSession(race);

    // Set values
    set(sessionAtom, session);
    set(allSessionsAtom, sessions);

    // *** If sessions available find session round and add to url
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
  // Dependencies:
  // raceAtom
  // seasonAtom
});

// Get Driver & Constructor Standings
export const fetchStandings = atomEffect((get, set) => {
  // Reset standings
  set(driverStandingsAtom, []);
  set(constructorStandingsAtom, []);
  const race = get(raceAtom);

  // Year
  const year = get(seasonAtom) && `?year=${get(seasonAtom)}`;

  // Round
  const round = race === 'All Races' ? '' : `&round=${race.RoundNumber}`;

  // Fetch
  fetchAPI('standings' + year + round).then(
    ({
      DriverStandings,
      ConstructorStandings,
    }: DataConfigSchema['standings']) => {
      // Include Drivers in Constructors Info
      const constructors = ConstructorStandings.map((cs) => {
        const { name } = cs.Constructor;
        return {
          ...cs,
          Drivers: DriverStandings.filter((driver) =>
            driver.Constructors.find((c) => c.name === name),
          ),
        };
      });

      // Update standings
      set(constructorStandingsAtom, constructors);
      set(driverStandingsAtom, DriverStandings);
    },
  );

  // dependencies
  // seasonAtom
  // raceAtom
});

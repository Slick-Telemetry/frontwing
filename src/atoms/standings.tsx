import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { fetchAPI } from '@/lib/utils';

import { raceAtom } from './races';
import { seasonAtom } from './seasons';

// Cumulative Standings
export const constructorStandingsAtom = atom<ConstructorStandingSchema[]>([]);
export const driverStandingsAtom = atom<DriverStandingSchema[]>([]);

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
});

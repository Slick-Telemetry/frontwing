import { fetchAPI } from "@/app/lib/utils";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { raceAtom } from "./races";
import { seasonAtom } from "./seasons";

// Cumulative Standings
export const constructorStandingsAtom = atom<ConstructorStandingSchema[]>([]);
export const driverStandingsAtom = atom<DriverStandingSchema[]>([]);

// Get Driver & Constructor Standings
export const fetchStandings = atomEffect((get, set) => {
    const year = get(seasonAtom) && `?year=${get(seasonAtom)}`;
    const round =
      typeof get(raceAtom) !== 'string'
        ? `&round=${(get(raceAtom) as ScheduleSchema).RoundNumber}`
        : '';
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

        set(constructorStandingsAtom, constructors);
        set(driverStandingsAtom, DriverStandings);
      },
    );
  });
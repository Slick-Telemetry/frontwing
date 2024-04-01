import { atomEffect } from 'jotai-effect';

import {
  ConstructorStandingState,
  DriverStandingState,
  EventListState,
  EventState,
  SeasonState,
  serverErrorState,
} from '@/state-mgmt/atoms';

import { fetchAPI } from './fetch';

// Get Driver & Constructor Standings
export const fetchStandings = atomEffect((get, set) => {
  const season = get(SeasonState);
  const race = get(EventListState).find(
    (event) => event.EventName === get(EventState),
  );

  // Year
  const year = season && `?year=${season}`;

  // Round
  const round = race && `&round=${race.RoundNumber}`;

  // Fetch
  fetchAPI('standings' + year + round)
    .then((res: DataConfigSchema['standings'] | ServerErrorResponse) => {
      const { DriverStandings, ConstructorStandings } =
        res as DataConfigSchema['standings'];

      const error = res as ServerErrorResponse;
      if (error.detail) {
        set(serverErrorState, error.detail[0].msg);
        return;
      }

      // Include Drivers Info within data structure of Constructors Info
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
      set(ConstructorStandingState, constructors);
      set(DriverStandingState, DriverStandings);
    })
    .catch((err) => err);
});

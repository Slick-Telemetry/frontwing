'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';

import { ServerPageError } from '@/components/ServerError';

import { StandingsChart } from '@/app/[year]/standings/chart';
import { ConstructorsTable, DriversTable } from '@/app/[year]/standings/Tables';
import {
  GetStandingsQuery,
  GetStandingsQueryVariables,
} from '@/generated/types';

import { ConstructorStandingsChart } from './constructors';
import { DriverStandingsChart } from './drivers';
import { Legend } from './Legend';

type DriverStanding = GetStandingsQuery['drivers'][0]['driver_standings'][0];
type ConstructorStandings =
  GetStandingsQuery['constructors'][0]['constructor_standings'][0];

export type Standings = (DriverStanding | ConstructorStandings) & {
  color: string;
  eventName?: string;
};

export const accessors = {
  xAccessor: (d: Standings) => d?.round || 0,
  yAccessor: (d: Standings) => d?.points || 0,
};

export const Standings = ({ season }: { season: number }) => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  // const season = selectedSeason || Number(searchParams.get('season')) || 2024;
  const chartType = searchParams.get('chart') || 'drivers';

  const [hiddenTeams, setHiddenTeams] = useState<Record<string, boolean>>({});
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );

  const { data: standings, error } = useSuspenseQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_STANDINGS, { variables: { season: season } });

  if (error || !standings) return <ServerPageError />;

  // const changeChartType = (chart: 'drivers' | 'constructors') => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set('chart', chart);
  //   router.replace(`?${params.toString()}`);
  // };

  const toggleDriverVisibility = (constructor: string, driver: string) => {
    if (!driver) return;
    setHiddenDrivers((prev) => {
      const newState = { ...prev, [driver]: !prev[driver] };

      // Check if all drivers for this constructor are hidden
      const allDriversHidden = standings.drivers
        .filter(
          (d) => d.latest_constructor?.[0]?.constructor?.name === constructor,
        )
        .every((d) => newState[d.abbreviation || '']);

      if (allDriversHidden) {
        setHiddenTeams((prev) => ({ ...prev, [constructor]: true }));
      } else {
        setHiddenTeams((prev) => ({ ...prev, [constructor]: false }));
      }

      return newState;
    });
  };

  const toggleConstructorVisibility = (
    constructor: string,
    drivers: string[],
  ) => {
    setHiddenTeams((prev) => {
      const newState = { ...prev, [constructor]: !prev[constructor] };
      setHiddenDrivers((prevDrivers) => {
        const updatedDrivers = { ...prevDrivers };
        drivers.forEach(
          (driver) => (updatedDrivers[driver] = newState[constructor]),
        );
        return updatedDrivers;
      });
      return newState;
    });
  };

  return (
    <div className='my-4 grid grid-cols-3 gap-4'>
      <div>
        {/* Table */}
        {chartType === 'drivers' ? (
          <DriversTable
            drivers={standings.drivers}
            hiddenDrivers={hiddenDrivers}
            toggleDriverVisibility={toggleDriverVisibility}
          />
        ) : (
          <ConstructorsTable
            constructors={standings.constructors}
            hiddenConstructors={hiddenTeams}
            toggleConstructorVisibility={toggleConstructorVisibility}
          />
        )}
      </div>

      {/* Charts */}
      <div className='col-span-2'>
        <StandingsChart>
          {chartType === 'drivers' ? (
            <DriverStandingsChart
              standingsByDriver={standings.drivers}
              events={standings.events}
              hiddenDrivers={hiddenDrivers}
            />
          ) : (
            <ConstructorStandingsChart
              standingsByConstructor={standings.constructors}
              events={standings.events}
              hiddenConstructors={hiddenTeams}
            />
          )}
        </StandingsChart>
        <Legend
          standings={standings}
          toggleDriverVisibility={toggleDriverVisibility}
          toggleConstructorVisibility={toggleConstructorVisibility}
          hiddenDrivers={hiddenDrivers}
          hiddenConstructors={hiddenTeams}
        />
      </div>
    </div>
  );
};

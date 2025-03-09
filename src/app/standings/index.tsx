'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';

import SeasonSelector from '@/components/seasonSelector';

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
};

export const accessors = {
  xAccessor: (d: Standings) => d?.round || 0,
  yAccessor: (d: Standings) => d?.points || 0,
};

export const Standings = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const season = Number(searchParams.get('season')) || 2024;
  const chartType = searchParams.get('chart') || 'drivers';

  const [hiddenTeams, setHiddenTeams] = useState<Record<string, boolean>>({});
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );

  const { data: standings, error } = useSuspenseQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_STANDINGS, { variables: { season: season } });

  if (error || !standings) return <p>Error...</p>;

  const changeChartType = (chart: 'drivers' | 'constructors') => {
    const params = new URLSearchParams(searchParams);
    params.set('chart', chart);
    router.replace(`?${params.toString()}`);
  };

  const toggleDriverVisibility = (constructor: string, driver: string) => {
    if (!driver) return;
    setHiddenDrivers((prev) => {
      const newState = { ...prev, [driver]: !prev[driver] };
      if (!newState[driver]) {
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
    <div className='my-4 grid items-center gap-4'>
      <div>
        {/* Chart Toggles */}
        <div className='flex flex-col gap-2 lg:flex-row lg:gap-4'>
          <SeasonSelector />
          <div className='grid w-full grid-cols-2 gap-4'>
            <button
              className={`w-full px-4 py-2 text-xs md:text-base ${chartType === 'drivers' ? 'border-b-2 border-blue-600' : ''}`}
              onClick={() => changeChartType('drivers')}
            >
              Drivers
            </button>
            <button
              className={`w-full px-4 py-2 text-xs md:text-base ${chartType === 'constructors' ? 'border-b-2 border-blue-600' : ''}`}
              onClick={() => changeChartType('constructors')}
            >
              Constructors
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className='h-[300px] w-full lg:h-[450px]'>
          {chartType === 'drivers' ? (
            <DriverStandingsChart
              standingsByDriver={standings.drivers}
              hiddenDrivers={hiddenDrivers}
            />
          ) : (
            <ConstructorStandingsChart
              standingsByConstructor={standings.constructors}
              hiddenConstructors={hiddenTeams}
            />
          )}
        </div>
      </div>

      <Legend
        standings={standings}
        toggleDriverVisibility={toggleDriverVisibility}
        toggleConstructorVisibility={toggleConstructorVisibility}
        hiddenDrivers={hiddenDrivers}
        hiddenConstructors={hiddenTeams}
      />
    </div>
  );
};

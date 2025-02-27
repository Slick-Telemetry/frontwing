'use client';

import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { GET_DRIVER_STANDINGS } from '@/lib/queries';

import {
  GetStandingsQuery,
  GetStandingsQueryVariables,
} from '@/generated/types';

import { ConstructorStandingsChart } from './ConstructorStandings';
import { DriverStandingsChart } from './DriverStandings';
import { Legend } from './Legend';

type DriverStanding = GetStandingsQuery['drivers'][0]['driver_standings'][0];

export interface ChartDataFormat extends DriverStanding {
  color?: string | null;
  constructor?: string | null;
  driver?: string | null;
  abbreviation?: string | null;
}

export interface DriverStandings {
  [key: string]: ChartDataFormat[];
}

export const accessors = {
  xAccessor: (d: ChartDataFormat) => d?.round || 0,
  yAccessor: (d: ChartDataFormat) => d?.points || 0,
};

export const Standings = () => {
  const [activeChart, setActiveChart] = useState<'drivers' | 'constructors'>(
    'drivers',
  );
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );
  const [hiddenConstructors, setHiddenConstructors] = useState<
    Record<string, boolean>
  >({});

  const { data, loading, error } = useQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_DRIVER_STANDINGS, { variables: { season: 2024 } });

  if (loading) return <p>Loading...</p>;
  if (error || !data?.drivers) return <p>Error...</p>;

  const drivers = data.drivers.filter((driver) => !!driver);

  const standings: Record<string, ChartDataFormat[]> = drivers.reduce(
    (acc, driver) => {
      acc[driver?.abbreviation || ''] = driver.driver_standings.map((ds) => ({
        ...ds,
        driver: driver?.full_name,
        abbreviation: driver?.abbreviation,
        color:
          driver?.driver_sessions?.[0]?.constructorByConstructorId?.color ||
          'ccc',
        constructor:
          driver?.driver_sessions?.[0]?.constructorByConstructorId?.name,
      }));
      return acc;
    },
    {} as DriverStandings,
  );

  const toggleDriverVisibility = (constructor: string, driver: string) => {
    if (!driver) return;
    setHiddenDrivers((prev) => {
      const newState = { ...prev, [driver]: !prev[driver] };
      if (!newState[driver]) {
        setHiddenConstructors((prev) => ({ ...prev, [constructor]: false }));
      }
      return newState;
    });
  };

  const toggleConstructorVisibility = (
    constructor: string,
    drivers: string[],
  ) => {
    setHiddenConstructors((prev) => {
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
    <div className='container my-8 grid items-center gap-8 lg:grid-cols-4'>
      <Legend
        standingsByDriver={standings}
        activeChart={activeChart}
        toggleDriverVisibility={toggleDriverVisibility}
        toggleConstructorVisibility={toggleConstructorVisibility}
        hiddenDrivers={hiddenDrivers}
        hiddenConstructors={hiddenConstructors}
      />
      <div className='h-full lg:col-span-3'>
        <div className='grid grid-cols-2 gap-4'>
          <button
            className={`w-full px-4 py-2 ${activeChart === 'drivers' ? 'border-b-2 border-blue-600' : ''}`}
            onClick={() => setActiveChart('drivers')}
          >
            Driver Standings
          </button>
          <button
            className={`w-full px-4 py-2 ${activeChart === 'constructors' ? 'border-b-2 border-blue-600' : ''}`}
            onClick={() => setActiveChart('constructors')}
          >
            Constructor Standings
          </button>
        </div>
        <div className='h-full max-h-[500px] w-full'>
          {activeChart === 'drivers' ? (
            <DriverStandingsChart
              standingsByDriver={standings}
              hiddenDrivers={hiddenDrivers}
            />
          ) : (
            <ConstructorStandingsChart
              standingsByDriver={standings}
              hiddenConstructors={hiddenConstructors}
            />
          )}
        </div>
      </div>
    </div>
  );
};

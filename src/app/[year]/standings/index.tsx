'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';
import { bgGradient } from '@/lib/utils';

import { ServerPageError } from '@/components/ServerError';

import { StandingsChart } from '@/app/[year]/standings/chart';
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
    <div className='my-4 grid grid-cols-3 gap-4'>
      <div>
        {/* Table */}
        {chartType === 'drivers'
          ? [...standings.drivers]
              .sort((a, b) => {
                const aPoints = Number(
                  a.driver_standings[a.driver_standings.length - 1]?.points ??
                    0,
                );
                const bPoints = Number(
                  b.driver_standings[b.driver_standings.length - 1]?.points ??
                    0,
                );
                return bPoints - aPoints;
              })
              .map((driver, i) => {
                const lastSession =
                  driver.driver_standings[driver.driver_standings.length - 1];

                return (
                  <div
                    className='border-muted flex flex-wrap items-center border'
                    key={driver?.abbreviation || driver?.full_name}
                  >
                    <p className='w-8 text-center'>{i + 1}</p>
                    <div
                      className='flex flex-1 justify-between p-2 py-1'
                      style={{
                        background: bgGradient(
                          driver.latest_constructor[0].constructor?.color ||
                            'cccccc',
                        ),
                      }}
                    >
                      <p>{driver.full_name}</p>
                      <p>{driver.latest_constructor[0].constructor?.name}</p>
                    </div>
                    <p className='w-12 text-center'>{lastSession.points}</p>
                  </div>
                );
              })
          : [...standings.constructors]
              .sort((a, b) => {
                const aPoints = Number(
                  a.constructor_standings[a.constructor_standings.length - 1]
                    ?.points ?? 0,
                );
                const bPoints = Number(
                  b.constructor_standings[b.constructor_standings.length - 1]
                    ?.points ?? 0,
                );
                return bPoints - aPoints;
              })
              .map((constructor, i) => (
                <div
                  className='border-muted flex flex-wrap items-center border'
                  key={constructor.name}
                >
                  <p className='w-8 text-center'>{i + 1}</p>
                  <p
                    className='flex-1 p-2 py-1'
                    style={{
                      background: bgGradient(constructor.color || 'cccccc'),
                    }}
                  >
                    {constructor.name}
                  </p>
                  <p className='w-12 text-center'>
                    {
                      constructor.constructor_standings[
                        constructor.constructor_standings.length - 1
                      ].points
                    }
                  </p>
                </div>
              ))}
      </div>

      {/* Charts */}
      <div className='col-span-2'>
        <StandingsChart>
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

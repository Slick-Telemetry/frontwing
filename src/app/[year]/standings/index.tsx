'use client';

import { useQuery } from '@apollo/client';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_SEASON_EVENTS, GET_STANDINGS } from '@/lib/queries';

import { ServerPageError } from '@/components/ServerError';

import { StandingsChart } from '@/app/[year]/standings/chart';
import { ConstructorStandingsChart } from '@/app/[year]/standings/constructors';
import { DriverStandingsChart } from '@/app/[year]/standings/drivers';
import { Legend } from '@/app/[year]/standings/Legend';
import { PageSkeleton } from '@/app/[year]/standings/PageSkeleton';
import { ConstructorsTable, DriversTable } from '@/app/[year]/standings/Tables';
import {
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables,
  GetStandingsQuery,
  GetStandingsQueryVariables,
} from '@/generated/types';

type DriverStanding =
  GetStandingsQuery['drivers'][number]['driver_standings'][number];
type ConstructorStandings =
  GetStandingsQuery['constructors'][number]['constructor_standings'][0];

export type Standings = (DriverStanding | ConstructorStandings) & {
  color: string;
  eventName?: string;
};

export const accessors = {
  xAccessor: (d: Standings) => d?.round || 0,
  yAccessor: (d: Standings) => d?.points || 0,
};

export const Standings = () => {
  const { year } = useParams<{ year: string }>();
  const searchParams = useSearchParams();
  const chartType = searchParams.get('chart') || 'drivers';

  const [hiddenTeams, setHiddenTeams] = useState<Record<string, boolean>>({});
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );

  // Get events for tooltip
  const { data: eventData } = useQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GET_SEASON_EVENTS, {
    variables: {
      year: parseInt(year),
    },
  });

  // Get standings
  // This query fetches either drivers or constructors based on the chart type
  const {
    data: standings,
    loading,
    error,
  } = useQuery<GetStandingsQuery, GetStandingsQueryVariables>(GET_STANDINGS, {
    variables: {
      season: parseInt(year),
    },
  });

  if (loading) return <PageSkeleton chartType={chartType} />;

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
        {chartType === 'drivers' && (
          <DriversTable
            drivers={standings?.drivers}
            hiddenDrivers={hiddenDrivers}
            // toggleDriverVisibility={toggleDriverVisibility}
          />
        )}
        {chartType === 'constructors' && (
          <ConstructorsTable
            constructors={standings?.constructors}
            hiddenConstructors={hiddenTeams}
            // toggleConstructorVisibility={toggleConstructorVisibility}
          />
        )}
      </div>

      {/* Charts */}
      <div className='col-span-2'>
        <StandingsChart>
          {chartType === 'drivers' ? (
            <DriverStandingsChart
              drivers={standings?.drivers}
              events={eventData?.schedule}
              hiddenDrivers={hiddenDrivers}
            />
          ) : (
            <ConstructorStandingsChart
              constructors={standings?.constructors}
              events={eventData?.schedule}
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

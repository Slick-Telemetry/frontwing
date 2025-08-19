'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';

import { ApolloErrorBoundary } from '@/components/ApolloErrorBoundary';

import { ConstructorsTable, DriversTable } from '@/app/[year]/standings/Tables';
import type {
  GetStandingsQuery,
  GetStandingsQueryVariables,
} from '@/generated/types';

import { StandingsChart } from './EChartsStandings';
import { Legend } from './Legend';

const StandingsContent = () => {
  const { year: season } = useParams<{ year: string }>();
  const searchParams = useSearchParams();
  const chartType = (searchParams.get('chart') || 'drivers') as
    | 'drivers'
    | 'constructors';
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<StandingsChart | null>(null);

  const [hiddenTeams, setHiddenTeams] = useState<Record<string, boolean>>({});
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );

  const { data: standings } = useSuspenseQuery<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >(GET_STANDINGS, { variables: { season: parseInt(season) } });

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = new StandingsChart(chartRef.current);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current || !standings) return;

    chartInstance.current.update(
      standings,
      chartType,
      hiddenDrivers,
      hiddenTeams,
    );
  }, [standings, chartType, hiddenDrivers, hiddenTeams]);

  if (!standings) return null;

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
    <div className='my-4 grid grid-cols-5 gap-4'>
      <div className='col-span-2'>
        {chartType === 'drivers' ? (
          <DriversTable
            drivers={standings.drivers}
            toggleDriverVisibility={toggleDriverVisibility}
            hiddenDrivers={hiddenDrivers}
          />
        ) : (
          <ConstructorsTable
            constructors={standings.constructors}
            toggleConstructorVisibility={toggleConstructorVisibility}
            hiddenConstructors={hiddenTeams}
          />
        )}
      </div>
      <div className='col-span-3'>
        <div
          className='relative h-[300px] rounded border lg:h-[450px]'
          ref={chartRef}
        />
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

const Standings = () => {
  return (
    <ApolloErrorBoundary>
      <StandingsContent />
    </ApolloErrorBoundary>
  );
};

export default Standings;

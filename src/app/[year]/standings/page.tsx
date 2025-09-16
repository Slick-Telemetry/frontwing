'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';

import { ApolloErrorBoundary } from '@/components/ApolloErrorBoundary';
import { Button } from '@/components/ui/button';

import { ConstructorsTable, DriversTable } from '@/app/[year]/standings/Tables';

import { StandingsChart } from './_components/chart';
import { Legend } from './Legend';

const StandingsContent = () => {
  const { year: season } = useParams<{ year: string }>();
  const searchParams = useSearchParams();
  const chartType = (searchParams.get('chart') || 'drivers') as
    | 'drivers'
    | 'constructors';

  const [hiddenTeams, setHiddenTeams] = useState<Record<string, boolean>>({});
  const [hiddenDrivers, setHiddenDrivers] = useState<Record<string, boolean>>(
    {},
  );
  const { data: standings } = useQuery(GET_STANDINGS, {
    variables: { season: parseInt(season) },
  });

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
    <div className='grid grid-cols-3 gap-4 p-4 lg:px-6 2xl:grid-cols-4'>
      <div>
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
      <div className='col-span-2 h-fit 2xl:col-span-3'>
        <div className='grid grid-cols-2 gap-4 pb-4'>
          {['drivers', 'constructors'].map((v) => (
            <Button
              key={v}
              variant={chartType === v ? 'secondary' : 'outline'}
              size='lg'
              asChild
            >
              <Link
                href={`?chart=${v}`}
                className='capitalize hover:underline lg:text-xl'
              >
                {v} Standings
              </Link>
            </Button>
          ))}
        </div>
        <div className='rounded border'>
          <div className='bg-secondary/25 rounded border'>
            <StandingsChart
              data={standings}
              type={chartType}
              hiddenConstructors={hiddenTeams}
              hiddenDrivers={hiddenDrivers}
            />
          </div>
          <Legend
            standings={standings}
            toggleDriverVisibility={toggleDriverVisibility}
            toggleConstructorVisibility={toggleConstructorVisibility}
            hiddenDrivers={hiddenDrivers}
            hiddenConstructors={hiddenTeams}
          />
        </div>
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

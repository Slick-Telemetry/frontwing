'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';

import { ApolloErrorBoundary } from '@/components/ApolloErrorBoundary';
import { Button } from '@/components/ui/button';

import { StandingsChart } from '@/app/[year]/standings/_components/chart';
import { Legend } from '@/app/[year]/standings/_components/legend';
import { Table } from '@/app/[year]/standings/_components/table';

import type { GetStandingsQuery } from '@/types/graphql';

// Helper functions for data transformation
const resolveColor = (color?: string | null) =>
  color ? `#${color}` : 'var(--foreground)';

const formatConstructorData = (
  constructor: NonNullable<GetStandingsQuery['constructors'][0]>,
) => ({
  name: constructor?.name ?? 'Unknown',
  abbr: constructor?.name ?? 'Unknown',
  color: resolveColor(constructor?.color),
  totalPoints: constructor?.lastRoundPoints?.[0]?.points ?? 0,
});

const formatDriverData = (
  driver: NonNullable<GetStandingsQuery['drivers'][0]>,
) => {
  const constructor = driver.latest_constructor?.[0]?.constructor;
  return {
    abbr: driver.abbreviation ?? '',
    name: driver.full_name ?? '',
    totalPoints: driver.driver_standings?.at(-1)?.points ?? 0,
    team: constructor?.name ?? 'Unknown',
    color: resolveColor(constructor?.color),
  };
};

const StandingsContent = () => {
  const { year: season } = useParams<{ year: string }>();
  const searchParams = useSearchParams();
  const chartType = (searchParams.get('chart') || 'drivers') as
    | 'drivers'
    | 'constructors';

  const [hiddenItems, setHiddenItems] = useState<Record<string, boolean>>({});
  const { data: standings } = useQuery(GET_STANDINGS, {
    variables: { season: parseInt(season) },
  });

  if (!standings) return null;

  const simpleConstructorData = standings.constructors.map(
    formatConstructorData,
  );
  const simpleDriverData = standings.drivers.map(formatDriverData);

  const toggleVisibility = (type: 'drivers' | 'constructors', id: string) => {
    // Get constructor from legendData driver.team or use provided id
    const constructor = simpleDriverData.find((d) => d.abbr === id)?.team ?? id;
    // Get Drivers for constructor/team
    const constructorDrivers = simpleDriverData.filter(
      (d) => d.team === constructor,
    );

    setHiddenItems((prev) => {
      // Update given item
      prev[id] = !prev[id];

      // Check related items
      const allHidden = constructorDrivers.every((d) => prev[d.abbr]);

      if (type === 'constructors') {
        // Update all drivers
        constructorDrivers.map((d) => (prev[d.abbr] = prev[id]));
      }
      if (type === 'drivers') {
        // Update constructor
        prev[constructor] = allHidden;
      }
      return { ...prev };
    });
  };

  return (
    <div className='grid gap-4 p-4 lg:px-6 xl:grid-cols-3'>
      <div className='h-fit xl:order-2 xl:col-span-2'>
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
              hiddenItems={hiddenItems}
            />
          </div>
          <Legend
            standings={simpleDriverData}
            toggleVisibility={toggleVisibility}
            hiddenItems={hiddenItems}
          />
        </div>
      </div>
      <div className='w-full xl:order-1'>
        <Table
          items={
            chartType === 'drivers' ? simpleDriverData : simpleConstructorData
          }
          toggleItem={(item) => toggleVisibility(chartType, item)}
          hiddenItems={hiddenItems}
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

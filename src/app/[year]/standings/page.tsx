'use client';
import { useQuery } from '@apollo/client/react';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { GET_STANDINGS } from '@/lib/queries';
import { isAllEmptyArrays } from '@/lib/utils';

import Breadcrumbs from '@/components/navigation/breadcrumbs';
import { Button } from '@/components/ui/button';

import { StandingsChart } from '@/app/[year]/standings/_components/chart';
import { Legend } from '@/app/[year]/standings/_components/legend';
import { Table } from '@/app/[year]/standings/_components/table';

import type { GetStandingsQuery } from '@/types/graphql';

// Helper functions for data transformation
const resolveColor = (color?: string | null) =>
  color ? `#${color}` : 'var(--foreground)';

const getConstructorData = (
  constructor: NonNullable<GetStandingsQuery['constructors'][0]>,
) => ({
  name: constructor?.name ?? 'Unknown',
  abbr: constructor?.name ?? 'Unknown',
  color: resolveColor(constructor?.color),
  totalPoints: constructor?.lastRoundPoints?.[0]?.points ?? 0,
});

const getDriverData = (
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

  if (standings && isAllEmptyArrays(standings)) {
    return notFound();
  }

  const simpleConstructorData = standings.constructors.map(getConstructorData);
  const simpleDriverData = standings.drivers.map(getDriverData);

  const toggleVisibility = (
    type: 'drivers' | 'constructors' | 'all' | 'none',
    ids?: string[],
  ) => {
    setHiddenItems((prev) => {
      const newState = { ...prev };
      if (type === 'all') {
        return {};
      }

      if (type === 'none') {
        ids = [
          ...simpleConstructorData.map((c) => c.abbr),
          ...simpleDriverData.map((c) => c.abbr),
        ];
      }

      ids?.forEach((id) => {
        if (type === 'none') {
          newState[id] = true;
          return;
        }

        // Get constructor from legendData driver.team or use provided id
        const constructor =
          simpleDriverData.find((d) => d.abbr === id)?.team ?? id;
        // Get Drivers for constructor/team
        const constructorDrivers = simpleDriverData.filter(
          (d) => d.team === constructor,
        );

        // Update given item
        newState[id] = !newState[id];

        // Check related items
        const allHidden = constructorDrivers.every((d) => newState[d.abbr]);

        if (type === 'constructors') {
          // Update all drivers
          constructorDrivers.forEach((d) => (newState[d.abbr] = newState[id]));
        }
        if (type === 'drivers') {
          // Update constructor
          newState[constructor] = allHidden;
        }
      });

      return newState;
    });
  };

  return (
    <div className='grid gap-4 p-4 lg:px-6 xl:grid-cols-3'>
      <div className='col-span-full'>
        <Breadcrumbs />
      </div>
      <div className='h-fit xl:order-2 xl:col-span-2'>
        <div className='rounded border'>
          <div className='bg-secondary/25 rounded border-b'>
            <StandingsChart
              data={standings}
              type={chartType}
              hiddenItems={hiddenItems}
              toggleVisibility={toggleVisibility}
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
        <div className='bg-muted/50 mb-2 grid grid-cols-2 gap-2 rounded p-2'>
          {['drivers', 'constructors'].map((v) => (
            <Button
              key={v}
              variant={chartType === v ? 'secondary' : 'outline'}
              asChild
            >
              <Link href={`?chart=${v}`} className='capitalize hover:underline'>
                {v}
              </Link>
            </Button>
          ))}
        </div>
        <Table
          items={
            chartType === 'drivers' ? simpleDriverData : simpleConstructorData
          }
          toggleItem={(items) => toggleVisibility(chartType, items)}
          hiddenItems={hiddenItems}
        />
      </div>
    </div>
  );
};

const Standings = () => {
  return <StandingsContent />;
};

export default Standings;

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

  const legendData = standings.drivers.map((d) => {
    const { constructor } = d.latest_constructor[0];
    return {
      abbr: d.abbreviation ?? '',
      name: d.full_name ?? '',
      totalPoints: d.driver_standings.at(-1)?.points ?? 0,
      team: constructor?.name ?? 'Unknown',
      color: constructor?.color
        ? `#${constructor?.color}`
        : 'var(--foreground)',
    };
  });

  const toggleVisibility = (type: 'drivers' | 'constructors', id: string) => {
    if (type === 'drivers') {
      setHiddenDrivers((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }

    if (type === 'constructors') {
      setHiddenTeams((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      const drivers = standings.drivers.filter(
        (d) => d.latest_constructor?.[0]?.constructor?.name === id,
      );

      setHiddenDrivers((prev) => {
        const allHidden = drivers.every((d) => prev[d.abbreviation || '']);
        const updated = { ...prev };
        drivers.forEach((d) => {
          if (d.abbreviation) {
            updated[d.abbreviation] = !allHidden; // toggle all
          }
        });
        return updated;
      });
    }
  };

  // // Helpers if you still want constructor-level checks
  // const isConstructorHidden = (constructor: string) => {
  //   const drivers = standings.drivers.filter(
  //     (d) => d.latest_constructor?.[0]?.constructor?.name === constructor,
  //   );
  //   return drivers.every((d) => hiddenDrivers[d.abbreviation || '']);
  // };

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
              hiddenConstructors={hiddenTeams}
              hiddenDrivers={hiddenDrivers}
            />
          </div>
          <Legend
            standings={legendData}
            toggleVisibility={toggleVisibility}
            // hiddenItems={chartType === 'drivers' ? hiddenDrivers : hiddenTeams}
            hiddenDrivers={hiddenDrivers}
            hiddenConstructors={hiddenTeams}
          />
        </div>
      </div>
      <div className='w-full xl:order-1'>
        <Table
          items={
            chartType === 'drivers'
              ? legendData
              : standings.constructors.map((c) => ({
                  name: c?.name ?? 'Unknown',
                  abbr: c?.name ?? 'Unknown',
                  color: c?.color ? `#${c.color}` : 'var(--foreground)',
                  totalPoints: c.lastRoundPoints[0]?.points ?? 0,
                }))
          }
          toggleItem={(item: string) => toggleVisibility(chartType, item)}
          hiddenItems={chartType === 'drivers' ? hiddenDrivers : hiddenTeams}
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

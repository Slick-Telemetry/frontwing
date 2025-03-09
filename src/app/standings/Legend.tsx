import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { bgGradient } from '@/lib/utils';

import { GetStandingsQuery } from '@/generated/types';

export const Legend = ({
  standings,
  toggleDriverVisibility,
  toggleConstructorVisibility,
  hiddenDrivers,
  hiddenConstructors,
}: {
  standings: GetStandingsQuery;
  toggleDriverVisibility: (constructor: string, driver: string) => void;
  toggleConstructorVisibility: (constructor: string, drivers: string[]) => void;
  hiddenDrivers: Record<string, boolean>;
  hiddenConstructors: Record<string, boolean>;
}) => {
  const searchParams = useSearchParams();
  const chartType = searchParams.get('chart') || 'drivers';
  const constructorsWithDrivers = useMemo(() => {
    if (!standings.constructors || !standings.drivers) return {};

    const constructorMap = standings.constructors.reduce(
      (constructorMap, constructor) => {
        const name = constructor?.name || 'Unknown';
        const latestStanding = constructor.constructor_standings?.at(-1); // Get last entry (cumulative points)

        if (!constructorMap[name]) {
          constructorMap[name] = {
            points: Number(latestStanding?.points || 0),
            color: constructor.color || 'cccccc',
            drivers: [],
          };
        }
        return constructorMap;
      },
      {} as Record<
        string,
        { drivers: string[]; color: string; points: number }
      >,
    );

    standings.drivers.map((driver) => {
      const constructor = driver.latest_constructor?.[0]?.constructor;
      const name = constructor?.name || 'Unknown';

      if (constructorMap[name] && driver.abbreviation) {
        constructorMap[name].drivers.push(driver.abbreviation);
      }
    });

    // **Step 3: Convert to an array, sort by constructor points, and return as object**
    return Object.entries(constructorMap)
      .sort(([, a], [, b]) => b.points - a.points) // Sort descending by constructor points
      .reduce(
        (sortedMap, [name, data]) => {
          sortedMap[name] = data;
          return sortedMap;
        },
        {} as Record<
          string,
          { drivers: string[]; color: string; points: number }
        >,
      );
  }, [standings]);

  return (
    <div className='grid grid-cols-2 gap-2 lg:grid-cols-1'>
      {Object.entries(constructorsWithDrivers).map(
        ([constructor, { drivers, color }]) => (
          <div
            key={constructor}
            className='flex flex-col justify-between rounded border p-2 text-sm sm:flex-row'
            style={{ background: bgGradient(color) }}
          >
            {/* **Constructor Name Toggle** */}
            <span
              className='block cursor-pointer font-bold'
              onClick={() =>
                toggleConstructorVisibility(
                  constructor,
                  drivers.map((d) => d),
                )
              }
              style={{
                opacity: hiddenConstructors[constructor] ? 0.3 : 1,
                textDecoration: hiddenConstructors[constructor]
                  ? 'line-through'
                  : 'none',
              }}
            >
              {constructor}
            </span>

            {/* **Drivers under this Constructor** */}
            {chartType === 'drivers' && (
              <div className='flex divide-x divide-gray-700'>
                {drivers.map((driver) => (
                  <div
                    key={driver}
                    className='flex cursor-pointer items-center gap-2 pr-2 not-first:pl-2'
                    onClick={() => toggleDriverVisibility(constructor, driver)}
                    style={{
                      opacity: hiddenDrivers[driver] ? 0.3 : 1,
                      textDecoration: hiddenDrivers[driver]
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    <svg width={12} height={12}>
                      <circle cx={6} cy={6} r={6} fill={`#${color || 'ccc'}`} />
                    </svg>
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
};

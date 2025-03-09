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
    <div className='grid grid-cols-2 gap-1 sm:grid-cols-5 lg:grid-cols-10'>
      {Object.entries(constructorsWithDrivers).map(
        ([constructor, { drivers, color }]) => (
          <div
            key={constructor}
            className='flex flex-col justify-between rounded border p-1 text-sm'
            style={{ background: bgGradient(color) }}
          >
            {/* **Constructor Name Toggle** */}
            <span
              className='block cursor-pointer text-xs'
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
              <div className='flex flex-wrap gap-x-2'>
                {drivers.map((driver) => {
                  const driverIndex = drivers.findIndex((d) => d === driver);
                  const dashPatterns = ['solid', '2,1', '2,4'];
                  const strokeDasharray = dashPatterns[driverIndex] || '3,6';

                  return (
                    <div
                      key={driver}
                      className='flex cursor-pointer items-center gap-1'
                      onClick={() =>
                        toggleDriverVisibility(constructor, driver)
                      }
                      style={{
                        opacity: hiddenDrivers[driver] ? 0.3 : 1,
                        textDecoration: hiddenDrivers[driver]
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      <svg width={20} height={16}>
                        <line
                          x1={0}
                          x2={20}
                          y1={8}
                          y2={8}
                          strokeWidth='2'
                          stroke={`#${color || 'ccc'}`}
                          strokeDasharray={strokeDasharray}
                        />
                        <circle
                          cx={10}
                          cy={8}
                          r={4}
                          stroke={`#${color || 'ccc'}`}
                          strokeWidth='2'
                          // strokeDasharray={strokeDasharray} // Apply the same dash pattern
                        />
                      </svg>
                      <span>{driver}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
};

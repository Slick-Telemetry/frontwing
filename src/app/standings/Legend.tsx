import { LegendItem, LegendLabel } from '@visx/legend';
import { useMemo } from 'react';

import { bgGradient } from '@/lib/utils';

import { ChartDataFormat, DriverStandings } from './Standings';

export const Legend = ({
  standingsByDriver,
  activeChart,
  toggleDriverVisibility,
  toggleConstructorVisibility,
  hiddenDrivers,
  hiddenConstructors,
}: {
  standingsByDriver: DriverStandings;
  activeChart: 'drivers' | 'constructors';
  toggleDriverVisibility: (constructor: string, driver: string) => void;
  toggleConstructorVisibility: (constructor: string, drivers: string[]) => void;
  hiddenDrivers: Record<string, boolean>;
  hiddenConstructors: Record<string, boolean>;
}) => {
  const groupedData = useMemo(() => {
    const grouped = Object.values(standingsByDriver)
      .map((driverData) => driverData[0])
      .reduce(
        (acc, driver) => {
          const constructor = driver.constructor || 'Unknown';
          if (!acc[constructor]) acc[constructor] = [];
          acc[constructor].push(driver);
          return acc;
        },
        {} as Record<string, ChartDataFormat[]>,
      );

    return Object.keys(grouped)
      .sort()
      .reduce(
        (acc, constructor) => {
          acc[constructor] = grouped[constructor];
          return acc;
        },
        {} as Record<string, ChartDataFormat[]>,
      );
  }, [standingsByDriver]);

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-2'>
      {Object.entries(groupedData).map(([constructor, drivers]) => (
        <div
          key={constructor}
          className='flex justify-between rounded border border-gray-700 p-2'
          style={{ background: bgGradient(drivers[0]?.color || '000000') }}
        >
          <span
            className='cursor-pointer font-bold text-white'
            onClick={() =>
              toggleConstructorVisibility(
                constructor,
                drivers.map((d) => d?.abbreviation || ''),
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
          {activeChart === 'drivers' && (
            <div className='flex divide-x divide-gray-700'>
              {drivers.map((driver) => {
                const abbreviation = driver.abbreviation || '';
                return (
                  <LegendItem
                    className='flex items-center gap-2 px-2'
                    key={driver.abbreviation}
                    margin='0 5px'
                    onClick={() =>
                      toggleDriverVisibility(constructor, abbreviation)
                    }
                    style={{
                      opacity: hiddenDrivers[abbreviation] ? 0.3 : 1,
                      textDecoration: hiddenDrivers[abbreviation]
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    <svg width={12} height={12}>
                      <circle
                        cx={6}
                        cy={6}
                        r={6}
                        fill={`#${driver.color || 'ccc'}`}
                      />
                    </svg>
                    <LegendLabel align='left' margin='0 0 0 4px'>
                      {driver.abbreviation}
                    </LegendLabel>
                  </LegendItem>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

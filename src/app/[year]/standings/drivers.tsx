'use client';

import { AnimatedLineSeries } from '@visx/xychart';

import { GetStandingsQuery } from '@/generated/types';

import { accessors } from '.';
import { StandingsChart } from './chart';

export const DriverStandingsChart = ({
  standingsByDriver,
  hiddenDrivers,
}: {
  standingsByDriver: GetStandingsQuery['drivers'];
  hiddenDrivers: Record<string, boolean>;
}) => {
  // Group drivers by constructor
  const constructorDriverCount = new Map<string, number>();

  standingsByDriver.forEach((driver) => {
    if (!driver) return;
    const constructorName =
      driver.latest_constructor[0]?.constructor?.name || '';
    constructorDriverCount.set(
      constructorName,
      (constructorDriverCount.get(constructorName) || 0) + 1,
    );
  });

  return (
    <StandingsChart>
      {standingsByDriver.map((driver) => {
        if (!driver || hiddenDrivers[driver.abbreviation || '']) return null;

        const constructor = driver.latest_constructor[0]?.constructor;
        const constructorName = constructor?.name || '';
        const color = `#${constructor?.color || 'cccccc'}`;

        // Determine driver order within the same constructor
        const driverIndex = standingsByDriver
          .filter(
            (d) =>
              d.latest_constructor[0]?.constructor?.name === constructorName,
          )
          .findIndex((d) => d.abbreviation === driver.abbreviation);

        // Define strokeDasharray patterns
        const dashPatterns = ['solid', '2,4', '4,8']; // Customize as needed
        const strokeDasharray = dashPatterns[driverIndex] || '8,6';

        return (
          <AnimatedLineSeries
            key={driver.abbreviation}
            dataKey={driver.abbreviation as string}
            data={driver.driver_standings.map((ds) => ({
              ...ds,
              color,
            }))}
            colorAccessor={() => color}
            strokeDasharray={strokeDasharray}
            {...accessors}
          />
        );
      })}
    </StandingsChart>
  );
};

'use client';

import { AnimatedLineSeries } from '@visx/xychart';

import { GetStandingsQuery } from '@/generated/types';

import { accessors } from '.';

export const DriverStandingsChart = ({
  events,
  standingsByDriver,
  hiddenDrivers,
}: {
  events: GetStandingsQuery['events'];
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

  return standingsByDriver.map((driver) => {
    if (!driver || hiddenDrivers[driver.abbreviation || '']) return null;

    const constructor = driver.latest_constructor[0]?.constructor;
    const constructorName = constructor?.name || '';
    const color = `#${constructor?.color || 'cccccc'}`;

    // Find all drivers for this constructor
    const driversInConstructor = standingsByDriver.filter(
      (d) => d.latest_constructor[0]?.constructor?.name === constructorName,
    );

    // Sort drivers by their last available points (descending)
    const sortedDrivers = [...driversInConstructor].sort((a, b) => {
      const aPoints = Number(
        a.driver_standings[a.driver_standings.length - 1]?.points ?? 0,
      );
      const bPoints = Number(
        b.driver_standings[b.driver_standings.length - 1]?.points ?? 0,
      );
      return bPoints - aPoints;
    });

    // Find this driver's index in the sorted array
    const driverIndex = sortedDrivers.findIndex(
      (d) => d.abbreviation === driver.abbreviation,
    );

    // Assign solid to higher points, dashed to lower
    const strokeDasharray = driverIndex === 0 ? 'solid' : '2,4';

    return (
      <AnimatedLineSeries
        key={driver.abbreviation}
        dataKey={driver.abbreviation as string}
        data={driver.driver_standings.map((ds) => ({
          ...ds,
          color,
          eventName:
            events.find((event) => event.round_number === ds.round)?.name || '',
        }))}
        colorAccessor={() => color}
        strokeDasharray={strokeDasharray}
        {...accessors}
      />
    );
  });
};

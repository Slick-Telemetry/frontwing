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
  return (
    <StandingsChart>
      {standingsByDriver.map((driver) =>
        driver && !hiddenDrivers[driver.abbreviation || ''] ? (
          <AnimatedLineSeries
            key={driver.abbreviation}
            dataKey={driver.abbreviation as string}
            data={driver.driver_standings.map((ds) => ({
              ...ds,
              color: `#${driver.latest_constructor[0].constructor?.color || 'cccccc'}`,
            }))}
            colorAccessor={() =>
              `#${driver.latest_constructor[0].constructor?.color || 'cccccc'}`
            }
            {...accessors}
          />
        ) : null,
      )}
    </StandingsChart>
  );
};

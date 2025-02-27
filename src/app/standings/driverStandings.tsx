'use client';

import { AnimatedLineSeries } from '@visx/xychart';

import { accessors, DriverStandings } from './Standings';
import { StandingsChart } from './StandingsChart';

export const DriverStandingsChart = ({
  standingsByDriver,
  hiddenDrivers,
}: {
  standingsByDriver: DriverStandings;
  hiddenDrivers: Record<string, boolean>;
}) => {
  return (
    <StandingsChart>
      {Object.keys(standingsByDriver)
        .filter((driver) => !hiddenDrivers[driver]) // Exclude hidden drivers
        .map((driver) => (
          <AnimatedLineSeries
            key={driver}
            dataKey={driver}
            data={standingsByDriver[driver]}
            colorAccessor={() =>
              `#${standingsByDriver[driver][0].color || 'cccccc'}`
            }
            {...accessors}
          />
        ))}
    </StandingsChart>
  );
};

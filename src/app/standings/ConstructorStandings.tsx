import { AnimatedLineSeries } from '@visx/xychart';
import { useMemo } from 'react';

import { accessors, ChartDataFormat, DriverStandings } from './Standings';
import { StandingsChart } from './StandingsChart';

export const ConstructorStandingsChart = ({
  standingsByDriver,
  hiddenConstructors,
}: {
  standingsByDriver: DriverStandings;
  hiddenConstructors: Record<string, boolean>;
}) => {
  const constructorStandings = useMemo(() => {
    const standings: Record<string, ChartDataFormat[]> = {};

    Object.values(standingsByDriver).forEach((driverRounds) => {
      driverRounds.forEach(({ round, points, constructor, color }) => {
        if (!constructor || hiddenConstructors?.[constructor]) return; // Skip hidden constructors

        if (!standings[constructor]) {
          standings[constructor] = [];
        }

        const roundIndex = standings[constructor].findIndex(
          (r) => r.round === round,
        );
        if (roundIndex >= 0) {
          standings[constructor][roundIndex].points =
            Number(points) + Number(standings[constructor][roundIndex].points);
        } else {
          standings[constructor].push({
            round: round,
            points: points,
            color: color,
            constructor,
          });
        }
      });
    });

    Object.keys(standings).forEach((constructor) => {
      standings[constructor].sort((a, b) => Number(a.round) - Number(b.round));
    });

    return standings;
  }, [standingsByDriver, hiddenConstructors]);

  return (
    <StandingsChart>
      {Object.keys(constructorStandings).map((constructor) => (
        <AnimatedLineSeries
          key={constructor}
          dataKey={constructor}
          data={constructorStandings[constructor]}
          stroke={`#${constructorStandings[constructor][0]?.color || '000000'}`}
          {...accessors}
        />
      ))}
    </StandingsChart>
  );
};

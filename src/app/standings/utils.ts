import { GetDriverStandingsQuery } from '@/generated/types';

import { ChartProps } from './drivers';

const initalAcc: ChartProps = {
  chart: [],
  constructors: [],
};

export const formatDriverChartData = ({
  driver_standings,
}: GetDriverStandingsQuery) => {
  return driver_standings.reduce((acc, standing) => {
    const { chart, constructors } = acc;
    const driverAbbrev = standing.driver?.abbreviation;
    const constructorName =
      standing.driver?.driver_sessions[0].constructorByConstructorId?.name;

    //   Driver abbreviation need to format data
    if (!driverAbbrev) return acc;

    // Add chart data
    if (standing.round) {
      const round = chart[chart.findIndex((dp) => dp.round === standing.round)];
      const points = Number(standing.points) || 0;
      // Create round
      if (!round) {
        chart.push({
          round: standing.round,
          [driverAbbrev]: points,
        });
        // update round
      } else {
        round[driverAbbrev] = points;
      }
    }

    // Add constructor data
    if (constructorName) {
      const constructor =
        constructors[constructors.findIndex((c) => c.name === constructorName)];
      // Constructor doesn't exists start from scratch
      if (!constructor) {
        const color =
          standing.driver?.driver_sessions[0].constructorByConstructorId?.color;
        constructors.push({
          name: constructorName,
          color: color,
          drivers: [driverAbbrev],
        });
      } else if (
        constructor.drivers &&
        !constructor.drivers.includes(driverAbbrev)
      ) {
        constructor.drivers.push(driverAbbrev);
      }
    }

    // rebuild accumulator
    return { chart: chart, constructors: constructors };
  }, initalAcc);
};

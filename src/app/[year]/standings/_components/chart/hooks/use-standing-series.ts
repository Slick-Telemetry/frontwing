import { useMemo } from 'react';

import {
  makeLineSeries,
  prepareData,
} from '@/app/[year]/standings/_components/chart';

import { GetStandingsQuery } from '@/types/graphql';

interface UseStandingsSeriesProps {
  data: GetStandingsQuery;
  allRounds: number[];
  showRoundPoints: boolean;
}
export function useStandingsSeries({
  data,
  allRounds,
  showRoundPoints,
}: UseStandingsSeriesProps) {
  return useMemo(() => {
    // Compute top driver per constructor (for solid/dotted lines)
    const constructorTopDrivers = data.drivers.reduce((acc, driver) => {
      const cName = driver.latest_constructor?.[0]?.constructor?.name;
      if (!cName) return acc;

      const pts = driver.driver_standings.at(-1)?.points ?? 0;
      const current = acc.get(cName);
      if (!current || pts > current.points) {
        acc.set(cName, { abbr: driver.abbreviation || '', points: pts });
      }
      return acc;
    }, new Map<string, { abbr: string; points: number }>());

    // Drivers series
    const driversSeries = data.drivers.map((driver) => {
      const points = prepareData(
        driver.driver_standings,
        allRounds,
        showRoundPoints,
      );
      const constructor = driver.latest_constructor?.[0]?.constructor;
      const color = `#${constructor?.color || 'b0b0b0'}`;
      const topDriver = constructorTopDrivers.get(
        constructor?.name || '',
      )?.abbr;
      const isTop = driver.abbreviation === topDriver;

      return makeLineSeries(
        driver.abbreviation || '',
        points,
        color,
        isTop ? 'solid' : 'dotted',
      );
    });

    // Constructors series
    const constructorsSeries = data.constructors.map((c) => {
      const points = prepareData(
        c.constructor_standings,
        allRounds,
        showRoundPoints,
      );
      return makeLineSeries(c.name || '', points, `#${c.color || 'cccccc'}`);
    });

    return { driversSeries, constructorsSeries };
  }, [data, allRounds, showRoundPoints]);
}

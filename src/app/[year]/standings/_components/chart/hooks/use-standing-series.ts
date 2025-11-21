import { useMemo } from 'react';

import {
  makeLineSeries,
  preparePoints,
} from '@/app/[year]/standings/_components/chart';

import { GetStandingsQuery } from '@/types/graphql';

type Standing = { round?: number | null; points?: number | bigint | null };

interface UseStandingsSeriesProps {
  data: GetStandingsQuery;
  allRounds: number[];
  showPointsPerRound: boolean;
  perRoundAvailablePoints: Standing[];
}

export function useStandingsSeries({
  data,
  allRounds,
  showPointsPerRound,
  perRoundAvailablePoints,
}: UseStandingsSeriesProps) {
  return useMemo(() => {
    // Compute top driver per constructor (for solid/dotted lines)
    const topDriverPerConstructor = data.drivers.reduce((acc, driver) => {
      // Find driver's constructor
      const cName = driver.latest_constructor?.[0]?.constructor?.name;
      if (!cName) return acc;

      // Get drivers final points
      const pts = driver.driver_standings.at(-1)?.points ?? 0;

      // If no top driver or more points, set as new top driver
      const current = acc.get(cName);
      if (!current || pts > current.points) {
        acc.set(cName, { abbr: driver.abbreviation || '', points: pts });
      }
      return acc;
    }, new Map<string, { abbr: string; points: number }>());

    // Drivers series
    const driversSeries = data.drivers.map((driver) => {
      const points = preparePoints(
        driver.driver_standings,
        allRounds,
        showPointsPerRound,
      );

      const { color, name } = driver.latest_constructor?.[0]?.constructor ?? {};
      const isTop =
        topDriverPerConstructor.get(name || '')?.abbr === driver.abbreviation;

      return makeLineSeries(
        driver.abbreviation || '',
        points,
        `#${color || 'b0b0b0'}`,
        isTop ? 'solid' : 'dotted',
      );
    });

    // Constructors series
    const constructorsSeries = data.constructors.map((c) => {
      const points = preparePoints(
        c.constructor_standings,
        allRounds,
        showPointsPerRound,
      );
      return makeLineSeries(c.name || '', points, `#${c.color || 'cccccc'}`);
    });

    const availablePointsData = preparePoints(
      perRoundAvailablePoints,
      allRounds,
      showPointsPerRound,
    );
    const availablePointsSeries = makeLineSeries(
      'Available Points',
      availablePointsData,
      '#888888',
      'dashed',
    );

    return {
      driversSeries,
      constructorsSeries,
      availablePointsSeries,
    };
  }, [
    data.drivers,
    data.constructors,
    perRoundAvailablePoints,
    allRounds,
    showPointsPerRound,
  ]);
}

import { AVAILABLE_POINTS_BY_YEAR } from '@/lib/constants';

import { Event_Format_Choices_Enum } from '@/types/graphql';

export const makeLineSeries = (
  name: string,
  data: number[],
  color: string,
  lineType: 'solid' | 'dashed' | 'dotted' = 'solid',
) => ({
  name,
  type: 'line' as const,
  showSymbol: false,
  emphasis: { focus: 'series' as const },
  itemStyle: { color },
  lineStyle: { width: 2, type: lineType },
  data,
});

type Standing = { round?: number | null; points?: number | bigint | null };

export const preparePoints = (
  standings: Standing[],
  allRounds: number[],
  showRoundPoints: boolean = false,
) => {
  // Map drivers points per round mapping
  const pointsPerRound = new Map(
    standings
      .filter((s) => s.round != null && s.points != null)
      .map((s) => [s.round, Number(s.points)]),
  );

  // Return array of points either cumulative or by round
  let prevRound = 0;
  return allRounds.map((round) => {
    const activeRound = pointsPerRound.get(round) ?? prevRound;

    // round points
    if (showRoundPoints) {
      const delta = activeRound - prevRound;
      prevRound = activeRound;
      return delta;
    }

    // cumulative
    return (prevRound = activeRound);
  });
};

/**
 * Get the maximum available points for a round based on year, format, and type
 * @param year - The F1 season year
 * @param format - The event format (sprint, sprint_shootout, sprint_qualifying = sprint; conventional = normal)
 * @param type - 'driver' or 'constructor'
 * @returns The maximum available points for that round, or null if year not supported
 */
export function getMaxAvailablePoints(
  year: number,
  format: Event_Format_Choices_Enum | null | undefined,
  type: 'drivers' | 'constructors',
): number | null {
  const config = AVAILABLE_POINTS_BY_YEAR[year];
  if (!config) return null;

  const isSprint =
    format === Event_Format_Choices_Enum.Sprint ||
    format === Event_Format_Choices_Enum.SprintShootout ||
    format === Event_Format_Choices_Enum.SprintQualifying;

  return isSprint ? config[type].sprint : config[type].normal;
}

export function generatePerRoundAvailablePoints({
  year,
  allRoundFormats,
  type,
}: {
  allRoundFormats: Event_Format_Choices_Enum[];
  type: 'drivers' | 'constructors';
  year: number;
}) {
  return [...allRoundFormats].reduce(
    (acc, round, idx) => {
      const availablePoints = getMaxAvailablePoints(year, round, type) ?? 0;
      const prevPoints = idx > 0 ? acc[idx - 1].points : 0;
      return [...acc, { points: prevPoints + availablePoints, round: idx + 1 }];
    },
    [] as { points: number; round: number }[],
  );
}

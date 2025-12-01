import type { GetStandingsQuery } from '@/types/graphql';

// Helper functions for countback logic shared between table and chart tooltip

// classified_position is a string that can be "1", "2", "3", etc. or "R", "D", "E", "W", "F", "N"
export const parsePosition = (
  position: string | null | undefined,
): number | null => {
  if (!position) return null;
  const parsed = parseInt(position, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

// Count finishing positions for a driver
export const countDriverPositions = (
  driverAbbr: string,
  events: GetStandingsQuery['events'],
): number[] => {
  const positionCounts: number[] = [];

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        if (driverSession.driver?.abbreviation === driverAbbr) {
          driverSession.results?.forEach((result) => {
            const position = parsePosition(result?.classified_position);
            if (position !== null && position > 0) {
              // Ensure array is large enough
              while (positionCounts.length < position) {
                positionCounts.push(0);
              }
              positionCounts[position - 1] =
                (positionCounts[position - 1] || 0) + 1;
            }
          });
        }
      });
    });
  });

  return positionCounts;
};

// Count finishing positions for a constructor (all drivers on that team)
export const countConstructorPositions = (
  constructorName: string,
  events: GetStandingsQuery['events'],
): number[] => {
  const positionCounts: number[] = [];

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        if (
          driverSession.constructorByConstructorId?.name === constructorName
        ) {
          driverSession.results?.forEach((result) => {
            const position = parsePosition(result?.classified_position);
            if (position !== null && position > 0) {
              // Ensure array is large enough
              while (positionCounts.length < position) {
                positionCounts.push(0);
              }
              positionCounts[position - 1] =
                (positionCounts[position - 1] || 0) + 1;
            }
          });
        }
      });
    });
  });

  return positionCounts;
};

// Compare two position count arrays for countback sorting
// Returns: negative if a < b, positive if a > b, 0 if equal
export const compareCountback = (a: number[], b: number[]): number => {
  const maxLength = Math.max(a.length, b.length);
  for (let i = 0; i < maxLength; i++) {
    const aCount = a[i] || 0;
    const bCount = b[i] || 0;
    if (aCount !== bCount) {
      // Higher count is better (descending)
      return bCount - aCount;
    }
  }
  return 0; // Equal countback
};

const cloneCounts = (counts: number[]) => counts.slice();

const ensurePositionSlot = (counts: number[], position: number) => {
  while (counts.length < position) {
    counts.push(0);
  }
};

const updateCountsFromResult = (counts: number[], position: number | null) => {
  if (position === null || position <= 0) return;
  ensurePositionSlot(counts, position);
  counts[position - 1] = (counts[position - 1] || 0) + 1;
};

export const buildDriverPositionCountsTimeline = (
  driverAbbrs: string[],
  events: GetStandingsQuery['events'],
) => {
  const cumulative: Record<string, number[]> = {};
  const timeline: Record<string, number[][]> = {};

  driverAbbrs.forEach((abbr) => {
    if (!abbr) return;
    cumulative[abbr] = [];
    timeline[abbr] = [];
  });

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        const abbr = driverSession.driver?.abbreviation;
        if (!abbr) return;
        const counts = cumulative[abbr] || (cumulative[abbr] = []);
        driverSession.results?.forEach((result) => {
          const position = parsePosition(result?.classified_position);
          updateCountsFromResult(counts, position);
        });
      });
    });

    driverAbbrs.forEach((abbr) => {
      if (!abbr) return;
      const counts = cumulative[abbr] || [];
      timeline[abbr].push(cloneCounts(counts));
    });
  });

  return timeline;
};

export const buildConstructorPositionCountsTimeline = (
  constructorNames: string[],
  events: GetStandingsQuery['events'],
) => {
  const cumulative: Record<string, number[]> = {};
  const timeline: Record<string, number[][]> = {};

  constructorNames.forEach((name) => {
    if (!name) return;
    cumulative[name] = [];
    timeline[name] = [];
  });

  events.forEach((event) => {
    event.race_sessions?.forEach((session) => {
      session.driver_sessions?.forEach((driverSession) => {
        const constructorName =
          driverSession.constructorByConstructorId?.name ?? undefined;
        if (!constructorName) return;
        const counts =
          cumulative[constructorName] || (cumulative[constructorName] = []);
        driverSession.results?.forEach((result) => {
          const position = parsePosition(result?.classified_position);
          updateCountsFromResult(counts, position);
        });
      });
    });

    constructorNames.forEach((name) => {
      if (!name) return;
      const counts = cumulative[name] || [];
      timeline[name].push(cloneCounts(counts));
    });
  });

  return timeline;
};

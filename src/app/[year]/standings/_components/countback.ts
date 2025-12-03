import type { GetStandingsQuery } from '@/types/graphql';

/**
 * Countback utilities for Formula 1 standings tiebreaking.
 *
 * In F1, when drivers or constructors have the same total points, countback is used
 * to determine ranking. Countback compares finishing positions in order of preference:
 * 1. Number of wins (1st place finishes)
 * 2. Number of 2nd place finishes
 * 3. Number of 3rd place finishes
 * 4. And so on...
 *
 * Position count arrays are 0-indexed where:
 * - index 0 = number of 1st place finishes (wins)
 * - index 1 = number of 2nd place finishes
 * - index 2 = number of 3rd place finishes
 * - etc.
 *
 * Example: [7, 3, 4] means 7 wins, 3 second places, 4 third places
 */

/**
 * Counts finishing positions for a specific driver across all events.
 *
 * @param driverAbbr - Driver abbreviation (e.g., "VER", "HAM")
 * @param events - Array of events from the standings query
 * @returns Position count array where index i represents the number of (i+1)th place finishes
 *
 * @example
 * // Returns [7, 3, 4] for a driver with 7 wins, 3 second places, 4 third places
 * const counts = countDriverPositions("VER", events);
 */
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
            const position = parseInt(result?.classified_position ?? '0', 10);
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

/**
 * Counts finishing positions for a constructor (all drivers on that team).
 * Aggregates results from all drivers representing the constructor.
 *
 * @param constructorName - Constructor name (e.g., "Red Bull Racing", "Mercedes")
 * @param events - Array of events from the standings query
 * @returns Position count array where index i represents the number of (i+1)th place finishes
 *
 * @example
 * // Returns [15, 8, 5] for a constructor with 15 wins, 8 second places, 5 third places
 * const counts = countConstructorPositions("Red Bull Racing", events);
 */
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
            const position = parseInt(result?.classified_position ?? '0', 10);
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

/**
 * Compares two position count arrays for countback sorting.
 * Implements F1 countback tiebreaking logic: compares wins first, then second places, etc.
 *
 * This is a comparator function suitable for use with Array.sort().
 *
 * @param a - First position count array
 * @param b - Second position count array
 * @returns Comparator result:
 *   - Negative: `a` should be ranked above `b` (a is better)
 *   - Positive: `b` should be ranked above `a` (b is better)
 *   - Zero: Equal countback (tie)
 *
 * @example
 * // Oscar (b) has more wins (7 vs 6), so he ranks above Max (a)
 * compareCountback([6, 5, 2], [7, 3, 4]); // Returns 1 (positive)
 *
 * @example
 * // Both have 5 wins, but Max (a) has more second places (5 vs 3)
 * compareCountback([5, 5, 2], [5, 3, 4]); // Returns -2 (negative)
 */
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

/**
 * Creates a shallow copy of a position count array.
 * @internal
 */
const cloneCounts = (counts: number[]) => counts.slice();

/**
 * Ensures the position count array has enough slots for the given position.
 * Pads with zeros if necessary.
 * @internal
 */
const ensurePositionSlot = (counts: number[], position: number) => {
  while (counts.length < position) {
    counts.push(0);
  }
};

/**
 * Updates position counts array with a new finishing position.
 * Increments the count for the given position (1-indexed).
 * @internal
 */
const updateCountsFromResult = (counts: number[], position: number | null) => {
  if (position === null || position <= 0) return;
  ensurePositionSlot(counts, position);
  counts[position - 1] = (counts[position - 1] || 0) + 1;
};

/**
 * Builds a timeline of position counts for multiple drivers across events.
 * Returns cumulative position counts after each event, useful for visualizing
 * how countback standings evolve over the season.
 *
 * @param driverAbbrs - Array of driver abbreviations to track
 * @param events - Array of events from the standings query (should be in chronological order)
 * @returns Record mapping driver abbreviation to an array of position count arrays.
 *   Each inner array represents cumulative counts after that event.
 *
 * @example
 * // Returns:
 * // {
 * //   "VER": [[7, 0, 0], [7, 3, 0], [7, 3, 4]],  // After event 1, 2, 3
 * //   "HAM": [[0, 5, 0], [0, 5, 2], [0, 5, 2]]
 * // }
 * const timeline = buildDriverPositionCountsTimeline(["VER", "HAM"], events);
 */
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
          const position = parseInt(result?.classified_position ?? '0', 10);
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

/**
 * Builds a timeline of position counts for multiple constructors across events.
 * Returns cumulative position counts after each event, aggregating results from
 * all drivers on each team.
 *
 * @param constructorNames - Array of constructor names to track
 * @param events - Array of events from the standings query (should be in chronological order)
 * @returns Record mapping constructor name to an array of position count arrays.
 *   Each inner array represents cumulative counts after that event.
 *
 * @example
 * // Returns:
 * // {
 * //   "Red Bull Racing": [[15, 0, 0], [15, 8, 0], [15, 8, 5]],
 * //   "Mercedes": [[0, 10, 0], [0, 10, 5], [0, 10, 5]]
 * // }
 * const timeline = buildConstructorPositionCountsTimeline(["Red Bull Racing", "Mercedes"], events);
 */
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
          const position = parseInt(result?.classified_position ?? '0', 10);
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

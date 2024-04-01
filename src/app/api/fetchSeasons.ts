import { atomEffect } from 'jotai-effect';

import { SeasonListState } from '@/state-mgmt/atoms';

const f1Seasons = (): string[] => {
  const currYear = new Date().getFullYear();

  // Fill array with values between range
  return Array.from({ length: currYear - 1950 + 1 }, (_v, index) =>
    (currYear - index).toString(),
  );
};

// Get Seasons values, this should be done once
export const fetchSeasonList = atomEffect(
  (get, set) => {
    // *** if seasons is an empty array, overwise seasons do not change
    if (get(SeasonListState).length <= 0) {
      set(SeasonListState, f1Seasons());
    }
  },
  // Dependencies: SeasonListState
);

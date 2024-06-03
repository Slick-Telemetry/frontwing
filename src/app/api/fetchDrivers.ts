import { INITIAL_SEASON } from '@/state-mgmt/constants';

import { fetchAPI } from './fetch';
export const fetchDrivers = async (
  season = INITIAL_SEASON,
  round: string,
  session: string,
) => {
  const response = await fetchAPI(
    `results/${season}/${round}?session=${session}`,
  );
  return response || [];
};

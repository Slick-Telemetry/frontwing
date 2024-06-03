import { INITIAL_SEASON } from '@/state-mgmt/constants';

import { fetchAPI } from './fetch';

export const fetchEvents = async (season = INITIAL_SEASON) => {
  const response = await fetchAPI(`schedule?year=${season}`);
  if (response && response.EventSchedule) {
    return response.EventSchedule;
  }
  return [];
};

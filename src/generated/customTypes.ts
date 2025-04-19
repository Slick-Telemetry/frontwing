import {
  GetEventScheduleQuery,
  GetMapEventsQuery,
  GetSeasonEventsQuery,
} from './types';

export type SeasonEvent =
  | null
  | GetSeasonEventsQuery['schedule'][0]
  | GetEventScheduleQuery['schedule'][0];
export type MapEvent = GetMapEventsQuery['events'][0];

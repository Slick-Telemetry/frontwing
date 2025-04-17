import {
  GetEventDetailsV2Query,
  GetMapEventsQuery,
  GetSeasonEventsQuery,
} from './types';

export type SeasonEvent =
  | GetSeasonEventsQuery['events'][0]
  | GetEventDetailsV2Query['events'][0];
export type MapEvent = GetMapEventsQuery['events'][0];

import { GetMapEventsQuery, GetSeasonEventsQuery } from './types';

export type SeasonEvent = GetSeasonEventsQuery['events'][0];
export type MapEvent = GetMapEventsQuery['events'][0];

import { GetEventScheduleQuery, GetSeasonEventsQuery } from './graphql';

// *** Require Import
export type SeasonEvent =
  | null
  | GetSeasonEventsQuery['schedule'][number]
  | GetEventScheduleQuery['schedule'][number];

// *** Helper
interface XY {
  X: number;
  Y: number;
}

// *** Globally accessible, no need to import
declare global {
  export interface CircuitDetails {
    xy_values: XY[];
    rotation: number;
  }
  type DashParams = {
    year: string;
    event: string | undefined;
    session: string | undefined;
  };
}

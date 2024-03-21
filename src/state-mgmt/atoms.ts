import { atom } from 'jotai';

import { formatConstructorResults } from '@/lib/transformers';

const SeasonState = atom<string>('');
const SeasonListState = atom<string[]>([]);

const EventState = atom<string>('');
const EventListState = atom<ScheduleSchema[]>([]);

const SessionState = atom<string>('');
const SessionListState = atom<string[]>([]);

const DriverListState = atom<DriverResult[]>([]);
const ConstructorListState = atom<ConstructorResult[]>((get) => {
  const drivers = get(DriverListState);
  return formatConstructorResults(drivers) || [];
});
const LapListState = atom<string[]>([]);

// Customize to be derived, can have multiple driver states and multiple lap states
// Possible AtomFamily https://jotai.org/docs/utilities/family
const DriverState = atom<string>('');
const LapState = atom<string>('');

// Standings
const ConstructorStandingState = atom<ConstructorStandingSchema[]>([]);
const DriverStandingState = atom<DriverStandingSchema[]>([]);

// Server Error
export const serverErrorState = atom('');

export {
  ConstructorListState,
  ConstructorStandingState,
  DriverListState,
  DriverStandingState,
  // To be updated
  DriverState,
  EventListState,
  EventState,
  LapListState,
  LapState,
  SeasonListState,
  SeasonState,
  SessionListState,
  SessionState,
};

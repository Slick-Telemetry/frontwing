import { atom } from 'jotai';

import { formatConstructorResults } from '@/lib/transformers';

import { fetchDriverList } from '@/app/api/fetchDriversAndSessions';
import { fetchEventList } from '@/app/api/fetchEvents';
import { fetchLapData } from '@/app/api/fetchLaps';
import { fetchSeasonList } from '@/app/api/fetchSeasons';

type QueryAtomType = {
  season: string;
  event: string;
  session: string;
  driver: string;
  lap: string;
};

const QueryAtom = atom<QueryAtomType>({
  season: '',
  event: '',
  session: '',
  driver: '',
  lap: '',
});

const SeasonAtom = atom((get) => get(QueryAtom).season);
const EventAtom = atom((get) => get(QueryAtom).event);
const SessionAtom = atom((get) => get(QueryAtom).session);
const DriverAtom = atom((get) => get(QueryAtom).driver);
const LapAtom = atom((get) => get(QueryAtom).lap);

// Data Fetching
const DataFetchAtom = atom((get) => {
  get(fetchSeasonList);
  get(fetchEventList);
  get(fetchDriverList);
  get(fetchLapData);
});

// const SeasonState = atom<string>('');
const SeasonListState = atom<string[]>([]);

// const EventState = atom<string>('');
const EventListState = atom<ScheduleSchema[]>([]);

// const SessionState = atom<string>('');
const SessionListState = atom<string[]>([]);

const DriverListState = atom<DriverResult[]>([]);
const ConstructorListState = atom<ConstructorResult[]>((get) => {
  const drivers = get(DriverListState);
  return formatConstructorResults(drivers) || [];
});
const LapListState = atom<LapData[]>([]);

// Customize to be derived, can have multiple driver states and multiple lap states
// Possible AtomFamily https://jotai.org/docs/utilities/family
// const DriverState = atom<string>('');
// const LapState = atom<string>('');

// Standings
const ConstructorStandingState = atom<ConstructorStandingSchema[]>([]);
const DriverStandingState = atom<DriverStandingSchema[]>([]);

// Server Error
export const serverErrorState = atom('');
export const serverConnectedState = atom(false);

// Atom Dependencies Update
export const updateQueryAndResetLists =
  (
    // Functions required to update query and reset lists
    setQuery: (
      value: QueryAtomType | ((prev: QueryAtomType) => QueryAtomType),
    ) => void,
    setEventList: (value: ScheduleSchema[]) => void,
    setSessionList: (value: string[]) => void,
    setDriverList: (value: DriverResult[]) => void,
  ) =>
  // Callback to update query and reset lists
  (query: { [key: string]: string }) => {
    // If driver is set, update query and return
    if (query.driver) {
      setQuery((prev) => ({ ...prev, ...query }));
      return;
    }

    // If session is set, reset driver & driver list
    if (query.session) {
      setQuery((prev) => ({ ...prev, ...query, driver: '' }));
      setDriverList([]);
      return;
    }

    // If event is set, reset driver & driver list, session & session list
    if (query.event) {
      setQuery((prev) => ({ ...prev, ...query, session: '', driver: '' }));
      // setQuery((prevQuery) => ({ ...prevQuery, event, session, driver }));
      setSessionList([]);
      setDriverList([]);
      return;
    }

    // If season is set, reset driver & driver list, session & session list, reset event & event list
    if (query.season) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        ...query,
        event: '',
        session: '',
        driver: '',
      }));
      setEventList([]);
      setSessionList([]);
      setDriverList([]);
      return;
    }
  };

export {
  ConstructorListState,
  ConstructorStandingState,
  DataFetchAtom,
  DriverAtom,
  DriverListState,
  DriverStandingState,
  EventAtom,
  // To be updated
  // DriverState,
  EventListState,
  LapAtom,
  // EventState,
  LapListState,
  // SessionState,
  // v2
  QueryAtom,
  SeasonAtom,
  SeasonListState,
  SessionAtom,
  SessionListState,
};

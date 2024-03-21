import { atomEffect } from 'jotai-effect';

import { eventDefault, eventErrorMsg, sessionErrorMsg } from '@/lib/constants';
import { f1Seasons } from '@/lib/fakerData';
import { fetchAPI, lastSession, sessionTitles } from '@/lib/helpers';
import { formatNextEvent } from '@/lib/transformers';

import {
  ConstructorStandingState,
  DriverListState,
  DriverStandingState,
  EventListState,
  EventState,
  SeasonListState,
  SeasonState,
  serverErrorState,
  SessionListState,
  SessionState,
} from './atoms';
import {
  nextEventAtom,
  nextEventLiveAtom,
  nextEventTimeAtom,
} from './nextEvent';

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

// Based off season data
// If season value set fetch that seasons schedule
// otherwise get the default schedule
export const fetchEventList = atomEffect(
  (get, set) => {
    // *** if SeasonState, set api season param
    const season = get(SeasonState);
    const params = season && `?year=${season}`;

    // Fetch event list from api
    fetchAPI('schedule' + params).then(
      (res: DataConfigSchema['schedule'] | ServerErrorResponse) => {
        const schedule = res as DataConfigSchema['schedule'];
        const error = res as ServerErrorResponse;

        // *** If errors specific prop, detail, update serverErrorState
        if (error.detail) {
          set(serverErrorState, error.detail[0].msg);
          return;
        }

        const currDate = Date.now();
        const threeHrs = 10800000; // length of scheduled race session in milliseconds
        // *** Remove events that have not 'completed' their final session
        const completedEvents = schedule.EventSchedule.filter(
          (event) =>
            new Date(event.Session5DateUtc).getTime() + threeHrs <= currDate,
        );

        set(EventListState, completedEvents);

        // *** If no season sync default year with server provided season
        if (!season) {
          set(SeasonState, schedule.year);
        }
      },
    );
  },
  // Dependencies:
  // SeasonState
);

// Based off race data
// Set session and sessions from race sessions
// Fetch race results to get drivers in the session
export const fetchDriverList = atomEffect((get, set) => {
  // We need to see if there is an event from params
  // We need to confirm eventlist loaded
  const eventName = get(EventState);
  const eventList = get(EventListState);

  // This indicated eventList has not been fetched has not loaded
  if (eventName && eventList.length <= 0) {
    return;
  }

  const event = eventList.find((evt) => evt.EventName === eventName);

  // Set error if no matching event && event specified
  if (!event && eventName !== eventDefault) {
    set(serverErrorState, eventErrorMsg);
  }

  // Confirm event exists
  if (event) {
    // *** Base url for fetch
    let url = `results/${get(SeasonState)}/${event.RoundNumber}`;

    // *** Get all session titles of event
    const sessions = sessionTitles(event);
    set(SessionListState, sessions);

    let session = get(SessionState);

    // *** If no session update update session variable and session state
    // *** Use last session from event as the default value
    if (!session) {
      // Set session to last session, ideally race
      session = lastSession(event);

      // Update Session state
      set(SessionState, session);
    }

    // *** If sessions available find session round and add to url
    if (sessions.length > 0) {
      const sessionRound = sessions.indexOf(session) + 1;
      url += `?session=${sessionRound}`;
    }

    // Fetch driver list from api
    fetchAPI(url).then((res: DriverResult[] | ServerErrorResponse) => {
      const drivers = res as DriverResult[];

      // Check for errors
      const error = res as ServerErrorResponse;

      // *** If errors specific prop, detail, update serverErrorState
      if (error.detail) {
        set(serverErrorState, sessionErrorMsg);
        // set(serverErrorState, error.detail[0].msg);
        return;
      }

      // *** Update Driver List
      set(DriverListState, drivers);
    });
  }
  // Dependencies:
  // SeasonState
  // EventListState
});

// Get Driver & Constructor Standings
export const fetchStandings = atomEffect((get, set) => {
  const season = get(SeasonState);
  const race = get(EventListState).find(
    (event) => event.EventName === get(EventState),
  );

  // Year
  const year = season && `?year=${season}`;

  // Round
  const round = race && `&round=${race.RoundNumber}`;

  // Fetch
  fetchAPI('standings' + year + round)
    .then((res: DataConfigSchema['standings'] | ServerErrorResponse) => {
      const { DriverStandings, ConstructorStandings } =
        res as DataConfigSchema['standings'];

      const error = res as ServerErrorResponse;
      if (error.detail) {
        set(serverErrorState, error.detail[0].msg);
        return;
      }

      // Include Drivers Info within data structure of Constructors Info
      const constructors = ConstructorStandings.map((cs) => {
        const { name } = cs.Constructor;
        return {
          ...cs,
          Drivers: DriverStandings.filter((driver) =>
            driver.Constructors.find((c) => c.name === name),
          ),
        };
      });

      // Update standings
      set(ConstructorStandingState, constructors);
      set(DriverStandingState, DriverStandings);
    })
    .catch((err) => err);
});

// Get upcoming event this should be done once
export const fetchNextEvent = atomEffect(
  (get, set) => {
    // Next event do not change, only fetch if null
    if (!get(nextEventAtom)) {
      fetchAPI('next-event').then(
        (res: ScheduleSchema | ServerErrorResponse) => {
          const data = res as ScheduleSchema;
          const error = res as ServerErrorResponse;
          if (error.detail) {
            set(serverErrorState, error.detail[0].msg);
            return;
          }
          // Get session times
          const now = Date.now();
          const nextEvent = formatNextEvent(data);

          if (nextEvent === 'No session') return;

          set(nextEventAtom, nextEvent);

          if (nextEvent.time < now) {
            set(nextEventLiveAtom, true);
            set(nextEventTimeAtom, now - nextEvent.endTime);
          } else {
            set(nextEventTimeAtom, nextEvent.time - now);
          }
        },
      );
    }
  },
  // Dependencies: nextEventAtom
);

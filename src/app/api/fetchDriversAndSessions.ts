// Based off race data
// Set session and sessions from race sessions

import { atomEffect } from 'jotai-effect';

import { eventDefault, eventErrorMsg, sessionErrorMsg } from '@/lib/constants';
import { lastSession, sessionTitles } from '@/lib/helpers';

import {
  DriverListState,
  EventListState,
  EventState,
  SeasonState,
  serverErrorState,
  SessionListState,
  SessionState,
} from '@/state-mgmt/atoms';

import { fetchAPI } from './fetch';

// Fetch race results to get drivers in the session
export const fetchDriverList = atomEffect((get, set) => {
  // We need to see if there is an event from params
  // We need to confirm eventlist loaded
  const eventName = get(EventState);
  const eventList = get(EventListState);

  // This indicated eventList has not been fetched has not loaded
  // Or that no event has been input
  if (!eventName || (eventName && eventList.length <= 0)) {
    return;
  }

  // Find specfic event from event states
  const event = eventList.find((evt) => evt.EventName === eventName);

  // Set error if no matching event && there is an event specified
  if (!event && eventName !== eventDefault) {
    set(serverErrorState, eventErrorMsg);
    // return;
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
        return;
      }

      // *** If no errors clear serverErrorState
      set(serverErrorState, '');
      // *** Update Driver List
      set(DriverListState, drivers);
    });
  }
  // Dependencies:
  // SeasonState
  // EventListState
});

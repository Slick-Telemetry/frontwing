// Based off race data
// Set session and sessions from race sessions

import { Getter, Setter } from 'jotai';
import { atomEffect } from 'jotai-effect';

import {
  // DriverAtom,
  DriverListState,
  EventListState,
  // EventState,
  LapListState,
  QueryAtom,
  // SeasonState,
  serverErrorState,
  SessionListState,
  // SessionState,
} from '@/state-mgmt/atoms';

import { fetchAPI } from './fetch';

// Fetch race results to get drivers in the session
export const fetchLapData = atomEffect((get: Getter, set: Setter) => {
  // We need to see if there is an event from params
  // We need to confirm eventlist loaded
  const { season, event, session: sessionName, driver } = get(QueryAtom);
  // const season = get(SeasonState);

  // const event = get(EventState);
  const eventList = get(EventListState);
  const eventRound = eventList.find(
    (evt) => evt.EventName === event,
  )?.RoundNumber;

  // const sessionName = get(SessionState);
  const sessionList = get(SessionListState);
  const sessionRound = sessionList.indexOf(sessionName) + 1;

  // Get driver number from driver list
  const driverList = get(DriverListState);
  const driverNumber = driverList.find(
    (d) => d.DriverId === driver,
  )?.DriverNumber;

  let url = `laps/${season}/${eventRound}`;

  if (sessionRound) {
    url += `?session=${sessionRound}`;
  }
  if (driverNumber) {
    url += `${sessionRound ? '&' : '?'}driver_number=${driverNumber}`;
  } else {
    // To prevent fetching too much data we require driver number
    return;
  }

  if (season && eventRound) {
    fetchAPI(url).then((res: LapData[] | ServerErrorResponse) => {
      const laps = res as LapData[];

      // Check for errors
      const error = res as ServerErrorResponse;

      // *** If errors specific prop, detail, update serverErrorState
      if (error.detail) {
        set(serverErrorState, 'Laps Error');
        return;
      }

      // *** If no errors clear serverErrorState
      set(serverErrorState, '');

      // *** Update Driver List
      set(LapListState, laps);
    });
  }

  // Dependencies:
  // SeasonState
  // EventListState
  // SessionState
});

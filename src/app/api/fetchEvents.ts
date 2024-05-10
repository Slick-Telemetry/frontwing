// Based off season data
// If season value set fetch that seasons schedule

import { Getter, Setter } from 'jotai';
import { atomEffect } from 'jotai-effect';

import {
  CompletedEventsList,
  EventListState,
  QueryAtom,
  // SeasonState,
  serverErrorState,
} from '@/state-mgmt/atoms';

import { fetchAPI } from './fetch';

// otherwise get the default schedule
export const fetchEventList = atomEffect(
  (get: Getter, set: Setter) => {
    // *** if SeasonState, set api season param
    const season = get(QueryAtom).season;
    const params = season && `?year=${season}`;

    // console.log('fetch schedule', params);

    // TODO: Prevent fetch if not connected
    // ! Bug with serverConnectedState not updating
    // const connected = get(serverConnectedState);
    // if (!connected) {
    //   return;
    // }

    // Fetch event list from api
    fetchAPI('schedule' + params).then(
      (res: DataConfigSchema['schedule'] | ServerErrorResponse) => {
        const schedule = res as DataConfigSchema['schedule'];
        const error = res as ServerErrorResponse;

        // *** If errors specific prop, detail, update serverErrorState
        if (!schedule) return;
        if (error && error.detail) {
          set(serverErrorState, error.detail[0].msg);
          return;
        }

        // *** If no errors clear serverErrorState
        set(serverErrorState, '');

        const currDate = Date.now();
        const threeHrs = 10800000; // length of scheduled race session in milliseconds
        // *** Remove events that have not 'completed' their final session
        const completedEvents = schedule.EventSchedule.filter(
          (event) =>
            new Date(event.Session5DateUtc).getTime() + threeHrs <= currDate,
        );

        set(EventListState, schedule.EventSchedule);
        set(CompletedEventsList, completedEvents);

        // *** If no season, sync default year with server provided season
        if (!season) {
          set(QueryAtom, { ...get(QueryAtom), season: schedule.year });
        }
      },
    );
  },
  // Dependencies:
  // SeasonState
);

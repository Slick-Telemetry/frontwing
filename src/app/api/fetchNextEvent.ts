import { Getter, Setter } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { formatNextEvent } from '@/lib/transformers';

import { serverErrorState } from '@/state-mgmt/atoms';
import {
  nextEventAtom,
  nextEventLiveAtom,
  nextEventTimeAtom,
} from '@/state-mgmt/nextEvent';

import { fetchAPI } from './fetch';

// Get upcoming event this should be done once
export const fetchNextEvent = atomEffect(
  (get: Getter, set: Setter) => {
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

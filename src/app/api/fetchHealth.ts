import { Getter, Setter } from 'jotai';
import { atomEffect } from 'jotai-effect';

import { serverConnectedState, serverErrorState } from '@/state-mgmt/atoms';

import { fetchAPI } from './fetch';

// otherwise get the default schedule
export const fetchHealth = atomEffect(
  (get: Getter, set: Setter) => {
    const serverError = get(serverErrorState);
    if (serverError) {
      return;
    }

    // Fetch event list from api
    fetchAPI('health').then((res: { status: string } | ServerErrorResponse) => {
      const success = res as { status: string };
      const error = res as ServerErrorResponse;

      if (success && success.status) {
        set(serverConnectedState, true);
        return;
      }

      // *** If errors specific prop, detail, update serverErrorState
      if (error && error.detail) {
        set(serverErrorState, error.detail[0].msg);
        return;
      }

      set(serverErrorState, 'No connection');
    });
  },
  // Dependencies:
  // serverErrorState
);

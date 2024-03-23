'use client';

import { useAtom } from 'jotai';

import { formatDuration } from '@/lib/helpers';
import { formatSessionUrl } from '@/lib/transformers';

import { fetchNextEvent } from '@/state-mgmt/fetchCalls';
import {
  nextEventAtom,
  nextEventEffect,
  nextEventLiveAtom,
  nextEventTimeAtom,
} from '@/state-mgmt/nextEvent';

export const NextEvent = () => {
  const [nextEvent] = useAtom(nextEventAtom);
  const [liveEvent] = useAtom(nextEventLiveAtom);
  const [nextEventCountdown] = useAtom(nextEventTimeAtom);
  useAtom(fetchNextEvent);
  useAtom(nextEventEffect);

  return (
    <div className='bg-base-300 flex px-4 py-8'>
      {nextEvent && (
        <div className='mx-auto'>
          <h2 className='text-4xl font-bold'>{nextEvent.name}</h2>
          <p className='text-2xl'>
            {liveEvent ? (
              nextEvent.session + ' Live Now'
            ) : (
              <>
                {formatSessionUrl(nextEvent.session).toUpperCase()} in{' '}
                {/* Remove last 4 characters which as milliseconds */}
                {formatDuration(nextEventCountdown).slice(0, -4)}
              </>
            )}
          </p>
          <button className='btn btn-secondary btn-sm my-2'>
            Previous Results
          </button>
        </div>
      )}
    </div>
  );
};

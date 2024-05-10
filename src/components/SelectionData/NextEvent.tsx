'use client';

import { useAtom } from 'jotai';

import { formatDuration } from '@/lib/helpers';
import { formatSessionUrl } from '@/lib/transformers';

import { fetchNextEvent } from '@/app/api/fetchNextEvent';
import {
  nextEventAtom,
  nextEventLiveAtom,
  nextEventTimeAtom,
  nextEventTimerEffect,
} from '@/state-mgmt/nextEvent';

export const NextEvent = () => {
  const [nextEvent] = useAtom(nextEventAtom);
  const [liveEvent] = useAtom(nextEventLiveAtom);
  const [nextEventCountdown] = useAtom(nextEventTimeAtom);
  useAtom(fetchNextEvent);
  useAtom(nextEventTimerEffect);

  if (!nextEvent) return null;

  return (
    <>
      {nextEvent && (
        <div className='w-fit rounded border border-current p-4'>
          <h2>Next Event</h2>
          <h2 className='text-3xl font-bold'>{nextEvent.name}</h2>
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
        </div>
      )}
    </>
  );
};

'use client';

import { useAtom } from 'jotai';

import { nextEventAtom, nextEventLiveAtom } from '@/atoms/nextEvent';
import { formatSessionUrl } from '@/utils/transformers';

import { EventCountDown } from './EventCountdown';

export const LandingNextEvent = () => {
  const [nextEvent] = useAtom(nextEventAtom);
  const [liveEvent] = useAtom(nextEventLiveAtom);

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
                <EventCountDown />
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

import { atom } from 'jotai';
import { atomEffect } from 'jotai-effect';

// Next Event
export const nextEventLiveAtom = atom(false);

export const nextEventAtom = atom<NextEventProps | null>(null);
export const nextEventTimeAtom = atom(0);
export const nextEventEffect = atomEffect((get, set) => {
  if (get(nextEventTimeAtom) !== 0) {
    const intervalId = setInterval(() => {
      set(nextEventTimeAtom, (prev: number) => prev - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }
});

import { useAtom } from 'jotai';

import { nextEventTimeAtom } from '@/atoms/nextEvent';

import { Countdown } from './Countdown';

export const EventCountDown = () => {
  const [nextEventCountdown] = useAtom(nextEventTimeAtom);
  return <Countdown time={nextEventCountdown} />;
};

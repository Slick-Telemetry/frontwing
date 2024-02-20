import { useAtom } from 'jotai';

import { nextEventTimeAtom } from '@/atoms/nextEvent';

import { Countdown } from '../ui/Countdown';

export const EventCountDown = () => {
  const [nextEventCountdown] = useAtom(nextEventTimeAtom);
  return <Countdown time={nextEventCountdown} />;
};

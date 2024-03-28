'use client';

import { useAtom } from 'jotai';

import {
  DriverState,
  EventState,
  SeasonState,
  SessionState,
} from '@/state-mgmt/atoms';

import { SelectionGroup } from './SelectionGroup';

export * from './Selection';
export * from './SelectionGroup';

export const Sidebar = () => {
  const [season] = useAtom(SeasonState);
  const [event] = useAtom(EventState);
  const [session] = useAtom(SessionState);
  const [driver] = useAtom(DriverState);

  // Use state values to define which groups are active

  return (
    <aside className='grid gap-1 px-2'>
      <SelectionGroup title='Season' disabled={!season} />
      <SelectionGroup title='Event' disabled={!event} />
      <SelectionGroup title='Drivers' disabled={!session} />
      <SelectionGroup title='Laps' disabled={!driver} />
    </aside>
  );
};

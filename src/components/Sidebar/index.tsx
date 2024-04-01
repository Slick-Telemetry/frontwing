'use client';

import { atom, useAtom } from 'jotai';
import { FaChevronLeft } from 'react-icons/fa';

import { cn } from '@/lib/utils';

import {
  DriverState,
  EventState,
  SeasonState,
  SessionState,
} from '@/state-mgmt/atoms';

import { SelectionGroup } from './SelectionGroup';
import { Button } from '../ui/button';

export * from './Selection';
export * from './SelectionGroup';

const sidebarOpenAtom = atom(false);
export const Sidebar = () => {
  const [season] = useAtom(SeasonState);
  const [event] = useAtom(EventState);
  const [session] = useAtom(SessionState);
  const [driver] = useAtom(DriverState);
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  // Use state values to define which groups are active

  return (
    <aside
      className={cn('relative w-48 border-r pr-6 duration-300', {
        'w-0': sidebarOpen,
      })}
    >
      <div className='grid gap-2 overflow-hidden'>
        <SelectionGroup title='Season' disabled={!season} />
        <SelectionGroup title='Event' disabled={!event} />
        <SelectionGroup title='Drivers' disabled={!session} />
        <SelectionGroup title='Laps' disabled={!driver} />
      </div>
      <Button
        variant='outline'
        size='icon'
        className='absolute right-0 top-0 h-6 w-6 translate-x-2/4 rounded-full'
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaChevronLeft
          className={cn('h-2 w-2 transition-transform duration-200', {
            '-rotate-180': sidebarOpen,
          })}
        />
        <span className='sr-only'>Collapse</span>
      </Button>
    </aside>
  );
};

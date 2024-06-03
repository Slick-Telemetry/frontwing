'use client';

import { atom, useAtom } from 'jotai';

import { cn } from '@/lib/utils';

import { ChevronLeft } from '@/components/icons/ChevronLeft';

import { queryState } from '@/state-mgmt/store';

import { SelectionGroup } from './SelectionGroup';
import { Button } from '../ui/button';

export * from './Selection';
export * from './SelectionGroup';

// This component is the left sidebar of the application.
// It's primary function is to change views and navigate between different data sets.
// We use the SelectionGroup component to render the different views options.
// - Season -> Events during a season
// - Event -> Sessions during an event
// - Session -> Drivers during a session
// - Laps -> Lap data for a driver

// There is also a button to collapse the sidebar.

const sidebarOpenAtom = atom(false);

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  // *** Use state values to define which groups are active
  const [{ season, event, session, driver }] = useAtom(queryState);

  return (
    <aside
      className={cn('relative w-48 border-r pr-6 duration-300', {
        'w-0': sidebarOpen,
      })}
    >
      <div className='grid gap-2 overflow-hidden'>
        <SelectionGroup title='Season' disabled={!season} />
        <SelectionGroup title='Event' disabled={!event} />
        <SelectionGroup title='Session' disabled={!session} />
        <SelectionGroup title='Laps' disabled={!driver} />
      </div>

      {/* Collapsible button */}
      <Button
        variant='outline'
        size='icon'
        className='absolute right-0 top-0 h-6 w-6 translate-x-2/4 rounded-full'
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <ChevronLeft
          className={cn('h-2 w-2 transition-transform duration-200', {
            '-rotate-180': sidebarOpen,
          })}
        />
        <span className='sr-only'>Collapse</span>
      </Button>
    </aside>
  );
};

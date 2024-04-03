'use client';

import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  EventListState,
  EventState,
  SessionListState,
  SessionState,
} from '@/state-mgmt/atoms';

import { SelectionItem } from './SelectionItem';

const titles: { [key: string]: string } = {
  Season: 'Season Events',
  Event: 'Event Sessions',
};

export const SelectionList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Default view is Season
  const view = searchParams.get('view') || 'Season';

  // Event atoms
  const [, setEvent] = useAtom(EventState);
  const [eventList] = useAtom(EventListState);

  // Session atoms
  const [, setSession] = useAtom(SessionState);
  const [sessionList] = useAtom(SessionListState);

  const handleSelection = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (view === 'Season') {
      params.set('view', 'Event');
      setEvent(value);
    }

    if (view === 'Event') {
      params.set('view', 'Session');
      setSession(value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const dataListComponents: { [key: string]: React.ReactNode[] } = {
    // Season view
    Season: eventList.map((event, i) => (
      <SelectionItem
        key={event.EventDate}
        clickHandler={() => handleSelection(event.EventName)}
      >
        <h2>
          {i + 1}. {event.EventName}
        </h2>
        {/* <p>{event.EventDate}</p> */}
      </SelectionItem>
    )),
    // Event view
    Event: sessionList.map((session) => (
      <SelectionItem
        key={session}
        clickHandler={() => handleSelection(session)}
      >
        <h2>{session}</h2>
      </SelectionItem>
    )),
  };

  return (
    <>
      <h1 className='px-4 text-2xl font-extrabold tracking-tight lg:text-3xl'>
        {titles[view] || 'Invalid view selected'}
      </h1>
      <div className='my-2 grid overflow-hidden rounded-xl border shadow'>
        {dataListComponents[view] || 'No data available'}
      </div>
    </>
  );
};

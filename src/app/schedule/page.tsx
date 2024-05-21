'use client';

import { useAtom } from 'jotai';
import moment from 'moment';

import { NextEvent } from '@/components/SelectionData';

import { EventListState } from '@/state-mgmt/atoms';

import { fetchEventList } from '../api/fetchEvents';

export default function SchedulePage() {
  const [events] = useAtom(EventListState);
  useAtom(fetchEventList);

  return (
    <main className='container'>
      <NextEvent />
      <div className='my-4'>
        <h1 className='text-4xl'>2024 Schedule</h1>
      </div>

      <div className='grid grid-cols-3'>
        {events.map((event) => (
          <div
            key={event.OfficialEventName}
            className='flex flex-col justify-between gap-x-4 gap-y-2 border border-current p-4'
          >
            {/* {Show completed if event is in the past} */}
            <div>
              <h2>{event.EventName}</h2>
              <p>{moment(event.EventDate).local().format('LL')}</p>
            </div>
            {new Date(event.EventDate) < new Date() ? (
              <p className='w-fit rounded-full border bg-accent px-3 py-1'>
                Completed
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {/* <RaceSchedule key='Race Schedule' />, */}
    </main>
  );
}

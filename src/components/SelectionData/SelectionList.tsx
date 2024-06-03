'use client';

import { useAtom } from 'jotai';
import moment from 'moment';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { updateQueryState, updateSearchParams } from '@/lib/helpers';

import {
  driverListLoadable,
  eventListLoadable,
  queryState,
  sessionListLoadable,
} from '@/state-mgmt/store';

import { SelectionItem } from './SelectionItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const titles: { [key: string]: string } = {
  season: 'Season Events',
  event: 'Event Sessions',
  session: 'Session Drivers',
  driver: 'Driver Laps',
};

// const LapRangePicker = ({
//   lapCount,
//   bestLap = 1,
// }: {
//   lapCount: number;
//   bestLap: number;
// }) => {
//   const [isRange, setIsRange] = useState(false);
//   const [range, setRange] = useState([0, lapCount]);
//   const [lap, setLap] = useState([bestLap]);

//   const handleRange = (value: number[]) => {
//     setRange(value);
//   };

//   const handleDefault = (value: number[]) => {
//     setLap(value);
//   };

//   return (
//     <div className='grid gap-4 p-4'>
//       <div>
//         <input
//           type='checkbox'
//           id='isRange'
//           checked={isRange}
//           onChange={() => setIsRange(!isRange)}
//         />
//         <label htmlFor='isRange'>Use Range</label>
//       </div>
//       <div className='min-h-12'>
//         {isRange ? (
//           <Slider
//             onValueChange={(value) => handleRange(value)}
//             value={range}
//             max={lapCount}
//             minStepsBetweenThumbs={1}
//           />
//         ) : (
//           <Slider
//             onValueChange={(value) => handleDefault(value)}
//             value={lap}
//             max={lapCount}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

const SeasonEvent = ({
  i,
  event,
  handleSelection,
}: {
  i: number;
  event: EventSchedule;
  handleSelection: (event: string) => void;
}) => (
  <SelectionItem
    key={event.EventDate}
    clickHandler={() => handleSelection(event.EventName)}
  >
    {/* <p>{event.EventDate}</p> */}
    <h2>
      {i + 1}. {event.EventName}
    </h2>

    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='tst'>
        <AccordionTrigger
          className='gap-4 py-0'
          onClick={(e) => e.stopPropagation()}
        >
          Weekend Schedule
        </AccordionTrigger>
        <AccordionContent>
          <p>
            {event.Session1} -{' '}
            {moment.utc(event.Session1DateUtc).local().format('LLL')}
          </p>
          <p>
            {event.Session2} -{' '}
            {moment.utc(event.Session2DateUtc).local().format('LLL')}
          </p>
          <p>
            {event.Session3} -{' '}
            {moment.utc(event.Session3DateUtc).local().format('LLL')}
          </p>
          <p>
            {event.Session4} -{' '}
            {moment.utc(event.Session4DateUtc).local().format('LLL')}
          </p>
          <p>
            {event.Session5} -{' '}
            {moment.utc(event.Session5DateUtc).local().format('LLL')}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </SelectionItem>
);

const EventSession = ({
  session,
  handleSelection,
}: {
  session: SessionBasics;
  handleSelection: (session: string) => void;
}) => (
  <SelectionItem
    key={session.index}
    clickHandler={() => handleSelection(session.name)}
  >
    <h2>{session.name}</h2>
    <p>{session.date}</p>
  </SelectionItem>
);

const SessionDriver = ({
  driver,
  handleSelection,
}: {
  driver: DriverResult;
  handleSelection: (driver: string) => void;
}) => (
  <SelectionItem
    key={driver.DriverId}
    clickHandler={() => handleSelection(driver.DriverId)}
  >
    <h2>{driver.FullName}</h2>
  </SelectionItem>
);

export const SelectionList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Default view is Season
  const view = searchParams.get('view') || 'season';

  const [query, setQuery] = useAtom(queryState);

  const [eventList] = useAtom(eventListLoadable);
  const [sessionList] = useAtom(sessionListLoadable);
  const [driverList] = useAtom(driverListLoadable);

  // Lap atom
  // const [lapList] = useAtom(LapListState);

  // Action based on view
  // Derive with params are going to change
  const handleSelection = useCallback(
    (value: string) => {
      let params = new URLSearchParams(searchParams);
      let queryKey = ''; // used to advance to next view
      // const view = params.get('view') || 'season';

      if (view === 'season') {
        queryKey = 'event';
        setQuery(updateQueryState(query, 'event', value));
      }

      if (view === 'event') {
        queryKey = 'session';

        setQuery(updateQueryState(query, 'session', value));
      }

      if (view === 'session') {
        queryKey = 'driver';
        setQuery(updateQueryState(query, 'driver', value));
      }

      if (queryKey) {
        // Update query params
        params = updateSearchParams(params, queryKey, value);

        // Update view
        params = updateSearchParams(params, 'view', queryKey);
      }

      router.push(pathname + '?' + params.toString());
    },
    [searchParams, query, setQuery, view, pathname, router],
  );

  // console.log('dataListComponents', dataListComponents)
  return (
    <>
      <h1 className='px-4 text-2xl font-extrabold tracking-tight lg:text-3xl'>
        {titles[view] || 'Invalid view selected'}
      </h1>
      <div className='my-2 grid overflow-hidden rounded-xl border shadow'>
        {view === 'season' &&
          eventList.state === 'hasData' &&
          eventList.data.map((event, i) => (
            <SeasonEvent
              key={event.EventName}
              i={i}
              event={event}
              handleSelection={handleSelection}
            />
          ))}
        {view === 'event' &&
          sessionList.state === 'hasData' &&
          sessionList.data.map((session) => (
            <EventSession
              key={session.index}
              session={session}
              handleSelection={handleSelection}
            />
          ))}
        {view === 'session' &&
          driverList.state === 'hasData' &&
          driverList.data.map((driver) => (
            <SessionDriver
              key={driver.FullName}
              driver={driver}
              handleSelection={handleSelection}
            />
          ))}
      </div>
    </>
  );
};

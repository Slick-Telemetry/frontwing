import {
  CalendarPlus,
  CircleCheck,
  Maximize2,
  Minimize2,
  Star,
} from 'lucide-react';
import { useState } from 'react';

import { eventTiming, getColor } from '@/lib/utils';

import { MapEvent } from '@/generated/customTypes';

const containerClasses =
  'absolute top-4 right-4 rounded border border-current bg-black p-2 text-base';

// ? This is for when we can resolve reliable distances matching with paths
// const calcDistance = (loc1: number[], loc2: number[]) => {
//   const from = point(loc1);
//   const to = point(loc2);
//   const totalDistance = distance(from, to);
//   return Math.ceil(totalDistance);
// };

export const Legend = ({
  events,
  selectEvent,
}: {
  events?: MapEvent[];
  selectEvent: (event: MapEvent) => void;
}) => {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <div className={containerClasses}>
        <Maximize2
          className='cursor-pointer'
          onClick={() => setHidden(false)}
        />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className='flex items-center justify-between gap-2'>
        <h3 className='text-2xl'>2024 Season Map</h3>
        <Minimize2 className='cursor-pointer' onClick={() => setHidden(true)} />
      </div>

      <div className='grid divide-y divide-current'>
        {events?.map((e) => {
          // past, present, future
          const eventTimePeriod = eventTiming(e.date);
          return (
            <div
              onClick={() => selectEvent(e)}
              key={e.id}
              style={{ color: getColor(e.date) }}
              className='flex cursor-pointer items-center gap-2'
            >
              {eventTimePeriod === 'present' && <Star />}
              {eventTimePeriod === 'past' && <CircleCheck />}
              {eventTimePeriod === 'future' && <CalendarPlus />} {e.name}
            </div>
          );
        })}
      </div>

      {/* Old Distance concept */}
      {/* <div className='w-full h-2 overflow-hidden bg-white rounded-full'>
        <div
          className='h-2 bg-blue-500'
          style={{ width: (currDistance / totalDistance) * 100 + '%' }}
        ></div>
      </div> */}
      {/* <p>Distance: {currDistance} / {totalDistance} KM</p> */}
      {/* <p className='text-xs text-right'>*Distances are approximate</p> */}
    </div>
  );
};

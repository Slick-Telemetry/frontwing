import {
  CalendarPlus,
  CircleCheck,
  Maximize2,
  Minimize2,
  Star,
} from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';

import { getColor } from '@/lib/utils';

import { Event } from './page';

export const Legend = ({ events }: { events: Event[] }) => {
  // const currDistance = 5000;
  // const totalDistance = 10000;

  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <div className='absolute top-4 right-4 rounded border border-current bg-black p-2 text-base'>
        <Maximize2
          className='cursor-pointer'
          onClick={() => setHidden(false)}
        />
      </div>
    );
  }

  return (
    <div className='absolute top-4 right-4 grid gap-2 rounded border border-current bg-black p-2'>
      <div className='flex items-center justify-between gap-2'>
        <h3 className='text-2xl'>2024 Season Map</h3>
        <Minimize2 className='cursor-pointer' onClick={() => setHidden(true)} />
      </div>

      {/* <div className='h-2 w-full overflow-hidden rounded-full bg-white'>
        <div
          className='h-2 bg-blue-500'
          style={{ width: (currDistance / totalDistance) * 100 + '%' }}
        ></div>
      </div> */}

      {/* <p>Distance: {currDistance} / {totalDistance} KM</p> */}
      <div className='grid divide-y divide-current'>
        {events &&
          events.map((e) => (
            <div
              key={e.id}
              style={{ color: getColor(e.date) }}
              className='flex items-center gap-2'
            >
              {moment(e.date).isSame(moment(), 'day') && <Star />}
              {moment(e.date).isBefore(moment(), 'day') && <CircleCheck />}
              {moment(e.date).isAfter(moment(), 'day') && <CalendarPlus />}{' '}
              {e.name}
            </div>
          ))}
      </div>
      {/* <p className='text-right text-xs'>*Distances are approximate</p> */}
    </div>
  );
};

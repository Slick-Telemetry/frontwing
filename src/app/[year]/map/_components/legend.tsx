import { getColor } from '@/lib/utils';

import { GetEventScheduleQuery } from '@/types/graphql';

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
  events?: GetEventScheduleQuery['schedule'];
  selectEvent: (event: string) => void;
}) => {
  return (
    <div className='grid divide-y divide-current'>
      {events?.map((e) => {
        // past, present, future
        const color = getColor(e.event_date);
        return (
          <div
            onClick={() => selectEvent(e.event_name as string)}
            key={e.event_name}
            style={{ color: color }}
            className='flex cursor-pointer items-center gap-2 py-0.5'
          >
            <div
              className='flex h-4 w-4 items-center justify-center text-sm'
              style={{ borderColor: color }}
            >
              {e.round_number}
            </div>
            <p className='line-clamp-1'>{e.event_name}</p>
          </div>
        );
      })}
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

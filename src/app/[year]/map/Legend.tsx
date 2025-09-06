import { getColor } from '@/lib/utils';

import { MapEvent } from '@/types/global';

const containerClasses = 'absolute top-4 left-4 rounded bg-muted p-2';

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
  // const [hidden, setHidden] = useState(false);

  // if (hidden) {
  //   return (
  //     <div className={containerClasses}>
  //       <Maximize2
  //         className='cursor-pointer'
  //         onClick={() => setHidden(false)}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className={containerClasses}>
      {/* <Minimize2 className='cursor-pointer' onClick={() => setHidden(true)} /> */}

      <div className='grid divide-y divide-current'>
        {events?.map((e) => {
          // past, present, future
          const color = getColor(e.date);
          return (
            <div
              onClick={() => selectEvent(e)}
              key={e.name}
              style={{ color: color }}
              className='flex cursor-pointer items-center gap-2 py-0.5'
            >
              <div
                className='flex h-4 w-4 items-center justify-center text-xs'
                style={{ borderColor: color }}
              >
                {e.round_number}
              </div>
              <p className='text-sm'>{e.name}</p>
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

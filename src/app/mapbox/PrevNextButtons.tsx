import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Event } from './page';

export const PrevNextButtons = ({
  selectedEvent,
  events,
  handleAdjacent,
}: {
  selectedEvent: Event;
  events?: Event[];
  handleAdjacent: (type?: 'prev' | 'next') => void;
}) => {
  const prevLocation = events?.find(
    (e) => e.round_number === (selectedEvent.round_number as number) - 1,
  )?.location;

  const nextLocation = events?.find(
    (e) => e.round_number === (selectedEvent.round_number as number) + 1,
  )?.location;

  return (
    <div className='mt-2 -mb-1 grid grid-cols-2 gap-4 border-t pt-2'>
      {prevLocation && (
        <div
          className='mr-auto flex cursor-pointer items-center'
          onClick={() => handleAdjacent('prev')}
        >
          <ChevronLeft />
          <p>{prevLocation}</p>
        </div>
      )}

      {nextLocation && (
        <div
          className='col-start-2 ml-auto flex cursor-pointer items-center'
          onClick={() => handleAdjacent()}
        >
          <p>{nextLocation}</p>
          <ChevronRight />
        </div>
      )}
    </div>
  );
};

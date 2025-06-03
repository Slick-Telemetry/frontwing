import { ChevronLeft, ChevronRight } from 'lucide-react';

import { MapEvent } from '@/generated/customTypes';

export const PrevNextButtons = ({
  selectedEvent,
  events,
  handleAdjacent,
}: {
  selectedEvent: MapEvent;
  events?: MapEvent[];
  handleAdjacent: (type?: 'prev' | 'next') => void;
}) => {
  const prevLocation = events?.find(
    (e) => e.round_number === (selectedEvent.round_number as number) - 1,
  )?.location;

  const nextLocation = events?.find(
    (e) => e.round_number === (selectedEvent.round_number as number) + 1,
  )?.location;

  return (
    <div className='border-background -mb-1 grid grid-cols-2 gap-4 border-t pt-2'>
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

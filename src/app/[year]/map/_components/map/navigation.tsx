import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { MapScheduleLocationFragment } from '@/types/graphql';

export default function MapNavigation({
  toggleZoom,
  selectEvent,
  prev,
  next,
}: {
  toggleZoom: () => void;
  selectEvent: (event: string) => void;
  prev?: MapScheduleLocationFragment;
  next?: MapScheduleLocationFragment;
}) {
  return (
    <div className='absolute inset-0 top-2 mx-auto flex h-fit w-96 gap-2'>
      <Button
        variant='secondary-invert'
        size='sm'
        disabled={!prev}
        className='mr-auto flex w-full max-w-36 cursor-pointer items-center'
        onClick={() => selectEvent(prev?.event_name as string)}
      >
        <ChevronLeft className='size-4' />
        {prev ? (
          <p className='truncate'>
            {prev.round_number} | {prev.location}
          </p>
        ) : (
          <p>No Event</p>
        )}
      </Button>

      {/* ZoomIn and ZoomOut as one */}
      <Button
        variant='secondary-invert'
        size='sm'
        onClick={toggleZoom}
        className='col-start-2 mx-auto flex w-fit cursor-pointer items-center'
      >
        <ZoomIn size={16} />/<ZoomOut size={16} />
      </Button>

      <Button
        variant='secondary-invert'
        size='sm'
        disabled={!next}
        className='ml-auto flex w-full max-w-36 cursor-pointer items-center'
        onClick={() => selectEvent(next?.event_name as string)}
      >
        {next ? (
          <p className='truncate'>
            {next.round_number} | {next.location}
          </p>
        ) : (
          <p>No Event</p>
        )}
        <ChevronRight className='size-4' />
      </Button>
    </div>
  );
}

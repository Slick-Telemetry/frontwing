import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { MapEventFragment } from '@/types/graphql';

export default function MapNavigation({
  selectEvent,
  prev,
  next,
}: {
  selectEvent: (event: string) => void;
  prev?: MapEventFragment;
  next?: MapEventFragment;
}) {
  return (
    <div className='absolute inset-0 top-2 mx-auto flex h-fit w-72 gap-2'>
      <Button
        variant='inverted'
        size='sm'
        disabled={!prev}
        className='mr-auto flex w-full max-w-36 cursor-pointer items-center'
        onClick={() => selectEvent(prev?.name as string)}
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

      <Button
        variant='inverted'
        size='sm'
        disabled={!next}
        className='ml-auto flex w-full max-w-36 cursor-pointer items-center'
        onClick={() => selectEvent(next?.name as string)}
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

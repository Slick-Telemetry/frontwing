import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { MapEventFragment } from '@/types/graphql';

export default function MapNavigation({
  toggleZoom,
  selectEvent,
  prev,
  next,
}: {
  toggleZoom: () => void;
  selectEvent: (event: string) => void;
  prev?: MapEventFragment;
  next?: MapEventFragment;
}) {
  return (
    <div className='bg-background absolute inset-0 top-2 mx-auto h-fit w-fit rounded p-1'>
      <div className='flex w-96'>
        <Button
          variant='ghost'
          size='sm'
          disabled={!prev}
          className='mr-auto flex w-full max-w-36 cursor-pointer items-center'
          onClick={() => selectEvent(prev?.name as string)}
        >
          {prev && (
            <>
              <ChevronLeft className='size-4' />
              <p className='truncate'>
                {prev.round_number} | {prev.location}
              </p>
            </>
          )}
        </Button>

        {/* ZoomIn and ZoomOut as one */}
        <Button
          variant='ghost'
          size='sm'
          onClick={toggleZoom}
          className='col-start-2 mx-auto flex w-fit cursor-pointer items-center'
        >
          <ZoomIn size={16} />/<ZoomOut size={16} />
        </Button>

        {/* {next?.name && ( */}
        <Button
          variant='ghost'
          size='sm'
          disabled={!next}
          className='ml-auto flex w-full max-w-36 cursor-pointer items-center'
          onClick={() => selectEvent(next?.name as string)}
        >
          {next && (
            <>
              <p className='truncate'>
                {next.round_number} | {next.location}
              </p>
              <ChevronRight className='size-4' />
            </>
          )}
        </Button>
        {/* )} */}
      </div>
    </div>
  );
}

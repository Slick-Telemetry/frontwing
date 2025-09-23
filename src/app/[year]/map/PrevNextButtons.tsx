import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useMap } from 'react-map-gl/mapbox';

import { Button } from '@/components/ui/button';

import { MapEvent } from '@/types/global';
const optimalZoom = 15; // optimal zoom for circuit visibility

export const PrevNextButtons = ({
  selectedEvent,
  events,
  handleAdjacent,
}: {
  selectedEvent?: MapEvent;
  events?: MapEvent[];
  handleAdjacent: (type?: 'prev' | 'next') => void;
}) => {
  const longitude = selectedEvent?.sessions[0].circuit?.longitude as number;
  const latitude = selectedEvent?.sessions[0].circuit?.latitude as number;

  const [prevZoom, setPrevZoom] = useState(2);
  const { current: map } = useMap();
  const focusLocation = useCallback(
    (zoom?: number) => {
      if (!map) return;
      const mapZoom = map.getZoom();

      map.flyTo({
        center: [longitude, latitude],
        zoom: zoom || mapZoom,
        speed: 2,
        curve: 3,
      });
    },
    [map, latitude, longitude],
  );
  if (!selectedEvent) return null;

  const prevLocation = events?.find(
    (e) => e.round_number === (selectedEvent.round_number as number) - 1,
  )?.location;

  const nextLocation = events?.find(
    (e) => e.round_number === (selectedEvent.round_number as number) + 1,
  )?.location;

  // Used to autozoom in and out of circuit
  const toggleZoom = () => {
    if (!map) return;

    const mapZoom = Math.floor(map.getZoom());
    // If zoom is greater than equal to optimal zoom
    // then zoom back to users previous zoom setting
    if (mapZoom >= optimalZoom) {
      focusLocation(prevZoom);
      return;
    }

    focusLocation(optimalZoom);

    // Recall previous zoom level to return to it
    setPrevZoom(mapZoom);
  };

  return (
    <div className='bg-background absolute inset-0 top-2 mx-auto flex h-fit w-fit grid-cols-3 justify-center gap-4 rounded p-1'>
      {prevLocation && (
        <Button
          variant='ghost'
          className='flex flex-1 cursor-pointer items-center'
          onClick={() => handleAdjacent('prev')}
        >
          <ChevronLeft className='size-4' />
          <p>{prevLocation}</p>
        </Button>
      )}

      {/* ZoomIn and ZoomOut as one */}
      <div onClick={toggleZoom} className='flex cursor-pointer items-center'>
        <ZoomIn size={16} /> / <ZoomOut size={16} />
      </div>

      {nextLocation && (
        <Button
          variant='ghost'
          className='flex flex-1 cursor-pointer items-center'
          onClick={() => handleAdjacent()}
        >
          <p>{nextLocation}</p>
          <ChevronRight className='size-4' />
        </Button>
      )}
    </div>
  );
};

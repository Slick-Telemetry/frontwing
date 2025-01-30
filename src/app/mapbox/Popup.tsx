import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Popup, useMap } from 'react-map-gl';

import { hexToRgba } from '@/lib/helpers';

import { Badge } from '@/components/ui/badge';

import { Event } from './page';

const iconSize = 16;
const topThree = [
  {
    position: 1,
    full_name: 'Max Verstappen',
    abbreviation: 'VER',
    headshot_url:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png',
    constructor: {
      name: 'Red Bull Racing',
      color: '3671c6',
    },
  },
  {
    position: 2,
    full_name: 'Lewis Hamilton',
    abbreviation: 'HAM',
    headshot_url:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png',
    constructor: {
      name: 'Mercedes',
      color: '27f4d2',
    },
  },
  {
    position: 3,
    full_name: 'Kevin Magnussen',
    abbreviation: 'MAG',
    headshot_url:
      'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/1col/image.png',
    constructor: {
      name: 'Haas F1 Team',
      color: 'b6babd',
    },
  },
];

export const MapPopup = ({
  event,
  handleClose,
  children,
}: {
  event: Event;
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  const { current: map } = useMap();
  const [prevZoom, setPrevZoom] = useState(2);

  const longitude = event.sessions[0].circuit?.longitude as number;
  const latitude = event.sessions[0].circuit?.latitude as number;

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

  useEffect(() => {
    focusLocation();
  }, [focusLocation]);

  const toggleZoom = () => {
    if (!map) return;
    const optimalZoom = 15;
    const mapZoom = Math.floor(map.getZoom());

    if (mapZoom === optimalZoom) {
      focusLocation(prevZoom);
      return;
    }

    focusLocation(optimalZoom);

    // Recall previous zoom level to return to it
    setPrevZoom(mapZoom);
  };

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={handleClose}
      closeOnClick={false}
      closeButton={false}
      anchor='bottom'
      maxWidth='unset'
      className='overflow-hidden text-sm text-black'
    >
      <div className='relative grid min-w-56 pt-1'>
        {/* Round Number */}
        <div className='absolute -top-8 right-5 text-8xl font-bold italic opacity-25'>
          {event.round_number}
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            {/* ZoomIn and ZoomOut as one */}
            <div
              onClick={toggleZoom}
              className='flex cursor-pointer items-center'
            >
              <ZoomIn size={16} /> / <ZoomOut size={16} />
            </div>
            {/* Sprint or Conventional Format */}
            {event.format?.includes('sprint') ? (
              <Badge className='w-fit rounded-full' variant='secondary'>
                Sprint
              </Badge>
            ) : (
              <Badge
                className='w-fit rounded-full text-black'
                variant='outline'
              >
                Conventional
              </Badge>
            )}
          </div>

          {/* Close Button */}
          <CircleX size={16} className='cursor-pointer' onClick={handleClose} />
        </div>

        {/* Event Name */}
        <Link
          href={'session/' + event.id}
          className='mb-1 text-2xl font-medium underline'
        >
          {event.name?.replace('Grand Prix', 'GP')}
        </Link>

        {topThree.map((driver) => (
          <div
            key={driver.full_name}
            className='flex items-center gap-4 rounded-lg p-1.5 px-4'
            style={{
              background: driver.constructor.color
                ? `linear-gradient(to left, ${hexToRgba(driver.constructor.color, 0.8)}, ${hexToRgba(driver.constructor.color, 0)})`
                : 'initial',
            }}
          >
            <p className='text-2xl font-medium italic'>{driver.position}</p>
            <div className='leading-3'>
              <p className='text-sm'>{driver.full_name}</p>
              <p className='text-xs'>{driver.constructor.name}</p>
            </div>
          </div>
        ))}

        {children}
      </div>
    </Popup>
  );
};

// ? This is for when we can resolve reliable distances matching with paths
// const calcDistance = (loc1: number[], loc2: number[]) => {
//   const from = point(loc1);
//   const to = point(loc2);
//   const totalDistance = distance(from, to);
//   return Math.ceil(totalDistance);
// };

export const PrevNextButtons = ({
  prevLocation,
  nextLocation,
  handlePrev,
  handleNext,
}: {
  prevLocation?: string | null;
  nextLocation?: string | null;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className='mt-2 -mb-1 grid grid-cols-2 gap-4 border-t pt-2'>
      {prevLocation && (
        <div
          className='mr-auto flex cursor-pointer items-center'
          onClick={handlePrev}
        >
          <ChevronLeft size={iconSize} />
          <p>{prevLocation}</p>
        </div>
      )}

      {nextLocation && (
        <div
          className='col-start-2 ml-auto flex cursor-pointer items-center'
          onClick={handleNext}
        >
          <p>{nextLocation}</p>
          <ChevronRight size={iconSize} />
        </div>
      )}
    </div>
  );
};

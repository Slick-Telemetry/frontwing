import { CircleX, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Popup, useMap } from 'react-map-gl/mapbox';

import {
  bgGradient,
  eventLocationEncode,
  eventTiming,
  getCountryFlagByCountryName,
  positionEnding,
} from '@/lib/utils';

import { SprintBadge } from '@/components/sprint-badge';

import { MapEvent } from '@/types/global';

const optimalZoom = 15; // optimal zoom for circuit visibility

export const MapPopup = ({
  event,
  handleClose,
  children,
}: {
  event: MapEvent;
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  const { year } = useParams();
  const { current: map } = useMap();
  const [prevZoom, setPrevZoom] = useState(2);

  const eventUrl = `${year}/${eventLocationEncode(event?.location)}`;
  const longitude = event.sessions[0].circuit?.longitude as number;
  const latitude = event.sessions[0].circuit?.latitude as number;

  /**
   * @description focus to event location
   * @param {number} [zoom]
   */
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

  const { driver_sessions, circuit } = useMemo(
    () => event.sessions[0],
    [event],
  );

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      onClose={handleClose}
      closeOnClick={false}
      closeButton={false}
      anchor='bottom'
      maxWidth='unset'
      className='overflow-hidden text-sm shadow'
    >
      <div className='grid'>
        {/* Top Row */}
        <div className='flex items-center justify-between gap-2'>
          <div className='divide-foreground flex items-center gap-2 divide-x [&>:not(:last-child)]:pr-2'>
            <p>Round {event.round_number}</p>

            {/* ZoomIn and ZoomOut as one */}
            <div
              onClick={toggleZoom}
              className='flex cursor-pointer items-center'
            >
              <ZoomIn size={16} /> / <ZoomOut size={16} />
            </div>
            {/* Sprint or Conventional Format */}
            <SprintBadge format={event.format} />
          </div>

          {/* Close Button */}
          <CircleX size={16} className='cursor-pointer' onClick={handleClose} />
        </div>

        {/* Event Name Link */}
        <Link
          href={`/${eventUrl || ''}`}
          className='my-2 w-fit text-xl leading-6 font-medium hover:underline'
        >
          {event.name}{' '}
          {circuit &&
            circuit.country &&
            getCountryFlagByCountryName(circuit.country)}
        </Link>

        {/* If event happened show results */}
        {eventTiming(event.date) === 'past' && (
          <TopThreeDrivers driverSessions={driver_sessions} />
        )}

        {/* Previous and Next Event Buttons */}
        {children}
      </div>
    </Popup>
  );
};

const TopThreeDrivers = ({
  driverSessions,
}: {
  driverSessions: MapEvent['sessions'][number]['driver_sessions'];
}) => {
  // Sort driverSessions by classified_position (ascending, as integer)
  const sortedSessions = [...driverSessions].sort((a, b) => {
    const posA =
      a.results && a.results[0]?.classified_position
        ? parseInt(a.results[0].classified_position, 10)
        : Infinity;
    const posB =
      b.results && b.results[0]?.classified_position
        ? parseInt(b.results[0].classified_position, 10)
        : Infinity;
    return posA - posB;
  });

  return (
    <div className='grid-cols-3 gap-2'>
      {sortedSessions.map(
        ({ driver, constructorByConstructorId, results }) =>
          driver &&
          constructorByConstructorId && (
            <div
              key={driver.full_name}
              className='flex items-center justify-start gap-2 rounded-lg p-1 px-2'
              style={{
                background: constructorByConstructorId.color
                  ? bgGradient(constructorByConstructorId.color)
                  : 'initial',
              }}
            >
              <div className='flex items-center justify-center'>
                {results && results[0].classified_position && (
                  <p className='-mr-2 text-center text-2xl font-medium italic opacity-75'>
                    {results[0].classified_position}
                    <span className='text-base'>
                      {positionEnding(results[0].classified_position)}
                    </span>
                  </p>
                )}
                {driver.headshot_url && (
                  <Image
                    className='z-10'
                    src={driver.headshot_url}
                    width={40}
                    height={40}
                    alt={driver?.full_name || ''}
                  />
                )}
              </div>
              <div className='leading-3'>
                <p className='text-sm'>{driver.full_name}</p>
                <p className='text-xs'>{constructorByConstructorId.name}</p>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

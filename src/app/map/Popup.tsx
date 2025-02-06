import { CircleX, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/Image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Popup, useMap } from 'react-map-gl/mapbox';

import {
  bgGradient,
  eventTiming,
  getCountryFlagByCountryName,
  positionEnding,
} from '@/lib/utils';

import { FloatingNumber } from '@/components/FloatingNumber';
import { Badge } from '@/components/ui/badge';

import { MapEvent } from '@/generated/customTypes';
import { Event_Format_Choices_Enum } from '@/generated/types';

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
  const { current: map } = useMap();
  const [prevZoom, setPrevZoom] = useState(2);

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
      className='overflow-hidden text-sm text-black'
    >
      <div className='relative grid min-w-xs'>
        {/* Floating Round Number */}
        <FloatingNumber className='-top-8 right-4'>
          {event.round_number}
        </FloatingNumber>

        {/* Top Row */}
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
            <EventTypeBadge format={event.format} />
          </div>

          {/* Close Button */}
          <CircleX size={16} className='cursor-pointer' onClick={handleClose} />
        </div>

        {/* Event Name Link */}
        <Link
          href={'session/' + event.id}
          className='mb-1 text-2xl font-medium underline'
        >
          {circuit &&
            circuit.country &&
            getCountryFlagByCountryName(circuit.country)}{' '}
          {event.name}
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

const EventTypeBadge = ({
  format,
}: {
  format?: Event_Format_Choices_Enum | null;
}) => {
  if (!format) return;
  return ['sprint', 'sprint_shootout', 'sprint_qualifying'].includes(format) ? (
    <Badge className='z-10 w-fit rounded-full' variant='secondary'>
      Sprint
    </Badge>
  ) : (
    <Badge
      className='z-10 w-fit rounded-full bg-white text-black'
      variant='outline'
    >
      Conventional
    </Badge>
  );
};

const TopThreeDrivers = ({
  driverSessions,
}: {
  driverSessions: MapEvent['sessions'][number]['driver_sessions'];
}) => {
  return (
    <div className='grid grid-cols-3 gap-2'>
      {driverSessions.map(
        ({ driver, constructorByConstructorId, results }) =>
          driver &&
          constructorByConstructorId && (
            <div
              key={driver.full_name}
              className='grid items-center gap-1 rounded-lg p-2'
              style={{
                background: constructorByConstructorId.color
                  ? bgGradient(constructorByConstructorId.color)
                  : 'initial',
              }}
            >
              <div className='flex'>
                {results && results[0].classified_position && (
                  <p className='flex items-start text-4xl font-medium italic opacity-75'>
                    {results[0].classified_position}
                    <span className='text-base'>
                      {positionEnding(results[0].classified_position)}
                    </span>
                  </p>
                )}
                {driver.headshot_url && (
                  <Image
                    className='mx-auto'
                    src={driver.headshot_url}
                    width={60}
                    height={60}
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
